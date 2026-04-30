// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { HealthbotClient } from "./healthbotClient.js";
export { type SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
export { restorePoller, type RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  type OperationDetail,
  type OperationDisplay,
  type ErrorModel,
  type ErrorError,
  type ErrorAdditionalInfo,
  type HealthBot,
  type HealthBotProperties,
  type KeyVaultProperties,
  type Sku,
  type SkuName,
  type Identity,
  type ResourceIdentityType,
  type UserAssignedIdentity,
  type TrackedResource,
  type Resource,
  type SystemData,
  KnownCreatedByType,
  type CreatedByType,
  type HealthBotUpdateParameters,
  type HealthBotKeysResponse,
  type HealthBotKey,
  KnownVersions,
} from "./models/index.js";
export { type HealthbotClientOptionalParams } from "./api/index.js";
export {
  type BotsRegenerateApiJwtSecretOptionalParams,
  type BotsListSecretsOptionalParams,
  type BotsListOptionalParams,
  type BotsListByResourceGroupOptionalParams,
  type BotsDeleteOptionalParams,
  type BotsUpdateOptionalParams,
  type BotsCreateOptionalParams,
  type BotsGetOptionalParams,
} from "./api/bots/index.js";
export { type OperationsListOptionalParams } from "./api/operations/index.js";
export { type BotsOperations, type OperationsOperations } from "./classic/index.js";
export { type PageSettings, type ContinuablePage, type PagedAsyncIterableIterator };
export { AzureClouds, type AzureSupportedClouds };
