#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker
import time

# Local imports
from config import bcrypt
from app import app
from models import db, User, Poast

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():

        Poast.query.delete()
        db.session.commit()

        User.query.delete()
        db.session.commit()

        users = []
        for n in range(10):
            users.append(User(nickname=fake.first_name(), handle=fake.last_name().lower(), password_hash=bcrypt.generate_password_hash('123').decode('utf-8'), bio=fake.sentence(), total_likes=0))
        db.session.add_all(users)
        db.session.commit()

        for n in range(200):
            sentence = fake.sentence()
            if n < 15:
                current_time_str = time.strftime("%Y-%m-%d %H:%M:%S")
                data = {'user_id': randint(1,10), 'text': fake.sentence(), 'timestamp': current_time_str}
                new_poast = Poast(
                user_id=data['user_id'],
                text=data['text'],
                timestamp = current_time_str,
                children = ""
            )
            else:
                current_time_str = time.strftime("%Y-%m-%d %H:%M:%S")
                data = {'user_id': randint(1,10), 'text': fake.sentence(), 'timestamp': current_time_str, 'parent_id': randint(1,n-10)}
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
        
        print("Starting seed...")

        

        # Seed code goes here!
