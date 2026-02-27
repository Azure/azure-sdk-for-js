// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { HealthbotClient } from "./healthbotClient.js";
export type { SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
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
export type { HealthbotClientOptionalParams } from "./api/index.js";
export type {
  BotsRegenerateApiJwtSecretOptionalParams,
  BotsListSecretsOptionalParams,
  BotsListOptionalParams,
  BotsListByResourceGroupOptionalParams,
  BotsDeleteOptionalParams,
  BotsUpdateOptionalParams,
  BotsCreateOptionalParams,
  BotsGetOptionalParams,
} from "./api/bots/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type { BotsOperations, OperationsOperations } from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds, type AzureSupportedClouds };
