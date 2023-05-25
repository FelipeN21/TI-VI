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
  
    texto,valor=eee()
    valor = float(valor)
    data = {'text': texto, 'valor': valor}
    return jsonify(data)
   


def ttt():
    img_path = "imagem.png"
    img = cv2.imread(img_path)
    img = cv2.resize(img, (256, 256))
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    eg = cv2.equalizeHist(gray)
    clahe = cv2.createCLAHE(clipLimit=5)
    eg = clahe.apply(eg)
    eg = cv2.GaussianBlur(eg, (5, 5), 0)
    _, thresh = cv2.threshold(eg, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
    dist_transform = cv2.distanceTransform(thresh, cv2.DIST_L2, 5)
    _, sure_fg = cv2.threshold(dist_transform, 0.5 * dist_transform.max(), 255, 0)
    sure_fg = np.uint8(sure_fg)
    unknown = cv2.subtract(thresh, sure_fg)
    _, binary_eg = cv2.threshold(eg, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    _, markers = cv2.connectedComponents(binary_eg)
    markers = markers + 1
    markers[unknown == 255] = 0
    eg = cv2.cvtColor(eg, cv2.COLOR_GRAY2BGR)
    markers = cv2.watershed(eg, markers)
    eg[markers == -1] = 255

    model = tf.keras.models.load_model("final.h5")
    prediction = model.predict(np.expand_dims(eg, axis=0))

    if prediction[0][0] > prediction[0][1]:
        return "Existe com a probabilidade de", prediction[0][0]
    else:
        return "Não existe com a probabilidade de", prediction[0][1]

def ddd():
    img_path = "imagem.png"
    img = cv2.imread(img_path)
    img = cv2.resize(img, (256, 256))
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)  # Converte para escala de cinza

    # Aplica a equalização do histograma
    eg = cv2.equalizeHist(gray)
    eg_rgb = cv2.cvtColor(eg, cv2.COLOR_GRAY2BGR)

    # Carrega o modelo pré-treinado
    model = tf.keras.models.load_model("resnet_modelFinal.h5")

    # Realiza a predição
    prediction = model.predict(np.expand_dims(eg_rgb, axis=0))
    print(prediction)
    print(prediction[0][0])
    print(prediction[0][1])
    
    if (prediction[0][0] > prediction[0][1]) :
        return "Não existe com a probabilidade de", prediction[0][1]
    else:
        return "Existe com a probabilidade de", prediction[0][1]


def eee():
    img_path = "imagem.png"
    img = cv2.imread(img_path)
    img = cv2.resize(img, (256, 256))
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)  # Converte para escala de cinza

    # Aplica o filtro Gaussian Blur
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)

    # Aplica a equalização do histograma
    equalized = cv2.equalizeHist(gray)

    # Aplica o ajuste de contraste gamma
    gamma = 0.5
    gamma_corrected = np.power(gray / 255.0, gamma)
    gamma_corrected = np.uint8(gamma_corrected * 255)

    # Carrega o modelo pré-treinado
    model = tf.keras.models.load_model("resnet_modelFinal.h5")

    # Realiza a predição para cada imagem
    predictions = []
    for img in [blurred, equalized, gamma_corrected]:
        img_rgb = cv2.cvtColor(img, cv2.COLOR_GRAY2BGR)
        prediction = model.predict(np.expand_dims(img_rgb, axis=0))
        predictions.append(prediction[0][1])

    # Calcula a média das probabilidades
    avg_prob = np.mean(predictions)

    if avg_prob < 0.5:
        return "Existe com a probabilidade de", avg_prob
    else:
        return "Não existe com a probabilidade de", avg_prob


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