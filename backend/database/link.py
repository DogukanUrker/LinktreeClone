from .database import colLinks


class LinkDB:
    def addLink(data):
        colLinks.insert_one(data)

    def deleteLink(text):
        colLinks.delete_one({"text": text})

    def fetchLink(username):
        return list(colLinks.find({"author": username}))
