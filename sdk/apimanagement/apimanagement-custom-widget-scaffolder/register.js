// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

require("dotenv").config();
require("ts-node").register({
  skipProject: true,
  transpileOnly: true,
  compilerOptions: {
    ...require("../../../tsconfig.json").compilerOptions,
    target: "es2019",
    module: "commonjs",
    allowJs: true,
    esModuleInterop: true,
  },
});
