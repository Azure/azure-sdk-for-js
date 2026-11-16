targetScope = 'resourceGroup'

resource cassandraCluster 'Microsoft.DocumentDB/cassandraClusters@2026-03-15' = {
  name: 'clusterresource-test'
}

resource dataCenter 'Microsoft.DocumentDB/cassandraClusters/dataCenters@2026-03-15' = {
  name: 'datacenter-test'
  parent: cassandraCluster
}

output resource0Id string = cassandraCluster.id

output resource1Id string = dataCenter.id
