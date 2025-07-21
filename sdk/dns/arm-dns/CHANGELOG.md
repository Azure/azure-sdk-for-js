# Release History

## 6.0.0-beta.1 (2025-07-21)
Compared with version 5.1.0

### Features Added
  - Added operation group DnsResourceReferenceOperations
  - Added operation group DnssecConfigsOperations
  - Added operation ZonesOperations.delete
  - Added Class NetworkClient
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
  - Added Interface NetworkClientOptionalParams
  - Added Interface PageSettings
  - Added Interface ProxyResource
  - Added Interface RecordSetProperties
  - Added Interface SigningKey
  - Added Interface SystemData
  - Added Interface TlsaRecord
  - Added Interface TrackedResource
  - Added Interface ZoneProperties
  - Interface DnsResourceReferenceRequest has a new optional parameter properties
  - Interface DnsResourceReferenceResult has a new optional parameter properties
  - Interface RecordSet has a new optional parameter properties
  - Interface RecordSet has a new optional parameter systemData
  - Interface Resource has a new optional parameter systemData
  - Interface Zone has a new optional parameter properties
  - Interface Zone has a new optional parameter systemData
  - Added Type Alias CreatedByType
  - Added Enum KnownCreatedByType
  - Added Enum KnownVersions

### Breaking Changes
  - Removed operation Zones.beginDelete
  - Removed operation Zones.beginDeleteAndWait
  - Operation RecordSets.createOrUpdate has a new signature
  - Operation RecordSets.delete has a new signature
  - Operation RecordSets.get has a new signature
  - Operation RecordSets.listByType has a new signature
  - Operation RecordSets.update has a new signature
  - Deleted Class DnsManagementClient
  - Removed Interface DnsManagementClientOptionalParams
  - Removed Interface DnsResourceReferenceOperationsOperations
  - Removed Interface RecordSetListResult
  - Removed Interface RecordSetUpdateParameters
  - Removed Interface ZoneListResult
  - Interface DnsResourceReferenceRequest no longer has parameter targetResources
  - Interface DnsResourceReferenceResult no longer has parameter dnsResourceReferences
  - Interface RecordSet no longer has parameter aaaaRecords
  - Interface RecordSet no longer has parameter aRecords
  - Interface RecordSet no longer has parameter caaRecords
  - Interface RecordSet no longer has parameter cnameRecord
  - Interface RecordSet no longer has parameter fqdn
  - Interface RecordSet no longer has parameter metadata
  - Interface RecordSet no longer has parameter mxRecords
  - Interface RecordSet no longer has parameter nsRecords
  - Interface RecordSet no longer has parameter provisioningState
  - Interface RecordSet no longer has parameter ptrRecords
  - Interface RecordSet no longer has parameter soaRecord
  - Interface RecordSet no longer has parameter srvRecords
  - Interface RecordSet no longer has parameter targetResource
  - Interface RecordSet no longer has parameter ttl
  - Interface RecordSet no longer has parameter txtRecords
  - Interface Resource no longer has parameter location
  - Interface Resource no longer has parameter tags
  - Interface Zone no longer has parameter maxNumberOfRecordSets
  - Interface Zone no longer has parameter maxNumberOfRecordsPerRecordSet
  - Interface Zone no longer has parameter nameServers
  - Interface Zone no longer has parameter numberOfRecordSets
  - Interface Zone no longer has parameter registrationVirtualNetworks
  - Interface Zone no longer has parameter resolutionVirtualNetworks
  - Interface Zone no longer has parameter zoneType
  - Interface ZonesDeleteOptionalParams no longer has parameter resumeFrom
  - Removed Type Alias DnsResourceReferenceGetByTargetResourcesResponse
  - Removed Type Alias RecordSetsCreateOrUpdateResponse
  - Removed Type Alias RecordSetsGetResponse
  - Removed Type Alias RecordSetsListAllByDnsZoneNextResponse
  - Removed Type Alias RecordSetsListAllByDnsZoneResponse
  - Removed Type Alias RecordSetsListByDnsZoneNextResponse
  - Removed Type Alias RecordSetsListByDnsZoneResponse
  - Removed Type Alias RecordSetsListByTypeNextResponse
  - Removed Type Alias RecordSetsListByTypeResponse
  - Removed Type Alias RecordSetsUpdateResponse
  - Removed Type Alias ZonesCreateOrUpdateResponse
  - Removed Type Alias ZonesGetResponse
  - Removed Type Alias ZonesListByResourceGroupNextResponse
  - Removed Type Alias ZonesListByResourceGroupResponse
  - Removed Type Alias ZonesListNextResponse
  - Removed Type Alias ZonesListResponse
  - Removed Type Alias ZonesUpdateResponse
  - Type alias "RecordType" has been changed
  - Removed function getContinuationToken

    
## 5.2.0-beta.1 (2024-10-15)
Compared with version 5.1.0
    
### Features Added

  - Added operation group DnssecConfigs
  - Added Interface DelegationSignerInfo
  - Added Interface Digest
  - Added Interface DnssecConfig
  - Added Interface DnssecConfigListResult
  - Added Interface DnssecConfigsCreateOrUpdateOptionalParams
  - Added Interface DnssecConfigsDeleteHeaders
  - Added Interface DnssecConfigsDeleteOptionalParams
  - Added Interface DnssecConfigsGetOptionalParams
  - Added Interface DnssecConfigsListByDnsZoneNextOptionalParams
  - Added Interface DnssecConfigsListByDnsZoneOptionalParams
  - Added Interface DsRecord
  - Added Interface NaptrRecord
  - Added Interface SigningKey
  - Added Interface SystemData
  - Added Interface TlsaRecord
  - Added Interface ZonesDeleteHeaders
  - Added Type Alias CreatedByType
  - Added Type Alias DnssecConfigsCreateOrUpdateResponse
  - Added Type Alias DnssecConfigsGetResponse
  - Added Type Alias DnssecConfigsListByDnsZoneNextResponse
  - Added Type Alias DnssecConfigsListByDnsZoneResponse
  - Interface RecordSet has a new optional parameter dsRecords
  - Interface RecordSet has a new optional parameter naptrRecords
  - Interface RecordSet has a new optional parameter tlsaRecords
  - Interface RecordSet has a new optional parameter trafficManagementProfile
  - Interface Zone has a new optional parameter signingKeys
  - Interface Zone has a new optional parameter systemData
  - Added Enum KnownCreatedByType
  - Interface RecordSetsListAllByDnsZoneNextOptionalParams no longer has parameter recordSetNameSuffix
  - Interface RecordSetsListAllByDnsZoneNextOptionalParams no longer has parameter top
  - Interface RecordSetsListByDnsZoneNextOptionalParams no longer has parameter recordsetnamesuffix
  - Interface RecordSetsListByDnsZoneNextOptionalParams no longer has parameter top
  - Interface RecordSetsListByTypeNextOptionalParams no longer has parameter recordsetnamesuffix
  - Interface RecordSetsListByTypeNextOptionalParams no longer has parameter top
  - Interface ZonesListByResourceGroupNextOptionalParams no longer has parameter top
  - Interface ZonesListNextOptionalParams no longer has parameter top
    
    
## 5.1.0 (2022-11-22)
    
### Features Added

  - Added Interface Zone
    
## 5.0.1 (2022-04-18)

### Features Added

  - Bug fix

## 5.0.0 (2022-01-13)

The package of @azure/arm-dns is using our next generation design principles since version 5.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
