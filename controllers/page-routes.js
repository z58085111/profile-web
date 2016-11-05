var main = require('./page/main.js');

module.exports = function(app){ 
  	// main
  	app.get('/', main.home);
};

