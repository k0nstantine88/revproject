const express = require('express');
const router = express.Router();
const scoreRouter = require('./score');

router.use('/score', scoreRouter);

module.exports = router;
