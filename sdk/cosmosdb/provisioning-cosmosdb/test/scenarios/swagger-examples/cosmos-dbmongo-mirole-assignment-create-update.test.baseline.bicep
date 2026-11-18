targetScope = 'resourceGroup'

resource databaseAccount 'Microsoft.DocumentDB/databaseAccounts@2026-03-15' existing = {
  name: 'databaseaccount-test'
}

resource mongoMIRoleAssignment 'Microsoft.DocumentDB/databaseAccounts/mongoMIRoleAssignments@2026-03-15' = {
  name: 'mongomiroleassignmen-test'
  parent: databaseAccount
  properties: {
    principalId: 'myPrincipalId'
    roleDefinitionId: '/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/myResourceGroupName/providers/Microsoft.DocumentDB/databaseAccounts/myAccountName/mongoMIRoleDefinitions/myRoleDefinitionId'
    scope: '/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/myResourceGroupName/providers/Microsoft.DocumentDB/databaseAccounts/myAccountName/dbs/purchases/colls/redmond-purchases'
  }
}

output resource1Id string = mongoMIRoleAssignment.id
