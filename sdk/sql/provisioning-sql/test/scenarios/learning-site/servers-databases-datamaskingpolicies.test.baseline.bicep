targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'serversdatabasesdata'
  location: 'eastus'
}

resource database 'Microsoft.Sql/servers/databases@2025-01-01' = {
  name: 'serversdatabasesdata'
  parent: server
  location: 'eastus'
}

resource dataMaskingPolicy 'Microsoft.Sql/servers/databases/dataMaskingPolicies@2025-01-01' = {
  name: 'Default'
  parent: database
}
