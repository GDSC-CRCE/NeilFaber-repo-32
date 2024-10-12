from flask import Flask, redirect, render_template, request, session, url_for, jsonify
from flask_cors import cross_origin, CORS

from keys import FLASK_SESSION_KEY
from src.data_handler.data_classes import ProductsHandler, UsersHandler
from src.unsplash.images import get_image_as_bytes, get_random_unsplash_image

app = Flask(__name__)
app.secret_key = FLASK_SESSION_KEY
CORS(app)

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


@app.route('/products')
def products():
    return render_template('product.html')


@app.route('/product-details/<int:id>')
def product_details(id):
    item = productsHandler.retrieve_data(id=id)[0]
    item = {'name': item[2], 'description': item[3],
            'imageUrl': item[5], 'price': item[6], 'co2print': item[7], 'envimp': item[8], 'productId': item[0]}
    return jsonify(item)


@app.route('/cart')
def cart():
    return render_template('cart.html')


def create_rough_Work():
    if not productsHandler.retrieve_data(category='Hygiene'):
        userHandler.create_user(
            'Jack', 'Sequeira', '', '9922992299', 'jackas@gmail.com', None, 'asd', '', '')
        productsHandler.create_data(
            'Hygiene', 'Bamboo Toothbrush Family Pack (4 pc)| Biodegradable And Compostable Handle | Eco-friendly', 'Bamboo Toothbrush Family Pack: Make a sustainable choice for your entire family with our bamboo toothbrush family pack. Each toothbrush features a handle crafted from renewable bamboo, known for its natural antibacterial properties and biodegradability. The soft bristles ensure effective cleaning while being gentle on gums, suitable for both adults and kids. Promote oral hygiene while reducing environmental impact with our eco-friendly family pack, designed for a cleaner planet and healthier smiles.', 'Use of recycled materials: Recycled materials typically require less energy to produce than virgin materials, which can help to reduce greenhouse gas emissions.\n Reduced energy consumption during manufacturing: Eco-friendly manufacturers may use energy-efficient processes or renewable energy sources to power their facilities.\n Durable and long-lasting products: Products that are designed to last for a long time will need to be replaced less frequently, which can help to reduce the overall environmental impact.\n Easy to recycle or compost: Products that can be easily recycled or composted at the end of their useful life can help to divert waste from landfills.', 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSsoPu5u1ifSmuFUyjnoCtLNTFBJUEFFZikIcRmqXJUkNKlcnl61bpUFJQsDx1qZMtKrTfKTj4CNThs4JFupCb3uoxGfzY7wA', 400, .2, .3)
