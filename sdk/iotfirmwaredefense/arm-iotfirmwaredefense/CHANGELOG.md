# Release History
    
## 2.0.0-beta.1 (2025-04-22)
Compared with version 1.0.0
    
### Features Added

  - Added operation group UsageMetricsOperations
  - Added Interface CvssScore
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface ProxyResource
  - Added Interface Sku
  - Added Interface UsageMetric
  - Added Interface UsageMetricProperties
  - Added Interface UsageMetricsGetOptionalParams
  - Added Interface UsageMetricsListByWorkspaceOptionalParams
  - Added Interface WorkspaceUpdate
  - Added Type Alias CertificateUsage
  - Added Type Alias ContinuablePage
  - Added Type Alias CryptoKeyType
  - Added Type Alias ExecutableClass
  - Added Type Alias SkuTier
  - Interface BinaryHardeningFeatures has a new optional parameter noExecute
  - Interface BinaryHardeningFeatures has a new optional parameter positionIndependentExecutable
  - Interface BinaryHardeningFeatures has a new optional parameter relocationReadOnly
  - Interface BinaryHardeningResult has a new optional parameter executableArchitecture
  - Interface BinaryHardeningResult has a new optional parameter executableClass
  - Interface BinaryHardeningResult has a new optional parameter provisioningState
  - Interface BinaryHardeningResult has a new optional parameter securityHardeningFeatures
  - Interface BinaryHardeningSummaryResource has a new optional parameter notExecutableStackCount
  - Interface BinaryHardeningSummaryResource has a new optional parameter positionIndependentExecutableCount
  - Interface BinaryHardeningSummaryResource has a new optional parameter relocationReadOnlyCount
  - Interface BinaryHardeningSummaryResource has a new optional parameter stackCanaryCount
  - Interface BinaryHardeningSummaryResource has a new optional parameter strippedBinaryCount
  - Interface CryptoCertificate has a new optional parameter certificateKeyAlgorithm
  - Interface CryptoCertificate has a new optional parameter certificateKeySize
  - Interface CryptoCertificate has a new optional parameter certificateName
  - Interface CryptoCertificate has a new optional parameter certificateRole
  - Interface CryptoCertificate has a new optional parameter certificateUsage
  - Interface CryptoCertificate has a new optional parameter provisioningState
  - Interface CryptoCertificateSummaryResource has a new optional parameter expiredCertificateCount
  - Interface CryptoCertificateSummaryResource has a new optional parameter expiringSoonCertificateCount
  - Interface CryptoCertificateSummaryResource has a new optional parameter pairedKeyCount
  - Interface CryptoCertificateSummaryResource has a new optional parameter selfSignedCertificateCount
  - Interface CryptoCertificateSummaryResource has a new optional parameter shortKeySizeCount
  - Interface CryptoCertificateSummaryResource has a new optional parameter totalCertificateCount
  - Interface CryptoCertificateSummaryResource has a new optional parameter weakSignatureCount
  - Interface CryptoKey_2 has a new optional parameter cryptoKeySize
  - Interface CryptoKey_2 has a new optional parameter provisioningState
  - Interface CryptoKeySummaryResource has a new optional parameter pairedKeyCount
  - Interface CryptoKeySummaryResource has a new optional parameter privateKeyCount
  - Interface CryptoKeySummaryResource has a new optional parameter publicKeyCount
  - Interface CryptoKeySummaryResource has a new optional parameter shortKeySizeCount
  - Interface CryptoKeySummaryResource has a new optional parameter totalKeyCount
  - Interface CveResult has a new optional parameter componentId
  - Interface CveResult has a new optional parameter componentName
  - Interface CveResult has a new optional parameter componentVersion
  - Interface CveResult has a new optional parameter cveName
  - Interface CveResult has a new optional parameter cvssScores
  - Interface CveResult has a new optional parameter effectiveCvssScore
  - Interface CveResult has a new optional parameter effectiveCvssVersion
  - Interface CveResult has a new optional parameter provisioningState
  - Interface CveSummary has a new optional parameter criticalCveCount
  - Interface CveSummary has a new optional parameter highCveCount
  - Interface CveSummary has a new optional parameter lowCveCount
  - Interface CveSummary has a new optional parameter mediumCveCount
  - Interface CveSummary has a new optional parameter unknownCveCount
  - Interface PairedKey has a new optional parameter pairedKeyId
  - Interface PasswordHash has a new optional parameter provisioningState
  - Interface SbomComponent has a new optional parameter provisioningState
  - Interface SummaryResourceProperties has a new optional parameter provisioningState
  - Interface Workspace has a new optional parameter sku
  - Added Enum KnownCertificateUsage
  - Added Enum KnownCryptoKeyType
  - Added Enum KnownExecutableClass
  - Added Enum KnownVersions
  - Enum KnownProvisioningState has a new value Analyzing
  - Enum KnownProvisioningState has a new value Extracting
  - Enum KnownProvisioningState has a new value Pending
  - Enum KnownSummaryType has a new value CommonVulnerabilitiesAndExposures
  - Type of parameter keyType of interface CryptoKey_2 is changed from string to CryptoKeyType
  - Type of parameter summaryType of interface CveSummary is changed from "CVE" to "CommonVulnerabilitiesAndExposures"
  - Type of parameter info of interface ErrorAdditionalInfo is changed from Record<string, unknown> to Record<string, any>
  - Type of parameter summaryType of interface SummaryResourceProperties is changed from "Firmware" | "CVE" | "BinaryHardening" | "CryptoCertificate" | "CryptoKey" to SummaryType
  - Type of parameter tags of interface TrackedResource is changed from {
        [propertyName: string]: string;
    } to Record<string, string>

