from flask import Flask, render_template, request, jsonify
import numpy as np
import csv
from flask_cors import CORS
from mlmodel import model


app = Flask(__name__)
CORS(app)

@app.route("/")
def index():   
    return render_template("index.html")

@app.route("/api/v1.0/crime")
def crime():
    with open("./Data/crime_cities_coords.csv", "r") as f:
        reader = csv.DictReader(f)
        crime_list = list(reader)
        return jsonify(crime_list)

@app.route("/estimate/<valString>")
def estimate(valString):
    values = valString.split('-')
    return jsonify(round(model(values)[0],0))

if __name__ == "__main__":
    app.run(debug=True)
