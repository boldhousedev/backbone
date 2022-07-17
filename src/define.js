
import Bb from 'backbone';

import format from './format';
import formatter from './formatter';
import helpers from './helpers';
import jsonpile from './json_pile_html';
import listener from './listener';
import pretriggers from './pretriggers';
import validation from './validation';

var bbx = {};
bbx.format = format;

// backbone extensions
bbx.collection = Bb.Collection.extend();
bbx.model = Bb.Model.extend();
bbx.view = Bb.View.extend();


// formatter
for(let x in formatter['model']) {
	bbx.model.prototype[x] = formatter['model'][x];
}

for(let x in formatter['collection']) {
	bbx.collection.prototype[x] = formatter['collection'][x];
}

// helpers
for(let x in helpers['model_prototype']) {
	bbx.model.prototype[x] = helpers['model_prototype'][x];
}

// jsonpile
for(let x in jsonpile) {
	bbx.model.prototype[x] = jsonpile[x];
}

// listener
for(let x in listener['model_prototype']) {
	bbx.model.prototype[x] = listener['model_prototype'][x];
}

for(let x in listener['collection_prototype']) {
	bbx.collection.prototype[x] = listener['collection_prototype'][x];
}

for(let x in listener['view_prototype']) {
	bbx.view.prototype[x] = listener['view_prototype'][x];
}

// pretriggers
bbx.view.prototype.pretriggers = [];
bbx.collection.prototype.pretriggers = [];
bbx.model.prototype.pretriggers = [];
bbx.view.prototype.preinitialize = bbx.collection.prototype.preinitialize = bbx.model.prototype.preinitialize = pretriggers;

// validation
bbx.validation = validation;

export default bbx;