from flask import Flask, request, jsonify
app = Flask(__name__)
import os
import requests
import logging
logging.basicConfig(level=logging.DEBUG)

SCRAPER_API_ROOT = "http://localhost:8000"

@app.route("/")
def root():
    return "root endpoint"

@app.route('/api/criteria', methods=["POST"])
def criteria():
    body = request.json
    url = body["url"]
    criteria = body["criteria"]

    resp = {}
    for criterion in criteria:
        criteria_type = criterion["templateID"]
        if criteria_type == "follow":
            app.logger.info("Follow type!")
        elif criteria_type == "comment":
             resp = get_comments(url)
        elif criteria_type == "tag":
            app.logger.info("Tag type!")
        elif criteria_type == "like":
             app.logger.info("Log type!")
        else:
            app.logger.error("Unknown criteria_type %s" % criteria_type)

    return (jsonify(resp), 200)


def get_comments(url):
    endpoint = "/api/comments/test"
    url = "{}{}".format(SCRAPER_API_ROOT, endpoint)
    r = requests.get(url)
    return r.json()

def get_likes(url):
    pass

if __name__ == '__main__':
    app.run(port=5000)