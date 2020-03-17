# Writing tests for the Azure SDK for JS/TS

## Index

- [Introduction](#introduction)
- [Engineering setup](#engineering-setup)
- [Recommended tools](#recommended-tools)
- [Test folder structure](#test-folder-structure)
  - [Testing cloud resources](#testing-cloud-resources).
  - [Public or internal tests](#public-or-internal-tests).
  - [Testing API functionalities](#testing-api-functionalities).
- [Individual tests](#individual-tests)

## Introduction

## Engineering setup

## Recommended tools

## Test folder structure

Tests for the Azure SDK for JavaScript and TypeScript should be all executed using the NPM command `test`, they should be stored in the `test` folder, they will be written in TypeScript, in files that will end in `.spec.ts`, and our [recommended tools](#recommended-tools) should help us with the test framework, with proper ways of compiling them and bundling them correctly, so they can run and be debugged while checking that our code works on the environments we're targeting (NodeJS, browsers, etc).

To help developers specify the target environment they will be testing, we will specify these scripts in the `package.json`:

```json
  "test:browser": "karma start --single-run",
  "test:node": "mocha -r esm --require source-map-support/register --reporter mocha-multi --reporter-options spec=-,mocha-junit-reporter=- --timeout 180000 --full-trace dist-esm/test/*.test.js",
```

Besides the target environment, tests may target live resources (or not) and public or internal code. To navigate through these concepts, we will make clear distinctions of what we will be testing, based on three main aspects:

- [Testing cloud resources](#testing-cloud-resources).
- [Public or internal tests](#public-or-internal-tests).
- [Testing API functionalities](#testing-api-functionalities).

We will continue by elaborating on these three distinctions.

### Testing cloud resources

To specify how the tests interact with the cloud resources, we will be using [the recorder](#the-recorder), which allows us to write the same tests once, targeting real live resources, and then run them again instantly through specifying the `TEST_MODE` environment variable to either `record`, `live` or `playback`. Not specifying the environment variable will be considered `playback`, since we want to be able to run the tests without having to set up real resources.

### Public or internal tests

Tests can also either target internal code or code that is part of the public API of our projects. We will separate where these tests are stored by dividing them in folders inside of the `test` folder. As follows:

```
project/
  test/
    internal/
	  internal_method.spec.ts
	public/
	  public_method.spec.ts
```

Keep in mind that...

- **Internal** tests should:
  - Never target real resources, or resources outside of the code that exists inside of each project.
  - Not invoke or use [the recorder](#the-recorder), nor benefit from using the recorder.
  - Possibly use custom mocks, only purposed for these internal tests.
  - Never target public facing API methods or properties.
- **Public** tests should:
  - Only target public facing API methods or properties.
  - Use [the recorder](#the-recorder).
  - Not use custom mocks.
  - Use light dynamic code, and preferably be user friendly, like samples.

For more information about writing individual test cases, you might go to our [Writing test cases](#writing-test-cases) section.

### Testing API functionalities

Tests should also be written grouped by the functionality they're testing. Even though they might be testing _internal_ or _public_ code, they could be grouped in folders up to the good judgement of the developers, which may look as follows:

```
project/
  test/
    internal/
	  some_internal_functionality/
	    part_of_internal_functionality.spec.ts
		other_aspect_of_internal_functionality.spec.ts
	  lone_internal_method.spec.ts
	public/
	  some_public_functionality/
	    part_of_public_functionality.spec.ts
		other_aspect_of_public_functionality.spec.ts
	  public_method.spec.ts
```

---
TODO:
This file isn't done. I will revisit it and complete it tomorrow.
---

a. Internal tests.
	i. Should be stateless unit tests.
	ii. Should not be recorded.
b. Public API tests
	i. Can be recorded or live tests.
	ii. Can target more than one environment.
	iii. Should I separate tests by the target environment?
		1) Perhaps a hashtag in the title.
		2) Or separation by folder if needed.
		3) Talk about how these affect or are affected by the configuration files.
	iv. Make clear separations about what we're testing, by how the API is separated.
		1) Having a file per group of tests is fine.
			a) If the file is too big, consider making another file with the type, then an underscore, then a relevant name for the sub-group of tests.
		2) Examples include separating CRUD (create, read, update, delete) tests from other API methods. It's up to the developers to decide what can be separated.
	v. TODO


## Individual tests
