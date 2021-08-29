from flask import Flask, render_template, request, jsonify
import json
import pandas as pd
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import csv
from mlmodel import mlmodel
from config import PASSWORD

engine = create_engine(f"postgresql://root:{PASSWORD}@mypostgresdb.c57smewha8wr.us-west-1.rds.amazonaws.com:5432/finalproject")
conn = engine.connect()

app = Flask(__name__)

@app.route("/")
def index():   
    return render_template("index.html")

# probably delete this later v
# @app.route("/api/v1.0/crime")
# def crime():
#     with open("../finalproject/Data/crime_cities_coords.csv", "r") as f:

#         reader = csv.DictReader(f)
#         crime_list = list(reader)
#         return jsonify(crime_list)

@app.route("/estimate/<valString>")
def estimate(valString):
    values = valString.split('+')
    return jsonify(round(mlmodel(values)[0],0))

@app.route("/houses")
def houses():
    data = json.loads(pd.read_sql("SELECT * FROM clean_real_estate WHERE price is not null ", conn).to_json(orient="records"))
    return jsonify(data)

@app.route("/schools")
def schools():
    data = json.loads(pd.read_sql("SELECT * FROM school_data ", conn).to_json(orient="records"))
    return jsonify(data)

@app.route("/crimes")
def crimes():
    data = json.loads(pd.read_sql("SELECT * FROM crime_cities_coords", conn).to_json(orient="records"))
    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)


