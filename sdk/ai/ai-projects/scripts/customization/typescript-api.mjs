// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Shared access to the native TypeScript 7.1 API for the customization tooling.
//
// The native compiler runs in a separate process. Every object that crosses into it is owned by
// the caller and must be released:
//   - the API instance is closed by `closeTypeScriptApi` (CLI entry points use
//     `withTypeScriptApi`, tests close it in an `after` hook);
//   - retained source files are released individually with `releaseSource`, in bulk by
//     `withSources` for a call tree, and in any case when the API closes;
//   - snapshots and programs are scoped to a single `withProgram` call.

import { ScriptKind, ScriptTarget, SyntaxKind } from "typescript/ast";
import { createFileSystem } from "typescript/fs";
import { API } from "typescript/sync";

let api;
let depth = 0;
const retained = new Map();
const names = new WeakMap();
const scopes = [];

/** The shared API instance, created on first use. Do not close it directly. */
export function getTypeScriptApi() {
  api ??= new API();
  return api;
}

const getApi = getTypeScriptApi;

/** Release every retained source file and shut down the native API process. */
export function closeTypeScriptApi() {
  for (const lease of retained.values()) lease.dispose();
  retained.clear();
  api?.close();
  api = undefined;
}

/** Run `fn` and close the native API process when the outermost scope exits. */
export function withTypeScriptApi(fn) {
  depth++;
  try {
    return fn();
  } finally {
    if (--depth === 0) closeTypeScriptApi();
  }
}

/**
 * Parse `text` into a retained syntax tree. Syntax errors are not reported here; use
 * `syntaxDiagnostics`. The name the caller supplied is returned by `displayName`, because the
 * native compiler resolves file names against the current directory.
 */
export function parseSource(text, fileName = "module.ts", scriptKind = ScriptKind.TS) {
  const lease = getApi().createSourceFile(fileName, text, { scriptKind });
  const source = lease.sourceFile;
  retained.set(source, lease);
  names.set(source, fileName);
  scopes.at(-1)?.add(source);
  return source;
}

/** The number of source files that are retained and not yet released. */
export function retainedSourceCount() {
  return retained.size;
}

/** Release a source file returned by `parseSource` once it is no longer used. */
export function releaseSource(source) {
  const lease = retained.get(source);
  if (!lease) return;
  retained.delete(source);
  lease.dispose();
}

/**
 * Run `fn` and release every source file parsed inside it when it returns or throws. Nothing parsed
 * in the scope may be used after it ends.
 */
export function withSources(fn) {
  const scope = new Set();
  scopes.push(scope);
  try {
    return fn();
  } finally {
    scopes.pop();
    for (const source of scope) releaseSource(source);
  }
}

/** The file name given to `parseSource`. */
export function displayName(source) {
  return names.get(source) ?? source.fileName;
}

/**
 * Syntactic diagnostics only. `transpileModule` reports parse errors without type checking, which
 * is the only way to observe them for a source file that is not part of a program.
 */
export function syntaxDiagnostics(text, fileName = "module.ts") {
  return getApi().transpileModule(text, { fileName, reportDiagnostics: true }).diagnostics ?? [];
}

// TypeScript 6 reported these grammar errors as syntactic diagnostics; TypeScript 7.1 reports them
// as semantic diagnostics, which cannot be requested without also type checking the file.
//   2706: Required type parameters may not follow optional type parameters.
const grammarCodes = new Set([2706]);

/**
 * Parse errors plus the grammar errors that TypeScript 6 reported as syntactic. This builds a
 * program, so prefer `syntaxDiagnostics` when parse errors are enough.
 */
export function grammarDiagnostics(text, fileName = "module.ts") {
  const rooted = `/${fileName}`;
  return withProgram(new Map([[rooted, text]]), [rooted], ({ program }) => [
    ...program.getSyntacticDiagnostics(),
    ...program.getSemanticDiagnostics().filter((diagnostic) => grammarCodes.has(diagnostic.code)),
  ]);
}

/** Transpile `text` and return the emitted code plus any syntactic diagnostics. */
export function transpile(text, compilerOptions) {
  const output = getApi().transpileModule(text, { compilerOptions, reportDiagnostics: true });
  return { outputText: output.outputText, diagnostics: output.diagnostics ?? [] };
}

/** Flatten a diagnostic and its message chain into one string. */
export function flattenDiagnostic(diagnostic, newLine = "\n") {
  const lines = [diagnostic.text];
  const append = (chain, level) => {
    for (const item of chain ?? []) {
      lines.push(`${" ".repeat(level * 2)}${item.text}`);
      append(item.messageChain, level + 1);
    }
  };
  append(diagnostic.messageChain, 1);
  return lines.join(newLine);
}

/**
 * Run `fn` against an in-memory, library-free program containing `files`, then dispose the
 * program and snapshot. Nothing derived from the program may be used after `fn` returns.
 *
 * @param {Map<string, string> | [string, string][]} files
 * @param {string[]} rootFiles
 * @param {(context: { program: object, checker: object, sourceFile: (name: string) => object }) => T} fn
 * @template T
 */
export function withProgram(files, rootFiles, fn, compilerOptions = {}) {
  const entries = [...files].map(([name, text]) => [name, text]);
  const snapshot = getApi().createSnapshot({
    fileSystem: createFileSystem(entries),
    createPrograms: [
      {
        rootFiles,
        compilerOptions: {
          noLib: true,
          noResolve: true,
          types: [],
          target: ScriptTarget.Latest,
          ...compilerOptions,
        },
      },
    ],
  });
  try {
    const program = snapshot.operation.createdPrograms[0];
    try {
      const checker = snapshot.getProject(program.id).checker;
      const sourceFile = (name) => {
        const file = program.getSourceFile(name);
        if (!file) throw new Error(`${name}: not part of the program`);
        return file;
      };
      return fn({ program, checker, sourceFile });
    } finally {
      program.dispose();
    }
  } finally {
    snapshot.dispose();
  }
}

const functionLikeKinds = new Set([
  SyntaxKind.MethodDeclaration,
  SyntaxKind.Constructor,
  SyntaxKind.GetAccessor,
  SyntaxKind.SetAccessor,
  SyntaxKind.FunctionExpression,
  SyntaxKind.ArrowFunction,
  SyntaxKind.FunctionDeclaration,
  SyntaxKind.MethodSignature,
  SyntaxKind.CallSignature,
  SyntaxKind.ConstructSignature,
  SyntaxKind.IndexSignature,
  SyntaxKind.FunctionType,
  SyntaxKind.ConstructorType,
  SyntaxKind.ClassStaticBlockDeclaration,
]);

export function isFunctionLike(node) {
  return node !== undefined && functionLikeKinds.has(node.kind);
}

export function isClassLike(node) {
  return node.kind === SyntaxKind.ClassDeclaration || node.kind === SyntaxKind.ClassExpression;
}

export function isStringLiteralLike(node) {
  return (
    node.kind === SyntaxKind.StringLiteral || node.kind === SyntaxKind.NoSubstitutionTemplateLiteral
  );
}

/**
 * The referenced name of a heritage clause entry. TypeScript 7.1 parses `extends` entries of an
 * interface and `implements` entries of a class as type references, where TypeScript 6 produced
 * expressions with type arguments for every heritage entry.
 */
export function heritageExpression(type) {
  return type.typeName ?? type.expression;
}
