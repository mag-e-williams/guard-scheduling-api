from flask import Flask
from app.endpoints.example import example_blueprint

app = Flask(__name__)
app.register_blueprint(example_blueprint)

if __name__ == '__main__':
    app.run()