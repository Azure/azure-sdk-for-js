// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import ts from "typescript";
import {
  createAnalyzer,
  findImportSymbolByName,
} from "../../../src/util/samples/compiler/bindingAnalyzer.js";

describe("bindingAnalyzer", () => {
  describe("createAnalyzer", () => {
    it("creates an analyzer for a simple file", () => {
      const source = `import { Foo } from "bar";\nconst x = Foo;\n`;
      const analyzer = createAnalyzer(source, "test.ts");
      expect(analyzer.checker).toBeDefined();
      expect(analyzer.sourceFile).toBeDefined();
      expect(analyzer.sourceFile.statements.length).toBe(2);
    });
  });

  describe("getSymbol", () => {
    it("resolves import binding symbols", () => {
      const source = `import { Recorder } from "test-recorder";\n`;
      const analyzer = createAnalyzer(source, "test.ts");
      const importDecl = analyzer.sourceFile.statements[0] as ts.ImportDeclaration;
      const clause = importDecl.importClause!;
      const namedBindings = clause.namedBindings as ts.NamedImports;
      const specName = namedBindings.elements[0].name;
      const sym = analyzer.getSymbol(specName);
      expect(sym).toBeDefined();
      expect(sym!.name).toBe("Recorder");
    });

    it("returns undefined for unresolved globals like console", () => {
      const source = `console.log("hello");\n`;
      const analyzer = createAnalyzer(source, "test.ts");
      // Find the console identifier
      const exprStmt = analyzer.sourceFile.statements[0] as ts.ExpressionStatement;
      // Walk to find 'console'
      let consoleId: ts.Identifier | undefined;
      function walk(n: ts.Node) {
        if (ts.isIdentifier(n) && n.text === "console") consoleId = n;
        ts.forEachChild(n, walk);
      }
      walk(exprStmt);
      expect(consoleId).toBeDefined();
      const sym = analyzer.getSymbol(consoleId!);
      expect(sym).toBeUndefined();
    });

    it("resolves local variable symbols", () => {
      const source = `const x = 42;\nconsole.log(x);\n`;
      const analyzer = createAnalyzer(source, "test.ts");
      // Find the reference to x in the console.log call
      let xRef: ts.Identifier | undefined;
      const stmt2 = analyzer.sourceFile.statements[1];
      function walk(n: ts.Node) {
        if (ts.isIdentifier(n) && n.text === "x" && !ts.isVariableDeclaration(n.parent)) {
          xRef = n;
        }
        ts.forEachChild(n, walk);
      }
      walk(stmt2);
      expect(xRef).toBeDefined();
      const sym = analyzer.getSymbol(xRef!);
      expect(sym).toBeDefined();
      expect(sym!.name).toBe("x");
    });
  });

  describe("getReferencedSymbols", () => {
    it("collects symbols referenced by a statement", () => {
      const source = `import { Foo } from "pkg";\nconst x = new Foo();\n`;
      const analyzer = createAnalyzer(source, "test.ts");
      const varStmt = analyzer.sourceFile.statements[1];
      const refs = analyzer.getReferencedSymbols(varStmt);
      // Should reference Foo but not x (x is declared, not referenced)
      const refNames = [...refs].map((s) => s.name);
      expect(refNames).toContain("Foo");
      expect(refNames).not.toContain("x");
    });

    it("does not collect property names from property access", () => {
      const source = `import { client } from "pkg";\nclient.getProperties();\n`;
      const analyzer = createAnalyzer(source, "test.ts");
      const exprStmt = analyzer.sourceFile.statements[1];
      const refs = analyzer.getReferencedSymbols(exprStmt);
      const refNames = [...refs].map((s) => s.name);
      expect(refNames).toContain("client");
      // getProperties is a property access name, not a binding ref
      expect(refNames).not.toContain("getProperties");
    });

    it("excludes function parameters from module-scope references", () => {
      const source = `
import { Recorder } from "test-recorder";
function setup(ctx: any): Recorder {
  return new Recorder(ctx);
}
`;
      const analyzer = createAnalyzer(source, "test.ts");
      const fnDecl = analyzer.sourceFile.statements[1] as ts.FunctionDeclaration;
      const refs = analyzer.getReferencedSymbols(fnDecl);
      const refNames = [...refs].map((s) => s.name);
      // Recorder is an import ref, but ctx is a parameter (locally declared)
      expect(refNames).toContain("Recorder");
      expect(refNames).not.toContain("ctx");
    });

    it("distinguishes shadowed names from import bindings", () => {
      // Module-scope const redeclaration is a TS error, not a shadow.
      // The realistic case is function-local shadowing:
      const source = `
import { Recorder } from "test-recorder";
function setup() {
  const Recorder = "local shadow";
  console.log(Recorder);
}
`;
      const analyzer = createAnalyzer(source, "test.ts");
      const importSym = findImportSymbolByName(analyzer, "Recorder")!;
      expect(importSym).toBeDefined();

      // The function's body references the local const, not the import
      const fnDecl = analyzer.sourceFile.statements[1] as ts.FunctionDeclaration;
      const refs = analyzer.getReferencedSymbols(fnDecl);
      expect(refs.has(importSym)).toBe(false);
    });

    it("does not collect unresolved globals as referenced symbols", () => {
      const source = `console.log(process.env.FOO);\n`;
      const analyzer = createAnalyzer(source, "test.ts");
      const stmt = analyzer.sourceFile.statements[0];
      const refs = analyzer.getReferencedSymbols(stmt);
      // console and process are unresolved globals — not in our source file
      expect(refs.size).toBe(0);
    });
  });

  describe("getDeclaredSymbols", () => {
    it("returns variable symbols for variable statements", () => {
      const source = `const x = 1, y = 2;\n`;
      const analyzer = createAnalyzer(source, "test.ts");
      const stmt = analyzer.sourceFile.statements[0];
      const declared = analyzer.getDeclaredSymbols(stmt);
      const names = declared.map((s) => s.name);
      expect(names).toEqual(["x", "y"]);
    });

    it("returns function name symbol", () => {
      const source = `function foo() {}\n`;
      const analyzer = createAnalyzer(source, "test.ts");
      const stmt = analyzer.sourceFile.statements[0];
      const declared = analyzer.getDeclaredSymbols(stmt);
      expect(declared.length).toBe(1);
      expect(declared[0].name).toBe("foo");
    });

    it("returns import binding symbols", () => {
      const source = `import DefaultFoo, { Bar, Baz as B } from "pkg";\n`;
      const analyzer = createAnalyzer(source, "test.ts");
      const stmt = analyzer.sourceFile.statements[0];
      const declared = analyzer.getDeclaredSymbols(stmt);
      const names = declared.map((s) => s.name);
      expect(names).toContain("DefaultFoo");
      expect(names).toContain("Bar");
      expect(names).toContain("B");
    });

    it("returns nothing for expression statements", () => {
      const source = `foo();\n`;
      const analyzer = createAnalyzer(source, "test.ts");
      const stmt = analyzer.sourceFile.statements[0];
      const declared = analyzer.getDeclaredSymbols(stmt);
      expect(declared.length).toBe(0);
    });
  });

  describe("getImportBindingSymbols", () => {
    it("handles named imports", () => {
      const source = `import { A, B } from "pkg";\n`;
      const analyzer = createAnalyzer(source, "test.ts");
      const importDecl = analyzer.sourceFile.statements[0] as ts.ImportDeclaration;
      const syms = analyzer.getImportBindingSymbols(importDecl);
      expect(syms.length).toBe(2);
      expect(syms.map((s) => s.name).sort()).toEqual(["A", "B"]);
    });

    it("handles namespace imports", () => {
      const source = `import * as NS from "pkg";\n`;
      const analyzer = createAnalyzer(source, "test.ts");
      const importDecl = analyzer.sourceFile.statements[0] as ts.ImportDeclaration;
      const syms = analyzer.getImportBindingSymbols(importDecl);
      expect(syms.length).toBe(1);
      expect(syms[0].name).toBe("NS");
    });

    it("handles side-effect imports (no bindings)", () => {
      const source = `import "side-effect";\n`;
      const analyzer = createAnalyzer(source, "test.ts");
      const importDecl = analyzer.sourceFile.statements[0] as ts.ImportDeclaration;
      const syms = analyzer.getImportBindingSymbols(importDecl);
      expect(syms.length).toBe(0);
    });
  });

  describe("findImportSymbolByName", () => {
    it("finds an import symbol by its local name", () => {
      const source = `import { Foo as Bar } from "pkg";\n`;
      const analyzer = createAnalyzer(source, "test.ts");
      const sym = findImportSymbolByName(analyzer, "Bar");
      expect(sym).toBeDefined();
      expect(sym!.name).toBe("Bar");
    });

    it("returns undefined for non-existent imports", () => {
      const source = `import { Foo } from "pkg";\n`;
      const analyzer = createAnalyzer(source, "test.ts");
      const sym = findImportSymbolByName(analyzer, "Bar");
      expect(sym).toBeUndefined();
    });
  });

  describe("isTypePosition", () => {
    it("detects type annotation position", () => {
      const source = `import { Foo } from "pkg";\nconst x: Foo = null as any;\n`;
      const analyzer = createAnalyzer(source, "test.ts");
      // Find the Foo identifier in the type annotation
      let typeRef: ts.Identifier | undefined;
      const varStmt = analyzer.sourceFile.statements[1];
      function walk(n: ts.Node) {
        if (ts.isIdentifier(n) && n.text === "Foo") {
          // Check if it's in a type node
          if (ts.isTypeReferenceNode(n.parent)) {
            typeRef = n;
          }
        }
        ts.forEachChild(n, walk);
      }
      walk(varStmt);
      expect(typeRef).toBeDefined();
      expect(analyzer.isTypePosition(typeRef!)).toBe(true);
    });
  });

  describe("scope awareness — the key improvement", () => {
    it("parameter shadows do not match import symbols", () => {
      const source = `
import { Recorder } from "@azure-tools/test-recorder";
function setup(Recorder: any) {
  return new Recorder();
}
`;
      const analyzer = createAnalyzer(source, "test.ts");
      const importSym = findImportSymbolByName(analyzer, "Recorder")!;
      expect(importSym).toBeDefined();

      // The Recorder inside function body should resolve to the parameter, not the import
      const fnDecl = analyzer.sourceFile.statements[1] as ts.FunctionDeclaration;
      const refs = analyzer.getReferencedSymbols(fnDecl);
      expect(refs.has(importSym)).toBe(false);
    });

    it("block-scoped shadow does not match module binding", () => {
      const source = `
const x = 1;
{
  const x = 2;
  console.log(x);
}
console.log(x);
`;
      const analyzer = createAnalyzer(source, "test.ts");
      const varDecl = analyzer.sourceFile.statements[0] as ts.VariableStatement;
      const moduleXSym = analyzer.getDeclaredSymbols(varDecl)[0];

      // The block statement
      const blockStmt = analyzer.sourceFile.statements[1] as ts.Block;
      const refs = analyzer.getReferencedSymbols(blockStmt);
      // Inside the block, x refers to the block-scoped const, not module x
      expect(refs.has(moduleXSym)).toBe(false);

      // The last console.log(x) DOES reference module x
      const lastStmt = analyzer.sourceFile.statements[2];
      const lastRefs = analyzer.getReferencedSymbols(lastStmt);
      expect(lastRefs.has(moduleXSym)).toBe(true);
    });

    it("arrow function parameter does not leak to outer scope", () => {
      const source = `
import { Foo } from "pkg";
const fn = (Foo: string) => Foo.length;
`;
      const analyzer = createAnalyzer(source, "test.ts");
      const importSym = findImportSymbolByName(analyzer, "Foo")!;

      const varStmt = analyzer.sourceFile.statements[1] as ts.VariableStatement;
      const refs = analyzer.getReferencedSymbols(varStmt);
      // Foo inside the arrow function is the parameter, not the import
      expect(refs.has(importSym)).toBe(false);
    });
  });
});
