from flask import Flask, render_template, request, url_for, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # Enable CORS for all routes (Cross Origin Resource Sharing)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
loginManager = LoginManager()
loginManager.login_view = 'login'

class User(db.Model, UserMixin):
    userID = db.Column(db.Integer, primary_key=True) # Unique ID for each user, defines each record
    email = db.Column(db.String(150), unique=True, nullable=False) # Unique email for each user, cannot be left blank
    password = db.Column(db.String(150), nullable=False) # Password for each user, cannot be left blank
    firstName = db.Column(db.String(150), nullable=False) # First name of the user, cannot be left blank
    lastName = db.Column(db.String(150), nullable=False) # Last name of the user, cannot be left blank

# Create database in context of the app
with app.app_context():
    db.create_all() # Create the database tables

@loginManager.user_loader
def load_user(user_id): # Load the user by ID
    return User.query.get(int(user_id)) # Get the user by ID

@app.route('/register', methods=['post'])
def register():
    data = request.get_json() # Get the JSON data from the request
    email = data.get('email') # Retrieves the email from the submitted form
    password = data.get('password') # Retrieves the password from the submitted form
    firstName = data.get('firstName')
    lastName = data.get('lastName')

    if User.query.filter_by(email=email).first(): # Check if the email already exists in the database
        return 'Email already exists', 400 # Return an error if the email already exists, of response code 400
    
    user = User(email=email, password=password, firstName=firstName, lastName=lastName) # Create a new user object

    db.session.add(user) 
    db.session.commit()

    login_user(user)

    return 'User created', 201 # Return a success message with response code 201

@app.route('/login', methods=['post'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not User.query.filter_by(email=email).first():
        return 'Account not found', 400
    


# Run the application
if __name__ == '__main__':
    app.run(debug=True)