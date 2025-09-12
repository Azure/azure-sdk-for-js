import { scriptCheck, workingTreeUnchangedCheck } from "../framework/check";

export const format = scriptCheck({
  description: "Run format command",
  checkCommand: "pnpm check-format",
  fixCommand: "pnpm format",
});

export const lint = scriptCheck({
  description: "Run lint command",
  checkCommand: "pnpm lint",
  fixCommand: "pnpm lint:fix",
});

export const build = workingTreeUnchangedCheck({
  description: "Run build and check there were no changes",
  tags: ["local"],
  fixCommand: "pnpm build",
});

export const unitTestNode = scriptCheck({
  description: "Run Node unit tests",
  tags: ["local"],
  checkCommand: "pnpm test:node",
});

export const unitTestBrowser = scriptCheck({
  description: "Run browser unit tests",
  tags: ["local"],
  checkCommand: "pnpm test:browser",
});
