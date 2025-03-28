// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { mergeConfig } from "vitest/config";
import vitestEsmConfig from "../../../vitest.esm.shared.config.ts";
import vitestConfig from "./vitest.config.ts";

export default mergeConfig(vitestConfig, vitestEsmConfig);
