targetScope = 'resourceGroup'

resource account 'Microsoft.CognitiveServices/accounts@2026-07-01' existing = {
  name: 'cognitive-account'
}

resource raiBlocklist 'Microsoft.CognitiveServices/accounts/raiBlocklists@2026-07-01' existing = {
  name: 'myblocklist'
  parent: account
}

resource raiBlocklistItem 'Microsoft.CognitiveServices/accounts/raiBlocklists/raiBlocklistItems@2026-07-01' = {
  name: 'accounts-raiblocklists-raiblocklistitems'
  parent: raiBlocklist
  properties: {
    isRegex: true
    pattern: '^[a-z0-9_-]{2,16}$'
  }
}
