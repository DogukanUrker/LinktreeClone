from .database import colLinks


class LinkDB:
    def addLink(data):
        colLinks.insert_one(data)

    def fetchLink(username):
        return colLinks.find({"author": username})
