const Joi = require("joi");

module.exports.itemSchema = Joi.object({
    item : Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().allow("",null)
    }).required()
});


module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        comment: Joi.string().required(),
        rating: Joi.number().required().min(1).max(5),
        
    }).required()
});

module.exports.addressSchema = Joi.object({
    address: Joi.object({
        firstName: Joi.string().strict().required(),
        lastName: Joi.string().strict().required(),
        streetAddress: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        zipCode: Joi.string().pattern(/^\d+$/).min(2).max(10).required(),
        mobile: Joi.string().pattern(/^\d+$/).min(7).max(12).required(),
    }).required()
})