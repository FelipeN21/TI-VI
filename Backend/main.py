from flask import Flask, request, jsonify
import base64
from io import BytesIO
from PIL import Image
from flask_cors import CORS, cross_origin
import tensorflow as tf
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import cv2
import numpy as np

app=Flask(__name__)
cors = CORS(app)

@cross_origin()
@app.route("/receber", methods=['POST'])
def receber():
    data=request.get_json()
    image64= data['imagem']
    imagem_bytes = base64.b64decode(image64.split(',')[1])
    img = Image.open(BytesIO(imagem_bytes))
    img.save('imagem.png') 
  
    texto,valor=ttt()
    valor = float(valor)
    data = {'text': texto, 'valor': valor}
    return jsonify(data)
   


def ttt():

    img_path = "imagem.png"
    img = cv2.imread(img_path)
    img = cv2.resize(img, (224, 224))
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    eg = cv2.equalizeHist(gray)
    clahe=cv2.createCLAHE(clipLimit=5)
    eg=clahe.apply(eg)
    eg= cv2.GaussianBlur(eg, (5,5), 0)
    _, thresh = cv2.threshold(eg, 0, 255, cv2.THRESH_BINARY_INV+cv2.THRESH_OTSU)
    dist_transform = cv2.distanceTransform(thresh, cv2.DIST_L2, 5)
    _, sure_fg = cv2.threshold(dist_transform, 0.5*dist_transform.max(), 255, 0)
    sure_fg = np.uint8(sure_fg)
    unknown = cv2.subtract(thresh, sure_fg)
    _, binary_eg = cv2.threshold(eg, 0, 255, cv2.THRESH_BINARY+cv2.THRESH_OTSU)
    _, markers = cv2.connectedComponents(binary_eg)
    markers = markers + 1
    markers[unknown==255] = 0
    eg = cv2.cvtColor(eg, cv2.COLOR_GRAY2BGR)
    markers = cv2.watershed(eg, markers)
    eg[markers == -1] = 255
    img_array = img_to_array(eg)
    img_array = img_array / 255.0
    model = tf.keras.models.load_model("tb_detection.h5")
    prediction = model.predict(np.array([img_array]))
    if prediction[0][0] > prediction[0][1]:
        return "Existe Com a probabilidade de",prediction[0][0]
       # print("tem com a probabilidade de ",prediction[0][0])
    else:
        return"Nao existe Com a probabilidade de",prediction[0][1]
        #print("nao com a probabilidade de ",prediction[0][1])   

    


@cross_origin()
@app.route("/dados")
def dados(texto,valor):
    valor = float(valor)
    data = {'text': texto, 'valor': valor}
    return jsonify(data)

@app.route("/oi", methods=['POST'])
def oi():
    imagemX84 = request.form['imagem']
    
    return "oi"

if __name__ =='__main__':
    app.run(debug=True)