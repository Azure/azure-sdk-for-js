const fs = require("fs");
const ts = require("typescript");
const path = require("path");

// Copied from https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API#incremental-build-support-using-the-language-services
function getLanguageService(rootFileNames, options) {
  const files = {};

  // initialize the list of files
  rootFileNames.forEach((fileName) => {
    files[fileName] = { version: 0 };
  });

  // Create the language service host to allow the LS to communicate with the host
  const servicesHost = {
    getScriptFileNames: () => rootFileNames,
    getScriptVersion: (fileName) => files[fileName] && files[fileName].version.toString(),
    getScriptSnapshot: (fileName) => {
      if (!fs.existsSync(fileName)) {
        return undefined;
      }

      return ts.ScriptSnapshot.fromString(fs.readFileSync(fileName).toString());
    },
    getCurrentDirectory: () => process.cwd(),
    getCompilationSettings: () => options,
    getDefaultLibFileName: (options) => ts.getDefaultLibFilePath(options),
    fileExists: ts.sys.fileExists,
    readFile: ts.sys.readFile,
    readDirectory: ts.sys.readDirectory
  };

  // Create the language service files
  const services = ts.createLanguageService(servicesHost, ts.createDocumentRegistry());

  return services;
}

const tsconfigPath = "tsconfig.json";
const basePath = path.resolve(path.dirname(tsconfigPath));
const parseJsonResult = ts.parseConfigFileTextToJson(
  tsconfigPath,
  fs.readFileSync(tsconfigPath, { encoding: "utf8" })
);
const tsConfig = ts.parseJsonConfigFileContent(parseJsonResult.config, ts.sys, basePath);
const services = getLanguageService(tsConfig.fileNames, tsConfig.options);

// For each non-typings file
tsConfig.fileNames
  .filter((f) => !f.endsWith(".d.ts"))
  .forEach((file) => {
    const source = ts.createSourceFile(file, fs.readFileSync(file, { encoding: "utf8" }));
    ts.forEachChild(source, (node) => {
      if (ts.isClassDeclaration(node)) {
        // For each class member
        node.members.forEach((member) => {
          // If member is marked as public
          if (ts.getCombinedModifierFlags(member) & ts.ModifierFlags.Public && member.name) {
            // +7 is a temp hack to get the member name (skips the string "public ")
            const references = services.findReferences(file, member.name.pos + 7);
            if (
              references &&
              references.length > 0 &&
              references[0] &&
              references[0].references &&
              references[0].references.length === 1
            ) {
              console.error(`File: ${file} , Member: ${member.name.text}`);
            }
          }
        });
      }
    });
  });
