// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  createDatabaseWatcher,
  DatabaseWatcherContext,
  DatabaseWatcherClientOptionalParams,
} from "./databaseWatcherContext.js";
export {
  SharedPrivateLinkResourcesListByWatcherOptionalParams,
  SharedPrivateLinkResourcesDeleteOptionalParams,
  SharedPrivateLinkResourcesCreateOptionalParams,
  SharedPrivateLinkResourcesGetOptionalParams,
  TargetsListByWatcherOptionalParams,
  TargetsDeleteOptionalParams,
  TargetsCreateOrUpdateOptionalParams,
  TargetsGetOptionalParams,
  HealthValidationsStartValidationOptionalParams,
  HealthValidationsListByParentOptionalParams,
  HealthValidationsGetOptionalParams,
  AlertRuleResourcesListByParentOptionalParams,
  AlertRuleResourcesDeleteOptionalParams,
  AlertRuleResourcesCreateOrUpdateOptionalParams,
  AlertRuleResourcesGetOptionalParams,
  WatchersStopOptionalParams,
  WatchersStartOptionalParams,
  WatchersListBySubscriptionOptionalParams,
  WatchersListByResourceGroupOptionalParams,
  WatchersDeleteOptionalParams,
  WatchersUpdateOptionalParams,
  WatchersCreateOrUpdateOptionalParams,
  WatchersGetOptionalParams,
  OperationsListOptionalParams,
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
