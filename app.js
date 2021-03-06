$(function(){
	var score = 0,
		answers=[],
		currentQuestion = 0,
		allQuestions = [{question: "Kto jest autorem słynnych 'Słoneczników'?", 
						choices: ["Vincent van Gogh", "Leonardo da Vinci", "Jan Vermeer", "Salvadore Dali"],
						correctAnswer:0,
						imageAdress: "https://unsplash.com/photos/V63oM8OPJSo/download"},
						{question: "W którym roku stanęła w Londynie pierwsza budka telefoniczna?", 
						choices: ["1889", "1903", "1920", "1945"],
						correctAnswer:1,
						imageAdress: "https://download.unsplash.com/photo-1430760814266-9c81759e5e55"},
						{question: "Jak nazywa się mekka polskiego windusrfingu?", 
						choices: ["Zakopane", "Gdańsk", "Chałupy", "Alacati"],
						correctAnswer:2,
						imageAdress: "https://download.unsplash.com/photo-1431184052543-809fa8cc9bd6"},
						{question: "Podaj wartości dla koloru zielonego w przestrzeni rgb", 
						choices: ["(0%, 0%, 0%, 3%)", "(0, 250, 0)", "(128, 128, 128)", "(250, 0, 250)"],
						correctAnswer:1,
						imageAdress: "https://download.unsplash.com/photo-1430126833726-4a091c572f3c"},
						{question: "Jak nazywa się polska wiodąca marka produkującą traktory?", 
						choices: ["Niedźwiedź", "Traktorex", "Łucznik", "Ursus"],
						correctAnswer:3,
						imageAdress: "https://download.unsplash.com/photo-1427434846691-47fc561d1179"},
						{question: "Co w sanskrycie oznacza słowo 'joga'?",
						choices: ["kontrola", "rozciągliwość", "droga", "wegetarianizm"],
						correctAnswer:0,
						imageAdress: "https://download.unsplash.com/photo-1429277096327-11ee3b761c93"}
						],
		totalQuestions = allQuestions.length;

	$("h1").after("<section id='quizPack'></section>");

	checkCurrentAnswer = function(){
		var currentAnswer = answers[currentQuestion];
		$("input").eq(currentAnswer).attr("checked", true);
	};

	// ładowanie zdjęcia do pytania
	placeImage = function(questionNumber){
		var img = $("<div id='image'></div>");
		$("#quizPack").prepend(img);
		$(img).append("<img id=image class='col-md-offset-4 img-rounded' width='394' height='326' src=" + allQuestions[questionNumber].imageAdress +">");
	};
	placeImage(currentQuestion);

	//ładowanie pytań
	placeQustion = function(questionNumber){
		var qst = $("<h3 id='question' class='col-md-12 text-center'></h3>");
		$("#image").after(qst);
		$(qst).text("Pytanie numer: "+ (questionNumber+1) + ". ");
		$(qst).append(allQuestions[questionNumber].question);
	};
	placeQustion(currentQuestion);

	//ładowanie formularza 
	placeForm = function(){
	var frm = $("<form></form>");
	$("#question").after(frm);
	};
	placeForm();

	//ładowanie odpowiedzi
	placeAnswers = function(questionNumber){
		var div = $("<div id=answersSet class='col-md-9 col-md-offset-3'></div>");
		$("form").append(div);
		var i;
		for(i = 0; i < allQuestions[questionNumber].choices.length; i++){
			var inpt = $("<input>");
			$(inpt).attr({type:"radio", name:"answer", id:i});
	        $(div).append(inpt);
	        var lbl = $("<label></label>");
	        $(lbl).attr("for",i);
	        $(div).append(lbl);
	        $(lbl).append(allQuestions[questionNumber].choices[i]);
		}
	};
	placeAnswers(currentQuestion);

	//ładowanie odpowiedzi na koniec
	placeEndAnswers = function(questionNumber){
		var div = $("<div class='col-md-9 col-md-offset-3'></div>");
		$(div).attr("id","answersSet" + questionNumber);
		$("form").append(div);
		var i;
		for(i = 0; i < allQuestions[questionNumber].choices.length; i++){
	        var lbl = $("<label></label>");
	        $(lbl).attr("for",i);
	        $("#answersSet"+questionNumber).append(lbl);
	        $(lbl).append(allQuestions[questionNumber].choices[i]);
		}
	};

	//ładowanie przycisków
	placeButtons = function(){
		var div = $("<div id='buttons' class='col-md-9 col-md-offset-3'>");
		$("form").append(div);
		$(div).append("<button type='button' class='btn btn-md disabled' id='prevQuestion'>Poprzednie pytanie</button>");
		$(div).append("<button type='submit' class='btn btn-md' id='nextQuestion'>Następne pytanie</button>");
		$(div).append("<button type='button' class='btn btn-md' id='endGame'>Zakończ quiz</button>");

		// ładowanie poprzedniego zestawu pytań i odpowiedzi
		$("#prevQuestion").on('click',function(){
			answers[currentQuestion] = $("input[name=answer]:checked").attr("id");
			$("#image").remove();
			$("#question").remove();
			$("#answersSet").remove();
			$("#buttons").remove();
			currentQuestion --;
			placeImage(currentQuestion);
			placeQustion(currentQuestion);
			placeAnswers(currentQuestion);
			placeButtons();
			activePrevButton();
			checkCurrentAnswer();
		});

		//zakończenie gry
		$("#endGame").on('click',function(){
			var j;
			$("#quizPack").empty();
			for (j = 0; j < totalQuestions; j++) {
				placeImage(j);
				placeQustion(j);
				placeForm();
				placeEndAnswers(j);
				$("label").eq(allQuestions[j].correctAnswer).addClass("rightAnswer");
				if(answers[j] == allQuestions[j].correctAnswer){
					score ++;
					$("#answersSet"+j).prepend("<span class='glyphicon glyphicon-ok'></span>");
				}
				else if(answers[j] !== allQuestions[j].correctAnswer){
					$("label").eq(answers[j]).addClass("wrongAnswer");
					$("#answersSet"+j).prepend("<span class='glyphicon glyphicon-remove'></span>");
				};
			};
			placeScore();
			placeNewGameButton();
		});
	};
	placeButtons();

	//ładowanie wyniku
	placeScore = function(){
		var h2 = $("<h2 id=score class='col-md-12 text-center'></h2>");
		$("#quizPack").prepend(h2);
		$("#score").text("Twój wynik :" + score + "/" + totalQuestions);
	};

	//ładowanie przycisku "graj jeszcze raz"
	placeNewGameButton = function(){
		var div = $("<div id='space' class='col-md-12'>");
		$("#quizPack").append(div);
		$(div).after("<button type='button' class='btn btn-lg' id='newGame'>Zagraj jeszcze raz!</button>");

	//nowa gra
		$("#newGame").on('click',function(){
			location.reload();
		});
	};

	//przechodzenie do następnego pytania
	$("form").on("submit",function(e){
		e.preventDefault();
		answers[currentQuestion] = $("input[name=answer]:checked").attr("id");
		currentQuestion ++;
		if(currentQuestion == (totalQuestions-1)){
			$("#image").remove();
			$("#question").remove();
			$("#answersSet").remove();
			$("#buttons").remove();
			placeImage(currentQuestion);
			placeQustion(currentQuestion);
			placeAnswers(currentQuestion);
			placeButtons();
			activePrevButton();
			checkCurrentAnswer();
			$("#nextQuestion").remove();
			$("#prevQuestion").after("To jest ostatnie pytanie.");
		}
		else{
			$("#image").remove();
			$("#question").remove();
			$("#answersSet").remove();
			$("#buttons").remove();
			placeImage(currentQuestion);
			placeQustion(currentQuestion);
			placeAnswers(currentQuestion);
			placeButtons();
			activePrevButton();
			checkCurrentAnswer();
		};
	});

	//aktywowanie przycinku 'poprzednie pytanie'
	activePrevButton = function(){
		if(currentQuestion >= 1){
			$("#prevQuestion").removeClass("disabled");
		}
		else{
			$("#prevQuestion").addClass("disabled");
		}
	};
});