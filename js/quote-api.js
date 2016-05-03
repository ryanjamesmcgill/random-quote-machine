$(document).ready(function(){
	updateQuote();
	$("#quote-btn").on("click", updateQuote);
	$("#quote-tweet").on("click", tweetQuote);
});

var data = {
	msg:"",
	author:""
}

var tweetQuote = function(){
	var msg = $("#message").text();
	var author = $("#author").text();
	var text = '"' + msg + '" ' + author;
	var url = "http://ryanjamesmcgill.github.io/random-quote-machine/";

	window.open("https://twitter.com/intent/tweet?text="+encodeURIComponent(text)+"&url="+url);
}

var animationTime = 600;
var updateQuote = function(){
	
	$("#quote-msg").animate({opacity:0.00, height:'0px'},animationTime);


	$.ajax({
        url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&_jsonp=?',
        dataType: 'jsonp',
        success: function(d){
        	console.log('success',d);

        	var quote = d[0];
        	var author = quote.title;
        	var msg = quote.content.slice(3,-5);

        	console.log(msg);
        	updateQuoteDom(msg, author);
        },
        error: function(err){
        	console.log('error', err);
        }
    });
};

var updateQuoteDom = function(msg, author){
	if(msg.indexOf('<p>') > 0){ 
	//Some quotes with multi lines won't look good, so we skip those
		updateQuote();
		return 0;
	}

    text = '';
	text += '<p id="quote-inner"><span id="message">';
	text += msg;
	text += '</span><br>';
	text += '<i id="author">- ' + author + '</i></p>';  

	$("#quote-msg").delay(animationTime+300).html(text);	
	var h = $("#quote-inner").height()
	$("#quote-msg").animate({opacity:1.00, height:h+'px'},animationTime);
};

