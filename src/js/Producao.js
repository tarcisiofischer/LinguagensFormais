/**
 * Classe que representa uma Produção. (ou seja, algo na forma a -> b)
 * 
 * ** LEIA **
 * Algumas regras que futuramente gostaria de mudar:
 * - Simbolos não-terminais são representados por letras maiusculas.
 * - Simbolos terminais são representados por letras minusculas.
 * - É necessario sempre ter '->' para separar a forma sentencial da esquerda das da direita.
 *   (exemplos logo abaixo)
 * - O 'OU' é representado por '/' e não por |. Cuidado com isso. Isso é pq eu não consegui fazer
 *   o regex do javascript aceitar o | :( aparentemente é um caracter especial. Se alguem conseguir
 *   pode mudar :D
 * - Ainda nao tenho suporte para o <epsilon>. Mas pretendo representa-lo por #. A nao ser que
 *   alguem tenha uma ideia melhor.
 * 
 * Modo de usar: (exemplos)
 * p = new lf.Producao("S -> aS / aB");
 * p = new lf.Producao("AB -> BA");
 * p = new lf.Producao("aXb -> ba");
 * p = new lf.Producao("S -> aSb / bSa / bSb / aSa / ab / ba / aa / bb");
 * p = new lf.Producao("   S->    aXc       /bSa/ bSb/aSa   / ab / ba / aa / bb       "); // Espacos nao sao relevantes :)
 * 
 * Modo de NAO USAR:
 * p = new lf.Producao("S -> aS | aB");
 * p = new lf.Producao("S > aS / aB");
 * p = new lf.Producao("S <- aS / aB");
 * p = new lf.Producao("S -> a S / aB");
 * p = new lf.Producao("a -> S"); // Tem que ter pelo menos um nao terminal na esquerda!
 * 
 * @author Tarcísio Fischer
 * @version 0.1
 */
lf.Producao = Class.create({
	
	initialize: function(producao) {
		this._producao;
		this._simbolosAEsquerda;
		this._simbolosADireita;
		
		var regex = new RegExp("^( *[a-z]*[A-Z]+[a-z]* *(->) *[a-zA-Z#]+( */ *[a-zA-Z#]+ *)* *)$");
		if(regex.test(producao)) {
			// Pega a producao ignorando espacos em branco
			this._producao = producao.replace(/ */g, "");
			
			var simbolos = this._producao.split("->");
			this.simbolosAEsquerda = simbolos[0];
			this.simbolosADireita = new Set(simbolos[1].split("/"));
		} else {
			throw "Producao invalida";
		};
	},

	obterSimbolosAEsquerda: function() {
		return this.simbolosAEsquerda;
	},

	obterSimbolosADireita: function() {
		return this.simbolosADireita;
	}
	
});