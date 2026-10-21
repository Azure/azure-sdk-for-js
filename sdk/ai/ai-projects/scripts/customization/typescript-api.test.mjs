// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "node:assert/strict";
import { after, test } from "node:test";
import * as ts from "typescript/ast";
import {
  closeTypeScriptApi,
  displayName,
  flattenDiagnostic,
  grammarDiagnostics,
  heritageExpression,
  isClassLike,
  isFunctionLike,
  isStringLiteralLike,
  parseSource,
  releaseSource,
  retainedSourceCount,
  syntaxDiagnostics,
  withProgram,
  withSources,
  withTypeScriptApi,
} from "./typescript-api.mjs";

after(closeTypeScriptApi);

test("parses source text and remembers the caller's file name", () => {
  const source = parseSource("export const value = 1;", "relative/module.ts");
  try {
    assert.equal(displayName(source), "relative/module.ts");
    assert.equal(source.statements.length, 1);
    assert.ok(ts.isVariableStatement(source.statements[0]));
  } finally {
    releaseSource(source);
  }
});

test("releasing a source file is idempotent", () => {
  const source = parseSource("export const value = 1;");
  releaseSource(source);
  releaseSource(source);
});

test("withSources releases everything parsed inside the scope, even when it throws", () => {
  const before = retainedSourceCount();
  assert.equal(
    withSources(() => {
      parseSource("export const value = 1;");
      parseSource("export const other = 2;");
      return retainedSourceCount();
    }),
    before + 2,
  );
  assert.equal(retainedSourceCount(), before);
  assert.throws(
    () =>
      withSources(() => {
        parseSource("export const value = 1;");
        throw new Error("boom");
      }),
    /boom/,
  );
  assert.equal(retainedSourceCount(), before);
});

test("reports parse errors without type checking", () => {
  assert.deepEqual(syntaxDiagnostics("export const value = 1;"), []);
  const [error] = syntaxDiagnostics("export const value = ;");
  assert.equal(error.text, "Expression expected.");
  assert.deepEqual(error.startPosition, { line: 0, character: 21 });
  assert.equal(flattenDiagnostic(error, "\n"), "Expression expected.");
  assert.deepEqual(syntaxDiagnostics("const a: Missing = 1;"), []);
});

test("reports grammar errors that TypeScript 7.1 only checks semantically", () => {
  const text = "interface Example<T = string, U> {}";
  assert.deepEqual(syntaxDiagnostics(text), []);
  assert.deepEqual(
    grammarDiagnostics(text).map((diagnostic) => diagnostic.code),
    [2706],
  );
  assert.deepEqual(grammarDiagnostics("interface Example<T = string, U = number> {}"), []);
});

test("resolves symbols inside a disposable program", () => {
  const text = "export const a = 1;\nexport const b = a;";
  const names = withProgram(
    new Map([["module.ts", text]]),
    ["module.ts"],
    ({ checker, sourceFile }) => {
      const identifiers = [];
      (function collect(node) {
        if (ts.isIdentifier(node)) identifiers.push(node);
        node.forEachChild(collect);
      })(sourceFile("module.ts"));
      const symbols = checker.getSymbolAtLocation(identifiers);
      assert.equal(symbols[0], symbols[2]);
      return identifiers.map((node) => node.text);
    },
  );
  assert.deepEqual(names, ["a", "b", "a"]);
});

test("heritage clauses expose the referenced name for both parser shapes", () => {
  withSources(() => {
    const source = parseSource(
      "interface I extends Base<string> {}\nclass C extends Parent implements Contract {}",
    );
    const [iface, klass] = source.statements;
    assert.equal(heritageExpression(iface.heritageClauses[0].types[0]).text, "Base");
    const [extendsClause, implementsClause] = klass.heritageClauses;
    assert.equal(heritageExpression(extendsClause.types[0]).text, "Parent");
    assert.equal(heritageExpression(implementsClause.types[0]).text, "Contract");
  });
});

test("provides the legacy node classifiers that TypeScript 7.1 dropped", () => {
  withSources(() => {
    const source = parseSource(
      'class C { m() {} get a() { return 1; } }\nconst f = () => 1;\nconst s = "x";',
    );
    const [klass, fn, text] = source.statements;
    assert.ok(isClassLike(klass));
    assert.ok(klass.members.filter(isFunctionLike).length === 2);
    assert.ok(isFunctionLike(fn.declarationList.declarations[0].initializer));
    assert.ok(isStringLiteralLike(text.declarationList.declarations[0].initializer));
  });
});

test("the end of file token is named EndOfFile", () => {
  const scanner = ts.createScanner(true, ts.LanguageVariant.Standard, "a");
  assert.equal(scanner.scan(), ts.SyntaxKind.Identifier);
  assert.equal(scanner.scan(), ts.SyntaxKind.EndOfFile);
  assert.equal(ts.SyntaxKind.EndOfFileToken, undefined);
});

test("nested API scopes close the native process only once", () => {
  withTypeScriptApi(() => {
    withTypeScriptApi(() => {
      releaseSource(parseSource("export {};"));
    });
    releaseSource(parseSource("export {};"));
  });
  parseSource("export {};");
  assert.equal(retainedSourceCount() > 0, true);
  closeTypeScriptApi();
  assert.equal(retainedSourceCount(), 0);
});
