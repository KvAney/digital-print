from dotenv import load_dotenv
import yaml
import requests
from Backend.utils.Videotemplate import Video
from flask import Flask, jsonify
from Backend.utils.mappings import load_category_mappings
from Backend.starter import get_authenticated_service
from Backend.api.apis import getDetails,remove_like
# get your utube liked video

# https://www.googleapis.com/auth/youtube.force-ssl

from flask_cors import CORS
app = Flask(__name__)
CORS(app)
load_dotenv()

@app.route('/getDetails',methods = ["GET"])
def load_Data():
    return jsonify({"response" : getDetails()} ), 201

@app.route('/removeLike',methods=['POST'])
def remove():
 video_id = requests.get('video_id')
 return remove_like(video_id)
  


if(__name__ == "__main__"):
    app.run(debug=True)