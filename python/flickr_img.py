mport os
import json
import logging
import requests
import random
from slackclient import SlackClient

# ログ設定
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# FlickrのAPIキー情報
FlickrApiKey = os.environ['flickrApiKey']

# Slack情報
SlackToken = os.environ['slackToken']

# 検索キーワード
keyword = 'panda'
tag = 'panda'
num = 100

#メインロジック
def lambda_handler(event, context):
    # 受け取ったイベント情報をCloud Watchログに出力
    #print (event)

    url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search'
    print (url)

    payload = {
        'method': 'flickr.photos.search',
        'api_key': FlickrApiKey,
        'text': keyword,
        'tags': tag,
        'extras': 'url_s',
        'per_page': num,
        'sort': 'relevance',
        'format': 'json',
        'nojsoncallback': '1'
        }

    #画像検索
    rand = random.randrange(num)
    i = 0
    r = requests.get(url, params=payload)
    res = r.json()

    // 100件の中から1件をランダムに出力
    post_message(res['photos']['photo'][rand]['url_s'])

#Slack送信
def post_message(img_url):
    sc = SlackClient(SlackToken)
    sc.api_call(
        "chat.postMessage",
        channel="#test",
        text=img_url,
        reply_broadcast=True
    )
