// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const sourceDir = dirname(fileURLToPath(import.meta.url));
