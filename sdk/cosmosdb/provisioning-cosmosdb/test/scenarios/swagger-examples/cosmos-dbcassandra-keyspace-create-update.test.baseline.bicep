targetScope = 'resourceGroup'

resource databaseAccount 'Microsoft.DocumentDB/databaseAccounts@2026-03-15' existing = {
  name: 'databaseaccount-test'
}

resource cassandraKeyspace 'Microsoft.DocumentDB/databaseAccounts/cassandraKeyspaces@2026-03-15' = {
  name: 'cassandrakeyspace-test'
  parent: databaseAccount
  location: 'West US'
  properties: {
    resource: {
      id: 'keyspaceName'
    }
    options: {}
  }
  tags: {}
}

output resource1Id string = cassandraKeyspace.id
