/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const createTweetElement = function(tweetObj) { //creates each individual tweet
  const avatar = tweetObj.user.avatars;
  const name = tweetObj.user.name;
  const handle = tweetObj.user.handle;
  const content = tweetObj.content.text;
  const timeAgo = timeago.format(tweetObj.created_at); //uses timeago to convert time code to timeago format

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

  //adds HTML article for each tweet

  return $tweet;
};

const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    $('.all-tweets').prepend(createTweetElement(tweet)); //appends each new tweet to the top of the "all tweets" division so new tweets appear first
  }
};

const escape = function(str) {
  let div = document.createElement("div"); //escape function to avoid XSS errors
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


const loadTweets = function() {
  $.get("/tweets", function(tweets) { //function gets tweets from /tweets json, deletes all previously loaded tweets and runs them through the rendersTweet function,
    $('.all-tweets').empty();
    renderTweets(tweets);
  });
};
const slideUpAllError = function() { //collects slide up functions for all error messages
  $(".error-messages").slideUp();
  $(".chara-error").slideUp();
  $(".null-error").slideUp();
};

const slideDownLengthError = function() {
  //collects slide down functions for length error
  $(".error-messages").slideDown();
  $(".chara-error").slideDown();
};

const slideDownEmptyError = function() {
  //collects slide down functions for empty string error
  $(".error-messages").slideDown();
  $(".null-error").slideDown();
};

const submitTweets = function() { //submits tweets from the form to the /tweets json, resets the counter and reloads all the tweets
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
    
    event.preventDefault(); //prevents default event from occuring when "tweet" button is clicked
    slideUpAllError();

    const valData = $('.textarea').val();
  
    if (valData.length > 140) { //if length of tweet exceeds 140, returns error
      slideDownLengthError();
      return;

    }
    
    if (valData === "") { //if string is empty returns error,
      slideDownEmptyError();
      return;
    }

    submitTweets();
  });


});