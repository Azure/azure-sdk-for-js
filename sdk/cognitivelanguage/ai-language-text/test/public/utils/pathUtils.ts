// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Get the current file's path
const __filename = fileURLToPath(import.meta.url);

// Get the current directory name
const __dirname = dirname(__filename);

export const pathName = join(
  __dirname.split("ai-language-text")[0],
  "ai-language-text",
  "test",
  "public",
  "utils",
);
