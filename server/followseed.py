#!/usr/bin/env python3

# Standard library imports
from random import uniform, randint, choice as rc

# Remote library imports
from faker import Faker
import time

# Local imports
from app import app
from models import db, User, Follow

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():

        Follow.query.delete()

        for n in range(1,11):
            for m in range(1,11):
                if uniform(0,1) > .6 and m !=n:
                    new_follow = Follow(writer_id = m, reader_id = n)
                    db.session.add(new_follow)
            db.session.commit()