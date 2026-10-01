// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { DnsManagementClient } from "./dnsManagementClient.js";
export type { SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  DnssecConfig,
  DnssecProperties,
  SigningKey,
  DelegationSignerInfo,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  CloudError,
  CloudErrorBody,
  RecordSet,
  RecordSetProperties,
  SubResource,
  ARecord,
  AaaaRecord,
  MxRecord,
  NsRecord,
  PtrRecord,
  SrvRecord,
  TxtRecord,
  CnameRecord,
  SoaRecord,
  CaaRecord,
  DsRecord,
  Digest,
  TlsaRecord,
  NaptrRecord,
  Zone,
  ZoneProperties,
  ZoneType,
  TrackedResource,
  ZoneUpdate,
  DnsResourceReferenceRequest,
  DnsResourceReferenceRequestProperties,
  DnsResourceReferenceResult,
  DnsResourceReferenceResultProperties,
  DnsResourceReference,
  RecordType,
} from "./models/index.js";
export { KnownCreatedByType, KnownVersions } from "./models/index.js";
export type { DnsManagementClientOptionalParams } from "./api/index.js";
export type { DnsResourceReferenceGetByTargetResourcesOptionalParams } from "./api/dnsResourceReference/index.js";
export type {
  DnssecConfigsListByDnsZoneOptionalParams,
  DnssecConfigsDeleteOptionalParams,
  DnssecConfigsCreateOrUpdateOptionalParams,
  DnssecConfigsGetOptionalParams,
} from "./api/dnssecConfigs/index.js";
export type {
  RecordSetsListAllByDnsZoneOptionalParams,
  RecordSetsListByDnsZoneOptionalParams,
  RecordSetsListByTypeOptionalParams,
  RecordSetsDeleteOptionalParams,
  RecordSetsUpdateOptionalParams,
  RecordSetsCreateOrUpdateOptionalParams,
  RecordSetsGetOptionalParams,
} from "./api/recordSets/index.js";
export type {
  ZonesListOptionalParams,
  ZonesListByResourceGroupOptionalParams,
  ZonesDeleteOptionalParams,
  ZonesUpdateOptionalParams,
  ZonesCreateOrUpdateOptionalParams,
  ZonesGetOptionalParams,
} from "./api/zones/index.js";
export type {
  DnsResourceReferenceOperations,
  DnssecConfigsOperations,
  RecordSetsOperations,
  ZonesOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
