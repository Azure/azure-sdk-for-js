# Release History
    
## 1.0.0-beta.2 (2022-04-11)
    
**Features**

  - Added operation LoadTests.beginCreateOrUpdate
  - Added operation LoadTests.beginCreateOrUpdateAndWait
  - Added operation LoadTests.beginUpdate
  - Added operation LoadTests.beginUpdateAndWait
  - Added Interface EncryptionProperties
  - Added Interface EncryptionPropertiesIdentity
  - Added Interface ManagedServiceIdentity
  - Added Interface UserAssignedIdentity
  - Added Type Alias ManagedServiceIdentityType
  - Added Type Alias Type
  - Interface LoadTestResourcePatchRequestBody has a new optional parameter description
  - Interface LoadTestResourcePatchRequestBody has a new optional parameter encryption
  - Interface LoadTestsCreateOrUpdateOptionalParams has a new optional parameter resumeFrom
  - Interface LoadTestsCreateOrUpdateOptionalParams has a new optional parameter updateIntervalInMs
  - Interface LoadTestsUpdateOptionalParams has a new optional parameter resumeFrom
  - Interface LoadTestsUpdateOptionalParams has a new optional parameter updateIntervalInMs
  - Type Alias LoadTestResource has a new parameter encryption
  - Added Enum KnownManagedServiceIdentityType
  - Added Enum KnownType

**Breaking Changes**

  - Removed operation LoadTests.createOrUpdate
  - Removed operation LoadTests.update
  - Interface LoadTestResourcePatchRequestBody no longer has parameter properties
  - Removed Enum KnownSystemAssignedServiceIdentityType
    
    
## 1.0.0-beta.1 (2021-12-08)

- Initial Release
