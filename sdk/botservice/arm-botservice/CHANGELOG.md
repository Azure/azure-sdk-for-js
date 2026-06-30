# Release History

## 5.0.0-beta.2 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 5.0.0-beta.1 (2026-06-12)
Compared with version 4.0.0

### Features Added
  - Added operation group NetworkSecurityPerimeterConfigurationsOperations
  - Added operation OperationResultsOperations.get
  - Class AzureBotService has a new constructor "constructor(credential: TokenCredential, options?: AzureBotServiceOptionalParams);"
  - Added Interface ErrorAdditionalInfo
  - Added Interface ErrorDetail
  - Added Interface ErrorResponse
  - Added Interface NetworkSecurityPerimeter
  - Added Interface NetworkSecurityPerimeterConfiguration
  - Added Interface NetworkSecurityPerimeterConfigurationProperties
  - Added Interface NetworkSecurityPerimeterConfigurationsGetOptionalParams
  - Added Interface NetworkSecurityPerimeterConfigurationsListOptionalParams
  - Added Interface NetworkSecurityPerimeterConfigurationsReconcileOptionalParams
  - Added Interface NspAccessRule
  - Added Interface NspAccessRuleProperties
  - Added Interface NspAccessRulePropertiesSubscriptionsItem
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface PrivateEndpointConnectionProperties
  - Added Interface PrivateLinkResourceProperties
  - Added Interface Profile
  - Added Interface ProvisioningIssue
  - Added Interface ProvisioningIssueProperties
  - Added Interface ProxyResource
  - Added Interface ResourceAssociation
  - Added Interface RestorePollerOptions
  - Added Interface SimplePollerLike
  - Added Interface SystemData
  - Interface Bot has a new optional parameter systemData
  - Interface BotChannel has a new optional parameter systemData
  - Interface BotProperties has a new optional parameter networkSecurityPerimeterConfigurations
  - Interface BotsUpdateOptionalParams has a new optional parameter zones
  - Interface ChannelsUpdateOptionalParams has a new optional parameter zones
  - Interface ConnectionSetting has a new optional parameter systemData
  - Interface ConnectionSettingProperties has a new optional parameter id
  - Interface ConnectionSettingProperties has a new optional parameter name
  - Interface ListChannelWithKeysResponse has a new optional parameter systemData
  - Interface PrivateEndpointConnection has a new optional parameter systemData
  - Interface Resource has a new optional parameter systemData
  - Added Type Alias AccessMode
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias CreatedByType
  - Added Type Alias NspAccessRuleDirection
  - Added Type Alias ProvisioningState
  - Added Type Alias Severity
  - Added Enum AzureClouds
  - Added Enum KnownAccessMode
  - Added Enum KnownCreatedByType
  - Added Enum KnownNspAccessRuleDirection
  - Added Enum KnownProvisioningState
  - Added Enum KnownSeverity
  - Added Enum KnownVersions
  - Enum KnownPublicNetworkAccess has a new value SecuredByPerimeter

### Breaking Changes
  - Operation Channels.create has a new signature
  - Operation Channels.get has a new signature
  - Operation Channels.listWithKeys has a new signature
  - Operation Channels.update has a new signature
  - Operation DirectLine.regenerateKeys has a new signature
  - Removed Interface BotResponseList
  - Removed Interface ChannelResponseList
  - Removed Interface ConnectionItemName
  - Removed Interface ConnectionSettingResponseList
  - Type of parameter channelName of interface Channel is changed from "AlexaChannel" | "FacebookChannel" | "EmailChannel" | "OutlookChannel" | "MsTeamsChannel" | "SkypeChannel" | "KikChannel" | "WebChatChannel" | "DirectLineChannel" | "TelegramChannel" | "SmsChannel" | "SlackChannel" | "LineChannel" | "DirectLineSpeechChannel" | "Omnichannel" | "TelephonyChannel" | "AcsChatChannel" | "SearchAssistant" | "M365Extensions" to string
  - Interface Resource no longer has parameter etag
  - Interface Resource no longer has parameter kind
  - Interface Resource no longer has parameter location
  - Interface Resource no longer has parameter sku
  - Interface Resource no longer has parameter tags
  - Interface Resource no longer has parameter zones
  - Type alias "ChannelUnion" has been changed

    
## 4.0.0 (2023-01-16)

The package of @azure/arm-botservice is using our next generation design principles since version 4.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
