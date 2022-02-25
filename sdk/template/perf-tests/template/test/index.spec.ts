// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfProgram, selectPerfTest } from "@azure/test-utils-perf";
import { GetConfigurationSettingTest } from "./getConfigurationSetting.spec";

console.log("=== Starting the perf test ===");

const perfProgram = new PerfProgram(selectPerfTest([GetConfigurationSettingTest]));

perfProgram.run();
