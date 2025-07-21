# Release History

## 5.0.0-beta.1 (2025-07-21)
Compared with version 4.0.0

### Features Added
  - Added operation group NetworkSecurityPerimeterConfigurationsOperations
  - Added operation OperationResultsOperations.get
  - Added Class BotServiceClient
  - Added Interface BotServiceClientOptionalParams
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
  - Added Interface PageSettings
  - Added Interface PrivateEndpointConnectionProperties
  - Added Interface PrivateLinkResourceProperties
  - Added Interface Profile
  - Added Interface ProvisioningIssue
  - Added Interface ProvisioningIssueProperties
  - Added Interface ProxyResource
  - Added Interface ResourceAssociation
  - Added Interface SystemData
  - Added Interface TrackedResource
  - Interface Bot has a new optional parameter systemData
  - Interface BotChannel has a new optional parameter systemData
  - Interface BotProperties has a new optional parameter networkSecurityPerimeterConfigurations
  - Interface ConnectionSetting has a new optional parameter systemData
  - Interface ConnectionSettingProperties has a new optional parameter id
  - Interface ConnectionSettingProperties has a new optional parameter name
  - Interface ListChannelWithKeysResponse has a new optional parameter systemData
  - Interface PrivateEndpointConnection has a new optional parameter properties
  - Interface PrivateEndpointConnection has a new optional parameter systemData
  - Interface PrivateLinkResource has a new optional parameter properties
  - Interface Resource has a new optional parameter systemData
  - Added Type Alias AccessMode
  - Added Type Alias CreatedByType
  - Added Type Alias NspAccessRuleDirection
  - Added Type Alias ProvisioningState
  - Added Type Alias Severity
  - Added Enum KnownAccessMode
  - Added Enum KnownCreatedByType
  - Added Enum KnownNspAccessRuleDirection
  - Added Enum KnownProvisioningState
  - Added Enum KnownSeverity
  - Added Enum KnownVersions
  - Enum KnownPublicNetworkAccess has a new value SecuredByPerimeter

### Breaking Changes
  - Removed operation OperationResults.beginGet
  - Removed operation OperationResults.beginGetAndWait
  - Operation Bots.update has a new signature
  - Operation Channels.create has a new signature
  - Operation Channels.get has a new signature
  - Operation Channels.listWithKeys has a new signature
  - Operation Channels.update has a new signature
  - Operation DirectLine.regenerateKeys has a new signature
  - Deleted Class AzureBotService
  - Removed Interface AzureBotServiceOptionalParams
  - Removed Interface BotResponseList
  - Removed Interface ChannelResponseList
  - Removed Interface ConnectionItemName
  - Removed Interface ConnectionSettingResponseList
  - Removed Interface OperationEntityListResult
  - Removed Interface PrivateEndpointConnectionListResult
  - Type of parameter channelName of interface Channel is changed from "AlexaChannel" | "FacebookChannel" | "EmailChannel" | "OutlookChannel" | "MsTeamsChannel" | "SkypeChannel" | "KikChannel" | "WebChatChannel" | "DirectLineChannel" | "TelegramChannel" | "SmsChannel" | "SlackChannel" | "LineChannel" | "DirectLineSpeechChannel" | "Omnichannel" | "TelephonyChannel" | "AcsChatChannel" | "SearchAssistant" | "M365Extensions" to string
  - Type of parameter properties of interface OperationEntity is changed from Record<string, unknown> to any
  - Interface BotsUpdateOptionalParams no longer has parameter etag
  - Interface BotsUpdateOptionalParams no longer has parameter kind
  - Interface BotsUpdateOptionalParams no longer has parameter location
  - Interface BotsUpdateOptionalParams no longer has parameter properties
  - Interface BotsUpdateOptionalParams no longer has parameter sku
  - Interface BotsUpdateOptionalParams no longer has parameter tags
  - Interface ChannelsUpdateOptionalParams no longer has parameter etag
  - Interface ChannelsUpdateOptionalParams no longer has parameter kind
  - Interface ChannelsUpdateOptionalParams no longer has parameter location
  - Interface ChannelsUpdateOptionalParams no longer has parameter properties
  - Interface ChannelsUpdateOptionalParams no longer has parameter sku
  - Interface ChannelsUpdateOptionalParams no longer has parameter tags
  - Interface OperationResultsGetOptionalParams no longer has parameter resumeFrom
  - Interface PrivateEndpointConnection no longer has parameter groupIds
  - Interface PrivateEndpointConnection no longer has parameter privateEndpoint
  - Interface PrivateEndpointConnection no longer has parameter privateLinkServiceConnectionState
  - Interface PrivateEndpointConnection no longer has parameter provisioningState
  - Interface PrivateLinkResource no longer has parameter groupId
  - Interface PrivateLinkResource no longer has parameter requiredMembers
  - Interface PrivateLinkResource no longer has parameter requiredZoneNames
  - Interface Resource no longer has parameter etag
  - Interface Resource no longer has parameter kind
  - Interface Resource no longer has parameter location
  - Interface Resource no longer has parameter sku
  - Interface Resource no longer has parameter tags
  - Interface Resource no longer has parameter zones
  - Parameter location of interface Bot is now required
  - Parameter location of interface BotChannel is now required
  - Parameter location of interface ListChannelWithKeysResponse is now required
  - Removed Type Alias BotConnectionCreateResponse
  - Removed Type Alias BotConnectionGetResponse
  - Removed Type Alias BotConnectionListByBotServiceNextResponse
  - Removed Type Alias BotConnectionListByBotServiceResponse
  - Removed Type Alias BotConnectionListServiceProvidersResponse
  - Removed Type Alias BotConnectionListWithSecretsResponse
  - Removed Type Alias BotConnectionUpdateResponse
  - Removed Type Alias BotsCreateResponse
  - Removed Type Alias BotsGetCheckNameAvailabilityResponse
  - Removed Type Alias BotsGetResponse
  - Removed Type Alias BotsListByResourceGroupNextResponse
  - Removed Type Alias BotsListByResourceGroupResponse
  - Removed Type Alias BotsListNextResponse
  - Removed Type Alias BotsListResponse
  - Removed Type Alias BotsUpdateResponse
  - Removed Type Alias ChannelsCreateResponse
  - Removed Type Alias ChannelsGetResponse
  - Removed Type Alias ChannelsListByResourceGroupNextResponse
  - Removed Type Alias ChannelsListByResourceGroupResponse
  - Removed Type Alias ChannelsListWithKeysResponse
  - Removed Type Alias ChannelsUpdateResponse
  - Removed Type Alias DirectLineRegenerateKeysResponse
  - Removed Type Alias EmailCreateSignInUrlResponse
  - Removed Type Alias HostSettingsGetResponse
  - Removed Type Alias OperationResultsGetResponse
  - Removed Type Alias OperationsListNextResponse
  - Removed Type Alias OperationsListResponse
  - Removed Type Alias PrivateEndpointConnectionsCreateResponse
  - Removed Type Alias PrivateEndpointConnectionsGetResponse
  - Removed Type Alias PrivateEndpointConnectionsListResponse
  - Removed Type Alias PrivateLinkResourcesListByBotResourceResponse
  - Removed Type Alias QnAMakerEndpointKeysGetResponse
  - Type alias "ChannelUnion" has been changed
  - Removed function getContinuationToken

    
## 4.0.0 (2023-01-16)

The package of @azure/arm-botservice is using our next generation design principles since version 4.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
