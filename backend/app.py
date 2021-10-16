
from flask import Flask, jsonify, request
import datetime

host = '192.168.1.21'
app = Flask(__name__)


@app.route('/photo', methods=['POST', 'GET'])
def get_photo():
    message = "no image"
    if request.method == "POST":
        bytesOfImage = request.get_data()
        with open('image.jpeg', 'wb') as out:
            out.write(bytesOfImage)
            message = "image uploaded"
    print(str(request.method))
    return jsonify(message)


if __name__ == "__main__":
    app.run(host=host, port=3000, debug=True)
