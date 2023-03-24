# Release History
    
## 4.0.0-beta.4 (2023-03-22)
    
**Features**

  - Added operation group CommunicationServices
  - Added operation group Domains
  - Added operation group EmailServices
  - Added operation group SenderUsernames
  - Added Interface CheckNameAvailabilityRequest
  - Added Interface CheckNameAvailabilityResponse
  - Added Interface CommunicationServiceResource
  - Added Interface CommunicationServiceResourceUpdate
  - Added Interface CommunicationServicesCheckNameAvailabilityOptionalParams
  - Added Interface CommunicationServicesCreateOrUpdateHeaders
  - Added Interface CommunicationServicesCreateOrUpdateOptionalParams
  - Added Interface CommunicationServicesDeleteHeaders
  - Added Interface CommunicationServicesDeleteOptionalParams
  - Added Interface CommunicationServicesGetOptionalParams
  - Added Interface CommunicationServicesLinkNotificationHubOptionalParams
  - Added Interface CommunicationServicesListByResourceGroupNextOptionalParams
  - Added Interface CommunicationServicesListByResourceGroupOptionalParams
  - Added Interface CommunicationServicesListBySubscriptionNextOptionalParams
  - Added Interface CommunicationServicesListBySubscriptionOptionalParams
  - Added Interface CommunicationServicesListKeysOptionalParams
  - Added Interface CommunicationServicesRegenerateKeyOptionalParams
  - Added Interface CommunicationServicesUpdateOptionalParams
  - Added Interface DnsRecord
  - Added Interface DomainPropertiesVerificationRecords
  - Added Interface DomainPropertiesVerificationStates
  - Added Interface DomainResource
  - Added Interface DomainResourceList
  - Added Interface DomainsCancelVerificationHeaders
  - Added Interface DomainsCancelVerificationOptionalParams
  - Added Interface DomainsCreateOrUpdateHeaders
  - Added Interface DomainsCreateOrUpdateOptionalParams
  - Added Interface DomainsDeleteHeaders
  - Added Interface DomainsDeleteOptionalParams
  - Added Interface DomainsGetOptionalParams
  - Added Interface DomainsInitiateVerificationHeaders
  - Added Interface DomainsInitiateVerificationOptionalParams
  - Added Interface DomainsListByEmailServiceResourceNextOptionalParams
  - Added Interface DomainsListByEmailServiceResourceOptionalParams
  - Added Interface DomainsUpdateHeaders
  - Added Interface DomainsUpdateOptionalParams
  - Added Interface EmailServiceResource
  - Added Interface EmailServiceResourceList
  - Added Interface EmailServiceResourceUpdate
  - Added Interface EmailServicesCreateOrUpdateHeaders
  - Added Interface EmailServicesCreateOrUpdateOptionalParams
  - Added Interface EmailServicesDeleteHeaders
  - Added Interface EmailServicesDeleteOptionalParams
  - Added Interface EmailServicesGetOptionalParams
  - Added Interface EmailServicesListByResourceGroupNextOptionalParams
  - Added Interface EmailServicesListByResourceGroupOptionalParams
  - Added Interface EmailServicesListBySubscriptionNextOptionalParams
  - Added Interface EmailServicesListBySubscriptionOptionalParams
  - Added Interface EmailServicesListVerifiedExchangeOnlineDomainsOptionalParams
  - Added Interface EmailServicesUpdateHeaders
  - Added Interface EmailServicesUpdateOptionalParams
  - Added Interface ProxyResource
  - Added Interface SenderUsernameResource
  - Added Interface SenderUsernameResourceCollection
  - Added Interface SenderUsernamesCreateOrUpdateOptionalParams
  - Added Interface SenderUsernamesDeleteOptionalParams
  - Added Interface SenderUsernamesGetOptionalParams
  - Added Interface SenderUsernamesListByDomainsNextOptionalParams
  - Added Interface SenderUsernamesListByDomainsOptionalParams
  - Added Interface TrackedResource
  - Added Interface UpdateDomainRequestParameters
  - Added Interface VerificationParameter
  - Added Interface VerificationStatusRecord
  - Added Type Alias CheckNameAvailabilityReason
  - Added Type Alias CommunicationServicesCheckNameAvailabilityResponse
  - Added Type Alias CommunicationServicesCreateOrUpdateResponse
  - Added Type Alias CommunicationServicesGetResponse
  - Added Type Alias CommunicationServicesLinkNotificationHubResponse
  - Added Type Alias CommunicationServicesListByResourceGroupNextResponse
  - Added Type Alias CommunicationServicesListByResourceGroupResponse
  - Added Type Alias CommunicationServicesListBySubscriptionNextResponse
  - Added Type Alias CommunicationServicesListBySubscriptionResponse
  - Added Type Alias CommunicationServicesListKeysResponse
  - Added Type Alias CommunicationServicesProvisioningState
  - Added Type Alias CommunicationServicesRegenerateKeyResponse
  - Added Type Alias CommunicationServicesUpdateResponse
  - Added Type Alias DomainManagement
  - Added Type Alias DomainsCancelVerificationResponse
  - Added Type Alias DomainsCreateOrUpdateResponse
  - Added Type Alias DomainsGetResponse
  - Added Type Alias DomainsInitiateVerificationResponse
  - Added Type Alias DomainsListByEmailServiceResourceNextResponse
  - Added Type Alias DomainsListByEmailServiceResourceResponse
  - Added Type Alias DomainsProvisioningState
  - Added Type Alias DomainsUpdateResponse
  - Added Type Alias EmailServicesCreateOrUpdateResponse
  - Added Type Alias EmailServicesGetResponse
  - Added Type Alias EmailServicesListByResourceGroupNextResponse
  - Added Type Alias EmailServicesListByResourceGroupResponse
  - Added Type Alias EmailServicesListBySubscriptionNextResponse
  - Added Type Alias EmailServicesListBySubscriptionResponse
  - Added Type Alias EmailServicesListVerifiedExchangeOnlineDomainsResponse
  - Added Type Alias EmailServicesProvisioningState
  - Added Type Alias EmailServicesUpdateResponse
  - Added Type Alias SenderUsernamesCreateOrUpdateResponse
  - Added Type Alias SenderUsernamesGetResponse
  - Added Type Alias SenderUsernamesListByDomainsNextResponse
  - Added Type Alias SenderUsernamesListByDomainsResponse
  - Added Type Alias UserEngagementTracking
  - Added Type Alias VerificationStatus
  - Added Type Alias VerificationType
  - Interface Resource has a new optional parameter systemData
  - Added Enum KnownCheckNameAvailabilityReason
  - Added Enum KnownCommunicationServicesProvisioningState
  - Added Enum KnownDomainManagement
  - Added Enum KnownDomainsProvisioningState
  - Added Enum KnownEmailServicesProvisioningState
  - Added Enum KnownUserEngagementTracking
  - Added Enum KnownVerificationStatus
  - Added Enum KnownVerificationType
  - Added function getContinuationToken

**Breaking Changes**

  - Removed operation group CommunicationService
  - Class CommunicationServiceManagementClient no longer has parameter communicationService
    
## 3.0.1 (2022-04-11)

**features**

  - Bug fix

## 3.0.0 (2022-01-11)

The package of @azure/arm-communication is using our next generation design principles since version 3.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).
