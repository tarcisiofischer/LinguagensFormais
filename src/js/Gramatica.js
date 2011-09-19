/**
 * Classe para representar uma gramatica como um conjunto
 * de producoes.
 * 
 * Modo de usar:
 * g = new lf.Gramatica(); // (lf significa o pacote LinguagensFormais)
 * g.adicionarProducao(new lf.Producao("S -> aS | aB"));
 * g.adicionarProducao(new lf.Producao("B -> bC"));
 * g.adicionarProducao(new lf.Producao("C -> aC | a"));
 * 
 * Esse exemplo deveria gerar a linguagem a+ba+
 * Veja a classe Producao para detalhes de como construir uma producao.
 * 
 * CUIDADO:
 * - Não foi feito pra funcionar com gramaticas do tipo 0 (irrestritas).
 *   Você foi avisado. (Em alguns casos funciona!)
 * - Ainda nao tem suporte para <epsilon>.
 * 
 * @author Tarcísio Fischer
 * @version 0.1
 */
lf.Gramatica = Class.create({
	
	initialize: function() {
		this._producoes = new Set();
	},

	adicionarProducao: function(producao) {
		this._producoes.add(producao);
		return this;
	},
	
	obterSimbolosAEsquerda: function() {
		var simbolosAEsquerda = new Set();
		
		this._producoes.foreach(function(producao) {
			simbolosAEsquerda = simbolosAEsquerda.union(producao.obterSimbolosAEsquerda());
		});
		
		return simbolosAEsquerda;
	},

	/**
	 * Ideia retirada do algoritmo proposto pelo professor (Na apostila).
	 * Eh bem ineficiente.
	 * Provavelmente do jeito que eu escrevi eh pior ainda. Hahaha...
	 * 
	 * Ficou confuso ateh de calcular a complexidade x_x"
	 * TODO: Tirar um tempo pra organizar essa zona! Talvez passar pra uma classe Algoritmo ?
	 */
	gerarSentencas: function(tamanhoMaximo) {
		var sentencas = new Set();
		var formasSentenciais = new Set(["S"]);
		
		// Gera todas as formas sentenciais de tamanho tamanhoMaximo
		for(var i = 0; i < tamanhoMaximo; i++) {
			var self = this;
			var formasSentenciaisAnteriores = new Set();
			do {
				formasSentenciaisAnteriores = formasSentenciais.clone();
				formasSentenciais.foreach(function(formaSentencial){
					self._producoes.foreach(function(producao){
							if(formaSentencial.search(producao.obterSimbolosAEsquerda() > -1))
								producao.obterSimbolosADireita().foreach(function(formaSentencialADireita) {
									var elemento = formaSentencial.replace(producao.obterSimbolosAEsquerda(), formaSentencialADireita);
									if(elemento.length <= tamanhoMaximo)
										formasSentenciais.add(elemento);
								});
					});
				});	
			} while(formasSentenciais.size() != formasSentenciaisAnteriores.size());
		}
		
		// Pega soh as sentencas da lista de formas sentenciais
		formasSentenciais.foreach(function(formaSentencial) {
			var regex = /^[a-z]*$/;
			if(regex.test(formaSentencial))
				sentencas.add(formaSentencial);
		});
		
		return sentencas;
	}

});