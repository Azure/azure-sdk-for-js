## Azure Synapse Artifacts client library for JavaScript

This package contains an isomorphic SDK for Artifacts.

## Getting started

### Install the package

```bash
npm install @azure/synapse-artifacts
```

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- Latest versions of Safari, Chrome, Edge, and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

## Key concepts

## Examples

```ts snippet:ReadmeSampleCreateClient_Node

import { ArtifactsClient } from "@azure/synapse-artifacts";
import { DefaultAzureCredential } from "@azure/identity";

const client = new ArtifactsClient(
  new DefaultAzureCredential(),
  "https://mysynapse.dev.azuresynapse.net",
);

const pipelinesByWorkspace = client.pipelineOperations.listPipelinesByWorkspace();
for await (const pipeline of pipelinesByWorkspace) {
  console.log(`Pipeline ID: ${pipeline.id}`);
}
```

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

## Troubleshooting

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts snippet:SetLogLevel

import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

## Next steps

In the future, you'll find additional code samples here.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.
