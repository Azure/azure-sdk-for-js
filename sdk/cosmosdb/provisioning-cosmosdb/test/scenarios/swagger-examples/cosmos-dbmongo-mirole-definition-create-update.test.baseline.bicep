targetScope = 'resourceGroup'

resource databaseAccount 'Microsoft.DocumentDB/databaseAccounts@2026-03-15' existing = {
  name: 'databaseaccount-test'
}

resource mongoMIRoleDefinition 'Microsoft.DocumentDB/databaseAccounts/mongoMIRoleDefinitions@2026-03-15' = {
  name: 'mongomiroledefinitio-test'
  parent: databaseAccount
  properties: {
    type: 'CustomRole'
    assignableScopes: [
      '/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/myResourceGroupName/providers/Microsoft.DocumentDB/databaseAccounts/myAccountName/dbs/sales'
      '/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/myResourceGroupName/providers/Microsoft.DocumentDB/databaseAccounts/myAccountName/dbs/purchases'
    ]
    permissions: [
      {
        dataActions: [
          'Microsoft.DocumentDB/databaseAccounts/mongoMIDatabases/containers/entities/create'
          'Microsoft.DocumentDB/databaseAccounts/mongoMIDatabases/containers/entities/read'
        ]
        notDataActions: []
      }
    ]
    roleName: 'myRoleName'
  }
}

output resource1Id string = mongoMIRoleDefinition.id
