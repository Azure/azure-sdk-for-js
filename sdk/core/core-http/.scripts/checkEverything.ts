import { checkEverything } from "@ts-common/azure-js-dev-tools";
import { checkConstantsVersion } from "./checkConstantsVersion";

checkEverything({
  additionalChecks: {
    name: "Constants.ts Version",
    check: checkConstantsVersion
  }
});
