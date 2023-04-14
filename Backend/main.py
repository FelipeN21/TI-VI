from flask import Flask, request, jsonify
import base64
from io import BytesIO
from PIL import Image
from flask_cors import CORS, cross_origin


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
    print(data)
 
    return "imagem salva"

@cross_origin()
@app.route("/dados")
def dados():
    dados={'d':'s','t':'t'}
    return jsonify(dados)

@app.route("/oi", methods=['POST'])
def oi():
    imagemX84 = request.form['imagem']
    
    return "oi"

if __name__ =='__main__':
    app.run(debug=True)