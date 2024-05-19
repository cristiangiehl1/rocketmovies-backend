/* 
    Install JWT lib 
    > npm install jsonwebtoken

    Configs jwt 
*/

module.exports = {
    jwt: {
        secret: process.env.AUTH_SECRET || "default",
        expiresIn: "1d"
    }
}