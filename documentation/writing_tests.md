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

Tests for the Azure SDK for JavaScript and TypeScript should be all executed using the NPM command `test`, they should be stored in the `test` folder, they must be written in TypeScript, in files that will end in `.spec.ts`. Our [recommended tools](#recommended-tools) should provide the test framework and proper ways of compiling and bundling our tests correctly. They should be able to run and be debugged on the environments we're targeting, which are currently only NodeJS and the browsers.

To help developers specify the target environment they will be testing, we will specify these scripts in the `package.json`:

```json
  "test:browser": "karma start --single-run",
  "test:node": "mocha -r esm --require source-map-support/register --reporter mocha-multi --reporter-options spec=-,mocha-junit-reporter=- --timeout 180000 --full-trace dist-esm/test/*.test.js",
```

Besides the target environment, tests may or may not target live resources, and either should target public or internal code. To navigate through these concepts, we will make clear distinctions of what we will be testing, based on three main aspects:

- [Testing cloud resources](#testing-cloud-resources).
- [Public or internal tests](#public-or-internal-tests).
- [Testing API functionalities](#testing-api-functionalities).

We will continue by elaborating on these three distinctions in the next section.

Keep in mind that [test titles](#test-titels) may include information about the environment they're targeting, what resources they're testing and any other distinction up to the good judgement of the developer. For more information, check out the section: [Writing test cases](#writing-test-cases).

### Testing cloud resources

By making use of [the recorder](#the-recorder), we're allowed to write tests targeting real live resources, and then run them instantly against a local copy of the server responses by specifying the `TEST_MODE` environment variable to either `record`, `live` or `playback`. Not specifying the environment variable will be considered `playback`, since we want to be able to run the tests by default without having to set up real resources.

### Public or internal tests

Tests can also either target internal code or code that is part of the public API of our projects. We will separate where these tests are located by dividing them in folders, as follows:

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
  - Never target external resources.
  - Not invoke or use [the recorder](#the-recorder), nor benefit from using the recorder.
  - May use mocks.
  - Avoid targeting code that **is** part of the public API of the project, unless necessary to test some other internal functionality.
  - Should not provide potentially useful information for consumers of the project they're testing.
- **Public** tests should:
  - Target public facing API methods or properties.
  - Benefit from using [the recorder](#the-recorder).
  - Not use custom mocks.
  - Be written in a user-friendly approach, similar to samples.

For more information about writing individual test cases, you might go to our [Writing test cases](#writing-test-cases) section.

### Testing API functionalities

Tests should also be grouped by the functionality they're testing. Even though they might be testing _internal_ or _public_ code, they could be grouped in folders up to the good judgement of the developers, which may look as follows:

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

## Individual tests
