// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { makeConfig } from "@azure/dev-tool/shared-config/rollup";

export default makeConfig(require("./package.json"), {
  // Disable this until we are ready to run rollup for the browser.
  disableBrowserBundle: true,
});
