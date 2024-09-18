param baseName string = resourceGroup().name
param location string = resourceGroup().location
param isolatedSigningCertificate string = ''
param testApplicationOid string

var contributorRole = 'b24988ac-6180-42a0-ab88-20f7382dd24c'
var isolatedTenantName = 'js${baseName}iso'
var aadTenantName = 'js${baseName}aad'

// AAD Attestation Provider
resource aadAttestationProvider 'Microsoft.Attestation/attestationProviders@2021-06-01' = {
  name: aadTenantName
  location: location
  properties: {}
}

// Isolated Attestation Provider with Policy Signing Certificates
resource isolatedAttestationProvider 'Microsoft.Attestation/attestationProviders@2021-06-01' = {
  name: isolatedTenantName
  location: location
  properties: {
    policySigningCertificates: {
      keys: [
        {
          kty: 'RSA'
          use: 'sig'
          x5c: [
            isolatedSigningCertificate
          ]
        }
      ]
    }
  }
}

// Role Assignment for Test Application
resource roleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(resourceGroup().id, 'roleAssignment')
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', contributorRole)
    principalId: testApplicationOid
  }
}

// Outputs
output ATTESTATION_ISOLATED_URL string = isolatedAttestationProvider.properties.attestUri
output ATTESTATION_AAD_URL string = aadAttestationProvider.properties.attestUri
