# Customization on the RLC rest-level client libraries

## Generate RLC Client

Follow [quickstart](https://aka.ms/azsdk/rlc/js) to generate the rest-level client from OpenAPI specs.

It's advised to put the generated code into the folder `generated`, add your customization code under the folder `src` and then export or re-export them as needed.

```yaml
source-code-folder-path: ./generated
```

## Custom authentication

Before you customize the code, you should run ```npx dev-tool customization apply``` to sync the generated src code from ./generated into ./src

Some services require a custom authentication flow. For example, a service might use Key Authentication requiring 2 headers for key authentication (e.g., `Ocp-Apim-Subscription-Key` and `x-api-key`), which is different from the usual key authentication which only requires a single key.

In this case, we customize as follows:

1. Hand author a `PipelinePolicy` that takes values for both keys and sign the request
2. Hand author a wrapping client factory function
3. In the wrapping factory, we create a new client with the generated factory
4. Inject the new policy to the client
5. Return the client
6. Only expose the wrapping factory and hide the generated factory.

Here is an example implementation.

The wrapping function looks like:

```typescript
import MyServiceClient from "./generatedClient";
import { isTokenCredential, TokenCredential } from "@azure/core-auth";
import { ClientOptions } from "@azure-rest/core-client";
import {
  createMyServiceKeyCredentialPolicy,
  MyServiceKeyCredential,
} from "./myServiceKeyCredentialPolicy";

export default function createClient(
  endpoint: string,
  credential: TokenCredential | MyServiceKeyCredential,
  options: ClientOptions = {}
): GeneratedClient {
  if (isTokenCredential(credential)) {
    return MyServiceClient(endpoint, credential, options);
  } else {
    const client = MyServiceClient(endpoint, undefined as any, options);
    const authPolicy = createMyServiceKeyCredentialPolicy(credential);
    client.pipeline.addPolicy(authPolicy);
    return client;
  }
}
```

And in `myServiceKeyCredentialPolicy.ts` file, we have the customized policy and `createMyServiceKeyCredentialPolicy` function to create that policy.

```typescript
import {
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";
import { KeyCredential } from "@azure/core-auth";
export const API_KEY_HEADER_NAME = "Ocp-Apim-Subscription-Key";
export const X_API_KEY_HEADER_NAME = "x-api-key";

/**
 * Interface parameters for updateKey function
 */
export interface MyServiceKeyCredential extends KeyCredential {
  /** API key from the service web portal */
  // key?: string; // extended from KeyCredential
  /** Subscription access key from the Azure portal */
  subscriptionKey?: string;
}

/**
 * Creates an HTTP pipeline policy to authenticate a request
 * using an `MyServiceKeyCredential`
 */
export function createMyServiceKeyCredentialPolicy(
  credential: MyServiceKeyCredential
): PipelinePolicy {
  return {
    name: "myServiceKeyCredentialPolicy",
    sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      if (!request) {
        throw new Error("webResource cannot be null or undefined");
      }
      request.headers.set(API_KEY_HEADER_NAME, credential.subscriptionKey || "");
      request.headers.set(X_API_KEY_HEADER_NAME, credential.key);
      return next(request);
    },
  };
}
```

With this user experience is the same as it is with any other RLC, as they just need to create a new client from the default exported factory function.

```typescript
import MyServiceClient, { paginate } from "@azure-rest/my-service";

const client = MyServiceClient("https://<endpoint>", {
  key: "<apiKey>",
  subscriptionKey: "<subscriptionKey>",
});
```

## Custom paging helper

Eventhough the code generator provides a pagination helper for RLCs, there are services that implement their own pagination pattern, different to the standard specification of `x-ms-pageable`.

Some services implement a pagination pattern in which getting the next page can be called with `GET` or `POST` depending on the resource.

The standard pagination pattern, assumes `GET` for getting the next pages. In this case, we can implement a custom paginate helper that has the same public interface as the generated helper but under the hoods has an additional pagination implementation to use `POST`. Also this custom helper has an internal map that indicates which operations need `POST` and which need `GET`.

Here is an example implementation. Remember to replace the `paginationMapping` with your service's specific endpoints. The generated paging helper is hidden and the custom paginate helper is exposed.

```typescript
import { Client, createRestError, PathUncheckedResponse } from "@azure-rest/core-client";
import { PaginateReturn, PagingOptions, getPagedAsyncIterator, PagedAsyncIterableIterator, PagedResult } from "./generated/paginateHelper";

export function paginate<TResponse extends PathUncheckedResponse>(
  client: Client,
  initialResponse: TResponse,
  options: PagingOptions<TResponse> = {}
): PagedAsyncIterableIterator<PaginateReturn<TResponse>> {
  // internal map to indicate which operation uses which method
  const paginationMapping: Record<string, any> = {
    "/some/endpoint/query": {
      method: "POST",
    },
    "/other/endpoint": {
      method: "GET",
    },
    "/another/endpoint": {
      method: "GET",
    },
  };

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
            // Calculate using get or post
            let result;
            if (paginationMapping[initialResponse.request.url]?.method == "POST") {
              result = firstRun
                ? initialResponse
                : await client.pathUnchecked(pageLink).post({ body: initialResponse.request.body });
            } else {
              result = firstRun ? initialResponse : await client.pathUnchecked(pageLink).get();
            }
            firstRun = false;
            checkPagingRequest(result);
            const nextLink = getNextLink(result.body, nextLinkName);
            const values = getElements<TElement>(result.body, itemName);
            return {
              page: values,
              nextPageLink: nextLink,
            };
          },
  };

  return getPagedAsyncIterator(pagedResult);
}
```

The example code to call the helper.

```typescript
import MyServiceClient, { paginate } from "@azure-rest/my-service";
import { DefaultAzureCredential } from "@azure/identity";

const client = MyServiceClient("https://<endpoint>", new DefaultAzureCredential());

const initResponse = await client.listItems({
  queryParameters: {
    itemName: "test-",
    $skip: 1,
    $maxpagesize: 1,
  },
});

const items = paginate(client, initResponse);
for await (const item of items) {
  console.log(item);
}
```

## Custom data transform helpers

There may be times in which transforming the data from the service would be beneficial. When a transformation is common for our customers we may decide to expose helper transformation functions. These helper transformations are optional and customers can decide to use them or not, the calls maintain the original data form from the Service.

If we export `toItemDetailResponse`, which may convert the REST model to a common one so that the customers could call this way:

```typescript
import MyServiceClient, { toItemDetailResponse } from "@azure-rest/my-service";
import { DefaultAzureCredential } from "@azure/identity";

const client = MyServiceClient("https://<endpoint>", new DefaultAzureCredential());
const listResponse = await client.listItems(<parameter>);
if (listResponse.status != "201") {
  throw new Error("Error");
}

// Transforms service data into a more useful shape
const formattedItem = toItemDetailResponse(listResponse);
```

## Multi-client packages

There are cases where 2 services are closely related that most users will need to use both in the same application. In this case, we may opt for multi-client packages. Each client can be imported individually without a top-level client, this is to work nicely with bundler TreeShaking.

We could leverage the autorest batch option and enable multi-client flag in our `README.md` to generate two or more service clients.

Here is an example where we have two clients `MyServiceClient` and `MyServiceAdministrationClient`.

### Use multi-client flag and batch option

Add the `multi-client` flag in our readme and use the `batch` autorest option to create the two clients:

```yaml $(multi-client)
batch:
  - my-service: true
  - my-service-admin: true
```

### Specify configurations for each individual clients

For each individual clients, specify your client name and swagger file. Make sure that you don't have one Swagger with operations that are designed to be in two different clients so that clients should correspond to a clear set of Swagger files.

Normally, the folder structure would be something like `sdk/{servicename}/{servicename}-{modulename}-rest`. For example, we have `sdk/agrifood/agrifood-farming-rest` folder for Farmbeats account modules. That folder will be your **${PROJECT_ROOT} folder**.

```yaml $(my-service) == true
title: MyServiceClient
description: My Service Client
output-folder: ${PROJECT_ROOT}/src
source-code-folder-path: ./client
input-file: /your/swagger/folder/myservice.json
```

```yaml $(my-service-admin) == true
title: MyServiceAdministrationClient
description: My Service Admin Client
output-folder: ${PROJECT_ROOT}/src
source-code-folder-path: ./admin
input-file: /your/swagger/folder/myservice-admin.json
```

### Generate code with `--multi-client`

When generating the code, specify that what we want is multi-client so append the flag in command line `--multi-client`. After generation, the folder structure would be like below:

```
${PROJECT_ROOT}/
├─ src/
│  ├─ client/
│  │  ├─ MyServiceClient.ts
│  │  ├─ index.ts
│  ├─ admin/
│  │  ├─ MyServiceAdministrationClient.ts
│  │  ├─ index.ts
│  ├─ index.ts
```

### Example code to call any client

```typescript
import {
  MyServiceAdministrationClient,
  MyServiceClient,
} from "@azure-rest/my-service";

const adminClient = MyServiceAdministrationClient.createClient(endpoint, credential);
// call any admin operation
const createdResponse = await adminClient.createResource(`<parameter>`);
const serviceClient = MyServiceClient.createClient(endpoint, credential);
// call any non-admin operation
const listedResponse = await serviceClient.listItems(`<parameter>`);
```

## RLC Customization Considerations

Our customization strategy has the following principles:

- Expose custom functionality as helper functions that users can opt-in
- Never force customers to use a customized function or operation
- The only exception is if we need to add custom policies to the client. It is okay to wrap the generated client factory and expose the wrapped factory instead of the generated one.
