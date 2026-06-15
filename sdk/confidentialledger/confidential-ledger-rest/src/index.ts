// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

<<<<<<< /mnt/vss/_work/1/s/azure-sdk-for-js_tmp/azsdk-dev-toolqaGSaM/result/src/index.ts
import ConfidentialLedgerClient from "./confidentialLedgerClient.js";

export * from "./confidentialLedgerClient.js";
export * from "./parameters.js";
export * from "./responses.js";
export * from "./clientDefinitions.js";
export * from "./isUnexpected.js";
export * from "./models.js";
export * from "./outputModels.js";
export * from "./paginateHelper.js";
export { RestError, isRestError } from "@azure/core-rest-pipeline";

export default ConfidentialLedgerClient;
||||||| /mnt/vss/_work/1/s/azure-sdk-for-js_tmp/azsdk-dev-toolqaGSaM/base/sdk/confidentialledger/confidential-ledger-rest/generated/index.ts
import ConfidentialLedger from "./confidentialLedger";

export * from "./confidentialLedger";
export * from "./parameters";
export * from "./responses";
export * from "./clientDefinitions";
export * from "./isUnexpected";
export * from "./models";
export * from "./outputModels";
export * from "./paginateHelper";

export default ConfidentialLedger;
=======
import ConfidentialLedger from "./confidentialLedgerCustomized.js";
export * from "./confidentialLedger.js";
export type * from "./models.js";
export type * from "./parameters.js";
export type * from "./responses.js";
export type * from "./clientDefinitions.js";
export * from "./isUnexpected.js";
export type * from "./outputModels.js";
export * from "./paginateHelper.js";
export { type LedgerIdentity, getLedgerIdentity } from "./getLedgerIdentity.js";
export default ConfidentialLedger;
>>>>>>> /mnt/vss/_work/1/s/azure-sdk-for-js_tmp/azsdk-dev-toolqaGSaM/custom/sdk/confidentialledger/confidential-ledger-rest/src/index.ts
