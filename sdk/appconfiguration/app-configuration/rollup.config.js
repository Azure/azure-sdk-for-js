// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { makeConfig } from "@azure/dev-tool/shared-config/rollup";

export default makeConfig(require("./package.json"), {
  disableBrowserBundle: true,
});
