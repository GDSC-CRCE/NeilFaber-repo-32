from flask import Flask, render_template, session, redirect
from flask_cors import cross_origin
from keys import FLASK_SESSION_KEY

app = Flask(__name__)
app.secret_key = FLASK_SESSION_KEY
