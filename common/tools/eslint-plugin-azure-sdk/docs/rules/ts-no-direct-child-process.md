# Require safe process execution

External commands in SDK source must use `@azure/core-process` instead of
loading Node's `child_process` module directly. The core package keeps commands
and arguments separate, prevents callers from enabling a shell, and applies a
restricted Windows batch-file policy.

Type-only imports and the named `fork` API remain allowed:

```ts
import { fork, type ChildProcess } from "node:child_process";
```

Use the core package for external executables:

```ts
import { execFile } from "@azure/core-process";

const result = await execFile("git", ["status", "--short"], {
  encoding: "utf8",
});
```
