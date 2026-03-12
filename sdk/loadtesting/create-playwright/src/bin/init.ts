// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PlaywrightServiceInitConfig } from "../types.js";
import { PlaywrightServiceInitialize } from "../initialize.js";
import {
  getLanguageAndConfigInfoFromConfigurationFile,
  getLanguageAndConfigInfoFromDirectory,
  parseCLIArguments,
} from "../utils.js";

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

  console.log("");
  const playwrightServiceInitialize = new PlaywrightServiceInitialize(playwrightServiceInitConfig);
  await playwrightServiceInitialize.addServiceSupportToTestSuite();
};
