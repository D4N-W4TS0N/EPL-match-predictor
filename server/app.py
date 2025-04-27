from flask import Flask, render_template, request, url_for, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True, origins="http://localhost:3000")

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = '9f!2cL#z@N7$wTp1e%QxV8rY0mKdU6Ao'
app.config['SESSION_COOKIE_SAMESITE'] = 'None' ;'Secure'
app.config['SESSION_COOKIE_SECURE'] = True    # True if using HTTPS


db = SQLAlchemy(app)
loginManager = LoginManager()
loginManager.init_app(app)
loginManager.login_view = 'login'
loginManager.unauthorized_handler(lambda: ('Unauthorized', 401))

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True) # Unique ID for each user, defines each record
    email = db.Column(db.String(150), unique=True, nullable=False) # Email must be unique
    password = db.Column(db.String(150), nullable=False)
    firstName = db.Column(db.String(150), nullable=False)
    lastName = db.Column(db.String(150), nullable=False) 
    team = db.Column(db.String(150), nullable=True) # Initially set to None, can be updated later
    
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

    # print("Session ID:", db.session.get('_id'))
    # print("User logged in:", current_user.is_authenticated)

    return 'User created', 201 # Return a success message with response code 201

@app.route('/choose-team', methods=['POST'])
@login_required
def chooseTeam():
    print(current_user)

    data = request.get_json()

    current_user.team = data['team']
    print(data['team'])
    db.session.commit()
    
    return 'Team selection updated', 200



@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == "GET":
        return 'Login Required', 401

    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if not user:
        return 'Email not registered', 400
    
    if password != user.password:
        return 'Incorrect password', 400

    login_user(user)

    return 'Logged in', 200

# Run the application
if __name__ == '__main__':
    app.run(debug=True)