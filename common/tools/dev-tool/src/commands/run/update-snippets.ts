import fs from "fs/promises";
import { EOL } from "os";
import path from "path";
import ts from "typescript";
import { leafCommand, makeCommandInfo } from "../../framework/command";
import { findMatchingFiles } from "../../util/findMatchingFiles";
import { formatFile } from "../../util/prettier";
import { createPrinter } from "../../util/printer";
import { ProjectInfo, resolveProject } from "../../util/resolveProject";
import { convert } from "../../util/samples/convert";
import { testSyntax } from "../../util/samples/syntax";
import { createDiagnosticEmitter } from "../../util/typescript/diagnostic";

export const commandInfo = makeCommandInfo(
  "update-snippets",
  "find README and TSDoc snippets throughout the package and update their contents.",
  {}
);

const log = createPrinter("update-snippets");

const SNIPPET_PATH = ["test", "snippets.spec.ts"];

interface SnippetLocationInfo {
  /** The snippet name determined by the tag on its enclosing fence. */
  name: string;
  /** The fence string that started this snippet. */
  fence: string;
  /** The target language of the snippet. */
  language: "js" | "ts";
  /** The aboslute path to the file the snippet is located in. */
  absoluteFilePath: string;
  /** The contents of the snippet with the line prefix stripped */
  lineNormalizedContents: string[];
  /** The range of lines in the file where the snippet appears. */
  lineRange: [number, number];
  /** The prefix that appeared before the code fence, which will be inserted before each line in the snippet. */
  linePrefix: string;
}

async function* getAllSnippetFiles(dir: string): AsyncIterable<string> {
  yield* findMatchingFiles(dir, (name) => name.endsWith(".md"), { maxDepth: 1 });

  yield* findMatchingFiles(path.join(dir, "src"), (name) => name.endsWith(".ts"));

  yield* findMatchingFiles(path.join(dir, "test"), (name) => name.endsWith(".ts"));

  yield* findMatchingFiles(path.join(dir, "samples-dev"), (name) => name.endsWith(".ts"));
}

