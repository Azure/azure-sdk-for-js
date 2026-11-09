targetScope = 'resourceGroup'

resource databaseAccount 'Microsoft.DocumentDB/databaseAccounts@2026-03-15' existing = {
  name: 'databaseaccount-test'
}

resource cassandraRoleAssignment 'Microsoft.DocumentDB/databaseAccounts/cassandraRoleAssignments@2026-03-15' = {
  name: 'cassandraroleassignm-test'
  parent: databaseAccount
  properties: {
    principalId: 'myPrincipalId'
    roleDefinitionId: '/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/myResourceGroupName/providers/Microsoft.DocumentDB/databaseAccounts/myAccountName/cassandraRoleDefinitions/myRoleDefinitionId'
    scope: '/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/myResourceGroupName/providers/Microsoft.DocumentDB/databaseAccounts/myAccountName/dbs/purchases/colls/redmond-purchases'
  }
}

output resource1Id string = cassandraRoleAssignment.id
