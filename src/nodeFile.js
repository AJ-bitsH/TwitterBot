// var Twitter = require("twitter");
// var config = require("./config.js");
// var client = new Twitter(config);

// // Set up your search parameters

// var params = { user_id: "1367067637847494658", count: 10 };
// client.get(
//   "https://salty-depths-57530.herokuapp.com/https://api.twitter.com/1.1/statuses/user_timeline.json",
//   params,
//   function (error, tweets, response) {
//     console.log(error);
//     if (!error) {
//       tweets.map((tweet, index) => {
//         var text = tweet.text;
//         var html = urlify(text);
//         console.log(tweet);
//       });
//     }
//   }
// );

var Twitter = require("twitter");
var config = require("./config.js");
var client = new Twitter(config);

// Set up your search parameters

export const fetch = (username) => {
  var params = { screen_name: username, count: 10 };
  client.get(
    "https://api.twitter.com/1.1/statuses/user_timeline.json",
    params,
    function (error, tweets, response) {
      if (!error) {
        tweets.map((tweet, index) => {
          console.log(tweet);
        });
      }
    }
  );
};

function urlify(text) {
  var urlRegex = /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi;
  return text.replace(urlRegex, function (url) {
    return '<a href="' + url + '">' + url + "</a>";
  });
}
