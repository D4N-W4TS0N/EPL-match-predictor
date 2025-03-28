from flask import Flask, render_template, request, url_for, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
loginManager = LoginManager()
loginManager.login_view = 'login'

class Users(db.Model, UserMixin):
    userID = db.Column(db.Integer, primary_key=True) # Unique ID for each user, defines each record
    email = db.Column(db.String(150), unique=True, nullable=False) # Unique email for each user, cannot be left blank
    passsword = db.Column(db.String(150), nullable=False) # Password for each user, cannot be left blank

# Create database in context of the app
with app.app_context():
    db.create_all() # Create the database tables

@loginManager.user_loader
def load_user(user_id): # Load the user by ID
    return Users.query.get(int(user_id)) # Get the user by ID

# Run the application
if __name__ == '__main__':
    app.run(debug=True)