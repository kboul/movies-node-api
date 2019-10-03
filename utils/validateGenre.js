const Joi = require('@hapi/joi');

/**
 *
 * @param {Object} genre
 * @returns {Object} - validation error object
 */

const validateGenre = genre => {
    // validate
    // if invalid return 400 - Bad request
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .required()
    });
    return schema.validate(genre);
};

module.exports = validateGenre;
