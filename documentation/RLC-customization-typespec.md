# Customization on the RLC rest-level client libraries

## The whole process

1. **Update configuration**
    
    We can update `tsp-location.yaml` under sdk project folder to set the typespec project. 
  
    We can refer to the [tsp-location.yaml](https://github.com/Azure/azure-sdk-tools/blob/main/doc/common/TypeSpec-Project-Scripts.md#tsp-locationyaml) which describes the supported properties in the file.

2. **Create `sources` folder**

    If this is your first time to customize code, we need to create a `sources` folder to put our customization and generated code.

    ```shell
    cd sdk/communication/communication-job-router-rest
    mkdir sources
    ```

3. **Generate code**

    Run the following two scripts from project directory (i.e your current directory is `path/to/azure-sdk-for-js/sdk/communication/communication-job-router-rest`) to generate the code:

    > NOTE: These scripts require PowerShell version 7 or higher

    ```ps
    pwsh ../../../eng/common/scripts/TypeSpec-Project-Sync.ps1 .
    ```
    followed by

    ```ps
    pwsh ../../../eng/common/scripts/TypeSpec-Project-Generate.ps1 .
    ```

    The version of TypeSpec-TS is configured in [emitter-package.json](https://github.com/Azure/azure-sdk-for-js/blob/main/eng/emitter-package.json). Change it in local, if you would like to use a different version of `typespec-ts`.

    After generated the SDK should be generated under `sources/generated` folder.

4. **Create `customizations` folder under `sources`**

    All customization codes should be under the `sources/customizations` folder so if no just create one.

    ```shell
    mkdir sources/customizations
    ```

5. **Customize code**

    We give an example on how to customize the authentication in following sections and you could refer for more details.

6. **Run command to apply customization**

    Once we finish our customization we will run command to apply them. First we could add below script under `scripts` section in  `package.json`.
    ```json
      "customize": "rimraf src && dev-tool customization apply -s sources/generated/src && npm run format",
    ```

    Then run `rushx customize` command to apply:

    ```shell
    rushx customize
    ```

## Detailed customization example

### Customization tool


Simply speaking the customization tool would `merge` the codes under `customizations` and ones under `generated/src`. So you can imagine that:
- If the customizations folder is empty which means there is no newly-applied code under generated SDKs;
- If I'd like to add a new file `OpenAIKeyCredential` including customized `KeyCredential` at the top level, I could add it [here](https://github.com/Azure/azure-sdk-for-js/blob/79a6000fb3c733ad444660b880a0c25a2cf5c7ff/sdk/openai/openai/sources/customizations/OpenAIKeyCredential.ts) and don't forget to expose it in [index.ts](https://github.com/Azure/azure-sdk-for-js/blob/79a6000fb3c733ad444660b880a0c25a2cf5c7ff/sdk/openai/openai/sources/customizations/index.ts#L17) file;
- If I'd like to override the generated `createClient` with my own customization policy, I would create the same filename and same method name. Then the newly one would override the existing one e.g: [generated method](https://github.com/Azure/azure-sdk-for-js/blob/79a6000fb3c733ad444660b880a0c25a2cf5c7ff/sdk/openai/openai/sources/generated/src/api/operations.ts#L232) and [customized method](https://github.com/Azure/azure-sdk-for-js/blob/79a6000fb3c733ad444660b880a0c25a2cf5c7ff/sdk/openai/openai/sources/customizations/api/operations.ts#L329).


### Customize authentication
Some services require a custom authentication flow. For example Metrics Advisor uses Key Authentication, however MA requires 2 headers for key authentication `Ocp-Apim-Subscription-Key` and `x-api-key`, which is different to the usual key authentication which only requires a single key.

In this case we customize as follows:

1. Hand author a `PipelinePolicy` that takes values for both keys and sign the request
2. Hand author a wrapping client factory function
3. In the wrapping factory, we create a new client with the generated factory
4. Inject the new policy to the client
5. Return the client
6. Only expose the wrapping factory and hide the generated factory.

Here is the implementation in Metrics Advisor.

The wrapping function looks like:

```typescript
import MetricsAdvisor from "./generated/generatedClient";
import { isTokenCredential, TokenCredential } from "@azure/core-auth";
import { ClientOptions } from "@azure-rest/core-client";
import {
  createMetricsAdvisorKeyCredentialPolicy,
  MetricsAdvisorKeyCredential,
} from "./metricsAdvisorKeyCredentialPolicy";

export default function createClient(
  endpoint: string,
  credential: TokenCredential | MetricsAdvisorKeyCredential,
  options: ClientOptions = {}
): GeneratedClient {
  if (isTokenCredential(credential)) {
    return MetricsAdvisor(endpoint, credential, options);
  } else {
    const client = MetricsAdvisor(endpoint, undefined as any, options);
    const authPolicy = createMetricsAdvisorKeyCredentialPolicy(credential);
    client.pipeline.addPolicy(authPolicy);
    return client;
  }
}
```

And in `metricsAdvisorKeyCredentialPolicy.ts` file we have the customized policy and `createMetricsAdvisorKeyCredentialPolicy` function to create that policy

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
export interface MetricsAdvisorKeyCredential extends KeyCredential {
  /** API key from the Metrics Advisor web portal */
  // key?: string; // extended from KeyCredential
  /** Subscription access key from the Azure portal */
  subscriptionKey?: string;
}

/**
 * Creates an HTTP pipeline policy to authenticate a request
 * using an `MetricsAdvisorKeyCredential`
 */
export function createMetricsAdvisorKeyCredentialPolicy(
  credential: MetricsAdvisorKeyCredential
): PipelinePolicy {
  return {
    name: "metricsAdvisorKeyCredentialPolicy",
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
import MetricsAdvisor, { paginate } from "@azure-rest/ai-metricsadvisor";

const client = MetricsAdvisor("https://<endopoint>", {
  key: "<apiKey>",
  subscriptionKey: "<subscriptionKey>",
});
```


## RLC Customization Considerations

Our customization strategy has the following principles:

- Expose custom functionality as helper functions that users can opt-in
- Never force customers to use a customized function or operation
- The only exception is if we need to add custom policies to the client, it is okay to wrap the generated client factory and exposed the wrapped factory instead of the generated one.
