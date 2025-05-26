
import requests
import os
from flask import Flask, jsonify,redirect,request,session
from api.apis import getDetails,remove_like
from starter import start_auth_flow,handle_auth_callback,get_authenticated_service,get_user_email
# get your utube liked video

# https://www.googleapis.com/auth/youtube.force-ssl

from flask_cors import CORS
app = Flask(__name__)
app.secret_key = os.environ.get("FLASK_SECRET_KEY", "dev_only_default_key") 
CORS(app,supports_credentials=True, origins="*")

@app.route('/getDetails',methods = ["GET"])
def load_Data():
    service = get_authenticated_service()
    if not service:
        return jsonify({"error": "Not authenticated"}), 401
    
    return jsonify({"response" : getDetails()} ), 201

@app.route('/removeLike',methods=['POST'])
def remove():
    video_id = request.get_json().get('video_id')
    print('Somehitn?:',video_id)
    if not video_id:
        print('Nothign brp')
        return {"error": "Missing video_id"}, 400
    success = remove_like(video_id)
    print('Bro success-==>',success)
    if success:
            return {"status": "success", "video_id": video_id}
    else:
        return {"status": "failure"}, 500

  
@app.route("/auth")
def auth():
    return start_auth_flow()

@app.route("/oauth2callback")
def oauth2callback():
    _,creds,email = handle_auth_callback()
    session['user_email'] = email
    return redirect(f"http://localhost:4200?email={email}")

if(__name__ == "__main__"):
    app.run(host="0.0.0.0", port=5000)