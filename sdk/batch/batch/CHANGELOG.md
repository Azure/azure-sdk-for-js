# Release History

## 10.1.0 (2022-02-09)

### Features

- Added property `uploadHeaders` to `OutputFileBlobContainerDestination`.
  - Allows users to set custom HTTP headers on resource file uploads.
  - Array of type HttpHeader (also being added).
- Added boolean property `allowTaskPreemption` to `JobSpecification`, `CloudJob`, `JobAddParameter`, `JobPatchParameter`, `JobUpdateParameter`
  - Mark Tasks as preemptible for higher priority Tasks (requires Comms-Enabled or Single Tenant Pool).


### Bugs Fixed
- Fixed missing SharedKeyCredentials class export.
