# Contributing

## How to contribute to the Azure SDK for JavaScript

There are many ways that you can contribute to the Azure SDK for JavaScript project:

- Submit a bug
- Submit a code fix for a bug
- Submit additions or modifications to the documentation
- Submit a feature request

All code submissions will be reviewed and tested by the team, and those that meet a high bar for both quality and design/roadmap appropriateness will be merged into the source. Be sure to follow the existing file/folder structure when adding new boards or sensors.

If you encounter any bugs with the library, please file an issue in the [Issues](https://github.com/Azure/azure-sdk-for-js/issues) section of the project.

## Things to keep in mind when contributing

Some guidance for when you make a contribution:

- Add/update tests and code as required by your change
- Make sure you run all the tests on the affected platform(s)/languages. If the change is in common code, generally running on one platform would be acceptable.
- Run end-to-end tests or simple sample code to make sure the lib works in an end-to-end scenario.

## Big contributions

If your contribution is significantly big, it is better to first check with the project developers in order to make sure the change aligns with the long term plans. This can be done simply by submitting a question via the GitHub Issues section.

## Project orchestration

This project uses [pnpm](https://pnpm.io/) to manage many of our Azure SDK libraries within a single repository. It is highly recommended that you read the [pnpm Documentation](https://pnpm.io/motivation) to familiarize yourself with the tool.

PNPM provides many benefits:

- Some of our devDependencies are not published to the public registry (e.g. our ESLint plugin), and pnpm is configured to install them correctly.
- Your local build results will match what occurs on our build server, since the build server uses pnpm to build the SDK.
- pnpm will ensure that all libraries use the same versions of a given dependency, making it easier to reason about our dependency graph and reducing bundle size.
- Dependencies between different libraries within the Azure SDK will be locally linked using pnpm with catalog and workspace resolvers. This means that if you are working on a library that depends on another library in the Azure SDK, you can make changes to both libraries and test them together without having to publish the dependent library first.
- When a change is made in a local dependency, pnpm will detect that the dependency is dirty and will rebuild it if you attempt to build a project that consumes that dependency.
- pnpm runs project tasks in parallel, subject to the inter-project dependencies that it detects. It also performs incremental builds by default, not rebuilding anything unnecessary (unless you tell it to).

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
- Any of the [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- A C++ compiler toolchain and Python (for compiling machine-code modules):
  - Windows: Install the [Visual Studio Build Tools][buildtools] from Microsoft and [Python 3.9][python39windows] from the Microsoft Store.
  - macOS: Install Xcode or the "Command Line Tools for XCode" (much smaller) from [Apple's developer downloads page](https://developer.apple.com/download/all/).
  - Linux: Install Python and GCC/G++ (part of the `build-essential` package on Ubuntu-based distributions) using your distribution's package manager.

    **On Linux, development headers for `libsecret` are also required.** Typically, these are available in a package called `libsecret-1-dev` (Debian/Ubuntu) or `libsecret-devel` (Fedora/Red Hat).

    **[setuptools](https://pypi.org/project/setuptools/) is also a required Python library**. It can be installed using `pip install setuptools`.

- pnpm
  - Install / update pnpm by using the [Installation Guide](https://pnpm.io/installation)
  - pnpm will automatically manage the specific version needed by this repo.

### Building our repository

1. Fork this repo
2. Clone your fork locally (`git clone https://github.com/<youruser>/azure-sdk-for-js.git`)
3. Open a terminal and move into your local copy (`cd azure-sdk-for-js`)

To build all packages:

4. Install and link all dependencies (`pnpm install`)
5. Build the code base (`pnpm build`)

You rarely need to build all packages though, as it takes over one hour to finish. Instead, you can build selected packages impacted by your changes. To build specific package(s), use the `--filter=@azure/package-name...` command-line option:

6. Install and link all dependencies (`pnpm install`)
7. Build the package, for example, `pnpm turbo build --filter=@azure/service-bus...`. Alternatively when under the package directory, `npx turbo build`

## Development Workflows

### Installing and managing dependencies

To add a new dependency (assuming the dependency is published on the NPM registry), navigate to the project's directory and run `pnpm add "<packagename>" [-D]`. This will add the dependency at its latest version to the project's package.json, and then automatically run `pnpm install` to install the package into the project's node_modules directory. If you know the specific version of the package you want, you can instead run `pnpm add "<packagename@^version>"` - make sure to use the caret before the version number. Do not use `npm install [--save | --save-dev]`.

To add a dependency on another library within the Azure SDK, you can follow the same procedure as above as long as the library is also published to the NPM registry. Additionally, as long as the local copy of that library satisfies the SemVer range you specify when you run `pnpm add`, that library will be locally linked rather than downloaded from the registry. If the library has not yet been published to the NPM registry, you can't use `pnpm add`. In this case, you must manually edit the package.json to add the dependency and then run `pnpm install` to locally link the library into the project's node_modules directory.

To update a dependency's version, use the same process as adding a new dependency - just specify the new version you want to use. If other libraries also use this dependency, you will likely see the `pnpm install` step fail because the versions are now inconsistent. See [below](#resolving-dependency-version-conflicts) to learn how to resolve dependency version conflicts.

To remove a dependency, you must edit the package.json to remove the dependency and then run `pnpm install` to remove it from the project's node_modules directory.

If you manually edit dependencies within the package.json for any reason, make sure to run `pnpm install` afterwards to update the project's node_modules directory.

Any time you add, update, or remove dependencies, running `pnpm install` will generate a diff to the file `pnpm-lock.yaml`. You should commit these changes - this file works similarly to NPM's package-lock.json files, except it tracks package versions for all projects in the pnpm workspace. Do not check in any package-lock.json files.

Because multiple pull requests may be changing `pnpm-lock.yaml` at the same time, it is very common that the first merged one will cause merge conflicts for the later ones. Please refer to [the instructions](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/resolve-pnpm-lock-merge-conflict.md) on resolve PR merge conflicts for `pnpm-lock.yaml`

### Resolving dependency version conflicts

When you run `pnpm install`, pnpm will also ensure that dependency versions are consistent across all of our packages. If they are not, the command will fail and show you all packages which use a conflicting versions of dependencies. There are a few ways to resolve this:

First and foremost, you should make every attempt to match the versions of any dependencies your library has to those that already exist in the catalog if applicable. If this dependency is not in the catalog, you should try to match the version of the dependency that is used by the majority of libraries in the repo. This will help ensure that we have a consistent set of dependencies across all libraries, which will reduce bundle size and make it easier to reason about our dependency graph.

If you know your library requires functionality introduced in a newer version of the dependency, you can create a new named catalog entry for this dependency in the `pnpm-workspace.yaml` file. This will allow you to use the newer version of the dependency while still allowing other libraries to use the older version. You can then run `pnpm install` to update the lockfile and install the new version of the dependency.

On the other hand, if you know your library does not work with the existing version of the dependency and you explicitly need an older version, you have a few options. The preferred option would be to update your library so that it works with the existing version of the dependency. If this is not possible, you can create a new named catalog entry for the older version of the dependency in the `pnpm-workspace.yaml` file. This will allow you to use the older version of the dependency while still allowing other libraries to use the newer version. You can then run `pnpm install` to update the lockfile and install the older version of the dependency.

### Building using pnpm

Run `pnpm build` from repo root directory to build any projects that have been modified since the last build.

Run `pnpm turbo build --filter=<packagename>...` to build a single project, and all local projects that it depends on. You can pass `--filter` multiple times to build multiple projects. Keep in mind that pnpm refers to packages by their full names, so packages will be named something like `@azure/<servicename>`.  To ensure that it builds all of its dependencies, you must use the `...` suffix. For example, to build the `@azure/communication-chat` package, you would run `pnpm turbo build --filter=@azure/communication-chat...`.  Alternatively, you can run `npx turbo build` to build current package's dependencies then the package itself.

### Testing

If you want to run the tests of a specific project, go to that project's folder and execute `pnpm test`. All of the tests will automatically run both in NodeJS and in the browser. To target these environments individually, you can run `pnpm test:node` and `pnpm test:browser`.

By default, these npm scripts run previously recorded tests. The recordings have been generated by using a custom recording library called [test-recorder](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/recorder/README.md). We will examine how to run recorded tests and live tests in the following sections.

#### Recorded tests

Most of the tests in our projects run in playback mode by default, i.e they make no network requests to the real services. For HTTP requests made in each test case, there is a recorded response that reproduces the service behavior. The readme file in the `test` folder of each package will indicate whether the package uses recorded tests or not.

At the moment, tests in our repo depend on one of the two different versions of the recorder tool (`@azure-tools/test-recorder`) - `1.a.b` and `4.m.n`.
Currently, version `4.m.n` is maintained in the repository which is built as part of a cross-language unification effort in terms of the tests and recordings.
Eventually, all the tests will be migrated to depend on the `4.m.n` version of the recorder that depends on the language-agnostic [test proxy server].

Refer to the [Migration Guide](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/recorder/ASSET_SYNC_WORKFLOW.md#migration-steps-for-existing-recordings) for more information on migrating the tests from recorder v4.

#### Live tests

To use the `pnpm test` command to run the tests against live resources, you must:

- Set the environment variable `TEST_MODE` to `live`.
- Have previously created the necessary Azure resources needed by the tests.
- Set the appropriate environment variables to point to these resources.

The readme file in the `test` folder of each package lists the Azure resources and the environment variables needed.

> Note: Our projects use dotenv to allow you to use `.env` files to set environment variables. Find the `sample.env` file nearest to the project you want to test to see a template of the expected `.env` file.

You can create the necessary Azure resources on your own, or automate this process by using the script called `New-TestResources.ps1` which uses ARM templates defined in a file named `test-resources.json` that exists in each project's folder. Follow the steps in [`Example 1 of New-TestResources.ps1`](https://github.com/Azure/azure-sdk-for-js/blob/main/eng/common/TestResources/New-TestResources.ps1.md#example-1) to set up a service principal and deploy the live test resources.

#### Regenerating recordings

If you modify the network calls (both the number of calls or their shape) either by changing the tests or source code of the project you're working on, the recordings will need to be re-generated.

Regenerating the recordings has the same requirements as running the live tests. You will be using the same `test` npm script with the environment variables pointing to previously created Azure resources. The only difference is that the `TEST_MODE` environment variable needs to be set to `record`. When this process finishes without errors, the recordings will be updated.

For more information about the recorder, please visit the [test-recorder's readme](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/recorder/README.md).

Here are a few [Useful Commands](https://github.com/Azure/azure-sdk-for-js/wiki/Golden-Testing-Commands) that can be handy while testing your SDKs.

### Other NPM scripts

Most package scripts are exposed as pnpm commands. Use `pnpm <scriptname>` in place of `npm run <scriptname>` to run the package script in all projects. Run `pnpm <scriptname> --help` for more information about each script.

All projects have at least the following scripts:

- `build`: Build the project's production artifacts (Node and browser bundles)
- `build:test`: Build the project's test artifacts only
- `check-format`: Show Prettier formatting issues within the project
- `clean`: Remove generated and temporary files
- `execute:samples`: Execute samples using the source code
- `format`: Reformat project files with Prettier
- `lint:fix`: Fix ESLint issues within the project
- `lint`: Show ESLint issues within the project
- `pack`: Run `npm pack` on the project
- `test:browser`: Execute browser dev tests
- `test:node`: Execute Node dev tests
- `test`: Execute all dev tests

Projects may optionally have the following scripts:

- `extract-api`: Run API Extractor to show API issues and generate API reports

### Getting back to a clean state

If you're having problems and want to restore your repo to a clean state without any packages installed, run `pnpm clean`. Downloaded packages will be deleted from the cache and all node_modules directories will be removed. Now you can start clean by re-downloading and installing dependencies from scratch with `pnpm install`. This will not make any changes to any other files in your working directory.

### PNPM for NPM users

Generally speaking, the following commands are roughly equivalent:

| NPM command                          | pnpm command                                  | Where to run      | pnpm command effect                                              |
|--------------------------------------|-----------------------------------------------|-------------------|------------------------------------------------------------------|
| `npm install`                        | `pnpm install`                                | Anywhere in repo  | Install dependencies for all projects in the pnpm workspace      |
| `npm install --save[-dev] <package>` | `pnpm add -p <package> [-D]`                  | Package directory | Add or update a dependency in the current project                |
| `npm build`                          | `pnpm build`                                  | Repo root         | Build all projects in the pnpm workspace                         |
|                                      | `pnpm turbo build --filter=<package>...`      | Anywhere in repo  | Build named project and any projects it depends on               |
|                                      | `pnpm turbo build`                            | Package directory | Build the current project                                        |
| `npm test`                           | `pnpm test`                                   | Repo root         | Run dev tests in all projects in the pnpm workspace              |
|                                      | `pnpm test --filter=<packagename>...`         | Repo root         | Run dev tests in named project and any projects it depends on    |
|                                      | `pnpm test`                                   | Package directory | Run dev tests in the current project only                        |
| `npm run <scriptname>`               | `pnpm <scriptname>`                           | Repo root         | Run named script in all projects in the pnpm workspace           |
|                                      | `pnpm <scriptname> --filter=<packagename>...` | Repo root         | Run named script in named project and any projects it depends on |
|                                      | `pnpm <scriptname>`                           | Package directory | Run named script in the current project only                     |
| `npx <command>`                      | `npx <command>`                               | Anywhere          | Run named command provided by installed dependency package       |

Similarly other monorepo commands (`clean`, `test`, `test:node`, `format`, `lint`, etc.) also work with selections via `--filter` or `-F` option. It is supported to pass `--filter` or `-F` option multiple times.

> **Note about "Where to run":**
>
> - **Repo root**: The top-level directory of the azure-sdk-for-js repository (where `pnpm-workspace.yaml` is located)
> - **Package directory**: The specific package folder containing its own `package.json` file (e.g., `sdk/appconfiguration/app-configuration`)
> - **Anywhere in repo**: Can be run from any directory within the repository

**Filtering patterns:**

- To select package's dependencies and itself: `--filter <package name>...`
- To select package itself only: `--filter <package name>`
- To select package and its dependents: `--filter ...<package name>`
- To select package's dependencies, itself, and its dependents: `--filter ...<package name>...`

For more filtering information please see [Filtering | pnpm](https://pnpm.io/filtering).

### Documentation

We care deeply about the quality of our documentation in order to make the experience of using our SDK smooth and fun. We use [TSDoc](https://tsdoc.org/pages/tags/alpha/) tags to mainly document our methods, classes, and interfaces, and we use [TypeDoc](https://typedoc.org/) to generate the documentation.

In the case where you do not want to generate documentation for a specific definition:

- use `@hidden` if the definition is exported by `src/index.ts`
- use `@internal` otherwise

To maintain the quality of the documentation, the following two facilities are provided:

- an [ESLint plugin](https://github.com/microsoft/tsdoc/tree/master/eslint-plugin) is used to check that our comments are well-formed TSDoc comments and it can be run using `pnpm lint`
- documentation artifacts are generated in pull request checks Azure Pipelines. They can be downloaded, extracted to local disk, and inspected by opening `azure-<package name>/<version>/index.html` in your favorite browser. Click on "xx published; xx consumed" under **Related**, expand packages > azure-xxxxx > documentation then download the azure-xxxxx.zip file.

TSDoc specifications can be customized using the `tsdoc.json` configuration file that can be found in the root of the repository. Currently, the `@hidden` tag is used which is only supported by TypeDoc and is not a TSDoc tag, so it is added as a custom tag in `tsdoc.json`.

### Formatting changed files

We used to have a git hook that formats your changed files on commit but it was removed because it did not work well for some people for various reasons. If you would like to enable it in your fork, you will need to just revert this [PR](https://github.com/Azure/azure-sdk-for-js/pull/13982/) in your branch and then run `pnpm install` so the hook script gets copied into `.git/hooks`. Moreover, without the hook, you can manually format changed files by invoking `pnpm format` under your package directory.

### Enforcing Azure SDK design guidelines

Our libraries follow the [TypeScript SDK design guidelines](https://azure.github.io/azure-sdk/typescript_introduction.html) to enhance the productivity of developers connecting to Azure services. These guidelines are enforced by our custom [ESLint plugin](https://github.com/Azure/azure-sdk-for-js/tree/main/common/tools/eslint-plugin-azure-sdk). Follow these instruction to use the plugin:

- [add `eslint` to your `devDependencies`](https://github.com/Azure/azure-sdk-for-js/blob/8ec9801c17b175573a115fc8b2d6cbaeb17b0b09/sdk/template/template/package.json#L106)
- [add `eslint-plugin-azure-sdk` to your `devDependencies`](https://github.com/Azure/azure-sdk-for-js/blob/8ec9801c17b175573a115fc8b2d6cbaeb17b0b09/sdk/template/template/package.json#L93)
- add a linting npm script as follows:
  - ["lint": "eslint package.json src test"](https://github.com/Azure/azure-sdk-for-js/blob/8ec9801c17b175573a115fc8b2d6cbaeb17b0b09/sdk/template/template/package.json#L49)

You can run the plugin by executing `pnpm lint` inside your package directory. You need to build the plugin at least once either directly via `pnpm turbo build --filter @azure-tools/eslint-plugin-azure-sdk...`, or indirectly as your package's dependency by `pnpm turbo build` under your package directory.

If the package is internal, it should not follow the design guidelines and in turn should not be linted using the same set of rules. In this case, use the an internal config from `eslint-plugin-azure-sdk` instead. For example: `"lint": "eslint src test"` with the following eslint.config.mjs

```javascript
import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default [...azsdkEslint.configs.internal];
```

## Onboarding a new library

All libraries must follow our [repository structure](https://github.com/Azure/azure-sdk/blob/main/docs/policies/repostructure.md) (specifically, it must be located at `sdk/<servicename>/<packagename>`) and your library's `package.json` must contain the required scripts as documented [above](#other-npm-scripts).

The repository contains two different sets of libraries, each follows different rules for development and maintaining. The first type is generated automatically from the [swagger specifications](https://github.com/Azure/azure-rest-api-specs) and their code should not be edited by hand. Onboarding such library is just a matter of pushing its auto-generated directory to the right location in the repository.

The second type of libraries is more complex to develop and maintain because they require a custom design that is not necessarily mirroring the swagger specification, if any, and they are handcrafted by our engineers. To add a new such library to the repository, ensure that the project will be picked up in the `pnpm-workspace.yaml`. Once the library is added, run `pnpm install` to install and link dependencies. If your new library has introduced a dependency version conflict, this command will fail. See [above](#resolving-dependency-version-conflicts) to learn how to resolve dependency version conflicts.

In general, it's recommended to avoid using NPM [hook scripts](https://docs.npmjs.com/misc/scripts) (those starting with `pre` / `post`). The build system will always explicitly run the `install`, `build`, `build:test`, `pack`, `lint`, and `test` scripts at the appropriate times during the build. Adding hooks that perform steps like installing dependencies or compiling the source code will at best slow down the build, and at worst may lead to difficult to diagnose build failures.

Because pnpm is used, it's **_especially_** important to make sure that none of your package scripts are calling `npm install` when your library is built via the pnpm toolchain. Most commonly this occurs in a `prepack` or `prebuild` script. Ensure your library does not contain these scripts - or if you determine that such a script is required, ensure that it doesn't run `npm install`.

### Issues with Rollup

Rollup must be manually configured to work correctly when symlinks are created in your node_modules (as pnpm does). Each of your Rollup configuration objects must contain the following setting:

```
preserveSymlinks: false
```

Additionally, when adopting the pnpm workflow you will likely see Rollup emitting many "not exported" errors like the following when generating your browser bundle:

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

For information about packages are versioned and tagged, see [Javascript Releases](https://azure.github.io/azure-sdk/policies_releases.html#javascript)

### Core Client libraries

Our packages depends on a set of [Azure Core Client libraries](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/core), which provide common functionality for interacting with Azure services.

### Dev Packages

The daily dev build for JS are published directly to [npmjs.com](https://npmjs.com) under the alpha tag. These are published daily whenever there is a change in the package. You can test them by downloading the "alpha" tagged version of the package, or pinning to particular alpha version.

The daily dev packages are considered volatile and taking dependencies on a dev package should be considered a temporary arrangement.

[buildtools]: https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2019
[python39windows]: https://www.microsoft.com/p/python-39/9p7qfqmjrfp7
[test proxy server]: https://github.com/Azure/azure-sdk-tools/tree/main/tools/test-proxy
[docker]: https://docker.com/

## Samples

### Third-party dependencies

Third party libraries should only be included in samples when necessary to demonstrate usage of an Azure SDK package; they should not be suggested or endorsed as alternatives to the Azure SDK.

When code samples take dependencies, readers should be able to use the material without significant license burden or research on terms. This goal requires restricting dependencies to certain types of open source or commercial licenses.

Samples may take the following categories of dependencies:

- **Open-source** : Open source offerings that use an [Open Source Initiative (OSI) approved license](https://opensource.org/licenses). Any component whose license isn't OSI-approved is considered a commercial offering. Prefer OSS projects that are members of any of the [OSS foundations that Microsoft is part of](https://opensource.microsoft.com/ecosystem/). Prefer permissive licenses for libraries, like [MIT](https://opensource.org/license/MIT) and [Apache 2](https://opensource.org/license/Apache-2.0). Copy-left licenses like [GPL](https://opensource.org/license/gpl-2-0) are acceptable for tools, and OSs. [Kubernetes](https://github.com/kubernetes/kubernetes), [Linux](https://github.com/torvalds/linux), and [Newtonsoft.Json](https://github.com/JamesNK/Newtonsoft.Json) are examples of this license type. Links to open source components should be to where the source is hosted, including any applicable license, such as a GitHub repository (or similar).

- **Commercial**: Commercial offerings that enable readers to learn from our content without unnecessary extra costs. Typically, the offering has some form of a community edition, or a free trial sufficient for its use in content. A commercial license may be a form of dual-license, or tiered license. Links to commercial components should be to the commercial site for the software, even if the source software is hosted publicly on GitHub (or similar).

- **Dual licensed**: Commercial offerings that enable readers to choose either license based on their needs. For example, if the offering has an OSS and commercial license, readers can choose between them. [MySql](https://github.com/mysql/mysql-server) is an example of this license type.

- **Tiered licensed**: Offerings that enable readers to use the license tier that corresponds to their characteristics. For example, tiers may be available for students, hobbyists, or companies with defined revenue thresholds. For offerings with tiered licenses, strive to limit our use in tutorials to the features available in the lowest tier. This policy enables the widest audience for the article. [Docker](https://www.docker.com/), [IdentityServer](https://duendesoftware.com/products/identityserver), [ImageSharp](https://sixlabors.com/products/imagesharp/), and [Visual Studio](https://visualstudio.com) are examples of this license type.

In general, we prefer taking dependencies on licensed components in the order of the listed categories. In cases where the category may not be well known, we'll document the category so that readers understand the choice that they're making by using that dependency.

### Using MCP Servers in VS Code

This repository configures MCP servers to be used with GitHub Copilot in VS Code. They are listed in `.vscode/mcp.json`. For example, to use the ESLint MCP server, follow [the instructions at ESLint documentation site](https://eslint.org/docs/latest/use/mcp#using-the-eslint-mcp-server-with-github-copilot).
