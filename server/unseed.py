#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker
import time

# Local imports
from app import app
from models import db, User, Poast

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():

        Poast.query.delete()
        db.session.commit()

        User.query.delete()
        db.session.commit()