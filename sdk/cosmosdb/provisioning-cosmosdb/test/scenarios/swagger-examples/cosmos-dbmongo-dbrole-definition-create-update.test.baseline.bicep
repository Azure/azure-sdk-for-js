targetScope = 'resourceGroup'

resource databaseAccount 'Microsoft.DocumentDB/databaseAccounts@2026-03-15' existing = {
  name: 'databaseaccount-test'
}

resource mongodbRoleDefinition 'Microsoft.DocumentDB/databaseAccounts/mongodbRoleDefinitions@2026-03-15' = {
  name: 'mongoroledefinitiong-test'
  parent: databaseAccount
  properties: {
    roleName: 'myRoleName'
    databaseName: 'sales'
    privileges: [
      {
        resource: {
          db: 'sales'
          collection: 'sales'
        }
        actions: [
          'insert'
          'find'
        ]
      }
    ]
    roles: [
      {
        role: 'myInheritedRole'
        db: 'sales'
      }
    ]
  }
}

output resource1Id string = mongodbRoleDefinition.id
