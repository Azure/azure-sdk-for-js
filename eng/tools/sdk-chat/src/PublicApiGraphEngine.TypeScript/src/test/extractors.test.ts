// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import { Project, ts } from "ts-morph";
import { createExtractionContext } from "../type-refs.js";
import {
  extractClass,
  extractInterface,
  extractFunction,
  extractModule,
  extractNamespace,
  formatParameter,
  extractParameterInfo,
} from "../extractors.js";

function makeCtx() {
  const project = new Project({
    useInMemoryFileSystem: true,
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.NodeNext,
      moduleResolution: ts.ModuleResolutionKind.NodeNext,
      declaration: true,
      strict: true,
    },
  });
  return createExtractionContext(project);
}

describe("extractors", () => {
  // Issue 1: Constructor parameter properties
  describe("constructor parameter properties", () => {
    it("extracts public constructor parameter as property", () => {
      const ctx = makeCtx();
      const sf = ctx.project.createSourceFile(
        "test.ts",
        `export class Foo {
          constructor(public name: string) {}
        }`,
      );
      const cls = sf.getClassOrThrow("Foo");
      const info = extractClass(cls, ctx);
      expect(info.properties).toBeDefined();
      const nameProp = info.properties!.find((p) => p.name === "name");
      expect(nameProp).toBeDefined();
      expect(nameProp!.type).toBe("string");
    });

    it("extracts readonly constructor parameter as readonly property", () => {
      const ctx = makeCtx();
      const sf = ctx.project.createSourceFile(
        "test.ts",
        `export class Bar {
          constructor(readonly id: number) {}
        }`,
      );
      const cls = sf.getClassOrThrow("Bar");
      const info = extractClass(cls, ctx);
      const idProp = info.properties!.find((p) => p.name === "id");
      expect(idProp).toBeDefined();
      expect(idProp!.readonly).toBe(true);
      expect(idProp!.type).toBe("number");
    });

    it("does not extract private/protected constructor parameters as properties", () => {
      const ctx = makeCtx();
      const sf = ctx.project.createSourceFile(
        "test.ts",
        `export class Baz {
          constructor(
            private secret: string,
            protected internal: number,
            public visible: boolean
          ) {}
        }`,
      );
      const cls = sf.getClassOrThrow("Baz");
      const info = extractClass(cls, ctx);
      const names = (info.properties ?? []).map((p) => p.name);
      expect(names).toContain("visible");
      expect(names).not.toContain("secret");
      expect(names).not.toContain("internal");
    });

    it("does not extract plain constructor parameters (no modifier) as properties", () => {
      const ctx = makeCtx();
      const sf = ctx.project.createSourceFile(
        "test.ts",
        `export class Plain {
          constructor(x: string) {}
        }`,
      );
      const cls = sf.getClassOrThrow("Plain");
      const info = extractClass(cls, ctx);
      const names = (info.properties ?? []).map((p) => p.name);
      expect(names).not.toContain("x");
    });
  });

  // Issue 2: Declaration merging
  describe("declaration merging", () => {
    it("merges two interface declarations into one", () => {
      const ctx = makeCtx();
      const sf = ctx.project.createSourceFile(
        "test.ts",
        `export interface Foo {
          a: string;
        }
        export interface Foo {
          b: number;
        }`,
      );
      const mod = extractModule(sf, "test", ctx);
      expect(mod).not.toBeNull();
      expect(mod!.interfaces).toHaveLength(1);
      const merged = mod!.interfaces![0];
      expect(merged.name).toBe("Foo");
      const propNames = (merged.properties ?? []).map((p) => p.name);
      expect(propNames).toContain("a");
      expect(propNames).toContain("b");
    });

    it("merges interface extends arrays and deduplicates", () => {
      const ctx = makeCtx();
      const sf = ctx.project.createSourceFile(
        "test.ts",
        `interface Base1 { x: number }
        interface Base2 { y: string }
        export interface Merged extends Base1 {
          a: string;
        }
        export interface Merged extends Base2 {
          b: number;
        }`,
      );
      const mod = extractModule(sf, "test", ctx);
      const merged = mod!.interfaces![0];
      expect(merged.extends).toContain("Base1");
      expect(merged.extends).toContain("Base2");
    });
  });

  // Issue 3: Call/construct signatures
  describe("call and construct signatures", () => {
    it("extracts call signatures from interface", () => {
      const ctx = makeCtx();
      const sf = ctx.project.createSourceFile(
        "test.ts",
        `export interface Callable {
          (x: string): number;
          (x: number): string;
        }`,
      );
      const iface = sf.getInterfaceOrThrow("Callable");
      const info = extractInterface(iface, ctx);
      expect(info.callSignatures).toBeDefined();
      expect(info.callSignatures).toHaveLength(2);
      expect(info.callSignatures![0].sig).toContain("x: string");
      expect(info.callSignatures![0].ret).toBe("number");
      expect(info.callSignatures![1].ret).toBe("string");
    });

    it("extracts construct signatures from interface", () => {
      const ctx = makeCtx();
      const sf = ctx.project.createSourceFile(
        "test.ts",
        `export interface Newable {
          new(name: string): Newable;
        }`,
      );
      const iface = sf.getInterfaceOrThrow("Newable");
      const info = extractInterface(iface, ctx);
      expect(info.constructSignatures).toBeDefined();
      expect(info.constructSignatures).toHaveLength(1);
      expect(info.constructSignatures![0].sig).toContain("name: string");
      expect(info.constructSignatures![0].ret).toBe("Newable");
    });

    it("extracts call signature with type parameters", () => {
      const ctx = makeCtx();
      const sf = ctx.project.createSourceFile(
        "test.ts",
        `export interface GenericCallable {
          <T>(x: T): T;
        }`,
      );
      const iface = sf.getInterfaceOrThrow("GenericCallable");
      const info = extractInterface(iface, ctx);
      expect(info.callSignatures).toHaveLength(1);
      expect(info.callSignatures![0].typeParams).toBe("T");
    });
  });

  // Issue 4: Rest parameters
  describe("rest parameters", () => {
    it("prepends ... to rest parameter in formatParameter", () => {
      const ctx = makeCtx();
      const sf = ctx.project.createSourceFile(
        "test.ts",
        `export function foo(...args: string[]): void {}`,
      );
      const fn = sf.getFunctionOrThrow("foo");
      const param = fn.getParameters()[0];
      const formatted = formatParameter(param, ctx);
      expect(formatted).toMatch(/^\.\.\.args/);
    });

    it("sets rest: true on ParameterInfo for rest parameters", () => {
      const ctx = makeCtx();
      const sf = ctx.project.createSourceFile(
        "test.ts",
        `export function bar(...items: number[]): void {}`,
      );
      const fn = sf.getFunctionOrThrow("bar");
      const param = fn.getParameters()[0];
      const info = extractParameterInfo(param, ctx.namespaceAliases);
      expect(info.rest).toBe(true);
      expect(info.name).toBe("items");
    });

    it("extracts function with rest parameter correctly", () => {
      const ctx = makeCtx();
      const sf = ctx.project.createSourceFile(
        "test.ts",
        `export function spread(a: string, ...rest: number[]): void {}`,
      );
      const fn = sf.getFunctionOrThrow("spread");
      const info = extractFunction(fn, ctx);
      expect(info).toBeDefined();
      expect(info!.sig).toContain("...rest");
      expect(info!.params![1].rest).toBe(true);
    });
  });

  // Issue 5: Abstract class and method
  describe("abstract class and method", () => {
    it("sets abstract flag on abstract class", () => {
      const ctx = makeCtx();
      const sf = ctx.project.createSourceFile(
        "test.ts",
        `export abstract class Base {
          abstract doSomething(): void;
          concrete(): void {}
        }`,
      );
      const cls = sf.getClassOrThrow("Base");
      const info = extractClass(cls, ctx);
      expect(info.abstract).toBe(true);
    });

    it("sets abstract flag on abstract methods", () => {
      const ctx = makeCtx();
      const sf = ctx.project.createSourceFile(
        "test.ts",
        `export abstract class Base {
          abstract doSomething(): void;
          concrete(): void {}
        }`,
      );
      const cls = sf.getClassOrThrow("Base");
      const info = extractClass(cls, ctx);
      const abstractMethod = info.methods!.find((m) => m.name === "doSomething");
      const concreteMethod = info.methods!.find((m) => m.name === "concrete");
      expect(abstractMethod!.abstract).toBe(true);
      expect(concreteMethod!.abstract).toBeUndefined();
    });

    it("does not set abstract on non-abstract class", () => {
      const ctx = makeCtx();
      const sf = ctx.project.createSourceFile(
        "test.ts",
        `export class Concrete {
          doSomething(): void {}
        }`,
      );
      const cls = sf.getClassOrThrow("Concrete");
      const info = extractClass(cls, ctx);
      expect(info.abstract).toBeUndefined();
    });
  });

  // Issue 6: Static property flag
  describe("static property flag", () => {
    it("sets static flag on static properties", () => {
      const ctx = makeCtx();
      const sf = ctx.project.createSourceFile(
        "test.ts",
        `export class Config {
          static defaultTimeout: number;
          instanceProp: string;
        }`,
      );
      const cls = sf.getClassOrThrow("Config");
      const info = extractClass(cls, ctx);
      const staticProp = info.properties!.find((p) => p.name === "defaultTimeout");
      const instanceProp = info.properties!.find((p) => p.name === "instanceProp");
      expect(staticProp!.static).toBe(true);
      expect(instanceProp!.static).toBeUndefined();
    });
  });

  // Issue 7: Optional callable properties stay as PropertyInfo
  describe("optional callable properties", () => {
    it("keeps optional function-typed property as PropertyInfo", () => {
      const ctx = makeCtx();
      const sf = ctx.project.createSourceFile(
        "test.ts",
        `export interface Options {
          onError?: (err: Error) => void;
          required(x: string): void;
        }`,
      );
      const iface = sf.getInterfaceOrThrow("Options");
      const info = extractInterface(iface, ctx);

      // onError should be in properties (not methods) because it's optional
      const onErrorProp = (info.properties ?? []).find((p) => p.name === "onError");
      expect(onErrorProp).toBeDefined();
      expect(onErrorProp!.optional).toBe(true);

      // required should be in methods
      const requiredMethod = (info.methods ?? []).find((m) => m.name === "required");
      expect(requiredMethod).toBeDefined();
    });

    it("keeps readonly function-typed property as PropertyInfo", () => {
      const ctx = makeCtx();
      const sf = ctx.project.createSourceFile(
        "test.ts",
        `export interface Handler {
          readonly callback: (data: string) => void;
        }`,
      );
      const iface = sf.getInterfaceOrThrow("Handler");
      const info = extractInterface(iface, ctx);

      const callbackProp = (info.properties ?? []).find((p) => p.name === "callback");
      expect(callbackProp).toBeDefined();
      expect(callbackProp!.readonly).toBe(true);
    });

    it("converts required non-readonly function-typed property to MethodInfo", () => {
      const ctx = makeCtx();
      const sf = ctx.project.createSourceFile(
        "test.ts",
        `export interface Worker {
          process: (input: string) => string;
        }`,
      );
      const iface = sf.getInterfaceOrThrow("Worker");
      const info = extractInterface(iface, ctx);

      // process should be in methods (required, not readonly)
      const processMethod = (info.methods ?? []).find((m) => m.name === "process");
      expect(processMethod).toBeDefined();
    });

    it("extracts type parameters from generic callable property", () => {
      const ctx = makeCtx();
      const sf = ctx.project.createSourceFile(
        "test.ts",
        `
        export interface Foo { value: string }
        export interface Bar<T> { data: T }
        export interface Handler {
          handler: <T extends Foo>(x: T) => Bar<T>;
        }`,
      );
      const iface = sf.getInterfaceOrThrow("Handler");
      const info = extractInterface(iface, ctx);

      const handlerMethod = (info.methods ?? []).find((m) => m.name === "handler");
      expect(handlerMethod).toBeDefined();
      expect(handlerMethod!.typeParams).toBe("T extends Foo");
      expect(handlerMethod!.declaredTypeParamNames).toEqual(["T"]);
    });
  });

  // Issue 8: Function return-type ref tracking
  describe("function return-type ref tracking", () => {
    it("collects return type refs from function type node", () => {
      const ctx = makeCtx();
      const sf = ctx.project.createSourceFile(
        "test.ts",
        `
        export interface MyResult { value: string }
        export function getData(): MyResult { return { value: "" }; }
        `,
      );
      const fn = sf.getFunctionOrThrow("getData");
      const info = extractFunction(fn, ctx);
      expect(info).toBeDefined();
      expect(info!.ret).toBe("MyResult");
      // Verify the function sig is extracted properly — the return type node
      // collection ensures MyResult is tracked for dependency resolution.
      // We verify this indirectly: extractFunction completes without error
      // and produces the correct return type string.
    });

    it("extracts function with type alias return type", () => {
      const ctx = makeCtx();
      const sf = ctx.project.createSourceFile(
        "test.ts",
        `
        export type MyAlias = { x: number };
        export function getAlias(): MyAlias { return { x: 1 }; }
        `,
      );
      const fn = sf.getFunctionOrThrow("getAlias");
      const info = extractFunction(fn, ctx);
      expect(info).toBeDefined();
      expect(info!.ret).toBe("MyAlias");
    });
  });
});
