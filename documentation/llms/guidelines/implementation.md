# Azure SDK TypeScript Guidelines - Implementation

### Environment Variables

**MUST:**

- Prefix Azure environment variables with `AZURE_`
- Get Architecture Board approval for new environment variables
- Use format: `AZURE_<ServiceName>_<ConfigurationKey>`

**MUST NOT:**

- Use non-alpha-numeric characters except underscore

## Parameter Validation

**MUST:**

- Validate client parameters (used to construct URI, file uploads, etc.)
- Validate developer experience with service parameters

**MUST NOT:**

- Validate service parameters (let service handle validation)

## Network Requests

**MUST:**

- Use HTTP pipeline from `@azure/core-rest-pipeline`
- Implement required policies: Telemetry, Unique Request ID, Retry, Authentication, Response downloader, Distributed tracing, Logging

**SHOULD:**

- Use Azure Core policy implementations when possible
- Engage Architecture Board before writing custom policies

## Authentication

**MUST:**

- Provide authentication policy for non-standard credentials
- Support custom connection strings if needed

**MUST NOT:**

- Persist, cache, or reuse security credentials
- Create security vulnerabilities (PII leakage, credential leakage)

## Error Handling

**MUST:**

- Produce error when HTTP request fails with non-successful status
- Include HTTP response and originating request in error
- Include rich service error information in service-specific properties
- Document errors that methods can produce

**SHOULD:**

- Prefer exceptions over error return values
- Coerce incorrect types when possible (JavaScript fuzziness)
- Check error `name` property instead of `instanceof` in catch clauses

**MUST NOT:**

- Create new error types unless developer can take alternate action
- Create new error types when built-in types suffice

**Built-in Error Types:**

- `TypeError` - Wrong type passed
- `RangeError` - Value outside allowable range
- `Error` - Other validation failures

## Distributed Tracing

**MUST:**

- Support OpenTelemetry for distributed tracing
- Take `parentSpanId` option for all async operations
- Pass context to backend via appropriate headers (`traceparent`, `tracestate`)
- Create new span for each user-called method
- Create child span for each REST call
- Log polling status at Info level

## Dependencies

**MUST:**

- Depend on Azure Core library for common functionality

**MUST NOT:**

- Depend on other packages (thoroughly vetted through architecture review)
- Depend on concrete logging, DI, or configuration technologies (except Azure Core)

**SHOULD:**

- Consider copying/linking code to avoid dependencies
- Get Architecture Board approval for large dependencies

**SHOULD NOT:**

- Take dependencies on tiny libraries
- Depend on polyfills that modify global scope

**Blessed Dependencies:**

- `events` - Node EventEmitter polyfill
- `stream-browserify` - Node Stream polyfill for browsers
- `process` - Node Process polyfill
- `rhea` - AMQP library
- `rhea-promise` - Promisified rhea

## Testing

**SHOULD:**

- Use Mocha and Karma for testing (supports CI and browsers)

## Versioning

**MUST:**

- Change version when ANYTHING changes
- Increment patch for bug fixes
- Increment major/minor for new features or service API versions
- Use semantic versioning (semver)
- Support specific service API versions
- Provide ability to call specific supported service versions

**MUST NOT:**

- Include new features in patch releases
- Make breaking changes (requires Architecture Board approval)
- Have pre-release version for stable packages
- Have build metadata for stable packages

**SHOULD:**

- Increment major version for large feature changes

**Beta Packages:**

- Use format `1.0.0-beta.X` where X is integer

## Packaging

### Package Layout

```
azure-library/
├─ README.md
├─ LICENSE
├─ dist/           # Build
├─ types/          # TypeScript declarations
└─ package.json
```

**MUST:**

- Follow canonical file structure
- Add files explicitly via `package.json` files key

**MUST NOT:**

- Include `tsconfig.json` in package
- Use `.npmignore` files

### package.json Requirements

**MUST set:**

- `name`: `@azure/<service-name>` (kebab-case)
- `description`: Useful but terse description
- `keywords`: Array including "Azure", "cloud", service name
- `author`: "Microsoft Corporation"
- `license`: "MIT"
- `sideEffects`: false (unless explicitly approved)
- `main`: CommonJS/UMD entry point
- `module`: ES6 module entry point
- `types`: TypeScript declarations file
- `engine.node`: Supported Node versions
- `repository`: "github:Azure/azure-sdk-for-js"
- `homepage`: URL to library's readme in repo
- `bugs.url`: "https://github.com/Azure/azure-sdk-for-js/issues"

**Required scripts:**

- `build` - Generate main export
- `test` - Run functional tests

**MUST NOT:**

- Include ES6+ syntax in `main` entry point
- Depend on shell scripts for build/test

### Distribution Requirements

**MUST:**

- Include source code in source map files using `inlineSources`
- Include CommonJS or UMD build for Node support
- Flatten CommonJS/UMD build (use Rollup)
- Include ESM build
- Include original TypeScript sources

**MUST NOT:**

- Flatten ESM build
- Include browser bundle in package

### Module Requirements

**MUST:**

- Have named exports at top level

**MUST NOT:**

- Have default export at top level

## Service-Specific Common Libraries

**MUST:**

- Get Architecture Board approval before implementing
- Minimize code in common library
- Store in same namespace as associated clients

**Approval Criteria:**

- Consumer directly consumes objects from common library, AND
- Information shared between multiple client libraries

## Native Code

**SHOULD NOT:**

- Write platform-specific/native code unless language compiles to machine-native format
