
	var scoreArray = [];
	var score = 0;
	var answers=[];
	var currentQuestion = 0;

	//pytania i odpowiedzi
	var allQuestions = [{question: "1. Who is Prime Minister of the United Kingdom?", 
						choices: ["1.David Cameron", "1.Gordon Brown", "1.Winston Churchill", "1.Tony Blair"],
						correctAnswer:0,
						imageAdress: "https://myworldofcmpunk.files.wordpress.com/2012/07/pics_in_a_pic_avatar_best_in_the_world_cm_punk_by_lovelives4ever-d5cxtt2.jpg"},
						{question: "2. Who is Prime Minister of the United Kingdom?", 
						choices: ["2.David Cameron", "2.Gordon Brown", "2.Winston Churchill", "2.Tony Blair"],
						correctAnswer:1,
						imageAdress: "https://download.unsplash.com/photo-1430760814266-9c81759e5e55"},
						{question: "3. Who is Prime Minister of the United Kingdom?", 
						choices: ["3.David Cameron", "3.Gordon Brown", "3.Winston Churchill", "3.Tony Blair"],
						correctAnswer:2,
						imageAdress: "https://download.unsplash.com/photo-1431184052543-809fa8cc9bd6"},
						{question: "4. Who is Prime Minister of the United Kingdom?", 
						choices: ["4.David Cameron", "4.Gordon Brown", "4.Winston Churchill", "4.Tony Blair"],
						correctAnswer:3,
						imageAdress: "https://download.unsplash.com/photo-1430126833726-4a091c572f3c"},
						];
	var totalQuestions = allQuestions.length;

	//tworzenie pudełka na quiz
	createQuizContainer = function(){
		$("h1").after("<section id='quizPack'></section>")
	};
	createQuizContainer();

	// ładowanie zdjęcia do pytania
	placeImage = function(){
		var img = $("<div id='image'></div>");
		$("#quizPack").prepend(img);
		$(img).append("<img id=image class='col-md-offset-4 img-rounded' width='374' height='306' src=" + allQuestions[currentQuestion].imageAdress +">");
	};
	placeImage();

	//ładowanie pytań
	placeQustion = function(){
		var qst = $("<h3 id='question' class='col-md-12 text-center'></h3>");
		$("#image").after(qst);
		$(qst).text("Pytanie numer: ");
		$(qst).append(allQuestions[currentQuestion].question);
	};
	placeQustion();

	//ładowanie formularza 
	placeForm = function(){
	var frm = $("<form></form>");
	$("#question").after(frm);
	};
	placeForm();

	//ładowanie odpowiedzi
	placeAnswers = function(){
		var div = $("<div id='answers' class='col-md-9 col-md-offset-3'></div>");
		$("form").append(div);
		for(var i = 0; i < 4; i++){
			var inpt = $("<input>");
			$(inpt).attr({type:"radio", name:"answer", id:i});
	        $(div).append(inpt);
	        var lbl = $("<label></label>");
	        $(lbl).attr("for",i);
	        $(div).append(lbl);
	        $(lbl).append(allQuestions[currentQuestion].choices[i]);
		}
	};
	placeAnswers();

	//ładowanie przycisków
	placeButtons = function(){
		var div = $("<div id='buttons' class='col-md-9 col-md-offset-3'>");
		$("form").append(div);
		$(div).append("<button type='button' class='btn btn-md disabled' id='prevQuestion'>Poprzednie pytanie</button>");
		$(div).append("<button type='submit' class='btn btn-md' id='nextQuestion'>Następne pytanie</button>");
		$(div).append("<button type='button' class='btn btn-md' id='endGame'>Zakończ quiz</button>");
	};
	placeButtons();

	//ładowanie wyniku
	placeScore = function(){
		$("#score").text("Twój wynik :" + score + "/" + totalQuestions);
	};
	placeScore();

	//przechodzenie do następnego pytania
	$("form").on("submit",function(e){
		e.preventDefault();
		if($('input[name=answer]:checked').attr("id") == allQuestions[currentQuestion].correctAnswer){
			scoreArray.push($('input[name=answer]:checked').attr("id"));
			score = scoreArray.length;
		};
		$("#image").remove();
		$("#question").remove();
		$("#answers").remove();
		$("#buttons").remove();
		currentQuestion ++;
		placeImage();
		placeQustion();
		placeAnswers();
		placeButtons();
		activePrevButton();
	});
	//zakończenie gry

	//aktywowanie przycinku 'poprzednie pytanie'
	activePrevButton = function(){
		if(currentQuestion >= 1){
			$("#prevQuestion").removeClass("disabled");
		}
		else{
			$("#prevQuestion").addClass("disabled");
		}
	};

	// ładowanie poprzedniego zestawu pytań i odpowiedzi
	$(document.body).on('click',"#prevQuestion",function(){
		$("#image").remove();
		$("#question").remove();
		$("#answers").remove();
		$("#buttons").remove();
		currentQuestion --;
		placeImage();
		placeQustion();
		placeAnswers();
		placeButtons();
		activePrevButton();
	});

//koniec gry- przycisk 'zakończ grę', wyswitlic wszystko i ktore dobre
//moze przycisk cofania
//
