const Joi = require('@hapi/joi');

/**
 *
 * @param {Object} user
 * @returns {Object} - validation error object
 */

const validateUser = user => {
    const schema = Joi.object({
        name: Joi.string()
            .min(5)
            .max(50)
            .required(),
        email: Joi.string()
            .min(5)
            .max(255)
            .required()
            .email(),
        password: Joi.string()
            .min(5)
            .max(255)
    });
    return schema.validate(user);
};

module.exports = validateUser;
