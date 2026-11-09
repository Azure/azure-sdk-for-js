targetScope = 'resourceGroup'

resource databaseAccount 'Microsoft.DocumentDB/databaseAccounts@2026-03-15' existing = {
  name: 'databaseaccount-test'
}

resource cassandraKeyspace 'Microsoft.DocumentDB/databaseAccounts/cassandraKeyspaces@2026-03-15' existing = {
  name: 'cassandrakeyspace-test'
  parent: databaseAccount
}

resource throughputSetting 'Microsoft.DocumentDB/databaseAccounts/cassandraKeyspaces/throughputSettings@2026-03-15' = {
  name: 'default'
  parent: cassandraKeyspace
  location: 'West US'
  properties: {
    resource: {
      throughput: 400
    }
  }
  tags: {}
}

output resource2Id string = throughputSetting.id
