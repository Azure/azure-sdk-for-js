// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createPerfProgram } from "@azure/test-utils-perf";
import { GetConfigurationSettingTest } from "./getConfigurationSetting.spec";

const perfProgram = createPerfProgram(GetConfigurationSettingTest);

perfProgram.run();
