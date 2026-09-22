// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  createDatabaseWatcher,
  type DatabaseWatcherContext,
  type DatabaseWatcherClientOptionalParams,
} from "./databaseWatcherContext.js";
export {
  type SharedPrivateLinkResourcesListByWatcherOptionalParams,
  type SharedPrivateLinkResourcesDeleteOptionalParams,
  type SharedPrivateLinkResourcesCreateOptionalParams,
  type SharedPrivateLinkResourcesGetOptionalParams,
  type TargetsListByWatcherOptionalParams,
  type TargetsDeleteOptionalParams,
  type TargetsCreateOrUpdateOptionalParams,
  type TargetsGetOptionalParams,
  type HealthValidationsStartValidationOptionalParams,
  type HealthValidationsListByParentOptionalParams,
  type HealthValidationsGetOptionalParams,
  type AlertRuleResourcesListByParentOptionalParams,
  type AlertRuleResourcesDeleteOptionalParams,
  type AlertRuleResourcesCreateOrUpdateOptionalParams,
  type AlertRuleResourcesGetOptionalParams,
  type WatchersStopOptionalParams,
  type WatchersStartOptionalParams,
  type WatchersListBySubscriptionOptionalParams,
  type WatchersListByResourceGroupOptionalParams,
  type WatchersDeleteOptionalParams,
  type WatchersUpdateOptionalParams,
  type WatchersCreateOrUpdateOptionalParams,
  type WatchersGetOptionalParams,
  type OperationsListOptionalParams,
} from "./options.js";
export {
  alertRuleResourcesListByParent,
  alertRuleResourcesDelete,
  alertRuleResourcesCreateOrUpdate,
  alertRuleResourcesGet,
} from "./alertRuleResources/index.js";
export {
  healthValidationsStartValidation,
  healthValidationsListByParent,
  healthValidationsGet,
} from "./healthValidations/index.js";
export { operationsList } from "./operations/index.js";
export {
  sharedPrivateLinkResourcesListByWatcher,
  sharedPrivateLinkResourcesDelete,
  sharedPrivateLinkResourcesCreate,
  sharedPrivateLinkResourcesGet,
} from "./sharedPrivateLinkResources/index.js";
export {
  targetsListByWatcher,
  targetsDelete,
  targetsCreateOrUpdate,
  targetsGet,
} from "./targets/index.js";
export {
  watchersStop,
  watchersStart,
  watchersListBySubscription,
  watchersListByResourceGroup,
  watchersDelete,
  watchersUpdate,
  watchersCreateOrUpdate,
  watchersGet,
} from "./watchers/index.js";
