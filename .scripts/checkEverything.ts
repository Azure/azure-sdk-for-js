import { checkEverything } from "@ts-common/azure-js-dev-tools";
import { checkConstantsVersion } from "./checkConstantsVersion";

checkEverything({
  checkForSkipCallsOptions: {
    skipIsWarning: true
  },
  additionalChecks: {
    name: "Constants.ts Version",
    check: checkConstantsVersion
  }
});