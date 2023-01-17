# Release History
    
## 4.0.0 (2023-01-17)
    
**Features**

  - Added Type Alias ConnectionType
  - Added function getContinuationToken

**Breaking Changes**

  - Interface ImagesListByLabPlanNextOptionalParams no longer has parameter filter
  - Interface LabPlansListBySubscriptionNextOptionalParams no longer has parameter filter
  - Interface LabsListBySubscriptionNextOptionalParams no longer has parameter filter
  - Interface SchedulesListByLabNextOptionalParams no longer has parameter filter
  - Interface SkusListNextOptionalParams no longer has parameter filter
  - Interface UsagesListByLocationNextOptionalParams no longer has parameter filter
  - Interface UsersListByLabNextOptionalParams no longer has parameter filter
  - Interface VirtualMachinesListByLabNextOptionalParams no longer has parameter filter
  - Type of parameter clientRdpAccess of interface ConnectionProfile is changed from ConnectionType_2 to ConnectionType
  - Type of parameter clientSshAccess of interface ConnectionProfile is changed from ConnectionType_2 to ConnectionType
  - Type of parameter webRdpAccess of interface ConnectionProfile is changed from ConnectionType_2 to ConnectionType
  - Type of parameter webSshAccess of interface ConnectionProfile is changed from ConnectionType_2 to ConnectionType
    
    
## 3.0.0 (2022-08-24)

The package of @azure/arm-labservices is using our next generation design principles since version 3.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).
