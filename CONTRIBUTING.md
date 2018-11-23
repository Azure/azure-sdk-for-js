# Contribution Guideline

Hello! Thank you for being interested in contributing to our project!

Please make sure you've followed the instructions provided in the [Azure Projects Contribution Guidelines](http://azure.github.io/guidelines/).

## Project Setup

The Azure Storage development team uses Visual Studio Code. However, any preferred IDE or other toolset should be usable.

### Install

* Node.js valid LTS versions (>=6.5.0)
* Browsers like Chrome, Edge or Firefox
* Clone the source code from GitHub

## Tests

### Configuration

The only step to configure testing is to set the appropriate environment variables. Create environment variables named "ACCOUNT_NAME", "ACCOUNT_KEY" or "ACCOUNT_SAS". The first two will be used for most requests. The "ACCOUNT_SAS" will only be used for tests in browsers.

You can generate a valid account SAS from Azure portal or tools like Azure Storage Explorer. A SAS starts with "?". And if you are using Windows CMD, you may need quotes to escape special characters like following:

```bash
set "ACCOUNT_SAS=<YOUR_SAS>"
```

#### CORS

You need to set up CORS rules for your storage account if you need to develop for browsers. Go to Azure portal and Azure Storage Explorer, find your storage account, create new CORS rules for blob/queue/file/table service(s).

For example, you can create following CORS settings for debugging. But please customize the settings carefully according to your requirements in production environment.

* Allowed origins: *
* Allowed verbs: DELETE,GET,HEAD,MERGE,POST,OPTIONS,PUT
* Allowed headers: *
* Exposed headers: *
* Maximum age (seconds): 86400

### Building

This project is based on TypeScript. For Node.js, generate commonJS module formats and browser bundles, build with:

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
npm test:browser
```

Browser testing is based on Karma, you can change default testing browser by modifying karma.conf.js file.

### Testing Features

As you develop a feature, you'll need to write tests to ensure quality. You should also run existing tests related to your change to address any unexpected breaks in both Node.js and Browsers.

## Pull Requests

### Guidelines

The following are the minimum requirements for any pull request that must be met before contributions can be accepted.

* Make sure you've signed the CLA before you start working on any change.
* Discuss any proposed contribution with the team via a GitHub issue **before** starting development.
* Code must be professional quality
  * No style issues
  * You should strive to mimic the style with which we have written the library
  * Clean, well-commented, well-designed code
  * Try to limit the number of commits for a feature to 1-2. If you end up having too many we may ask you to squash your changes into fewer commits.

* ChangeLog.md needs to be updated describing the new change
* Thoroughly test your feature

### Branching Policy

Changes should be based on the **dev** branch. Do not submit pull requests against master as master is considered publicly released code. Each breaking change should be recorded in BreakingChanges.md.

### Review Process

We expect all guidelines to be met before accepting a pull request. As such, we will work with you to address issues we find by leaving comments in your code. Please understand that it may take a few iterations before the code is accepted as we maintain high standards on code quality. Once we feel comfortable with a contribution, we will validate the change and accept the pull request.

Thank you for any contributions! Please let the team know if you have any questions or concerns about our contribution policy.
