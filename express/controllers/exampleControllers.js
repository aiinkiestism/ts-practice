var Example = requrie('../models/example');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var async = require('async');

// codes handling business logic and communicate db
