
from flask import Flask, jsonify, request
import datetime
import base64

from flask.helpers import send_file
from mmsegmentation.tools.serve_local import LocalModelServer

HOST = '192.168.1.166'
CONFIG_FILE = 'mmsegmentation/configs/ocrnet/ocrnet_hr18_512x1024_40k_labelmefacade.py'
CHECKPOINT_FILE = 'mmsegmentation/work_dirs/ocrnet_hr18_512x1024_40k_labelmefacade/latest.pth'
IMG_FILE = 'test1.jpg'
PROCESSED_IMG_FILE = 'test1_processed.jpg'

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
        
        result = modelServer.infer(IMG_FILE)
        modelServer.save_visualise(IMG_FILE, result, PROCESSED_IMG_FILE)
        imgdata = modelServer.get_visualise(IMG_FILE, result)
        response = {
          # 'img': str(base64.b64encode(imgdata))
          "test": 1
        }

    return jsonify(response)
    # return jsonify(str(b64imgdata))
    # return send_file(PROCESSED_IMG_FILE, mimetype='image/jpg', as_attachment=True)


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
    modelServer = LocalModelServer(config_file=CONFIG_FILE, checkpoint_file=CHECKPOINT_FILE)
    app.run(host=HOST, port=8080, debug=True)
