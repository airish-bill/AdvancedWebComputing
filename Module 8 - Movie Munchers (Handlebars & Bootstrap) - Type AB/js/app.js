    var pageNum = 1;
	var searchString = "";
	var mode = "";
	var totalMoviePages;
	var key = "hcrurhsttexasrgfm2y6yahm";
	var startPage = 0;
	var customScrolled = false;
	var clipsShown = false;
	var movieModalShown = false;
	var searchAgain = true;
	var movID;
	var movie;
	var movies;
	var clips;
	var movieID;
	var matchID;

	$(function(){
		$(".link, .smallLink").click(function(){
			pageNum = 1;
			searchMovie();
		});

		$("input").keydown(function(event){
			if (event.keyCode == 13 && this.value.trim() != ''){
				pageNum = 1; 
				searchString = $(this).val(); 
				mode = 'search'; 
				searchMovie();
			}
		});
	});

	function searchMovie(){
			if (searchAgain){
				searchAgain = false;
				$('#movieContainer').children().remove();
				$('#movieContainer').removeClass();
				$('.loadHead, .movieThumbnail, .pageSelect, .searchHead, #pageIndicator, .pageNumbers').remove();
				$('#movieContainer').prepend('<div class = \'loadHead\'><span>Loading movies...</span><div></div></div>');		

				if (mode == "search"){
					searchForMovie();
				}

				$(".link:first-child, #firstCarousel > div > div:first-child > a:first-child, #secondCarousel > div > a:first-child").click(function(){
					mode = 'box';
					boxMovie();
				});

				$(".link:nth-child(2), #firstCarousel > div > div:first-child > a:last-child, #secondCarousel > div > a:nth-child(2)").click(function(){
					mode = 'int';
					intMovie();
				});

				$(".link:nth-child(3), #firstCarousel > div > div:nth-child(2) > a:first-child, #secondCarousel > div > a:nth-child(3)").click(function(){
					mode = 'open';
					openMovie();
				});

				$(".link:nth-child(4), #firstCarousel > div > div:nth-child(2) > a:last-child, #secondCarousel > div > a:nth-child(4)").click(function(){
					mode = 'up';
					upMovie();
				});

				$(".link:nth-child(5), #firstCarousel > div > div:nth-child(3) > a:first-child, #secondCarousel > div > a:nth-child(5)").click(function(){
					mode = 'top';
					topDVD();
				});

				$(".link:nth-child(6), #firstCarousel > div > div:nth-child(3) > a:last-child, #secondCarousel > div > a:nth-child(6)").click(function(){
					mode = 'cur';
					currentDVD();
				});

				$(".link:nth-child(7), #firstCarousel > div > div:last-child > a:first-child, #secondCarousel > div > a:nth-child(7)").click(function(){
					mode = 'new';
					newDVD();
				});

				$(".link:last-child, #firstCarousel > div > div:last-child > a:last-child, #secondCarousel > div > a:last-child").click(function(){
					mode = 'upd';
					upDVD();
				});
			}
		}
		
	//Search Movies
	function searchForMovie(){
		var server = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json';
		$.ajax({
			url: server,
			dataType: 'jsonp',
			data: {
				q: searchString,
				apikey: key,
				page_limit: 20,
				page: pageNum
			},
			success: showMovies
		});
	}
	
	//Box Office Movies
	function boxMovie(){
		var server = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/box_office.json';
		$.ajax({
			url: server,
			dataType: 'jsonp',
			data: {
				apikey: key,
				limit: 10,
				country: 'ph'
			},
			success: showMovies
		});
	}
	
	//In Theaters Movies
	function intMovie(){
		var server = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';
		$.ajax({
			url: server,
			dataType: 'jsonp',
			data: {
				apikey: key,
				page_limit: 20,
				page: pageNum,
				country: 'ph'
			},
			success: showMovies
		});
	}
	
	//Opening Movies
	function openMovie(){
		var server = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/opening.json';
		$.ajax({
			url: server,
			dataType: 'jsonp',
			data: {
				apikey: key,
				limit: 10,
				country: 'ph'
			},
			success: showMovies
		});
	}
	
	//Upcoming Movies
	function upMovie(){
		var server = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/upcoming.json';
		$.ajax({
			url: server,
			dataType: 'jsonp',
			data: {
				apikey: key,
				page_limit: 20,
				page: pageNum,
				country: 'ph'
			},
			success: showMovies
		});
	}
	
	//Top Rentals
	function topDVD(){
		var server = 'http://api.rottentomatoes.com/api/public/v1.0/lists/dvds/top_rentals.json';
		$.ajax({
			url: server,
			dataType: 'jsonp',
			data: {
				apikey: key,
				limit: 10,
				country: 'ph'
			},
			success: showMovies
		});
	}
	
	//Current Release DVDs
	function currentDVD(){
		var server = 'http://api.rottentomatoes.com/api/public/v1.0/lists/dvds/current_releases.json';
		$.ajax({
			url: server,
			dataType: 'jsonp',
			data: {
				apikey: key,
				page_limit: 20,
				page: pageNum,
				country: 'ph'
			},
			success: showMovies
		});
	}
	
	//New Release DVDs
	function newDVD(){
		var server = 'http://api.rottentomatoes.com/api/public/v1.0/lists/dvds/new_releases.json';
		$.ajax({
			url: server,
			dataType: 'jsonp',
			data: {
				apikey: key,
				page_limit: 20,
				page: pageNum,
				country: 'ph'
			},
			success: showMovies
		});
	}
	
	//Upcoming DVDs
	function upDVD(){
		var server = 'http://api.rottentomatoes.com/api/public/v1.0/lists/dvds/upcoming.json';
		$.ajax({
			url: server,
			dataType: 'jsonp',
			data: {
				apikey: key,
				page_limit: 20,
				page: pageNum,
				country: 'ph'
			},
			success: showMovies
		});
	}

	//Get Movie Template
	function getTemplate(template_id, context) {
        var template, $template, markup;
        template = $('#' + template_id);
        $template = Handlebars.compile(template.html());
        markup = $template(context);
        return markup;

    }
	
	//Show Movie Results
	function showMovies(response){
		console.log('response', response);
		movies = response.movies;
		var pages;
		var totalMovies;
		var movieObject = "";
		$('.loadHead').remove();

		if(mode == "box" || mode == "open" || mode == "top"){
			totalMovies = movies.length;
		}
		else{
			totalMovies = response.total;
		}

		totalMoviePages = Math.ceil(totalMovies/20);

		pages = "<div class = 'pageNumbers'>";
			
		if (totalMoviePages > 25){
			totalMoviePages = 25;
		}
			
		if (totalMoviePages > 1){
			if(totalMoviePages == 2){
				if(parseInt(pageNum) == 1){
					pages += "<a href = '#' class = 'pageSelect' onclick = \" pageNum++; searchMovie();\">Next</a>";
				}
				else{
					pages += "<a href = '#' class = 'pageSelect' onclick = \" pageNum--; searchMovie();\">Previous</a>";
				}
			}
			else if(totalMoviePages > 2){
				if(parseInt(pageNum)  > 1){
					pages += "<a href = '#' class = 'pageSelect' onclick = \" pageNum = 1;	searchMovie();\">First</a>";
					pages += "<a href = '#' class = 'pageSelect' onclick = \" pageNum--; searchMovie();\">Previous</a>";
				}
				if(totalMoviePages > 10){
					if (parseInt(pageNum) + 5 <= totalMoviePages){
						startPage = parseInt(pageNum) - 5;
						if(startPage < 1){
							startPage = 1;
						}
					}
					else if (parseInt(pageNum) + 3 > totalMoviePages){
						startPage = totalMoviePages - 9;
					}
					pages += "<span>";

					for (var pageCount = startPage; pageCount < startPage + 10; pageCount++){
						pages += "<a href = '#' class = 'pageSelect number' onclick = \" pageNum = parseInt($(this).text());	searchMovie();\">" + pageCount + "</a>";
					}
					pages += "</span>";
				}
				else if(totalMoviePages <= 10){
					pages += "<span>";

					for (var pageCount = 1; pageCount <= totalMoviePages; pageCount++){
						pages += "<a href = '#' class = 'pageSelect number' onclick = \" pageNum = parseInt($(this).text());	searchMovie();\">" + pageCount + "</a>";
					}
						pages += "</span>";	
				}
				if(parseInt(pageNum) < totalMoviePages){
					pages += "<a href = '#' class = 'pageSelect' onclick = \" pageNum++;	searchMovie();\">Next</a>";
					pages += "<a href = '#' class = 'pageSelect' onclick = \" pageNum = parseInt(" + totalMoviePages + ");	searchMovie();\">Last</a>";
				}
			}

			if (totalMovies != 0){
				$('#movieBody').prepend(pages + "<span id = 'pageIndicator'> Page " + parseInt(pageNum) + " of " + totalMoviePages + "</span></div>");
			}
				
			if (mode == "search"){
				$('#movieBody').prepend('<div class = \'searchHead\'><span>Search results for <i>"' + searchString +'"</i></span></div>');
			}
			else if (mode == "box"){
				$('#movieBody').prepend('<div class = \'searchHead\'><span>Box Office Movies</span></div>');
			}
			else if (mode == "int"){
				$('#movieBody').prepend('<div class = \'searchHead\'><span>In Theaters Movies</span></div>');
			}
			else if (mode == "open"){
				$('#movieBody').prepend('<div class = \'searchHead\'><span>Opening Movies</span></div>');
			}
			else if (mode == "up"){
				$('#movieBody').prepend('<div class = \'searchHead\'><span>Upcoming Movies</span></div>');
			}
			else if (mode == "top"){
				$('#movieBody').prepend('<div class = \'searchHead\'><span>Top Rentals</span></div>');
			}
			else if (mode == "cur"){
				$('#movieBody').prepend('<div class = \'searchHead\'><span>Current Release DVDs</span></div>');
			}
			else if (mode == "new"){
				$('#movieBody').prepend('<div class = \'searchHead\'><span>New Release DVDs</span></div>');
			}
			else if (mode == "upd"){
				$('#movieBody').prepend('<div class = \'searchHead\'><span>Upcoming DVDs</span></div>');
			}
		}
		else if(totalMoviePages == 0){
			$('#movieBody').prepend("<div class = \'searchHead\'><span>Movie not found.</span></div>");
		}
		else if (totalMoviePages == 1){
			if (mode == "search"){
				$('#movieBody').prepend('<div class = \'searchHead\'><span>Search results for <i>"' + searchString +'"</i></span></div>');
			}
			else if (mode == "box"){
				$('#movieBody').prepend('<div class = \'searchHead\'><span>Box Office Movies</span></div>');
			}
			else if (mode == "int"){
				$('#movieBody').prepend('<div class = \'searchHead\'><span>In Theaters Movies</span></div>');
			}
			else if (mode == "open"){
				$('#movieBody').prepend('<div class = \'searchHead\'><span>Opening Movies</span></div>');
			}
			else if (mode == "up"){
				$('#movieBody').prepend('<div class = \'searchHead\'><span>Upcoming Movies</span></div>');
			}
			else if (mode == "top"){
				$('#movieBody').prepend('<div class = \'searchHead\'><span>Top Rentals</span></div>');
			}
			else if (mode == "cur"){
				$('#movieBody').prepend('<div class = \'searchHead\'><span>Current Release DVDs</span></div>');
			}
			else if (mode == "new"){
				$('#movieBody').prepend('<div class = \'searchHead\'><span>New Release DVDs</span></div>');
			}
			else if (mode == "upd"){
				$('#movieBody').prepend('<div class = \'searchHead\'><span>Upcoming DVDs</span></div>');
			}
		}

		for (var i = 0; i < movies.length; i++){
			movie = movies[i];

			movieObject += "<img id = '" + movie.id + "' class  = 'movieThumbnail' alt = \"" + movie.title + "\" onclick = \"movID = $(this).attr('id'); showMovieModal();\" onmouseover = \"$(this).tooltip({animation:false, placement:'bottom', title:&quot;" + movie.title + "&quot;});\" src = '";
			
			var moviePoster = movie.posters.original;
			
			if (moviePoster.substring(52) == "poster_default.gif" || moviePoster.substring(54) == "poster_default.gif"){
				movieObject += "css/images/filmreel.jpg";
			}
			else {
				movieObject += movie.posters.original;
			}
    		
    		movieObject += "'/>";
    	}
    	
    	$('#movieContainer').append(movieObject);

		if(movies.length > 0){
			$("#movieContainer").mCustomScrollbar({
				scrollInertia:550,
				horizontalScroll:true,
				mouseWheelPixels:116,
				theme: "light-thick",
				scrollButtons:{
					enable:true,
					scrollType:"pixels",
					scrollAmount:116
				},
				callbacks:{
					onScroll:function(){ snapScrollbar(); }
				}
			});
			/* toggle buttons scroll type */
			var content=$("#movieContainer");
			$("a[rel='toggle-buttons-scroll-type']").html("<code>scrollType: \""+content.data("scrollButtons_scrollType")+"\"</code>");
			$("a[rel='toggle-buttons-scroll-type']").click(function(e){
				e.preventDefault();
				var scrollType;
				if(content.data("scrollButtons_scrollType")==="pixels"){
					scrollType="continuous";
				}else{
					scrollType="pixels";
				}
				content.data({"scrollButtons_scrollType":scrollType}).mCustomScrollbar("update");
				$(this).html("<code>scrollType: \""+content.data("scrollButtons_scrollType")+"\"</code>");
			});
			/* snap scrollbar fn */
			var snapTo=[];
			$("#movieContainer .movieEntry").each(function(){
				var $this=$(this),thisX=$this.position().left;
				snapTo.push(thisX);
			});
			function snapScrollbar(){
				var posX=$("#movieContainer .mCSB_container").position().left,closestX=findClosest(Math.abs(posX),snapTo);
				$("#movieContainer ").mCustomScrollbar("scrollTo",closestX,{scrollInertia:350,callbacks:false});
			}
			function findClosest(num,arr){
                var curr=arr[0];
   	            var diff=Math.abs(num-curr);
       	        for(var val=0; val<arr.length; val++){
           	        var newdiff=Math.abs(num-arr[val]);
               	    if(newdiff<diff){
                   	    diff=newdiff;
                       	curr=arr[val];
                   	}
               	}
               	return curr;
           	}

           	$('.mCSB_container').addClass('mov');
			customScrolled = true;
		}
		searchAgain = true;
	}

	//Movie Clips
	function showClips(response){
		if(clipsShown == true){
			var clipDiv = "";
			console.log('response', response);
			clips = response.clips;
			movieID = response.links.rel;
			matchID = movieID.match("([0-9]*).json");
			if (clips.length != 0){
				clipDiv = "<div class = 'movieClip'><b>Movie Clips</b><br>Click a thumbnail to watch video<br>";
						
				for (var c = 0; c < clips.length; c++){
					var clip = clips[c];
					if(clips.length != 0){
						clipDiv += "<div class = 'mClip'><a target = '_blank' href = \"" + clip.links.alternate + "\" title = \"" + clip.title + "\"><img class = 'mThumb' src = \"" + clip.thumbnail + "\"></a></div>";
					}
				}
				clipDiv += "</div>";
				if(clip.links != ''){
					$('.' + matchID[1]).find('.movieDescription').append(clipDiv);
				}
			}
			clipsShown = false;
		}
		$("#content.movieModal").mCustomScrollbar({
			scrollButtons:{
				enable:true,
				scrollType:"pixels",
				scrollAmount:116
			},
			theme:"dark-thick",
			scrollInertia:550,
			mouseWheelPixels:116,
		});
	}

	//Show the movie modal with details
	function showMovieModal(){
		if (movieModalShown == false){

			var modal = (function(){
				var method = {},
				$overlay,
				$modal,
				$content,
				$close;

				// Center the modal in the viewport
				method.center = function () {
					var top, left;

					top = Math.max($(window).height() - $modal.outerHeight(), 0) / 2;
					left = Math.max($(window).width() - $modal.outerWidth(), 0) / 2;

					$modal.css({
						top:top + $(window).scrollTop(), 
						left:left + $(window).scrollLeft()
					});
				};

			// Open the modal
			method.open = function (settings) {
				$content.empty().append(settings.content);

				$modal.css({
					width: settings.width || 'auto', 
						height: settings.height || 'auto'
						});

						method.center();
						$(window).bind('resize.modal', method.center);
						$modal.show();
						$overlay.show();
			};

			// Close the modal
			method.close = function () {
				$modal.remove();
				$overlay.remove();
				$('#movieModal').children().remove();
				$('#movieMOdal').removeClass();
				movieModalShown = false;
				$content.empty();
				$(window).unbind('resize.modal');
			};

			// Generate the HTML and add it to the document
			$overlay = $('<div id="overlay" class = "movieModal"></div>');
			$modal = $('<div id="modal" class = "movieModal"></div>');
			$content = $('<div id="content" class = "movieModal" ></div>');
			$close = $('<a id="close" href="#" class = "movieModal"></a>');

			$modal.hide();
			$overlay.hide();
			$modal.append($content, $close);

			$(document).ready(function(){
				$('body').append($overlay, $modal);						
			});

			$close.click(function(e){
				e.preventDefault();
				method.close();
			});

			return method;
			}());

		    // Wait until the DOM has loaded before querying the document
			$(document).ready(function(){
				$('#' + movID).click(function(e){
					modal.open({content: movieObject });
					e.preventDefault();
				});

				for (var i = 0; i < movies.length; i++){
				if(movies[i].id == movID){
					movie = movies[i];
				}
			}

			var movieObject = "<div class = 'movieEntry " + movie.id + "'><div class = 'moviePreview'><span class = 'movieImage'> <img class = 'movieEntryThumbnail' src = '";
				
			var moviePoster = movie.posters.original;
			
			if (moviePoster.substring(52) == "poster_default.gif" || moviePoster.substring(54) == "poster_default.gif"){
					movieObject += "css/images/filmreel.jpg";
			}else{
				movieObject += movie.posters.original;
			}
				
			movieObject += "'></span><div class = 'movieTitle'><a target = '_blank' href = '" + movie.links.alternate + "'>" + movie.title + "</a></div></div><div class = 'movieDescription'>"
				
			if (movie.year != ""){
				movieObject += "<b>Year: </b>" + movie.year + "<br>";
			}
			if (movie.synopsis != "" || movie.synopsis){
				movieObject += "<p><b>Synopsis: </b>" + movie.synopsis + "</p>";
			}
			if (movie.mpaa_rating){
				movieObject += "<b>MPAA Rating: </b>" + movie.mpaa_rating + "<br>";
			}
			if (movie.critics_consensus){
				movieObject += "<b>Critics Consensus: </b><i>\"" + movie.critics_consensus + "\"</i><br>";
			}
			if (movie.abridged_cast.length != 0){
				movieObject += "<b>Cast: </b>";
				for (var j = 0; j < movie.abridged_cast.length; j++){
					movieObject += movie.abridged_cast[j].name;
					if (j == movie.abridged_cast.length - 1){
						movieObject += "<br>";
					}
					else{
						movieObject += ", "
					}
				}
			}
				
				$("#content.movieModal").mCustomScrollbar({
					scrollInertia:550,
					horizontalScroll:false,
					mouseWheelPixels:116,
					theme: "dark-thick",
					scrollButtons:{
						enable:true,
						scrollType:"pixels",
						scrollAmount:116
					}
				});
    			

				movieModalShown = true;

				if(clipsShown == false){
					var movieClips = movie.links.clips;
					$.ajax({
						url: movieClips,
						dataType: 'jsonp',
						data: {
							apikey: key,
						}, success: showClips
					});
					clipsShown = true;
				}
			});
		}
	}


	var modal = (function(){
		var method = {},
		$overlay,
		$modal,
		$content,
		$close;

		// Center the modal in the viewport
		method.center = function () {
			var top, left;

			top = Math.max($(window).height() - $modal.outerHeight(), 0) / 2;
			left = Math.max($(window).width() - $modal.outerWidth(), 0) / 2;

			$modal.css({
				top:top + $(window).scrollTop(), 
				left:left + $(window).scrollLeft()
			});
		};

		// Open the modal
		method.open = function (settings) {
			$content.empty().append(settings.content);

			$modal.css({
				width: settings.width || 'auto', 
					height: settings.height || 'auto'
					});

					method.center();
					$(window).bind('resize.modal', method.center);
					$modal.show();
					$overlay.show();
		};

		// Close the modal
		method.close = function () {
			$modal.hide();
			$overlay.hide();
			$content.empty();
			$(window).unbind('resize.modal');
		};

		// Generate the HTML and add it to the document
		$overlay = $('<div id="overlay"></div>');
		$modal = $('<div id="modal"></div>');
		$content = $('<div id="content"></div>');
		$close = $('<a id="close" href="#"></a>');

		$modal.hide();
		$overlay.hide();
		$modal.append($content, $close);

		$(document).ready(function(){
			$('body').append($overlay, $modal);						
		});

		$close.click(function(e){
			e.preventDefault();
			method.close();
		});

		return method;
	}());

    // Wait until the DOM has loaded before querying the document
	$(document).ready(function(){

		$('#aboutUs').click(function(e){
			modal.open({content: "<div><div id = 'aProfile'><h3>Airish M. Las Pi&#241;as</h3><div><img src = \"images/airish.gif\"></div><p>Hi! I'm <b>Airish</b>!<br>I was born on November 7, 1992.</p></p><p>I like to draw realistic art and watch Korean series and variety shows.</p><div><a href = \"https://www.facebook.com/airish.dnimreven\" target = \"_blank\"><img src = \"images/facebook.png\"/></a><a href = \"http://www.twitter.com/Ai_ddicted\" target = \"_blank\"><img src = \"images/twitter.png\"/></a><a href = \"http://instagram.com/airish_phsone\" target = \"_blank\"><img src = \"images/instagram.png\"></a><a href = \"mailto:airishlaspinas@gmail.com\"><img src = \"images/gmail.png\"></a><a href = \"https://github.com/airish110792\" target = \"_blank\"><img src = \"images/github.png\"/></a></div></div><div id = 'bProfile'><h3>Bill Vincent F. Macion</h3><div><img src = \"images/bill.gif\"></div><p>Hi! I'm <b>Bill</b>!<br>I was born on September 21, 1993.</p><p>I like to surf the Net, read Dan Brown novels, and play computer and mobile games.</p><div><a href = \"https://www.facebook.com/billyvince.macion\" target = \"_blank\"><img src = \"images/facebook.png\"/></a><a href = \"http://www.twitter.com/billyvince\" target = \"_blank\"><img src = \"images/twitter.png\"/></a><a href = \"mailto:bvmacion@gmail.com\"><img src = \"images/gmail.png\"></a><a href = \"https://github.com/billyvince\" target = \"_blank\"><img src = \"images/github.png\"/></a></div></div></div>"});
			e.preventDefault();

			$("#content").mCustomScrollbar({
				scrollInertia:550,
				horizontalScroll:false,
				mouseWheelPixels:116,
				theme: "dark-thick",
				scrollButtons:{
					enable:true,
					scrollType:"pixels",
					scrollAmount:116
				}
			});
		});
	});