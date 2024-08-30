// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createPerfProgram } from "@azure-tools/test-perf";
import { GetConfigurationSettingTest } from "./getConfigurationSetting.spec";

const perfProgram = createPerfProgram(GetConfigurationSettingTest);

perfProgram.run();
