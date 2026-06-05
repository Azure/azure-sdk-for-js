# @azure/arm-tenantactivitylogalerts client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-tenantactivitylogalerts in some common scenarios.

| **File Name**                                                                                               | **Description**                                                                                                                                                                                                                                                                                          |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [tenantActivityLogAlertsCreateOrUpdateSample.js][tenantactivitylogalertscreateorupdatesample]               | create a new Tenant Activity Log Alert rule or update an existing one. x-ms-original-file: 2023-04-01-preview/TenantActivityLogAlertRule_CreateOrUpdate.json                                                                                                                                             |
| [tenantActivityLogAlertsDeleteSample.js][tenantactivitylogalertsdeletesample]                               | delete a Tenant Activity Log Alert rule. x-ms-original-file: 2023-04-01-preview/TenantActivityLogAlertRule_DeleteRule.json                                                                                                                                                                               |
| [tenantActivityLogAlertsGetSample.js][tenantactivitylogalertsgetsample]                                     | get Tenant Activity Log Alert rule. x-ms-original-file: 2023-04-01-preview/TenantActivityLogAlertRule_GetRule.json                                                                                                                                                                                       |
| [tenantActivityLogAlertsListByManagementGroupSample.js][tenantactivitylogalertslistbymanagementgroupsample] | get a list of all Tenant Activity Log Alert rules in a management group. x-ms-original-file: 2023-04-01-preview/TenantActivityLogAlertRule_ListByManagementGroup.json                                                                                                                                    |
| [tenantActivityLogAlertsListByTenantSample.js][tenantactivitylogalertslistbytenantsample]                   | get a list of all Tenant Activity Log Alert rules in the tenant. x-ms-original-file: 2023-04-01-preview/TenantActivityLogAlertRule_ListByTenant.json                                                                                                                                                     |
| [tenantActivityLogAlertsUpdateSample.js][tenantactivitylogalertsupdatesample]                               | updates 'tags' and 'enabled' fields in an existing Tenant Alert rule. This method is used to update the Alert rule tags, and to enable or disable the Alert rule. To update other fields use CreateOrUpdate operation. x-ms-original-file: 2023-04-01-preview/TenantActivityLogAlertRule_UpdateRule.json |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

You need [an Azure subscription][freesub] to run these sample programs.

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

3. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node tenantActivityLogAlertsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node tenantActivityLogAlertsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[tenantactivitylogalertscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/tenantactivitylogalerts/arm-tenantactivitylogalerts/samples/v1-beta/javascript/tenantActivityLogAlertsCreateOrUpdateSample.js
[tenantactivitylogalertsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/tenantactivitylogalerts/arm-tenantactivitylogalerts/samples/v1-beta/javascript/tenantActivityLogAlertsDeleteSample.js
[tenantactivitylogalertsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/tenantactivitylogalerts/arm-tenantactivitylogalerts/samples/v1-beta/javascript/tenantActivityLogAlertsGetSample.js
[tenantactivitylogalertslistbymanagementgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/tenantactivitylogalerts/arm-tenantactivitylogalerts/samples/v1-beta/javascript/tenantActivityLogAlertsListByManagementGroupSample.js
[tenantactivitylogalertslistbytenantsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/tenantactivitylogalerts/arm-tenantactivitylogalerts/samples/v1-beta/javascript/tenantActivityLogAlertsListByTenantSample.js
[tenantactivitylogalertsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/tenantactivitylogalerts/arm-tenantactivitylogalerts/samples/v1-beta/javascript/tenantActivityLogAlertsUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-tenantactivitylogalerts?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/tenantactivitylogalerts/arm-tenantactivitylogalerts/README.md
