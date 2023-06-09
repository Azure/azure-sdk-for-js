// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as fs from "fs";

fs.copyFileSync("typespec/package.json", "TempTypeSpecFiles/OpenAI.Inference/package.json");
