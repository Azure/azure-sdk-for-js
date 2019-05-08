# Azure SDK for Javascript

| Component            | Build Status                                                                                                                                                                                |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Management Libraries | [![Build Status](https://dev.azure.com/azure-sdk/public/_apis/build/status/138?branchName=master)](https://dev.azure.com/azure-sdk/public/_build/latest?definitionId=138&branchName=master) |
| Client Libraries     | [![Build Status](https://dev.azure.com/azure-sdk/public/_apis/build/status/45?branchName=master)](https://dev.azure.com/azure-sdk/public/_build/latest?definitionId=45&branchName=master)   |

This project provides an isomorphic Javascript package with TypeScript definitions that makes it easy to consume and manage
Microsoft Azure Services.
It supports SDKs for:

- ARM services (control plane) (packages with the naming convention of `@azure/arm-<servicename>`)
- data plane of some Azure services (packages with the naming convention of `@azure/<servicename>`).

## Documentation

Documentation of the supported SDKs can be found here:

- https://docs.microsoft.com/en-us/javascript/azure - This website primarily provides SDK documentation for

  - ARM based services (`@azure/arm-<serviceName>`)
  - data plane SDKs like `@azure/batch`, `@azure/graph`, etc.

## Authentication

- For Node.js-based authentication, look at [@azure/ms-rest-nodeauth](https://npmjs.com/package/@azure/ms-rest-nodeauth).
- For browser-based authentication, look at [@azure/ms-rest-browserauth](https://npmjs.com/package/@azure/ms-rest-browserauth).
  - The browser authentication storage is a little more complicated, so we encourage you to [read about how it works](https://github.com/Azure/ms-rest-browserauth/blob/master/README.md) before putting it in your application.

## Need Help?

- [Read the docs](https://docs.microsoft.com/en-us/javascript/azure/?view=azure-node-latest)
- [Open an issue in GitHub](https://github.com/Azure/azure-sdk-for-js/issues)
- [Microsoft Azure Forums on MSDN and Stack Overflow](http://go.microsoft.com/fwlink/?LinkId=234489)

## License

This project is licensed under MIT.

- "MIT" license is usually used for the client libraries generated using [Autorest.TypeScript](https://github.com/azure/autorest.typescript) that are targeting ARM (V2 version of Azure REST API). The license can be found in "LICENSE.MIT.txt" file in this repository.

## Contribute

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).

For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

If you would like to become an active contributor to this project please follow the instructions provided in [Microsoft Azure Projects Contribution Guidelines](http://azure.github.io/guidelines/).

### Project orchestration

This project uses [Rush](https://rushjs.io) to manage our many Azure SDK libraries within a single repository. It is highly recommended that you read the [Rush Developer Tutorials](https://rushjs.io/pages/developer/new_developer/) to familiarize yourself with the tool.

While you
can continue to contribute to the project using the standard `npm` workflow, adopting Rush will provide you many benefits:

- Your local build results will match what occurs on our build server, since the build server uses Rush to build the SDK.
- Rush will ensure that all libraries use the same versions of a given dependency, making it easier to reason about our dependency graph and reducing bundle size.
- Rush uses [PNPM](https://pnpm.js.org) to install all dependencies across the SDK. Together they solve problems involving [phantom dependencies](https://rushjs.io/pages/advanced/phantom_deps/) and [NPM doppelgangers](https://rushjs.io/pages/advanced/npm_doppelgangers/). The way PNPM lays out packages also ensures that you can never accidentally use a dependency you don't directly declare in your package.json.
- Dependencies between different libraries within the Azure SDK will be locally linked by default. This means you can make a local change in a library your library depends on, and it will just work without needing to use awkward "file:" paths in your package.json.
- When a change is made in a local dependency, Rush will detect that the dependency is dirty and will rebuild it if you attempt to build a project that consumes that dependency.
- Rush runs project tasks in parallel, subject to the inter-project dependencies that it detects. It also performs incremental builds by default, not rebuilding anything unnecessary (unless you tell it to).

### Setting up your environment

Want to get started hacking on the code? Super! Follow these instructions to get up and running.

First, make sure you have the prerequisites installed and available on your `$PATH`:
- Git
- Node 8.x or higher
- Rush 5.7.0 or higher (install / update globally via `npm install -g @microsoft/rush`)

Next, get the code:

1. Fork this repo
2. Clone your fork locally (`git clone https://github.com/<youruser>/azure-sdk-for-js.git`)
3. Open a terminal and move into your local copy (`cd azure-sdk-for-js`)
4. Install and link all dependencies (`rush update`)

#### Warning for VSCode users
Visual Studio Code has a feature which will automatically fetch and install @types packages for you, using the standard npm package manager. This will cause problems with your node_modules directory, since Rush uses PNPM which lays out this directory quite differently. It's highly recommended that you ensure "Typescript: Disable Automatic Type Acquisition" is checked in your VSCode Workspace Settings (or ensure `typescript.disableAutomaticTypeAcquisition` is present in your .vscode/settings.json file).

#### Warning for Windows users
Git for Windows has a bug where repository files may be unintentionally removed by `git clean -df` when a directory is locally linked. Because Rush creates local links between packages, you may encounter this. It's highly recommended to use the `rush reset-workspace` command to get your working directory back to a clean state instead. If you prefer to run `git clean -df` manually, you must first run `rush unlink` so that the operation can be performed safely.

### Inner loop developer workflow with Rush

#### Installing and managing dependencies

Run `rush update` to install the current set of package dependencies in all projects inside the repo.

To add a new dependency (assuming the dependency is published on the NPM registry), navigate to the project's directory and run `rush add -p "<packagename@^version>" [--dev]`. This will update the project's package.json and then automatically run `rush update` to install the package into the project's node_modules directory. Do not use `npm install [--save | --save-dev]`.

To add a dependency on another library within the Azure SDK, you can follow the same procedure as above as long as the library is also published to the NPM registry. Additionally, as long as the local copy of that library satisfies the SemVer range you specify when you run `rush add`, that library will be locally linked rather than downloaded from the registry. If the library has not yet been published to the NPM registry, you can't use `rush add`. In this case, you must manually edit the package.json to add the dependency and then run `rush update` to locally link the library into the project's node_modules directory.

To update a dependency's version, use the same process as adding a new dependency - just specify the new version you want to use. If other libraries also use this dependency, you will likely see the `rush update` step fail because the versions are now inconsistent. See [below](#resolving-dependency-version-conflicts) to learn how to resolve dependency version conflicts.

To remove a dependency, you must edit the package.json to remove the dependency and then run `rush update` to remove it from the project's node_modules directory.

If you manually edit dependencies within the package.json for any reason, make sure to run `rush update` afterwards to update the project's node_modules directory.

Do not check in any package-lock.json or pnpm-lock.yaml files.

#### Resolving dependency version conflicts

When you run `rush update`, Rush will also ensure that dependency versions are consistent across all of our packages. If they are not, the command will fail and show you all packages which use a conflicting versions of dependencies. There are a few ways to resolve this:

First and foremost, you should make every attempt to match the versions of any dependencies your library has to those that already exist in the repository. Because we use approximate version range specifiers (e.g. "^8.0.0"), this is almost always what you want to do. There are only a few cases where this won't work.

If you know your library requires functionality introduced in a newer version of the dependency, you can update the version range specifier for your library and then run `rush sync-versions` to update all other projects that use that dependency. Keep in mind that for minor versions, this is usually safe, but major version bumps may introduce breaking changes and thus any other libraries that use that dependency should be tested thoroughly before merging. Make sure to run `rush update` manually after this action to update all affected projects' node_modules directories.

On the other hand, if you know your library does not work with the existing version of the dependency and you explicitly need an older version, you have a few options. The preferred option would be to update your library so that it works with the existing version of the dependency. If this is not feasible, Rush can be instructed to permit an exception to the "consistent versions" policy. Reach out to a member of the [engineering system team](mailto:azuresdkengsysteam@microsoft.com) to describe your situation and they will be able to help you add the exception.

#### Building

Run `rush build` from anywhere in the repo to build any projects that have been modified since the last build.
Run `rush rebuild` from anywhere in the repo to rebuild all projects from scratch.

Run `rush build -t <packagename>` to build a single project, and all local projects that it depends on. You can pass `-t` multiple times to build multiple projects. This works for `rush rebuild` as well. Keep in mind that Rush refers to packages by their full names, so packages will be named something like `@azure/<servicename>`.

By default, Rush only displays things written to `STDERR`. If you want to see the full output, pass `--verbose` to any of the build commands. This is also true for script commands (see below).

#### Other NPM scripts

Most package scripts are exposed as Rush commands. Use `rush <scriptname>` in place of `npm run <scriptname>` to run the package script in all projects. Navigate to a project's directory and substitute `rushx` for `rush` to run the script for just the current project. Run `rush <scriptname> --help` for more information about each script.

All projects have at least the following scripts:
- `audit`: Run `npm audit` on the project (with some workarounds for Rush)
- `build`: Build the project's production artifacts (Node and browser bundles)
- `build:test`: Build the project's test artifacts only
- `check-format`: Show Prettier formatting issues within the project
- `clean`: Remove generated and temporary files
- `format`: Reformat project files with Prettier
- `integration-test:browser`: Execute browser integration tests
- `integration-test:node`: Execute Node integration tests
- `integration-test`: Execute all integration tests
- `lint:fix`: Fix ESLint issues within the project
- `lint`: Show ESLint issues within the project
- `pack`: Run `npm pack` on the project
- `test:browser`: Execute browser dev tests
- `test:node`: Execute Node dev tests
- `test`: Execute all dev tests
- `unit-test:browser`: Execute browser unit tests
- `unit-test:node`: Execute Node unit tests
- `unit-test`: Execute all unit tests

Projects may optionally have the following scripts:
- `extract-api`: Run API Extractor to show API issues and generate API reports

#### Getting back to a clean state

If you're having problems and want to restore your repo to a clean state without any packages installed, run `rush uninstall`. Downloaded packages will be deleted from the cache and all node_modules directories will be removed. Now you can start clean by re-downloading and installing dependencies from scratch with `rush update`. This will not make any changes to any other files in your working directory.

If you want to get back to a completely clean state, you can instead run `rush reset-workspace. This will perform the same operations as above, but will additionally run `git clean -dfx` to remove all untracked files and directories in your working directory. This is a destructive operation - use it with caution!!

### Onboarding a new library

To add a new library to the repo, update `rush.json` in the root of the repo and add a new entry to the `projects` array at the bottom of the file. The package name must be the full name of the package as specified in its package.json. Your new library must follow our [repository structure](https://github.com/Azure/azure-sdk/blob/master/docs/engineering-system/repo-structure.md) (specifically, it must be located at `sdk/<servicename>/<packagename>`) and your library's package.json must contain the required scripts as documented [above](#other-npm-scripts). Once the library is added, run `rush update` to install and link dependencies. If your new library has introduced a dependency version conflict, this command will fail. See [above](#resolving-dependency-version-conflicts) to learn how to resolve dependency version conflicts.

Rush assumes that anything printed to `STDERR` is a warning. Your package scripts should avoid writing to `STDERR` unless emitting warnings or errors, since this will cause Rush to flag them as warnings during the execution of your build or script command. If your library uses a tool that can't be configured this way, you can still append ` 2>&1` to the command which will redirect all output to `STDOUT`. You won't see warnings show up, but Rush will still consider the command to have failed as long as it returns a nonzero exit code.

#### Issues with Rollup

Rollup must be manually configured to work correctly when symlinks are created in your node_modules (as Rush does). Each of your Rollup configuration objects must contain the following setting:

```
preserveSymlinks: false
```

Additionally, when adopting the Rush workflow you will likely see Rollup emitting many "not exported" errors like the following when generating your browser bundle:

```
equal is not exported by ..\..\..\common\temp\node_modules\.registry.npmjs.org\assert\1.4.1\node_modules\assert\assert.js
123:             assert.equal(foo, bar);
                        ^
```

This is due to an open issue with one of Rollup's plugins (if you want the details, refer to this [GitHub issue](https://github.com/rollup/rollup-plugin-node-resolve/issues/94)). To work around the issue, locate the Rollup configuration object for your browser bundle and modify the configuration for the nodeResolve plugin to match the following:
```
nodeResolve({
  mainFields: ['module', 'browser'],
  preferBuiltins: false
}),
```


### Contributing code to the project

You found something you'd like to change? Great! Please submit a pull request and we'll do our best to work with you to get your code included into the project.

1. Commit your changes (`git commit -am 'Add some feature'`)
2. Push to the branch (`git push origin my-new-feature`)
3. Create new Pull Request

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2FREADME.png)

## Client Library Tested Operating Systems and Node Versions

Currently, the tests for client libraries in this repository are running against:

|             | Linux (Ubuntu 16.04) | MacOS 10.13 | Windows Server 2016 |
| ----------- | -------------------- | ----------- | ------------------- |
| **Node 8**  | x                    | x           | x                   |
| **Node 10** | x                    | x           | x                   |
| **Node 11** | x                    | x           | x                   |
