const path = require("path");
const app = require("../app");
const db = require("../model/db");
const {
  publicDir,
  uploadDir,
  avatarsOfUsers,
} = require("../helpers/constants");
const createFolderIsExist = require("../helpers/create-dir");

const PORT = process.env.PORT || 3000;

db.then(() => {
  app.listen(PORT, async () => {
    await createFolderIsExist(uploadDir);
    await createFolderIsExist(publicDir);
    await createFolderIsExist(path.join(publicDir, avatarsOfUsers));

    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch((e) => {
  console.log(`Server not running. Error message: ${e.message}`);
  process.exit(1);
});
