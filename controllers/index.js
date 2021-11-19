const router = require('express').Router();
const view = require('./view');
const apiRoutes = require('./api');

router.use('/', view);
router.use('/api', apiRoutes);

module.exports = router;
