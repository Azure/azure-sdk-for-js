// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as fs from "fs";
import * as path from "path";
import * as url from "url";

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const destinationPath = path.join(__dirname, "../dist/");

const inputFile = path.join(destinationPath, "index.js");
const inputMapFile = path.join(destinationPath, "index.js.map");

if (fs.existsSync(inputFile) && fs.existsSync(inputMapFile)) {
  fs.renameSync(inputFile, path.join(destinationPath, "index.cjs"));
  fs.renameSync(inputMapFile, path.join(destinationPath, "index.cjs.map"));
}