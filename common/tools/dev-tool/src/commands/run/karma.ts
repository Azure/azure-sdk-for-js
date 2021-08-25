// Copyright (c) Microsoft Corporation
// Licensed under the MIT license.

import { makeConfig } from "../../config/karma.config";
import { leafCommand, makeCommandInfo } from "../../framework/command";

import { runner, Server, config as karmaConfig } from "karma";
import { createPrinter } from "../../util/printer";

const log = createPrinter("karma-runner");

export const commandInfo = makeCommandInfo(
  "karma",
  "run browser tests using the default configuration",
  {
    production: {
      kind: "boolean",
      description: "use a production browser stack",
      default: false
    }
  }
);

export default leafCommand(commandInfo, async ({ production }) => {
  // This seems unnecessarily complicated, but is the recommended method according
  // to Karma documentation: http://karma-runner.github.io/6.3/dev/public-api.html
  const config = await karmaConfig.parseConfig(
    null,
    makeConfig({
      browsers: production ? ["Chrome", "Firefox"] : ["ChromeHeadlessNoSandbox"]
    }),
    { promiseConfig: true, throwErrors: true }
  );

  config.set({
    logLevel: config.LOG_DEBUG
  });

  const exitCode = await new Promise<number>(async (resolve, reject) => {
    log.info("Running karma");
    const server = new Server(config, (exitCode) => {
      if (exitCode !== 0) {
        reject("Server exited with non-zero status");
      }
    });

    await server.start();

    runner.run(config, (exitCode) => {
      resolve(exitCode);
    });
  });

  return exitCode === 0;
});
