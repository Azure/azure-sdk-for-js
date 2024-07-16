// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { program } from "commander";
import { CLIArguments, PlaywrightServiceInitConfig } from "../types";
import { PlaywrightServiceInitialize } from "../initialize";
import {
  getLanguageAndConfigInfoFromConfigurationFile,
  getLanguageAndConfigInfoFromDirectory,
} from "../utils";

program.option("-c, --config <config>").description("playwright configuration file");

program.parse();

const init = async (): Promise<void> => {
  const options = program.opts() as CLIArguments;
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

(async () => {
  program.parse();
  await init();
})();
