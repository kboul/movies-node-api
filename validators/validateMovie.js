const Joi = require('@hapi/joi');

const validateMovie = customer => {
    const schema = Joi.object({
        title: Joi.string()
            .min(5)
            .max(50)
            .required(),
        // here we want the client to only send the id of the genre
        genreId: Joi.string().required(),
        numberInStock: Joi.number()
            .min(0)
            .required(),
        dailyRentalRate: Joi.number()
            .min(0)
            .required()
    });
    return schema.validate(customer);
};

module.exports = validateMovie;
