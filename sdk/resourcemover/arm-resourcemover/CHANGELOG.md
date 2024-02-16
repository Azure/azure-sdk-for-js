# Release History
    
## 2.2.0 (2023-10-24)
    
**Features**

  - Added Type Alias MoveType
  - Interface MoveCollectionProperties has a new optional parameter moveRegion
  - Interface MoveCollectionProperties has a new optional parameter moveType
  - Interface MoveCollectionProperties has a new optional parameter version
  - Interface ResourceSettings has a new optional parameter targetResourceGroupName
  - Added Enum KnownMoveType
  - Class ResourceMoverServiceAPI has a new signature
    
    
## 2.1.0 (2022-12-12)
    
**Features**

  - Added Interface AvailabilitySetResourceSettings
  - Added Interface DiskEncryptionSetResourceSettings
  - Added Interface KeyVaultResourceSettings
  - Added Interface LoadBalancerBackendAddressPoolReference
  - Added Interface LoadBalancerNatRuleReference
  - Added Interface LoadBalancerResourceSettings
  - Added Interface MoveCollectionPropertiesErrors
  - Added Interface MoveResourcePropertiesErrors
  - Added Interface MoveResourcePropertiesMoveStatus
  - Added Interface NetworkInterfaceResourceSettings
  - Added Interface NetworkSecurityGroupResourceSettings
  - Added Interface NsgReference
  - Added Interface ProxyResourceReference
  - Added Interface PublicIPAddressResourceSettings
  - Added Interface PublicIpReference
  - Added Interface ResourceGroupResourceSettings
  - Added Interface SqlDatabaseResourceSettings
  - Added Interface SqlElasticPoolResourceSettings
  - Added Interface SqlServerResourceSettings
  - Added Interface SubnetReference
  - Added Interface VirtualMachineResourceSettings
  - Added Interface VirtualNetworkResourceSettings
  - Interface MoveResourcesListNextOptionalParams no longer has parameter filter
  - Interface UnresolvedDependenciesGetNextOptionalParams no longer has parameter dependencyLevel
  - Interface UnresolvedDependenciesGetNextOptionalParams no longer has parameter filter
  - Interface UnresolvedDependenciesGetNextOptionalParams no longer has parameter orderby
    
## 2.0.1 (2022-04-29)

**Features**

  - Bug fix
    
## 2.0.0 (2022-01-21)

The package of @azure/arm-resourcemover is using our next generation design principles since version 2.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
