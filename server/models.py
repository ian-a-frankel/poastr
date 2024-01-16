from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!

class User(db.Model, SerializerMixin):
    __tablename__ = 'user_table'
    id = db.Column(db.Integer, primary_key=True)
    handle = db.Column(db.String, unique=True)
    nickname = db.Column(db.String)
    bio = db.Column(db.String)
    total_likes = db.Column(db.Integer)
    password_hash = db.Column(db.String)

    notifs = db.relationship('Notification', back_populates='user')
    poasts = db.relationship('Poast', back_populates='user')
    likes = db.relationship('ThumbsUp', back_populates='user')

    serialize_only = ('id', 'handle','nickname','bio')

class Follow(db.Model, SerializerMixin):
    __tablename__ = 'follow_table'
    id = db.Column(db.Integer, primary_key=True)
    writer_id = db.Column(db.Integer, db.ForeignKey('user_table.id'))
    reader_id = db.Column(db.Integer, db.ForeignKey('user_table.id'))

    serialize_only = ('reader_id','writer_id')

class Poast(db.Model, SerializerMixin):
    __tablename__ = 'poast_table'
    id = db.Column(db.Integer, primary_key=True)
    text=db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user_table.id"))
    parent_id = db.Column(db.Integer, db.ForeignKey("poast_table.id"), nullable=True)
    ancestry = db.Column(db.String)
    children = db.Column(db.String)

    likes = db.Column(db.Integer)
    children_count = db.Column(db.Integer)
    engagement_count = db.Column(db.Integer)
    timestamp = db.Column(db.String)

    user = db.relationship('User',back_populates='poasts')
    likes=db.relationship('ThumbsUp',back_populates='poast')
    mentioned=db.relationship('Mention',back_populates='poast')

    serialize_only = ('id','text','user.handle','user.nickname','timestamp','ancestry', 'mentioned','likes')

class Mention(db.Model, SerializerMixin):
    __tablename__ = 'mention_table'
    id = db.Column(db.Integer, primary_key=True)
    mentioned_id = db.Column(db.Integer, db.ForeignKey("user_table.id"))
    mentioner_id = db.Column(db.Integer, db.ForeignKey("user_table.id"))
    poast_id = db.Column(db.Integer, db.ForeignKey("poast_table.id"))
    timestamp = db.Column(db.String)

    mentioner = db.relationship('User',foreign_keys=[mentioner_id])
    mentioned = db.relationship('User', foreign_keys=[mentioned_id])
    poast = db.relationship('Poast',back_populates='mentioned')

    serialize_only = ('mentioner_id', 'mentioned_id', 'poast_id', 'mentioned.handle')

class ThumbsUp(db.Model, SerializerMixin):
    table_name = 'thumbs_table'
    id=db.Column(db.Integer, primary_key=True)
    poast_id = db.Column(db.Integer, db.ForeignKey("user_table.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("poast_table.id"))
    timestamp = db.Column(db.String)

    poast = db.relationship('Poast', back_populates='likes')
    user = db.relationship('User', back_populates='likes')

    serialize_only = ('user_id', 'poast_id')

class Notification(db.Model, SerializerMixin):
    __tablename__ = 'notification_table'
    id = db.Column(db.Integer, primary_key=True)
    target_user_id = db.Column(db.Integer, db.ForeignKey("user_table.id"))
    notetext = db.Column(db.String)
    timestamp = db.Column(db.String)

    user = db.relationship('User', back_populates='notifs')

    serialize_only = ('id', 'target_user_id', 'notetext', 'timestamp')