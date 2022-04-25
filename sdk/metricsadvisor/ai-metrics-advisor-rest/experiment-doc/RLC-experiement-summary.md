## Overview of the Experiment

This document summarized the Metrics Advisor RLC experiment work and corresponding discussions.

RLC SDK is optimized for developer experience and bundle size to call REST API and it didn't take everything into consideration so we're supposed to add customization code to satisfy further requirement.

Below are the summerized cases and please notice that we still have open questions so share your opinions on them.

- POST next link
- Client structure
- Customized authoritication

## POST next link

By default the generator would generate GET helper function to call next link if there exists `x-ms-pageable` in swagger. However using POST call to get next page is not supported so we need to add helper function as below:

<details>

### paginatePost helper function

```typescript
export function paginatePost<TResponse extends PathUncheckedResponse>(
  client: Client,
  initialResponse: TResponse,
  options: PagingOptions<TResponse> = {}
): PagedAsyncIterableIterator<PaginateReturn<TResponse>> {
  // Extract element type from initial response
  type TElement = PaginateReturn<TResponse>;
  let firstRun = true;
  // We need to check the response for success before trying to inspect it looking for
  // the properties to use for nextLink and itemName
  checkPagingRequest(initialResponse);
  const { itemName, nextLinkName } = getPaginationProperties(initialResponse);
  const { customGetPage } = options;
  const pagedResult: PagedResult<TElement[]> = {
    firstPageLink: "",
    getPage:
      typeof customGetPage === "function"
        ? customGetPage
        : async (pageLink: string) => {
          const result = firstRun
            ? initialResponse
            : await client.pathUnchecked(pageLink).post({ body: initialResponse.request.body });
          firstRun = false;
          checkPagingRequest(result);
          const nextLink = getNextLink(result.body, nextLinkName);
          const values = getElements<TElement>(result.body, itemName);
          return {
            page: values,
            nextPageLink: nextLink
          };
        }
  };
```

### Sample code

```typescript
const initResponse = await client.getMethodHasPaginition(`<get-parameter>`);
const iterator = paginatePost(client, initResponse); // <== Here to call helper function
let count = 0;
for await (const farmer of iterator) {
  // here to iterate the item one by one
  count++;
}
```

</details>

The question is: even though we expose both POST and GET helper function in SDK, how does JS developer know when to use GET and when to use POST one to handle pagination?

The short anwser is that developers don't know it and actually they may not care about underlying method. To solve this we could provide a map that would be used by the paging helper to determine which path to call and which method. But depending on the size of the REST API this could get very big and potentially impact the bundle size. So here we didn't find a perfect way to balance these factors. The long-term solution is under discussion.

## Client structure

### One client to have all operations

For the swagger which has no operation group, the generator will pack all OperationIDs into one client.

```typescript
export type GeneratedClient = Client & {
  path: Routes; // <== all REST paths
} & ClientOperations; // <== all operations without operation group
```

Then JS developer could create the client to call any operation.

```typescript
const client = createClient(endpoint, credential);
client.callAnyMethod(`<parameter>`);
```

### One client to have various operation groups

For the swagger which has operation groups, the generator will wrap the same operation group into a separated operations' subset or sub-client(see the [latest arch reivew](https://github.com/Azure/autorest/blob/main/docs/openapi/howto/archboard_feedback.md#need-one-clientbuilder-with-sub-clients)), then pack all operations into one client.

```typescript
export type GeneratedClient = Client & {
  path: Routes; // <== all REST paths
  operationGroup1: Group1Operations; // <== all operations within group_1
  operationGroup2: Group2Operations; // <== all operations within group_2
} & ClientOperations; // <== all operations without operation group
```

Then JS developer could create the client to call any operation.

```typescript
const client = createClient(endpoint, credential);
client.operationGroup1.callAnyMethodInGroup1(`<parameter>`);
client.operationGroup2.callAnyMethodInGroup2(`<parameter>`);
```

### Two or more clients

We could leverage the autorest batch option and enable multi-client flag in our `README.md` to generate two or more service clients.

It's also advisor to specify your client name and swagger file for each individual clients.

```yaml $(multi-client)
batch:
  - client-1: true
  - client-2: true
```

```yaml $(client-1) == true
title: Client1
description: Example of Client1
output-folder: ${project_folder}/src
source-code-folder-path: ./client1
input-file: /your/swagger/folder/client1.json
```

```yaml $(client-2) == true
title: Client2
description: Example of Client2
output-folder: ${project_folder}/src
source-code-folder-path: ./client2
input-file: /your/swagger/folder/client2.json
```

The generated code structure would be like this:

```
sdk/
├─ ${project_folder}/
│  ├─ src/
│  │  ├─ client1/
│  │  │  ├─ Client1.ts
│  │  │  ├─ index.ts
│  │  ├─ client2/
│  │  │  ├─ Client2.ts
│  │  │  ├─ index.ts
│  │  ├─ index.ts
```

Then one could create the client to call any operation.

```typescript
const client1 = Client1.createClient(endpoint, credential);
client1.callAnyMethodInClient1(`<parameter>`);
const client2 = Client2.createClient(endpoint, credential);
client2.callAnyMethodInClient2(`<parameter>`);
```

## Customized authoritication

RLC supports AzureAD OAuth2 authentication and API key authentication. Refer [here](https://github.com/Azure/autorest/blob/main/docs/generate/authentication.md) for more detail.

But for complex API key authentication, one can customize as below steps.

<details>

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

Add the wrapper function based on your generated function `createClient`, here you could leverage the function `createServiceKeyCredentialPolicy` to do the customisazion.

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
    const authPolicy = createServiceKeyCredentialPolicy(credential);
    client.pipeline.addPolicy(authPolicy);
    return client;
  }
}
```

</details>
