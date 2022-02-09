# Release History

## 10.1.0 (2022-02-09)

### Features

- Added property `UploadHeaders` to `OutputFileBlobContainerDestination`.
  - Allows users to set custom HTTP headers on resource file uploads.
  - Array of type HttpHeader (also being added).
- Added boolean property `allowTaskPreemption` to `JobSpecification`, `CloudJob`, `JobAddParameter`, `JobPatchParameter`, `JobUpdateParameter`
  - Mark Tasks as preemptible for higher priority Tasks (requires Comms-Enabled or Single Tenant Pool).
- Replaced comment (title, description, etc.) references of "low-priority" with "Spot/Low-Priority", to reflect new service behavior.
  - No API change required.
  - Low-Priority Compute Nodes (VMs) will continue to be used for User Subscription pools (and only User Subscription pools), as before.
  - Spot Compute Nodes (VMs) will now be used for Batch Managed (and only Batch Managed pools) pools.
  - Relevant docs:
      <https://docs.microsoft.com/azure/batch/nodes-and-pools>
    - <https://docs.microsoft.com/azure/batch/batch-spot-vms>


### Bugs Fixed
- Fixed missing SharedKeyCredentials class export.
