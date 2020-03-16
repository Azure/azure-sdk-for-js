# Writing tests for the Azure SDK for JS/TS

## Index

- [Introduction](#introduction)
- [Engineering setup](#engineering-setup)
- [Recommended tools](#recommended-tools)
- [Structure of tests](#structure-of-tests)
- [Individual tests](#individual-tests)

## Introduction

## Engineering setup

## Recommended tools

## Structure of tests

## Writing test cases

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