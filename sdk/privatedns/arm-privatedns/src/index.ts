// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { NetworkClient } from "./networkClient.js";
export { restorePoller, RestorePollerOptions } from "./restorePollerHelpers.js";
export {
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
  ProxyResource,
  Resource,
  SystemData,
  KnownCreatedByType,
  CreatedByType,
  CloudError,
  CloudErrorBody,
  PrivateZone,
  PrivateZoneProperties,
  KnownProvisioningState,
  ProvisioningState,
  VirtualNetworkLink,
  VirtualNetworkLinkProperties,
  SubResource,
  KnownResolutionPolicy,
  ResolutionPolicy,
  KnownVirtualNetworkLinkState,
  VirtualNetworkLinkState,
  RecordType,
  KnownVersions,
} from "./models/index.js";
export { NetworkClientOptionalParams } from "./api/index.js";
export {
  PrivateZonesListOptionalParams,
  PrivateZonesListByResourceGroupOptionalParams,
  PrivateZonesDeleteOptionalParams,
  PrivateZonesUpdateOptionalParams,
  PrivateZonesCreateOrUpdateOptionalParams,
  PrivateZonesGetOptionalParams,
} from "./api/privateZones/index.js";
export {
  RecordSetsListOptionalParams,
  RecordSetsListByTypeOptionalParams,
  RecordSetsDeleteOptionalParams,
  RecordSetsUpdateOptionalParams,
  RecordSetsCreateOrUpdateOptionalParams,
  RecordSetsGetOptionalParams,
} from "./api/recordSets/index.js";
export {
  VirtualNetworkLinksListOptionalParams,
  VirtualNetworkLinksDeleteOptionalParams,
  VirtualNetworkLinksUpdateOptionalParams,
  VirtualNetworkLinksCreateOrUpdateOptionalParams,
  VirtualNetworkLinksGetOptionalParams,
} from "./api/virtualNetworkLinks/index.js";
export {
  PrivateZonesOperations,
  RecordSetsOperations,
  VirtualNetworkLinksOperations,
} from "./classic/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
