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
  DnssecConfig,
  DnssecProperties,
  SigningKey,
  DelegationSignerInfo,
  ProxyResource,
  Resource,
  SystemData,
  KnownCreatedByType,
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
  KnownVersions,
} from "./models/index.js";
export { NetworkClientOptionalParams } from "./api/index.js";
export { DnsResourceReferenceGetByTargetResourcesOptionalParams } from "./api/dnsResourceReference/index.js";
export {
  DnssecConfigsListByDnsZoneOptionalParams,
  DnssecConfigsDeleteOptionalParams,
  DnssecConfigsCreateOrUpdateOptionalParams,
  DnssecConfigsGetOptionalParams,
} from "./api/dnssecConfigs/index.js";
export {
  RecordSetsListAllByDnsZoneOptionalParams,
  RecordSetsListByDnsZoneOptionalParams,
  RecordSetsListByTypeOptionalParams,
  RecordSetsDeleteOptionalParams,
  RecordSetsUpdateOptionalParams,
  RecordSetsCreateOrUpdateOptionalParams,
  RecordSetsGetOptionalParams,
} from "./api/recordSets/index.js";
export {
  ZonesListOptionalParams,
  ZonesListByResourceGroupOptionalParams,
  ZonesDeleteOptionalParams,
  ZonesUpdateOptionalParams,
  ZonesCreateOrUpdateOptionalParams,
  ZonesGetOptionalParams,
} from "./api/zones/index.js";
export {
  DnsResourceReferenceOperations,
  DnssecConfigsOperations,
  RecordSetsOperations,
  ZonesOperations,
} from "./classic/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
