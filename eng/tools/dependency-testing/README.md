## Min-max dependency testing:

When a library has dependencies with semantic version or semver ranges, how do you ensure and validate that your library actually supports the version ranges you claim? For instance, if we have @azure/keyvault-keys that supports 1.0.0 to 1.0.4 version ranges of @azure/core-http, how would you ensure that this library is actually compatible with all versions of core-http from 1.0.0 to 1.0.4 ( 1.0.0 , 1.0.1, 1.0.2, 1.0.3 and 1.0.4)? One solution is to test the library against each version of the dependency that you claim to support.

But as we keep releasing newer versions, the list of versions that we want to test will keep increasing. Given this, the testing of the entire version range for all dependencies may not always be feasible and we want to find an optimum scalable solution for the dependency testing in this scenario. One approach to this is “min-max” testing, or testing the library against the minimum version of dependency version range and against the maximum version of the dependency version range.

To read in-depth design decisions made during the min-max dependency testing and what it does, read [the blog post](https://devblogs.microsoft.com/azure-sdk/testing-semver-dependency-ranges/).

### Running dependency tests

The minimum and maximum semver dependency testing for Azure SDK packages runs every night along with the nightly live test pipelines.
In order to run the minimum and maximum semver dependency testing **locally on your machine, you can follow these steps:**

### Setup your local dev environment to simulate min/max testing

1. Go to the repo root (e.g. `C:\repos\azure-sdk-for-js`) and run rush update and build package along with all its dependencies.

```
   rush update
   rush build -t "package-name" --verbose
```

For example:

```
   rush build -t "@azure/communication-sms" --verbose
```

2. Install the dependency-testing package dependencies:

```
cd eng\tools\dependency-testing

npm install
```

3. Run the dependency-testing script

```
node index.js --artifact-name "package-name" --version-type "{min | max}" --source-dir "path_to_js_repo" --test-folder "test/public"
```

For example,

```
node index.js --artifact-name "@azure/communication-sms" --version-type "min" --source-dir "C:\repos\azure-sdk-for-js\" --test-folder "test/public"
```

(Note: You may not need to do `npm install` every time you are testing, only once should be enough).

4. Go back to the repo root (e.g. `C:\repos\azure-sdk-for-js`) and run `rush update`
5. Go to your package's `test\public` folder and run these steps from inside it:

```
cd sdk/communication/communication-sms/test/public
rushx build
rushx integration-test:node
```

### Restore your local dev environment

1. Go to your package's `test\public` folder
2. Revert the modified test files: run `git checkout -- .`
3. Delete the uncommitted files added to the test folder: (package.json, tsconfig.json etc.)
4. Delete the `node_modules` folder under the package's `test\public` folder
5. Run the fowing steps from the root of the repo (e.g. `C:\repos\azure-sdk-for-js`)

```
rush update
rush rebuild
```

Note : If the above step fails, you can reset the repo: `git clean -f -x -d` (Warning: this will delete all unversioned files including those ignored by gitignore. Backup any .env files and push any commits you wanted to etc)

### Troubleshooting guide for min-max test failures

#### This is not a module
When you see an error message as shown below, it implies that there has been an internal source reference in a file inside the test/public folder that has been replaced by an empty file to avoid multiple versions of a dependency being pulled in.

```
communicationIdentityClient.mocked.spec.ts(8,68): error TS2306: File '/mnt/vss/_work/1/s/sdk/communication/communication-identity/test/public/utils/mockHttpClients.ts' is not a module.
utils/testCommunicationIdentityClient.ts(17,8): error TS2306: File '/mnt/vss/_work/1/s/sdk/communication/communication-identity/test/public/utils/mockHttpClients.ts' is not a module.
```
To fix the error, first locate where in the above file are you using the internal source reference. For example, from the above error, you notice that `/mnt/vss/_work/1/s/sdk/communication/communication-identity/test/public/utils/mockHttpClients.ts` probably has an internal source reference, which is why it's not accessible anymore since it's replaced by an empty file by the dependency-testing tool. This is the internal source reference detected in the `test/public/utils/mockHttpClients.ts` file.
```
import { CommunicationIdentityAccessTokenResult } from "../../../src/generated/src/models";
```
After locating the internal source reference, you have one of the following options:
- Either expose the above interface/ constant through the public API in the src/index.ts file of the Azure-SDK and change the import to accessing it from the src in this format - `../../../src` so that it becomes a public reference
- Or move the tests and references to test/internal folder if there's something you are accessing that cannot be exposed publicly.
