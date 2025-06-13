# Release History
    
## 1.0.0-beta.2 (2025-06-13)
Compared with version 1.0.0-beta.1
    
### Features Added

  - Added Interface HealthResponse
  - Added Interface ServiceInitializationData
  - Interface AvsStatus has a new optional parameter sddcResourceId
  - Interface AzureVmwareService has a new optional parameter sddcResourceId
  - Interface ServiceInitializationHandle has a new optional parameter sddcResourceId

### Breaking Changes

  - Interface AvsStatus no longer has parameter clusterResourceId
  - Interface AzureVmwareService no longer has parameter clusterResourceId
  - Interface ServiceInitializationHandle no longer has parameter clusterResourceId
  - Interface StoragePoolEnableAvsConnectionPost no longer has parameter clusterResourceId
  - Interface StoragePoolEnableAvsConnectionPost has a new required parameter sddcResourceId
  - Type of parameter info of interface ErrorAdditionalInfo is changed from Record<string, any> to any
  - Type of parameter serviceInitializationData of interface StoragePoolFinalizeAvsConnectionPost is changed from ServiceInitializationInfo to ServiceInitializationData
    
    
## 1.0.0-beta.1 (2025-05-29)

### Features Added

Initial release of @azure/arm-purestorageblock
