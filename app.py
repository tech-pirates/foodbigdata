from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template('index.html')

@app.route('/templates/generic.html')
def genic():
    return render_template('generic.html')

@app.route('/templates/elements.html')
def elements():
    return render_template('elements.html')



if __name__ == '__main__':
    app.run()
