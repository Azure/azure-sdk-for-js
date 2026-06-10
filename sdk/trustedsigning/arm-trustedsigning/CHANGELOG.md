# Release History

## 1.0.0-beta.4 (2026-06-10)
Compared with version 1.0.0-beta.2

### Features Added
  - Added operation CertificateProfilesOperations.revokeCertificates
  - Added Interface AccountSkuPatch
  - Added Interface CertificateProfilesRevokeCertificatesOptionalParams
  - Added Interface ErrorAdditionalInfo
  - Added Interface ErrorDetail
  - Added Interface ErrorResponse
  - Added Interface RevokeCertificateList
  - Interface Certificate has a new optional parameter enhancedKeyUsage
  - Interface CertificateProfileProperties has a new optional parameter programType
  - Interface CodeSigningClientOptionalParams has a new optional parameter cloudSetting
  - Added Type Alias AzureSupportedClouds
  - Added Enum AzureClouds
  - Added Enum KnownVersions

### Breaking Changes
  - Removed operation CertificateProfilesOperations.revokeCertificate
  - Operation CodeSigningAccountsOperations.update has a new signature
  - Removed Interface CertificateProfilesRevokeCertificateOptionalParams
  - Interface CheckNameAvailability has a new required parameter type
  - Type of parameter sku of interface CodeSigningAccountPatchProperties is changed from AccountSku to AccountSkuPatch
  - Interface CertificateProfileProperties no longer has parameter city
  - Interface CertificateProfileProperties no longer has parameter commonName
  - Interface CertificateProfileProperties no longer has parameter country
  - Interface CertificateProfileProperties no longer has parameter enhancedKeyUsage
  - Interface CertificateProfileProperties no longer has parameter organization
  - Interface CertificateProfileProperties no longer has parameter organizationUnit
  - Interface CertificateProfileProperties no longer has parameter postalCode
  - Interface CertificateProfileProperties no longer has parameter state
  - Interface CertificateProfileProperties no longer has parameter streetAddress
  - Parameter identityValidationId of interface CertificateProfileProperties is now required

    
## 1.0.0-beta.2 (2024-11-04)

### Bugs Fixed

- Fix missing package information issue in user agent

## 1.0.0-beta.1 (2024-09-29)

### Features Added

Initial release of the Azure TrustedSigning package
