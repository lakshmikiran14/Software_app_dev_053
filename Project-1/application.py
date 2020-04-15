from flask import Flask, render_template, request


app = Flask(__name__)
users = []

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/register", methods=["POST","GET"])
def register():
	if(request.method == "GET"):
		return render_template("register.html")
	elif(request.method == "POST"):
		users.append(request.form.get("email"))
		return render_template("registered_users.html", names = users)