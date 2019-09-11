# Azure App Configuration client library for JS

Azure App Configuration is a managed service that helps developers centralize their application configurations simply and securely.

Modern programs, especially programs running in a cloud, generally have many components that are distributed in nature. Spreading configuration settings across these components can lead to hard-to-troubleshoot errors during an application deployment. Use App Configuration to securely store all the settings for your application in one place.

Use the client library for App Configuration to create and manage application configuration settings.

## Getting started

### Currently supported environments

- Node.js version 8.x.x or higher
- Browser JavaScript

### How to Install

```bash
npm install @azure/app-configuration
```
## Key concepts

### How to use

#### nodejs - Authentication, client creation and listConfigurationSettings  as an example written in TypeScript.

##### Install @azure/ms-rest-nodeauth

```bash
npm install @azure/ms-rest-nodeauth
```

## Examples

##### Sample code

```typescript
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
import { ConfigurationClient, ConfigurationModels, ConfigurationMappers } from "@azure/app-configuration";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

msRestNodeAuth.interactiveLogin().then((creds) => {
  const client = new ConfigurationClient(creds, subscriptionId);
  const label = ["testlabel"];
  const key = ["testkey"];
  const acceptDateTime = new Date().toISOString();
  const fields = ["etag"];
  client.listConfigurationSettings(label, key, acceptDateTime, fields).then((result) => {
    console.log("The result is:");
    console.log(result);
  });
}).catch((err) => {
  console.error(err);
});
```

## Troubleshooting

## Next steps

## Contributing

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/appconfiguration/app-config/README.png)
