A Pipeline in the Azure SDKs is a collection of policies that can work on the request before sending it to the server and also on the raw responses before handing them to the SDK users. This document describes in detail the structure and functionality of the Pipeline and Policies

# Policies

A pipeline policy manipulates a request as it travels through the pipeline. It is conceptually a middleware that is allowed to modify the request before it is made as well as the response when it is received.

It is important to note that the **first** policy to touch the request will be the **last** policy to work on the response.

[Find out more about the Middleware pattern](https://docs.microsoft.com/aspnet/core/fundamentals/middleware/?tabs=aspnetcore2x&view=aspnetcore-6.0)

```typescript
export type SendRequest = (request: PipelineRequest) => Promise<PipelineResponse>;

export interface PipelinePolicy {
  name: string;
  sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse>;
}
```

# Pipelines

A `Pipeline` is composed of several policies and provides the ability to make a request that will flow through the policies in a specific order determined by their requirements. This allows manipulating each request before it is sent to the server and to work on the response after receiving it.

```typescript
export interface AddPipelineOptions {
  afterPhase?: PipelinePhase;
  afterPolicies?: string[];
  beforePolicies?: string[];
  phase?: PipelinePhase;
}

export interface Pipeline {
  addPolicy(policy: PipelinePolicy, options?: AddPipelineOptions): void;
  clone(): Pipeline;
  getOrderedPolicies(): PipelinePolicy[];
  removePolicy(options: { name?: string; phase?: PipelinePhase }): PipelinePolicy[];
  sendRequest(httpClient: HttpClient, request: PipelineRequest): Promise<PipelineResponse>;
}
```

**Note**: It is important to never rely on policy insert ordering and always express policy execution constraints using `AddPipelineOptions` when policies have interactions. For example, the following code snippets have identical effects:

```typescript
pipeline.addPolicy(barPolicy);
pipeline.addPolicy(fooPolicy, { afterPolicy: "barPolicy" });

// The below is the same as the above.
// Policies don't have to be part of the pipeline in order to be
// referenced by before/afterPolicy.
pipeline.addPolicy(fooPolicy, { afterPolicy: "barPolicy" });
pipeline.addPolicy(barPolicy);
```

Phases are predefined buckets of activity that pre-defined policies inside core will fall into. They are currently a fixed set and not customizable by pipeline consumers.

```typescript
export type PipelinePhase = "Deserialize" | "Serialize" | "Retry" | "Sign";
```

The execution order is:

1. **Serialize Phase** - Policies that assamble the request to be sent through HTTP, i.e. transforming the body object to its JSON string representation.
2. **Policies not in a phase** - Any policies added to the pipeline without a specified phase
3. **Deserialize Phase** - Policies that transform the raw HTTP response into friendlier response shapes. In addition to transforming the body JSON string into a JavaScript object, this can also include things like creating native JS `Date` objects from strings and other object forms not natively supported by JSON.
4. **Retry Phase** - Policies that inspect the raw response, typically the response code and errors returned from the service to decide whether or not to re-try the request.
5. **Sign Phase** - Policies that sign the request for security purposes, for example adding a HMAC signature to prevent tampering during transport.```

# Default Pipeline

`@azure/core-rest-pipeline` exposes `createPipelineFromOptions` which creates pipeline with a predefined set of policies. The resulting pipeline can be configured through `PipelineOptions`

```typescript
/**
 * Defines options that are used to configure the HTTP pipeline for
 * an SDK client.
 */
export interface PipelineOptions {
  /**
   * Options that control how to retry failed requests.
   */
  retryOptions?: PipelineRetryOptions;

  /**
   * Options to configure a proxy for outgoing requests.
   */
  proxyOptions?: ProxySettings;

  /**
   * Options for how redirect responses are handled.
   */
  redirectOptions?: RedirectPolicyOptions;

  /**
   * Options for adding user agent details to outgoing requests.
   */
  userAgentOptions?: UserAgentPolicyOptions;
}

/**
 * Defines options that are used to configure internal options of
 * the HTTP pipeline for an SDK client.
 */
export interface InternalPipelineOptions extends PipelineOptions {
  /**
   * Options to configure request/response logging.
   */
  loggingOptions?: LogPolicyOptions;
}

/**
 * Create a new pipeline with a default set of customizable policies.
 * @param options - Options to configure a custom pipeline.
 */
declare function createPipelineFromOptions(options: InternalPipelineOptions): Pipeline;
```

**Note:** `InternalPipelineOptions` is used internally by SDK client authors to configure the SDK pipeline but it is not exposed to consumers. Consumers can configure the default pipeline through the `PipelineOptions` when instantiating a new client.

### Policies included in a default pipeline

- proxyPolicy (**NodeJS Only**)
  - A policy that allows one to apply proxy settings to all requests. If not passed static settings, they will be retrieved from the HTTPS_PROXY or HTTP_PROXY environment variables.
- decompressResponsePolicy (**NodeJS Only**)
  - A policy to enable response decompression according to Accept-Encoding header.
- formDataPolicy
  - A policy that encodes FormData on the request into the body.
- userAgentPolicy
  - A policy that sets the User-Agent header (or equivalent) to reflect the SDK version and device runtime.
- setClientRequestIdPolicy
  - A policy that tags each outgoing request with a unique ID for tracing purposes. This can be useful when opening support tickets against Azure services.
- defaultRetryPolicy
  - A policy that retries according to three strategies:
    - When the server sends a 429 response with a Retry-After header.
    - When there are errors in the underlying transport layer (e.g. DNS lookup failures.)
    - After considering the above, if the outgoing request fails with a non-final response code, it will retry with an exponentially increasing delay.
- tracingPolicy
  - A policy to create [OpenTelemetry](https://opentelemetry.io/) tracing spans for each request made by the pipeline. Requests made without a valid tracing context will not be recorded. SDK client authors are expected to use the appropriate callbacks from `@azure/core-tracing` to set tracing contexts for all client operations.
- redirectPolicy
  - A policy to follow Location headers from the server in order to support server-side redirection.
- logPolicy
  - A policy that logs all requests and responses using [@azure/logger](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

There are other policies commonly added to the default pipeline:

- serializationPolicy
  - This policy handles assembling the request body and headers using an OperationSpec and OperationArguments on the request.
- deserializationPolicy
  - This policy handles parsing out responses according to OperationSpecs on the request.

# Authentication and Signing

Pipeline policies are used to authenticate requests in Azure SDKs. An authentication policy would sign the request before sending it with the required authentication information, these policies run in the `Sign` phase.

For example, the `bearerTokenAuthenticationPolicy` would sign the request by adding the bearer token in the request headers before the request is sent.

# Configuring client pipeline

When instantiating a new client a pipeline can be configured by adding additional policies to the default pipeline, passing a static array of policies.

When configuring additional policies the following execution positions can be specified:

- `perCall` - When a policy is assigned a `perCall` position, it will be run once before sending the request. If the request needs to be retried, the policy will not be called again.
- `perRetry` - When a policy is assigned a `perRetry` position, the policy will be executed again before each new request is sent.

```typescript
type SendRequest = (request: PipelineRequest) => Promise<PipelineResponse>;

const sendRequest = (request: PipelineRequest, next: SendRequest) => next(request);

const policy1: PipelinePolicy = {
  name: "policy1",
  sendRequest,
};
const policy2: PipelinePolicy = {
  name: "policy2",
  sendRequest,
};

const client = new ServiceClient({
  additionalPolicies: [
    {
      policy: policy1,
      /**
       * Determines if this policy be applied before or after retry logic.
       * Only use `perRetry` if you need to modify the request again
       * each time the operation is retried due to retryable service
       * issues.
       */
      position: "perRetry",
    },
    { policy: policy2, position: "perCall" },
  ],
});
```

# HttpClient

The `HttpClient` is the last logical piece of the pipeline. The `HttpClient` will send the request over the wire after all policies have run and will hand off the response back to the pipeline once the server responds. There are different default implementations for the `HttpClient` based on if the SDK is running inside a Node or browser runtime.

For browsers, an `HttpClient` implementation based on `Fetch API` will be used. When running in Node, an `HttpClient` based on Node's native `https` module will be used.

A custom `HttpClient` implementation can be provided when constructing an SDK client.

# Examples

## Inserting a new policy at a specific place

```typescript
interface TracingPolicyOptions {
  tracingEnabled: boolean;
}

function tracingPolicy(options: TracingPolicyOptions): PipelinePolicy {
  return {
    name: "TracingPolicy",
    sendRequest: (request, next) => {
      if (options.tracingEnabled) {
        // add some headers
        request.headers.set("tracing-id", "123456");
      }

      return next(request);
    },
  };
}

// Extend an existing Pipeline
pipeline.addPolicy(tracingPolicy({ tracingEnabled: true }), { beforePhase: "Retry" });
```

## Removing policies

Policies can be removed from a pipeline, consumers can target a specifc policy by name or remove all the policies in a specific phase

```typescript
// Remove a single policy, referencing it by name
pipeline.removePolicy({ name: "customPolicy" });

// Remove all policies from a phase
pipeline.removePolicy({ phase: "Retry" });
```

## List policies

For debugging purposes, consumers can list all the policies in a pipeline calling `getOrderedPolicies()`, which returns the current set of policies in the pipeline in the order in which they will be applied to the request, remember that policies have a bubbling nature, this means that the **first** policy to touch the request will be the **last** policy to work on the response.

```typescript
const policies = pipeline.getOrderedPolicies();

for (const policy of policies) {
  console.log(policy.name);
}
```
