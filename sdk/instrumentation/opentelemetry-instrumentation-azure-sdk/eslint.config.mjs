// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  {
    rules: {
      "@azure/azure-sdk/ts-package-json-engine-is-present": [
        "error",
        { nodeVersionOverride: ">=22.15.0" },
      ],
    },
  },
  {
    // These fixtures deliberately exercise native CommonJS module loading.
    files: ["test/consumer/*.cjs"],
    rules: { "@typescript-eslint/no-require-imports": "off" },
  },
]);
