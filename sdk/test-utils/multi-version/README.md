## Azure SDK for JavaScript's test-utils-multi-version

The Azure SDK for JavaScript is composed of a multitude of repositories that attempt to deliver a
common, homogenous SDK to make use of all of the services that Azure can provide. One of the
promises the Azure SDK libraries is to support the last N service API versions.

This non-shipping library `@azure/test-utils-multi-version` attempts to add testing support for
libraries that supports multiple service API versions. It is supposed to be added only as a
devDependency and should be used only for the tests of an SDK library.

The idea employed in this library is inspired by [mocha-tags](https://www.npmjs.com/package/mocha-tags).

## Key concepts

- Our guideline recommends service client supporting multiple service API version takes an API
  version via the `serviceVersion` property of its constructor options bag `*ClientOptions`.
- Service API versions supported by the SDK library under test is specified for a top-level Mocha
  `describe()` test suite. We loop through them and run the test suite on each version.
  - Testing of multi-service-version support is only done in `live` test mode. For other test modes
    (`record`, `soft-record`, and `playback`), tests are only running for the latest version, or a
    chosen version specified via options in case the latest version is not the latest stable version.
- Optionally a list or range of versions can be specified for a nested `describe()` test suite or
  `it()` test case. If the version being tested is not in the range of versions supported by this
  test suite/case then the test suite/case is skipped.

## Get started

We're about to go through how to set up your project to use the `@azure/test-utils-multi-version`
package.

This document assumes familiarity with [git](https://git-scm.com) and [rush](https://rushjs.io).
You can read more about how we use rush in the following links:

- Rush used for [Project Orchestration](https://github.com/sadasant/azure-sdk-for-js/blob/master/CONTRIBUTING.md#project-orchestration).
- [Rush for NPM users](https://github.com/sadasant/azure-sdk-for-js/blob/master/CONTRIBUTING.md#rush-for-npm-users).

Keep in mind that `@azure/test-utils-multi-version` is not a published package. It is only intended
to be used by the libraries in the `azure-sdk-for-js` repository.

### Installing the package

To install the `@azure/test-utils-multi-version` package, you'll need to start by cloning our
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
your project. Let's say you want to add the `@azure/test-utils-multi-version` package to
`@azure/keyvault-keys`, you'll be doing the following:

```bash
cd sdk/keyvault/keyvault-keys
```

Once there, you can add the `test-utils-multi-version` package by changing your package.json
to include the following line in the `devDependencies` section:

```bash
{
  // ... your package.json properties
  "devDependencies": {
    // ... your devDependencies
    "@azure/test-utils-multi-version": "^1.0.0",
    // ... more of your devDependencies
  },
  // ... more of your package.json properties
}
```

After that, we recommend you to update rush and install the dependencies again, as follows:

```bash
rush update && rush install
```

And you're ready to test your library for multiple service API versions!

### Import functions

```javascript
import { supports, versionsToTest, SupportedVersions } from "@azure/test-utils-multi-version";
```

### Wrap top-level test suite

Wrap a top level `describe()` of a test file to enable testing for multiple versions for that test suite:

```javascript
versionsToTest(["7.0", "7.1"]).forEach((serviceVersion) => {
  describe("Keys client - list keys in various ways", async function() {
   // ...
  }
}
```

`versionsToTest()` takes in a list of versions that are supported by the library. it checks the
current `TEST_MODE` then either runs tests for all supported versions in `live` mode, or runs tests
for just one version (default version if specified in options, or latest version in the list). The
test suite, and its nested test suites/test cases all have access to the current version being
tested - `serviceVersion` - so they can verify different behavior/expectation if any for different
service API versions.

The code to construct clients for testing also needs update to pass the `serviceVersion` to client
constructors.

```javascript
const authentication = await authenticate(this, serviceVersion);
```

If all your tests can run across all supported service API versions then this is all you need to do.

### Override supported versions for tests

By default, a test suite or test case is executed against each `serviceVersion`. Optionally one can
also specify a list (`string[]`) or a range (`{minVer?: string, maxVer?: string }`) of supported
versions for test suites or test cases:

```javascript
  supports(serviceVersion, ["7.0", "7.1"]).describe(
    "Keys client - list keys in various ways",
    async function() {
      supports(serviceVersion, ["7.0", "7.1"]).it("runs for 7.0 and 7.1", async function() {
        // ...
      });

      supports(serviceVersion, { minVer: "7.1" }).it(
        "runs on version 7.1 or later",
        async function() {
          // ...
        }
      );

      supports(serviceVersion, { maxVer: "7.1" }).it(
        "runs on version 7.1 or older",
        async function() {
          // ...
        }
      );
    }
  );
```

Having to pass `serviceVersion` is a bit excessive and affects readability. We could improve this by
introduce a function object `versions` which "encapsulates" the `serviceVersion`:

```javascript
versionsToTest(["7.0", "7.1"]).forEach((serviceVersion) => {
  const versions = function(versions: SupportedVersions) {
    return supports(serviceVersion, versions);
  };

 // ...
}
```

Then the code becomes

```javascript
  versions(["7.0", "7.1"]).describe("Keys client - list keys in various ways", async function() {
    versions(["7.0", "7.1"]).it("runs for 7.0 and 7.1", async function() {
      // ...
    });

    versions({ minVer: "7.1" }).it("runs on version 7.1 or later", async function() {
      // ...
    });

    versions({ maxVer: "7.1" }).it("runs on version 7.1 or older", async function() {
      // ...
    });
  });
```

When running in the `live` test mode,

- with `versions(...).` prepended to `describe()` or `it()`, the multi-version test framework would
  check the current `serviceVersion` against the supported versions of the test suite/test case. If
  a test case is skipped, the skip reason is also appended to the title of that test suite or test
  case.tests will be executed or skipped accordingly.
- without `versions(...).`, original Mocha `describe()` and `it()` methods are used.

Here's some sample output:

```bash
  Keys client - list keys in various ways (service version 7.0)
    - can purge all keys
    √ can get the versions of a key (8950ms)
name: AbortError, message: The operation was aborted.
    √ can get the versions of a key with requestOptions timeout
    √ can get the versions of a key (paged) (6337ms)
    - list 0 versions of a non-existing key (Skipping for version 7.0 as it's not in the range: [min 7.1, max <unspecified>])
    √ list 0 versions of a non-existing key (paged) (680ms)
    - can get several inserted keys (Skipping for version 7.0 as it's not in the range: [min 7.3, max 7.5])
name: AbortError, message: The operation was aborted.
    √ can get several inserted keys with requestOptions timeout
    √ can get several inserted keys (paged) (12275ms)
    √ list deleted keys (12088ms)
name: AbortError, message: The operation was aborted.
    √ list deleted keys with requestOptions timeout
    √ list deleted keys (paged) (12775ms)

  Keys client - list keys in various ways (service version 7.1)
    - can purge all keys
    √ can get the versions of a key (6126ms)
name: AbortError, message: The operation was aborted.
    √ can get the versions of a key with requestOptions timeout
    - can get the versions of a key (paged) (Skipping for version 7.1 as it's not in the list [7.0])
    √ list 0 versions of a non-existing key (707ms)
    √ list 0 versions of a non-existing key (paged) (700ms)
    - can get several inserted keys (Skipping for version 7.1 as it's not in the range: [min 7.3, max 7.5])
name: AbortError, message: The operation was aborted.
    √ can get several inserted keys with requestOptions timeout
    √ can get several inserted keys (paged) (11646ms)
    √ list deleted keys (12396ms)
name: AbortError, message: The operation was aborted.
    √ list deleted keys with requestOptions timeout
    √ list deleted keys (paged) (13891ms)
```

### Specify service version to use in recording/playback

Most of time we run record/playback using the latest version. There may be occasions when another
version is desired (e.g., when the latest is a beta version and we want playback tests to test the
stable version). We can specify a version via `MultiVersionTestOptions` passed to
`versionsToTest()` method:

```javascript
versionsToTest(["7.0", "7.1", "7.2-preview"], { versionForRecording: "7.1" }).forEach(
  (serviceVersion) => {
    // ...
  }
);
```

### Provide a custom version string comparison method

By default, the version strings are sorted using built-in string comparison. This sorting order may
not work for some services. It is supported to override the string comparison via
`MultiVersionTestOptions` property `compareFunc`, for example:

```javascript
const semverCompare = require('semver/functions/compare')

versionsToTest(["7.0", "7.1", "7.1-preview"], { compareFunc: semverCompare }).forEach((serviceVersion) => {
  // ...
});
```

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Ftest-utils%2Fmulti-version%2FREADME.png)
