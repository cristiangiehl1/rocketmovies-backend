// libs
const { sign } = require("jsonwebtoken");
const { compare } = require("bcryptjs");

// imported variables
const authConfig = require("../configs/auth");
const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class SessionController {
    async create(request, response) {
        const { email, password } = request.body;

        const user = await knex("users").where({email}).first();

        if(!user) {
            throw new AppError("Email e/ou senha incorreta", 401);
        }

        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched) {
            throw new AppError("Email e/ou senha incorreta", 401);
        }

        /*
            Destructuring our authConfig to retrieve the properties secret 
            and expiresIn.
        */ 
        const { secret, expiresIn } = authConfig.jwt;
        
        /*
            Using the jsonwebtoken library's function (sign) to set up 
            the API token.
        */ 
        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        })       

        return response.json({ user, token });
    }

}

module.exports = SessionController