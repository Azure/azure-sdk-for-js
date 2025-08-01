# @azure/dev-tool

`dev-tool` is an extensible command-line utility for Azure SDK for JS contributors.

It provides a place to centralize scripts, resources, and processes for development of the Azure SDK for JavaScript. It is its own unpublished package and has the ability to use dependencies that are managed with pnpm in the development process, and it is written in TypeScript.

## Installation

`dev-tool` runs using [tsx](https://tsx.is/), so it does not need to be built. It is ready-to-go after a `pnpm install`. It additionally does not need to be installed to a user's machine in order to be used in `package.json` scripts, since it provides the `dev-tool` binary to any dependent packages through the `bin` entry in its `package.json`. Simply add `@azure/dev-tool` to the `devDependencies` of a package, and the `dev-tool` binary will become available. If you wish to use `dev-tool` from the CLI manually, you can run it from a service package using `npx dev-tool`, or you can install it globally on your system by running `npm install -g` from this directory.

## Usage

`dev-tool` uses a command hierarchy. For example, at the time of writing, the command tree looks like this:

`dev-tool`

- `about` (display command help and information)
- `admin`	run administrative tasks for the repository
  - `create-migration` scaffolds a new migration
  - `stage-migrations` stage migration passes over the whole monorepo
  - `migrate-snippets` migrates a package to the latest snippets standards
  - `migrate-source` migrates a package to the latest source code standards
  - `list` list monorepo elements
    - `packages` list packages defined in the monorepo
    - `service-folders`	list service folders in the monorepo
    - `esm-migrations` list the status of the ESM migrations
    - `snippets-migrations` list the status of the snippets migrations
- `check` (run checks on the package). See [Checks](#checks), below, for more information.
  - `--tag=local` to run checks that should pass before pushing your code
  - `--tag=ci` to run checks that should pass as part of the CI pipeline
  - `--tag=release` to run checks that should pass before you release the package to npm
  - `--verbose` to show more detailed output
  - `--fix` to automatically fix some issues
- `package`
  - `resolve` (display information about the project that owns a directory)
- `samples`
  - `dev` (link samples to local sources for access to IntelliSense during development)
  - `prep` (prepare samples for local source-linked execution)
  - `publish` (make a "camera-ready" copy of a package's samples)
  - `run` (execute a sample or all samples within a directory)
  - `check-node-versions` (execute samples with different node versions, typically in preparation for release)
- `test-proxy`
  - `init` (initializes `assets.json` in your package folder)
  - `push` (pushes the assets, referenced by assets.json, into git)
  - `reset` (reset the assets, referenced by assets.json, from git to their original files referenced by the tag. Will prompt if there's pending changes)
  - `restore` (restore the assets, referenced by assets.json, from git)
  - `wait-for-proxy-endpoint` (waits until the proxy endpoint is ready or aborts in 120 seconds, whichever happens first)
- `run`
  - `test:vitest`	runs tests using vitest with the default and the provided options; starts the proxy-tool in - record and playback modes
  - `check-api`	ensure API features are compatible with minimum supported TypeScript version
  - `extract-api`	Runs api-extractor multiple times for all exports.
  - `build-test` build a package for testing
  - `typecheck`	typecheck typescript code files that are not part of tshy build
  - `start-browser-relay`	Start the browser credential relay, used for authenticating browser tests.
  - `update-snippets`	find README and TSDoc snippets throughout the package and update their contents.
  - `build-package`	build a package for production
  - `vendored` run dev-tool's dependency commands

The `dev-tool about` command will print some information about how to use the command. All commands additionally accept the `--help` argument, which will print information about the usage of that specific command. For example, to show help information for the `resolve` command above, issue the command `dev-tool package resolve --help`.

## Extending the Tool

The source hierarchy matches the command hierarchy. Every sub-command has its own folder and `index.ts` file in `src/commands`, where `src/commands/index.ts` defines the behavior of the root `dev-tool` command, and each subfolder's `index.ts` file describes a nested sub-command. Every leaf node in the command tree ("leaf command") has its own TypeScript file. For example, `src/commands/about.ts` defines the behavior of the `dev-tool about` command, and `src/commands/package/resolve.ts` defines the behavior of the `dev-tool package resolve` command.

### Command Interface

Every command file's exports must implement the `CommandModule` interface defined in `src/util/commandModule.ts`. The interface requires that every command export a constant `commandInfo` that implements the `CommandInfo` interface defined in the same file. A helper command `makeCommandInfo` is provided to assist with the creation of this interface while providing strong type-checking of command-line options. The `CommandInfo` interface specifies the name, description, and options (command-line arguments) of the command. The command module must also export an async handler function as its default export. Two helper functions, `leafCommand` and `subCommand` are provided to assist with development and to provide strong type-checking when
extending dev-tool.

### Creating a new leaf command

To create a new leaf command in one of the existing sub-command, create a new TypeScript file for that command. Make sure that your module exports the required `commandInfo` and default handler function. When creating the `commandInfo` object, use the `makeCommandInfo` helper function. When creating a command, use the `leafCommand` helper to get a strongly-typed `options` parameter for your handler.

As an example, we can create a new `hello-world` command under the `dev-tool package` sub-command. The command will print out a string using the many different logging functions. It will accept an argument `--echo <string here>` that specifies the string to be printed.

`src/commands/package/hello-world.ts`

```typescript
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import { createPrinter } from "../../util/printer";
import { leafCommand, makeCommandInfo } from "../../framework/command";

const log = createPrinter("hello-world");

export const commandInfo = makeCommandInfo("hello-world", "print a lovely message", {
  echo: {
    kind: "string",
    description: "override the message to be printed",
    default: "Hello world!",
  },
});

export default leafCommand(commandInfo, async (options) => {
  // Demonstrate the colorized command output.
  log("Normal:", options.echo);
  log.success("Success:", options.echo);
  log.info("Info:", options.echo);
  log.warn("Warn:", options.echo);
  log.error("Error:", options.echo);
  log.debug("Debug:", options.echo);

  return true;
});
```

(**Note**: using the `makeCommandInfo` function is required to have strong type-checking on the `options` parameter of the handler. The `options` field of `commandInfo` must have a very strong type, and `makeCommandInfo` takes care of ensuring that the type is as strongly specified as possible.)

As a last step, add a mapping for the `"hello-world"` command to the sub-command map in `src/commands/package/index.ts`. This will allow the command to resolve:

`src/commands/package/index.ts`

```typescript
// ...

export default subCommand(commandInfo, {
  "hello-world": () => import("./hello-world"),
  // ... rest of the sub-commands still here
});
```

At this point, the command is ready. When using `leafCommand` or `subCommand`, parsing and handling of arguments, including the `--help` output will be handled automatically by the command infrastructure. Debug output will only be shown if the `DEBUG` environment variable is set. Try it out:

- Use `dev-tool package hello-world` to see the default output of the command
- Use `DEBUG=true dev-tool package hello-world` to see the full debugging output
- Use `dev-tool package hello-world --help` to view the generated help pages and make sure they are correct
- Use `dev-tool package hello-world --echo <another string>` to change the default `"Hello world!"` text to something else.
- Use `dev-tool package --help` to see the `hello-world` command in the help message of its parent command

### Creating a new command with sub-commands

To create a new branching sub-command, create a new folder in the source tree and add an `index.ts` file. The folder should be named the same as the new command. The `subCommand` helper function can assist with creating a branching command.

As an example, we can convert the `hello-world` example above into a branching command `hello` with a single sub-command `world`. Instead of adding it to the `package` sub-command, we will add it to the root `dev-tool` command.

Instead of creating a single file `hello-world.ts`, we will instead create a folder `src/commands/hello` and two ts files: `src/commands/hello/index.ts` and `src/commands/hello/world.ts`. In `src/commands/hello/index.ts`, we can define our new sub-command:

`src/commands/hello/index.ts`

```typescript
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import { subCommand, makeCommandInfo } from "../../framework/command";

export const commandInfo = makeCommandInfo("hello", "commands for printing some lovely messages");

export default subCommand(commandInfo, {
  world: () => import("./world"),
});
```

(**Note**: Since we don't have any arguments or options to add to the sub-command, the `options` argument to `makeCommandInfo` is omitted (since the sub-command just delegates to its child commands, we wouldn't be able to use any options in this parent command anyway).)

This simple file establishes the mapping from the command name `"world"` to our new command module `src/commands/hello/world.ts`. The contents of `world.ts` are very similar to the previous `hello-world.ts` module, but we will change the `name` field of `commandInfo` and the argument to `createPrinter`:

`src/commands/hello/world.ts`

```typescript
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import { createPrinter } from "../../util/printer";
import { leafCommand, makeCommandInfo } from "../../framework/command";

const log = createPrinter("world");

export const commandInfo = makeCommandInfo("world", "print a lovely message", {
  echo: {
    kind: "string",
    description: "override the message to be printed",
    default: "Hello world!",
  },
});

export default leafCommand(commandInfo, async (options) => {
  // Demonstrate the colorized command output.
  log("Normal:", options.echo);
  log.success("Success:", options.echo);
  log.info("Info:", options.echo);
  log.warn("Warn:", options.echo);
  log.error("Error:", options.echo);
  log.debug("Debug:", options.echo);

  return true;
});
```

The final step is to add a mapping to our new subcommand to the`baseCommands` map root `src/commands/index.ts` file:

`src/commands/index.ts`

```typescript
// ...

/**
 * All of dev-tool's base commands and the modules that define them
 */
export const baseCommands = {
  hello: () => import("./hello"),
  // ... all other sub-commands still here
} as const;

// ...
```

(**Note**: If we were adding our `hello` command to another sub-command rather than the root, we would just add it to that sub-command's `index.ts` instead of the root `src/commands/index.ts`, similar to how we added `hello-world` to `src/commands/package/index.ts` in the previous example.)

### Understanding the Options Type

When using `leafCommand`, the handler function takes a value `options` with a type that is generated from the `options` property of the `CommandInfo` object given as the first argument to `leafCommand`. The underlying parsing behavior is implemented by `minimist` and is validated in the `parseOptions` function in `src/util/commandBuilder.ts`.

The structure of the `CommandInfo.options` field is a map from option names to a tagged union that supports three variants (using the "kind" property as the disciminant):

- `"string"` for command-line flags that have a string value (for example, `--directory path/to/directory`)
- `"boolean"` for command-line flags that have a boolean value (for example, `--quiet` with no argument)
- `"multistring"` for command-line flags that have string values and may be specified more than once (for example, `--add-dir path/to/dir1 --add-dir path/to/dir2`)

Each variant supports an optional `shortName` field that specifies a one-letter command alias (e.g. a value of `shortName: "d"` would make `-d` an alias of the `--directory` option above). Each also has an optional `default` parameter to specify the default value should the argument not be specified on the command-line. If no default value is provided, the type of the `options` value passed to the handler will be expanded to include `undefined` as a possible value. Finally, each option has a `description` field that includes the help text shown in the messages produced by `--help`.

### Final Developer Notes

- Using the `subCommand` and `leafCommand` helpers is not required. If a command module exports any function with the signature `(...args: string[]) => Promise<boolean>` as its default export, it will run when the command is invoked and will be given the arguments passed in the parameters. **However**, only `subCommand` and `leafCommand` provide automatic argument parsing and handling of `--help`. The functions used to provide this behavior are located in the `src/util/commandBuilder.ts` module.
- Some additional helper modules can be found in `src/util` such as `resolveProject.ts` which walks up the directory hierarchy and finds the absolute path of the nearest SDK package directory (useful for commands like `samples` which always operate relative to the package directory)

## Checks

`dev-tool check` is a command which can be used to run pass/fail checks on SDK packages.

### Usage

```
dev-tool check [--tag=<tag>] [--verbose] [--fix]
```

### What is a check?

A check consists of a combination of metadata (name, description, "hasFix", tags, severity) and a _check function_. When a check is run, the check function is called with arguments providing information about the package being checked. If the check function runs to completion, the check passes; otherwise if an error is thrown then the check fails. A helper function, `check`, is provided which throws an error if a boolean condition is not met.

Checks are defined in files under the `src/checks` directory in dev-tool. The check runner automatically discovers files in the directory. Each export from a file in the `src/checks` directory is expected to be a check. When running checks, the output is grouped by file, and then the name of the check. The name of the check, unless overridden in the metadata, is the name it is exported under.

### Check metadata

Checks can have this metadata, all optional:
- `name`: the name of the check; if unspecified the name will be inferred from the name of the export
- `description`: an extended description of the check which is shown if the check fails
- `hasFix`: see "Fix mode", below; defaults to `false`, but if set to `true` indicates to the runner that the check is able to attempt to fix itself
- `tags`: a list of "tags" which can be used to specify in what contexts the check should be run. If none are specified, the check will be run in all contexts. See "Tags" below.
- `severity`: either "warning" or "error". Defaults to "error". If the severity is "error", the check failing will cause a failure exit code, but if the severity is only "warning" then a message will be output if the check fails but it will not cause a failure exit code.
- `enable`: an optional additional function alongside the main check function. The check will only be run if the `enable` function returns `true` for the given project. This is useful for making checks that only run on ESM packages, for example.

### Fix mode and `hasFix`

A check can specify `hasFix: true` in its metadata to signal that the check is able to fix itself. If a check is fixable, running `dev-tool check` with `--fix` will pass `fix: true` to the check function. If this is passed, the check function is responsible for writing changes that fix the check to the filesystem.

### Tags

Not all checks need to be run all the time. For example, you might not want to run lengthy release checks like the package installability check locally every time you run `dev-tool check`. For this purpose, checks can specify "tags" in their metadata which govern when the check should be run. The `--tag` option can be passed in to the check command to specify which tag of check you want to run. By default, `dev-tool check` will only run checks which do not have a tag. Checks can use a wildcard tag `*` to run in all contexts.

Currently available tags are:
  - `local`: the check is intended to be run locally before you push your work
  - `ci`: the check is intended to be run as part of the CI pipeline (e.g., format)
  - `release`: the check is intended to be run as a final step before releasing the package (e.g., checking if the package is installable)
  - if the `tags` field is left empty, the check will run all the time regardless of the value of the `--tag` argument. This is intended for quick checks that don't take long to run.

### Building blocks for checks

Many checks follow common patterns. Helper functions are available which can be used to create checks more easily. You can see them in action in the existing checks under `src/checks/`:
- `scriptCheck`: creates a check which runs the given CLI command `checkCommand` and passes or fails based on the exit code of the command. An optional `fixCommand` can also be specified which will be run in fix mode.
- `packageJsonCheck`: creates a check which can make assertions about the package.json file. This is intended to replace the package.json eslint rules we already have. Checks created with `packageJsonCheck` are passed the serialized package.json file. The check can make assertions about the serialized file. It can also mutate the serialized object; any material changes as a result of the mutation will cause the check to fail. If hasFix is set to true, the mutated package.json will be written to disk in fix mode.
- `workingTreeUnchangedCheck`: can wrap an existing check or a fix command. The check or fix command will be run in fix mode always, and any changes to the working tree as a result of running the check will cause the check to fail. After the check is run, any working tree changes will be reverted, unless the check was run in fix mode.

## Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.
