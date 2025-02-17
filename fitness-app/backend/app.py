from flask import Flask, jsonify
from flask_cors import CORS  # To allow cross-origin requests from React Native
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing for the React Native app

# MongoDB setup
client = MongoClient("mongodb://localhost:27017")  # Update this with your MongoDB URI if needed
db = client['fitnessApp']
leaderboard_collection = db['leaderboard']

# Dummy data for the leaderboard (you can remove this after actual data insertion)
leaderboard_data = [
    {"username": "john_doe", "score": 100},
    {"username": "jane_smith", "score": 90},
    {"username": "alice_williams", "score": 80},
    {"username": "bob_brown", "score": 70},
    {"username": "charlie_jones", "score": 60},
]

# Insert dummy data into MongoDB (only once)
leaderboard_collection.insert_many(leaderboard_data)

# Route to fetch leaderboard data
@app.route('/leaderboard', methods=['GET'])
def get_leaderboard():
    leaderboard = list(leaderboard_collection.find({}, {"_id": 0}))  # Exclude MongoDB's _id field
    return jsonify(leaderboard)

if __name__ == '__main__':
    app.run(debug=True)  # Run the Flask app
