    var pageNum = 1;
	var searchString = "";
	var mode = "";
	var totalMoviePages;
	var searchBool = false;
	var key = "hcrurhsttexasrgfm2y6yahm";
	var startPage = 0;
	var totalMovies;
	
	function searchMovie(){
		$('#headTitle').removeAttr('id');
		$('#title').removeAttr('id');
		$('#searchMovie').removeAttr('id');
		$('.link').removeClass();
		$('div:first').attr('id','sHead');
		$('div:eq(1)').attr('class', 'sDiv1');
		$('div:eq(2)').attr('class', 'sDiv2');
		$('b:first').attr('id', 'sTitle');
		$('input:first').attr('id', 'sMovie');
		$('#movieLinks').children().attr('class', 'newLink');
		$('.movieEntry, .pageSelect, .searchHead, #pageIndicator, br:first, .pageNumbers, footer').remove();
		if (searchBool == false){
			$('a:eq(4)').append("&nbsp;&nbsp;");
			searchBool = true;
		}
		$('body').append('<div class = \'loadHead\'><h2>Loading movies...</h2></div>');		
		if (mode == "search"){
			searchForMovie();
		}
		else if (mode == "box"){
			boxMovie();
		}
		else if (mode == "int"){
			intMovie();
		}
		else if (mode == "open"){
			openMovie();
		}
		else if (mode == "up"){
			upMovie();
		}
		else if (mode == "top"){
			topDVD();
		}
		else if (mode == "cur"){
			currentDVD();
		}
		else if (mode == "new"){
			newDVD();
		}
		else if (mode == "upd"){
			upDVD();
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
				page_limit: 10,
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
				page_limit: 10,
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
				page_limit: 10,
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
				page_limit: 10,
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
				page_limit: 10,
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
				page_limit: 10,
				page: pageNum,
				country: 'ph'
			},
			success: showMovies
		});
	}
	
	//Show Movie Results
	function showMovies(response){
		console.log('response', response);
		var movies = response.movies;
		var pages;
		$('.loadHead').remove();
		if(mode == "box" || mode == "open" || mode == "top"){
			totalMovies = movies.length;
		}
		else{
			totalMovies = response.total;
		}
			totalMoviePages = Math.ceil(totalMovies/10);
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
						
						for (var pageCount = startPage; pageCount < startPage + 10; pageCount++){
							pages += "<a href = '#' class = 'pageSelect' onclick = \" pageNum = parseInt($(this).text());	searchMovie();\">" + pageCount + "</a>";
						}
					}
					else if(totalMoviePages <= 10){
						for (var pageCount = 1; pageCount <= totalMoviePages; pageCount++){
								pages += "<a href = '#' class = 'pageSelect' onclick = \" pageNum = parseInt($(this).text());	searchMovie();\">" + pageCount + "</a>";
						}	
					}
					if(parseInt(pageNum) < totalMoviePages){
						pages += "<a href = '#' class = 'pageSelect' onclick = \" pageNum++;	searchMovie();\">Next</a>";
						pages += "<a href = '#' class = 'pageSelect' onclick = \" pageNum = parseInt(" + totalMoviePages + ");	searchMovie();\">Last</a>";
					}
				}
				
				if (mode == "search"){
					$('body').append('<div class = \'searchHead\'><h2>Search results for <i>"' + searchString +'"</i></h2>Click the movie entry to expand</div>');
				}
				else if (mode == "box"){
					$('body').append('<div class = \'searchHead\'><h2>Box Office Movies</h2>Click the movie entry to expand</div>');
				}
				else if (mode == "int"){
					$('body').append('<div class = \'searchHead\'><h2>In Theaters Movies</h2>Click the movie entry to expand</div>');
				}
				else if (mode == "open"){
					$('body').append('<div class = \'searchHead\'><h2>Opening Movies</h2>Click the movie entry to expand</div>');
				}
				else if (mode == "up"){
					$('body').append('<div class = \'searchHead\'><h2>Upcoming Movies</h2>Click the movie entry to expand</div>');
				}
				else if (mode == "top"){
					$('body').append('<div class = \'searchHead\'><h2>Top Rentals</h2>Click the movie entry to expand</div>');
				}
				else if (mode == "cur"){
					$('body').append('<div class = \'searchHead\'><h2>Current Release DVDs</h2>Click the movie entry to expand</div>');
				}
				else if (mode == "new"){
					$('body').append('<div class = \'searchHead\'><h2>New Release DVDs</h2>Click the movie entry to expand</div>');
				}
				else if (mode == "upd"){
					$('body').append('<div class = \'searchHead\'><h2>Upcoming DVDs</h2>Click the movie entry to expand</div>');
				}
				
				if (totalMovies != 0){
					$('body').append(pages + "<span id = 'pageIndicator'> Page " + parseInt(pageNum) + " of " + totalMoviePages + "</span></div>");
				}
				
			}else if(totalMoviePages == 0){
				$('body').append("<div class = \'searchHead\'><h3>Movie not found.</h3></div>");
			}else if (totalMoviePages == 1){
				if (mode == "search"){
					$('body').append('<div class = \'searchHead\'><h2>Search results for <i>"' + searchString +'"</i></h2>Click the movie entry to expand</div>');
				}
				else if (mode == "box"){
					$('body').append('<div class = \'searchHead\'><h2>Box Office Movies</h2>Click the movie entry to expand</div>');
				}
				else if (mode == "int"){
					$('body').append('<div class = \'searchHead\'><h2>In Theaters Movies</h2>Click the movie entry to expand</div>');
				}
				else if (mode == "open"){
					$('body').append('<div class = \'searchHead\'><h2>Opening Movies</h2>Click the movie entry to expand</div>');
				}
				else if (mode == "up"){
					$('body').append('<div class = \'searchHead\'><h2>Upcoming Movies</h2>Click the movie entry to expand</div>');
				}
				else if (mode == "top"){
					$('body').append('<div class = \'searchHead\'><h2>Top Rentals</h2>Click the movie entry to expand</div>');
				}
				else if (mode == "cur"){
					$('body').append('<div class = \'searchHead\'><h2>Current Release DVDs</h2>Click the movie entry to expand</div>');
				}
				else if (mode == "new"){
					$('body').append('<div class = \'searchHead\'><h2>New Release DVDs</h2>Click the movie entry to expand</div>');
				}
				else if (mode == "upd"){
					$('body').append('<div class = \'searchHead\'><h2>Upcoming DVDs</h2>Click the movie entry to expand</div>');
				}
			}
			
		for (var i = 0; i < movies.length; i++){
			var movie = movies[i];
			
			var movieObject = "<div id = '" + movie.id + "'class = 'movieEntry' onclick = \"$(this).find('.movieDescription').toggle('slow');\"><div class = 'moviePreview'><span class = 'movieImage'> <img class = 'movieThumbnail' src = '";
			
			var moviePoster = movie.posters.original;
			
			if (moviePoster.substring(52) == "poster_default.gif" || moviePoster.substring(54) == "poster_default.gif"){
				movieObject += "filmreel.jpg";
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
					if (j == movies[i].abridged_cast.length - 1){
						movieObject += "<br>";
					}
					else{
						movieObject += ", "
					}
				}
			}
			
			var movieClips = movie.links.clips;
			$.ajax({
				url: movieClips,
				dataType: 'jsonp',
				data: {
					apikey: key,
				}, success: showClips
			});
			
			movieObject += "</div></div>"
			$('body').append(movieObject + "</div></div>");
		}
		if (totalMovies != 0 && totalMoviePages > 1){
			$('body').append(pages + "<span id = 'pageIndicator'> Page " + parseInt(pageNum) + " of " + totalMoviePages + "</span></div>");
			$('body').append("<footer><span id = 'teamName'><b>TYPE AB</b>&nbsp;&nbsp;</span><a class ='fLink' href = 'http://www.rottentomatoes.com' target = '_blank'>rottentomatoes.com</a></footer>");
		}
		else if (totalMovies != 0){
			$('body').append("<footer><span id = 'teamName'><b>TYPE AB</b>&nbsp;&nbsp;</span><a class ='fLink' href = 'http://www.rottentomatoes.com' target = '_blank'>rottentomatoes.com</a></footer>");
		}
		$('.pageNumbers:eq(1)').children().css({"color":"black"});
		$('.movieDescription').hide();
	}
	
	//Movie Clips
	function showClips(response){
		var clipDiv = "";
		console.log('response', response);
		var clips = response.clips;
		var movieID = response.links.rel;
		var matchID = movieID.match("([0-9]*).json");
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
				$('#' + matchID[1]).find('.movieDescription').append(clipDiv);
			}
		}
	}