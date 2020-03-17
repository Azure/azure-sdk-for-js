# Writing tests for the Azure SDK for JS/TS

## Index

- [Introduction](#introduction)
- [Engineering setup](#engineering-setup)
- [Recommended tools](#recommended-tools)
- [Structure of tests](#structure-of-tests)
- [Shared and reusable code](#shared-and-reusable-code)
- [Individual tests](#individual-tests)

## Introduction

## Engineering setup

## Recommended tools

## Structure of tests

## Shared and reusable code

Before writing individual test cases, we should explore what indications we should follow while writing reusable code.  Ideally, tests should be written clearly. While they should focus on ensuring the correct behavior of a targeted functionality, they should be able to be read with minimal context. Though it will be common to run into scenarios in which we will want to avoid repeating ourselves, to balance between clarity and practicality, we'll set up the following minimal rules on writing reusable code:

- [Preparing all of the test cases](#preparing-all-of-the-test-cases), where we will take a look at how to write re-usable code that will conform a valuable setup for all of the test cases in a given file.
- [Preparing some of the test cases](#preparing-some-of-the-test-cases), where we will go through examples of how to write re-usable code that might be used to set up some of the test cases.
- [Universal utilities](#universal-utilities), where we will see how to approach tools that could potentially be used by tests outside of the project in which the tests are hosted.

If a certain piece of code doesn't match any of these three categories, it should not be moved out of the test cases, and instead it should exist in full, inside of each test case. Let's see some quick examples of code outside of these three categories:

**Anti-pattern 1**, code that displays information (wether values or method names) that are absolutely related to the intention of the test, as follows:

```ts
// This function only calls a client's method "A".
async function callsClientMethodA(client) {
  await client.A();
}

describe("a set of tests", function() {
  it("can effectively call the client's method A", function() {
	  const client = null; // Let's say we actually have a client here.

    // The function invoked below hides exactly what we want to test.
	  await callsClientMethodA(client);
  });
});
```

Instead, this code should be written inside of the test case, as follows:

```ts
describe("a set of tests", function() {
  it("can effectively call the client's method A", function() {
	const client = null; // Let's say we actually have a client here.
    await client.A(); // Method "A" is clearly invoked inside of this test.
  });
});
```

**Anti-pattern 2**, code that is preparing something that is only relevant for one test case, as follows:

```ts
async function doSomePriorWork(client) {
  // Any code that won't be used outside of a specific test case.
  // Perhaps some client methods, like:
  await client.work();
  await client.workSomeMore();
  // Or some generation of values, like:
  const random = Math.random();
  // The return value or type is not important for this example.
}

describe("a set of tests", function() {
  it("can call client's method A with some prior work", function() {
	  const client = null; // Let's say we actually have a client here.
	  await doSomePriorWork(client); // No other test case uses "doSomePriorWork".
	  await client.A();
  });
});
```

Code that is intended to do preparations that are only specific for a single test case should be inside of that test case, as follows:

```ts
describe("a set of tests", function() {
  it("can call client's method A with some prior work", function() {
	  const client = null; // Let's say we actually have a client here.

	  // Prior work goes here...
    // Perhaps some client methods, like:
    await client.work();
    await client.workSomeMore();
    // Or some generation of values, like:
    const random = Math.random();

	  await client.A();
  });
});
```

Let's see some good and bad examples of reusable code in the three categories described above.

### Preparing all of the test cases

Re-usable code that will conform a valuable setup for all of the test cases in a given file should be placed in any of the Mocha methods `before`, `beforeEach`, `after` or `afterEach`, considering that:

- `before` and `beforeEach` should be used to define things that will be usable while the tests are running.
- `after` and `afterEach` should be used to tear down things that have been created in `before` and `beforeEach`.

Code in either of these methods can be abstracted away into utility functions that may live outside of each test file **only if** these pieces of code are relevant to more than one test file.

One specific example of code that **must** live in the `beforeEach` section is [the recorder](#the-recorder)'s initialization, and later in the `afterEach` section, the recorder's destruction. The following example can be seen in [the recorder's readme](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/test-utils/recorder/README.md):

```ts
  beforeEach(async function() {
    recorder = record(that);
    const credential = await new ClientSecretCredential(
      env.AZURE_TENANT_ID,
      env.AZURE_CLIENT_ID,
      env.AZURE_CLIENT_SECRET
    );

    const keyVaultUrl = "https://myKeyVault.vault.azure.net";
    client = new KeysClient(keyVaultUrl, credential);
  });

  afterEach(function () {
    recorder.stop();
  });
```

### Preparing some of the test cases

Some test cases might need some common setup to properly work. If at least more than one of these tests exist in a single file, their setup can be moved out of each test case into a function (or outside constant), as long as the function (or constant) is declared inside of that same test file, and as long as the common code is sufficiently large. For readability purposes, if the common code is less than four lines long (as an arbitrary reasonable estimate), it will be clearer if it's left repeated in each test case.

Let's define an example in which a SDK client might need several lines of setup in two specific tests:

```ts
describe("some group of functionalities", function() {
  let client;

  beforeEach(function() {
  	client = new Client();
  });

  it("should test A with a proper setup", function() {
    client.prepare({
      propertyA: 1,
      propertyB: 2,
      propertyC: 3,
      propertyD: 4,
    });

    const result = await client.A();
    expect(result.value).to.be(true);
  });

  it("should test B with a proper setup", function() {
    client.prepare({
      propertyA: 1,
      propertyB: 2,
      propertyC: 3,
      propertyD: 4,
    });

    const result = await client.B();
    expect(result.value).to.be(true);
  });
});
```

It is possible to move the common setup code to a function in the same file, as in the following example code:

```ts
describe("some group of functionalities", function() {
  let client: Client;

  beforeEach(function() {
  	client = new Client();
  });

  function defaultPrepareClient(client: Client) {
    client.prepare({
      propertyA: 1,
      propertyB: 2,
      propertyC: 3,
      propertyD: 4,
    });
  }

  it("should test A with a proper setup", function() {
    defaultPrepareClient(client);
    const result = await client.A();
    expect(result.value).to.be(true);
  });

  it("should test B with a proper setup", function() {
    defaultPrepareClient(client);
    const result = await client.B();
    expect(result.value).to.be(true);
  });
});
```

### Universal utilities

In case that a specific utility function might be useful for more than one test case, and more than one test file, and even potentially in more than one project, this code should be moved away from each client into a common private package in the [test-utils](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/test-utils/) folder. If the package doesn't exist, it should be created.

Let's say we have a test utility that we call `retry.ts`, with the following content:

```ts
import { delay as coreDelay } from "@azure/core-http";

/**
 * A simple abstraction to retry, and exponentially de-escalate retrying, a
 * given async function until it is fulfilled.
 * @param {() => Promise<T>} target The async function you want to retry
 * @param {number} delay The delay between each retry, defaults to 1000
 * @param {number} timeout Maximum time we'll let this lapse before we quit retrying, defaults to Infinity
 * @param {number} increaseFactor Increase factor of each retry, defaults to 1
 * @returns {Promise<any>} Resolved promise
 */
export async function retry<T>(
  target: () => Promise<T>,
  delay: number = 1000,
  timeout: number = Infinity,
  increaseFactor: number = 1
): Promise<any> {
  const start = new Date().getTime();
  let updatedDelay = delay;
  while (new Date().getTime() - start < timeout) {
    try {
      return await target();
    } catch {
      await coreDelay(updatedDelay);
      updatedDelay *= increaseFactor;
    }
  }
  return null;
}
```

This code is clearly not specifically related to any of our projects. Moving it out into a common project will help it's discoverability, not only for other developers to find it, but also to avoid having to upload this code at all, if there happens to be an already existing tool that can be used for the same purpose.

## Writing test cases

While considering possible differences in the [Shared and reusable code](#shared-and-reusable-code) that tests might have, or where they might be placed in the [Test folder structure](#test-folder-structure), test should be similar in each one of our projects. We can ensure some level of homogeneity through the use of our [Recommended tools](#recommended-tools), though we still need to explore what are the indications on writing each test case.

In this section we will be examining our recommendations of:

- [What a test is actually testing](#what-a-test-is-actually-testing), where we will examine how many different things each test should be mainly doing.
- [Test titles](#test-titles), where we will examine how to properly phrase what each test is doing, and how to make them easier to discover through pattern matching.
- [Inner parts of a test](#inner-parts-of-a-test), where we will go through how the bodies of each test case should generally be.
- [Using conditionals](#using-conditionals), in which we will focus on minimizing the possibility of having tests that might run differently depending on external factors.
- [Exceptions and edge cases](#exceptions-and-edge-cases), where will examine how to address all of the possible exceptions and edge cases (which might be too many to test).
- [How tests should look](#how-tests-should-look), in which we will focus on what would be the aesthetic goal of our tests, to develop an inner sense of measure of how far we might be from our common goal.

Let's go through each item of this list.

### What a test is actually testing

Each individual test case of the entire Azure SDK for JavaScript and TypeScript should mainly focus on one specific functionality. By functionality we mean that, after any required setup, each test case should check the results of a either a single operation, or at least a single function call (considering that constructors are function calls). Let's expand this further with examples.

Let's say we have a client that has has three main functionalities: a constructor, a method `A` that can onl be accessed through the use of the instantiated client, and a method `AB` that is meaningful only after `A` is called. We could write three tests, as follows:

```ts
describe("testing the client's basic methods", function() {
  let client: Client;

  beforeEach(function() {
  	client = new Client();
  });

  it("the initialized client should expose an expected public property", function() {
  	const client = new Client();
    expect(client.expectedPublicProperty).to.be(true);
  });

  it("should test A", function() {
    const result = await client.A();
    expect(result.value).to.be(true);
  });

  it("should test AB", function() {
    const resultA = await client.A();
    const resultAB = await client.AB(resultA.value);
    expect(resultAB.value).to.be(true);
  });
});
```

Each test's goal is to verify the behavior of a single functionality, even though some have to rely on a more complex setup than others.

If there are no function calls in a test, a single test case must compare the values of properties with similar names and similar values, for example:

```ts
import { version } from "../some/path/constants.ts";

describe("testing some of the client's public properties", function() {
  let client: Client;

  beforeEach(function() {
  	client = new Client();
  });

  it("should have a valid version", function() {
    expect(client.version).to.equal(version)
  });
});
```

It's valid to test more than one property out of a single function, like in the following example:

```ts
describe("testing the client's basic methods", function() {
  let client: Client;

  beforeEach(function() {
  	client = new Client();
  });

  it("should test A", function() {
    const result = await client.A();
    expect(result.value).to.be(true);
    expect(result.createdAt instanceof Date).to.be(true);
    expect(result.updatedAt instanceof Date).to.be(true);
    // And other properties...
  });
});
```

### Test titles

Test files contain `describe` blocks and `it` blocks. The first property that these functions receive will be the title of the group of tests, and the title of each test, respectively for `describe` and `it`. Let's explore these separately:

- The titles sent to the `describe` calls should represent what the collection of its inner test cases (`it` calls) are testing.
- The titles sent to each `it` call should represent what each specific test case is testing.

Therefore, `describe` titles should be written to reflect something that each of its `it` test cases (or inner `describe` blocks) share in common.

In addition to being expressive, test titles might have specific hashtags (as in, words preceded by the pound sign), to facilitate pattern matching.

#### Pattern matching test titles

`mocha` allows us to only run certain tests as long as they match a given query, with the following arguments:

```
Test Filters
  --fgrep, -f   Only run tests containing this string                   [string]
  --grep, -g    Only run tests matching this string or regexp           [string]
  --invert, -i  Inverts --grep and --fgrep matches                     [boolean]
```

To be able to filter tests through pattern matching with any of these filters, the `describe` and `it` titles can have any hashtag, but preferably one or more of the following:

- `#browser` for tests that are only expected to run in the browser.
- `#node` for tests that are only expected to run on NodeJS.
- `#live` for tests that should only run live and not be recorded, nor played back.

### Inner parts of a test

While writing test cases, it will be easier to think of the test case's contents as if there were three clear divisions:

- The first lines of the test should deal with setting up the necessary variables and values that will be used for the main functionality that will be tested.
- The body of the test should focus on using these values to trigger the main functionality that is being tested.
- The last set of lines should be focused on comparing the results obtained, to confirm that they are in the expected shape, or contain the expected values.

### Using conditionals

Ideally, each test case should only have one possible behavior. To minimize unexpected outcomes, conditionals should be avoided. The only case in which conditionals are encouraged is to specify when to skip a test. Some tests might only run in a browser, or only run in NodeJS, or only run live (no record or playback), for this purpose, conditionals can be used. For example:

```ts
import { isNode } from "@azure/core-http";

describe("testing the client's basic methods", function() {
  let client: Client;

  beforeEach(function() {
  	client = new Client();
  });

  it("should test A #browser", function() {
    if (isNode) {
      return this.skip();
    }
    // Test contents..
  });

  it("should test B #node", function() {
    if (!isNode) {
      return this.skip();
    }
    // Test contents..
  });

  it("should test C #live", function() {
    if (process.env.TEST_MODE) {
      return this.skip();
    }
    // Test contents..
  });
});
```

In case conditionals might appear to be necessary in other scenarios, consider separating the test case into as many test cases as necessary first.

### Exceptions and edge cases

While testing the Azure SDK clients for JavaScript and TypeScript, we should document each client method exceptions through the use of `@throws` in the TypeDoc documentation, and avoid writing test cases for exceptions. Test cases should focus on demonstrating the functionalities of the client, in relation to the functionalities of the service. Exceptions should be in principle documented.

Similarly, the public API surface of our clients will contain a large set of properties resulting from any of the methods that our clients implement. Tests should not focus on verifying that each property of of our clients exist. While tests can check that the values of properties are expected, they should include only as many properties as it can be relevant for the use case that each test case is representing. For this purpose we should also take advantage of strict types. If our types can be descriptive and thorough, and our internal code is not skipping through the types (through the use of `any`), we will be able to trust that our API is behaving reasonably well.

As a final note on this regard, as we develop clients for the SDKs, we will encounter edge cases in the services we are testing. Edge cases should be reported and documented, but our tests should preferably avoid having to go through them, unless we can identify some of these cases as valuable resources for our customers.

### How tests should look

In general, the tests of the Azure SDK for JavaScript and TypeScript should be considered useful resources that demonstrate how to use the functionalities that our clients offer, and how these are expected to behave. Our test cases should assert that we are providing well constructed features to our users, and our users should be able to go through our tests, understand them with minimal effort, and use our test code to their advantage. Our tests should therefore be _empowering everyone_.