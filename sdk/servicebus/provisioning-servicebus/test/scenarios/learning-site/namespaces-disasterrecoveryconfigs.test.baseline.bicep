targetScope = 'resourceGroup'

resource namespace 'Microsoft.ServiceBus/namespaces@2026-01-01' = {
  name: 'acctest0001ns1'
  location: 'westus'
  properties: {
    disableLocalAuth: false
    minimumTlsVersion: '1.2'
    premiumMessagingPartitions: 1
    publicNetworkAccess: 'Enabled'
  }
  sku: {
    capacity: 1
    name: 'Premium'
    tier: 'Premium'
  }
}

resource disasterRecoveryConfig 'Microsoft.ServiceBus/namespaces/disasterRecoveryConfigs@2026-01-01' = {
  name: 'acctest0001alias'
  parent: namespace
  properties: {
    partnerNamespace: namespace2.id
  }
}

resource namespace2 'Microsoft.ServiceBus/namespaces@2026-01-01' = {
  name: 'acctest0001ns2'
  location: 'centralus'
  properties: {
    disableLocalAuth: false
    minimumTlsVersion: '1.2'
    premiumMessagingPartitions: 1
    publicNetworkAccess: 'Enabled'
  }
  sku: {
    capacity: 1
    name: 'Premium'
    tier: 'Premium'
  }
}
