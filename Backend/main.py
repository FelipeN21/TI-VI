from crypt import methods
from flask import Flask,request, jsonify


app=Flask(__name__)

@app.route("/enviar",methods["POST"])
def enviar_file():
    file=request.files['file']
    return "arquivo aberto"


@app.route("/dados")
def dados():
    dados={'d':'s','t':'t'}
    return jsonify(dados)

if __name__ =='__main__':
    app.run(debug=True) 