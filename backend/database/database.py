from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

client = MongoClient("mongodb://localhost:27017/", server_api=ServerApi("1"))
db = client.LinktreeClone

colUsers = db.users
colLinks = db.links
