// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { HealthbotClient } from "./healthbotClient.js";
export type { SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  OperationDetail,
  OperationDisplay,
  ErrorModel,
  ErrorError,
  ErrorAdditionalInfo,
  HealthBot,
  HealthBotProperties,
  KeyVaultProperties,
  Sku,
  SkuName,
  Identity,
  ResourceIdentityType,
  UserAssignedIdentity,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  HealthBotUpdateParameters,
  HealthBotKeysResponse,
  HealthBotKey,
} from "./models/index.js";
export { KnownCreatedByType, KnownVersions } from "./models/index.js";
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
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
