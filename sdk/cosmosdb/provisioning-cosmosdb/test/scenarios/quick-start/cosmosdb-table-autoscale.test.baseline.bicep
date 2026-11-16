targetScope = 'resourceGroup'

@description('Cosmos DB account name')
param accountName string = format('table-{0}', uniqueString(resourceGroup().id))

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

@description('Max stale requests. Required for BoundedStaleness. Valid ranges, Single Region: 10 to 2147483647. Multi Region: 100000 to 2147483647.')
@minValue(10)
@maxValue(2147483647)
param maxStalenessPrefix int = 100000

@description('Max lag time (seconds). Required for BoundedStaleness. Valid ranges, Single Region: 5 to 84600. Multi Region: 300 to 86400.')
@minValue(5)
@maxValue(86400)
param maxIntervalInSeconds int = 300

@description('Enable system managed failover for regions')
param systemManagedFailover bool = true

@description('The name for the table')
param tableName string

@description('Maximum autoscale throughput for the table')
@minValue(1000)
@maxValue(1000000)
param autoscaleMaxThroughput int = 4000

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
        name: 'EnableTable'
      }
    ]
    consistencyPolicy: defaultConsistencyLevel == 'Eventual' ? consistencyPolicy.Eventual : defaultConsistencyLevel == 'ConsistentPrefix' ? consistencyPolicy.ConsistentPrefix : defaultConsistencyLevel == 'Session' ? consistencyPolicy.Session : defaultConsistencyLevel == 'BoundedStaleness' ? consistencyPolicy.BoundedStaleness : consistencyPolicy.Strong
    locations: locations
    databaseAccountOfferType: 'Standard'
    enableAutomaticFailover: systemManagedFailover
  }
}

resource table 'Microsoft.DocumentDB/databaseAccounts/tables@2026-03-15' = {
  name: tableName
  parent: databaseAccount
  properties: {
    resource: {
      id: tableName
    }
    options: {
      autoscaleSettings: {
        maxThroughput: autoscaleMaxThroughput
      }
    }
  }
}

output resource0Id string = databaseAccount.id

output resource1Id string = table.id
