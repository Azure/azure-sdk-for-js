# Release History

## 2.0.0 (2026-06-24)

### Features Added
  - Added operation LedgerOperations.beginFilesExport
  - Added operation LedgerOperations.beginFilesExportAndWait
  - Added operation LedgerOperations.create
  - Added operation LedgerOperations.delete
  - Added operation LedgerOperations.filesExport
  - Added operation LedgerOperations.update
  - Class ConfidentialLedgerClient has a new constructor "constructor(credential: TokenCredential, options?: ConfidentialLedgerClientOptionalParams);"
  - Added Interface ConfidentialLedgerFilesExport
  - Added Interface ConfidentialLedgerFilesExportResponse
  - Added Interface LedgerFilesExportOptionalParams
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface RestorePollerOptions
  - Added Interface SimplePollerLike
  - Added Interface TrackedResource
  - Interface LedgerProperties has a new optional parameter applicationType
  - Interface LedgerProperties has a new optional parameter enclavePlatform
  - Interface LedgerProperties has a new optional parameter hostLevel
  - Interface LedgerProperties has a new optional parameter ledgerSku
  - Interface LedgerProperties has a new optional parameter maxBodySizeInMb
  - Interface LedgerProperties has a new optional parameter nodeCount
  - Interface LedgerProperties has a new optional parameter runningState
  - Interface LedgerProperties has a new optional parameter scittConfiguration
  - Interface LedgerProperties has a new optional parameter subjectName
  - Interface LedgerProperties has a new optional parameter workerThreads
  - Interface LedgerProperties has a new optional parameter writeLBAddressPrefix
  - Added Type Alias ApplicationType
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias EnclavePlatform
  - Added Type Alias LedgerSku
  - Added Type Alias RunningState
  - Added Enum AzureClouds
  - Added Enum KnownApplicationType
  - Added Enum KnownEnclavePlatform
  - Added Enum KnownLedgerSku
  - Added Enum KnownRunningState
  - Added Enum KnownVersions

### Breaking Changes
  - Class ConfidentialLedgerClient no longer has parameter apiVersion
  - Class ConfidentialLedgerClient no longer has parameter subscriptionId
  - Removed Interface ConfidentialLedgerList
  - Removed Interface ResourceLocation
  - Removed Interface ResourceProviderOperationList
  - Removed Interface Tags
  - Parameter location of interface ConfidentialLedger is now required

