var express = require('express');

module.exports = function(){
	var router = new express.Router();

	router.use(express.static(__dirname + '/../../frontend/public'));

	return router;
};