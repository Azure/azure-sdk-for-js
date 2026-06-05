// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Worker thread bootstrap: registers tsx so TypeScript source files can be
// imported directly, then loads the actual worker entry point.
import { register } from "tsx/esm/api";
register();

await import("./src/workerEntry.ts");
