# POASTR

This is a text-based social media application in which users can have conversations. Threads have a tree structure.

## Installation Guide

Dependencies:

### Javascript dependencies

"react": "^18.2.0",
"react-dom": "^18.2.0",
"react-router-dom": "^6.21.1",
"react-scripts": "5.0.1",
"web-vitals": "^2.1.4"

### Python dependencies:

[[source]]
url = "https://pypi.org/simple"
verify_ssl = true
name = "pypi"

[packages]
flask = "*"
flask-bcrypt = "*"
flask-socketio = "*"
flask-sqlalchemy = "3.0.3"
Werkzeug = "2.2.2"
flask-migrate = "*"
sqlalchemy-serializer = "*"
flask-restful = "*"
flask-cors = "*"
faker = "*"

[requires]
python_full_version = "3.8.13"

## Starting the server

From the main directory, run

```shell
$ pipenv install
$ pipenv shell
$ cd server
$ python app.py
```

## Starting the client

Navigate to the client directory and run

```shell
$ npm install
$ npm start
```

## Contributing

Contact me on github.

## License

MIT license

## Use

Feel free to explore. Read and write poasts, tag other users by including their handles in your poasts.