var Joi = require('joi');

var post = Joi.object().keys({
  room: Joi.string().min(1).required(),
  body: Joi.string().min(1).required(),
  postedAt: Joi.date().default(Date.now, 'time of submission')
});

module.exports = {
  post: post
};