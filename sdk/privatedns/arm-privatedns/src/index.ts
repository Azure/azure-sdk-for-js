// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { PrivateDnsManagementClient } from "./privateDnsManagementClient.js";
export type { SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  RecordSet,
  RecordSetProperties,
  ARecord,
  AaaaRecord,
  CnameRecord,
  MxRecord,
  PtrRecord,
  SoaRecord,
  SrvRecord,
  TxtRecord,
  SubResource,
  ProvisioningState,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  CloudError,
  CloudErrorBody,
  PrivateZone,
  PrivateZoneProperties,
  VirtualNetworkLink,
  VirtualNetworkLinkProperties,
  ResolutionPolicy,
  VirtualNetworkLinkState,
  PrivateDnsResourceReferenceRequest,
  PrivateDnsResourceReferenceRequestProperties,
  PrivateDnsResourceReferenceResult,
  PrivateDnsResourceReferenceResultProperties,
  PrivateDnsResourceReference,
  RecordType,
} from "./models/index.js";
export {
  KnownProvisioningState,
  KnownCreatedByType,
  KnownResolutionPolicy,
  KnownVirtualNetworkLinkState,
  KnownVersions,
} from "./models/index.js";
export type { PrivateDnsManagementClientOptionalParams } from "./api/index.js";
export type { PrivateDnsResourceReferenceGetByTargetResourcesOptionalParams } from "./api/privateDnsResourceReference/index.js";
export type {
  PrivateZonesListOptionalParams,
  PrivateZonesListByResourceGroupOptionalParams,
  PrivateZonesDeleteOptionalParams,
  PrivateZonesUpdateOptionalParams,
  PrivateZonesCreateOrUpdateOptionalParams,
  PrivateZonesGetOptionalParams,
} from "./api/privateZones/index.js";
export type {
  RecordSetsListOptionalParams,
  RecordSetsListByTypeOptionalParams,
  RecordSetsDeleteOptionalParams,
  RecordSetsUpdateOptionalParams,
  RecordSetsCreateOrUpdateOptionalParams,
  RecordSetsGetOptionalParams,
} from "./api/recordSets/index.js";
export type {
  VirtualNetworkLinksListOptionalParams,
  VirtualNetworkLinksDeleteOptionalParams,
  VirtualNetworkLinksUpdateOptionalParams,
  VirtualNetworkLinksCreateOrUpdateOptionalParams,
  VirtualNetworkLinksGetOptionalParams,
} from "./api/virtualNetworkLinks/index.js";
export type {
  PrivateDnsResourceReferenceOperations,
  PrivateZonesOperations,
  RecordSetsOperations,
  VirtualNetworkLinksOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
