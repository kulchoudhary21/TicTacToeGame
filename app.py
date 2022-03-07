from flask import Flask, jsonify, request
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from firebase_admin import auth
from flask_cors import CORS
from flask import Flask
from datetime import datetime
try:
    app = Flask(__name__)
    cors = CORS(app)
    cred = credentials.Certificate('ecommerce-96643-firebase-adminsdk-jtrqt-3b3d63264d.json')
    default_app=firebase_admin.initialize_app(cred, {
    'databaseURL': "https://ecommerce-96643-default-rtdb.firebaseio.com/"
    })        

    @app.get("/results")
    def getAllResults():
        try:
            ref = db.reference('/scores')
            scores=ref.get();
            return jsonify(scores), 200
        except Exception as e:
            print("Internal Server Error", 500, str(e))
            return (("Internal Server Error"), 500)

    @app.post("/result")
    def addResult():
        try:
            score=request.get_json();
            now = datetime.now()
            currentDateTime = now.strftime("%d/%m/%Y %H:%M:%S");
            print("date and time =", currentDateTime);
            score['date']=currentDateTime;
            print(score);
            ref = db.reference('/scores')
            ref.push(score)
            return "Success", 200
        except Exception as e:
            print("Internal Server error:", str(e))
            return (str(e)),500;

except Exception as e:
    print("error :"+str(e));