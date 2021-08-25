# Azure Communication Service SIP Routing library for JavaScript

[Azure Communication Services](https://azure.microsoft.com/en-us/services/communication-services/) is a set of rich communication APIs, video APIs, and SMS APIs for deploying your applications across any device, on any platform.

This client library provides access to the SIP routing configuration and is one of the available ACS client libraries.

## Getting started

### Currently supported environments

- Node.js version 8.x or higher

### Prerequisites

- An [Azure subscription][azure_sub].
- An Azure Communication Service (ACS) instance. You can create it e.g., in the Azure Portal or using the script below:

```sh
# If you don't have the az communication extension installed run the following:
az extension add --name communication

# Create the Azure Communication Services resource
az communication create --name "<communicationName>" --location "Global" --data-location "United States" --resource-group "<resourceGroup>"

az communication show --name "<communicationName>" --resource-group "<resourceGroup>"
```

### Install the `@azure/communication-sip-routing` package

Install the SIP routing client library for JavaScript with `npm`:

```bash
npm install @azure/communication-sip-routing
```

### Browser support

#### JavaScript Bundle

To use this client library in the browser, first you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

## Key concepts

### SIPRoutingClient

The SIPRoutingClient can be used to:

- Retrieve an existing SIP routing configuration
- Update the existing SIP routing configuration

## Examples

### Getting an existing SIP routing configuration

```js
const { SipRoutingClient } = require("@azure/communication-sip-routing");

async function main() {
  console.log("== Get SIP Routing Configuration ==");

  // You will need to set this environment variable or edit the following values
  const connectionString =
    process.env.COMMUNICATION_SAMPLES_CONNECTION_STRING ||
    "endpoint=https://<resource-name>.communication.azure.com/;<access-key>";

  // Create a new client
  const client = new SipRoutingClient(connectionString);

  // Get the current configuration
  const config = await client.getSipConfiguration();

  // Print the configururation formatted as JSON into console
  const json = JSON.stringify(config, null, 4);
  console.log(json);
}

main().catch((error) => {
  console.error("Encountered an error while getting configuration: ", error);
  process.exit(1);
});
```

### Updating an existing SIP routing configuration

```js
const { SipRoutingClient } = require("@azure/communication-sip-routing");

async function main() {
  // You will need to set this environment variable or edit the following values
  const connectionString =
    process.env.COMMUNICATION_SAMPLES_CONNECTION_STRING ||
    "endpoint=https://<resource-name>.communication.azure.com/;<access-key>";

  // Create a new client
  const client = new SipRoutingClient(connectionString);

  console.log("== Create an initial configuration ==");

  // Create a new configuration so that we have a record to update in the next step
  const newConfig = {
    trunks: {
      "my-new-trunk.contoso.com": {
        sipSignalingPort: 9999
      }
    }
  };

  // Insert the new config
  await client.updateSipConfiguration(newConfig);

  console.log("== Modify the configuration ==");

  // Modify the config by changing the port number
  const updatedConfig = {
    trunks: {
      "my-new-trunk.contoso.com": {
        sipSignalingPort: 10000
      }
    }
  };

  // Save the modified config
  await client.updateSipConfiguration(updatedConfig);

  console.log("== Delete the configuration ==");

  // Finally, create an entry that deletes the trunk created previously as a clean-up
  const trunkToDelete = {
    trunks: {
      "my-new-trunk.contoso.com": null
    }
  };

  // Delete the trunk by saving the config back.
  await client.updateSipConfiguration(trunkToDelete);

  console.log("== Done ==");
}

main().catch((error) => {
  console.error("Encountered an error while updating configuration: ", error);
  process.exit(1);
});
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/core/logger).

## Next steps

Please take a look at the [samples](https://docs.microsoft.com/en-us/azure/communication-services/samples/overview) directory for detailed examples that demonstrate how to use the client libraries.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
