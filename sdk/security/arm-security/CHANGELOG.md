# Release History

## 5.0.1 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 5.0.0 (2022-03-30)
    
**Features**

  - Added operation Alerts.simulate
  - Added Interface InformationProtectionAwsOfferingInformationProtection
  - Added Type Alias InformationProtectionAwsOffering
  - Added Type Alias InformationProtectionPolicyName
  - Added Type Alias SettingName
  - Added Type Alias TaskUpdateActionType
  - Type Alias Pricing has a new parameter subPlan
  - Added Enum KnownInformationProtectionPolicyName
  - Added Enum KnownSettingName
  - Added Enum KnownTaskUpdateActionType
  - Enum KnownOfferingType has a new value InformationProtectionAws
  - Enum KnownSupportedCloudEnum has a new value GCP

**Breaking Changes**

  - Removed operation Alerts.beginSimulate
  - Removed operation Alerts.beginSimulateAndWait
  - Operation AdaptiveApplicationControls.delete has a new signature
  - Operation AdaptiveApplicationControls.get has a new signature
  - Operation AdaptiveApplicationControls.put has a new signature
  - Operation Alerts.getResourceGroupLevel has a new signature
  - Operation Alerts.getSubscriptionLevel has a new signature
  - Operation Alerts.listResourceGroupLevelByRegion has a new signature
  - Operation Alerts.listSubscriptionLevelByRegion has a new signature
  - Operation Alerts.updateResourceGroupLevelStateToActivate has a new signature
  - Operation Alerts.updateResourceGroupLevelStateToDismiss has a new signature
  - Operation Alerts.updateResourceGroupLevelStateToResolve has a new signature
  - Operation Alerts.updateSubscriptionLevelStateToActivate has a new signature
  - Operation Alerts.updateSubscriptionLevelStateToDismiss has a new signature
  - Operation Alerts.updateSubscriptionLevelStateToResolve has a new signature
  - Operation AllowedConnections.get has a new signature
  - Operation AllowedConnections.listByHomeRegion has a new signature
  - Operation DiscoveredSecuritySolutions.get has a new signature
  - Operation DiscoveredSecuritySolutions.listByHomeRegion has a new signature
  - Operation ExternalSecuritySolutions.get has a new signature
  - Operation ExternalSecuritySolutions.listByHomeRegion has a new signature
  - Operation InformationProtectionPolicies.createOrUpdate has a new signature
  - Operation InformationProtectionPolicies.get has a new signature
  - Operation JitNetworkAccessPolicies.createOrUpdate has a new signature
  - Operation JitNetworkAccessPolicies.delete has a new signature
  - Operation JitNetworkAccessPolicies.get has a new signature
  - Operation JitNetworkAccessPolicies.initiate has a new signature
  - Operation JitNetworkAccessPolicies.listByRegion has a new signature
  - Operation JitNetworkAccessPolicies.listByResourceGroupAndRegion has a new signature
  - Operation Locations.get has a new signature
  - Operation SecuritySolutions.get has a new signature
  - Operation SecuritySolutionsReferenceDataOperations.listByHomeRegion has a new signature
  - Operation Settings.get has a new signature
  - Operation Settings.update has a new signature
  - Operation Tasks.getResourceGroupLevelTask has a new signature
  - Operation Tasks.getSubscriptionLevelTask has a new signature
  - Operation Tasks.listByHomeRegion has a new signature
  - Operation Tasks.listByResourceGroup has a new signature
  - Operation Tasks.updateResourceGroupLevelTaskState has a new signature
  - Operation Tasks.updateSubscriptionLevelTaskState has a new signature
  - Operation Topology.get has a new signature
  - Operation Topology.listByHomeRegion has a new signature
  - Class SecurityCenter has a new signature
  - Interface AlertsSimulateOptionalParams no longer has parameter resumeFrom
  - Interface AlertsSimulateOptionalParams no longer has parameter updateIntervalInMs
  - Class SecurityCenter no longer has parameter ascLocation
  - Removed Enum KnownEnum15
  - Removed Enum KnownEnum17
  - Removed Enum KnownEnum73
    
    
## 4.0.0 (2021-12-14)

The package of @azure/arm-security is using our next generation design principles since version 4.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).
