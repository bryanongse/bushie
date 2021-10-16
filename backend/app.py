
from flask import Flask, jsonify, request
import datetime
import base64

from flask.helpers import send_file

host = '192.168.1.166'
app = Flask(__name__)


@app.route('/photo', methods=['POST', 'GET'])
def get_photo():
    message = "image not uploaded"
    if request.method == "POST":
        response = request.get_data()
        imgdata = base64.b64decode(response)
        with open("test1.jpg", "wb") as fh:
            fh.write(imgdata)
            message = "image uploaded"
    return jsonify(message)


@app.route('/processedphoto', methods=['GET'])
def processed_photo():
    if request.method == "GET":
        # --------------assuming inputs ML model---------
        # from <ml file> import * (?)
        # ML model accesses the og photo test1.jpg
        # ML model returns a processed photo, stores under the variable <filename>
        # ----------------------------------------------
        filename = 'flower.jpg'
    # return jsonify(results)
    return send_file(filename, mimetype='image/jpg')


@app.route('/results', methods=['GET'])
def get_results():
    # --------------assuming inputs ---------
    # from <file> import * (?)
    #
    # ----------------------------------------------
    results = {"wall_area": 1, "no_of_plants": 1,
               "temp_change": 1, "energy_saving": 1, "cost_saving": 1}
    return jsonify(results)


if __name__ == "__main__":
    app.run(host=host, port=8080, debug=True)
