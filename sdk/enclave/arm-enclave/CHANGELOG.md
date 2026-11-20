# Release History

## 2.0.0-beta.1 (2026-11-20)
Compared with version 1.0.0

### Features Added
  - Added operation CommunityEndpointsOperations.sync
  - Added Interface AddressSpaceEntry
  - Added Interface CommunityEndpointsSyncOptionalParams
  - Added Interface ComputedAddressSpaceEntry
  - Added Interface SyncDestinationStatus
  - Added Interface SyncPerformedBy
  - Interface CheckAddressSpaceAvailabilityRequest has a new optional parameter addressSpace
  - Interface CheckAddressSpaceAvailabilityRequest has a new optional parameter prefixLength
  - Interface CommunityEndpointDestinationRule has a new optional parameter direction
  - Interface CommunityEndpointPatchProperties has a new optional parameter syncTo
  - Interface CommunityEndpointProperties has a new optional parameter syncDestinationStatuses
  - Interface CommunityEndpointProperties has a new optional parameter syncFrom
  - Interface CommunityEndpointProperties has a new optional parameter syncPerformedBy
  - Interface CommunityEndpointProperties has a new optional parameter syncStatus
  - Interface CommunityEndpointProperties has a new optional parameter syncTo
  - Interface CommunityPatchProperties has a new optional parameter subnetJoinPolicyMode
  - Interface CommunityProperties has a new optional parameter subnetJoinPolicyMode
  - Interface SubnetConfiguration has a new optional parameter subnetPurpose
  - Interface VirtualEnclavePatchProperties has a new optional parameter addressSpaces
  - Interface VirtualEnclavePatchProperties has a new optional parameter subnetConfigurations
  - Interface VirtualEnclaveProperties has a new optional parameter addressSpaces
  - Interface VirtualEnclaveProperties has a new optional parameter allowSubnetCommunication
  - Interface VirtualEnclaveProperties has a new optional parameter computedAddressSpaces
  - Interface VirtualEnclaveProperties has a new optional parameter networkName
  - Interface VirtualEnclaveProperties has a new optional parameter subnetConfigurations
  - Added Type Alias AddressSpaceOwnership
  - Added Type Alias ApprovalActionRequestApprovalStatus
  - Added Type Alias ApprovalCallbackRequestApprovalStatus
  - Added Type Alias ApprovalCallbackRequestResourceRequestAction
  - Added Type Alias ApprovalDeletionCallbackRequestResourceRequestAction
  - Added Type Alias CommunityPropertiesPolicyOverride
  - Added Type Alias GovernedServiceItemEnforcement
  - Added Type Alias GovernedServiceItemOption
  - Added Type Alias GovernedServiceItemPolicyAction
  - Added Type Alias MaintenanceModeConfigurationModelJustification
  - Added Type Alias MaintenanceModeConfigurationModelMode
  - Added Type Alias PrincipalType
  - Added Type Alias RuleDirection
  - Added Type Alias SubnetJoinPolicyMode
  - Added Type Alias SubnetPurpose
  - Added Type Alias SyncStatus
  - Added Enum KnownAddressSpaceOwnership
  - Added Enum KnownApprovalActionRequestApprovalStatus
  - Added Enum KnownApprovalCallbackRequestApprovalStatus
  - Added Enum KnownApprovalCallbackRequestResourceRequestAction
  - Added Enum KnownApprovalDeletionCallbackRequestResourceRequestAction
  - Added Enum KnownCommunityPropertiesPolicyOverride
  - Added Enum KnownGovernedServiceItemEnforcement
  - Added Enum KnownGovernedServiceItemOption
  - Added Enum KnownGovernedServiceItemPolicyAction
  - Added Enum KnownMaintenanceModeConfigurationModelJustification
  - Added Enum KnownMaintenanceModeConfigurationModelMode
  - Added Enum KnownPrincipalType
  - Added Enum KnownRuleDirection
  - Added Enum KnownSubnetJoinPolicyMode
  - Added Enum KnownSubnetPurpose
  - Added Enum KnownSyncStatus
  - Enum KnownDiagnosticDestination has a new value Unspecified
  - Enum KnownEnclaveConnectionState has a new value Degraded
  - Enum KnownEnclaveConnectionState has a new value Reconciling
  - Enum KnownServiceIdentifier has a new value AzureLocal
  - Enum KnownVersions has a new value V20240601Preview
  - Enum KnownVersions has a new value V20241201Preview
  - Enum KnownVersions has a new value V20250501Preview
  - Enum KnownVersions has a new value V20251101Preview
  - Enum KnownVersions has a new value V20260301Preview
  - Enum KnownVersions has a new value V20261001Preview

### Breaking Changes
  - Operation CommunityOperations.checkAddressSpaceAvailability has a new signature
  - Operation VirtualEnclaveOperations.createOrUpdate has a new signature
  - Operation VirtualEnclaveOperations.get has a new signature
  - Operation VirtualEnclaveOperations.listByResourceGroup has a new signature
  - Operation VirtualEnclaveOperations.listBySubscription has a new signature
  - Operation VirtualEnclaveOperations.update has a new signature
  - Type of property virtualEnclave of class MissionClient has changed
  - Removed Interface EnclaveAddressSpacesModel
  - Removed Interface EnclaveVirtualNetworkModel
  - Interface CheckAddressSpaceAvailabilityRequest no longer has parameter enclaveVirtualNetwork
  - Interface VirtualEnclavePatchProperties no longer has parameter enclaveVirtualNetwork
  - Interface VirtualEnclaveProperties no longer has parameter enclaveAddressSpaces
  - Interface VirtualEnclaveProperties no longer has parameter enclaveVirtualNetwork

    
## 1.0.0 (2026-08-27)

### Features Added

This is the first stable release of the @azure/arm-enclave package. It introduces a new SDK generation with layered APIs, smaller bundles, and improved ergonomics. For more details, see the https://aka.ms/azsdk/js/sdk/quickstart.
