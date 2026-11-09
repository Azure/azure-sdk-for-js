targetScope = 'resourceGroup'

@description('Location for all resources.')
param location string = resourceGroup().location

@description('Cosmos DB account name, max length 44 characters')
param accountName string = toLower(format('sql-rbac-{0}', uniqueString(resourceGroup().id)))

@description('Friendly name for the SQL Role Definition')
param roleDefinitionName string = 'My Read Write Role'

@description('Data actions permitted by the Role Definition')
param dataActions array = [
  'Microsoft.DocumentDB/databaseAccounts/readMetadata'
  'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/items/*'
]

@description('Object ID of the AAD identity. Must be a GUID.')
param principalId string

var locations = [
  {
    locationName: location
    failoverPriority: 0
    isZoneRedundant: false
  }
]

var roleDefinitionId = guid('sql-role-definition-', principalId, resourceId('Microsoft.DocumentDB/databaseAccounts', accountName))

var roleAssignmentId = guid(roleDefinitionId, principalId, resourceId('Microsoft.DocumentDB/databaseAccounts', accountName))

resource databaseAccount 'Microsoft.DocumentDB/databaseAccounts@2026-03-15' = {
  name: accountName
  kind: 'GlobalDocumentDB'
  location: location
  properties: {
    consistencyPolicy: {
      defaultConsistencyLevel: 'Session'
    }
    locations: locations
    databaseAccountOfferType: 'Standard'
    enableAutomaticFailover: false
    enableMultipleWriteLocations: false
  }
}

resource sqlRoleDefinition 'Microsoft.DocumentDB/databaseAccounts/sqlRoleDefinitions@2026-03-15' = {
  name: roleDefinitionId
  parent: databaseAccount
  properties: {
    roleName: roleDefinitionName
    type: 'CustomRole'
    assignableScopes: [
      resourceId('Microsoft.DocumentDB/databaseAccounts', accountName)
    ]
    permissions: [
      {
        dataActions: dataActions
      }
    ]
  }
}

resource sqlRoleAssignment 'Microsoft.DocumentDB/databaseAccounts/sqlRoleAssignments@2026-03-15' = {
  name: roleAssignmentId
  parent: databaseAccount
  properties: {
    roleDefinitionId: sqlRoleDefinition.id
    principalId: principalId
    scope: resourceId('Microsoft.DocumentDB/databaseAccounts', accountName)
  }
}

output resource0Id string = databaseAccount.id

output resource1Id string = sqlRoleDefinition.id

output resource2Id string = sqlRoleAssignment.id
