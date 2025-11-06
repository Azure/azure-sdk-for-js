# 🧩 Copilot Instructions — LRO Compat Subexport Automation

**Purpose:**
Automatically generate runtime compat support for legacy `beginXxx` and `beginXxxAndWait` methods in Azure SDK packages, using shared helpers from `@azure/core-lro/compat`.

---

## 🧠 High-level goals

1. Discover all **LRO operations** in the package automatically (no TODOs).
2. Create:
   - `src/compat/lro-metadata.ts`
   - `src/compat/lro.ts`
   - `src/compat/lro.d.ts`
   - `test/compat-lro.test.ts`

3. Update `package.json` to export the subpath `./compat`.
4. Validate shims with **Vitest**.
5. Track all progress with `manage_todo_list`.
6. Prefix every Copilot response with the emoji **🧩**.

---

## ⚙️ Setup rules

- Use the **`manage_todo_list`** tool to track progress across tasks.
- Start **every response** with the emoji **🧩** for visual feedback.
- The monorepo uses **PNPM**.
- Shared helpers come from:

  ```ts
  import { wrapOperationGroupFactory, applyClientLroCompat } from "@azure/core-lro/compat";
  ```

- Do not re-implement runtime logic locally.

---

## ✅ Step 1 – Create TODO list

Use `manage_todo_list` to create this checklist:

1. Scan the package source to **discover all LRO operations**.
2. Generate `src/compat/lro-metadata.ts` (complete LRO list).
3. Generate `src/compat/lro.ts` (uses shared helpers).
4. Generate `src/compat/lro.d.ts` (module augmentation for all discovered LROs).
5. Update `package.json` to export `./compat`.
6. Add Vitest tests `test/compat-lro.spec.ts` (use .spec.ts extension).
7. Ensure PNPM test command works and document it.

Mark each item complete as you go.

---

## 🔍 Step 2 – Discover all LRO operations

Copilot must inspect the package source and automatically find every **LRO** method:

**Detection rules:**

1. **Find the main client class** (e.g., `AzureVMwareSolutionAPI`) and examine its constructor to identify operation group factory functions (e.g., `_getPrivateCloudsOperations`).
2. **Check operation group interfaces** in `src/classic/*/index.ts` files for methods that return `PollerLike<OperationState<T>, T>`.
3. **Mark a method as LRO if:**
   - It returns `PollerLike<OperationState<void>, void>` (for delete operations)
   - It returns `PollerLike<OperationState<SomeType>, SomeType>` (for create/update operations)
   - The interface imports `PollerLike, OperationState` from `@azure/core-lro`
4. **Use grep search** with pattern `PollerLike.*OperationState` to find all LRO operations efficiently.

5. Add root-level entries if the client class itself (`AzureVMwareSolutionAPI`) exposes LRO methods.
6. Include **all** detected LROs — no `TODO`s or omissions.

Example structure to produce (using real discoveries per package):

```ts
export const lroCompatMap: { path: string[]; method: string }[] = [
  { path: ["privateClouds"], method: "createOrUpdate" },
  { path: ["privateClouds"], method: "delete" },
  { path: ["clusters"], method: "createOrUpdate" },
  { path: ["clusters"], method: "delete" },
  { path: ["virtualMachines"], method: "createOrUpdate" },
];
```

Mark TODO 1 & 2 as complete when this list is final.

---

## 🧩 Step 3 – Generate `src/compat/lro.ts`

```ts
// src/compat/lro.ts
import { lroCompatMap } from "./lro-metadata.js";
import { wrapOperationGroupFactory, applyClientLroCompat } from "@azure/core-lro/compat";

import {
  _getPrivateCloudsOperations as originalPrivateClouds,
  _getClustersOperations as originalClusters,
  _getVirtualMachinesOperations as originalVMs,
  // ... add all operation groups from this package
} from "../classic/privateClouds/index.js"; // Import from individual classic/* directories
// Note: Check the main client constructor to find the actual factory import patterns

// Wrap all factories
export const _getPrivateCloudsOperations = wrapOperationGroupFactory(
  originalPrivateClouds,
  "privateClouds",
  lroCompatMap,
);

export const _getClustersOperations = wrapOperationGroupFactory(
  originalClusters,
  "clusters",
  lroCompatMap,
);

export const _getVirtualMachinesOperations = wrapOperationGroupFactory(
  originalVMs,
  "virtualMachines",
  lroCompatMap,
);

// Apply for root-level LROs if any exist
export function applyLroCompatToClient(client: any) {
  applyClientLroCompat(client, lroCompatMap);
}
```

Mark TODO 3 as complete.

---

## 🧩 Step 4 – Generate `src/compat/lro.d.ts`

Augment all operation-group types that include LROs. Example:

