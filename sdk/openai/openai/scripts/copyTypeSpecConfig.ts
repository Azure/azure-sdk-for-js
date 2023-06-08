// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as fs from "fs";

const dest = "TempTypeSpecFiles/OpenAI.Inference";
fs.copyFileSync("typespec/package.json", `${dest}/package.json`);
fs.copyFileSync("typespec/tspconfig.yaml", `${dest}/tspconfig.yaml`);
