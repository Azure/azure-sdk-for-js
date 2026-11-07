targetScope = 'resourceGroup'

resource account 'Microsoft.CognitiveServices/accounts@2026-07-01' existing = {
  name: 'cognitive-account'
}

resource managedNetwork 'Microsoft.CognitiveServices/accounts/managedNetworks@2026-07-01' existing = {
  name: 'default'
  parent: account
}

resource outboundRule 'Microsoft.CognitiveServices/accounts/managedNetworks/outboundRules@2026-07-01' = {
  name: 'rule_name_1'
  parent: managedNetwork
  properties: {
    type: 'FQDN'
    category: 'UserDefined'
    destination: 'destination_endpoint'
  }
}
