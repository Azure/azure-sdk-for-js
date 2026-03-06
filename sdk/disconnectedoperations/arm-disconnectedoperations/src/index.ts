// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { DisconnectedOperationsManagementClient } from "./disconnectedOperationsManagementClient.js";
export { restorePoller, type RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  type DisconnectedOperation,
  type DisconnectedOperationProperties,
  KnownResourceProvisioningState,
  type ResourceProvisioningState,
  KnownBillingModel,
  type BillingModel,
  KnownConnectionIntent,
  type ConnectionIntent,
  KnownConnectionStatus,
  type ConnectionStatus,
  KnownRegistrationStatus,
  type RegistrationStatus,
  type TrackedResource,
  type Resource,
  type SystemData,
  KnownCreatedByType,
  type CreatedByType,
  type ErrorResponse,
  type ErrorDetail,
  type ErrorAdditionalInfo,
  type DisconnectedOperationCreateOrUpdate,
  type DisconnectedOperationPropertiesCreateOrUpdate,
  type DisconnectedOperationUpdate,
  type DisconnectedOperationUpdateProperties,
  type DisconnectedOperationDeploymentManifest,
  type Image,
  type ImageProperties,
  KnownReleaseType,
  type ReleaseType,
  type ProxyResource,
  type ImageDownloadResult,
  type Artifact,
  type ArtifactProperties,
  type ArtifactDownloadResult,
  KnownVersions,
} from "./models/index.js";
export { type DisconnectedOperationsManagementClientOptionalParams } from "./api/index.js";
export {
  type ArtifactsListDownloadUriOptionalParams,
  type ArtifactsGetOptionalParams,
  type ArtifactsListByParentOptionalParams,
} from "./api/artifacts/index.js";
export {
  type DisconnectedOperationsListDeploymentManifestOptionalParams,
  type DisconnectedOperationsListBySubscriptionOptionalParams,
  type DisconnectedOperationsListByResourceGroupOptionalParams,
  type DisconnectedOperationsDeleteOptionalParams,
  type DisconnectedOperationsUpdateOptionalParams,
  type DisconnectedOperationsCreateOrUpdateOptionalParams,
  type DisconnectedOperationsGetOptionalParams,
} from "./api/disconnectedOperations/index.js";
export {
  type ImagesListDownloadUriOptionalParams,
  type ImagesGetOptionalParams,
  type ImagesListByDisconnectedOperationOptionalParams,
} from "./api/images/index.js";
export {
  type ArtifactsOperations,
  type DisconnectedOperationsOperations,
  type ImagesOperations,
} from "./classic/index.js";
export { type PageSettings, type ContinuablePage, type PagedAsyncIterableIterator };
export { AzureClouds, type AzureSupportedClouds };
