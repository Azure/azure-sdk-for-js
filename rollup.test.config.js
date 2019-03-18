// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as base from "./rollup.base.config";

// Node tests are run via ts-node
export default [base.browserConfig(true)];
