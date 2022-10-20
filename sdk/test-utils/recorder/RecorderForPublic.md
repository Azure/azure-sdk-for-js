
- To **record** means to intercept any HTTP request, store it in a file, then store the response received from the live resource that was originally targeted. We leverage the unified out-of-process test proxy server that is built for this use case.
  - Else, based on the file path that you provide, the recording files are generated (Examples below. #TODO )
- To **playback** means to intercept any HTTP request and to respond it with the stored response of a previously recorded matching request.
- **Sensitive information** means content that should not be shared publicly. Content like passwords, unique identifiers or personal information should be cleaned up from the recordings. Some functionality is provided to fix this problem. You can read more at [securing sensitive data](#securing-sensitive-data).


## Getting started

We're about to go through how to set up your project to use the `@azure-tools/test-recorder` package.

If you're a developer depending on the Azure SDKs(published to npm) for JS, and want to test (Azure SDK) clients in your applications with minimal live Azure resources, you're in the right place.

### Installing the package

From this point forward, we'll assume that you're developing a project that depends on one of the Azure SDKs that are published to npm. 

Let's say you depend on the `@azure/data-tables`, an Azure SDK package that is published to npm, you'll be doing the following to install the package:

```bash
npm install @azure-tools/test-recorder@^2.0.0 --dev
```

If you use `@azure/identity` too, also install `"@azure-tools/test-credential"` package.

```bash
npm install @azure-tools/test-credential@^1.0.0 --dev
```

You may see something like below in your package.json.

```json
{
  // ... your package.json properties
  "devDependencies": {
    // ... your devDependencies
    "@azure-tools/test-credential": "^1.0.0", // If you are using `@azure/identity` in your tests
    "@azure-tools/test-recorder": "^2.0.0"
    // ... more of your devDependencies
  }
  // ... more of your package.json properties
}
```

And you're ready! Now you can use the test recorder in your code, as shown below:

```typescript
import { Recorder } from "@azure-tools/test-recorder";
```

Or, if you know what you want to import, you can also do the following:

```typescript
import { Recorder, RecorderStartOptions, env, SanitizerOptions } from "@azure-tools/test-recorder";
```


