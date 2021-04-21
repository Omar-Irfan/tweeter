/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const createTweetElement = function(tweetObj) {
  const avatar = tweetObj.user.avatars;
  const name = tweetObj.user.name;
  const handle = tweetObj.user.handle;
  const content = tweetObj.content.text;
  const timeAgo = timeago.format(tweetObj.created_at);

  const $tweet = $(`<article class="tweet-container">
    <div class = "name-header">  
      <div class = "user">
        <img class = "avatar" src ="${avatar}"></img>
        <div class = "username">${name}</div>
      </div>
      <div class = "handle">${handle}</div>
    </div> 
    <div class ="tweet">${content}</div>
    <footer class= "date-footer"> 
      <div class = "date">${timeAgo}</div>
      <div class = "icons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer> 
  </article>`);
  return $tweet;
};

const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    $('.all-tweets').append(createTweetElement(tweet));
  }
};

const loadTweets = function() {
  $.get("/tweets", function(tweets) {
    renderTweets(tweets)
  })
}


$(document).ready(function() {
  loadTweets()
  
  $(document).submit(function(event) {
    event.preventDefault()
  const submitData = $('#tweet-text').serialize()
  $.post("/tweets", submitData)
  })


});