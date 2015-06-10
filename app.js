
	var score = 0;
	var currentQuestion = 0;

	//pytania i odpowiedzi
	var allQuestions = [{question: "1. Who is Prime Minister of the United Kingdom?", 
						choices: ["1.David Cameron", "1.Gordon Brown", "1.Winston Churchill", "1.Tony Blair"],
						correctAnswer:0,
						imageAdress: "https://myworldofcmpunk.files.wordpress.com/2012/07/pics_in_a_pic_avatar_best_in_the_world_cm_punk_by_lovelives4ever-d5cxtt2.jpg"},
						{question: "2. Who is Prime Minister of the United Kingdom?", 
						choices: ["2.David Cameron", "2.Gordon Brown", "2.Winston Churchill", "2.Tony Blair"],
						correctAnswer:1,
						imageAdress: "url"},
						{question: "3. Who is Prime Minister of the United Kingdom?", 
						choices: ["3.David Cameron", "3.Gordon Brown", "3.Winston Churchill", "3.Tony Blair"],
						correctAnswer:2,
						imageAdress: "url"},
						{question: "4. Who is Prime Minister of the United Kingdom?", 
						choices: ["4.David Cameron", "4.Gordon Brown", "4.Winston Churchill", "4.Tony Blair"],
						correctAnswer:3,
						imageAdress: "url"},
						];
	var totalQuestions = allQuestions.length;

	//ładowanie pytań
	placeQustion = function(){
		$("#question").text("Pytanie numer: ");
		$("#question").append(allQuestions[currentQuestion].question);
	};
	placeQustion();

	//ładowanie odpowiedzi
	placeAnswers = function(){
		$("#answer1").text("");
		$("#answer2").text("");
		$("#answer3").text("");
		$("#answer4").text("");
		$("#answer1").append(allQuestions[currentQuestion].choices[0]);
		$("#answer2").append(allQuestions[currentQuestion].choices[1]);
		$("#answer3").append(allQuestions[currentQuestion].choices[2]);
		$("#answer4").append(allQuestions[currentQuestion].choices[3]);
	};
	placeAnswers();

	//ładowanie wyniku
	placeScore = function(){
		$("#score").text("Twój wynik :" + score + "/" + totalQuestions);
	};
	placeScore();

	//przechodzenie do następnego pytania
	$("form").on("submit",function(e){
		e.preventDefault();
		if($('input[name=answer]:checked').attr("id") == allQuestions[currentQuestion].correctAnswer){
			console.log($("label").attr("id"));
			score ++;
		};
		placeScore();
		currentQuestion ++;
		endGame();
		placeQustion();
		placeAnswers();
	});


	// ładowanie zdjęcia do pytania
	placeImage = function(){
		$("#image").append("<img id=image class='col-md-offset-3 img-rounded' width='304' height='236' src=" + allQuestions[currentQuestion].imageAdress +">");
	};
	placeImage();

	endGame = function(){
		if((currentQuestion+1) > totalQuestions){
			alert('koniec gry!');
		}
	};

//koniec gry- przycisk 'zakończ grę', wyswitlic wszystko i ktore dobre
//moze przycisk cofania
//
