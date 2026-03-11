#!/usr/bin/env node
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { register } from "tsx/esm/api";
register();

await import("./src/cli.ts");
