from sqlalchemy import *
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
import csv

engine = create_engine(os.getenv("DATABASE_URL"))
Session = sessionmaker(bind = engine)
session = Session()
Base = declarative_base()
Base.metadata.create_all(engine)

class Book_obj(Base):
	__tablename__ = "book_details"
	isbn = Column(String, primary_key = True)
	title = Column(String)
	author = Column(String)
	year = Column(Integer)

book_list = list(csv.reader(open("books.csv")))
for each in book_list[1:]:
	session.add(Book_obj(isbn = each[0], title = each[1], author = each[2], year = int(each[3])))
print("List of Books")
session.commit()
