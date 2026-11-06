targetScope = 'resourceGroup'

resource managedInstance 'Microsoft.Sql/managedInstances@2025-01-01' = {
  name: 'createdatabasesecond'
  location: 'southeastasia'
}

resource database 'Microsoft.Sql/managedInstances/databases@2025-01-01' = {
  name: 'testdb'
  parent: managedInstance
  location: 'southeastasia'
  properties: {
    createMode: 'Secondary'
    sourceDatabaseId: '/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/Default-SQL-NorthEurope/providers/Microsoft.Sql/servers/testsvr1/databases/testdb'
  }
}
