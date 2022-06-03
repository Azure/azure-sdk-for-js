# Azure Notification Hubs SDK for JavaScript

Azure Notification Hubs provide a scaled-out push engine that enables you to send notifications to any platform (Apple, Android, Web, Windows, etc.) from any back-end (cloud or on-premises). Notification Hubs works great for both enterprise and consumer scenarios. Here are a few example scenarios:

- Send breaking news notifications to millions with low latency.
- Send location-based coupons to interested user segments.
- Send event-related notifications to users or groups for media/sports/finance/gaming applications.
- Push promotional contents to applications to engage and market to customers.
- Notify users of enterprise events such as new messages and work items.
- Send codes for multi-factor authentication.

[Source code](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/) |
[Package (NPM)](https://www.npmjs.com/package/@azure/notification-hubs) |
[API reference documentation](https://docs.microsoft.com/javascript/api/@azure/notification-hubs) |
[Product documentation](https://docs.microsoft.com/azure/azure-notification-hubs/) |
[Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/notificationhubs/notification-hubs/samples)

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://nodejs.org/about/releases/)
- Latest versions of Safari, Chrome, Edge, and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Install the package

```bash
npm install @azure/notification-hubs
```

### Prerequisites

- An [Azure Subscription](https://azure.microsoft.com)
- An [App Notification Hubs](https://docs.microsoft.com/azure/notification-hubs/) resource.

### Create an Azure Notification Hubs resource

TBD

### Authenticate the client

AppConfigurationClient can authenticate using a [service principal](#authenticating-with-a-service-principal) or using a [connection string](#authenticating-with-a-connection-string).

#### Authenticating with a connection string

To get the Primary **connection string** for an App Configuration resource you can use this Azure CLI command:

```
az appconfig credential list -g <resource-group-name> -n <notification-hubs-resource-name> --query "([?name=='Primary'].connectionString)[0]"
```

And in code you can now create your App Configuration client with the **connection string** you got from the Azure CLI:

```typescript
const client = new NotificationHubsClient("<connection string>", "<hub name>");
```

## Key concepts

TBD

## Next steps

The following samples show you the various ways you can interact with Azure Notification Hubs:

TBD

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

This module's tests are a mixture of live and unit tests, which require you to have an Azure App Configuration instance. To execute the tests you'll need to run:

1. `rush update`
2. `rush build -t @azure/notification-hubs`
3. Create a .env file with these contents in the `sdk\appconfiguration\notification-hubs` folder:
   `APPCONFIG_CONNECTION_STRING=connection string for your App Configuration instance`
4. `cd sdk\appconfiguration\notification-hubs`
5. `npm run test`.

View our [tests](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/test)
folder for more details.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)
- [Azure App Configuration](https://docs.microsoft.com/azure/azure-notification-hubs/overview)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fappconfiguration%2Fnotification-hubs%2FREADME.png)
