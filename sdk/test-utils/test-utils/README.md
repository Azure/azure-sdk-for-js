# Azure test-utils client library for JavaScript

The Azure SDK for JavaScript is composed of a multitude of repositories that attempt to deliver a common, homogenous SDK to make use of all the services that Azure can provide.

This non-shipping library `@azure/test-utils` attempts to add additional testing support to libraries. It is supposed to be added only as a devDependency and should be used only for the tests of an SDK library.

## Getting started

We're about to go through how to set up your project to use the `@azure/test-utils` package.

This document assumes familiarity with [git](https://git-scm.com) and [rush](https://rushjs.io).
You can read more about how we use rush in the following links:

- Rush used for [Project Orchestration](https://github.com/sadasant/azure-sdk-for-js/blob/master/CONTRIBUTING.md#project-orchestration).
- [Rush for NPM users](https://github.com/sadasant/azure-sdk-for-js/blob/master/CONTRIBUTING.md#rush-for-npm-users).

Keep in mind that `@azure/test-utils` is not a published package. It is only intended
to be used by the libraries in the `azure-sdk-for-js` repository.

### Installing the package

To install the `@azure/test-utils` package, you'll need to start by cloning our
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
rush install
rush build
```

This will optimistically assume you're in a fresh clone.

From this point forward, we'll assume that you're developing (perhaps contributing!) to one of the
`azure-sdk-for-js`'s libraries. So, your next step is to change directory to the path relevant to
your project. Let's say you want to add the `@azure/test-utils` package to
`@azure/keyvault-keys`, you'll be doing the following:

```bash
cd sdk/keyvault/keyvault-keys
```

Once there, you can add the `test-utils` package by changing your package.json
to include the following line in the `devDependencies` section:

```bash
{
  // ... your package.json properties
  "devDependencies": {
    // ... your devDependencies
    "@azure/test-utils": "^1.0.0",
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

### Multi-version Testing

One of the promises of the modern Azure SDK libraries is to support the last N service API versions. `@azure/test-utils` attempts to add testing support for
libraries that support multiple service API versions. The idea employed in this library is inspired by [mocha-tags](https://www.npmjs.com/package/mocha-tags).

- Our guideline recommends that service client supporting multiple service API version takes an API
  version via the `serviceVersion` property of its constructor options bag `*ClientOptions`.
- Service API versions supported by the SDK library under test is specified for a top-level Mocha
  `describe()` test suite. We loop through them and run the test suite on each version.
  - Testing of multi-service-version support is only done in `live` test mode. For other test modes
    (`record`, `soft-record`, and `playback`), tests are only running for the latest version, or a
    chosen version specified via options in case the latest version is not the latest stable version.
- Optionally a list or range of versions can be specified for a nested `describe()` test suite or
  `it()` test case. If the version being tested is not in the range of versions supported by this
  test suite/case, then the test suite/case is skipped.

### Custom Testing Matrix

Most Azure SDK for JavaScript libraries support multiple methods of authentication. The `@azure/test-utils` library attempts to add testing support for writing a single test suite then running your suite multiple times based on a provided testing matrix. The most common usage is to construct your client with a different authentication method for test runs.

## Examples

### Import functions

```javascript
import { versionsToTest } from "@azure/test-utils";
```

### Wrap top-level test suite to test multiple versions

Wrap a top level `describe()` of a test file to enable testing for multiple versions for that test suite:

```javascript
const serviceApiVersions = ["7.0", "7.1"] as const;
versionsToTest(serviceApiVersions, {}, (serviceVersion, onVersions) => {
  describe("Keys client - list keys in various ways", async function() {
   // ...
  }
}
```

`versionsToTest()` takes in a list of versions that are supported by the library. it checks the
current `TEST_MODE` then either runs tests for all supported versions in `live` test mode, or runs
tests for just one version (default version if specified in options, or latest version in the list)
in other test modes. The top-level test suites, as well as nested test suites/test cases have access
to the current version being tested - `serviceVersion` - so they can verify different
behavior/expectation if any for different service API versions.

The code to construct clients for testing also needs an update to pass the `serviceVersion` to
client constructors.

```javascript
const testClient = await new TestClient(this, serviceVersion);
```

If all your tests can run across all supported service API versions then this is all you need to do.

### Override supported versions for tests

By default, a test suite or test case is executed against each `serviceVersion`. Optionally one can
also use `onVersions()` to specify a list (`ReadOnlyArray<string>`) or a range (`{minVer?: string, maxVer?: string }`) of supported versions for selected test suites or test cases:

```javascript
// Test author must ensure the list of versions are ordered from oldest to latest.
const serviceApiVersions = ["7.0", "7.1"] as const;
versionsToTest(serviceApiVersions, {}, (serviceVersion, onVersions) => {
// ...
  onVersions(["7.1"]).describe(
    "Test suite that only runs for service version 7.1",
    async function() {
      it("some test case", async function() {
        // ...
      });
    }
  );
  // ...
})
```

When running in the `live` test mode,

- with `onVersions(...).` prepended to `describe()` or `it()`, the multi-version test framework would
  check the current `serviceVersion` against the supported versions of the test suite/test case. If
  a test case is skipped, the skip reason is also appended to the title of that test suite or test
  case.tests will be executed or skipped accordingly.
- without `onVersions(...).`, original Mocha `describe()` and `it()` methods are used.

Here's some sample output (for demo purpose, not from real keyvault test runs):

```bash
  Keys client - list keys in various ways (service version 7.0)
    - can purge all keys
    √ can get the versions of a key (4095ms)
name: AbortError, message: The operation was aborted.
    √ can get the versions of a key with requestOptions timeout
    √ can get the versions of a key (paged) (5905ms)
    - list 0 versions of a non-existing key (Skipping for version 7.0 as it is not in the range: [min 7.1, max <unspecified>])
    √ list 0 versions of a non-existing key (paged) (469ms)
    √ can get several inserted keys (12636ms)
name: AbortError, message: The operation was aborted.
    √ can get several inserted keys with requestOptions timeout
    √ can get several inserted keys (paged) (14693ms)
    √ list deleted keys (11593ms)
name: AbortError, message: The operation was aborted.
    √ list deleted keys with requestOptions timeout
    √ list deleted keys (paged) (13791ms)

  Keys client - list keys in various ways (service version 7.1)
    - can purge all keys
    √ can get the versions of a key (6101ms)
name: AbortError, message: The operation was aborted.
    √ can get the versions of a key with requestOptions timeout
    - can get the versions of a key (paged) (Skipping for version 7.1 as it is not in the list [7.0])
    √ list 0 versions of a non-existing key (562ms)
    √ list 0 versions of a non-existing key (paged) (525ms)
    √ can get several inserted keys (11732ms)
name: AbortError, message: The operation was aborted.
    √ can get several inserted keys with requestOptions timeout
    √ can get several inserted keys (paged) (11952ms)
    √ list deleted keys (14316ms)
name: AbortError, message: The operation was aborted.
    √ list deleted keys with requestOptions timeout
    √ list deleted keys (paged) (13217ms)
```

### Specify service version to use in recording/playback

Most of time we run record/playback using the latest version. There may be occasions when another
version is desired (e.g., when the latest is a beta version and we want playback tests to test the
stable version). We can specify a version via `MultiVersionTestOptions` passed to
`versionsToTest()` method:

```javascript
versionsToTest(
  ["7.0", "7.1", "7.2-preview"],
  { versionForRecording: "7.1" },
  (serviceVersion, onVersions) => {
    // ...
  }
);
```

### Disable multi-version testing via environment variable

Running live tests against multiple service versions takes more time than running against a single service version. It may be desirable to only test multiple service version in non-nightly build pipelines, for example, weekly runs with a higher timeout limit. An environment variable `DISABLE_MULTI_VERSION_TESTING` is introduced to disable live testing against multiple service versions when it is set.

### Wrap top-level test suite to run test matrix

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

Check out the [source folder](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/test-utils/src/) and the [test folder](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/test-utils/test/).

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Ftest-utils%2Fmulti-version%2FREADME.png)
