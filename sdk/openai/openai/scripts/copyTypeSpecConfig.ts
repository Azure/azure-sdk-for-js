// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as fs from "fs";

const dest = "TempTypeSpecFiles/OpenAI.Inference";
fs.copyFileSync("customts/package.json", `${dest}/package.json`);
fs.copyFileSync("customts/tspconfig.yaml", `${dest}/tspconfig.yaml`);
