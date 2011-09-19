/**
 * Classe Set de suporte.
 * 
 * @autor Tarcísio Fischer
 */
var Set = Class.create({
	initialize: function(o) {
		this._size = 0;
		this._set = {};
		
		if(o instanceof Array)
			for(var e in o)
				if(typeof o[e] != "function") this.add(o[e]);
	},
	
	add: function(e) {
		if(!this.has(e))
			this._set[++this._size] = e;
	},
	
	remove: function(e) {
		var id = this.has(e);
		
		if(id) {
			delete this._set[id];
			this._size--;
		}
	},
	
	size: function() {
		return this._size;
	},
	
	has: function(e) {
		for(var i = 1; i <= this._size; i++)
			if(this._set[i] == e) return i;
		
		return false;
	},
	
	union: function(s) {
		var u = new Set();
		
		this.foreach(function(el) { u.add(el); });
		s.foreach(function(el) { u.add(el); });
		
		return u;
	},
	
	foreach: function(f) {
		for(var el in this._set)
			f(this._set[el]);
	},
	
	clone: function() {
		var c = new Set();
		this.foreach(function(e) {
			c.add(e);
		});
		
		return c;
	}
	
});