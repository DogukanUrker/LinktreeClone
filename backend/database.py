import motor.motor_asyncio
from models import User

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017/')
db = client.LinktreeClone
collection = db.user

async def createUser(user):
    document = user
    result = await collection.insert_one(document)
    return document
