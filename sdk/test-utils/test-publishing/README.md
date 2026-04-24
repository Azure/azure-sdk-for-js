# Azure Tools - Test Publishing

**Note: This project is a test utility that assists with authoring sample-tests in the Azure SDK for JavaScript repository. This is not intended for public use.**

This library provides **stage-polymorphism primitives** for the unified sample-tests system. Sample-tests are vitest tests that double as publishable customer-facing samples. A compiler performs stage erasure to transform test code into clean sample code — and the primitives in this library are the explicit staging constructs that bridge the two stages.

## Getting started

### Installation

Add this library as a dev dependency in your package:

```sh
pnpm add --filter=@azure/<your-package> -D @azure-tools/test-publishing
```

## Key concepts

### The two-stage model

Source code in a sample-test exists at two stages:

- **Test stage (T)** — runs in vitest with recorder support, assertions, and test credentials.
- **Sample stage (S)** — published for customers with `main()` wrapper, real credentials, no test infrastructure.

The sample compiler performs **stage erasure** — it classifies imports by provenance, eliminates dead references transitively, and replaces explicit staging constructs. The primitives in this library are those explicit constructs.

### `forPublishing(testValue, () => publishedValue)`

The core staging primitive. Use it when an expression must differ between stages:

```ts
import { forPublishing } from "@azure-tools/test-publishing";
import { createTestCredential } from "@azure-tools/test-credential";
import { DefaultAzureCredential } from "@azure/identity";

// At test time: uses createTestCredential()
// In published sample: uses new DefaultAzureCredential()
const credential = forPublishing(createTestCredential(), () => new DefaultAzureCredential());
```

**Runtime**: returns `testValue`. The callback is never called at runtime — the compiler extracts the arrow body.
**Compiler**: replaces `forPublishing(testExpr, () => sampleExpr)` with `sampleExpr`.
**Type safety**: the generic `<T>` ensures both values share the same type.

### `sampleOnly(() => publishedValue)`

Injects an expression that only appears in the published sample:

```ts
import { sampleOnly } from "@azure-tools/test-publishing";

// This console.log appears in the sample but is a no-op during tests
sampleOnly(() => console.log("Starting the sample..."));
```

**Runtime**: returns `undefined`. The callback is never called at runtime — the compiler extracts the arrow body.
**Compiler**: replaces `sampleOnly(() => expr)` with `expr`.

## Next steps

See the [Unified Sample-Tests Design Document](../../../design/sample-tests-unification.md) for the full design, including the stage erasure model, authoring format, and migration guide.

## Troubleshooting

Log an issue at https://github.com/Azure/azure-sdk-for-js/issues

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.
