from flask import Flask, render_template, request, jsonify
from bson import ObjectId
from mlmodel import model


app = Flask(__name__)


@app.route("/")
def index():   

    # render an index.html template and pass it the data you retrieved from the database
    return render_template("index.html")



@app.route("/estimate/<valString>")
def estimate(valString):
    values = valString.split('-')
    return jsonify(round(model(values)[0],0))

if __name__ == "__main__":
    app.run(debug=True)