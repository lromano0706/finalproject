import numpy as np
import csv
from flask import Flask, jsonify
from flask_cors import CORS

######################################################
#  Flask Setup & Routes
######################################################

# Enable CORS
app = Flask(__name__)
CORS(app)


@app.route("/")
def welcome():
    return (
        f"/api/v1.0/crime <br/>"
        f"/api/v1.0/height_avg"
    )

# function will jsonify medal_list and we will use API in JS for mapping
@app.route("/api/v1.0/crime")
def crime():
    with open("../finalproject/Data/crime_cities_coords.csv", "r") as f:
        reader = csv.DictReader(f)
        crime_list = list(reader)
        return jsonify(crime_list)


if __name__ == '__main__':
    app.run(debug = True)