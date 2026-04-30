// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PlaywrightServiceInitConfig } from "../types.js";
import { PlaywrightServiceInitialize } from "../initialize.js";
import {
  getLanguageAndConfigInfoFromConfigurationFile,
  getLanguageAndConfigInfoFromDirectory,
  parseCLIArguments,
} from "../utils.js";
import { writeStdout } from "../stdio.js";

export const init = async (): Promise<void> => {
  const options = parseCLIArguments();
  const { config: playwrightConfigFile } = options;
  let playwrightServiceInitConfig: PlaywrightServiceInitConfig;

  if (playwrightConfigFile) {
    playwrightServiceInitConfig = {
      ...getLanguageAndConfigInfoFromConfigurationFile(playwrightConfigFile),
    };
  } else {
    playwrightServiceInitConfig = {
      ...getLanguageAndConfigInfoFromDirectory(),
    };
  }

  writeStdout("");
  const playwrightServiceInitialize = new PlaywrightServiceInitialize(playwrightServiceInitConfig);
  await playwrightServiceInitialize.addServiceSupportToTestSuite();
};
