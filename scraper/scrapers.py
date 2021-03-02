import json
import requests

url = "http://localhost:3000/comments"

params = {
    "url": "https://www.instagram.com/p/CK7TCXgLWcw/"
}

res = requests.get(url, params=params)

with open("./comments.json", 'w') as f:
    f.write(json.dumps(res.json()))