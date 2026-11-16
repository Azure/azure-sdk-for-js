targetScope = 'resourceGroup'

resource databaseAccount 'Microsoft.DocumentDB/databaseAccounts@2026-03-15' existing = {
  name: 'databaseaccount-test'
}

resource sqlDatabase 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases@2026-03-15' existing = {
  name: 'sqldatabase-test'
  parent: databaseAccount
}

resource clientEncryptionKey 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/clientEncryptionKeys@2026-03-15' = {
  name: 'clientencryptionkey-test'
  parent: sqlDatabase
  properties: {
    resource: {
      id: 'cekName'
      encryptionAlgorithm: 'AEAD_AES_256_CBC_HMAC_SHA256'
      wrappedDataEncryptionKey: 'U3dhZ2dlciByb2Nrcw=='
      keyWrapMetadata: {
        name: 'customerManagedKey'
        type: 'AzureKeyVault'
        value: 'AzureKeyVault Key URL'
        algorithm: 'RSA-OAEP'
      }
    }
  }
}

output resource2Id string = clientEncryptionKey.id