async function findAllSnippets(info: ProjectInfo): Promise<SnippetLocationInfo[]> {
  const snippets: SnippetLocationInfo[] = [];
  let hadError = false;

  for await (const f of getAllSnippetFiles(info.path)) {
    const ignoreString = f.endsWith(".md")
      ? "<!-- dev-tool snippets ignore -->"
      : "// dev-tool snippets ignore";

    const contents = (await fs.readFile(f)).toString("utf-8");

    if (contents.includes(ignoreString)) {
      log.info(`Ignoring file ${path.relative(info.path, f)} per file comment directive.`);
      continue;
    }

    let openFence: [RegExpMatchArray, number, string[]] | undefined = undefined;

    for (const [line, idx] of contents.split(/\r?\n/).map((line, idx) => [line, idx] as const)) {
      // We'll scan the file for matching
      if (openFence === undefined) {
        const match = /^([^`]*)(````*)([a-zA-Z]*)(\s*.*)$/.exec(line);

        if (!match) continue;

        openFence = [match, idx, []];
      } else {
        const [[, , fence], , contents] = openFence;

        if (line.startsWith(fence) || new RegExp(`[^\\\\]${fence}`).test(line)) {
          // Fence ends on this line.

          const [[, prefix, fence, language, metadata], startIdx, contents] = openFence;
          openFence = undefined;

          // We don't care about bash, text, etc. snippets
          if (!["js", "ts", "javascript", "typescript"].includes(language)) continue;

          if (!metadata?.trim()?.startsWith("snippet:")) {
            // No metadata
            log.error(
              `${language} snippet at ${f}:${startIdx} does not have a snippet name, or has a malformed snippet name.`
            );
            hadError = true;
            continue;
          }

          snippets.push({
            name: metadata.trim().replace("snippet:", ""),
            fence,
            language: language === "javascript" || language === "js" ? "js" : "ts",
            linePrefix: prefix,
            absoluteFilePath: f,
            lineNormalizedContents: contents.map((s) => s.replace(prefix, "")),
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

interface SnippetDefinition {
  name: string;
  typescriptSourceText: string[];
  convert(): string[];
}

async function parseSnippets(project: ProjectInfo): Promise<Map<string, SnippetDefinition>> {
  const results = new Map<string, SnippetDefinition>();

  const snippetFile = path.join(project.path, ...SNIPPET_PATH);

  const relativeIndexPath = path.relative(
    path.dirname(snippetFile),
    path.join(project.path, "src")
  );

  const program = ts.createProgram({
    rootNames: [snippetFile],
    options: {},
  });

  const sourceFile = program.getSourceFile(snippetFile)!;
  const checker = program.getTypeChecker();

  const visitor: ts.Visitor = (node: ts.Node) => {
    let expr: ts.Expression;

    // it($<body:litstr>, functionlike() => $<body:block>)
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier((expr = node.expression)) &&
      (expr as ts.Identifier).escapedText === "it" &&
      ts.isStringLiteral(node.arguments[0]) &&
      (ts.isFunctionExpression(node.arguments[1]) ||
        (ts.isArrowFunction(node.arguments[1]) && ts.isBlock(node.arguments[1].body)))
    ) {
      const name = node.arguments[0] as ts.StringLiteral;
      const body = (node.arguments[1] as ts.ArrowFunction | ts.FunctionExpression).body as ts.Block;

      const printer = ts.createPrinter({
        newLine: EOL === "\r\n" ? ts.NewLineKind.CarriageReturnLineFeed : ts.NewLineKind.LineFeed,
        removeComments: false,
        noEmitHelpers: true,
      });

      const contents = printer.printList(
        ts.ListFormat.MultiLineBlockStatements,
        body.statements,
        sourceFile
      );

      const imports: [string, string][] = [];

      const symbolVisitor: ts.Visitor = (node: ts.Node) => {
        let importLocations: string[] | undefined;
        if (
          ts.isIdentifier(node) &&
          (importLocations = extractImportLocations(node)) !== undefined
        ) {
          if (importLocations.length > 1) {
            throw new Error(
              `unrecoverable error: the type definition of '${node.text}' in the snippet file is merged between multiple imports, so we cannot extract it`
            );
          } else if (importLocations.length === 1) {
            // The symbol was imported, so we need to track the imports to add them to the snippet later.
            log.debug(`symbol ${node.text} was imported from ${importLocations[0]}`);
            imports.push([node.text, importLocations[0]]);
          }
        }

        ts.forEachChild(node, symbolVisitor);

        return undefined;
      };

      ts.visitNodes(body.statements, symbolVisitor);

      // We've found a snippet. No need to recur any farther. We'll take the body of this snippet and transpile it as a file using `convert`.
      log.debug(`found a snippet named ${name.text}: \n${contents}`);

      const importMap = new Map<string, Set<string>>(
        imports.map(([, module]) => [module, new Set()])
      );

      for (const [symbol, name] of imports) {
        importMap.get(name)!.add(symbol);
      }

      const fullSnippetTypeScriptText = (
        [...importMap.entries()]
          .map(
            ([module, symbols]) =>
              `import { ${[...symbols.values()].join(", ")} } from "${module}";`
          )
          .join(EOL) +
        EOL +
        EOL +
        contents
      )
        .replace(
          // Need to get rid of any ts-ignores that were added because of unused symbols
          /\r?\n[ ]*\/\/\s*@ts-ignore\s*\r?\n/g,
          EOL
        )
        .trim();

      const checkSyntax: ts.TransformerFactory<ts.SourceFile> = (context) => (sourceFile) => {
        const emitError = createDiagnosticEmitter(sourceFile);

        const visitor: ts.Visitor = (node) => {
          const syntaxError = testSyntax(node);

          if (syntaxError) {
            emitError(syntaxError.message, node, syntaxError.suggest);
          }

          return ts.visitEachChild(node, visitor, context);
        };

        return ts.visitNode(sourceFile, visitor);
      };

      // TODO: how can we run this on the TS source without emitting to JS?
      const replaceEnvLookup: ts.TransformerFactory<ts.SourceFile> = (context) => (sourceFile) => {
        const visitor: ts.Visitor = (node) => {
          if (
            ts.isNullishCoalesce(node) ||
            (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.BarBarToken)
          ) {
            const left = (node as ts.BinaryExpression).left;

            if (
              ts.isPropertyAccessExpression(left) &&
              left.expression.getText(sourceFile) === "process.env"
            ) {
              return (node as ts.BinaryExpression).right;
            }
          }
          return ts.visitEachChild(node, visitor, context);
        };
        return ts.visitNode(sourceFile, visitor);
      };

      results.set(name.text, {
        name: name.text,
        typescriptSourceText: formatFile(fullSnippetTypeScriptText).split(/\r?\n/),
        convert() {
          return convert(fullSnippetTypeScriptText, {
            transformers: {
              before: [replaceEnvLookup, checkSyntax],
              after: [
                // We're using ESM in snippets for now.
                /*createToCommonJsTransform(bindRequireFunction(project))*/
              ],
            },
          })
            .trim()
            .split(/\r?\n/);
        },
      });
    }

    ts.forEachChild(node, visitor);

    return undefined;
  };

  visitor(sourceFile);

  return results;

  function extractImportLocations(node: ts.Node): string[] | undefined {
    const sym = checker.getSymbolAtLocation(node);

    // Get all the decls that are in source files and where the decl comes from an import clause.
    return sym?.declarations
      ?.filter(
        (decl) => decl.getSourceFile() === sourceFile && ts.isImportClause(decl.parent.parent)
      )
      .map(
        // It is a grammar error for moduleSpecifier to be anything other than a string literal.
        (decl) => {
          const moduleSpecifierText = (
            (decl.parent.parent as ts.ImportClause).parent.moduleSpecifier as ts.StringLiteral
          ).text;

          if (
            moduleSpecifierText === relativeIndexPath ||
            moduleSpecifierText === path.join(relativeIndexPath, "index.js") ||
            moduleSpecifierText === path.join(relativeIndexPath, "index")
          ) {
            return project.name;
          } else {
            return moduleSpecifierText;
          }
        }
      );
  }
}

interface FileInfo {
  name: string;
  contents: string[];
  lineOffset: number;
}

async function writeAll(infos: Iterable<FileInfo>): Promise<void> {
  for (const info of infos) {
    await fs.writeFile(info.name, Buffer.from(info.contents.join(EOL), "utf-8"));
  }
}

async function replaceSnippetsWithNew(
  locations: SnippetLocationInfo[],
  snippets: Map<string, SnippetDefinition>
): Promise<boolean> {
  const files = new Set(locations.map((l) => l.absoluteFilePath));
  const fileInfos = new Map<string, FileInfo>();

  for (const f of files) {
    fileInfos.set(f, {
      name: f,
      contents: (await fs.readFile(f)).toString("utf-8").split(/\r?\n/),
      lineOffset: 0,
    });
  }

  let hadError = false;

  for (const location of locations) {
    let { contents, lineOffset } = fileInfos.get(location.absoluteFilePath)!;

    const snippetDefinition = snippets.get(location.name);

    if (!snippetDefinition) {
      log.error(
        `No matching snippet found for ${location.absoluteFilePath}:${location.lineRange[0]} (${location.name})`
      );
      hadError = true;
      continue;
    }

    let snippet: string[];

    if (location.language === "js") {
      snippet = snippetDefinition.convert();
    } else {
      snippet = snippetDefinition.typescriptSourceText;
    }

    const originalLineLength = location.lineRange[1] - location.lineRange[0] - 1;
    let newContents = contents.slice(0, lineOffset + location.lineRange[0] + 1);
    newContents.push(...snippet.map((line) => (location.linePrefix + line).trimEnd()));
    newContents.push(...contents.slice(lineOffset + location.lineRange[1]));
    fileInfos.set(location.absoluteFilePath, {
      name: location.absoluteFilePath,
      contents: newContents,
      lineOffset: lineOffset + (snippet.length - originalLineLength),
    });
  }

  if (!hadError) {
    await writeAll(fileInfos.values());
  }

  return !hadError;
}

export default leafCommand(commandInfo, async (_) => {
  const project = await resolveProject(process.cwd());

  let snippetLocations: SnippetLocationInfo[];

  try {
    snippetLocations = await findAllSnippets(project);
  } catch {
    return false;
  }

  const snippetDefinitions = await parseSnippets(project);

  return replaceSnippetsWithNew(snippetLocations, snippetDefinitions);
});
