targetScope = 'resourceGroup'

resource databaseAccount 'Microsoft.DocumentDB/databaseAccounts@2026-03-15' existing = {
  name: 'databaseaccount-test'
}

resource cassandraKeyspace 'Microsoft.DocumentDB/databaseAccounts/cassandraKeyspaces@2026-03-15' existing = {
  name: 'cassandrakeyspace-test'
  parent: databaseAccount
}

resource table 'Microsoft.DocumentDB/databaseAccounts/cassandraKeyspaces/tables@2026-03-15' existing = {
  name: 'cassandrakeyspacetab-test'
  parent: cassandraKeyspace
}

resource throughputSetting 'Microsoft.DocumentDB/databaseAccounts/cassandraKeyspaces/tables/throughputSettings@2026-03-15' = {
  name: 'default'
  parent: table
  location: 'West US'
  properties: {
    resource: {
      throughput: 400
    }
  }
  tags: {}
}

output resource3Id string = throughputSetting.id
