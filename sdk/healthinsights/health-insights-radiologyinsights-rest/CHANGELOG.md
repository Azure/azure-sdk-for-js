# Release History

## 1.0.0 (2024-05-07)

 - GA release
 
 ### Breaking Changes

- Client Changes
    - POST call replaced with PUT
- Request changes:
    - Renamed createdDateTime into createdAt
    - Patients - Info renamed into Patients - Details
    - Unique ID required to be added in the request parameters
- Response changes:
    - "Datetime" field on FollowupCommunication renamed into "createdAt" field
    - Renamed createdDateTime into createdAt
    - Renamed expirationDateTime into expiresAt
    - Renamed lastUpdateDateTime into updatedAt


## 1.0.0-beta.1 (2024-03-05)
### Other Changes
- Public Preview release
- Test example for Critical Result

The package of @azure-rest/health-insights-radiologyinsights is using our next generation design principles.
- First release of package, see [README](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/healthinsights/health-insights-radiologyinsights-rest/README.md) for details.
- To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).
- To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).
- To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart ).
