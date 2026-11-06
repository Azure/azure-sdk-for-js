targetScope = 'resourceGroup'

resource cassandraCluster 'Microsoft.DocumentDB/cassandraClusters@2026-03-15' = {
  name: 'clusterresource-test'
  location: 'West US'
  properties: {
    delegatedManagementSubnetId: '/subscriptions/536e130b-d7d6-4ac7-98a5-de20d69588d2/resourceGroups/customer-vnet-rg/providers/Microsoft.Network/virtualNetworks/customer-vnet/subnets/management'
    cassandraVersion: '3.11'
    hoursBetweenBackups: 24
    authenticationMethod: 'Cassandra'
    initialCassandraAdminPassword: 'mypassword'
    externalSeedNodes: [
      {
        ipAddress: '10.52.221.2'
      }
      {
        ipAddress: '10.52.221.3'
      }
      {
        ipAddress: '10.52.221.4'
      }
    ]
    clusterNameOverride: 'ClusterNameIllegalForAzureResource'
    clientCertificates: [
      {
        pem: '-----BEGIN CERTIFICATE-----\n...Base64 encoded certificate...\n-----END CERTIFICATE-----'
      }
    ]
    externalGossipCertificates: [
      {
        pem: '-----BEGIN CERTIFICATE-----\n...Base64 encoded certificate...\n-----END CERTIFICATE-----'
      }
    ]
  }
  tags: {}
}

output resource0Id string = cassandraCluster.id
