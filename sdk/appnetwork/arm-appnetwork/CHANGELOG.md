# Release History

## 1.0.0-beta.2 (2026-09-22)
Compared with version 1.0.0-beta.1

### Features Added
  - Added Interface ConnectivityProfileUpdate
  - Added Interface EastWestGatewayProfileUpdate
  - Added Interface FullyManagedUpgradeProfileUpdate
  - Added Interface ManagedServiceIdentityUpdate
  - Added Interface SelfManagedUpgradeProfileUpdate
  - Added Interface UpgradeProfileUpdate
  - Interface AppLinkUpdate has a new optional parameter identity
  - Interface ConnectivityProfile has a new optional parameter network
  - Enum KnownVersions has a new value V20260801Preview

### Breaking Changes
  - Operation AppLinkMembersOperations.update has a new signature
  - Type of parameter connectivityProfile of interface AppLinkMemberUpdateProperties is changed from ConnectivityProfile to ConnectivityProfileUpdate
  - Type of parameter upgradeProfile of interface AppLinkMemberUpdateProperties is changed from UpgradeProfile to UpgradeProfileUpdate
  - Interface AppLinkMemberUpdateProperties no longer has parameter observabilityProfile

    
## 1.0.0-beta.1 (2026-03-25)

### Features Added

Initial release of the @azure/arm-appnetwork package
