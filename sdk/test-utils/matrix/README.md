# Azure test-utils-matrix client library for JavaScript

The Azure SDk for JavaSCript is composed of a multitude of repositories that attempt to deliver a common, homogenous SDK to make use of all the services that Azure can provide.

This non-shipping library `@azure/test-utils-matrix` attempts to add testing support for libraries that want to run full test suites with value changes without duplicating test code. It is supposed to be added only as a devDependency and should be used only for the tests of an SDK library.

## Getting started

We're about to go through how to set up your project to use the `@azure/test-utils-matrix`
package.

This document assumes familiarity with [git](https://git-scm.com) and [rush](https://rushjs.io).
You can read more about how we use rush in the following links:

- Rush used for [Project Orchestration](https://github.com/sadasant/azure-sdk-for-js/blob/master/CONTRIBUTING.md#project-orchestration).
- [Rush for NPM users](https://github.com/sadasant/azure-sdk-for-js/blob/master/CONTRIBUTING.md#rush-for-npm-users).

Keep in mind that `@azure/test-utils-matrix` is not a published package. It is only intended to be used by the libraries in the `azure-sdk-for-js` repository.

### Installing the package

To install the `@azure/test-utils-matrix` package, you'll need to start by cloning our
`azure-sdk-for-js` repository. One way of doing this is by using the git command line interface, as
follows:

```bash
cd /path/to/my/github/repositories
git clone https://github.com/Azure/azure-sdk-for-js/
```

Having cloned this repository, let's set it up by running the following rush commands:

```bash
cd azure-sdk-for-js
rush update
rush build
```

This will optimistically assume you're in a fresh clone.

From this point forward, we'll assume that you're developing (perhaps contributing!) to one of the `azure-sdk-for-js`'s libraries. So, your next step is to change directory to the path relevant to your project. Let's say you want to add the `@azure/test-utils-matrix` package to
`@azure/keyvault-keys`, you'll be doing the following:

```bash
cd sdk/keyvault/keyvault-keys
```

Once there, you can add the `test-utils-matrix` package by changing your package.json
to include the following line in the `devDependencies` section:

```bash
{
  // ... your package.json properties
  "devDependencies": {
    // ... your devDependencies
    "@azure/test-utils-matrix": "^1.0.0",
    // ... more of your devDependencies
  },
  // ... more of your package.json properties
}
```

After that, we recommend you to update rush and install the dependencies again, as follows:

```bash
rush update
```

## Key concepts

Most Azure SDK for JavaScript libraries support multiple methods of authentication. This library gives the ability to write a single test suite and construct your client with a different authentication method for test runs.

## Examples

### Import matrix function

```javascript
import { matrix } from "@azure/test-utils-matrix";
```

### Wrap top-level test suite

Wrap the top level `describe` of a test file to run the suite with the provided values.

```typescript
matrix(
  [
    [true, false],
    [1, 2, 3]
  ] as const,
  (enabled: boolean, attempts: number) => {
    describe(`Run with flag ${enabled ? "" : "not "}enabled and ${attempts} attempts`, () => {
      // ...
    });
  }
);
```

`matrix` takes a jagged 2D array and a function. It then runs this function with every possible combination of elements of each of the arrays. The example above will therefore generate 6 different test suites based on the values passed.

## Troubleshooting

Besides the usual debugging of your code and tests, if you ever encounter a problem, please follow
up the [contributing](#contributing) guidelines on how to write an issue for us. We'll make sure to
handle it as soon as we find the time.

## Next steps

For a more examples on ways you can use this library check out how [`@azure/ai-form-recognizer`](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer) uses it in their testing.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)
