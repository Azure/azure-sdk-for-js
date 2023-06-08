// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as fs from "fs";
import * as fsextra from "fs-extra";

await fsextra.move("TempTypeSpecFiles/OpenAI.Inference/generated/typespec-ts/src", "sources/generated", { overwrite: true});
fs.rmSync("TempTypeSpecFiles/OpenAI.Inference/generated", { recursive: true, force: true });