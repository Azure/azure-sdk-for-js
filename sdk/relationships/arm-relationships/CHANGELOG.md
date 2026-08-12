# Release History

## 1.0.0-beta.2 (2026-08-12)
Compared with version 1.0.0-beta.1

### Features Added
  - Added operation group ContainsRelationshipsOperations
  - Added operation DependencyOfRelationshipsOperations.listByParent
  - Added operation ServiceGroupMemberRelationshipsOperations.listByParent
  - Class RelationshipsClient has a new constructor "constructor(credential: TokenCredential, subscriptionId: string, options?: RelationshipsClientOptionalParams);"
  - Added Interface ContainsRelationship
  - Added Interface ContainsRelationshipProperties
  - Added Interface ContainsRelationshipsListByResourceGroupOptionalParams
  - Added Interface ContainsRelationshipsListBySubscriptionOptionalParams
  - Added Interface DependencyOfRelationshipsListByParentOptionalParams
  - Added Interface ServiceGroupMemberRelationshipPropertiesV2
  - Added Interface ServiceGroupMemberRelationshipsListByParentOptionalParams
  - Interface ServiceGroupMemberRelationshipPropertiesCreateOrUpdate has a new optional parameter sourceTenant
  - Enum KnownVersions has a new value V20230901Preview
  - Enum KnownVersions has a new value V20260301Preview

### Breaking Changes
  - Operation DependencyOfRelationshipsOperations.get has a new signature
  - Operation ServiceGroupMemberRelationshipsOperations.createOrUpdate has a new signature
  - Operation ServiceGroupMemberRelationshipsOperations.get has a new signature
  - Removed Interface ServiceGroupMemberRelationshipProperties
  - Interface ServiceGroupMemberRelationshipPropertiesCreateOrUpdate has a new required parameter sourceId
  - Type of parameter properties of interface ServiceGroupMemberRelationship is changed from ServiceGroupMemberRelationshipProperties to ServiceGroupMemberRelationshipPropertiesV2
  - Interface ServiceGroupMemberRelationshipPropertiesCreateOrUpdate no longer has parameter targetId
  - Interface ServiceGroupMemberRelationshipPropertiesCreateOrUpdate no longer has parameter targetTenant
  - Parameter metadata of interface DependencyOfRelationshipProperties is now optional
  - Parameter originInformation of interface DependencyOfRelationshipProperties is now optional
  - Parameter sourceId of interface DependencyOfRelationshipProperties is now optional
  - Enum KnownVersions no longer has value Versions20230901Preview

    
## 1.0.0-beta.1 (2026-04-03)

### Features Added

Initial release of the @azure/arm-relationships package
