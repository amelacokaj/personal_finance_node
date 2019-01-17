const express = require('express');
const router = express.Router();
const path = require('path');

/* FIRST PASS TO FILTER OR USE AS MIDDLEWARE
router.use(function (req, res, next) {
	next();
});
*/

//AUTHENTICATION/public access
router.use('/auth', require('./controllers/auth.controller'));

router.use('/agents', require('./controllers/agents.controller'));
router.use('/cheques', require('./controllers/cheques.controller'));
router.use('/clients', require('./controllers/clients.controller'));
router.use('/contributors', require('./controllers/contributors.controller'));
router.use('/engagements', require('./controllers/engagements.controller'));
router.use('/expenses', require('./controllers/expenses.controller'));
router.use('/income', require('./controllers/income.controller'));

router.use('/settings', require('./controllers/settings.controller'));
router.use('/roles', require('./controllers/roles.controller'));
router.use('/users', require('./controllers/users.controller'));

// ANYTHING BELOW GOES THROUGH AUTH CHECK
// "acl" CHECKS FOR AUTH AS WELL THEREFORE 
// VOID DOUBLE CHECK WHEN USING "acl" AS DO MOST CONTROLLERS
/*
router.use(function (req, res, next) {
	if (!req.isAuthenticated()) {
		res.status(401).json(0);
	}
	else
		next();
});
*/

//SERVE PDF DOCUMENTS AFTER IT PASSES THE AUTCH-CHECK ABOVE
router.get('/docs/:filename', function (req, res) 
{
	let file_path = path.resolve(PROJECT_DIR + '/store/docs/' + req.params['filename']);
	res.download(file_path);
});

module.exports = router;