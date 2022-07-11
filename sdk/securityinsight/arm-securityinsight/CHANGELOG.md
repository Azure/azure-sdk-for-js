# Release History
    
## 1.0.0-beta.3 (2022-05-16)
    
**Features**

  - Added Type Alias ProvisioningState
  - Type Alias Watchlist has a new parameter sasUri
  - Type Alias Watchlist has a new parameter provisioningState
  - Added Enum KnownProvisioningState

**Breaking Changes**

  - Type Alias WatchlistItem no longer has parameter itemsKeyValue
  - Type Alias WatchlistItem no longer has parameter entityMapping
    
    
## 1.0.0-beta.2 (2022-03-17)
    
**Features**

  - Added operation Incidents.runPlaybook
  - Added Interface AutomationRulePropertyValuesCondition
  - Added Interface AzureDevOpsResourceInfo
  - Added Interface BookmarkEntityMappings
  - Added Interface Deployment
  - Added Interface DeploymentInfo
  - Added Interface EntityFieldMapping
  - Added Interface FusionScenarioExclusionPattern
  - Added Interface FusionSourceSettings
  - Added Interface FusionSourceSubTypeSetting
  - Added Interface FusionSubTypeSeverityFilter
  - Added Interface FusionSubTypeSeverityFiltersItem
  - Added Interface FusionTemplateSourceSetting
  - Added Interface FusionTemplateSourceSubType
  - Added Interface FusionTemplateSubTypeSeverityFilter
  - Added Interface GitHubResourceInfo
  - Added Interface IncidentPropertiesAction
  - Added Interface IncidentsRunPlaybookOptionalParams
  - Added Interface ManualTriggerRequestBody
  - Added Interface Office365ProjectConnectorDataTypes
  - Added Interface OfficePowerBIConnectorDataTypes
  - Added Interface PlaybookActionProperties
  - Added Interface RepositoryResourceInfo
  - Added Interface WatchlistsCreateOrUpdateHeaders
  - Added Interface WatchlistsDeleteHeaders
  - Added Interface Webhook
  - Added Type Alias ActionType
  - Added Type Alias AlertRuleTemplateWithMitreProperties
  - Added Type Alias AutomationRulesDeleteResponse
  - Added Type Alias ConditionType
  - Added Type Alias DeploymentFetchStatus
  - Added Type Alias DeploymentResult
  - Added Type Alias DeploymentState
  - Added Type Alias Enum12
  - Added Type Alias IncidentsRunPlaybookResponse
  - Added Type Alias IoTCheckRequirements
  - Added Type Alias IoTDataConnector
  - Added Type Alias IoTDataConnectorProperties
  - Added Type Alias Office365ProjectCheckRequirements
  - Added Type Alias Office365ProjectCheckRequirementsProperties
  - Added Type Alias Office365ProjectConnectorDataTypesLogs
  - Added Type Alias Office365ProjectDataConnector
  - Added Type Alias Office365ProjectDataConnectorProperties
  - Added Type Alias OfficePowerBICheckRequirements
  - Added Type Alias OfficePowerBICheckRequirementsProperties
  - Added Type Alias OfficePowerBIConnectorDataTypesLogs
  - Added Type Alias OfficePowerBIDataConnector
  - Added Type Alias OfficePowerBIDataConnectorProperties
  - Added Type Alias PropertyConditionProperties
  - Added Type Alias SourceType
  - Added Type Alias Version
  - Added Type Alias WatchlistsDeleteResponse
  - Interface AutomationRulesCreateOrUpdateOptionalParams has a new optional parameter automationRuleToUpsert
  - Interface IncidentAdditionalData has a new optional parameter providerIncidentUrl
  - Interface IncidentAdditionalData has a new optional parameter techniques
  - Interface ScheduledAlertRuleCommonProperties has a new optional parameter alertDetailsOverride
  - Interface ScheduledAlertRuleCommonProperties has a new optional parameter customDetails
  - Interface ScheduledAlertRuleCommonProperties has a new optional parameter entityMappings
  - Interface ScheduledAlertRuleCommonProperties has a new optional parameter query
  - Interface ScheduledAlertRuleCommonProperties has a new optional parameter severity
  - Interface WatchlistItemsListNextOptionalParams has a new optional parameter skipToken
  - Interface WatchlistItemsListOptionalParams has a new optional parameter skipToken
  - Interface WatchlistsListNextOptionalParams has a new optional parameter skipToken
  - Interface WatchlistsListOptionalParams has a new optional parameter skipToken
  - Add parameters of AlertRuleTemplateWithMitreProperties to TypeAlias MLBehaviorAnalyticsAlertRuleTemplateProperties
  - Add parameters of AlertRuleTemplateWithMitreProperties to TypeAlias NrtAlertRuleTemplateProperties
  - Add parameters of AlertRuleTemplateWithMitreProperties to TypeAlias ThreatIntelligenceAlertRuleTemplateProperties
  - Type Alias Bookmark has a new parameter entityMappings
  - Type Alias Bookmark has a new parameter tactics
  - Type Alias Bookmark has a new parameter techniques
  - Type Alias FusionAlertRule has a new parameter sourceSettings
  - Type Alias FusionAlertRule has a new parameter scenarioExclusionPatterns
  - Type Alias FusionAlertRule has a new parameter techniques
  - Type Alias FusionAlertRuleTemplate has a new parameter techniques
  - Type Alias FusionAlertRuleTemplate has a new parameter sourceSettings
  - Type Alias MetadataModel has a new parameter customVersion
  - Type Alias MetadataModel has a new parameter contentSchemaVersion
  - Type Alias MetadataModel has a new parameter icon
  - Type Alias MetadataModel has a new parameter threatAnalysisTactics
  - Type Alias MetadataModel has a new parameter threatAnalysisTechniques
  - Type Alias MetadataModel has a new parameter previewImages
  - Type Alias MetadataModel has a new parameter previewImagesDark
  - Type Alias MetadataPatch has a new parameter customVersion
  - Type Alias MetadataPatch has a new parameter contentSchemaVersion
  - Type Alias MetadataPatch has a new parameter icon
  - Type Alias MetadataPatch has a new parameter threatAnalysisTactics
  - Type Alias MetadataPatch has a new parameter threatAnalysisTechniques
  - Type Alias MetadataPatch has a new parameter previewImages
  - Type Alias MetadataPatch has a new parameter previewImagesDark
  - Type Alias MicrosoftSecurityIncidentCreationAlertRuleTemplateProperties has a new parameter displayNamesFilter
  - Type Alias MicrosoftSecurityIncidentCreationAlertRuleTemplateProperties has a new parameter displayNamesExcludeFilter
  - Type Alias MicrosoftSecurityIncidentCreationAlertRuleTemplateProperties has a new parameter productFilter
  - Type Alias MicrosoftSecurityIncidentCreationAlertRuleTemplateProperties has a new parameter severitiesFilter
  - Type Alias MLBehaviorAnalyticsAlertRule has a new parameter techniques
  - Type Alias MLBehaviorAnalyticsAlertRuleTemplate has a new parameter techniques
  - Type Alias NrtAlertRule has a new parameter techniques
  - Type Alias NrtAlertRuleTemplate has a new parameter techniques
  - Type Alias ScheduledAlertRule has a new parameter techniques
  - Type Alias ScheduledAlertRuleProperties has a new parameter alertRuleTemplateName
  - Type Alias ScheduledAlertRuleProperties has a new parameter templateVersion
  - Type Alias ScheduledAlertRuleProperties has a new parameter description
  - Type Alias ScheduledAlertRuleProperties has a new parameter lastModifiedUtc
  - Type Alias ScheduledAlertRuleProperties has a new parameter tactics
  - Type Alias ScheduledAlertRuleProperties has a new parameter techniques
  - Type Alias ScheduledAlertRuleProperties has a new parameter incidentConfiguration
  - Type Alias ScheduledAlertRuleTemplate has a new parameter techniques
  - Type Alias SourceControl has a new parameter version
  - Type Alias SourceControl has a new parameter repositoryResourceInfo
  - Type Alias SourceControl has a new parameter lastDeploymentInfo
  - Type Alias ThreatIntelligenceAlertRule has a new parameter techniques
  - Type Alias ThreatIntelligenceAlertRuleTemplate has a new parameter techniques
  - Type Alias Watchlist has a new parameter sourceType
  - Added Enum KnownActionType
  - Added Enum KnownConditionType
  - Added Enum KnownDeploymentFetchStatus
  - Added Enum KnownDeploymentResult
  - Added Enum KnownDeploymentState
  - Added Enum KnownEnum12
  - Added Enum KnownSourceType
  - Added Enum KnownVersion
  - Enum KnownAttackTactic has a new value ImpairProcessControl
  - Enum KnownAttackTactic has a new value InhibitResponseFunction
  - Enum KnownAttackTactic has a new value Reconnaissance
  - Enum KnownAttackTactic has a new value ResourceDevelopment
  - Enum KnownAutomationRulePropertyConditionSupportedProperty has a new value AlertProductNames
  - Enum KnownAutomationRulePropertyConditionSupportedProperty has a new value IncidentLabel
  - Enum KnownDataConnectorKind has a new value IOT
  - Enum KnownDataConnectorKind has a new value Office365Project
  - Enum KnownDataConnectorKind has a new value OfficePowerBI
  - Enum KnownIncidentLabelType has a new value AutoAssigned
  - Enum KnownKind has a new value AutomationRule
  - Enum KnownKind has a new value AzureFunction
  - Enum KnownKind has a new value LogicAppsCustomConnector

