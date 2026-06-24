# Release History

## 6.0.0-beta.2 (2026-06-24)
Compared with version 5.1.0

### Features Added
  - Added operation group DnssecConfigsOperations
  - Added operation ZonesOperations.delete
  - Added Interface DelegationSignerInfo
  - Added Interface Digest
  - Added Interface DnsResourceReferenceRequestProperties
  - Added Interface DnsResourceReferenceResultProperties
  - Added Interface DnssecConfig
  - Added Interface DnssecConfigsCreateOrUpdateOptionalParams
  - Added Interface DnssecConfigsDeleteOptionalParams
  - Added Interface DnssecConfigsGetOptionalParams
  - Added Interface DnssecConfigsListByDnsZoneOptionalParams
  - Added Interface DnssecProperties
  - Added Interface DsRecord
  - Added Interface NaptrRecord
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface ProxyResource
  - Added Interface RecordSetProperties
  - Added Interface RestorePollerOptions
  - Added Interface SigningKey
  - Added Interface SimplePollerLike
  - Added Interface SystemData
  - Added Interface TlsaRecord
  - Added Interface TrackedResource
  - Added Interface ZoneProperties
  - Interface RecordSet has a new optional parameter dsRecords
  - Interface RecordSet has a new optional parameter naptrRecords
  - Interface RecordSet has a new optional parameter tlsaRecords
  - Interface RecordSet has a new optional parameter trafficManagementProfile
  - Interface RecordSet has a new optional parameter systemData
  - Interface Resource has a new optional parameter systemData
  - Interface Zone has a new optional parameter signingKeys
  - Interface Zone has a new optional parameter systemData
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias CreatedByType
  - Added Enum AzureClouds
  - Added Enum KnownCreatedByType
  - Added Enum KnownVersions

### Breaking Changes
  - Operation RecordSets.createOrUpdate has a new signature
  - Operation RecordSets.delete has a new signature
  - Operation RecordSets.get has a new signature
  - Operation RecordSets.listByType has a new signature
  - Operation RecordSets.update has a new signature
  - Class DnsManagementClient no longer has parameter apiVersion
  - Class DnsManagementClient no longer has parameter dnsResourceReferenceOperations
  - Class DnsManagementClient no longer has parameter subscriptionId
  - Removed Interface RecordSetUpdateParameters
  - Interface Resource no longer has parameter location
  - Interface Resource no longer has parameter tags
  - Type alias "RecordType" has been changed

