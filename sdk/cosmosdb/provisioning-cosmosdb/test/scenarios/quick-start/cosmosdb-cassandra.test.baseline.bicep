targetScope = 'resourceGroup'

@description('Cosmos DB account name, max length 44 characters')
param accountName string = format('cassandra-{0}', uniqueString(resourceGroup().id))

@description('Location for the Cosmos DB account.')
param location string = resourceGroup().location

@description('The primary region for the Cosmos DB account.')
param primaryRegion string

@description('The secondary region for the Cosmos DB account.')
param secondaryRegion string

@description('The default consistency level of the Cosmos DB account.')
@allowed([
  'Eventual'
  'ConsistentPrefix'
  'Session'
  'BoundedStaleness'
  'Strong'
])
param defaultConsistencyLevel string = 'Session'

@description('Max stale requests. Required for BoundedStaleness. Valid ranges, Single Region: 10 to 2,147,483,647. Multi Region: 100,000 to 2,147,483,647.')
@minValue(10)
@maxValue(2147483647)
param maxStalenessPrefix int = 100000

@description('Max lag time (seconds). Required for BoundedStaleness. Valid ranges, Single Region: 5 to 84600. Multi Region: 300 to 86400.')
@minValue(5)
@maxValue(86400)
param maxIntervalInSeconds int = 300

@description('Enable system managed failover for regions')
@allowed([
  true
  false
])
param systemManagedFailover bool = true

@description('The name for the Cassandra Keyspace')
param keyspaceName string

@description('The name for the Cassandra table')
param tableName string

var consistencyPolicy = {
  Eventual: {
    defaultConsistencyLevel: 'Eventual'
  }
  ConsistentPrefix: {
    defaultConsistencyLevel: 'ConsistentPrefix'
  }
  Session: {
    defaultConsistencyLevel: 'Session'
  }
  BoundedStaleness: {
    defaultConsistencyLevel: 'BoundedStaleness'
    maxStalenessPrefix: maxStalenessPrefix
    maxIntervalInSeconds: maxIntervalInSeconds
  }
  Strong: {
    defaultConsistencyLevel: 'Strong'
  }
}

var locations = [
  {
    locationName: primaryRegion
    failoverPriority: 0
    isZoneRedundant: false
  }
  {
    locationName: secondaryRegion
    failoverPriority: 1
    isZoneRedundant: false
  }
]

resource databaseAccount 'Microsoft.DocumentDB/databaseAccounts@2026-03-15' = {
  name: toLower(accountName)
  kind: 'GlobalDocumentDB'
  location: location
  properties: {
    capabilities: [
      {
        name: 'EnableCassandra'
      }
    ]
    consistencyPolicy: defaultConsistencyLevel == 'Eventual' ? consistencyPolicy.Eventual : defaultConsistencyLevel == 'ConsistentPrefix' ? consistencyPolicy.ConsistentPrefix : defaultConsistencyLevel == 'Session' ? consistencyPolicy.Session : defaultConsistencyLevel == 'BoundedStaleness' ? consistencyPolicy.BoundedStaleness : consistencyPolicy.Strong
    locations: locations
    databaseAccountOfferType: 'Standard'
    enableAutomaticFailover: systemManagedFailover
  }
}

resource cassandraKeyspace 'Microsoft.DocumentDB/databaseAccounts/cassandraKeyspaces@2026-03-15' = {
  name: keyspaceName
  parent: databaseAccount
  properties: {
    resource: {
      id: keyspaceName
    }
  }
}

resource table 'Microsoft.DocumentDB/databaseAccounts/cassandraKeyspaces/tables@2026-03-15' = {
  name: tableName
  parent: cassandraKeyspace
  properties: {
    resource: {
      id: tableName
      schema: {
        columns: [
          {
            name: 'loadid'
            type: 'uuid'
          }
          {
            name: 'machine'
            type: 'uuid'
          }
          {
            name: 'cpu'
            type: 'int'
          }
          {
            name: 'mtime'
            type: 'int'
          }
          {
            name: 'load'
            type: 'float'
          }
        ]
        partitionKeys: [
          {
            name: 'machine'
          }
          {
            name: 'cpu'
          }
          {
            name: 'mtime'
          }
        ]
        clusterKeys: [
          {
            name: 'loadid'
            orderBy: 'asc'
          }
        ]
      }
    }
  }
}

output resource0Id string = databaseAccount.id

output resource1Id string = cassandraKeyspace.id

output resource2Id string = table.id
