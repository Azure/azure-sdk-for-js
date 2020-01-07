# Contribute Code or Provide Feedback

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).

For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

If you would like to become an active contributor to this project please follow the instructions provided in [Microsoft Azure Projects Contribution Guidelines](http://azure.github.io/guidelines/).

The Azure Storage development team uses Visual Studio Code. However, any preferred IDE or other toolset should be usable.

### Install

- Node.js valid LTS versions (>=8.16.0)
- Browsers like Chrome, Edge or Firefox
- Clone the source code from GitHub

## Tests

### Configuration

The only step to configure testing is to set the appropriate environment variables. Create environment variables named

```bash
ACCOUNT_NAME
ACCOUNT_KEY
ACCOUNT_SAS
ACCOUNT_TOKEN
TEST_MODE
```

The first two will be used for most requests. The "ACCOUNT_SAS" will only be used for tests in browsers.

You can generate a valid account SAS from Azure portal or tools like Azure Storage Explorer. A SAS starts with "?". And if you are using Windows CMD, you may need quotes to escape special characters like following:

```bash
set "ACCOUNT_SAS=<YOUR_SAS>"
```

#### TEST_MODE

The environment variable **TEST_MODE** controls how tests are running.

- If TEST_MODE = "record",
  - Tests hit the live-service
  - Nock/Nise are leveraged for recording the request-responses for future use
  - If recordings are already present, forces re-recording
- Else If TEST_MODE = "live",
  - Tests hit the live-service, we don't record the requests/responses
- Else If TEST_MODE = "playback" (or if the TEST_MODE is neither "record" nor "live"),
  - Existing recordings are played back as responses to the HTTP requests in the tests

Please refer to [@azure/test-utils-recorder](./../test-utils/recorder/GUIDELINES.md) for more details about record and playback tests.

### Emulator Tests

- Expected environment variable to run tests with the emulator
  [Azurite - Extension for VS Code](https://marketplace.visualstudio.com/items?itemName=Azurite.azurite)
  - STORAGE_CONNECTION_STRING="UseDevelopmentStorage=true" (or `UseDevelopmentStorage=true;DevelopmentStorageProxyUri=http://myProxyUri`)

#### CORS

You need to set up CORS rules for your storage account if you need to develop for browsers. Go to Azure portal and Azure Storage Explorer, find your storage account, create new CORS rules for blob/queue/file/table service(s).

For example, you can create following CORS settings for debugging. But please customize the settings carefully according to your requirements in production environment.

- Allowed origins: \*
- Allowed verbs: DELETE,GET,HEAD,MERGE,POST,OPTIONS,PUT
- Allowed headers: \*
- Exposed headers: \*
- Maximum age (seconds): 86400

### Building

This project is based on TypeScript. Build with:

```bash
npm install
npm run build
```

### Running

To actually run tests in Node.js:

```bash
npm install
npm run build
npm run test:node
```

Run tests in Browsers. After installed Chrome, the default testing browser:

```bash
npm install
npm run build
npm run test:browser
```

Browser testing is based on Karma, you can change default testing browser by modifying karma.conf.js file.

### Record & Playback

By default, above test commands are not tested against real Azure Storage accounts, the existing recorded request/response pairs are leveraged in `playback` mode.
Before running above tests if needed, set environment value `TEST_MODE` to switch to `live` mode to test against real Azure Storage accounts or `record` mode to record the tests.

Playback mode is for offline mock test, which doesn't require a storage account, it's quick but less coverage:

`export TEST_MODE=playback`

Record tests for next playback. Recording is necessary after adding or updating test cases:

`export TEST_MODE=record`

Live tests by setting `TEST_MODE` environment variable:

`export TEST_MODE=live`

### Testing Features

As you develop a feature, you'll need to write tests to ensure quality. You should also run existing tests related to your change to address any unexpected breaks in both Node.js and Browsers.

### Unit Tests

New env variable for recordings - TEST_MODE [Supposed to be added in the `.env` file to be able to do record and playback]

- If TEST_MODE = "record",

  - Tests hit the live-service
  - We record the request-responses for future use by leveraging
  - If recordings are already present, forces re-recording

- Else If TEST_MODE = "playback",

  - Existing recordings(present in the `/recordings` folder) are used to verify the tests

- Else If TEST_MODE = "live",

  - Tests hit the live-service, we don't record the requests/responses

```bash
npm install
npm run test
```

`npm run test` would run the the tests in both node and the browser.

**Link** - [Guidelines for record and playback - `@azure/test-utils-recorder`](./../test-utils/recorder/GUIDELINES.md)

## Pull Requests

### Guidelines

The following are the minimum requirements for any pull request that must be met before contributions can be accepted.

- Make sure you've signed the CLA before you start working on any change.
- Discuss any proposed contribution with the team via a GitHub issue **before** starting development.
- Code must be professional quality

  - No style issues
  - You should strive to mimic the style with which we have written the library
  - Clean, well-commented, well-designed code
  - Try to limit the number of commits for a feature to 1-2. If you end up having too many we may ask you to squash your changes into fewer commits.

- ChangeLog.md needs to be updated describing the new change
- Thoroughly test your feature

### Branching Policy

Changes should be based on the **dev** branch. Do not submit pull requests against master as master is considered publicly released code. Each breaking change should be recorded in BreakingChanges.md.

### Review Process

We expect all guidelines to be met before accepting a pull request. As such, we will work with you to address issues we find by leaving comments in your code. Please understand that it may take a few iterations before the code is accepted as we maintain high standards on code quality. Once we feel comfortable with a contribution, we will validate the change and accept the pull request.

Thank you for any contributions! Please let the team know if you have any questions or concerns about our contribution policy.
