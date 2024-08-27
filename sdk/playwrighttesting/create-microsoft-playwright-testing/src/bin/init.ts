// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PlaywrightServiceInitConfig } from "../types";
import { PlaywrightServiceInitialize } from "../initialize";
import {
  getLanguageAndConfigInfoFromConfigurationFile,
  getLanguageAndConfigInfoFromDirectory,
  parseCLIArguments,
} from "../utils";

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
