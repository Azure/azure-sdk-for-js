// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { leafCommand, makeCommandInfo } from "../../framework/command";

import concurrently from "concurrently";
import { createPrinter } from "../../util/printer";
import { isModuleProject } from "../../util/resolveProject";
import { runTestsWithProxyTool } from "../../util/testUtils";

export const commandInfo = makeCommandInfo(
  "test:node-js-input",
  "runs the node tests using mocha with the default and the provided options; starts the proxy-tool in record and playback modes",
  {
    "no-test-proxy": {
      shortName: "ntp",
      kind: "boolean",
      default: false,
      description: "whether to run with test-proxy",
    },
    "use-esm-workaround": {
      shortName: "esm",
      kind: "boolean",
      default: true,
      description:
        "when true, uses the `esm` npm package for tests. Otherwise uses esm4mocha if needed",
    },
  },
);

export default leafCommand(commandInfo, async (options) => {
  const isModule = await isModuleProject();
  let esmLoaderArgs = "";

  if (isModule === false) {
    if (options["use-esm-workaround"] === false) {
      esmLoaderArgs = "--loader=../../../common/tools/esm4mocha.mjs";
    } else {
      esmLoaderArgs = "-r ../../../common/tools/esm-workaround -r esm";
    }
  }

  const reporterArgs =
    "--reporter ../../../common/tools/mocha-multi-reporter.js --reporter-option output=test-results.xml";
  const defaultMochaArgs = `${esmLoaderArgs} -r source-map-support/register.js ${reporterArgs} --full-trace`;
  const updatedArgs = options["--"]?.map((opt) =>
    opt.includes("**") && !opt.startsWith("'") && !opt.startsWith('"') ? `"${opt}"` : opt,
  );
  const mochaArgs = updatedArgs?.length
    ? updatedArgs.join(" ")
    : '--timeout 5000000 "dist-esm/test/{,!(browser)/**/}/*.spec.js"';
  const command = {
    command: `c8 mocha ${defaultMochaArgs} ${mochaArgs}`,
    name: "node-tests",
  };

  if (!options["no-test-proxy"]) {
    return runTestsWithProxyTool(command);
  }

  createPrinter("test-info").info("Running tests without test-proxy");
  await concurrently([command]).result;
  return true;
});
