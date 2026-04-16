# Release History

## 3.0.2 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 3.0.1 (2025-08-22)

### Other Changes

  - Other fixes

## 3.0.0 (2024-04-16)
    
### Features Added

  - Added operation group ChatTranscripts
  - Added operation group ChatTranscriptsNoSubscription
  - Added operation group CommunicationsNoSubscription
  - Added operation group Files
  - Added operation group FilesNoSubscription
  - Added operation group FileWorkspaces
  - Added operation group FileWorkspacesNoSubscription
  - Added operation group SupportTicketsNoSubscription
  - Added Interface ChatTranscriptDetails
  - Added Interface ChatTranscriptsGetOptionalParams
  - Added Interface ChatTranscriptsListNextOptionalParams
  - Added Interface ChatTranscriptsListOptionalParams
  - Added Interface ChatTranscriptsListResult
  - Added Interface ChatTranscriptsNoSubscriptionGetOptionalParams
  - Added Interface ChatTranscriptsNoSubscriptionListNextOptionalParams
  - Added Interface ChatTranscriptsNoSubscriptionListOptionalParams
  - Added Interface CommunicationsNoSubscriptionCheckNameAvailabilityOptionalParams
  - Added Interface CommunicationsNoSubscriptionCreateHeaders
  - Added Interface CommunicationsNoSubscriptionCreateOptionalParams
  - Added Interface CommunicationsNoSubscriptionGetOptionalParams
  - Added Interface CommunicationsNoSubscriptionListNextOptionalParams
  - Added Interface CommunicationsNoSubscriptionListOptionalParams
  - Added Interface ErrorAdditionalInfo
  - Added Interface ErrorDetail
  - Added Interface ErrorResponse
  - Added Interface FileDetails
  - Added Interface FilesCreateOptionalParams
  - Added Interface FilesGetOptionalParams
  - Added Interface FilesListNextOptionalParams
  - Added Interface FilesListOptionalParams
  - Added Interface FilesListResult
  - Added Interface FilesNoSubscriptionCreateOptionalParams
  - Added Interface FilesNoSubscriptionGetOptionalParams
  - Added Interface FilesNoSubscriptionListNextOptionalParams
  - Added Interface FilesNoSubscriptionListOptionalParams
  - Added Interface FilesNoSubscriptionUploadOptionalParams
  - Added Interface FilesUploadOptionalParams
  - Added Interface FileWorkspaceDetails
  - Added Interface FileWorkspacesCreateOptionalParams
  - Added Interface FileWorkspacesGetOptionalParams
  - Added Interface FileWorkspacesNoSubscriptionCreateOptionalParams
  - Added Interface FileWorkspacesNoSubscriptionGetOptionalParams
  - Added Interface MessageProperties
  - Added Interface ProxyResource
  - Added Interface Resource
  - Added Interface SecondaryConsent
  - Added Interface SecondaryConsentEnabled
  - Added Interface SupportTicketsNoSubscriptionCheckNameAvailabilityOptionalParams
  - Added Interface SupportTicketsNoSubscriptionCreateHeaders
  - Added Interface SupportTicketsNoSubscriptionCreateOptionalParams
  - Added Interface SupportTicketsNoSubscriptionGetOptionalParams
  - Added Interface SupportTicketsNoSubscriptionListNextOptionalParams
  - Added Interface SupportTicketsNoSubscriptionListOptionalParams
  - Added Interface SupportTicketsNoSubscriptionUpdateOptionalParams
  - Added Interface SystemData
  - Added Interface UploadFile
  - Added Type Alias ChatTranscriptsGetResponse
  - Added Type Alias ChatTranscriptsListNextResponse
  - Added Type Alias ChatTranscriptsListResponse
  - Added Type Alias ChatTranscriptsNoSubscriptionGetResponse
  - Added Type Alias ChatTranscriptsNoSubscriptionListNextResponse
  - Added Type Alias ChatTranscriptsNoSubscriptionListResponse
  - Added Type Alias CommunicationsNoSubscriptionCheckNameAvailabilityResponse
  - Added Type Alias CommunicationsNoSubscriptionCreateResponse
  - Added Type Alias CommunicationsNoSubscriptionGetResponse
  - Added Type Alias CommunicationsNoSubscriptionListNextResponse
  - Added Type Alias CommunicationsNoSubscriptionListResponse
  - Added Type Alias Consent
  - Added Type Alias CreatedByType
  - Added Type Alias FilesCreateResponse
  - Added Type Alias FilesGetResponse
  - Added Type Alias FilesListNextResponse
  - Added Type Alias FilesListResponse
  - Added Type Alias FilesNoSubscriptionCreateResponse
  - Added Type Alias FilesNoSubscriptionGetResponse
  - Added Type Alias FilesNoSubscriptionListNextResponse
  - Added Type Alias FilesNoSubscriptionListResponse
  - Added Type Alias FileWorkspacesCreateResponse
  - Added Type Alias FileWorkspacesGetResponse
  - Added Type Alias FileWorkspacesNoSubscriptionCreateResponse
  - Added Type Alias FileWorkspacesNoSubscriptionGetResponse
  - Added Type Alias IsTemporaryTicket
  - Added Type Alias SupportTicketsNoSubscriptionCheckNameAvailabilityResponse
  - Added Type Alias SupportTicketsNoSubscriptionCreateResponse
  - Added Type Alias SupportTicketsNoSubscriptionGetResponse
  - Added Type Alias SupportTicketsNoSubscriptionListNextResponse
  - Added Type Alias SupportTicketsNoSubscriptionListResponse
  - Added Type Alias SupportTicketsNoSubscriptionUpdateResponse
  - Added Type Alias TranscriptContentType
  - Added Type Alias UserConsent
  - Interface ProblemClassification has a new optional parameter secondaryConsentEnabled
  - Interface SupportTicketDetails has a new optional parameter fileWorkspaceName
  - Interface SupportTicketDetails has a new optional parameter isTemporaryTicket
  - Interface SupportTicketDetails has a new optional parameter problemScopingQuestions
  - Interface SupportTicketDetails has a new optional parameter secondaryConsent
  - Interface SupportTicketDetails has a new optional parameter supportPlanDisplayName
  - Interface SupportTicketDetails has a new optional parameter supportPlanId
  - Interface UpdateSupportTicket has a new optional parameter advancedDiagnosticConsent
  - Interface UpdateSupportTicket has a new optional parameter secondaryConsent
  - Added Enum KnownConsent
  - Added Enum KnownCreatedByType
  - Added Enum KnownIsTemporaryTicket
  - Added Enum KnownTranscriptContentType
  - Added Enum KnownUserConsent

