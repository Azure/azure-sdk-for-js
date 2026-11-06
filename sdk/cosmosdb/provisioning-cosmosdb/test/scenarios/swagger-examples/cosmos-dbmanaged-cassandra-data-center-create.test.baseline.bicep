targetScope = 'resourceGroup'

resource cassandraCluster 'Microsoft.DocumentDB/cassandraClusters@2026-03-15' existing = {
  name: 'clusterresource-test'
}

resource dataCenter 'Microsoft.DocumentDB/cassandraClusters/dataCenters@2026-03-15' = {
  name: 'datacenter-test'
  parent: cassandraCluster
  properties: {
    dataCenterLocation: 'West US 2'
    delegatedSubnetId: '/subscriptions/536e130b-d7d6-4ac7-98a5-de20d69588d2/resourceGroups/customer-vnet-rg/providers/Microsoft.Network/virtualNetworks/customer-vnet/subnets/dc1-subnet'
    nodeCount: 9
    base64EncodedCassandraYamlFragment: 'Y29tcGFjdGlvbl90aHJvdWdocHV0X21iX3Blcl9zZWM6IDMyCmNvbXBhY3Rpb25fbGFyZ2VfcGFydGl0aW9uX3dhcm5pbmdfdGhyZXNob2xkX21iOiAxMDA='
  }
}

output resource1Id string = dataCenter.id
