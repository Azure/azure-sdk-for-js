# Testing

To test this project, make sure to first build it properly by following our [building instructions](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md#building). Once the project is correctly built, you will be able to run the tests by following the [testing instructions](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md#testing).

The Azure Azure Service Bus client does not have any recorded tests and so, all the tests require an Azure Service Bus namespace to be set up beforehand. Follow the [Integration Testing with live services](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md#integration-testing-with-live-services) instructions to automatically set up the required resources with the proper configuration.

The live tests in this project will use the resources created from the [ARM template](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/servicebus/test-resources.json), which defines:

- A standard [Azure Service Bus namespace](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-messaging-overview#namespaces) with listen, manage and send authorization rules.
- The role of owner to the account creating the resource.

Set the below environment variables to run the tests:

- `TEST_MODE`: Should have `live` assigned.
- `AZURE_CLIENT_ID`: The client ID of an Azure Active Directory application.
- `AZURE_CLIENT_SECRET`: The client secret of an Azure Active Directory application.
- `AZURE_TENANT_ID`: The Tenant ID of your organization in Azure Active Directory.
- `SERVICEBUS_CONNECTION_STRING`: The connection string of your Azure Service Bus account.

The Azure Service Bus client live tests will create queues, topics and subscriptions in the Service Bus namespace provided by the given environment variables.

## Setup for running tests that use AAD based authentication

Go through the following setup in order to correctly setup the AAD credentials for tests that require it.

**Register a new application in AAD**

- Follow [Documentation to register a new application](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app) in the Azure Active Directory(in the azure-portal).
- Note down the `CLIENT_ID` and `TENANT_ID`.
- In the "Certificates & Secrets" tab, create a secret and note that down.

**Assign owner role to the registered application**

- In the azure-portal, go to your servicebus-namespace and assign the **Azure Service Bus Data Owner** role to the registered application.
- This can be done from `Role assignment` section of `Access control (IAM)` tab (in the left-side-navbar of your servicebus-namespace in the azure-portal)<br>
  _Doing this would allow the registered application manage the namespace, i.e., entity creation, deletion, etc.,_<br>
- For more information on Service Bus RBAC setup - [Learn more](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-role-based-access-control)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fservicebus%2Fservice-bus%2Ftest%2FREADME.png)
