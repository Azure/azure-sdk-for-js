// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import {
  extractTypeNamesFromSignature,
  extractQualifiedMemberNames,
} from "../reachability.js";
import { filterNamespaceMembers } from "../dependencies.js";
import type { NamespaceInfo } from "../models.js";

describe("extractQualifiedMemberNames", () => {
  it("extracts member names from qualified references", () => {
    const names = extractQualifiedMemberNames("Array<Foo.Bar | Baz.Qux>");
    expect(names).toContain("Bar");
    expect(names).toContain("Qux");
  });

  it("extracts ALL_CAPS member names that extractTypeNamesFromSignature skips", () => {
    const sig = "Array<ChatKitResponseOutputText.File | ChatKitResponseOutputText.URL>";

    // extractTypeNamesFromSignature skips URL (ALL_CAPS)
    const typeNames = extractTypeNamesFromSignature(sig);
    expect(typeNames).toContain("ChatKitResponseOutputText");
    expect(typeNames).toContain("File");
    expect(typeNames).not.toContain("URL"); // filtered as ALL_CAPS

    // extractQualifiedMemberNames captures it
    const memberNames = extractQualifiedMemberNames(sig);
    expect(memberNames).toContain("File");
    expect(memberNames).toContain("URL");
  });

  it("handles deeply nested qualified names (A.B.C)", () => {
    const names = extractQualifiedMemberNames("Ns.Sub.Member");
    expect(names).toContain("Sub");
    expect(names).toContain("Member");
  });

  it("captures ALL_CAPS leaf in deep chain (Ns.Sub.URL)", () => {
    const names = extractQualifiedMemberNames("Array<Ns.Sub.URL>");
    expect(names).toContain("Sub");
    expect(names).toContain("URL");
  });

  it("does not match unqualified names", () => {
    const names = extractQualifiedMemberNames("string | number | MyType");
    expect(names.size).toBe(0);
  });

  it("ignores content inside string literals and comments", () => {
    const names = extractQualifiedMemberNames('"Foo.Bar" /* Baz.Qux */ Real.Member');
    expect(names).not.toContain("Bar");
    expect(names).not.toContain("Qux");
    expect(names).toContain("Member");
  });
});

describe("filterNamespaceMembers", () => {
  it("keeps referenced members and removes unreferenced ones", () => {
    const ns: NamespaceInfo = {
      name: "Conversations",
      interfaces: [
        { name: "Message", properties: [], methods: [] },
        { name: "Conversation", properties: [], methods: [] },
      ],
      types: [
        { name: "InputTextContent", type: "ResponseInputText" },
        { name: "OutputTextContent", type: "ResponseOutputText" },
        { name: "ConversationItem", type: "Message | FunctionCall" },
      ],
    };

    const refs = new Set(["Message", "Conversation", "ConversationItem"]);
    const result = filterNamespaceMembers(ns, refs);

    expect(result).not.toBeNull();
    expect(result!.interfaces).toHaveLength(2);
    expect(result!.types).toHaveLength(1);
    expect(result!.types![0].name).toBe("ConversationItem");
  });

  it("returns null for namespace with no reachable members", () => {
    const ns: NamespaceInfo = {
      name: "Dead",
      types: [
        { name: "Unused1", type: "string" },
        { name: "Unused2", type: "number" },
      ],
    };

    const refs = new Set(["SomethingElse"]);
    const result = filterNamespaceMembers(ns, refs);
    expect(result).toBeNull();
  });

  it("filters nested namespaces bottom-up", () => {
    const ns: NamespaceInfo = {
      name: "Parent",
      namespaces: [
        {
          name: "Child",
          interfaces: [
            { name: "KeepMe", properties: [], methods: [] },
            { name: "DropMe", properties: [], methods: [] },
          ],
        },
        {
          name: "EmptyChild",
          types: [{ name: "Orphan", type: "string" }],
        },
      ],
    };

    const refs = new Set(["KeepMe"]);
    const result = filterNamespaceMembers(ns, refs);

    expect(result).not.toBeNull();
    expect(result!.namespaces).toHaveLength(1);
    expect(result!.namespaces![0].name).toBe("Child");
    expect(result!.namespaces![0].interfaces).toHaveLength(1);
    expect(result!.namespaces![0].interfaces![0].name).toBe("KeepMe");
  });

  it("keeps parent namespace when any nested child survives", () => {
    const ns: NamespaceInfo = {
      name: "Outer",
      types: [{ name: "DeadAlias", type: "string" }],
      namespaces: [{
        name: "Inner",
        interfaces: [{ name: "Alive", properties: [], methods: [] }],
      }],
    };

    const refs = new Set(["Alive"]);
    const result = filterNamespaceMembers(ns, refs);

    expect(result).not.toBeNull();
    expect(result!.types).toBeUndefined(); // DeadAlias filtered
    expect(result!.namespaces).toHaveLength(1);
  });

  it("does not retain members just because namespace name matches (companion case)", () => {
    // When a namespace name like "Delta" happens to match a ref, but its
    // members (FunctionCall, ToolCall) are NOT in refs, they should be filtered.
    // The BFS phase (expandReachableFromNamespace) is responsible for adding
    // member names to refs for non-companion namespaces; filterNamespaceMembers
    // only checks per-member name presence.
    const ns: NamespaceInfo = {
      name: "Delta",
      interfaces: [
        { name: "FunctionCall", properties: [], methods: [] },
        { name: "ToolCall", properties: [], methods: [] },
      ],
    };

    // Only "Delta" in refs, not its members
    const refs = new Set(["Delta"]);
    const result = filterNamespaceMembers(ns, refs);
    // No members have their names in refs, so namespace is empty → null
    expect(result).toBeNull();
  });

  it("retains members whose names are individually in refs", () => {
    const ns: NamespaceInfo = {
      name: "Delta",
      interfaces: [
        { name: "FunctionCall", properties: [], methods: [] },
        { name: "ToolCall", properties: [], methods: [] },
      ],
    };

    // After BFS adds member names for non-companion namespaces
    const refs = new Set(["Delta", "FunctionCall", "ToolCall"]);
    const result = filterNamespaceMembers(ns, refs);
    expect(result).not.toBeNull();
    expect(result!.interfaces).toHaveLength(2);
  });

  it("filters classes, enums, and functions", () => {
    const ns: NamespaceInfo = {
      name: "Mixed",
      classes: [
        { name: "KeepClass", constructors: [], methods: [], properties: [] },
        { name: "DropClass", constructors: [], methods: [], properties: [] },
      ],
      enums: [
        { name: "KeepEnum", values: ["A"] },
        { name: "DropEnum", values: ["B"] },
      ],
      functions: [
        { name: "keepFn", sig: "(): void" },
        { name: "dropFn", sig: "(): void" },
      ],
    };

    const refs = new Set(["KeepClass", "KeepEnum", "keepFn"]);
    const result = filterNamespaceMembers(ns, refs);

    expect(result).not.toBeNull();
    expect(result!.classes).toHaveLength(1);
    expect(result!.classes![0].name).toBe("KeepClass");
    expect(result!.enums).toHaveLength(1);
    expect(result!.enums![0].name).toBe("KeepEnum");
    expect(result!.functions).toHaveLength(1);
    expect(result!.functions![0].name).toBe("keepFn");
  });
});
