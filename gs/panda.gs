# FlickrのAPIキー情報
FlickrApiKey = '[FlickrのAPIキー]'

# Slack情報
SlackToken = '[SlackのToken]'

// 検索キーワード
keyword = '[検索したいキーワード]'
tag = '[検索したいタグ]'
num = [出力件数]

function pandaFunction() {
    var img_url = getFlickrImg();
    flickrSlackPost(img_url);
}

function getFlickrImg() {
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

　　var str_param = param(payload);
    var json = UrlFetchApp.fetch(FlickrApiUrl + str_param);
    var data = JSON.parse(json);
  
    var rand = Math.floor(Math.random() * num) + 1;
    
    if (data['photos']['photo']) {
        var res = data['photos']['photo'][rand]['url_s']
    }
    return res;
}

function flickrSlackPost(message) {  
  var slackApp = SlackApp.create(SlackBotToken);
  var ChannelId = "#test";
  var botName = "ああああ";
  var botIcon = "bell";  
  var Options = {
      username: botName,
      icon_emoji: ':bell:',
  }
  slackApp.postMessage(ChannelId, message, Options);
}

function param(obj) {
    var i = 0;
    var param = "";

    for (var property in obj) {
        param += (i)?"&" + property + "=" + obj[property]:"?" + property + "=" + obj[property];
        i++;
    }

    return param;
}
