// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import eslint from "@eslint/js";

export default [
  {
    files: ["./index.js"],
    rules: eslint.configs.recommended.rules,
  },
];
