// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import DeidentificationClient from "./deidentificationClient.js";

export * from "./deidentificationClient.js";
export * from "./parameters.js";
export * from "./responses.js";
export * from "./clientDefinitions.js";
export * from "./isUnexpected.js";
export * from "./models.js";
export * from "./outputModels.js";
export * from "./paginateHelper.js";
export * from "./pollingHelper.js";
export { RestError, isRestError } from "@azure/core-rest-pipeline";

export default DeidentificationClient;
