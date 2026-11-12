targetScope = 'resourceGroup'

resource account 'Microsoft.CognitiveServices/accounts@2026-07-01' existing = {
  name: 'cognitive-account'
}

resource managedNetwork 'Microsoft.CognitiveServices/accounts/managedNetworks@2026-07-01' = {
  name: 'default'
  parent: account
  properties: {
    managedNetwork: {
      isolationMode: 'AllowOnlyApprovedOutbound'
      firewallSku: 'Standard'
      managedNetworkKind: 'V1'
    }
  }
}
