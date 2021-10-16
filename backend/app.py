
from flask import Flask, jsonify, request
import datetime
import base64

host = '192.168.1.21'
app = Flask(__name__)


@app.route('/photo', methods=['POST', 'GET'])
def get_photo():
    message = "no image"
    print(str(request.method))
    if request.method == "POST":

        response = request.get_data()
        n = len(response)
        print(n)
        padding = '=' * (4 - n % 4)
        newresponse = response + bytes(padding, 'utf-8')
        '''
        with open('new.txt', 'wb') as test:
            test.write(newresponse)
        print(len(newresponse))
        '''

        imgdata = base64.b64decode(newresponse)
        with open("test1.png", "wb") as fh:
            fh.write(imgdata)
            message = "image uploaded"

        print("end of post")

    return jsonify(message)


if __name__ == "__main__":
    app.run(host=host, port=3000, debug=True)
