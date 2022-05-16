# Release History
    
## 1.0.0 (2022-05-16)
    
**Features**

  - Added operation group Namespaces
  - Added operation ContainerApps.beginUpdate
  - Added operation ContainerApps.beginUpdateAndWait
  - Added operation DaprComponents.listSecrets
  - Added operation ManagedEnvironments.beginUpdate
  - Added operation ManagedEnvironments.beginUpdateAndWait
  - Added Interface CheckNameAvailabilityRequest
  - Added Interface CheckNameAvailabilityResponse
  - Added Interface DaprComponentsListSecretsOptionalParams
  - Added Interface DaprSecretsCollection
  - Added Interface NamespacesCheckNameAvailabilityOptionalParams
  - Added Type Alias CheckNameAvailabilityReason
  - Added Type Alias DaprComponentsListSecretsResponse
  - Added Type Alias NamespacesCheckNameAvailabilityResponse
  - Added Type Alias Scheme
  - Interface ContainerAppsRevisionsListRevisionsNextOptionalParams has a new optional parameter filter
  - Interface ContainerAppsRevisionsListRevisionsOptionalParams has a new optional parameter filter
  - Interface ContainerAppsUpdateOptionalParams has a new optional parameter resumeFrom
  - Interface ContainerAppsUpdateOptionalParams has a new optional parameter updateIntervalInMs
  - Interface GithubActionConfiguration has a new optional parameter contextPath
  - Interface GithubActionConfiguration has a new optional parameter image
  - Interface ManagedEnvironmentsUpdateOptionalParams has a new optional parameter resumeFrom
  - Interface ManagedEnvironmentsUpdateOptionalParams has a new optional parameter updateIntervalInMs
  - Interface RegistryCredentials has a new optional parameter identity
  - Interface TrafficWeight has a new optional parameter label
  - Class ContainerAppsAPIClient has a new parameter namespaces
  - Type Alias ManagedEnvironment has a new parameter daprAIConnectionString
  - Type Alias ManagedEnvironment has a new parameter zoneRedundant
  - Added Enum KnownCheckNameAvailabilityReason
  - Added Enum KnownScheme

**Breaking Changes**

  - Removed operation ContainerApps.update
  - Removed operation ManagedEnvironments.update
  - Interface GithubActionConfiguration no longer has parameter dockerfilePath
    
    
## 1.0.0-beta.1 (2022-03-23)

The package of @azure/arm-app is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).
