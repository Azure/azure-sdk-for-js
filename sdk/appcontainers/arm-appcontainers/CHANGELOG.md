# Release History

## 2.0.1 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 2.0.0 (2023-08-08)

**Features**

- Added operation group AvailableWorkloadProfiles
- Added operation group BillingMeters
- Added operation group ConnectedEnvironments
- Added operation group ConnectedEnvironmentsCertificates
- Added operation group ConnectedEnvironmentsDaprComponents
- Added operation group ConnectedEnvironmentsStorages
- Added operation group ContainerAppsDiagnostics
- Added operation group Jobs
- Added operation group JobsExecutions
- Added operation group ManagedCertificates
- Added operation group ManagedEnvironmentDiagnostics
- Added operation group ManagedEnvironmentsDiagnostics
- Added operation ContainerApps.beginStart
- Added operation ContainerApps.beginStartAndWait
- Added operation ContainerApps.beginStop
- Added operation ContainerApps.beginStopAndWait
- Added operation ContainerApps.getAuthToken
- Added operation ManagedEnvironments.getAuthToken
- Added operation ManagedEnvironments.listWorkloadProfileStates
- Added Interface AvailableWorkloadProfile
- Added Interface AvailableWorkloadProfileProperties
- Added Interface AvailableWorkloadProfilesCollection
- Added Interface AvailableWorkloadProfilesGetNextOptionalParams
- Added Interface AvailableWorkloadProfilesGetOptionalParams
- Added Interface BaseContainer
- Added Interface BillingMeter
- Added Interface BillingMeterCollection
- Added Interface BillingMeterProperties
- Added Interface BillingMetersGetOptionalParams
- Added Interface ConnectedEnvironment
- Added Interface ConnectedEnvironmentCollection
- Added Interface ConnectedEnvironmentsCertificatesCreateOrUpdateOptionalParams
- Added Interface ConnectedEnvironmentsCertificatesDeleteOptionalParams
- Added Interface ConnectedEnvironmentsCertificatesGetOptionalParams
- Added Interface ConnectedEnvironmentsCertificatesListNextOptionalParams
- Added Interface ConnectedEnvironmentsCertificatesListOptionalParams
- Added Interface ConnectedEnvironmentsCertificatesUpdateOptionalParams
- Added Interface ConnectedEnvironmentsCheckNameAvailabilityOptionalParams
- Added Interface ConnectedEnvironmentsCreateOrUpdateOptionalParams
- Added Interface ConnectedEnvironmentsDaprComponentsCreateOrUpdateOptionalParams
- Added Interface ConnectedEnvironmentsDaprComponentsDeleteOptionalParams
- Added Interface ConnectedEnvironmentsDaprComponentsGetOptionalParams
- Added Interface ConnectedEnvironmentsDaprComponentsListNextOptionalParams
- Added Interface ConnectedEnvironmentsDaprComponentsListOptionalParams
- Added Interface ConnectedEnvironmentsDaprComponentsListSecretsOptionalParams
- Added Interface ConnectedEnvironmentsDeleteHeaders
- Added Interface ConnectedEnvironmentsDeleteOptionalParams
- Added Interface ConnectedEnvironmentsGetOptionalParams
- Added Interface ConnectedEnvironmentsListByResourceGroupNextOptionalParams
- Added Interface ConnectedEnvironmentsListByResourceGroupOptionalParams
- Added Interface ConnectedEnvironmentsListBySubscriptionNextOptionalParams
- Added Interface ConnectedEnvironmentsListBySubscriptionOptionalParams
- Added Interface ConnectedEnvironmentsStoragesCreateOrUpdateOptionalParams
- Added Interface ConnectedEnvironmentsStoragesDeleteOptionalParams
- Added Interface ConnectedEnvironmentsStoragesGetOptionalParams
- Added Interface ConnectedEnvironmentsStoragesListOptionalParams
- Added Interface ConnectedEnvironmentStorage
- Added Interface ConnectedEnvironmentStorageProperties
- Added Interface ConnectedEnvironmentStoragesCollection
- Added Interface ConnectedEnvironmentsUpdateOptionalParams
- Added Interface ContainerAppAuthToken
- Added Interface ContainerAppJobExecutions
- Added Interface ContainerAppsDeleteHeaders
- Added Interface ContainerAppsDiagnosticsGetDetectorOptionalParams
- Added Interface ContainerAppsDiagnosticsGetRevisionOptionalParams
- Added Interface ContainerAppsDiagnosticsGetRootOptionalParams
- Added Interface ContainerAppsDiagnosticsListDetectorsNextOptionalParams
- Added Interface ContainerAppsDiagnosticsListDetectorsOptionalParams
- Added Interface ContainerAppsDiagnosticsListRevisionsNextOptionalParams
- Added Interface ContainerAppsDiagnosticsListRevisionsOptionalParams
- Added Interface ContainerAppsGetAuthTokenOptionalParams
- Added Interface ContainerAppsStartHeaders
- Added Interface ContainerAppsStartOptionalParams
- Added Interface ContainerAppsStopHeaders
- Added Interface ContainerAppsStopOptionalParams
- Added Interface ContainerAppsUpdateHeaders
- Added Interface CorsPolicy
- Added Interface CustomDomainConfiguration
- Added Interface CustomHostnameAnalysisResultCustomDomainVerificationFailureInfo
- Added Interface CustomHostnameAnalysisResultCustomDomainVerificationFailureInfoDetailsItem
- Added Interface DaprConfiguration
- Added Interface DaprSecret
- Added Interface DiagnosticDataProviderMetadata
- Added Interface DiagnosticDataProviderMetadataPropertyBagItem
- Added Interface DiagnosticDataTableResponseColumn
- Added Interface DiagnosticDataTableResponseObject
- Added Interface DiagnosticRendering
- Added Interface Diagnostics
- Added Interface DiagnosticsCollection
- Added Interface DiagnosticsDataApiResponse
- Added Interface DiagnosticsDefinition
- Added Interface DiagnosticsProperties
- Added Interface DiagnosticsStatus
- Added Interface DiagnosticSupportTopic
- Added Interface EnvironmentAuthToken
- Added Interface ErrorAdditionalInfo
- Added Interface ErrorDetail
- Added Interface ErrorResponse
- Added Interface ExtendedLocation
- Added Interface IngressStickySessions
- Added Interface InitContainer
- Added Interface IpSecurityRestrictionRule
- Added Interface Job
- Added Interface JobConfiguration
- Added Interface JobConfigurationEventTriggerConfig
- Added Interface JobConfigurationManualTriggerConfig
- Added Interface JobConfigurationScheduleTriggerConfig
- Added Interface JobExecution
- Added Interface JobExecutionBase
- Added Interface JobExecutionContainer
- Added Interface JobExecutionNamesCollection
- Added Interface JobExecutionOptionalParams
- Added Interface JobExecutionTemplate
- Added Interface JobPatchProperties
- Added Interface JobPatchPropertiesProperties
- Added Interface JobScale
- Added Interface JobScaleRule
- Added Interface JobsCollection
- Added Interface JobsCreateOrUpdateOptionalParams
- Added Interface JobsDeleteHeaders
- Added Interface JobsDeleteOptionalParams
- Added Interface JobSecretsCollection
- Added Interface JobsExecutionsListNextOptionalParams
- Added Interface JobsExecutionsListOptionalParams
- Added Interface JobsGetOptionalParams
- Added Interface JobsListByResourceGroupNextOptionalParams
- Added Interface JobsListByResourceGroupOptionalParams
- Added Interface JobsListBySubscriptionNextOptionalParams
- Added Interface JobsListBySubscriptionOptionalParams
- Added Interface JobsListSecretsOptionalParams
- Added Interface JobsStartHeaders
- Added Interface JobsStartOptionalParams
- Added Interface JobsStopExecutionHeaders
- Added Interface JobsStopExecutionOptionalParams
- Added Interface JobsStopMultipleExecutionsHeaders
- Added Interface JobsStopMultipleExecutionsOptionalParams
- Added Interface JobsUpdateHeaders
- Added Interface JobsUpdateOptionalParams
- Added Interface JobTemplate
- Added Interface KedaConfiguration
- Added Interface ManagedCertificate
- Added Interface ManagedCertificateCollection
- Added Interface ManagedCertificatePatch
- Added Interface ManagedCertificateProperties
- Added Interface ManagedCertificatesCreateOrUpdateOptionalParams
- Added Interface ManagedCertificatesDeleteOptionalParams
- Added Interface ManagedCertificatesGetOptionalParams
- Added Interface ManagedCertificatesListNextOptionalParams
- Added Interface ManagedCertificatesListOptionalParams
- Added Interface ManagedCertificatesUpdateOptionalParams
- Added Interface ManagedEnvironmentDiagnosticsGetDetectorOptionalParams
- Added Interface ManagedEnvironmentDiagnosticsListDetectorsOptionalParams
- Added Interface ManagedEnvironmentPropertiesPeerAuthentication
- Added Interface ManagedEnvironmentsDiagnosticsGetRootOptionalParams
- Added Interface ManagedEnvironmentsGetAuthTokenOptionalParams
- Added Interface ManagedEnvironmentsListWorkloadProfileStatesNextOptionalParams
- Added Interface ManagedEnvironmentsListWorkloadProfileStatesOptionalParams
- Added Interface Mtls
- Added Interface SecretVolumeItem
- Added Interface Service
- Added Interface ServiceBind
- Added Interface TcpScaleRule
- Added Interface WorkloadProfile
- Added Interface WorkloadProfileStates
- Added Interface WorkloadProfileStatesCollection
- Added Interface WorkloadProfileStatesProperties
- Added Type Alias Action
- Added Type Alias Affinity
- Added Type Alias Applicability
- Added Type Alias AvailableWorkloadProfilesGetNextResponse
- Added Type Alias AvailableWorkloadProfilesGetResponse
- Added Type Alias BillingMetersGetResponse
- Added Type Alias ConnectedEnvironmentProvisioningState
- Added Type Alias ConnectedEnvironmentsCertificatesCreateOrUpdateResponse
- Added Type Alias ConnectedEnvironmentsCertificatesGetResponse
- Added Type Alias ConnectedEnvironmentsCertificatesListNextResponse
- Added Type Alias ConnectedEnvironmentsCertificatesListResponse
- Added Type Alias ConnectedEnvironmentsCertificatesUpdateResponse
- Added Type Alias ConnectedEnvironmentsCheckNameAvailabilityResponse
- Added Type Alias ConnectedEnvironmentsCreateOrUpdateResponse
- Added Type Alias ConnectedEnvironmentsDaprComponentsCreateOrUpdateResponse
- Added Type Alias ConnectedEnvironmentsDaprComponentsGetResponse
- Added Type Alias ConnectedEnvironmentsDaprComponentsListNextResponse
- Added Type Alias ConnectedEnvironmentsDaprComponentsListResponse
- Added Type Alias ConnectedEnvironmentsDaprComponentsListSecretsResponse
- Added Type Alias ConnectedEnvironmentsGetResponse
- Added Type Alias ConnectedEnvironmentsListByResourceGroupNextResponse
- Added Type Alias ConnectedEnvironmentsListByResourceGroupResponse
- Added Type Alias ConnectedEnvironmentsListBySubscriptionNextResponse
- Added Type Alias ConnectedEnvironmentsListBySubscriptionResponse
- Added Type Alias ConnectedEnvironmentsStoragesCreateOrUpdateResponse
- Added Type Alias ConnectedEnvironmentsStoragesGetResponse
- Added Type Alias ConnectedEnvironmentsStoragesListResponse
- Added Type Alias ConnectedEnvironmentsUpdateResponse
- Added Type Alias ContainerAppContainerRunningState
- Added Type Alias ContainerAppReplicaRunningState
- Added Type Alias ContainerAppsDiagnosticsGetDetectorResponse
- Added Type Alias ContainerAppsDiagnosticsGetRevisionResponse
- Added Type Alias ContainerAppsDiagnosticsGetRootResponse
- Added Type Alias ContainerAppsDiagnosticsListDetectorsNextResponse
- Added Type Alias ContainerAppsDiagnosticsListDetectorsResponse
- Added Type Alias ContainerAppsDiagnosticsListRevisionsNextResponse
- Added Type Alias ContainerAppsDiagnosticsListRevisionsResponse
- Added Type Alias ContainerAppsGetAuthTokenResponse
- Added Type Alias ContainerAppsStartResponse
- Added Type Alias ContainerAppsStopResponse
- Added Type Alias ContainerAppsUpdateResponse
- Added Type Alias ExtendedLocationTypes
- Added Type Alias IngressClientCertificateMode
- Added Type Alias JobExecutionResponse
- Added Type Alias JobExecutionRunningState
- Added Type Alias JobProvisioningState
- Added Type Alias JobsCreateOrUpdateResponse
- Added Type Alias JobsExecutionsListNextResponse
- Added Type Alias JobsExecutionsListResponse
- Added Type Alias JobsGetResponse
- Added Type Alias JobsListByResourceGroupNextResponse
- Added Type Alias JobsListByResourceGroupResponse
- Added Type Alias JobsListBySubscriptionNextResponse
- Added Type Alias JobsListBySubscriptionResponse
- Added Type Alias JobsListSecretsResponse
- Added Type Alias JobsStartResponse
- Added Type Alias JobsStopMultipleExecutionsResponse
- Added Type Alias JobsUpdateResponse
- Added Type Alias LogLevel
- Added Type Alias ManagedCertificateDomainControlValidation
- Added Type Alias ManagedCertificatesCreateOrUpdateResponse
- Added Type Alias ManagedCertificatesGetResponse
- Added Type Alias ManagedCertificatesListNextResponse
- Added Type Alias ManagedCertificatesListResponse
- Added Type Alias ManagedCertificatesUpdateResponse
- Added Type Alias ManagedEnvironmentDiagnosticsGetDetectorResponse
- Added Type Alias ManagedEnvironmentDiagnosticsListDetectorsResponse
- Added Type Alias ManagedEnvironmentsDiagnosticsGetRootResponse
- Added Type Alias ManagedEnvironmentsGetAuthTokenResponse
- Added Type Alias ManagedEnvironmentsListWorkloadProfileStatesNextResponse
- Added Type Alias ManagedEnvironmentsListWorkloadProfileStatesResponse
- Added Type Alias ManagedEnvironmentsUpdateResponse
- Added Type Alias RevisionRunningState
- Added Type Alias TriggerType
- Interface AzureCredentials has a new optional parameter kind
- Interface CertificateProperties has a new optional parameter subjectAlternativeNames
- Interface Configuration has a new optional parameter maxInactiveRevisions
- Interface Configuration has a new optional parameter service
- Interface ContainerApp has a new optional parameter environmentId
- Interface ContainerApp has a new optional parameter eventStreamEndpoint
- Interface ContainerApp has a new optional parameter extendedLocation
- Interface ContainerApp has a new optional parameter latestReadyRevisionName
- Interface ContainerApp has a new optional parameter managedBy
- Interface ContainerApp has a new optional parameter workloadProfileName
- Interface ContainerAppSecret has a new optional parameter identity
- Interface ContainerAppSecret has a new optional parameter keyVaultUrl
- Interface CustomHostnameAnalysisResult has a new optional parameter conflictWithEnvironmentCustomDomain
- Interface Dapr has a new optional parameter enableApiLogging
- Interface Dapr has a new optional parameter httpMaxRequestSize
- Interface Dapr has a new optional parameter httpReadBufferSize
- Interface Dapr has a new optional parameter logLevel
- Interface DaprComponent has a new optional parameter secretStoreComponent
- Interface GithubActionConfiguration has a new optional parameter githubPersonalAccessToken
- Interface Ingress has a new optional parameter clientCertificateMode
- Interface Ingress has a new optional parameter corsPolicy
- Interface Ingress has a new optional parameter exposedPort
- Interface Ingress has a new optional parameter ipSecurityRestrictions
- Interface Ingress has a new optional parameter stickySessions
- Interface ManagedEnvironment has a new optional parameter customDomainConfiguration
- Interface ManagedEnvironment has a new optional parameter daprConfiguration
- Interface ManagedEnvironment has a new optional parameter eventStreamEndpoint
- Interface ManagedEnvironment has a new optional parameter infrastructureResourceGroup
- Interface ManagedEnvironment has a new optional parameter kedaConfiguration
- Interface ManagedEnvironment has a new optional parameter kind
- Interface ManagedEnvironment has a new optional parameter peerAuthentication
- Interface ManagedEnvironment has a new optional parameter workloadProfiles
- Interface Replica has a new optional parameter initContainers
- Interface Replica has a new optional parameter runningState
- Interface Replica has a new optional parameter runningStateDetails
- Interface ReplicaContainer has a new optional parameter execEndpoint
- Interface ReplicaContainer has a new optional parameter logStreamEndpoint
- Interface ReplicaContainer has a new optional parameter runningState
- Interface ReplicaContainer has a new optional parameter runningStateDetails
- Interface Revision has a new optional parameter lastActiveTime
- Interface Revision has a new optional parameter runningState
- Interface ScaleRule has a new optional parameter tcp
- Interface Secret has a new optional parameter identity
- Interface Secret has a new optional parameter keyVaultUrl
- Interface Template has a new optional parameter initContainers
- Interface Template has a new optional parameter serviceBinds
- Interface Template has a new optional parameter terminationGracePeriodSeconds
- Interface Volume has a new optional parameter mountOptions
- Interface Volume has a new optional parameter secrets
- Interface VolumeMount has a new optional parameter subPath
- Added Enum KnownAction
- Added Enum KnownAffinity
- Added Enum KnownApplicability
- Added Enum KnownConnectedEnvironmentProvisioningState
- Added Enum KnownContainerAppContainerRunningState
- Added Enum KnownContainerAppReplicaRunningState
- Added Enum KnownExtendedLocationTypes
- Added Enum KnownIngressClientCertificateMode
- Added Enum KnownJobExecutionRunningState
- Added Enum KnownJobProvisioningState
- Added Enum KnownLogLevel
- Added Enum KnownManagedCertificateDomainControlValidation
- Added Enum KnownRevisionRunningState
- Added Enum KnownTriggerType
- Enum KnownContainerAppProvisioningState has a new value Deleting
- Enum KnownIngressTransportMethod has a new value Tcp
- Enum KnownStorageType has a new value Secret
- Added function getContinuationToken
- Interface ContainerAppsRevisionsListRevisionsNextOptionalParams no longer has parameter filter

**Breaking Changes**

- Interface VnetConfiguration no longer has parameter runtimeSubnetId
- Type of parameter customDomainVerificationFailureInfo of interface CustomHostnameAnalysisResult is changed from DefaultErrorResponse to CustomHostnameAnalysisResultCustomDomainVerificationFailureInfo
- Type of parameter value of interface DaprSecretsCollection is changed from Secret[] to DaprSecret[]

## 1.1.2 (2022-10-08)

**Bugs Fixed**

- revert credential scopes

## 1.1.1 (2022-09-30)

**Bugs Fixed**

- fix better user experience of credential scopes in government cloud

## 1.1.0 (2022-08-02)

**Features**

- Added Interface AuthConfig
- Added Interface Certificate
- Added Interface ContainerApp
- Added Interface CustomHostnameAnalysisResult
- Added Interface DaprComponent
- Added Interface ManagedEnvironment
- Added Interface ManagedEnvironmentStorage
- Added Interface ProxyResource
- Added Interface Replica
- Added Interface Revision
- Added Interface SourceControl
- Added Interface TrackedResource

## 1.0.0 (2022-05-20)

The package of @azure/arm-appcontainers is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart ).
