# Release History

## 10.2.0 (2022-10-01)

### Features

- Added new custom enum type `NodeCommunicationMode`.
  - This property determines how a pool communicates with the Batch service.
  - Possible values: default, classic, simplified.
- Added properties `currentNodeCommunicationMode` and `targetNodeCommunicationMode` of type `NodeCommunicationMode` to `CloudPool`.
- Added property `targetNodeCommunicationMode` of type `NodeCommunicationMode` to `PoolSpecification`, `PoolAddParameter`, `PoolPatchParameter`, and `PoolUpdatePropertiesParameter`.

### Other Changes

- Modified descriptions of the `applicationPackageReferences`, `uploadHeaders`, and `name` (UserAccount) properties.


## 10.1.0 (2022-02-09)

### Features

- Added property `uploadHeaders` to `OutputFileBlobContainerDestination`.
  - Allows users to set custom HTTP headers on resource file uploads.
  - Array of type HttpHeader (also being added).
- Added boolean property `allowTaskPreemption` to `JobSpecification`, `CloudJob`, `JobAddParameter`, `JobPatchParameter`, `JobUpdateParameter`
  - Mark Tasks as preemptible for higher priority Tasks (requires Comms-Enabled or Single Tenant Pool).


### Bugs Fixed
- Fixed missing SharedKeyCredentials class export.
