## Min-max dependency testing:

When a library has dependencies with semantic version or semver ranges, how do you ensure and validate that your library actually supports the version ranges you claim? For instance, if we have @azure/keyvault-keys that supports 1.0.0 to 1.0.4 version ranges of @azure/core-http, how would you ensure that this library is actually compatible with all versions of core-http from 1.0.0 to 1.0.4 ( 1.0.0 , 1.0.1, 1.0.2, 1.0.3 and 1.0.4)? One solution is to test the library against each version of the dependency that you claim to support.

But as we keep releasing newer versions, the list of versions that we want to test will keep increasing. Given this, the testing of the entire version range for all dependencies may not always be feasible and we want to find an optimum scalable solution for the dependency testing in this scenario. One approach to this is “min-max” testing, or testing the library against the minimum version of dependency version range and against the maximum version of the dependency version range.

To read in-depth design decisions made during the min-max dependency testing and what it does, read [the blog post](https://devblogs.microsoft.com/azure-sdk/testing-semver-dependency-ranges/).

### Running dependency tests:

The minimum and maximum semver dependency testing for Azure SDK packages runs every night along with the nightly live test pipelines.
In order to run the minimum and maximum semver dependency testing **locally on your machine, you can follow these steps:**
