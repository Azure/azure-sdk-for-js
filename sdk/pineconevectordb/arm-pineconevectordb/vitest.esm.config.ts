
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { mergeConfig } from "vitest/config";
import vitestConfig from "./vitest.config.js";
import vitestEsmConfig from "../../../vitest.esm.shared.config.js";

export default mergeConfig(
  vitestConfig,
  vitestEsmConfig
);
