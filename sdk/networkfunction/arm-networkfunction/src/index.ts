// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { AzureTrafficCollectorClient } from "./azureTrafficCollectorClient.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  AzureTrafficCollector,
  AzureTrafficCollectorPropertiesFormat,
  ResourceReference,
  ProvisioningState,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  CloudError,
  CloudErrorBody,
  TagsObject,
  CollectorPolicy,
  CollectorPolicyPropertiesFormat,
  IngestionPolicyPropertiesFormat,
  IngestionType,
  IngestionSourcesPropertiesFormat,
  SourceType,
  EmissionPoliciesPropertiesFormat,
  EmissionType,
  EmissionPolicyDestination,
  DestinationType,
  Operation,
  OperationDisplay,
} from "./models/index.js";
export {
  KnownProvisioningState,
  KnownCreatedByType,
  KnownIngestionType,
  KnownSourceType,
  KnownEmissionType,
  KnownDestinationType,
  KnownVersions,
} from "./models/index.js";
export type { AzureTrafficCollectorClientOptionalParams } from "./api/index.js";
export type {
  AzureTrafficCollectorsDeleteOptionalParams,
  AzureTrafficCollectorsUpdateTagsOptionalParams,
  AzureTrafficCollectorsCreateOrUpdateOptionalParams,
  AzureTrafficCollectorsGetOptionalParams,
} from "./api/azureTrafficCollectors/index.js";
export type { AzureTrafficCollectorsByResourceGroupListOptionalParams } from "./api/azureTrafficCollectorsByResourceGroup/index.js";
export type { AzureTrafficCollectorsBySubscriptionListOptionalParams } from "./api/azureTrafficCollectorsBySubscription/index.js";
export type {
  CollectorPoliciesListOptionalParams,
  CollectorPoliciesDeleteOptionalParams,
  CollectorPoliciesUpdateTagsOptionalParams,
  CollectorPoliciesCreateOrUpdateOptionalParams,
  CollectorPoliciesGetOptionalParams,
} from "./api/collectorPolicies/index.js";
export type { NetworkFunctionListOperationsOptionalParams } from "./api/networkFunction/index.js";
export type {
  AzureTrafficCollectorsOperations,
  AzureTrafficCollectorsByResourceGroupOperations,
  AzureTrafficCollectorsBySubscriptionOperations,
  CollectorPoliciesOperations,
  NetworkFunctionOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
