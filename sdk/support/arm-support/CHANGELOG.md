# Release History

## 2.2.0-beta.2 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 2.2.0-beta.1 (2023-10-16)
    
**Features**

  - Added operation group ChatTranscripts
  - Added operation group ChatTranscriptsNoSubscription
  - Added operation group CommunicationsNoSubscription
  - Added operation group Files
  - Added operation group FilesNoSubscription
  - Added operation group FileWorkspaces
  - Added operation group FileWorkspacesNoSubscription
  - Added operation group SupportTicketChatTranscriptsNoSubscription
  - Added operation group SupportTicketCommunicationsNoSubscription
  - Added operation group SupportTicketsNoSubscription
  - Added Interface ChatTranscriptDetails
  - Added Interface ChatTranscriptsGetOptionalParams
  - Added Interface ChatTranscriptsListNextOptionalParams
  - Added Interface ChatTranscriptsListOptionalParams
  - Added Interface ChatTranscriptsListResult
  - Added Interface ChatTranscriptsNoSubscriptionGetOptionalParams
  - Added Interface CommunicationsNoSubscriptionCheckNameAvailabilityOptionalParams
  - Added Interface CommunicationsNoSubscriptionCreateHeaders
  - Added Interface CommunicationsNoSubscriptionCreateOptionalParams
  - Added Interface CommunicationsNoSubscriptionGetOptionalParams
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
  - Added Interface SupportTicketChatTranscriptsNoSubscriptionListNextOptionalParams
  - Added Interface SupportTicketChatTranscriptsNoSubscriptionListOptionalParams
  - Added Interface SupportTicketCommunicationsNoSubscriptionListNextOptionalParams
  - Added Interface SupportTicketCommunicationsNoSubscriptionListOptionalParams
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
  - Added Type Alias CommunicationsNoSubscriptionCheckNameAvailabilityResponse
  - Added Type Alias CommunicationsNoSubscriptionCreateResponse
  - Added Type Alias CommunicationsNoSubscriptionGetResponse
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
  - Added Type Alias SupportTicketChatTranscriptsNoSubscriptionListNextResponse
  - Added Type Alias SupportTicketChatTranscriptsNoSubscriptionListResponse
  - Added Type Alias SupportTicketCommunicationsNoSubscriptionListNextResponse
  - Added Type Alias SupportTicketCommunicationsNoSubscriptionListResponse
  - Added Type Alias SupportTicketsNoSubscriptionCheckNameAvailabilityResponse
  - Added Type Alias SupportTicketsNoSubscriptionCreateResponse
  - Added Type Alias SupportTicketsNoSubscriptionGetResponse
  - Added Type Alias SupportTicketsNoSubscriptionListNextResponse
  - Added Type Alias SupportTicketsNoSubscriptionListResponse
  - Added Type Alias SupportTicketsNoSubscriptionUpdateResponse
  - Added Type Alias TranscriptContentType
  - Added Type Alias UserConsent
  - Interface ProblemClassification has a new optional parameter secondaryConsentEnabled
  - Interface SupportTicketDetails has a new optional parameter advancedDiagnosticConsent
  - Interface SupportTicketDetails has a new optional parameter fileWorkspaceName
  - Interface SupportTicketDetails has a new optional parameter problemScopingQuestions
  - Interface SupportTicketDetails has a new optional parameter secondaryConsent
  - Interface SupportTicketDetails has a new optional parameter supportPlanDisplayName
  - Interface SupportTicketDetails has a new optional parameter supportPlanId
  - Interface UpdateSupportTicket has a new optional parameter advancedDiagnosticConsent
  - Interface UpdateSupportTicket has a new optional parameter secondaryConsent
  - Added Enum KnownConsent
  - Added Enum KnownCreatedByType
  - Added Enum KnownTranscriptContentType
  - Added Enum KnownUserConsent
  - Class MicrosoftSupport has a new signature
    
    
## 2.1.0 (2023-02-02)
    
**Features**

  - Interface CommunicationsListNextOptionalParams no longer has parameter filter
  - Interface CommunicationsListNextOptionalParams no longer has parameter top
  - Interface SupportTicketsListNextOptionalParams no longer has parameter filter
  - Interface SupportTicketsListNextOptionalParams no longer has parameter top
    
## 2.0.2 (2022-07-05)

**Features**

  - Bug fix

## 2.0.1 (2022-05-05)

**Features**

  - Bug fix
    
## 2.0.0 (2022-01-21)

The package of @azure/arm-support is using our next generation design principles since version 2.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart ).
