# Release History

## 5.2.0-beta.3 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 5.2.0-beta.2 (2025-08-22)

### Other Changes

  - Other fixes

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
