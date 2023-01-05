# Release History

## 2.1.0-beta.5 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 2.1.0-beta.4 (2022-11-16)

  - Bugs Fixed

## 2.1.0-beta.3 (2022-10-08)

**Bugs Fixed**

  -  revert credential scopes

## 2.1.0-beta.2 (2022-09-30)

**Bugs Fixed**

  -  fix better user experience of credential scopes in government cloud

## 2.1.0-beta.1 (2022-09-09)
    
**Features**

  - Added operation group ApiPortalCustomDomains
  - Added operation group ApiPortals
  - Added operation group GatewayCustomDomains
  - Added operation group GatewayRouteConfigs
  - Added operation group Gateways
  - Added operation group Storages
  - Added operation BuildServiceBuilder.listDeployments
  - Added operation Deployments.beginDisableRemoteDebugging
  - Added operation Deployments.beginDisableRemoteDebuggingAndWait
  - Added operation Deployments.beginEnableRemoteDebugging
  - Added operation Deployments.beginEnableRemoteDebuggingAndWait
  - Added operation Deployments.getRemoteDebuggingConfig
  - Added operation Services.beginStart
  - Added operation Services.beginStartAndWait
  - Added operation Services.beginStop
  - Added operation Services.beginStopAndWait
  - Added Interface ApiPortalCustomDomainProperties
  - Added Interface ApiPortalCustomDomainResource
  - Added Interface ApiPortalCustomDomainResourceCollection
  - Added Interface ApiPortalCustomDomainsCreateOrUpdateOptionalParams
  - Added Interface ApiPortalCustomDomainsDeleteOptionalParams
  - Added Interface ApiPortalCustomDomainsGetOptionalParams
  - Added Interface ApiPortalCustomDomainsListNextOptionalParams
  - Added Interface ApiPortalCustomDomainsListOptionalParams
  - Added Interface ApiPortalInstance
  - Added Interface ApiPortalProperties
  - Added Interface ApiPortalResource
  - Added Interface ApiPortalResourceCollection
  - Added Interface ApiPortalResourceRequests
  - Added Interface ApiPortalsCreateOrUpdateOptionalParams
  - Added Interface ApiPortalsDeleteOptionalParams
  - Added Interface ApiPortalsGetOptionalParams
  - Added Interface ApiPortalsListNextOptionalParams
  - Added Interface ApiPortalsListOptionalParams
  - Added Interface ApiPortalsValidateDomainOptionalParams
  - Added Interface AppResource
  - Added Interface AppVNetAddons
  - Added Interface AzureFileVolume
  - Added Interface BindingResource
  - Added Interface Build
  - Added Interface BuilderResource
  - Added Interface BuildpackBindingResource
  - Added Interface BuildResourceRequests
  - Added Interface BuildResult
  - Added Interface BuildResultUserSourceInfo
  - Added Interface BuildService
  - Added Interface BuildServiceAgentPoolResource
  - Added Interface BuildServiceBuilderListDeploymentsOptionalParams
  - Added Interface CertificateResource
  - Added Interface ConfigServerResource
  - Added Interface ConfigurationServiceResource
  - Added Interface ContainerProbeSettings
  - Added Interface ContentCertificateProperties
  - Added Interface CustomContainer
  - Added Interface CustomContainerUserSourceInfo
  - Added Interface CustomDomainResource
  - Added Interface CustomPersistentDiskProperties
  - Added Interface CustomPersistentDiskResource
  - Added Interface DeploymentList
  - Added Interface DeploymentResource
  - Added Interface DeploymentsDisableRemoteDebuggingOptionalParams
  - Added Interface DeploymentsEnableRemoteDebuggingOptionalParams
  - Added Interface DeploymentsGetRemoteDebuggingConfigOptionalParams
  - Added Interface ExecAction
  - Added Interface GatewayApiMetadataProperties
  - Added Interface GatewayApiRoute
  - Added Interface GatewayCorsProperties
  - Added Interface GatewayCustomDomainProperties
  - Added Interface GatewayCustomDomainResource
  - Added Interface GatewayCustomDomainResourceCollection
  - Added Interface GatewayCustomDomainsCreateOrUpdateOptionalParams
  - Added Interface GatewayCustomDomainsDeleteOptionalParams
  - Added Interface GatewayCustomDomainsGetOptionalParams
  - Added Interface GatewayCustomDomainsListNextOptionalParams
  - Added Interface GatewayCustomDomainsListOptionalParams
  - Added Interface GatewayInstance
  - Added Interface GatewayOperatorProperties
  - Added Interface GatewayOperatorResourceRequests
  - Added Interface GatewayProperties
  - Added Interface GatewayResource
  - Added Interface GatewayResourceCollection
  - Added Interface GatewayResourceRequests
  - Added Interface GatewayRouteConfigOpenApiProperties
  - Added Interface GatewayRouteConfigProperties
  - Added Interface GatewayRouteConfigResource
  - Added Interface GatewayRouteConfigResourceCollection
  - Added Interface GatewayRouteConfigsCreateOrUpdateOptionalParams
  - Added Interface GatewayRouteConfigsDeleteOptionalParams
  - Added Interface GatewayRouteConfigsGetOptionalParams
  - Added Interface GatewayRouteConfigsListNextOptionalParams
  - Added Interface GatewayRouteConfigsListOptionalParams
  - Added Interface GatewaysCreateOrUpdateOptionalParams
  - Added Interface GatewaysDeleteOptionalParams
  - Added Interface GatewaysGetOptionalParams
  - Added Interface GatewaysListNextOptionalParams
  - Added Interface GatewaysListOptionalParams
  - Added Interface GatewaysValidateDomainOptionalParams
  - Added Interface HttpGetAction
  - Added Interface ImageRegistryCredential
  - Added Interface IngressConfig
  - Added Interface IngressSettings
  - Added Interface IngressSettingsClientAuth
  - Added Interface JarUploadedUserSourceInfo
  - Added Interface KeyVaultCertificateProperties
  - Added Interface MarketplaceResource
  - Added Interface MonitoringSettingResource
  - Added Interface NetCoreZipUploadedUserSourceInfo
  - Added Interface Probe
  - Added Interface ProbeAction
  - Added Interface ProxyResource
  - Added Interface RemoteDebugging
  - Added Interface RemoteDebuggingPayload
  - Added Interface ServiceRegistryResource
  - Added Interface ServiceResource
  - Added Interface ServicesStartOptionalParams
  - Added Interface ServicesStopOptionalParams
  - Added Interface ServiceVNetAddons
  - Added Interface SourceUploadedUserSourceInfo
  - Added Interface SsoProperties
  - Added Interface StorageAccount
  - Added Interface StorageProperties
  - Added Interface StorageResource
  - Added Interface StorageResourceCollection
  - Added Interface StoragesCreateOrUpdateOptionalParams
  - Added Interface StoragesDeleteOptionalParams
  - Added Interface StoragesGetOptionalParams
  - Added Interface StoragesListNextOptionalParams
  - Added Interface StoragesListOptionalParams
  - Added Interface SupportedBuildpackResource
  - Added Interface SupportedStackResource
  - Added Interface TCPSocketAction
  - Added Interface TrackedResource
  - Added Interface UploadedUserSourceInfo
  - Added Interface UserAssignedManagedIdentity
  - Added Type Alias ApiPortalCustomDomainsCreateOrUpdateResponse
  - Added Type Alias ApiPortalCustomDomainsGetResponse
  - Added Type Alias ApiPortalCustomDomainsListNextResponse
  - Added Type Alias ApiPortalCustomDomainsListResponse
  - Added Type Alias ApiPortalProvisioningState
  - Added Type Alias ApiPortalsCreateOrUpdateResponse
  - Added Type Alias ApiPortalsGetResponse
  - Added Type Alias ApiPortalsListNextResponse
  - Added Type Alias ApiPortalsListResponse
  - Added Type Alias ApiPortalsValidateDomainResponse
  - Added Type Alias BackendProtocol
  - Added Type Alias BuildServiceBuilderListDeploymentsResponse
  - Added Type Alias CertificateResourceProvisioningState
  - Added Type Alias CustomDomainResourceProvisioningState
  - Added Type Alias CustomPersistentDiskPropertiesUnion
  - Added Type Alias DeploymentsDisableRemoteDebuggingResponse
  - Added Type Alias DeploymentsEnableRemoteDebuggingResponse
  - Added Type Alias DeploymentsGetRemoteDebuggingConfigResponse
  - Added Type Alias GatewayCustomDomainsCreateOrUpdateResponse
  - Added Type Alias GatewayCustomDomainsGetResponse
  - Added Type Alias GatewayCustomDomainsListNextResponse
  - Added Type Alias GatewayCustomDomainsListResponse
  - Added Type Alias GatewayProvisioningState
  - Added Type Alias GatewayRouteConfigProtocol
  - Added Type Alias GatewayRouteConfigsCreateOrUpdateResponse
  - Added Type Alias GatewayRouteConfigsGetResponse
  - Added Type Alias GatewayRouteConfigsListNextResponse
  - Added Type Alias GatewayRouteConfigsListResponse
  - Added Type Alias GatewaysCreateOrUpdateResponse
  - Added Type Alias GatewaysGetResponse
  - Added Type Alias GatewaysListNextResponse
  - Added Type Alias GatewaysListResponse
  - Added Type Alias GatewaysValidateDomainResponse
  - Added Type Alias HttpSchemeType
  - Added Type Alias PowerState
  - Added Type Alias ProbeActionType
  - Added Type Alias ProbeActionUnion
  - Added Type Alias SessionAffinity
  - Added Type Alias StoragePropertiesUnion
  - Added Type Alias StoragesCreateOrUpdateResponse
  - Added Type Alias StoragesGetResponse
  - Added Type Alias StoragesListNextResponse
  - Added Type Alias StoragesListResponse
  - Added Type Alias StorageType
  - Added Type Alias Type
  - Interface AppResourceProperties has a new optional parameter customPersistentDisks
  - Interface AppResourceProperties has a new optional parameter ingressSettings
  - Interface AppResourceProperties has a new optional parameter vnetAddons
  - Interface BuildProperties has a new optional parameter resourceRequests
  - Interface CertificateProperties has a new optional parameter provisioningState
  - Interface ClusterResourceProperties has a new optional parameter marketplaceResource
  - Interface ClusterResourceProperties has a new optional parameter powerState
  - Interface ClusterResourceProperties has a new optional parameter vnetAddons
  - Interface CustomDomainProperties has a new optional parameter provisioningState
  - Interface DeploymentSettings has a new optional parameter containerProbeSettings
  - Interface DeploymentSettings has a new optional parameter livenessProbe
  - Interface DeploymentSettings has a new optional parameter readinessProbe
  - Interface DeploymentSettings has a new optional parameter startupProbe
  - Interface DeploymentSettings has a new optional parameter terminationGracePeriodSeconds
  - Interface ManagedIdentityProperties has a new optional parameter userAssignedIdentities
  - Interface NetworkProfile has a new optional parameter ingressConfig
  - Interface NetworkProfile has a new optional parameter outboundType
  - Class AppPlatformManagementClient has a new parameter apiPortalCustomDomains
  - Class AppPlatformManagementClient has a new parameter apiPortals
  - Class AppPlatformManagementClient has a new parameter gatewayCustomDomains
  - Class AppPlatformManagementClient has a new parameter gatewayRouteConfigs
  - Class AppPlatformManagementClient has a new parameter gateways
  - Class AppPlatformManagementClient has a new parameter storages
  - Added Enum KnownApiPortalProvisioningState
  - Added Enum KnownBackendProtocol
  - Added Enum KnownCertificateResourceProvisioningState
  - Added Enum KnownCustomDomainResourceProvisioningState
  - Added Enum KnownGatewayProvisioningState
  - Added Enum KnownGatewayRouteConfigProtocol
  - Added Enum KnownHttpSchemeType
  - Added Enum KnownPowerState
  - Added Enum KnownProbeActionType
  - Added Enum KnownSessionAffinity
  - Added Enum KnownStorageType
  - Added Enum KnownType
    
    
## 2.0.0 (2022-05-19)

The package of @azure/arm-appplatform is using our next generation design principles since version 2.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).
