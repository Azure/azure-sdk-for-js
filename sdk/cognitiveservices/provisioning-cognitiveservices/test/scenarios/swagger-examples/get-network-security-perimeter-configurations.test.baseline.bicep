targetScope = 'resourceGroup'

resource account 'Microsoft.CognitiveServices/accounts@2026-07-01' existing = {
  name: 'cognitive-account'
}

resource networkSecurityPerimeterConfiguration 'Microsoft.CognitiveServices/accounts/networkSecurityPerimeterConfigurations@2026-07-01' existing = {
  name: 'NSPConfigurationName'
  parent: account
}
