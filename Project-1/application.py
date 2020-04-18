from flask import Flask, render_template, request, session, url_for, redirect
from flask_session import Session
from functools import wraps
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
import os
import datetime


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

db = SQLAlchemy(app)

def login_verify(f):
    @wraps(f)
    def decorated_fuction(*args,**kwargs):
        if "log_in" not in session:
            return redirect(url_for("auth"))
        return f(*args,**kwargs)
    return decorated_fuction

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
    if("log_in" in session and "user_name" in session):
        return render_template("user_home.html", name=session["user_name"])
    return render_template("index.html")



@app.route("/register", methods=["POST","GET"])
def register():
    if(request.method == "GET"):
        return render_template("register.html")
    elif(request.method == "POST"):
        name = request.form.get("user")
        password = generate_password_hash(request.form.get("pwd"))
        time = datetime.datetime.now()
        try:
            user_obj = book_users(name = name , password = password , time = time)
            db.session.add(user_obj)
            db.session.commit()
            print("User has been added:",name)
            return render_template("registered_users.html", names = user_obj)
        except:
            return render_template("error.html",flag = False)

@app.route("/admin")
def admin():
    users = book_users.query.all()
    return render_template("admin_page.html", user = users)


@app.route("/auth", methods = ["POST","GET"])
def auth():
    if request.method == "GET":
        return render_template("auth.html")
    elif request.method == "POST":
        name = request.form.get("user")
        password = request.form.get("pwd")
        get_user = book_users.query.filter_by(name = name).first()
        if(get_user == None):
            return render_template("register.html")
        elif get_user.name == name and check_password_hash(get_user.password,password):
            session["log_in"] = True
            session["user_name"] = name
            return redirect(url_for("user_home"))
        else:
            return render_template("error.html",flag = True)

@app.route("/user_home")
@login_verify
def user_home():
    return render_template("user_home.html",name = session["user_name"])

@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("index"))

