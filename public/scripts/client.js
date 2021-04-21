/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  const createTweetElement = function (tweetObj) {
    const username = tweetObj.user.name

    const $tweet = $(`<div class = "name-header">
    <div class = "user"action="/tweets" method="GET">name</div>
    <div class = "handle">@name</div>
  </div> 
  <div class ="tweet">hifhsufoaihfiashf</div>
  <footer class= "date-footer"> 
    <div class = "date"><div class="timeago" datetime="2016-06-30 09:20:00"></div></div>`);
  }
   
})


const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}