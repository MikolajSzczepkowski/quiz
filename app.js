$(function(){
	var score = 0;
	var answers=[];
	var currentQuestion = 0;

	//pytania i odpowiedzi
	var allQuestions = [{question: "Kto jest autorem słynnych 'Słoneczników'?", 
						choices: ["Vincent van Gogh", "Leonardo da Vinci", "Vermeer", "S. Dali"],
						correctAnswer:0,
						imageAdress: "http://pixabay.com/get/8cba66fca7a0f5b0861e/1434468655/sunflowers-76119_1280.jpg?direct"},
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
		$("h1").after("<section id='quizPack'></section>");
	};
	createQuizContainer();

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
		var div = $("<div id=answers class='col-md-9 col-md-offset-3'></div>");
		$("form").append(div);
		var i;
		for(i = 0; i < 4; i++){
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
		for(i = 0; i < 4; i++){
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
	};

	//przechodzenie do następnego pytania
	$("form").on("submit",function(e){
		e.preventDefault();
		answers.push($('input[name=answer]:checked').attr("id"));
		currentQuestion ++;
		if(currentQuestion==totalQuestions){
			$("#nextQuestion").remove();
			$("#prevQuestion").after("To było ostatnie pytanie.");
		}
		else{
		$("#image").remove();
		$("#question").remove();
		$("#answers").remove();
		$("#buttons").remove();
		placeImage(currentQuestion);
		placeQustion(currentQuestion);
		placeAnswers(currentQuestion);
		placeButtons();
		activePrevButton();
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

	// ładowanie poprzedniego zestawu pytań i odpowiedzi
	$(document.body).on('click',"#prevQuestion",function(){
		$("#image").remove();
		$("#question").remove();
		$("#answers").remove();
		$("#buttons").remove();
		currentQuestion --;
		answers.pop();
		placeImage(currentQuestion);
		placeQustion(currentQuestion);
		placeAnswers(currentQuestion);
		placeButtons();
		activePrevButton();
	});

	//zakończenie gry
	$(document.body).on('click',"#endGame",function(){
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

	//nowa gra
	$(document.body).on('click',"#newGame",function(){
		location.reload();
	});
});