// lib
const fs = require("fs");
const path = require("path");

// imported variables
const uploadConfig = require("../configs/upload");


class DiskStorage {
    async saveFile(file) {
        // 'rename' is responsible for moving files between folders.
        await fs.promises.rename(
            path.resolve(uploadConfig.TMP_FOLDER, file),
            path.resolve(uploadConfig.UPLOADS_FOLDER, file)
        )

        return file;
    }

    async deleteFile(file) {
        const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);

        try {
            await fs.promises.stat(filePath);
        } catch {
            return;
        }
        // o método 'unlik' deleta o arquivo.
        await fs.promises.unlink(filePath);
    }
}

module.exports = DiskStorage;