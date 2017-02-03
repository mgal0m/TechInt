from flask import Flask, request
from flask_cors import CORS, cross_origin
from werkzeug import secure_filename
import json, os
from os import listdir
from os.path import isfile, join


app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = 'uploads/'

@app.route('/')
def hello():
    return "True", {'Access-Control-Allow-Origin': '*'}

@app.route('/status', methods=['GET']) #server status
def getStatus():
    return "ON"

@app.route('/addClient', methods=['Post']) # add client
def addClient():
    name=request.form['name']
    add = True
    with open('clients.json') as json_data:
        d = json.load(json_data)
        print(d)
        for i in range(len(d)):
            if name == d[i]['name']:
                add = False
        if add == True:
            a = d
            a.append({'name': name})
            with open('clients.json', 'w') as json_file:
                json.dump(a, json_file)
            print(a)
    return "OK"

@app.route('/getClients', methods=['GET'])
def getClients():
    with open('clients.json') as json_data:
        d = json.load(json_data)
        print(d)
        data = json.dumps(d, skipkeys=True) 
        return data, {'Access-Control-Allow-Origin': '*'}

@app.route('/uploader', methods = ['POST'])
def upload_file():
   if request.method == 'POST':
      f = request.files['file']
      filename = secure_filename(f.filename)
      f.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
      return 'file uploaded successfully'

@app.route('/fileList', methods = ['GET'])
def fileList():
    mypath = mypath="C:"+os.sep+"Users"+os.sep+"Marcin"+os.sep+"Desktop"+os.sep+"TI"+os.sep+"uploads"+os.sep
    onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]
    files = []
    for i in range(len(onlyfiles)):
        files.append({'file': onlyfiles[i]})
    data = json.dumps(files, skipkeys=True)
    return data, {'Access-Control-Allow-Origin': '*'}

@app.route('/test', methods = ['POST'])
def test():
   if request.method == 'POST':
      f = request.get_json()
      print(f)
      return "OK"
      

if  __name__ == "__main__":
    app.run()


