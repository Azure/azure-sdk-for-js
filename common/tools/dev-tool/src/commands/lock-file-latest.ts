import { leafCommand, makeCommandInfo } from "../framework/command";
import { getLockFileFromMain } from "../util/git";
import { createPrinter } from "../util/printer";

createPrinter("get-lock-file")

export const commandInfo = makeCommandInfo(
  "lock-file-latest",
  `gets lock file from "main" branch at https://github.com/azure/azure-sdk-for-js`,
);

export default leafCommand(commandInfo, async () => {
  await getLockFileFromMain()
  return true;
});