### Breaking Changes

  - Removed operation Firmwares.generateDownloadUrl
  - Removed operation Firmwares.generateFilesystemDownloadUrl
  - Class IoTFirmwareDefenseClient has a new signature
  - Interface BinaryHardeningFeatures no longer has parameter nx
  - Interface BinaryHardeningFeatures no longer has parameter pie
  - Interface BinaryHardeningFeatures no longer has parameter relro
  - Interface BinaryHardeningResult no longer has parameter architecture
  - Interface BinaryHardeningResult no longer has parameter class
  - Interface BinaryHardeningResult no longer has parameter features
  - Interface BinaryHardeningSummaryResource no longer has parameter canary
  - Interface BinaryHardeningSummaryResource no longer has parameter nx
  - Interface BinaryHardeningSummaryResource no longer has parameter pie
  - Interface BinaryHardeningSummaryResource no longer has parameter relro
  - Interface BinaryHardeningSummaryResource no longer has parameter stripped
  - Interface CryptoCertificate no longer has parameter keyAlgorithm
  - Interface CryptoCertificate no longer has parameter keySize
  - Interface CryptoCertificate no longer has parameter name
  - Interface CryptoCertificate no longer has parameter role
  - Interface CryptoCertificate no longer has parameter usage
  - Interface CryptoCertificateSummaryResource no longer has parameter expired
  - Interface CryptoCertificateSummaryResource no longer has parameter expiringSoon
  - Interface CryptoCertificateSummaryResource no longer has parameter pairedKeys
  - Interface CryptoCertificateSummaryResource no longer has parameter selfSigned
  - Interface CryptoCertificateSummaryResource no longer has parameter shortKeySize
  - Interface CryptoCertificateSummaryResource no longer has parameter totalCertificates
  - Interface CryptoCertificateSummaryResource no longer has parameter weakSignature
  - Interface CryptoKey_2 no longer has parameter keySize
  - Interface CryptoKeySummaryResource no longer has parameter pairedKeys
  - Interface CryptoKeySummaryResource no longer has parameter privateKeys
  - Interface CryptoKeySummaryResource no longer has parameter publicKeys
  - Interface CryptoKeySummaryResource no longer has parameter shortKeySize
  - Interface CryptoKeySummaryResource no longer has parameter totalKeys
  - Interface CveResult no longer has parameter component
  - Interface CveResult no longer has parameter cvssScore
  - Interface CveResult no longer has parameter cvssV2Score
  - Interface CveResult no longer has parameter cvssV3Score
  - Interface CveResult no longer has parameter cvssVersion
  - Interface CveResult no longer has parameter name
  - Interface CveSummary no longer has parameter critical
  - Interface CveSummary no longer has parameter high
  - Interface CveSummary no longer has parameter low
  - Interface CveSummary no longer has parameter medium
  - Interface CveSummary no longer has parameter unknown
  - Interface IoTFirmwareDefenseClientOptionalParams no longer has parameter $host
  - Interface IoTFirmwareDefenseClientOptionalParams no longer has parameter endpoint
  - Interface PairedKey no longer has parameter id
  - Class IoTFirmwareDefenseClient no longer has parameter $host
  - Class IoTFirmwareDefenseClient no longer has parameter apiVersion
  - Class IoTFirmwareDefenseClient no longer has parameter subscriptionId
  - Removed Enum KnownSummaryName
  - Enum KnownProvisioningState no longer has value Accepted
  - Enum KnownSummaryType no longer has value CVE
  - Removed function getContinuationToken
    
    
## 1.0.0 (2024-03-08)

The package of @azure/arm-iotfirmwaredefense is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart ).
