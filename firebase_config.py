import firebase_admin
from firebase_admin import credentials, db

# Correct path to your Firebase service account key (use the absolute path)
cred = credentials.Certificate(r"./farmer-4.json")

# Initialize Firebase Admin SDK with the credentials
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://farmer-4e3d2-default-rtdb.firebaseio.com/'
})

# Function to get a reference to the Firebase Realtime Database
def get_db_reference(path):
    return db.reference(path)