**Breaking Changes**

  - Operation AutomationRules.createOrUpdate has a new signature
  - Operation ThreatIntelligenceIndicator.create has a new signature
  - Operation ThreatIntelligenceIndicator.createIndicator has a new signature
  - Operation ThreatIntelligenceIndicator.replaceTags has a new signature
  - Interface QueryBasedAlertRuleTemplateProperties no longer has parameter tactics
  - Delete parameters of MicrosoftSecurityIncidentCreationAlertRuleCommonProperties in TypeAlias MicrosoftSecurityIncidentCreationAlertRuleTemplateProperties
  - Delete parameters of AlertRuleTemplatePropertiesBase in TypeAlias MLBehaviorAnalyticsAlertRuleTemplateProperties
  - Delete parameters of AlertRuleTemplatePropertiesBase in TypeAlias NrtAlertRuleTemplateProperties
  - Delete parameters of QueryBasedAlertRuleProperties in TypeAlias ScheduledAlertRuleProperties
  - Delete parameters of AlertRuleTemplatePropertiesBase in TypeAlias ThreatIntelligenceAlertRuleTemplateProperties
  - Delete parameters of ThreatIntelligenceResourceKind in TypeAlias ThreatIntelligenceInformation
  - Type Alias MLBehaviorAnalyticsAlertRuleTemplateProperties no longer has parameter tactics
  - Type Alias ThreatIntelligenceAlertRuleTemplateProperties no longer has parameter tactics
  - Type Alias Watchlist no longer has parameter watchlistItemsCount
  - Type Alias ScheduledAlertRuleProperties has a new parameter displayName
  - Type Alias ScheduledAlertRuleProperties has a new parameter enabled
  - Type Alias ScheduledAlertRuleProperties has a new parameter suppressionDuration
  - Type Alias ScheduledAlertRuleProperties has a new parameter suppressionEnabled
  - Type Alias ThreatIntelligenceInformation has a new parameter kind
  - Parameter displayName of Type Alias AutomationRule is now required
  - Parameter order of Type Alias AutomationRule is now required
  - Parameter triggeringLogic of Type Alias AutomationRule is now required
  - Parameter actions of Type Alias AutomationRule is now required
  - Removed Enum KnownAutomationRuleActionType
  - Removed Enum KnownAutomationRuleConditionType
  - Removed Enum KnownEnum8
  - Removed Enum KnownSource
  - Enum KnownIncidentLabelType no longer has value System
    
    
## 1.0.0-beta.1 (2022-01-19)

The package of @azure/arm-securityinsight is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).