```ts
// src/compat/lro.d.ts
import {
  AzureVMwareSolutionAPI,
  PrivateCloudsOperations,
  ClustersOperations,
  VirtualMachinesOperations,
} from "../index";

declare module "../index" {
  interface PrivateCloudsOperations {
    beginCreateOrUpdate(
      ...args: Parameters<PrivateCloudsOperations["createOrUpdate"]>
    ): ReturnType<PrivateCloudsOperations["createOrUpdate"]>;
    beginCreateOrUpdateAndWait(
      ...args: Parameters<PrivateCloudsOperations["createOrUpdate"]>
    ): Promise<Awaited<ReturnType<PrivateCloudsOperations["createOrUpdate"]>>>;
    beginDelete(
      ...args: Parameters<PrivateCloudsOperations["delete"]>
    ): ReturnType<PrivateCloudsOperations["delete"]>;
    beginDeleteAndWait(
      ...args: Parameters<PrivateCloudsOperations["delete"]>
    ): Promise<Awaited<ReturnType<PrivateCloudsOperations["delete"]>>>;
  }

  interface ClustersOperations {
    beginCreateOrUpdate(
      ...args: Parameters<ClustersOperations["createOrUpdate"]>
    ): ReturnType<ClustersOperations["createOrUpdate"]>;
    beginCreateOrUpdateAndWait(
      ...args: Parameters<ClustersOperations["createOrUpdate"]>
    ): Promise<Awaited<ReturnType<ClustersOperations["createOrUpdate"]>>>;
  }

  interface VirtualMachinesOperations {
    beginCreateOrUpdate(
      ...args: Parameters<VirtualMachinesOperations["createOrUpdate"]>
    ): ReturnType<VirtualMachinesOperations["createOrUpdate"]>;
    beginCreateOrUpdateAndWait(
      ...args: Parameters<VirtualMachinesOperations["createOrUpdate"]>
    ): Promise<Awaited<ReturnType<VirtualMachinesOperations["createOrUpdate"]>>>;
  }
}
```

Mark TODO 4 as complete.

---

## 🧩 Step 5 – Update `package.json` export

### Under `tshy.exports`

Add:

```json
"./compat": "./src/compat/lro.ts"
```

✅ with:

```json
"./compat": "./src/compat/lro.ts"
```

### Under top-level `"exports"`

Replace the previous compat path with this:

```json
"./compat": {
  "browser": {
    "types": "./dist/browser/compat/lro.d.ts",
    "default": "./dist/browser/compat/lro.js"
  },
  "react-native": {
    "types": "./dist/react-native/compat/lro.d.ts",
    "default": "./dist/react-native/compat/lro.js"
  },
  "import": {
    "types": "./dist/esm/compat/lro.d.ts",
    "default": "./dist/esm/compat/lro.js"
  },
  "require": {
    "types": "./dist/commonjs/compat/lro.d.ts",
    "default": "./dist/commonjs/compat/lro.js"
  }
}
```

a
This ensures users import it cleanly:

```ts
import "@azure/arm-avs/compat";
```

Mark TODO 5 as complete.

---

## 🧩 Step 6 – Add Vitest tests

Create `test/compat-lro.spec.ts` (note: use .spec.ts extension to match project conventions):

```ts
import { describe, it, expect, vi } from "vitest";
import { applyLroCompatToClient } from "../src/compat/lro";
import { lroCompatMap } from "../src/compat/lro-metadata";

describe("LRO compat", () => {
  it("adds beginXxx and beginXxxAndWait for all LROs", async () => {
    const client: any = {};
    for (const entry of lroCompatMap) {
      if (entry.path.length === 0) {
        client[entry.method] = vi.fn().mockResolvedValue("ok");
      } else {
        const group = (client[entry.path[0]] ??= {});
        group[entry.method] = vi.fn().mockResolvedValue("ok");
      }
    }

    applyLroCompatToClient(client);

    for (const entry of lroCompatMap) {
      const target = entry.path.length === 0 ? client : client[entry.path[0]];
      const base = entry.method;
      const begin = "begin" + base[0].toUpperCase() + base.slice(1);
      const beginAndWait = begin + "AndWait";

      expect(typeof target[begin]).toBe("function");
      expect(typeof target[beginAndWait]).toBe("function");

      await target[beginAndWait]("a", "b");
      expect(target[base]).toHaveBeenCalledWith("a", "b");
    }
  });

  it("is idempotent", () => {
    const client: any = {
      privateClouds: { createOrUpdate: vi.fn() },
    };
    applyLroCompatToClient(client);
    applyLroCompatToClient(client);
    expect(typeof client.privateClouds.beginCreateOrUpdate).toBe("function");
  });
});
```

Mark TODO 6 as complete.

---

## 🧩 Step 7 – PNPM integration

Document the correct test command for the package:

```bash
pnpm -F @azure/arm-avs test
```

or

```bash
pnpm test --filter @azure/arm-avs
```

Mark TODO 7 as complete.

---

## 🧩 Step 8 – Verification checklist

After build:

- ✅ `dist/compat/lro.js` and `.d.ts` exist
- ✅ `package.json` exports `./compat` correctly
- ✅ `vitest` passes
- ✅ Users can `import "@azure/<pkg>/compat"` with no TS errors

---

## 🧩 Visual Feedback Rule

Every Copilot response while running these steps must **start with 🧩**.
This is your signal that Copilot is executing under this instruction set.

Example:

```
🧩 Discovered 12 LRO operations in @azure/arm-avs and generated lro-metadata.ts.
```

---

**End of Instruction Document.**
