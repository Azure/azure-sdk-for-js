# Customization on the RLC rest-level client libraries

There are cases where an RLC will require customizations, we have identified a few common cases which we'll present next. Our customization strategy has the following principles:

- Expose custom functionality as helper functions that users can opt-in
- Never force customers to use a customized function or operation
- The only exception is if we need to add custom policies to the client, it is okay to wrap the generated client factory and exposed the wrapped factory instead of the generated one.

## Generate RLC Client

Follow [Quickstart](https://aka.ms/azsdk/rlc/js) to generate the rest-level client from OpenAPI specs.

It's advised to put the generated code into the folder `generated`, add your customization code under the folder `src` and then export or re-export them as needed.

```yaml
source-code-folder-path: ./src/generated
```

## Custom authentication

Some services require a custom authentication flow. For example Metrics Advisor uses Key Authentication, however MA requires 2 headers for key authentication `Ocp-Apim-Subscription-Key` and `x-api-key`, which is different to the usual key authentication which only requires a single key.

In this case we customize as follows:

1. Hand author a `PipelinePolicy` that takes values for both keys and sign the request
2. Hand author a wrapping client factory function
3. In the wapping factory, we create a new client with the generated factory
4. Inject the new policy to the client
5. Return the client
6. Only expose the wrapping factory and hide the generated factory.

With this user experience is the same as it is with any other RLC, as they just need to create a new client from the default exported factory function.

```typescript
import MetricsAdvisor, { paginate } from "@azure-rest/ai-metricsadvisor";

const client = MetricsAdvisor("https://<endopoint>", {
  key: "<apiKey>",
  subscriptionKey: "<subscriptionKey>",
});
```

In order to enable the client to use the custom Key authentication, we need to add the policy to the Pipeline to act on each request, we can do this by creating a wapper factory function which calls the generated one and adds the pipeline policy. The public API would expose the wapper factory and hide the generated one.

### Enable default credential setting

First we enable the default credential setting in `README.md`.

```typescript
add-credentials: true
credential-scopes: https://<endpoint>.azure.com/.default
```

### Generate the client

Then your generation client in the file `./generated/generatedClient.ts` would be like below:

```typescript
export default function createClient(
  endpoint: string,
  credentials: TokenCredential,
  options: ClientOptions = {}
): GeneratedClient {
  const baseUrl = options.baseUrl ?? `${endpoint}/metricsadvisor/v1.0`;

  options = {
    ...options,
    credentials: {
      scopes: ["https://<endpoint>.azure.com/.default"]
    }
  };
...
}
```

### Add the helper function

Add the wrapper function based on your generated function `createClient`, here you could leverage the function `createMetricsAdvisorKeyCredentialPolicy` to do the customisazion.

```typescript
import createGenerateClient from "./generated/generatedClient";

export function createClient(
  endpoint: string,
  credential: TokenCredential | MetricsAdvisorKeyCredential,
  options: ClientOptions = {}
): GeneratedClient {
  if (isTokenCredential(credential)) {
    return createGenerateClient(endpoint, credential, options);
  } else {
    const client = createGenerateClient(endpoint, undefined as any, options);
    const authPolicy = createMetricsAdvisorKeyCredentialPolicy(credential);
    client.pipeline.addPolicy(authPolicy);
    return client;
  }
}
```

## Generate two or more clients

We could leverage the autorest batch option and enable multi-client flag in our `README.md` to generate two or more service clients.

Here is an example in metrics advisor, we have two clients `MetricsAdvisorClient` and `MetricsAdvisorAdministrationClient`.

### Use multi-client flag and batch option

Add the `multi-client` flag in our readme and use the `batch` autorest option to create the two clients:

```yaml $(multi-client)
batch:
  - metrics-advisor: true
  - metrics-advisor-admin: true
```

### Specify configurations for each individual clients

For each individual clients specify your client name and swagger file. Make sure that you don't have one Swagger with operations that are designed to be in two different clients so that clients should correspond to a clear set of Swagger files.

```yaml $(metrics-advisor) == true
title: MetricsAdvisorClient
description: Metrics Advisor Client
output-folder: ${project_folder}/src
source-code-folder-path: ./client
input-file: /your/swagger/folder/metricsadvisor.json
```

```yaml $(metrics-advisor-admin) == true
title: MetricsAdvisorAdministrationClient
description: Metrics Advisor Admin Client
output-folder: ${project_folder}/src
source-code-folder-path: ./admin
input-file: /your/swagger/folder/metricsadvisor-admin.json
```

### Generate code with `--multi-client`

When generating the code specify that what we want is multi-client so append the flag in command line `--multi-client`. After generation the folder structure would be like below:

```
sdk/
├─ ${project_folder}/
│  ├─ src/
│  │  ├─ client/
│  │  │  ├─ MetricsAdvisorClient.ts
│  │  │  ├─ index.ts
│  │  ├─ admin/
│  │  │  ├─ MetricsAdvisorAdministrationClient.ts
│  │  │  ├─ index.ts
│  │  ├─ index.ts
```

### Example code to call any client

```typescript
import {
  MetricsAdvisorAdministrationClient,
  MetricsAdvisorClient,
} from "@azure-rest/ai-metrics-advisor";
const adminClient = MetricsAdvisorAdministrationClient.createClient(endpoint, credential);
// call any admin operation
const createdResponse = await adminClient.createDataFeed(`<parameter>`);
const maClient = MetricsAdvisorClient.createClient(endpoint, credential);
// call any non-admin operation
const listedResponse = await maClient.getIncidentsByAnomalyDetectionConfiguration(`<parameter>`);
```

## Enhance operation behavior

### Mixed operations

TBD

### Transformations

TBD

## RLC Considerations
