# Azure App Configuration client library for JS

Azure App Configuration is a managed service that helps developers centralize their application configurations simply and securely.

Modern programs, especially programs running in a cloud, generally have many components that are distributed in nature. Spreading configuration settings across these components can lead to hard-to-troubleshoot errors during an application deployment. Use App Configuration to securely store all the settings for your application in one place.

Use the client library for App Configuration to:

* Create centrally stored application configuration settings
* Retrieve settings
* Update settings
* Delete settings

[NPM](https://www.npmjs.com/package/@azure/app-configuration) | []() | [Product documentation](https://docs.microsoft.com/en-us/azure/azure-app-configuration/)

## Getting started

### Currently supported environments

- Node.js version 8.x.x or higher

### How to Install

```bash
npm install @azure/app-configuration
```

## Key concepts

### Configuration Setting

A Configuration Setting is the fundamental resource within a Configuration Store.
In its simplest form, it is a key and a value. However, there are additional properties such as 
the modifiable content type and tags fields that allow the value to be interpreted or associated 
in different ways.

The `label` property of a Configuration Setting provides a way to separate configuration settings 
into different dimensions. These dimensions are user defined and can take any form. Some common 
examples of dimensions to use for a label include regions, semantic versions, or environments. 
Many applications have a required set of configuration keys that have varying values as the 
application exists across different dimensions.

For example, MaxRequests may be 100 in "NorthAmerica", and 200 in "WestEurope". By creating a 
Configuration Setting named MaxRequests with a label of "NorthAmerica" and another, only with 
a different value, in the "WestEurope" label, an application can seamlessly retrieve 
Configuration Settings as it runs in these two dimensions.

### How to use

#### nodejs - Authentication, client creation and listConfigurationSettings as an example written in TypeScript.

## Examples

##### Sample code

```typescript
import { AppConfigurationClient } from "@azure/app-configuration";

const connectionString = process.env["AZ_CONFIG_CONNECTION"]!;
const client = new AppConfigurationClient(connectionString);

const label = ["testlabel"];
const key = ["testkey"];
const acceptDateTime = new Date();
const fields = ["etag"];

await client.listConfigurationSettings({
  label,
  key,
  acceptDateTime,
  fields
}).then((result) => {
  console.log("The result is:");
  console.log(result);
});

```

## Troubleshooting

## Next steps

## Contributing

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/appconfiguration/app-config/README.png)
