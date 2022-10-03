# Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

# How to contribute to the Azure SDK for Javascript

There are many ways that you can contribute to the Azure SDK for JavaScript project:

- Submit a bug
- Submit a code fix for a bug
- Submit additions or modifications to the documentation
- Submit a feature request

All code submissions will be reviewed and tested by the team, and those that meet a high bar for both quality and design/roadmap appropriateness will be merged into the source. Be sure to follow the existing file/folder structure when adding new boards or sensors.

If you encounter any bugs with the library please file an issue in the [Issues](https://github.com/Azure/azure-sdk-for-js/issues) section of the project.

## Things to keep in mind when contributing

Some guidance for when you make a contribution:

- Add/update unit tests and code as required by your change
- Make sure you run all the unit tests on the affected platform(s)/languages. If the change is in common code, generally running on one platform would be acceptable.
- Run end-to-end tests or simple sample code to make sure the lib works in an end-to-end scenario.

## Big contributions

If your contribution is significantly big it is better to first check with the project developers in order to make sure the change aligns with the long term plans. This can be done simply by submitting a question via the GitHub Issues section.

## Project orchestration

This project uses [Rush](https://rushjs.io) to manage many of our Azure SDK libraries within a single repository. It is highly recommended that you read the [Rush Developer Tutorials](https://rushjs.io/pages/developer/new_developer/) to familiarize yourself with the tool.

Rush provides many benefits:

- Some of our devDependencies are not published to the public registry (e.g. our ESLint plugin), and Rush is configured to install them correctly.
- Your local build results will match what occurs on our build server, since the build server uses Rush to build the SDK.
- Rush will ensure that all libraries use the same versions of a given dependency, making it easier to reason about our dependency graph and reducing bundle size.
- Rush uses [PNPM](https://pnpm.js.org) to install all dependencies across the SDK. Together they solve problems involving [phantom dependencies](https://rushjs.io/pages/advanced/phantom_deps/) and [NPM doppelgangers](https://rushjs.io/pages/advanced/npm_doppelgangers/). The way PNPM lays out packages also ensures that you can never accidentally use a dependency you don't directly declare in your package.json.
- Dependencies between different libraries within the Azure SDK will be locally linked by default. This means you can make a local change in a library your library depends on, and it will just work without needing to use awkward "file:" paths in your package.json.
- When a change is made in a local dependency, Rush will detect that the dependency is dirty and will rebuild it if you attempt to build a project that consumes that dependency.
- Rush runs project tasks in parallel, subject to the inter-project dependencies that it detects. It also performs incremental builds by default, not rebuilding anything unnecessary (unless you tell it to).

Not every library in the repository is managed by Rush yet, only those listed in the `projects` property in [rush.json](https://github.com/Azure/azure-sdk-for-js/blob/main/rush.json). Packages not managed by Rush can still be managed using `npm`.

Check out our [wiki page on using rush](https://github.com/Azure/azure-sdk-for-js/wiki/Rush) for more information on
- running `rush update` command
- How to update to a newer version of Rush or PNPM.

## Setting up your environment

Want to get started hacking on the code? Great! Keep reading.

### Using Visual Studio Code

We love [Visual Studio Code](https://code.visualstudio.com/) for many reasons, mainly:

- You can debug JavaScript/TypeScript code right away with [automatic debugging configuration](https://code.visualstudio.com/updates/v1_45#_automatic-debug-configurations).
- You can use it with GitHub's [Codespaces](https://visualstudio.microsoft.com/services/github-codespaces/) to develop inside a docker container that has all the prerequisites.
- You get [excellent support for TypeScript](https://code.visualstudio.com/Docs/languages/typescript).

### Prerequisites

With GitHub's Codespaces, the container already has all prerequisites installed. You can create a codespace in Visual Studio Code by following the instructions [here](https://docs.github.com/en/free-pro-team@latest/github/developing-online-with-codespaces/using-codespaces-in-visual-studio-code).

If you prefer to setup your own environment instead, make sure you have these prerequisites installed and available on your `$PATH`:

- Git
- Any of the [LTS versions of Node.js](https://nodejs.org/about/releases/)
- A C++ compiler toolchain and Python (for compiling machine-code modules):
  - Windows: Install the [Visual Studio Build Tools][buildtools] from Microsoft and [Python 3.9][python39windows] from the Microsoft Store.
  - macOS: Install Xcode or the "Command Line Tools for XCode" (much smaller) from [Apple's developer downloads page](https://developer.apple.com/download/all/).
  - Linux: Install Python and GCC/G++ (part of the `build-essential` package on Ubuntu-based distributions) using your distribution's package manager.

    **On Linux, development headers for `libsecret` are also required.** Typically, these are available in a package called `libsecret-1-dev` (Debian/Ubuntu) or `libsecret-devel` (Fedora/Red Hat).
- Rush 5.x
  - Install / update Rush globally via `npm install -g @microsoft/rush`.
  - Rush will automatically manage the specific version needed by this repo as long as you have any v5 version installed.
  - If you're unable to install a global tool, you can instead call the wrapper script `node <repo root>/common/scripts/install-run-rush.js` any time the guide instructs you to run `rush`. The wrapper script will install a managed copy of Rush in a temporary directory for you.

### Building our repository

1. Fork this repo
2. Clone your fork locally (`git clone https://github.com/<youruser>/azure-sdk-for-js.git`)
3. Open a terminal and move into your local copy (`cd azure-sdk-for-js`)

To build packages managed by Rush:

4. Install and link all dependencies (`rush update`)
5. Build the code base (`rush rebuild`)

To build packages not managed by Rush:

4. Navigate to the package directory as described in our [repository structure](https://github.com/Azure/azure-sdk/blob/main/docs/policies/repostructure.md)
5. Install the package dependencies (`npm install`)
6. Build the package (`npm run build`)

## Development Workflows

### Installing and managing dependencies

To add a new dependency (assuming the dependency is published on the NPM registry), navigate to the project's directory and run `rush add -p "<packagename>" --caret [--dev]`. This will add the dependency at its latest version to the project's package.json, and then automatically run `rush update` to install the package into the project's node_modules directory. If you know the specific version of the package you want, you can instead run `rush add -p "<packagename@^version>"` - make sure to use the caret before the version number. Do not use `npm install [--save | --save-dev]`.

To add a dependency on another library within the Azure SDK, you can follow the same procedure as above as long as the library is also published to the NPM registry. Additionally, as long as the local copy of that library satisfies the SemVer range you specify when you run `rush add`, that library will be locally linked rather than downloaded from the registry. If the library has not yet been published to the NPM registry, you can't use `rush add`. In this case, you must manually edit the package.json to add the dependency and then run `rush update` to locally link the library into the project's node_modules directory.

To update a dependency's version, use the same process as adding a new dependency - just specify the new version you want to use. If other libraries also use this dependency, you will likely see the `rush update` step fail because the versions are now inconsistent. See [below](#resolving-dependency-version-conflicts) to learn how to resolve dependency version conflicts.

To remove a dependency, you must edit the package.json to remove the dependency and then run `rush update` to remove it from the project's node_modules directory.

If you manually edit dependencies within the package.json for any reason, make sure to run `rush update` afterwards to update the project's node_modules directory.

Any time you add, update, or remove dependencies, running `rush update` will generate a diff to the file `common/config/rush/pnpm-lock.yaml`. You should commit these changes - this file works similarly to NPM's package-lock.json files, except it tracks package versions for all projects in the Rush workspace. Do not check in any package-lock.json files.

### Resolving dependency version conflicts

When you run `rush update`, Rush will also ensure that dependency versions are consistent across all of our packages. If they are not, the command will fail and show you all packages which use a conflicting versions of dependencies. There are a few ways to resolve this:

First and foremost, you should make every attempt to match the versions of any dependencies your library has to those that already exist in the repository. Because we use approximate version range specifiers (e.g. "^8.0.0"), this is almost always what you want to do. There are only a few cases where this won't work.

If you know your library requires functionality introduced in a newer version of the dependency, you can update the version range specifier for your library and then run `rush sync-versions` to update all other projects that use that dependency. Keep in mind that for minor versions, this is usually safe, but major version bumps may introduce breaking changes and thus any other libraries that use that dependency should be tested thoroughly before merging. Make sure to run `rush update` manually after this action to update all affected projects' node_modules directories.

On the other hand, if you know your library does not work with the existing version of the dependency and you explicitly need an older version, you have a few options. The preferred option would be to update your library so that it works with the existing version of the dependency. If this is not feasible, Rush can be instructed to permit an exception to the "consistent versions" policy. Reach out to a member of the [engineering system team](mailto:azuresdkengsysteam@microsoft.com) to describe your situation and they will be able to help you add the exception.

### Building using Rush

Run `rush build` from anywhere in the repo to build any projects that have been modified since the last build.
Run `rush rebuild` from anywhere in the repo to rebuild all projects from scratch.

Run `rush build -t <packagename>` to build a single project, and all local projects that it depends on. You can pass `-t` multiple times to build multiple projects. This works for `rush rebuild` as well. Keep in mind that Rush refers to packages by their full names, so packages will be named something like `@azure/<servicename>`.

By default, Rush only displays things written to `STDERR`. If you want to see the full output, pass `--verbose` to any of the build commands.

### Testing

If you want to run the tests of a specific project, go to that project's folder and execute `rushx test`. All of the tests will automatically run both in NodeJS and in the browser. To target these environments individually, you can run `rushx test:node` and `rushx test:browser`.

By default, these npm scripts run previously recorded tests. The recordings have been generated by using a custom recording library called [test-recorder](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/recorder/README.md). We will examine how to run recorded tests and live tests in the following sections.

#### Recorded tests

Most of the tests in our projects run in playback mode by default, i.e they make no network requests to the real services. For HTTP requests made in each test case, there is a recorded response that reproduces the service behavior. The readme file in the `test` folder of each package will indicate whether the package uses recorded tests or not.

At the moment, tests in our repo depend on one of the two different versions of the recorder tool (`@azure-tools/test-recorder`) - `1.a.b` and `2.x.y`.
Currently, version `2.x.y` is maintained in the repository which is built as part of a cross-language unification effort in terms of the tests and recordings.
Eventually, all the tests will be migrated to depend on the `2.x.y` version of the recorder that depends on the language-agnostic [test proxy server].

To record and playback the tests that depend on version `2.x.y` of `@azure-tools/test-recorder`, [docker] is required, as the [test proxy server] is run in a container during testing. When running the tests, ensure the Docker daemon is running and you have permission to use it. For WSL 2, running `sudo service docker start` and `sudo usermod -aG docker $USER` should be sufficient.

Refer to the [Migration Guide](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/recorder/MIGRATION.md) for more information on migrating the tests from recorder v1 to v2.

#### Live tests

To use the `rushx test` command to run the tests against live resources, you must:

- Set the environment variable `TEST_MODE` to `live`.
- Have previously created the necessary Azure resources needed by the tests.
- Set the appropriate environment variables to point to these resources.

The readme file in the `test` folder of each package lists the Azure resources and the environment variables needed.

> Note: Our projects use dotenv to allow you to use `.env` files to set environment variables. Find the `sample.env` file nearest to the project you want to test to see a template of the expected `.env` file.

You can create the necessary Azure resources on your own, or automate this process by using the script called `New-TestResources.ps1` which uses ARM templates defined in a file named `test-resources.json` that exists in each project's folder. Follow the steps in [`Example 1 of New-TestResources.ps1`](https://github.com/Azure/azure-sdk-for-js/blob/main/eng/common/TestResources/New-TestResources.ps1.md#example-1) to set up a service principal and deploy the live test resources.

#### Regenerating recordings

If you modify the network calls (both the number of calls or their shape) either by changing the tests or source code of the project you're working on, the recordings will need to be re-generated.

Regenerating the recordings has the same requirements as running the live tests. You will be using the same `test` npm script with the environment variables pointing to previously created Azure resources. The only difference is that the `TEST_MODE` environment variable needs to be set to `record`. When this process finishes without errors, the recordings will be updated.

For more information the recorder, please visit the [test-recorder's readme](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/recorder/README.md).

### Other NPM scripts

Most package scripts are exposed as Rush commands. Use `rushx <scriptname>` in place of `npm run <scriptname>` to run the package script in all projects. Navigate to a project's directory and substitute `rushx` for `rush` to run the script for just the current project. Run `rush <scriptname> --help` for more information about each script.

All projects have at least the following scripts:

- `audit`: Run `npm audit` on the project (with some workarounds for Rush)
- `build`: Build the project's production artifacts (Node and browser bundles)
- `build:test`: Build the project's test artifacts only
- `check-format`: Show Prettier formatting issues within the project
- `clean`: Remove generated and temporary files
- `execute:samples`: Execute samples using the source code
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

### Getting back to a clean state

If you're having problems and want to restore your repo to a clean state without any packages installed, run `rush uninstall`. Downloaded packages will be deleted from the cache and all node_modules directories will be removed. Now you can start clean by re-downloading and installing dependencies from scratch with `rush update`. This will not make any changes to any other files in your working directory.

If you want to get back to a completely clean state, you can instead run `rush reset-workspace`. This will perform the same operations as above, but will additionally run `git clean -dfx` to remove all untracked files and directories in your working directory. This is a destructive operation - use it with caution!!

### Rush for NPM users

Generally speaking, the following commands are roughly equivalent:

| NPM command                          | Rush command                            | Rush command effect                                              |
| ------------------------------------ | --------------------------------------- | ---------------------------------------------------------------- |
| `npm install`                        | `rush update`                           | Install dependencies for all projects in the Rush workspace      |
| `npm install --save[-dev] <package>` | `rush add -p <package> --caret [--dev]` | Add or update a dependency in the current project                |
| `npm build`                          | `rush [re]build`                        | Build all projects in the Rush workspace                         |
|                                      | `rush [re]build -t <package>`           | Build named project and any projects it depends on               |
|                                      | `rushx build`                           | Build the current project only                                   |
| `npm test`                           | `rush test`                             | Run dev tests in all projects in the Rush workspace              |
|                                      | `rush test -t <packagename>`            | Run dev tests in named project and any projects it depends on    |
|                                      | `rushx test`                            | Run dev tests in the current project only                        |
| `npm run <scriptname>`               | `rush <scriptname>`                     | Run named script in all projects in the Rush workspace           |
|                                      | `rush <scriptname> -t <packagename>`    | Run named script in named project and any projects it depends on |
|                                      | `rushx <scriptname>`                    | Run named script in the current project only                     |
| `npx <command>`                      | `node_modules/.bin/<command>`           | Run named command provided by installed dependency package       |

### Documentation

We care deeply about the quality of our documentation in order to make the experience of using our SDK smooth and fun. We use [TSDoc](https://tsdoc.org/pages/tags/alpha/) tags to mainly document our methods, classes, and interfaces, and we use [TypeDoc](https://typedoc.org/) to generate the documentation.

In the case where you do not want to generate documentation for a specific definition:

- use `@hidden` if the definition is exported by `src/index.ts`
- use `@internal` otherwise

To maintain the quality of the documentation, the following two facilities are provided:

- an [ESLint plugin](https://github.com/microsoft/tsdoc/tree/master/eslint-plugin) is used to check that our comments are well-formed TSDoc comments and it can be run using `rushx lint`
- the documentation can be generated locally for a particular package using `rushx docs` and it can be inspected by opening `sdk/<package path>/dist/docs/index.html` in your favorite browser

TSDoc specifications can be customized using the `tsdoc.json` configuration file that can be found in the root of the repository. Currently, the `@hidden` tag is used which is only supported by TypeDoc and is not a TSDoc tag, so it is added as a custom tag in `tsdoc.json`.

### Formatting changed files

We used to have a git hook that formats your changed files on commit but it was removed because it did not work well for some people for various reasons. If you would like to enable it in your fork, you will need to just revert this [PR](https://github.com/Azure/azure-sdk-for-js/pull/13982/) in your branch and then run `rush update` so the hook script gets copied into `.git/hooks`. Moreover, without the hook, you can manually format changed files by invoking `rush prettier`.

### Enforcing Azure SDK design guidelines

Our libraries follow the [TypeScript SDK design guidelines](https://azure.github.io/azure-sdk/typescript_introduction.html) to enhance the productivity of developers connecting to Azure services. These guidelines are enforced by our custom [ESLint plugin](https://github.com/Azure/azure-sdk-for-js/tree/main/common/tools/eslint-plugin-azure-sdk). Follow these instruction to use the plugin:

- [add `eslint` to your `devDependencies`](https://github.com/Azure/azure-sdk-for-js/blob/8ec9801c17b175573a115fc8b2d6cbaeb17b0b09/sdk/template/template/package.json#L106)
- [add `eslint-plugin-azure-sdk` to your `devDependencies`](https://github.com/Azure/azure-sdk-for-js/blob/8ec9801c17b175573a115fc8b2d6cbaeb17b0b09/sdk/template/template/package.json#L93)
- add a linting npm script as follows:
  - ["lint": "eslint package.json api-extractor.json src test --ext .ts"](https://github.com/Azure/azure-sdk-for-js/blob/8ec9801c17b175573a115fc8b2d6cbaeb17b0b09/sdk/template/template/package.json#L49)

You can run the plugin by excuting `rushx lint` inside your package directory.

If the package is internal, it should not follow the design guidelines and in turn should not be linted by the plugin. In this case, use the [internal configuration file](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/.eslintrc.internal.json) instead. For example: `"lint": "eslint --no-eslintrc -c ../../.eslintrc.internal.json package.json package.json src test --ext .ts"`

## Onboarding a new library

All libraries must follow our [repository structure](https://github.com/Azure/azure-sdk/blob/main/docs/policies/repostructure.md) (specifically, it must be located at `sdk/<servicename>/<packagename>`) and your library's `package.json` must contain the required scripts as documented [above](#other-npm-scripts).

The repository contains two different sets of libraries, each follows different rules for development and maintaining. The first type is generated automatically from the [swagger specifications](https://github.com/Azure/azure-rest-api-specs) and their code should not be edited by hand. Onboarding such library is just a matter of pushing its auto-generated directory to the right location in the repository.

The second type of libraries is more complex to develop and maintain because they require a custom design that is not necessarily mirroring the swagger specification, if any, and they are handcrafted by our engineers. To add a new such library to the repository, update `rush.json` in the root of the repo and add a new entry to the `projects` array at the bottom of the file. The package name must be the full name of the package as specified in its package.json. Once the library is added, run `rush update` to install and link dependencies. If your new library has introduced a dependency version conflict, this command will fail. See [above](#resolving-dependency-version-conflicts) to learn how to resolve dependency version conflicts.

Rush assumes that anything printed to `STDERR` is a warning. Your package scripts should avoid writing to `STDERR` unless emitting warnings or errors, since this will cause Rush to flag them as warnings during the execution of your build or script command. If your library uses a tool that can't be configured this way, you can still append `2>&1` to the command which will redirect all output to `STDOUT`. You won't see warnings show up, but Rush will still consider the command to have failed as long as it returns a nonzero exit code.

In general, it's recommended to avoid using NPM [hook scripts](https://docs.npmjs.com/misc/scripts) (those starting with `pre` / `post`). The build system will always explicitly run the `install`, `build`, `build:test`, `pack`, `audit`, `lint`, `unit-test`, and `integration-test` scripts at the appropriate times during the build. Adding hooks that performs steps like installing dependencies or compiling the source code will at best slow down the build, and at worst may lead to difficult to diagnose build failures.

Because Rush uses PNPM to download and manage dependencies, it's **_especially_** important to make sure that none of your package scripts are calling `npm install` when your library is built via the Rush toolchain. Most commonly this occurs in a `prepack` or `prebuild` script. Ensure your library does not contain these scripts - or if you determine that such a script is required, ensure that it doesn't run `npm install`.

### Issues with Rollup

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

### Package Versioning

For information about packages are versioned and tagged see [Javascript Releases](https://azure.github.io/azure-sdk/policies_releases.html#javascript)

### Core Client libraries

Our packages depends on a set of [Azure Core Client libraries](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/core), which provide common functionality for interacting with Azure services.

### Dev Packages

The daily dev build for JS are published directly to [npmjs.com](https://npmjs.com) under the alpha tag. These are published daily whenever there is a change in the package. You can test them by downloading the "alpha" tagged version of the package, or pinning to particular alpha version.

The daily dev packages are considered volatile and taking dependencies on a dev package should be considered a temporary arrangement.

[buildtools]: https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2019
[python39windows]: https://www.microsoft.com/p/python-39/9p7qfqmjrfp7
[test proxy server]: https://github.com/Azure/azure-sdk-tools/tree/main/tools/test-proxy
[docker]: https://docker.com/
