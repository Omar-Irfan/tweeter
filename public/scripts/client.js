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
        <div class = "username">${escape(name)}</div>
      </div>
      <div class = "handle">${escape(handle)}</div>
    </div> 
    <div class ="tweet">${escape(content)}</div>
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
    $('.all-tweets').prepend(createTweetElement(tweet));
  }
};

const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


const loadTweets = function() {
  $.get("/tweets", function(tweets) {
    $('.all-tweets').empty();
    renderTweets(tweets);
  });
};
const slideUpAllError = function() {
  $(".error-messages").slideUp();
  $(".chara-error").slideUp();
  $(".null-error").slideUp();
};

const slideDownLengthError = function() {
  $(".error-messages").slideDown();
  $(".chara-error").slideDown();
};

const slideDownEmptyError = function() {
  $(".error-messages").slideDown();
  $(".null-error").slideDown();
};

const submitTweets = function() {
  const submitData = $('#tweet-text').serialize();
  $.post("/tweets", submitData,  function(event) {
    $('.textarea').val('');
    $('.counter')[0].innerHTML = 140;
    loadTweets();
  });
};

$(document).ready(function() {
  
  loadTweets();
  
  $(".tweet-function").submit(function(event) {
    
    event.preventDefault();
    slideUpAllError();

    const valData = $('.textarea').val();
  
    if (valData.length > 140) {
      slideDownLengthError();
      return;

    }
    
    if (valData === "") {
      slideDownEmptyError();
      return;
    }

    submitTweets();
  });


});