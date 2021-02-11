const fs = require("fs");

// work around TS not being able to find the typings when not importing from a package reference.
fs.copyFileSync("./dist/types/latest/index.d.ts", "./dist/index.d.ts");
