const fs = require("fs");
const version = require("./package.json").version;
const fileName = "./dist-esm/src/common/constants.js";
let contents = fs.readFileSync(fileName, "utf8");
contents = contents.replace("REPLACE_SDK_VERSION", version);
fs.writeFileSync(fileName, contents);
