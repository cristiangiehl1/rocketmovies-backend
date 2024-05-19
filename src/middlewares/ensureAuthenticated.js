// libs
const { verify } = require("jsonwebtoken");

// imported variables
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");


function ensureAuthenticated(request, response, next) {
    const authHeader = request.headers.authorization;   

    if(!authHeader) {
        throw new AppError("JWT Token não informado", 401)
    }

    // Bare, xxxxxxx
    const [, token] = authHeader.split(" ");

    try {
        // verify() returns 'sub' that contains the stored content.
        const { sub: user_id } = verify(token, authConfig.jwt.secret);

        // creating a new property ('user') in our request.
        request.user = {
            id: Number(user_id)
        };

        return next();

    } catch {
        throw new AppError("JWT Token inválido", 401);
    }    
}


module.exports = ensureAuthenticated;