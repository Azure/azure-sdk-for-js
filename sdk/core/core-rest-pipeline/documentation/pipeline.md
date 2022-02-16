# Policies

A pipeline policy manipulates a request as it travels through the pipeline. It is conceptually a middleware that is allowed to modify the request before it is made as well as the response when it is received.

```typescript
export type SendRequest = (request: PipelineRequest) => Promise<PipelineResponse>;

export interface PipelinePolicy {
  name: string;
  sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse>;
}
```

It is given a string name so that consumers can express dependencies relative to existing policies. The `sendRequest` method uses a middleware pattern, which is familiar to JS developers.

# Pipelines

A `Pipeline` composes several policies and provides the ability to make a request that will flow through the policies in a specific order determined by their requirements. Which allows manipulating each request before and after it is made to the server.

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

Dependencies expressed when calling `addPolicy` are not sensitive to order. The following code snippets have identical effects:

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

### Policies included in a default pipeline

- proxyPolicy **(NODE Only)**
  - A policy that allows one to apply proxy settings to all requests. If not passed static settings, they will be retrieved from the HTTPS_PROXY or HTTP_PROXY environment variables.
- decompressResponsePolicy **(NODE Only)**
  - A policy to enable response decompression according to Accept-Encoding header
- formDataPolicy
  - A policy that encodes FormData on the request into the body.
- userAgentPolicy
  - A policy that sets the User-Agent header (or equivalent) to reflect the library version
- setClientRequestIdPolicy
  - The programmatic identifier of the setClientRequestIdPolicy
- defaultRetryPolicy
  - A policy that retries according to three strategies:
    - When the server sends a 429 response with a Retry-After header.
    - When there are errors in the underlying transport layer (e.g. DNS lookup failures).
    - Or otherwise if the outgoing request fails, it will retry with an exponentially increasing delay.
- tracingPolicy
  - A simple policy to create OpenTelemetry Spans for each request made by the pipeline that has SpanOptions with a parent. Requests made without a parent Span will not be recorded.
- redirectPolicy
  - A policy to follow Location headers from the server in order to support server-side redirection.
- logPolicy
  - A policy that logs all requests and responses.

There are other policies commonly added to the default pipeline:

- bearerTokenAuthenticationPolicy
  - A policy that can request a token from a TokenCredential implementation and then apply it to the Authorization header of a request as a Bearer token.
- serializationPolicy
  - This policy handles assembling the request body and headers using an OperationSpec and OperationArguments on the request.
- deserializationPolicy
  - This policy handles parsing out responses according to OperationSpecs on the request.

# Configuring client pipeline

When instantiating a new client a pipeline can be configured by adding additional policies to the default pipeline, passing a static array of policies.

```typescript
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

Consumers can list all the policies in a pipeline calling `getOrderedPolicies()`, which returns the current set of policies in the pipeline in the order in which they will be applied to the request. Later in the list is closer to when the request is performed.

```typescript
const policies = pipeline.getOrderedPolicies();

for (const policy of policies) {
  console.log(policy.name);
}
```
