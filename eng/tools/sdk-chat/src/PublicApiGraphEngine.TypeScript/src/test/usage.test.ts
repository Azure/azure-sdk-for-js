// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import { Project, ts } from "ts-morph";
import {
  buildVarTypeMap,
  getCanonicalTypeName,
  unwrapPromiseType,
} from "../usage.js";

function makeProject() {
  return new Project({
    useInMemoryFileSystem: true,
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      strict: true,
      lib: ["lib.es2022.d.ts"],
    },
  });
}

describe("getCanonicalTypeName", () => {
  it("returns class name for a simple class type", () => {
    const project = makeProject();
    const sf = project.createSourceFile(
      "test.ts",
      `
      class FooClient { doStuff(): void {} }
      const client = new FooClient();
      `,
    );
    const decl = sf.getVariableDeclarationOrThrow("client");
    const type = decl.getType();
    expect(getCanonicalTypeName(type)).toBe("FooClient");
  });

  it("unwraps Promise<T> and returns the inner type", () => {
    const project = makeProject();
    const sf = project.createSourceFile(
      "test.ts",
      `
      class BlobClient { download(): void {} }
      async function getClient(): Promise<BlobClient> { return new BlobClient(); }
      const p = getClient();
      `,
    );
    const decl = sf.getVariableDeclarationOrThrow("p");
    const type = decl.getType();
    expect(getCanonicalTypeName(type)).toBe("BlobClient");
  });

  it("returns undefined for primitive types", () => {
    const project = makeProject();
    const sf = project.createSourceFile("test.ts", `const x = 42;`);
    const decl = sf.getVariableDeclarationOrThrow("x");
    const type = decl.getType();
    expect(getCanonicalTypeName(type)).toBeUndefined();
  });
});

describe("unwrapPromiseType", () => {
  it("unwraps Promise<T>", () => {
    const project = makeProject();
    const sf = project.createSourceFile(
      "test.ts",
      `
      class Foo {}
      const p: Promise<Foo> = null!;
      `,
    );
    const decl = sf.getVariableDeclarationOrThrow("p");
    const type = decl.getType();
    const unwrapped = unwrapPromiseType(type);
    expect(unwrapped.getSymbol()?.getName()).toBe("Foo");
  });

  it("returns the same type for non-Promise types", () => {
    const project = makeProject();
    const sf = project.createSourceFile(
      "test.ts",
      `
      class Foo {}
      const x = new Foo();
      `,
    );
    const decl = sf.getVariableDeclarationOrThrow("x");
    const type = decl.getType();
    const unwrapped = unwrapPromiseType(type);
    expect(unwrapped.getSymbol()?.getName()).toBe("Foo");
  });
});

describe("buildVarTypeMap", () => {
  it("tracks simple variable from new expression", () => {
    const project = makeProject();
    const sf = project.createSourceFile(
      "test.ts",
      `
      class FooClient { doStuff(): void {} }
      const client = new FooClient();
      `,
    );
    const varTypes = buildVarTypeMap(sf);
    expect(varTypes.get("client")).toBe("FooClient");
  });

  it("tracks variable with type annotation", () => {
    const project = makeProject();
    const sf = project.createSourceFile(
      "test.ts",
      `
      class FooClient { doStuff(): void {} }
      const client: FooClient = null!;
      `,
    );
    const varTypes = buildVarTypeMap(sf);
    expect(varTypes.get("client")).toBe("FooClient");
  });

  it("tracks chained call return types", () => {
    const project = makeProject();
    const sf = project.createSourceFile(
      "test.ts",
      `
      class SubClient { doWork(): void {} }
      class MainClient {
        getSubClient(): SubClient { return new SubClient(); }
      }
      const main = new MainClient();
      const sub = main.getSubClient();
      `,
    );
    const varTypes = buildVarTypeMap(sf);
    expect(varTypes.get("main")).toBe("MainClient");
    expect(varTypes.get("sub")).toBe("SubClient");
  });

  it("tracks async/await unwrapping", () => {
    const project = makeProject();
    const sf = project.createSourceFile(
      "test.ts",
      `
      class MyClient { doStuff(): void {} }
      async function createClient(): Promise<MyClient> { return new MyClient(); }
      async function main() {
        const client = await createClient();
      }
      `,
    );
    const varTypes = buildVarTypeMap(sf);
    expect(varTypes.get("client")).toBe("MyClient");
  });

  it("tracks callback parameter types", () => {
    const project = makeProject();
    const sf = project.createSourceFile(
      "test.ts",
      `
      class Item { getName(): string { return ""; } }
      function process(items: Item[], cb: (item: Item) => void): void {}
      process([], (item) => { item.getName(); });
      `,
    );
    const varTypes = buildVarTypeMap(sf);
    expect(varTypes.get("item")).toBe("Item");
  });

  it("tracks reassigned variables", () => {
    const project = makeProject();
    const sf = project.createSourceFile(
      "test.ts",
      `
      class FooClient { doStuff(): void {} }
      let x: FooClient = new FooClient();
      `,
    );
    const varTypes = buildVarTypeMap(sf);
    expect(varTypes.get("x")).toBe("FooClient");
  });

  it("tracks import aliases (renamed imports)", () => {
    const project = makeProject();
    // Simulate an aliased import by creating the source and a declaration file
    project.createSourceFile(
      "node_modules/pkg/index.d.ts",
      `export class FooClient { doStuff(): void; }`,
    );
    const sf = project.createSourceFile(
      "test.ts",
      `
      import { FooClient as Bar } from "pkg";
      const client = new Bar();
      `,
    );
    const varTypes = buildVarTypeMap(sf);
    expect(varTypes.get("client")).toBe("FooClient");
  });

  it("tracks class property declarations", () => {
    const project = makeProject();
    const sf = project.createSourceFile(
      "test.ts",
      `
      class FooClient { doStuff(): void {} }
      class Wrapper {
        client: FooClient = new FooClient();
      }
      `,
    );
    const varTypes = buildVarTypeMap(sf);
    expect(varTypes.get("client")).toBe("FooClient");
  });

  it("tracks destructured properties through checker", () => {
    const project = makeProject();
    const sf = project.createSourceFile(
      "test.ts",
      `
      class SubClient { run(): void {} }
      class Container { sub: SubClient = new SubClient(); }
      const container = new Container();
      const { sub } = container;
      `,
    );
    const varTypes = buildVarTypeMap(sf);
    expect(varTypes.get("sub")).toBe("SubClient");
  });

  it("tracks as-assertion types", () => {
    const project = makeProject();
    const sf = project.createSourceFile(
      "test.ts",
      `
      class FooClient { doStuff(): void {} }
      const client = {} as FooClient;
      `,
    );
    const varTypes = buildVarTypeMap(sf);
    expect(varTypes.get("client")).toBe("FooClient");
  });

  it("tracks parameter declarations", () => {
    const project = makeProject();
    const sf = project.createSourceFile(
      "test.ts",
      `
      class FooClient { doStuff(): void {} }
      function process(client: FooClient) {}
      `,
    );
    const varTypes = buildVarTypeMap(sf);
    expect(varTypes.get("client")).toBe("FooClient");
  });
});
