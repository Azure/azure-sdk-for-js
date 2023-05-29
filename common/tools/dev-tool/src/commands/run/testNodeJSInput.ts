// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { leafCommand, makeCommandInfo } from "../../framework/command";
import { resolveProject } from "../../util/resolveProject";
import { runTestsWithProxyTool } from "../../util/testUtils";

export const commandInfo = makeCommandInfo(
  "test:node-js-input",
  "runs the node tests using mocha with the default and the provided options; starts the proxy-tool in record and playback modes"
);

export default leafCommand(commandInfo, async (options) => {
  const projectInfo = await resolveProject(process.cwd());
  const defaultMochaArgs = `${
    projectInfo.packageJson.type === "module" ? "" : "-r esm "
  } --require source-map-support/register --reporter ../../../common/tools/mocha-multi-reporter.js --full-trace`;
  const updatedArgs = options["--"]?.map((opt) =>
    opt.includes("**") && !opt.startsWith("'") && !opt.startsWith('"') ? `"${opt}"` : opt
  );
  const mochaArgs = updatedArgs?.length
    ? updatedArgs?.join(" ")
    : '--timeout 5000000 "dist-esm/test/{,!(browser)/**/}/*.spec.js"';
  return runTestsWithProxyTool({
    command: `nyc mocha ${defaultMochaArgs} ${mochaArgs}`,
    name: "node-tests",
  });
});
