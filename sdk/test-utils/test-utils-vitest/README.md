# Azure test-utils client library for JavaScript

The Azure SDK for JavaScript is composed of a multitude of repositories that attempt to deliver a common, homogenous SDK to make use of all the services that Azure can provide.

This non-shipping library `@azure-tools/test-utils-vitest` attempts to add additional testing support to libraries. It is supposed to be added only as a devDependency and should be used only for the tests of an SDK library.

## Getting started

We're about to go through how to set up your project to use the `@azure/test-utils-vitest` package.

This document assumes familiarity with [git](https://git-scm.com) and [pnpm](https://pnpm.io/).
You can read more about how we use pnpm in the following links:

- pnpm used for [Project Orchestration](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md#project-orchestration).
- [pnpm for NPM users](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md#pnpm-for-npm-users).

Keep in mind that `@azure/test-utils-vitest` is not a published package. It is only intended
to be used by the libraries in the `Azure/azure-sdk-for-js` repository and its forks.

### Installing the package

To install the `@azure/test-utils-vitest` package, you'll need to start by cloning our
`azure-sdk-for-js` repository. One way of doing this is by using the git command line interface, as
follows:

```bash
cd /path/to/my/github/repositories
git clone https://github.com/Azure/azure-sdk-for-js/
```

Having cloned this repository, let's set it up by running the following pnpm commands:

```bash
cd azure-sdk-for-js
pnpm install
pnpm build
```

This will optimistically assume you're in a fresh clone.

From this point forward, we'll assume that you're developing (perhaps contributing!) to one of the
`azure-sdk-for-js`'s libraries. So, your next step is to change directory to the path relevant to
your project. Let's say you want to add the `@azure/test-utils-vitest` package to
`@azure/keyvault-keys`, you'll be doing the following:

```bash
cd sdk/keyvault/keyvault-keys
```

Once there, you can add the `test-utils` package by changing your package.json
to include the following line in the `devDependencies` section:

```json
{
  // ... your package.json properties
  "devDependencies": {
    // ... your devDependencies
    "@azure/test-utils-vitest": "^2.0.0"
    // ... more of your devDependencies
  }
  // ... more of your package.json properties
}
```

After that, we recommend you to update pnpm and install the dependencies again, as follows:

```bash
pnpm install
```

## Key concepts

### Custom Testing Matrix

Most Azure SDK for JavaScript libraries support multiple methods of authentication. The `@azure/test-utils-vitest` library attempts to add testing support for writing a single test suite then running your suite multiple times based on a provided testing matrix. The most common usage is to construct your client with a different authentication method for test runs.

## Examples

### Import functions

<!-- dev-tool snippets ignore -->

```javascript
import { matrix } from "@azure/test-utils-vitest";
```

### Wrap top-level test suite to run test matrix

Wrap the top level `describe` of a test file to run the suite with the provided values.

```typescript
matrix(
  [
    [true, false],
    [1, 2, 3],
  ] as const,
  (enabled: boolean, attempts: number) => {
    describe(`Run with flag ${enabled ? "" : "not "}enabled and ${attempts} attempts`, () => {
      // ...
    });
  },
);
```

`matrix` takes a jagged 2D array and a function. It then runs this function with every possible combination of elements of each of the arrays. The example above will therefore generate 6 different test suites based on the values passed.

## Troubleshooting

Besides the usual debugging of your code and tests, if you ever encounter a problem, please follow
up the [contributing](#contributing) guidelines on how to write an issue for us. We'll make sure to
handle it as soon as we find the time.

## Next steps

Check out the [source folder](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/test-utils-vitest/src/) and the [test folder](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/test-utils-vitest/test/).

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.
