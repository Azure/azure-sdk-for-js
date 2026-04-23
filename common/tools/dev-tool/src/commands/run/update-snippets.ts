import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import { EOL } from "node:os";
import path from "node:path";
import ts from "typescript";
import { leafCommand, makeCommandInfo } from "../../framework/command";
import { findMatchingFiles } from "../../util/findMatchingFiles";
import { format } from "../../util/prettier";
import { createPrinter } from "../../util/printer";
import { ProjectInfo, resolveProject } from "../../util/resolveProject";
import { convert } from "../../util/samples/convert";
import { substituteForPublishing } from "../../util/samples/compiler/substitutor.js";
import { testSyntax } from "../../util/samples/syntax";
import { createDiagnosticEmitter } from "../../util/typescript/diagnostic";

export const commandInfo = makeCommandInfo(
  "update-snippets",
  "find README and TSDoc snippets throughout the package and update their contents.",
  {},
);

// Exported for testing
export { parseSnippetDefinitions };

const log = createPrinter("update-snippets");

const SNIPPET_PATH = ["test", "snippets.spec.ts"];
const SAMPLE_TESTS_GLOB = "test/public/samples/*.spec.ts";

/**
 * Describes a location where a snippet is actually presented to a reader, i.e. a Markdown file or JSDoc comment
 * location.
 */
interface SnippetLocationInfo {
  /** The snippet name determined by the tag on its enclosing fence. */
  name: string;
  /** The fence string that started this snippet. */
  fence: string;
  /** The target language of the snippet. */
  language: "js" | "ts";
  /** The absolute path to the file the snippet is located in. */
  absoluteFilePath: string;
  /** The contents of the snippet with the line prefix stripped */
  lineTrimmedContents: string[];
  /** The range of lines in the file where the snippet appears. */
  lineRange: [number, number];
  /** The prefix that appeared before the code fence, which will be inserted before each line in the snippet. */
  linePrefix: string;
}

/**
 * Finds all candidate files that _might_ contain snippet locations.
 *
 * @param dir - the base directory of the package
 */
async function* getAllSnippetFiles(dir: string): AsyncIterable<string> {
  // Only consider markdown files up to a depth of 1 (i.e. _in_ the project folder). This is to prevent grabbing things
  // like samples/*/README.md and other similar files that are not really part of the "source" of the package.
  yield* findMatchingFiles(
    dir,
    (name) => name.endsWith(".md") && name.toLowerCase() !== "changelog.md",
    { maxDepth: 1 },
  );

  if (existsSync(path.join(dir, "src"))) {
    yield* findMatchingFiles(path.join(dir, "src"), (name) => name.endsWith(".ts"));
  }

  if (existsSync(path.join(dir, "test"))) {
    yield* findMatchingFiles(path.join(dir, "test"), (name) => name.endsWith(".ts"));
  }

  if (existsSync(path.join(dir, "samples-dev"))) {
    yield* findMatchingFiles(path.join(dir, "samples-dev"), (name) => name.endsWith(".ts"));
  }
}

const IGNORE_CODE_COMMENT = "// dev-tool snippets ignore";
const IGNORE_MARKDOWN_COMMENT = "<!-- dev-tool snippets ignore -->";
const TS_PRESERVE_WHITESPACE = /\r?\n[ ]*\/\/\s*@ts-preserve-whitespace\s*\r?\n/g;
const TS_IGNORE = /\r?\n[ ]*\/\/\s*@ts-ignore\s*\r?\n/g;
const UNIX_EOL = "\n";

/**
 * Finds all the snippet locations in a project.
 *
 * @param info
 * @returns
 */
