#!/usr/bin/env node
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Registers tsx as an ESM module hook so TypeScript source files can be
// imported directly without a prior compilation step.
import { register } from "tsx/esm/api";
register();

await import("./src/cli.ts");
