# Azure Purview Sharing REST client library for JavaScript

Purview Sharing Client

\*\*If you are not familiar with our REST client, please spend 5 minutes to take a look at our [REST client docs](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/rest-clients.md) to use this library, the REST client provides a light-weighted & developer friendly way to call azure rest api

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/purview/purview-sharing-rest)
- [Package (NPM)](https://www.npmjs.com/package/@azure-rest/purview-sharing)
- [API reference documentation](https://learn.microsoft.com/javascript/api/@azure-rest/purview-sharing?view=azure-node-preview)
- [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/purview/purview-sharing-rest/samples)

## Getting started

### Currently supported environments

- LTS versions of Node.js

### Prerequisites

- You must have an [Azure subscription](https://azure.microsoft.com/free/) to use this package.

### Install the `@azure-rest/purview-sharing` package

Install the Azure Purview Sharing REST client library for JavaScript with `npm`:

```bash
npm install @azure-rest/purview-sharing
```

### Create and authenticate a `PurviewSharingClient`

To use an [Azure Active Directory (AAD) token credential](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-with-a-pre-fetched-access-token),
provide an instance of the desired credential type obtained from the
[@azure/identity](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#credentials) library.

To authenticate with AAD, you must first `npm` install [`@azure/identity`](https://www.npmjs.com/package/@azure/identity)

After setup, you can choose which type of [credential](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#credentials) from `@azure/identity` to use.
As an example, [DefaultAzureCredential](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential)
can be used to authenticate the client.

Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables:
AZURE_CLIENT_ID, AZURE_TENANT_ID, AZURE_CLIENT_SECRET

Use the returned token credential to authenticate the client:

```ts snippet:ReadmeSampleCreateClient_Node
import PurviewSharingClient from "@azure-rest/purview-sharing";
import { DefaultAzureCredential } from "@azure/identity";

const client = PurviewSharingClient(
  "https://<my-account-name>.purview.azure.com",
  new DefaultAzureCredential(),
);
```

## Examples

The following sections provide several code snippets covering some of the most common Purview Sharing scenarios, including:

- Get Recipient for a Given Sent Share

```ts snippet:ReadmeSampleGetRecipientForAGivenSentShare
import PurviewSharingClient, { isUnexpected, paginate } from "@azure-rest/purview-sharing";
import { DefaultAzureCredential } from "@azure/identity";

const client = PurviewSharingClient(
  "https://<my-account-name>.purview.azure.com",
  new DefaultAzureCredential(),
);

const storageAccountResourceId = "<storage-account-resource-id>";
const options = {
  queryParameters: {
    referenceName: storageAccountResourceId,
  },
};
const initialResponse = await client.path("/sentShares").get(options);
if (isUnexpected(initialResponse)) {
  throw initialResponse.body.error;
}

const pageData = paginate(client, initialResponse);
for await (const sharedInvitationOutput of pageData) {
  const sharedInvitationId = sharedInvitationOutput.id;
  if (sharedInvitationId) {
    const sentShareResponse = await client
      .path("/sentShares/{sentShareId}", sharedInvitationId)
      .get();

    if (isUnexpected(sentShareResponse)) {
      throw sentShareResponse.body.error;
    }

    const sentShareId = sentShareResponse.body.id;
    if (sentShareId) {
      const sentShareRecipientResponse = await client
        .path(
          "/sentShares/{sentShareId}/sentShareInvitations/{sentShareInvitationId}",
          sentShareId,
          sharedInvitationId,
        )
        .get();

      if (isUnexpected(sentShareRecipientResponse)) {
        throw sentShareRecipientResponse.body.error;
      }

      const sentShareRecipientId = sentShareRecipientResponse.body.id;
      console.log(`Sent Share Recipient Id: ${sentShareRecipientId}`);
    }
  }
}
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts snippet:SetLogLevel
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).
