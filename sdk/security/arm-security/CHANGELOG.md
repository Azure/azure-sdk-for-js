# Release History
    
## 5.0.0-beta.1 (2022-03-17)
    
**Features**

  - Added Interface InformationProtectionAwsOfferingInformationProtection
  - Added Type Alias InformationProtectionAwsOffering
  - Added Type Alias InformationProtectionPolicyName
  - Added Type Alias SettingName
  - Added Type Alias TaskUpdateActionType
  - Added Enum KnownInformationProtectionPolicyName
  - Added Enum KnownSettingName
  - Added Enum KnownTaskUpdateActionType
  - Enum KnownOfferingType has a new value InformationProtectionAws
  - Enum KnownSupportedCloudEnum has a new value GCP

**Breaking Changes**

  - Operation InformationProtectionPolicies.createOrUpdate has a new signature
  - Operation InformationProtectionPolicies.get has a new signature
  - Operation Settings.get has a new signature
  - Operation Settings.update has a new signature
  - Operation Tasks.updateResourceGroupLevelTaskState has a new signature
  - Operation Tasks.updateSubscriptionLevelTaskState has a new signature
  - Removed Enum KnownEnum15
  - Removed Enum KnownEnum17
  - Removed Enum KnownEnum73
    
    
## 4.0.0 (2021-12-14)

The package of @azure/arm-security is using our next generation design principles since version 4.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).
