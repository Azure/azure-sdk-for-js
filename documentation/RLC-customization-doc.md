# Customization on the RLC rest-level client libraries

## Generate RLC Client

Follow [quickstart](https://aka.ms/azsdk/rlc/js) to generate the rest-level client from OpenAPI specs.

It's advised to put the generated code into the folder `generated`, add your customization code under the folder `src` and then export or re-export them as needed.

```yaml
source-code-folder-path: ./src/generated
```

## Custom authentication

Some services require a custom authentication flow. For example Metrics Advisor uses Key Authentication, however MA requires 2 headers for key authentication `Ocp-Apim-Subscription-Key` and `x-api-key`, which is different to the usual key authentication which only requires a single key.

In this case we customize as follows:

1. Hand author a `PipelinePolicy` that takes values for both keys and sign the request
2. Hand author a wrapping client factory function
3. In the wrapping factory, we create a new client with the generated factory
4. Inject the new policy to the client
5. Return the client
6. Only expose the wrapping factory and hide the generated factory.

Here is an example in Metrics Advisor for the [wrapping function](https://github.com/MaryGao/azure-sdk-for-js/blob/metrix-advisor-poc/sdk/metricsadvisor/ai-metrics-advisor-rest/src/credentialHelper.ts#L10-L21) and [customized policy](https://github.com/MaryGao/azure-sdk-for-js/blob/metrix-advisor-poc/sdk/metricsadvisor/ai-metrics-advisor-rest/src/metricsAdvisorKeyCredentialPolicy.ts).

With this user experience is the same as it is with any other RLC, as they just need to create a new client from the default exported factory function.

```typescript
import MetricsAdvisor, { paginate } from "@azure-rest/ai-metricsadvisor";

const client = MetricsAdvisor("https://<endopoint>", {
  key: "<apiKey>",
  subscriptionKey: "<subscriptionKey>",
});
```

## Custom paging helper

Eventhough the code generator provides a pagination helper for RLCs, there are services that implement their own pagination pattern, different to the standard specification of `x-ms-pageable`.

One example is the Metrics Advisor service, which implements a pagination pattern in which getting the next page can be called with `GET` or `POST` depending on the resource.

The standard pagination pattern, assumes `GET` for getting the next pages. In this case we implemented a custom paginate helper that has the same public interface as the generated helper but under the hoods has an additional pagination implementation to use `POST`. Also this custom helper has an internal map that indicates which operations need `POST` and which need `GET`.

You can find the [example code](https://github.com/MaryGao/azure-sdk-for-js/blob/metrix-advisor-poc/sdk/metricsadvisor/ai-metrics-advisor-rest/src/paginateHelper.ts#L25) to support the `POST` not `GET` method. The generated paging helper is hidden and the custom paginate helper is exposed.

Below is the example code to call the helper.

```typescript
import MetricsAdvisor, { paginate } from "@azure-rest/ai-metricsadvisor";
import { DefaultAzureCredential } from "@azure/identity";

const client = MetricsAdvisor("https://<endopoint>", new DefaultAzureCredential());

const initResponse = await client.listDataFeeds({
  queryParameters: {
    dataFeedName: "js-test-",
    $skip: 1,
    $maxpagesize: 1,
  },
});

const dataFeeds = paginate(client, initResponse);
for await (const dataFeed of dataFeeds) {
  console.log(data);
}
```

## Custom data transform helpers

There may be times in which transforming the data from the service would be beneficial. When a transformation is common for our customers we may decide to expose helper transformation functions. These helper transformations are optional and customers can decide to use them or not, the calls maintain the original data form from the Service.

If we export `toDataFeedDetailResponse` which may convert the REST model to a common one, so that the customers could call this way:

```typescript
import MetricsAdvisor, { toDataFeedDetailResponse } from "@azure-rest/ai-metricsadvisor";
import { DefaultAzureCredential } from "@azure/identity";

const client = MetricsAdvisor("https://<endpoint>", new DefaultAzureCredential());
const listResponse = await client.listDataFeeds(<parameter>);
if (listResponse.status != "201") {
  throw new Error("Error");
}

// Transforms service data into a more useful shape
const formattedDatafeed = toDataFeedDetailResponse(listResponse);
```

## Multi-client packages

There are cases where 2 services are closely related that most users will need to use both in the same application, in this case, we may opt for multi-client packages. Each client can be imported individually without a top-level client, this is to work nicely with bundler TreeShaking.

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

## RLC Customization Considerations

Our customization strategy has the following principles:

- Expose custom functionality as helper functions that users can opt-in
- Never force customers to use a customized function or operation
- The only exception is if we need to add custom policies to the client, it is okay to wrap the generated client factory and exposed the wrapped factory instead of the generated one.
