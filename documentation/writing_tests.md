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

Code in either of these methods can be abstracted away into utility functions that may live outside of each test file **only if** these pieces of code are relevant to more than one test files.

_TODO: Expand this. Include examples._

### Preparing some of the test cases

Where we will go through examples of how to write re-usable code that might be used to set up some of the test cases.

_TODO: Expand this. Include examples._

### Universal utilities

Where we will see how to approach tools that could potentially be used by tests outside of the project in which the tests are hosted.

_TODO: Expand this. Include examples._

## Writing test cases

_THIS IS HEAVILY IN PROGRESS, AVOID EARLY REVIEWS IF POSSIBLE_

Regardless of where each test case is, as organized by our [Test folder structure](#test-folder-structure), they should look reasonably similar. We can ensure some level of homogeneity through the use of our [recommended tools](#recommended-tools), though we still need to explore what are the indications on writing each test case.

a. On titles
	i. Test should only test one thing. The titles should reflect that.
b. Each test should just test one function or method.
	i. Constructors are a function.
	ii. Tests can build on top of previous tests.
		1) One test can validate a constructor while another can use the constructor, then validate a method of the instantiated object.
	iii. The structure then should be:
		1) Define what is needed for this method to run.
		2) Run the method / function clearly, just once.
		3) Test the results of that method.
c. On the usage of conditionals
	i. Tests can be skipped if necessary.
	ii. If a test runs, it should always work the same way, not behave differently depending on the environment.
	iii. If you still need to do conditionals in tests, copy these tests as many times as needed to remove the conditionals.
d. Unit tests should not use the recorder.
	i. They should not reach out to real services.
	ii. Unit tests might use mocking tools that could interfere with the recorder. If that's the case, avoid running these unit tests if TEST_MODE is set.
	iii. Unit tests should not alter a global or shared state.
e. Recorded and live tests should look like samples.
	i. Group the live tests on what they're testing.
	ii. Test all the possible exceptions. Group the exceptions in the same bucket of the separation of tests by what they're testing, but at the end of that/those files.
f. Try to not write test utilities or helpers.
	i. If you have to write test utilities that are relevant to methods that the users would be using to replicate the behavior of the test, make sure to include the invocations of those test utilities or helpers right in the contents of each test case, and not separated (as in, not in the before each).
	ii. Should be useful for any other package of the SDK. Make sure a majority of the team is on board and add it as a new internal package, like the recorder (or like retry).