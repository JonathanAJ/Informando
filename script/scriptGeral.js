var main = function(){

	//faz o conteúdo da página aparecer
	$("body").fadeIn(700);
	avatarEscolha();
	/*
		Documento
		Códigos para página Login
		*/
		if(document.title=="Informando Login"){

		//seta inicial 
		if(localStorage.inicial==null){
			localStorage.inicial = false;
		}

		if(localStorage.avatar==null){
			localStorage.avatar='avatar-ico-none'
		}else{
			localStorage.avatar = localStorage.avatar;
		}

		moveTooltip();
		
		var valorSelect;
		
		window.onload = function(){
			//posiciona div
			posicionaDivCentro('.div-login');
			//select
			$( "select" )
			.change(function () {
				$( "select option:selected" ).each(function() {
					valorSelect = $(this).val();
				});
				if(valorSelect=='selecione'){
					$('#avatar').addClass('avatar-ico-none')
					.removeClass('avatar-ico-menino')
					.removeClass('avatar-ico-menina');
					localStorage.avatar = 'avatar-ico-none';
				}else if(valorSelect=='menino'){
					$('#avatar').addClass('avatar-ico-menino')
					.removeClass('avatar-ico-none')
					.removeClass('avatar-ico-menina');
					localStorage.avatar = 'avatar-ico-menino';
				}else if(valorSelect=='menina'){
					$('#avatar').addClass('avatar-ico-menina')
					.removeClass('avatar-ico-menino')
					.removeClass('avatar-ico-none');
					localStorage.avatar = 'avatar-ico-menina';
				}
			})
			.change();
		}

		notificacao("Olá! Seja bem vindo ao Informando.<br>Coloque seu nome no campo indicado,<br>para começar nossa aventura!", "verde", 10000);

		$(".entrar-login").click(function(event){
    	//previne o evento padrão de redirecionamento de links
    	event.preventDefault();
		//mostra nome
		var nomeAluno = $("#nome-login").val();
		//se os valores forem inválidos
		if(nomeAluno==""||nomeAluno==" "||valorSelect=='selecione'){
			notificacao("Você deve ter esquecido de colocar o nome ou o sexo.<br>Verifique as caixas de entrada. :/", "vermelho", 2300);
		}else{
			//guarda o nome
			localStorage.nomeAluno = nomeAluno;
			//guarda entrada inicial
			localStorage.inicial = true;
			//faz as devidas animações na página
			redirecionarPagina('principal.html');
		}
	});

	}
	/*
		Documento
		Códigos para página Principal
		*/
		else if(document.title=="Informando Principal"){

		//Menu página Principal
		$(".menu-img").mouseenter(function(){
			$(this).finish();
			$('.menu-img').removeClass('icon-th-thumb');
			$('.menu-img').addClass('icon-th-thumb-empty');
			$('.menu-img').animate({fontSize: "+=5px"}, 300, "easeOutBounce");
		});
		$(".menu-img").mouseleave(function(){
			$(this).finish();
			$('.menu-img').removeClass('icon-th-thumb-empty');
			$('.menu-img').addClass('icon-th-thumb');
			$('.menu-img').animate({fontSize: "-=5px"}, 300, "easeOutBounce");
		});
		$(".menu-img").click(function(){
			$(".abre-menu").finish();
			$(".abre-menu").animate({marginLeft: "-=300px"}, 800, "easeOutBounce");
		});
		$(".abre-menu").mouseleave(function(){
			$(".abre-menu").animate({marginLeft: "100%"}, 800, "easeOutBounce", function(){
				fechaOpcoes();
			});
		});
		window.onload = function(){
			//tooltip		
			moveTooltip();
			//posiciona div
			posicionaDivCentro('.blocos-div');

		}
		//Quando as opçoes forem clicadas
		$('.conf-title').click(function(){
			$('.conf-content:not(this)').slideUp(300);
			if($(this).next().css('display')=='none'){
				$(this).next().slideDown(300);
			}else{
				$(this).next().slideUp(300);
			}
		});

		$('.bt-full').click(function(){
			fullScreen('principal.html');
		});

		function fechaOpcoes(){
			if($('.abre-menu').css('margin-left') == $(window).width()+'px'){
				$('.conf-content').slideUp(300);
			}
		}

		//click editar nome, apagar progresso
		$('.bt-nome-edit, .bt-apagar').click(function(){

			if($(this).hasClass('bt-nome-edit')){
				var nomeAlunoEdit = $('#nome-edit').val();
				if(nomeAlunoEdit==""||nomeAlunoEdit==" "){
					$(".abre-menu").animate({marginLeft: "100%"}, 800, "easeOutBounce", function(){
						fechaOpcoes();
					});
					notificacao("Acho que este não é seu nome!<br> Por favor, coloque um nome válido.", "vermelho", 1700);
				}else{
					//guarda o nome
					localStorage.nomeAluno = nomeAlunoEdit;
					redirecionarPagina('principal.html');
				}
			}else if($(this).hasClass('bt-apagar')){
				localStorage.clear();
				redirecionarPagina('index.html');
			}
		});



    	// Evento responsável por monitorar o evento de redimensionamento de tela
    	window.onresize = function() {
    		var larguraAtualTela = $(window).width();
			//se tiver mudado, ele reposiciona o menu que abre
			$(".abre-menu").css("margin-left", larguraAtualTela);
		}
	  	//FIM - Menu página Principal

		//Blocos página Principal
		$('#bloco1, #bloco2, #bloco3').mouseenter(function(){
			$(this).finish();
			$(this).animate({top: "-=30px"}, 300, "easeInOutBack");
		});
		$('#bloco1, #bloco2, #bloco3').mouseleave(function(){
			$(this).finish();
			$(this).animate({top: "+=30px"}, 300, "easeOutBounce");
		});
		$('#bloco1, #bloco2, #bloco3').click(function(){
			if(this.id=="bloco1"){
				notificacao('Tenha calma, estamos preparando tudo para você!<br>Por enquanto, os módulos estão desativados. ;)', 'verde', 2300);
			}else if(this.id=="bloco2"){
				redirecionarPagina('simulados.html');
			}else if(this.id=="bloco3"){
				redirecionarPagina('resultados.html');
			}
		});
		//FIM - Blocos página Principal
		adicionaNomeAluno();

	}
	/*
		Documento
		Códigos para página Principal
		*/
		else if(document.title=="Informando Simulados"){

			window.onload = function(){
				//posiciona div
				posicionaDivCentro('.principal-simulados');
				//habilita as questoes
				questoesSimulado(enunciado, 1);
				//habilita salvar itens
				salvaRecompensaItem(Number(localStorage.enunciado), false);
				//habilita salvar evolucoes
				salvaRecompensaEvolucao(contEvolucao, false);
				//imagem recompensas item
				$('.img-recompensa').attr('src',"img/img_recompensas/itens/"+Number(localStorage.enunciado)+".png");
				//imagem recompensas evolucao
				if(contEvolucao<11){
					$('.img-recompensa-ev').attr('src',"img/img_recompensas/evolucoes/"+contEvolucao+".png");
				}else{
					$('.img-recompensa-ev').attr('src',"img/img_recompensas/evolucoes/finalizado.png");
				}
				//tooltip
				moveTooltip();

				//rolagem
				$('.coluna-cent-simu, .coluna-pergunta, .coluna-dir-simu, .inicio-coluna1').mCustomScrollbar({theme: "minimal"});
				if(localStorage.finalTodos !== 'true'){
					notificacao("Olá! Seja bem vindo(a) a área onde você irá <br> se tornar um(a) guerreiro(a) do conhecimento!", "verde", 5000);
				}
			}

			var linhaAlt = $('.inicio-linha1').height();
			$('.inicio-recompensa').css('height', linhaAlt);

			$('.botao-iniciar-simulado').click(function(){
				inicioSimulado = false;
				$('.inicio-simulado').slideUp(500, function(){
					$('.coluna-esq-simu, .coluna-cent-simu, .coluna2').slideDown(500);
				});

			});

			//inicialização de variáveis localStorage
			localStorage.removeItem('quest');
			if(localStorage.enunciado == null){
				localStorage.enunciado = 1;
			}else{
				localStorage.enunciado = localStorage.enunciado;
			}

			//simulado padrao
			if(localStorage.simuladoPadrao == null){
				localStorage.simuladoPadrao = 'true';
			}else{
				localStorage.simuladoPadrao = localStorage.simuladoPadrao;

			}
			//recompensa padrao
			if(localStorage.recompensaPadrao == null){
				localStorage.recompensaPadrao = 'true';
			}else{
				localStorage.recompensaPadrao = localStorage.recompensaPadrao;

			}

			//evolucao padrao
			if(localStorage.evolucaoPadrao == null){
				localStorage.evolucaoPadrao = 'true';
			}else{
				localStorage.evolucaoPadrao = localStorage.evolucaoPadrao;

			}
			//cria objeto Date do javascript
			var data = new Date;
			//mostra os valores respectivos
			var dataDMA = data.getDate()+"/"+(data.getMonth()+1)+"/"+data.getFullYear(); 
			var dataHm = data.getHours()+"H"+data.getMinutes()+"m";
			var dataFull = dataDMA + " - " + dataHm;

			
			//variável que quardará todos os HTMLs de Resultado;
			var htmlResultadoSimulado;

			//variaveis do simulado
			var enunciado = Number(localStorage.enunciado);
			var contQ = 2;
			var i = 0;
			var item = [];
			var respC = [];
			var htmlSimulado;
			var respostaCerta;
			var txtTitulo;
			var txtCategoria;
			var txtAno;
			var inicioSimulado = true;
			var totalQuest;

			//variaveis do ajax de recompensas
			var itemNum;
			var itemNome;
			var itemNarrativa;

			//variaveis do ajax de evolucoes
			if(localStorage.contEvolucao==null){
				localStorage.contEvolucao = '1';
			}else{
				localStorage.contEvolucao = localStorage.contEvolucao;
			}
			var contEvolucao = Number(localStorage.contEvolucao);
			var itemNumEv;
			var itemNomeEv;
			var itemNarrativaEv;			

			//click de confirmação "Prosseguir"
			$('.confirma-resposta').click(function(){
				item[i] = $("input[name='questao']:checked").val();
				$(':radio').attr('checked', false);

				if(item[i]==null){
					notificacao("Ops... você esqueceu de marcar o item!", "vermelho", 1700);
				}else{
					respC[i] = respostaCerta;	
					i++;
					$('.coluna-esq-simu-questao').eq(i).addClass('q-select');
					$('.coluna-esq-simu-questao').eq(i).next().addClass('q-select-i');
					$('.coluna-esq-simu-questao').eq(i-1).addClass('q-complet');
					$('.coluna-esq-simu-questao').eq(i-1).next().addClass('q-complet-i');
					animacaoQuestoesNext(enunciado, contQ);
					contQ++;

					if(contQ==7){
						var classeIcon;
						for(var ix=0; ix<=4; ix++){
							if(localStorage.quest==null){
								console.log("rspC "+respC[ix]+"  item  "+item[ix]);
								if(respC[ix]==item[ix]){
									classeIcon = 'icon-ok-circled';
								}else{
									classeIcon = 'icon-cancel-circled';
								}
								localStorage.quest = "<li><i class='"+classeIcon+"'></i>Questão 1 - "+item[ix]+"</li>";	
							}else{
								if(respC[ix]==item[ix]){
									classeIcon = 'icon-ok-circled';
								}else{
									classeIcon = 'icon-cancel-circled';
								}
								localStorage.quest = localStorage.quest+"<li><i class='"+classeIcon+"'></i>Questão "+ (ix+Number(1)) +" - "+item[ix]+"</li>";
							}
						}
						localStorage.quest = "<ul>"+localStorage.quest+"</ul>";
						htmlSimulado = $.parseHTML(localStorage.quest);
						console.log(htmlSimulado);
					}
				}
			});

		//botoes resultado simulados
		if(localStorage.finalTodos == null){
			localStorage.finalTodos = 'false'
		}

		if(localStorage.finalTodos == 'true'){
			$('.inicio-simulado').css('display', 'none');
			$('.finalizado').css('display', 'block');
		}

		$('.botao-refazer, .botao-salvar, .botao-ir-result').click(function(){
			if($(this).hasClass('botao-salvar')){

				salvarEmResultados();

				var resultadoQuest = calculaResultado();

				if(resultadoQuest>=4){
					if(contEvolucao<11){
						salvarEvolucaoEmResultados();
					}
				}

				localStorage.enunciado = enunciado+=1; 
				$('.finaliza-result').slideDown(500);
				$('.coluna-cent-simu-result').slideUp(500);
				$('.coluna-cent-simu').animate({height: "-=190px", marginTop: "+=100px"}, 500);
				console.log(enunciado-1 +"    "+ totalQuest);
				if(enunciado-1 == totalQuest){
					localStorage.finalTodos = 'true';
				}


			}else if($(this).hasClass('botao-ir-result')){
				window.location = 'resultados.html';
			}else if($(this).hasClass('botao-refazer')){
				window.location = 'simulados.html';
			}
		});

		voltarPagina();
		adicionaNomeAluno();

	} else if(document.title == "Informando Resultados"){

		window.onload = function(){
			//tootltip
			moveTooltip();
			//posiciona div
			posicionaDivCentro('.resultados');
			//rolagem
			$('.resultado-bloco, .conteudo-result').mCustomScrollbar({theme: "minimal"});
		}

		//Página Resultados
		// variável principal que receberá o HTML de Resultado - Simulados e poderá manipula-lo
		var htmlResultadoPrincipal;
		if(localStorage.htmlResultadoSimulado==null){
			localStorage.htmlResultadoSimulado = "<div class='simulado-padrao resultado-bloco'><i class='icon-doc-text-2 icon-grande'></i><p>Você ainda não salvou nenhum simulado!	</p><div class='resultado-bloco-questao'><div><p style='text-transform: uppercase; font-size: 12px; text-align: center; margin-bottom: 30px;'>Você precisa fazer simulados para verificar seu resultado.</p></div></div></div>";
			htmlResultadoPrincipal = $.parseHTML(localStorage.htmlResultadoSimulado);
		}else{
			localStorage.htmlResultadoSimulado = localStorage.htmlResultadoSimulado;
			htmlResultadoPrincipal = $.parseHTML(localStorage.htmlResultadoSimulado);
		}
		$('.resultados-simulados .conteudo-result').append(htmlResultadoPrincipal);

		// variável principal que receberá o HTML de Resultado - Recompensas Itens e poderá manipula-lo
		var htmlRecompensas;
		if(localStorage.htmlRecompensas==null){
			localStorage.htmlRecompensas = "<div class='conquista-padrao resultado-bloco'><i class='icon-plus-squared icon-grande'></i><p>Você ainda não tem nenhuma conquista!</p><div class='resultado-bloco-questao'><p style='text-transform: uppercase; font-size: 12px; text-align: center; margin-bottom: 30px;'>Você precisa fazer simulados para conseguir conquistas.</p></div></div>";
			htmlRecompensas = $.parseHTML(localStorage.htmlRecompensas);
		}else{
			localStorage.htmlRecompensas = localStorage.htmlRecompensas;
			htmlRecompensas = $.parseHTML(localStorage.htmlRecompensas);
		}

		$('.resultados-conquistas .conteudo-result').append(htmlRecompensas);

		// variável principal que receberá o HTML de Resultado - Recompensas Itens e poderá manipula-lo
		var htmlEvolucoes;
		if(localStorage.htmlEvolucoes==null){
			localStorage.htmlEvolucoes = "<div class='avatar-padrao resultado-bloco'><i class='icon-smile icon-grande'></i><p>Você ainda não tem nenhum Morfão!</p><div class='resultado-bloco-questao'><p style='text-transform: uppercase; font-size: 12px; text-align: center; margin-bottom: 30px;'>Você precisa fazer simulados para ganhar Morfãos.</p></div></div>";
			htmlEvolucoes = $.parseHTML(localStorage.htmlEvolucoes);
		}else{
			localStorage.htmlEvolucoes = localStorage.htmlEvolucoes;
			htmlEvolucoes = $.parseHTML(localStorage.htmlEvolucoes);
		}

		$('.resultados-evolucoes .conteudo-result').append(htmlEvolucoes);

		//Animação da seleção blocos de resultados 
		$('.resultado-bloco').click(function(){

			$('.resultado-bloco-questao', this).finish();
			$('.resultado-bloco-questao:not(this)').slideUp(300);
			if($(this).find('.resultado-bloco-questao').css('display')=='none'){
				$(this).find('.resultado-bloco-questao').slideDown(300);
			}else{
				$(this).find('.resultado-bloco-questao').slideUp(300);
			}
		});

		voltarPagina();
		adicionaNomeAluno();

	}

	function adicionaNomeAluno(){
		$(".msg-usuario").html("<p>Oi, "+localStorage.nomeAluno+" </p>");
	}


	//função chamada para redirecionar a janela à devida página após animações
	function redirecionarPagina(link) {
		$("body").fadeOut(700, function(){
			window.location = link;	
		});
	}
	
	//tooltip
	function moveTooltip(){

		$('[data-tooltip]').mouseenter(function(e){
			var x,y;
			$(this).mousemove(function(o){
				x = o.pageX;
				y = o.pageY;
				var txt = $(this).attr('data-tooltip');
				var $tooltip = $('.tooltip');
				$tooltip.finish();
				$tooltip.text(txt);
				var larg = $tooltip.width();
				$tooltip.addClass('top');
				// $('.tooltip .top:before').css({left: larg/2+"px"});
				$tooltip.css({top: y+"px", left: x+"px", 'margin-left': '-'+larg/2+"px"}).fadeIn(500);
			});
		}).mouseleave(function(){
			$('.tooltip').finish();
			$('.tooltip').slideUp(200);
		});
		

	}

	//Botão Voltar
	function voltarPagina(){
		$('.voltar').mouseenter(function(){
			$('.voltar-img').finish();
			$('.voltar-img').animate({fontSize: "+=10px"}, 300, "easeOutBounce");
		});
		$('.voltar').mouseleave(function(){
			$('.voltar-img').finish();
			$('.voltar-img').animate({fontSize: "-=10px"}, 300, "easeOutBounce");
		});
		$('.voltar-img').click(function(){
			redirecionarPagina('principal.html');
			localStorage.removeItem('quest');
		});
	}
	//Fim Botão voltar

	//Página Simulados
	function animacaoQuestoesNext(enunciado, questao){
		if(questao==6){
			notificacao("Muito bem! Você fez tudo!<br>Veja a baixo suas conquistas.", "verde", 2700);
			$('.coluna2').delay(150).animate({marginLeft: '-=380px'}, 600).fadeOut(200);
			$('.coluna-esq-simu').slideUp(500);
			$('.coluna-cent-simu').animate({width: '+=150px'}, 600);
			$('.coluna-cent-simu-all').slideUp(1200, function(){
				mostraResultado();
			});

		}else{
			$('.coluna-cent-simu, .coluna-dir-simu, .notificacoes-sub').finish();
			$('.simulado-pergunta, .confirma-resposta').fadeOut(300).fadeIn(300);
			$('.respostas-q').fadeOut(300, function(){
				questoesSimulado(enunciado, questao);
			}).fadeIn(100);
		}
	}

	function mostraResultado(){
		$('.coluna-cent-simu-result').slideDown(1200);
		$(".coluna-cent-simu-result-conteudo p:first-child").append(htmlSimulado);
		calculaResultado();

	}


	function calculaResultado(){
		var contQuestaoCerta = 0;
		for(var i=0; i<=4; i++){
			if($('.coluna-cent-simu-result-conteudo ul li i').eq(i).hasClass('icon-ok-circled')){
				contQuestaoCerta+=1;
			}
		}
		var msg;
		if(contQuestaoCerta==0){
			msg = "Você não foi nada bem, pois não acertou nenhuma questão, você deve refazer o teste! :(";
		}
		else if(contQuestaoCerta==1){
			msg = "Você não foi muito bem, acertou apenas uma questão, você deve refazer o teste! :(";
		}
		else if(contQuestaoCerta==2){
			msg = "Você não foi tão bem assim, acertou duas apenas, você deve refazer o teste! :(";
		}
		else if(contQuestaoCerta==3){
			msg = "Você foi bem, acertou três, mas tem que melhorar! Você pode refazer ou salvar o progresso. :)";
}
else if(contQuestaoCerta==4){
	msg = "Você foi muito bem, acertou quatro! Só mais um pouquinho de esforço! Agora salve seu progresso. :)";
}
else if(contQuestaoCerta==5){
	msg = "Você foi excelente, acertou todas! É assim que se faz! Agora salve seu progresso. :D";
}

$(".coluna-cent-simu-result-conteudo .msg-result").append(msg);

if(contQuestaoCerta<3){
	$('.botao-salvar').css('display', 'none');

	if($('.avatar').hasClass('avatar-ico-menino')){
		$('.avatar').removeClass('avatar-ico-menino').addClass('avatar-ico-menino-t');
	}else{
		$('.avatar').removeClass('avatar-ico-menina').addClass('avatar-ico-menina-t');
	}

}else{
	$('.coluna-cent-simu-result-recompensas p').css('display', 'none');
	$('.coluna-cent-simu-result-recompensas').append("<p class='titulo-result'>Veja o que você ganhou! <i class='icon-smile' style='color: #61ff6c;'></i> </p>");
	$('.coluna-cent-simu-result-recompensas').append("<img class='img-certa' src='img/img_recompensas/itens/"+Number(localStorage.enunciado)+".png' />");

			}
			if(contQuestaoCerta>=4){
				if(contEvolucao<11){
					$('.coluna-cent-simu-result-recompensas').append("<img class='img-certa' src='img/img_recompensas/evolucoes/"+contEvolucao+".png' />");
				}else{
					$('.coluna-cent-simu-result-recompensas').append("<img class='img-certa' src='img/img_recompensas/evolucoes/finalizado.png' />");
				}
			}

			return contQuestaoCerta;
		}


		function questoesSimulado(enunciado, questao){
			$.ajax({
				type: "GET",
				isLocal: true,
				url: "xml/questoes.xml",
				dataType: "xml",
				beforeSend : function(){
					console.log("Enviando...");
				},
				error : function(xhr, sta, erro){
					console.log(erro);
				},
				success : function(xml){
					console.log("Enviado!");

					var e = enunciado-1;
					var q = questao-1;

					$(xml).find('questao').eq(e).each(function(){

						txtCategoria = $(this).find('categoria').text();
						txtAno = $(this).find('data').text();

						txtTitulo = $(this).find('titulo').text();
						$('.enunciado-titulo p').text("Enunciado: "+txtTitulo);

						var txtEnunciado = $(this).find('enunciado').text();
						$('.simulado-enunciado p').html(txtEnunciado);

						var txtPergunta = $(this).find('pergunta').eq(q).text();
						$('.simulado-pergunta p').html(txtPergunta);

						var txtA = $(this).find('respostaA').eq(q).text();
						$('#r-q1 span').html(txtA);

						var txtB = $(this).find('respostaB').eq(q).text();
						$('#r-q2 span').html(txtB);

						var txtC = $(this).find('respostaC').eq(q).text();
						$('#r-q3 span').html(txtC);

						var txtD = $(this).find('respostaD').eq(q).text();
						$('#r-q4 span').html(txtD);

						var txtE = $(this).find('respostaE').eq(q).text();
						$('#r-q5 span').html(txtE);

						respostaCerta = $(this).find('respostaCerta').eq(q).html();

						if(inicioSimulado==true){
							var htmlInicioSimulado = "<p class='p2i-s-c'>Você agora irá fazer um simulado de "
							+ txtCategoria +", com nome de "
							+ txtTitulo +", da "+ txtAno +". Está preparado? Então, bom desempenho!</p>";
							$('.inicio-simulado-conteudo').append(htmlInicioSimulado);

					// numero de questoes
					totalQuest = $(xml).find('questao').length;
				}
			});
}
});
}

	//função que salva os resultados
	function salvarEmResultados(){

	//verifica se o resultado é padrão
	if(localStorage.simuladoPadrao == 'true'){
			//se for, ele seta para 'falso', ou seja, não quero que ele seja visto
			localStorage.simuladoPadrao = 'false';
			//então, deleto ele do localStorage
			localStorage.htmlResultadoSimulado = '';
		}
		/*
			Depois da regra de condicionalidade, coloque na variável o padrão de div com  o localStorage.quest,
			exatamente dentro da div necessária.
			*/
			htmlResultadoSimulado = "<div class='resultado-bloco'> <i class='ico-res icon-doc-text-2 icon-grande'> </i> <p class='resultado-bloco-titulo'>"
			+ txtTitulo +
			"</p> <p class='resultado-bloco-data'> "
			+ dataFull +
			" </p> <div class='resultado-bloco-questao altura-bloco-simulado'> <p class='p-bloco1'> resultado </p>"
			+ localStorage.quest
			+  "<p class='p-bloco2'> categoria </p>"
			+ "<p class='resultado-bloco-data'>" + txtCategoria + " - "+ txtAno +"</p>" +
			" </div> </div>";
		/*
			Utilize a variável e a ponha dentro do Storage htmlResultadosSimulado, que ficará guardado todas
			as DIVs já com os valores necessários.
			*/
			localStorage.htmlResultadoSimulado = htmlResultadoSimulado + localStorage.htmlResultadoSimulado;


	//verifica se o resultado é padrão
	if(localStorage.recompensaPadrao == 'true'){
			//se for, ele seta para 'falso', ou seja, não quero que ele seja visto
			localStorage.recompensaPadrao = 'false';
			//então, deleto ele do localStorage
			localStorage.htmlRecompensas = '';
		}

		salvaRecompensaItem(Number(localStorage.enunciado), true);

	}

	function salvaRecompensaItem(numRecompensa, salvar){
		$.ajax({
			type: "GET",
			isLocal: true,
			url: "xml/recompensas.xml",
			dataType: "xml",
			beforeSend : function(){
				console.log("Enviando... recompensa");
			},
			error : function(xhr, sta, erro){
				console.log(erro);
			},
			success : function(xml){
				console.log("Enviado... recompensa");

				numRecompensa = numRecompensa - 1;			

				$(xml).find('recompensa').eq(numRecompensa).each(function(){

					itemNum = $(this).find('num').text();
					itemNome = $(this).find('nome').text();
					itemNarrativa = $(this).find('narrativa').text();
				});

				if(salvar == true){
					insereRecompensa();
				}else{
					$('.img-recompensa').attr('data-tooltip', 'Item: '+ itemNome +' - Requisitos: +3');
				}
			}
		});
	}

	function insereRecompensa(){
		localStorage.htmlRecompensas = "<div class='resultado-bloco'><div class='recompensa'><img src='img/img_recompensas/itens/"+itemNum
		+".png'/></div><div class='recompensa-descricao'><div class='recompensa-descricao-p'>"
		+"<p class='resultado-bloco-titulo'>"+itemNome
		+"</p><p class='resultado-bloco-data' style='font-size: 13px;'><i class='icon-bookmark'></i>Em: "+dataDMA
		+"</p><p style='font-style: italic; font-size: 14px;'><i class='icon-book-open'></i> Click para ler a história</p>"
		+"</div></div><div class='recompensa-narrativa resultado-bloco-questao'>"
		+"<p>"+itemNarrativa
		+"</p></div></div>" + localStorage.htmlRecompensas;

	}

	//função que salva os resultados das evolucoes
	function salvarEvolucaoEmResultados(){

		//verifica se o resultado é padrão
		if(localStorage.evolucaoPadrao == 'true'){
			//se for, ele seta para 'falso', ou seja, não quero que ele seja visto
			localStorage.evolucaoPadrao = 'false';
			//então, deleto ele do localStorage
			localStorage.htmlEvolucoes = '';
		}

		salvaRecompensaEvolucao(contEvolucao, true);
		localStorage.contEvolucao = contEvolucao + 1;
	}

	function salvaRecompensaEvolucao(numRecompensa, salvar){
		$.ajax({
			type: "GET",
			isLocal: true,
			url: "xml/recompensas.xml",
			dataType: "xml",
			beforeSend : function(){
				console.log("Enviando... recompensa... evolucao");
			},
			error : function(xhr, sta, erro){
				console.log(erro);
			},
			success : function(xml){
				console.log("Enviado... recompensa... evolucao");

				numRecompensa = numRecompensa - 1;			

				$(xml).find('evolucoes recompensa').eq(numRecompensa).each(function(){

					itemNumEv = $(this).find('num').text();
					itemNomeEv = $(this).find('nome').text();
					itemNarrativaEv = $(this).find('narrativa').text();
				});

				if(salvar == true){
					insereRecompensaEv();
				}else{
					if(contEvolucao<11){
						$('.img-recompensa-ev').attr('data-tooltip', 'Mórfão: '+ itemNomeEv +' - Requisitos: +4');
					}else{
						$('.img-recompensa-ev').attr('data-tooltip', 'Você tem todos os Mórfãos');	
					}
				}
			}
		});
	}

	function insereRecompensaEv(){
		localStorage.htmlEvolucoes = "<div class='resultado-bloco'><div class='recompensa'><img src='img/img_recompensas/evolucoes/"+itemNumEv
		+".png'/></div><div class='recompensa-descricao'><div class='recompensa-descricao-p'>"
		+"<p class='resultado-bloco-titulo'>"+itemNomeEv
		+"</p><p class='resultado-bloco-data' style='font-size: 13px';><i class='icon-bookmark'></i>Em: "+dataDMA
		+"</p><p style='font-style: italic; font-size: 14px;'><i class='icon-book-open'></i> Click para ler a história</p>"
		+"</div></div><div class='recompensa-narrativa resultado-bloco-questao'>"
		+"<p>"+itemNarrativaEv
		+"</p></div></div>" + localStorage.htmlEvolucoes;
	}

	//Função que recebe a frase e seu tipo, para notificar em tela
	function notificacao(frase, tipo, tempo){
		$('.notificacoes-sub').finish();
		if(tipo=="verde"){
			$('.notificacoes-sub').addClass('not-verde');
			$('.notificacoes-sub').removeClass('not-vermelho');
			$('.tri').addClass('tri-verde');
			$('.tri').removeClass('tri-vermelho');
		}	
		if(tipo=="vermelho"){
			$('.notificacoes-sub').addClass('not-vermelho');
			$('.notificacoes-sub').removeClass('not-verde');
			$('.tri').removeClass('tri-verde');
			$('.tri').addClass('tri-vermelho');
		}
		$('.notificacoes-sub').fadeIn(0)
		.animate({marginTop: "+=40px"}, 500, "easeOutBounce")
		.delay(tempo)
		.fadeOut(1600)
		.animate({marginTop: "-=40px"}, 0);
		$('.notificacoes-sub p').html(frase);	
	}//Fim função
	
	//animação icones rodapé
	$('.info, .help').mouseenter(function(){
		$(this).finish();
		$(this).animate({fontSize: "+=3px"}, 100);
	});
	$('.info, .help').mouseleave(function(){
		$(this).finish();
		$(this).animate({fontSize: "-=3px"}, 100);
	});

	//Abre dialog rodapé
	$('.info, .help').click(function(){
		if (this.id=='info'){
			$('.informacao').fadeIn(300);
			posicionaDivCentro('.informacao-div');

		}else if (this.id=='help'){
			$('.ajuda').fadeIn(300);
			posicionaDivCentro('.ajuda-div');
		}	
	});
	//Fim Abre dialog rodapé
	$('.fechar-dialog').click(function(){
		if(this.id=='info-d'){
			$('.informacao').fadeOut(300);
		}else if(this.id=='help-d'){
			$('.ajuda').fadeOut(300);
		}
	});

	//Cofigurações iniciais e de posicionamento responsivo sobre os dialogs
	function posicionaDivCentro(seletor){
		var alturaAtualTela = $(window).height();
		var alturaDiv = $(seletor).height();
		alturaAtualTela = alturaAtualTela/2 - alturaDiv/2;
		$(seletor).css("margin-top", alturaAtualTela);
			//Configurações responsivas
			window.onresize = function(){
				alturaAtualTela = $(window).height();
				alturaDiv = $(seletor).height();
				alturaAtualTela = alturaAtualTela/2 - alturaDiv/2;
				$(seletor).css("margin-top", alturaAtualTela);
			}
		}

	function avatarEscolha(){
			$('#avatar').addClass(localStorage.avatar);
	}

	function fullScreen(pagina) {
		window.open(pagina, '', 'scrollbars=no, fullscreen=yes');
	}

	}
	$(document).ready(main);