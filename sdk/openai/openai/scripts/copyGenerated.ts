// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as fs from "fs";
import * as fsextra from "fs-extra";

await fsextra.move("typespec/generated/typespec-ts/src", "sources/generated", { overwrite: true});
fs.rmSync("typespec/generated", { recursive: true, force: true });