### Breaking Changes

  - Class MicrosoftSupport has a new signature
  - Interface SupportTicketDetails has a new required parameter advancedDiagnosticConsent
  - Parameter body of interface CommunicationDetails is now required
  - Parameter subject of interface CommunicationDetails is now required
  - Parameter contactDetails of interface SupportTicketDetails is now required
  - Parameter description of interface SupportTicketDetails is now required
  - Parameter problemClassificationId of interface SupportTicketDetails is now required
  - Parameter serviceId of interface SupportTicketDetails is now required
  - Parameter severity of interface SupportTicketDetails is now required
  - Parameter title of interface SupportTicketDetails is now required
    
    
## 2.1.0 (2023-02-02)
    
### Features Added

  - Interface CommunicationsListNextOptionalParams no longer has parameter filter
  - Interface CommunicationsListNextOptionalParams no longer has parameter top
  - Interface SupportTicketsListNextOptionalParams no longer has parameter filter
  - Interface SupportTicketsListNextOptionalParams no longer has parameter top
    
## 2.0.2 (2022-07-05)

### Features Added

  - Bug fix

## 2.0.1 (2022-05-05)

### Features Added

  - Bug fix
    
## 2.0.0 (2022-01-21)

The package of @azure/arm-support is using our next generation design principles since version 2.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).
