from flask import Flask, redirect, render_template, request, session, url_for
from flask_cors import cross_origin
from src.unsplash.images import get_image_as_bytes, get_random_unsplash_image
from keys import FLASK_SESSION_KEY
from src.data_handler.data_classes import ProductsHandler, UsersHandler

app = Flask(__name__)
app.secret_key = FLASK_SESSION_KEY

userHandler = UsersHandler()
productsHandler = ProductsHandler()


@app.route('/')
def index():
    if session.get('email'):
        return render_template('home.html')
    else:
        return redirect(url_for('login'))


@app.route('/sign-up', methods=['GET', 'POST'])
def sign_up():
    if request.method == 'POST':
        firstname = request.form.get('first_name')
        lastname = request.form.get('last_name')
        email = request.form.get('email')
        phone = request.form.get('phone')
        dob = request.form.get('dob')
        password = request.form.get('password')

        if not userHandler.retrieve_user(phone=phone) or not userHandler.retrieve_user(email=email):
            userHandler.create_user(first_name=firstname, last_name=lastname, bio='', phone=phone, email=email, image=get_image_as_bytes(
                get_random_unsplash_image()), password=password, shipping_address='', dob=dob)
            session['email'] = email
            return redirect(url_for('index'))
        return render_template('index.html')
    else:
        return render_template('sign-up.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    else:
        email = request.form.get('email')
        password = request.form.get('password')
        if userHandler.retrieve_user(password=password, email=email):
            session['email'] = email
        return redirect(url_for('index'))


@app.route('/log-out')
def log_out():
    session['email'] = None
    return redirect(url_for('login'))
