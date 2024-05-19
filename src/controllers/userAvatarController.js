const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");


class userAvatarController {
    async update(request, response) {
        const user_id = request.user.id;
        const avatarFileName = request.file.filename;

        const diskStorage = new DiskStorage();

        const user = await knex("users")
            .where({ id: user_id })
            .first();

        if(!user) {
            throw new AppError("Somente usuários autenticados podem mudar o avatar.", 401);
        }

        // delete the old user avatar photo if exists.
        if(user.avatar) {
            await diskStorage.deleteFile(user.avatar)
        }

        // save the new avatar photo file using 'saveFile' function
        const filename = await diskStorage.saveFile(avatarFileName);
        user.avatar = filename;

        await knex("users")
            .update(user)
            .where({ id: user_id });

        return response.json(user);
    }
}


module.exports = userAvatarController;