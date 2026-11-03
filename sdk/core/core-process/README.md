# Azure Core Process client library for JavaScript

`@azure/core-process` provides Node.js process-launching primitives that avoid
ambient shell parsing. It is intended for Azure SDK packages and tools that
need to invoke external executables on Windows, macOS, or Linux.

## Getting started

### Install the package

```bash
npm install @azure/core-process
```

### Prerequisites

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

## Key concepts

Commands and arguments are always supplied separately. The package does not
provide a command-string API and does not allow callers to enable a shell.

```ts snippet:ReadmeSampleRunExecutable
import { execFile } from "@azure/core-process";

const { stdout } = await execFile("git", ["rev-parse", "--show-toplevel"]);
console.log(stdout);
```

On Windows, native `.exe` and `.com` files are preferred. Batch files are
disabled by default because arbitrary arguments cannot be transported safely
through every `.cmd` or `.bat` wrapper. A caller that expects a batch shim can
opt into the restricted batch path:

```ts snippet:ReadmeSampleRunWindowsBatchFile
import { execFile } from "@azure/core-process";

const { stdout } = await execFile("npm", ["--version"], {
  allowWindowsBatchFiles: true,
});
console.log(stdout);
```

The restricted batch path rejects command operators, variable expansion,
newlines, and other values that cannot be proven safe before `cmd.exe` starts.
If an application needs to pass those values, it must invoke a native
executable or interpreter entry point directly.

## Security boundary

This package prevents command-line data from being interpreted by an ambient
operating-system shell. It does not establish that an executable found on
`PATH` is trustworthy, sanitize code intentionally passed to an interpreter,
or prevent command-specific option injection.

Do not place secrets in command-line arguments. Process arguments may be
visible to other local processes and operating-system diagnostics.

## Troubleshooting

An unsafe Windows batch argument fails with a `ProcessError` before the child
process is created. Prefer a native executable when the argument cannot be
changed.

## Contributing

See the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md).
