from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
import os
import datetime


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

class book_users(db.Model):
	__tablename__ = "user_info"
	name = db.Column(db.String, primary_key = True, nullable = False)
	password = db.Column(db.String, nullable = False)
	time = db.Column(db.Date,nullable = False)
# db.drop_all()
# db.create_all()
# db.session.commit()


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/register", methods=["POST","GET"])
def register():
	if(request.method == "GET"):
		return render_template("register.html")
	elif(request.method == "POST"):
		name = request.form.get("user")
		password = request.form.get("pwd")
		time = datetime.datetime.now()
		try:
			user_obj = book_users(name = name , password = password , time = time)
			db.session.add(user_obj)
			db.session.commit()
			return render_template("registered_users.html", names = user_obj)
		except:
			return render_template("error.html")

@app.route("/admin")
def admin():
	users = book_users.query.all()
	return render_template("admin_page.html", user = users)
