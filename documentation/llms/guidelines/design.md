# Azure SDK TypeScript Guidelines - API Design

## Platform Support

**MUST:**

- Support all LTS versions of Node.js and newer versions up to latest
- Support latest 2 versions of: Safari, Chrome, Edge, Firefox
- Compile without errors on TypeScript versions less than 2 years old

**MUST NOT:**

- Support IE11 (requires Architecture Board approval if needed)

## Package Naming and Distribution

**MUST:**

- Publish to `@azure` npm scope
- Use kebab-case package names that tie to the service
- Tag beta packages with `next` distribution tag
- Tag generally available packages with `latest`

**Package Name Prefixes:**

- `ai` - Artificial intelligence/machine learning
- `analytics` - Metrics and usage data
- `communication` - Communication services
- `data` - Database and structured data
- `identity` - Authentication and authorization
- `iot` - Internet of things
- `management` - Control Plane (ARM)
- `messaging` - Pub-sub and messaging
- `storage` - Unstructured data storage

## Service Client Design

### Client Structure

```typescript
export class ServiceClient {
  // Overloaded constructors for different auth schemes
  constructor(connectionString: string, options?: ServiceClientOptions);
  constructor(url: string, credential: TokenCredential, options?: ServiceClientOptions);

  // Service methods with options
  async createItem(options?: CreateItemOptions): Promise<CreateItemResponse>;
  async deleteItem(options?: DeleteItemOptions): Promise<DeleteItemResponse>;

  // Pagination
  listItems(): PagedAsyncIterableIterator<Item, ItemPage>;

  // Sub-clients
  getItemClient(itemName: string): ItemClient;
}
```

### Constructor Rules

**MUST:**

- Allow minimal information needed to connect and authenticate
- Support 100% of service features
- Use overloads for different construction scenarios

**SHOULD:**

- Prefer overloads over unions for correlated parameters
- Use static `fromX()` methods only when overloads would be ambiguous

### Service Versions

**MUST:**

- Call highest supported service API version by default
- Allow explicit service version selection via `serviceVersion` option
- Use string literal union or enum for supported versions

## Method Naming Conventions

**MUST:**

- Use "Client" suffix for service client types
- Follow approved verbs:

| Verb            | Use Case                            | Returns                    |
| --------------- | ----------------------------------- | -------------------------- |
| `create<Noun>`  | Create new item (fails if exists)   | Created item               |
| `upsert<Noun>`  | Create or update item               | Updated/created item       |
| `set<Noun>`     | Create or update (dictionary-like)  | Updated/created item       |
| `update<Noun>`  | Update existing (fails if missing)  | Updated item               |
| `replace<Noun>` | Replace existing (fails if missing) | Replaced item              |
| `get<Noun>`     | Retrieve item                       | Item or null               |
| `list<Noun>s`   | List items                          | PagedAsyncIterableIterator |
| `<noun>Exists`  | Check existence                     | boolean                    |
| `delete<Noun>`  | Delete item (succeeds if missing)   | void                       |

**MUST NOT:**

- Include noun when operating on the resource itself (e.g., `delete()` not `deleteItem()` on ItemClient)

## Options and Parameters

### Options Naming

**MUST:**

- Name options bags as `<ClassName>Options` or `<MethodName>Options`
- Use `OperationOptions` from Azure Core if no custom options needed
- Name abort signal options `abortSignal`
- Suffix durations with `In<Unit>` (e.g., `timeoutInMs`, `delayInSeconds`)

### Retry Options

**MUST support:**

- `retryMode`: 'fixed' | 'linear' | 'exponential'
- `maxRetries`: number >= 0
- `retryDelayInMs`: number > 0
- `maxRetryDelayInMs`: number > 0
- `tryTimeoutInMs`: number > 0

## Async Patterns and Modern JavaScript

**MUST:**

- Use built-in Promises for async operations
- Accept `AbortSignalLike` on all async calls
- Use iterators and async iterators for sequences

**SHOULD:**

- Use `async` functions for implementing async APIs
- Prefer interface types over class types for parameters

**Example of good async patterns:**

```typescript
// Good async iterator
async function* listItems() {
  for (const item of items) {
    yield item;
  }
}

// Good with AbortSignal
async function getItem(id: string, options: { abortSignal?: AbortSignal } = {}) {
  // Implementation
}
```

## Response Formats

**MUST:**

- Optimize for returning the logical entity (99%+ case)
- Make complete response (headers, status, body) accessible
- Provide enough information for error remediation

**MUST NOT:**

- Use property names `object` or `value` in logical entities
- Return headers/metadata unless it's clear which request they correspond to

## Pagination

**MUST:**

- Provide `list` methods that return `PagedAsyncIterableIterator`
- Support `continuationToken` in `byPage()` method
- Use consistent page interface with `continuationToken` property

```typescript
interface PagedAsyncIterableIterator<TElement, TPage = TElement[]> {
  next(): Promise<IteratorResult<TElement>>;
  [Symbol.asyncIterator](): PagedAsyncIterableIterator<TElement, TPage>;
  byPage: (settings?: {
    continuationToken?: string;
  }) => AsyncIterableIterator<ContinuablePage<TElement, TPage>>;
}
```

## Long Running Operations (LROs)

**MUST:**

- Use objects that encapsulate polling and operation status
- Support: querying state, async completion notification, cancellation, manual polling
- Prefix LRO method names with `begin`
- Support `pollInterval` configuration
- Use `@azure/core-lro` package abstractions

**MUST NOT:**

- Cancel the service operation when cancellation token is triggered (only cancel polling)

## Model Types

**MUST:**

- Follow naming conventions:
  - `<Model>` - Full resource data
  - `<Model>Details` - Less important details (attach as `details` property)
  - `<Model>Item` - Partial data for enumeration
  - `<Operation>Options` - Method parameters
  - `<Operation>Result` - Operation-specific results

## Conditional Requests

When model has `etag` property:

- `onlyIfChanged` - sets `if-match` header
- `onlyIfUnchanged` - sets `if-none-match` header
- `onlyIfMissing` - sets `if-none-match: *`
- `onlyIfPresent` - sets `if-match: *`

When model lacks `etag`:

- Use `conditions.ifMatch`, `conditions.ifNoneMatch`, etc.

## TypeScript-Specific Requirements

**MUST:**

- Implement library in TypeScript
- Include type declarations
- Set `tsconfig.json` properly:
  - `strict: true`
  - `esModuleInterop: true`
  - `allowSyntheticDefaultImports: true`
  - `forceConsistentCasingInFileNames: true`
  - `declaration: true`
  - `sourceMap: true` and `declarationMap: true`
  - `importHelpers: true`

**MUST NOT:**

- Use TypeScript namespaces
- Use `const enum`
- Set `compilerOptions.lib` field
- Set `experimentalDecorators: true`

## Using Azure Core

**MUST:**

- Use Azure Core packages for consistent behavior:
  - `@azure/core-rest-pipeline` - HTTP pipeline
  - `@azure/core-auth` - Authentication
  - `@azure/core-lro` - Long-running operations
  - `@azure/core-paging` - Pagination
  - `@azure/logger` - Logging
  - `@azure/core-tracing` - Distributed tracing
