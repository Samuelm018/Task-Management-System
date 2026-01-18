from flask import Flask
from flask_cors import CORS
from config import Config
from database import db
from errors.handlers import errors_bp
from routes.auth_routes import auth_bp
from routes.task_routes import task_bp

app = Flask(__name__)
app.config.from_object(Config)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

db.init_app(app)

app.register_blueprint(errors_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(task_bp)

from flask import render_template

@app.route('/')
def home():
    return render_template('index.html')


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
