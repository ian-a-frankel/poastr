#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify, session
from flask_restful import Resource
import time
import re

# Local imports
from config import app, db, api, bcrypt
# Add your model imports
from models import User, Poast, Follow, Mention, Notification, ThumbsUp

# Views go here!

import sqlite3

def Tree(poast_id):
    message = db.session.get(Poast, poast_id)
    children_string = message.children
    if children_string == "":
        children = []
    elif '_' not in children_string:
        children = [int(children_string)]
    else:
        children = [int(n) for n in children_string.split('_')]
    own_data = {
                    'poast_id': message.id,
                    'text': message.text,
                    'ancestry': message.ancestry,
                    'user_id': message.user_id,
                    'timestamp': message.timestamp,
                    'children': message.children
                }

    answer = []
    for child in reversed(children):
        answer = answer + Tree(child)
    answer.append(own_data)
    return answer
    
class Users(Resource):
        
    def post(self):
        data = request.get_json()
        # password_hash = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        new_user = User(
            handle = data['handle'].lower(),
            nickname = data['nickname'],
            bio = "",
            password_hash = bcrypt.generate_password_hash(data['password']).decode('utf-8'),
            total_likes = 0
        )
        print(new_user.to_dict())
        db.session.add(new_user)
        db.session.commit()
        return make_response(new_user.to_dict(), 201)

class Poasts(Resource):
    def post(self):
        current_time_str = time.strftime("%Y-%m-%d %H:%M:%S")
        data = request.get_json()
        new_poast = Poast(
            user_id=data['user_id'],
            text=data['text'],
            timestamp = current_time_str,
            children = ""
        )

        db.session.add(new_poast)
        db.session.commit()

        if 'parent_id' in data.keys():
            setattr(new_poast, 'parent_id', data['parent_id'])
            parent = db.session.get(Poast, data['parent_id'])
            setattr(new_poast, 'ancestry', parent.ancestry + '_' + str(new_poast.id))
            if parent.children == "":
                setattr(parent,'children', str(new_poast.id))
            else:
                setattr(parent, 'children', parent.children + "_" + str(new_poast.id))
        else:
            setattr(new_poast, 'ancestry', str(new_poast.id))
        db.session.add(new_poast)
        if 'parent_id' in data.keys():
            db.session.add(parent)
        db.session.commit()

        text = data['text']

        matches = re.findall(r'@(\w+)\b', text)  # Find matches in the text value
        handles = [match for match in matches]
        print(handles)

        query = db.session.query(User).filter(User.handle.in_(handles))  # Filter by matches
        results = query.all()
        for result in results:
            current_time_str = time.strftime("%Y-%m-%d %H:%M:%S")
            new_mention = Mention(
                mentioner_id = data['user_id'],
                mentioned_id = result.id,
                poast_id = new_poast.id,
                timestamp = current_time_str
            )
            db.session.add(new_mention)
            
        db.session.commit()
        print([result.to_dict() for result in results])

        return make_response(new_poast.to_dict(), 201)

class ThumbsUps(Resource):

    def post(self):
        data = request.get_json()
        return make_response

    def delete(self):
        pass

class Mentions(Resource):
    def get(self):
        pass

    def post(self):
        data = request.get_json()

class UserByHandle(Resource):

    def get(self,handle):
        user = User.query.filter_by(handle=handle).first()
        followers = Follow.query.filter_by(writer_id=user.id).all()
        following = Follow.query.filter_by(reader_id=user.id).all()
        follower_data = []
        following_data = []
        for f in followers:
            reader = db.session.get(User, f.reader_id)
            follower_data.append({'handle': reader.handle, 'nickname': reader.nickname})
        for f in following:
            writer = db.session.get(User, f.writer_id)
            following_data.append({'handle': writer.handle, 'nickname': writer.nickname})

        response_dict = {
            'handle': user.handle,
            'nickname': user.nickname,
            'bio': user.bio,
            'followers': follower_data,
            'following': following_data
        }
        print(response_dict)
        return make_response(response_dict, 200)
        
    def patch(self,handle):
        user = User.query.filter_by(handle=handle).first()
        data = request.json
        if data['nickname']:
            setattr(user,'nickname',data['nickname'])
        if data['bio']:
            setattr(user,'bio',data['bio'])
        db.session.add(user)
        db.session.commit()
        return make_response(jsonify(data), 201)

class Follows(Resource):
    def post(self):
        data = request.get_json()

    def delete(self):
        pass

class Notifications(Resource):
    def get(self):
        pass

    def post(self):
        data = request.get_json()

class Poast_by_id(Resource):
    def get(self,id):
        poast = db.session.get(Poast,id)
        if poast:
            return make_response(jsonify(poast.to_dict()), 200)
        else:
            return make_response({'error': 'not found'},404)

class Thread(Resource):
    def get(self, root_id):
        root = Poast.query.get(root_id)
        
        poast_list = Tree(root_id)
        authors = {}
        for poast in poast_list:
            user = db.session.get(User, poast['user_id'])
            authors.update({'_' + str(user.id): {'nickname': user.nickname, 'handle': user.handle}})

        tree_list = Tree(root_id)

        pids = [p['poast_id'] for p in tree_list]
        tree_mentions = []
        for pid in pids:
            mentions = Mention.query.filter_by(poast_id = pid).all()
            for mention in mentions:
                user = db.session.get(User, mention.mentioned_id)
                authors.update({'_' + str(user.id): {'nickname': user.nickname, 'handle': user.handle}})

        return make_response(jsonify({'poasts': Tree(root_id)[::-1], 'users': authors}), 200)  # Return the tree as the response, with a 200 status code

@app.post('/api/login')
def login():
    data = request.json
    handle=data.get('handle')
    user = User.query.filter(User.handle == handle).first()
    if user and bcrypt.check_password_hash(user.password_hash, data['password']):
        session["user_id"] = user.id
        print(user.to_dict())
        return make_response(user.to_dict(), 201)
    else:
        return { "message": "Invalid username or password" }, 401

@app.get('/api/check_session')
def check_session():
    user_id = session.get("user_id")
    user = User.query.filter(User.id == user_id).first()
    if user:
        return user.to_dict(), 200
    else:
        return { "message": "No logged in user" }, 401

@app.delete('/api/logout')
def logout():
    session.pop('user_id')
    return {}, 204

api.add_resource(Thread, '/api/threads/<int:root_id>')

api.add_resource(Users, '/api/users')
api.add_resource(Poasts, '/api/poasts')
api.add_resource(Poast_by_id, '/api/poasts/<int:id>')
api.add_resource(Mentions, '/api/<string:handle>/mentions')
api.add_resource(Follows, '/api/follows')
api.add_resource(Notifications, '/api/<string:handle>/notifications')
api.add_resource(ThumbsUps, '/api/thumbs')
api.add_resource(UserByHandle, '/api/users/<string:handle>')

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

