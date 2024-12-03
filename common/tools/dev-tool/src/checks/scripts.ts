import { scriptCheck, workingTreeUnchangedCheck } from "../framework/check";

export const format = scriptCheck({
  description: "Run format command",
  checkCommand: "rushx check-format",
  fixCommand: "rushx format",
});

export const lint = scriptCheck({
  description: "Run lint command",
  checkCommand: "rushx lint",
  fixCommand: "rushx lint:fix",
});

export const build = workingTreeUnchangedCheck({
  description: "Run build and check there were no changes",
  tags: ["local"],
  fixCommand: "rushx build",
});

export const unitTestNode = scriptCheck({
  description: "Run Node unit tests",
  tags: ["local"],
  checkCommand: "rushx unit-test:node",
});

export const unitTestBrowser = scriptCheck({
  description: "Run browser unit tests",
  tags: ["local"],
  checkCommand: "rushx unit-test:browser",
});