async function findAllSnippetLocations(info: ProjectInfo): Promise<SnippetLocationInfo[]> {
  const snippets: SnippetLocationInfo[] = [];
  let hadError = false;

  for await (const f of getAllSnippetFiles(info.path)) {
    if (f.includes("/node_modules/") || f.includes("\\node_modules\\")) {
      continue;
    }
    // We want to use some kind of semantically appropriate comment to allow ignoring a file.
    const ignoreString = f.endsWith(".md") ? IGNORE_MARKDOWN_COMMENT : IGNORE_CODE_COMMENT;

    const contents = (await fs.readFile(f)).toString("utf-8");

    if (contents.includes(ignoreString)) {
      log.info(`Ignoring file ${path.relative(info.path, f)} per file comment directive.`);
      continue;
    }

    let openFence: [RegExpMatchArray, number, string[]] | undefined = undefined;

    for (const [line, idx] of contents.split(/\r?\n/).map((line, idx) => [line, idx] as const)) {
      // We'll scan the file for matching code fences manually.
      if (openFence === undefined) {
        // We allow fences to be nested up to an arbitrary depth, but practically speaking we will never have fences
        // longer than three backticks.
        const match = /^([^`]*)(````*)([a-zA-Z]*)(\s*.*)$/.exec(line);

        if (!match) continue;

        openFence = [match, idx, []];
      } else {
        const [[, , fence], , contents] = openFence;

        // This line either starts with the fence or contains the unescaped fence somewhere in it.
        if (line.startsWith(fence) || new RegExp(`[^\\\\]${fence}`).test(line)) {
          // Fence ends on this line.

          const [[, linePrefix, fence, language, snippetName], startIdx, contents] = openFence;
          openFence = undefined;

          // We don't care about bash, text, etc. snippets. Only JS/TS in any incarnation.
          if (!["js", "ts", "javascript", "typescript"].includes(language)) {
            continue;
          }

          // Ignore if it says snippet:ignore
          if (snippetName?.trim()?.startsWith("snippet:ignore")) {
            continue;
          }

          if (!snippetName?.trim()?.startsWith("snippet:")) {
            log.error(
              `${language} snippet at ${f}:${startIdx} does not have a snippet name, or has a malformed snippet name.`,
            );
            hadError = true;
            continue;
          }

          snippets.push({
            name: snippetName.trim().replace("snippet:", ""),
            fence,
            // It's going to be way easier down the road if the language name is normalized.
            language: language === "javascript" || language === "js" ? "js" : "ts",
            linePrefix,
            absoluteFilePath: f,
            lineTrimmedContents: contents.map((s) => s.replace(linePrefix, "")),
            lineRange: [startIdx, idx],
          });
        } else {
          contents.push(line);
        }
      }
    }
  }

  if (hadError) throw new Error("some snippets had no associated metadata");

  return snippets;
}

/**
 * A definition for a snippet extracted from the snippets file.
 */
interface SnippetDefinition {
  /**
   * The name of this snippet.
   */
  name: string;
  /**
   * The source text of this snippet in TypeScript.
   */
  typescriptSourceText: Promise<string[]>;
  /**
   * A bound function that will produce an equivalent JavaScript text using our sample convention.
   */
  convert(): Promise<string[]>;
}

/**
 * Parses the snippets file for a project and extracts the text of snippet tests.
 *
 * @param project - the project to extract snippets for
 * @returns a map from snippet name to definition.
 */
async function parseSnippetDefinitions(
  project: ProjectInfo,
): Promise<Map<string, SnippetDefinition>> {
  const results = new Map<string, SnippetDefinition>();

  // Discover all snippet source files: the legacy snippets.spec.ts and any sample-test files
  const snippetFiles: string[] = [];
  const legacySnippetFile = path.join(project.path, ...SNIPPET_PATH);
  if (existsSync(legacySnippetFile)) {
    snippetFiles.push(legacySnippetFile);
  }

  // Discover sample-test files matching SAMPLE_TESTS_GLOB
  const sampleTestDir = path.join(project.path, path.dirname(SAMPLE_TESTS_GLOB));
  if (existsSync(sampleTestDir)) {
    for await (const filePath of findMatchingFiles(
      sampleTestDir,
      (name) => name.endsWith(".spec.ts") && !name.endsWith("snippets.spec.ts"),
    )) {
      snippetFiles.push(filePath);
    }
  }

  if (snippetFiles.length === 0) {
    return results;
  }

  // Pre-process spec files: replace forPublishing(testVal, () => sampleVal) calls with the
  // published expression via text-level substitution. This lets authors place forPublishing()
  // inside @snippet blocks without test infrastructure leaking into README and TSDoc output.
  // We apply substitutions in reverse position order so earlier positions remain valid as we
  // splice the string.
  const tempPrinter = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  const substitutedTexts = new Map<string, string>();
  const defaultHost = ts.createCompilerHost({});

  for (const filePath of snippetFiles) {
    const canonicalPath = defaultHost.getCanonicalFileName(path.resolve(filePath));
    const sourceText = await fs.readFile(filePath, "utf-8");
    const tempFile = ts.createSourceFile(filePath, sourceText, ts.ScriptTarget.Latest, true);
    const { substitutions } = substituteForPublishing(tempFile, filePath);
    if (substitutions.length === 0) continue;

    const sortedSubs = [...substitutions].sort(
      (a, b) => b.originalNode.getStart(tempFile) - a.originalNode.getStart(tempFile),
    );
    let result = sourceText;
    for (const sub of sortedSubs) {
      const start = sub.originalNode.getStart(tempFile);
      const end = sub.originalNode.getEnd();
      const publishedText = tempPrinter.printNode(
        ts.EmitHint.Expression,
        sub.publishedExpression,
        tempFile,
      );
      result = result.substring(0, start) + publishedText + result.substring(end);
    }
    substitutedTexts.set(canonicalPath, result);
  }

  // Build a custom compiler host that serves the substituted texts so the type checker
  // (used for import resolution) sees the already-substituted code.
  const customHost: ts.CompilerHost = {
    ...defaultHost,
    getSourceFile(fileName, languageVersion, onError, shouldCreateNewSourceFile) {
      const canonical = defaultHost.getCanonicalFileName(path.resolve(fileName));
      const substituted = substitutedTexts.get(canonical);
      if (substituted !== undefined) {
        return ts.createSourceFile(fileName, substituted, languageVersion, true);
      }
      return defaultHost.getSourceFile(
        fileName,
        languageVersion,
        onError,
        shouldCreateNewSourceFile,
      );
    },
  };

  const program = ts.createProgram({
    rootNames: snippetFiles,
    options: {},
    host: customHost,
  });

  const checker = program.getTypeChecker();

  const printer = ts.createPrinter({
    newLine: EOL === "\r\n" ? ts.NewLineKind.CarriageReturnLineFeed : ts.NewLineKind.LineFeed,
    removeComments: false,
    noEmitHelpers: true,
  });

  // Process each snippet source file
  for (const filePath of snippetFiles) {
    const sourceFile = program.getSourceFile(filePath);
    if (!sourceFile) continue;

    const relativeIndexPath = path
      .relative(path.dirname(filePath), path.join(project.path, "src"))
      .replaceAll("\\", "/");

    visitFileForSnippets(sourceFile, relativeIndexPath);
  }

  return results;

  function visitFileForSnippets(
    currentSourceFile: ts.SourceFile,
    relativeIndexPath: string,
  ): void {
    const visitSnippetDefinition: ts.Visitor = (node: ts.Node) => {
      let expr: ts.Expression;

    // We accept any test definition that calls the exact symbol 'it' with a
    // string literal and a function expression where the body of the function
    // is a block. We don't care whether the function is named or async or what
    // its type annotations are. Those may be used freely to ensure correctness.
    //
    // Snippet ::= 'it' ( $name:litstr , BlockFn )
    // BlockFn ::=
    //   | 'async'? ( $_:params ) => { $body:statements }
    //   | 'async'? function $_:ident? ( ) { $body:statements }
    if (
      node &&
      ts.isCallExpression(node) &&
      ts.isIdentifier((expr = node.expression)) &&
      (expr as ts.Identifier).escapedText === "it" &&
      ts.isStringLiteral(node.arguments[0]) &&
      (ts.isFunctionExpression(node.arguments[1]) ||
        (ts.isArrowFunction(node.arguments[1]) && ts.isBlock(node.arguments[1].body)))
    ) {
      const name = node.arguments[0] as ts.StringLiteral;
      const body = (node.arguments[1] as ts.ArrowFunction | ts.FunctionExpression).body as ts.Block;

      // Register the entire it() body as a snippet (legacy mode)
      registerSnippetFromStatements(name.text, body.statements);

      // Also scan the body for // @snippet markers (marker mode)
      const bodyText = currentSourceFile.text.substring(body.getStart(), body.getEnd());
      extractMarkerSnippets(bodyText, body.statements);
    }

    ts.forEachChild(node, visitSnippetDefinition);

    return undefined;
  };

  // Helper: collect imports from AST statements using the type checker
  function collectImportsFromStatements(
    statements: ts.NodeArray<ts.Statement>,
  ): { name: string; moduleSpecifier: string; isDefault: boolean }[] {
    const imports: { name: string; moduleSpecifier: string; isDefault: boolean }[] = [];

    const symbolImportVisitor: ts.Visitor = (node: ts.Node) => {
      if (ts.isIdentifier(node)) {
        const importLocations = extractImportLocations(node);
        if (importLocations.length > 1) {
          throw new Error(
            `unrecoverable error: the type definition of '${node.text}' in the snippet file is merged between multiple imports, so we cannot extract it`,
          );
        } else if (importLocations.length === 1) {
          log.debug(`symbol ${node.text} was imported from ${importLocations[0]}`);
          imports.push({
            name: node.text,
            ...importLocations[0],
          });
        }
      }

      ts.forEachChild(node, symbolImportVisitor);
      return undefined;
    };

    ts.visitNodes(statements, symbolImportVisitor);
    return imports;
  }

  interface ImportedSymbols {
    default?: string;
    named?: Set<string>;
  }

  // Helper: build and register a snippet definition from content text and imports
  function buildAndRegisterSnippet(
    snippetName: string,
    contents: string,
    imports: { name: string; moduleSpecifier: string; isDefault: boolean }[],
  ): void {
    log.debug(`found a snippet named ${snippetName}: \n${contents}`);

    const importMap = new Map<string, ImportedSymbols>();

    for (const { name, moduleSpecifier, isDefault } of imports) {
      let moduleImports = importMap.get(moduleSpecifier);
      if (!moduleImports) {
        moduleImports = {};
        importMap.set(moduleSpecifier, moduleImports);
      }
      if (isDefault) {
        if (moduleImports.default && moduleImports.default !== name) {
          throw new Error(
            `unrecoverable error: multiple default imports from the same module '${moduleSpecifier}'`,
          );
        }
        moduleImports.default = name;
      } else {
        if (!moduleImports.named) {
          moduleImports.named = new Set();
        }
        moduleImports.named.add(name);
      }
    }

    // Form import declarations and prepend them to the rest of the contents.
    const importLines = [...importMap.entries()]
      .map(([module, imps]) => {
        const importParts = [];
        if (imps.default) {
          importParts.push(imps.default);
        }
        if (imps.named) {
          importParts.push(`{ ${[...imps.named].join(", ")} }`);
        }

        if (importParts.length === 0) {
          throw new Error(
            `unrecoverable error: no imports were generated for the snippet '${snippetName}'`,
          );
        }

        return `import ${importParts.join(", ")} from "${module}";`;
      })
      .join(EOL);

    const SNIPPET_MARKER = /^\s*\/\/\s*@snippet(?:-end)?\s+\S+\s*$/;

    const fullSnippetTypeScriptText = (importLines + EOL + EOL + contents)
      .split(/\r?\n/)
      .filter((line) => !SNIPPET_MARKER.test(line))
      .join(EOL)
      .replace(TS_IGNORE, UNIX_EOL)
      .replace(TS_PRESERVE_WHITESPACE, UNIX_EOL + UNIX_EOL)
      .trim();

    const checkSyntax: ts.TransformerFactory<ts.SourceFile> = (context) => (sf) => {
      const emitError = createDiagnosticEmitter(sf);

      const visitor: ts.Visitor = (node) => {
        const syntaxError = testSyntax(node);
        if (syntaxError) {
          emitError(syntaxError.message, node, syntaxError.suggest);
        }
        return ts.visitEachChild(node, visitor, context);
      };

      ts.visitNode(sf, visitor);
      return sf;
    };

    const replaceEnvLookup: ts.TransformerFactory<ts.SourceFile> = (context) => (sf) => {
      const visitor: ts.Visitor = (node) => {
        if (
          ts.isNullishCoalesce(node) ||
          (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.BarBarToken)
        ) {
          const left = (node as ts.BinaryExpression).left;

          if (
            ts.isPropertyAccessExpression(left) &&
            /^\s*process\s*\.\s*env\s*/.test(left.expression.getText(sf))
          ) {
            return (node as ts.BinaryExpression).right;
          }
        }
        return ts.visitEachChild(node, visitor, context);
      };

      ts.visitNode(sf, visitor);
      return sf;
    };

    results.set(snippetName, {
      name: snippetName,
      typescriptSourceText: format(fullSnippetTypeScriptText, "typescript").then((res) =>
        res.split(/\r?\n/),
      ),
      async convert() {
        const res = await convert(fullSnippetTypeScriptText, {
          transformers: {
            before: [replaceEnvLookup, checkSyntax],
            after: [],
          },
        });
        return res.trim().split(/\r?\n/);
      },
    });
  }

  // Register an entire it() body as a snippet (legacy mode: it-name = snippet-name)
  function registerSnippetFromStatements(
    snippetName: string,
    statements: ts.NodeArray<ts.Statement>,
  ): void {
    const contents = printer.printList(
      ts.ListFormat.MultiLineBlockStatements,
      statements,
      currentSourceFile,
    );
    const imports = collectImportsFromStatements(statements);
    buildAndRegisterSnippet(snippetName, contents, imports);
  }

  // Extract // @snippet Name ... // @snippet-end Name regions from an it() body
  function extractMarkerSnippets(
    bodyText: string,
    statements: ts.NodeArray<ts.Statement>,
  ): void {
    const startRegex = /\/\/\s*@snippet\s+(\S+)/;
    const endRegex = /\/\/\s*@snippet-end\s+(\S+)/;
    const lines = bodyText.split("\n");
    let current: { name: string; lines: string[]; startLine: number } | null = null;
    let lineIndex = 0;

    // Build a line offset table for the bodyText to map line indices to character offsets
    const lineOffsets: number[] = [];
    let offset = 0;
    for (const line of lines) {
      lineOffsets.push(offset);
      offset += line.length + 1; // +1 for the \n
    }

    // bodyText starts at this position in the original source file
    const bodyStart = statements.length > 0
      ? statements[0].getFullStart()
      : 0;

    for (const line of lines) {
      const startMatch = line.match(startRegex);
      const endMatch = line.match(endRegex);

      if (endMatch && current && endMatch[1] === current.name) {
        // Found end of snippet region
        const regionText = current.lines.join("\n").trim();
        if (regionText) {
          // Find which original AST statements fall within the marker region
          // Map line range to positions in the original source file
          const regionStartOffset = bodyStart + lineOffsets[current.startLine];
          const regionEndOffset = bodyStart + lineOffsets[lineIndex];

          const regionStatements = statements.filter((stmt) => {
            const stmtStart = stmt.getStart();
            const stmtEnd = stmt.getEnd();
            return stmtStart >= regionStartOffset && stmtEnd <= regionEndOffset;
          });

          // Use original AST nodes for import resolution (they're connected to the checker)
          const fakeNodeArray = ts.factory.createNodeArray(regionStatements);
          const imports = collectImportsFromStatements(fakeNodeArray);

          // Print the region statements for clean content
          const contents = printer.printList(
            ts.ListFormat.MultiLineBlockStatements,
            fakeNodeArray,
            currentSourceFile,
          );

          buildAndRegisterSnippet(current.name, contents, imports);
        }
        current = null;
      } else if (startMatch && !endMatch && !current) {
        current = { name: startMatch[1], lines: [], startLine: lineIndex + 1 };
      } else if (current) {
        current.lines.push(line);
      }

      lineIndex++;
    }
  }

  visitSnippetDefinition(currentSourceFile);

  /**
   * A helper function to extract imported symbols from TypeScript nodes.
   *
   * If the node has a symbol (for example, an identifier), then the symbol is resolved. Symbol declarations may be
   * merged, so we extract all declarations that come from import clauses _in the same file_ and extract the module
   * specifier from their parent. The symbol is considered "defined" by a combined import from those locations.
   *
   * @param node - the node to check for imports
   * @returns a list of module specifiers that form the definition of the node's symbol, or undefined
   */
  function extractImportLocations(node: ts.Node): {
    isDefault: boolean;
    moduleSpecifier: string;
  }[] {
    const sym = checker.getSymbolAtLocation(node);

    // Get all the decls that are in source files and where the decl comes from an import clause.
    const nonDefaultExports = sym?.declarations
      ?.filter(
        (decl) =>
          decl.getSourceFile() === currentSourceFile &&
          decl.parent?.parent &&
          ts.isImportClause(decl.parent.parent),
      )
      .map(
        // It is a grammar error for moduleSpecifier to be anything other than a string literal. In future versions of
        // ES, that might become untrue, but it seems unlikely.
        (decl) => {
          const moduleSpecifierText = (
            (decl.parent.parent as ts.ImportClause).parent.moduleSpecifier as ts.StringLiteral
          ).text;

          if (
            moduleSpecifierText === relativeIndexPath ||
            moduleSpecifierText === path.posix.join(relativeIndexPath, "index.js") ||
            moduleSpecifierText === path.posix.join(relativeIndexPath, "index")
          ) {
            return { moduleSpecifier: project.name, isDefault: false };
          } else {
            return { moduleSpecifier: moduleSpecifierText, isDefault: false };
          }
        },
      );

    const defaultExports = sym?.declarations
      ?.filter(
        (decl) =>
          decl.getSourceFile() === currentSourceFile &&
          ts.isImportClause(decl) &&
          ts.isImportDeclaration(decl.parent) &&
          decl.name,
      )
      .map((decl) => {
        const moduleSpecifierText = (
          (decl.parent as ts.ImportDeclaration).moduleSpecifier as ts.StringLiteral
        ).text;

        if (
          moduleSpecifierText === relativeIndexPath ||
          moduleSpecifierText === path.posix.join(relativeIndexPath, "index.js") ||
          moduleSpecifierText === path.posix.join(relativeIndexPath, "index")
        ) {
          return { moduleSpecifier: project.name, isDefault: true };
        } else {
          return { moduleSpecifier: moduleSpecifierText, isDefault: true };
        }
      });

    return [...(nonDefaultExports ?? []), ...(defaultExports ?? [])];
  }
  } // end visitFileForSnippets
}

/**
 * Information about a file that contains snippet locations and that we're modifying.
 */
interface SnippetLocationFileContext {
  name: string;
  contents: string[];
  lineOffset: number;
}

/**
 * Writes the contents of an iterable of files to disk.
 *
 * @param files - the files to write
 */
async function writeAll(files: IterableIterator<SnippetLocationFileContext>): Promise<void> {
  for (const info of files) {
    await fs.writeFile(info.name, Buffer.from(info.contents.join(EOL), "utf-8"));
  }
}

/**
 * Replace existing snippet locations with new snippet definitions. This function fails if each snippet location does
 * not have a snippet definition with a matching name.
 *
 * INVARIANT: locations must be grouped by file and sorted by line index.
 *
 * @param locations - the locations to replace
 * @param snippets - the snippets to replace the existing locations with
 * @returns true if successful, otherwise false
 */
async function replaceSnippetsWithNew(
  locations: SnippetLocationInfo[],
  snippets: Map<string, SnippetDefinition>,
): Promise<boolean> {
  // This algorithm iteratively goes through the locations and replaces the existing contents of the locations with the
  // contents of a matching definition. If no matching definition is found, we produce an error. The only tricky part
  // about this algorithm is keeping track of the net lines added/removed by replacing the snippets, as we are modifying
  // the file line contents in place and need to know if, for example, we replaced a snippet with a shorter text,
  // as that affects the line indices of all subsequent replacements.

  const files = new Set(locations.map((l) => l.absoluteFilePath));
  const fileContext = new Map<string, SnippetLocationFileContext>();

  // Initialize output file contexts.
  for (const f of files) {
    fileContext.set(f, {
      name: f,
      contents: (await fs.readFile(f)).toString("utf-8").split(/\r?\n/),
      lineOffset: 0,
    });
  }

  let hadError = false;

  // Since the locations are sorted, we can just go through them and replace the text.
  for (const location of locations) {
    const { contents, lineOffset } = fileContext.get(location.absoluteFilePath)!;

    const snippetDefinition = snippets.get(location.name);

    if (!snippetDefinition) {
      log.error(
        `No matching snippet found for ${location.absoluteFilePath}:${location.lineRange[0]} (${location.name})`,
      );
      hadError = true;
      continue;
    }

    let snippet: string[];

    if (location.language === "js") {
      snippet = await snippetDefinition.convert();
    } else {
      snippet = await snippetDefinition.typescriptSourceText;
    }

    // Remove the last item which is always empty
    snippet = snippet.slice(0, -1);

    // The original length of the line.
    const originalLineLength = location.lineRange[1] - location.lineRange[0] - 1;

    // The part of the file that appears before the current snippet location, plus one to include the code fence itself.
    const newContents = contents.slice(0, lineOffset + location.lineRange[0] + 1);
    // The contents of the new snippet definition
    newContents.push(...snippet.map((line) => (location.linePrefix + line).trimEnd()));
    // The part of the file that apears after the current snippet location.
    newContents.push(...contents.slice(lineOffset + location.lineRange[1]));

    // Update the existing context
    fileContext.set(location.absoluteFilePath, {
      name: location.absoluteFilePath,
      contents: newContents,
      // Update the line offset by adding the difference between the new snippet length and the original length. The
      // line offset may be any integer.
      lineOffset: lineOffset + (snippet.length - originalLineLength),
    });
  }

  if (!hadError) {
    await writeAll(fileContext.values());
  }

  return !hadError;
}

export default leafCommand(commandInfo, async (_) => {
  // Conceptually, what we want to do is simple. find the snippet locations for a project, parse the definitions of the
  // project's snippets, and then fill the locations in with the snippets.
  const project = await resolveProject(process.cwd());

  let snippetLocations: SnippetLocationInfo[];

  try {
    snippetLocations = await findAllSnippetLocations(project);
  } catch {
    return false;
  }

  const snippetDefinitions = await parseSnippetDefinitions(project);

  return replaceSnippetsWithNew(snippetLocations, snippetDefinitions);
});
