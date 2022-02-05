const { ObjectId } = require('mongoose').Types;

module.exports = id => ObjectId.isValid(id);
