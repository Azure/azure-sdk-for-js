import * as fs from "fs-extra";
import * as path from "path";
import {
  Project,
  FunctionDeclaration,
  ClassDeclaration,
  InterfaceDeclaration,
  TypeAliasDeclaration,
  SourceFile,
} from "ts-morph";
import { augmentFunctions } from "./functions";
import { augmentClasses } from "./classes";
import { augmentInterfaces } from "./interfaces";
import { sortSourceFileContents } from "./helpers/preformat";
import { resolveProject } from "../resolveProject";

let outputProject = new Project();
export async function customize(originalDir: string, customDir: string, outDir: string) {
  // Bring everything from original into the output
  await fs.copy(originalDir, outDir);

  // Bring files only present in custom into the output
  copyFilesInCustom(originalDir, customDir, outDir);

  const projectInfo = await resolveProject(process.cwd());

  outputProject = new Project({
    tsConfigFilePath: path.join(projectInfo.path, "tsconfig.json"),
    libFolderPath: path.join(projectInfo.path, "node_modules", "typescript", "lib"),
  });
  // Merge the module declarations for all files in the custom directory and its subdirectories
  await processDirectory(customDir, outDir);
}

async function copyFilesInCustom(originalDir: string, customDir: string, outDir: string) {
  const filesInCustom = await getFiles(customDir);
  const filesInOriginal = await getFiles(originalDir);

  const filesToCopy = filesInCustom.filter(
    (file) =>
      !filesInOriginal.some((f) => f.replace(originalDir, "").includes(file.replace(customDir, "")))
  );

  console.log(filesToCopy);

  for (const file of filesToCopy) {
    const sourcePath = file;
    const destPath = file.replace(customDir, outDir);
    await fs.copyFile(sourcePath, destPath);
  }
}

async function getFiles(dir: string): Promise<string[]> {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    })
  );
  return files.flat() as string[];
}

type CustomDeclarationsMap = {
  functions: Map<string, FunctionDeclaration>;
  classes: Map<string, ClassDeclaration>;
  interfaces: Map<string, InterfaceDeclaration>;
  typeAliases: Map<string, TypeAliasDeclaration>;
};

export async function readFileContent(filepath: string): Promise<string> {
  return fs.readFile(filepath, "utf8");
}

export async function writeFileContent(filepath: string, content: string): Promise<void> {
  return fs.writeFile(filepath, content);
}

export function getOriginalDeclarationsMap(sourceFile: SourceFile): CustomDeclarationsMap {
  const originalDeclarationsMap: CustomDeclarationsMap = {
    functions: new Map<string, FunctionDeclaration>(),
    classes: new Map<string, ClassDeclaration>(),
    interfaces: new Map<string, InterfaceDeclaration>(),
    typeAliases: new Map<string, TypeAliasDeclaration>(),
  };

  // Collect custom declarations
  for (const originalFunction of sourceFile.getFunctions()) {
    const functionName = originalFunction.getName();
    if (!functionName) {
      // skip anonymous functions
      continue;
    }
    originalDeclarationsMap.functions.set(functionName, originalFunction);
  }
  for (const originalClass of sourceFile.getClasses()) {
    const className = originalClass.getName();
    if (!className) {
      // skip anonymous classes
      continue;
    }
    originalDeclarationsMap.classes.set(className, originalClass);
  }
  for (const originalInterface of sourceFile.getInterfaces()) {
    originalDeclarationsMap.interfaces.set(originalInterface.getName(), originalInterface);
  }
  for (const originalTypeAlias of sourceFile.getTypeAliases()) {
    originalDeclarationsMap.typeAliases.set(originalTypeAlias.getName(), originalTypeAlias);
  }

  return originalDeclarationsMap;
}

function removeTsIgnore(content: string): string {
  const tsIgnorePattern = /\/\/\s*@ts-ignore/g;
  return content.replace(tsIgnorePattern, "");
}

export async function processFile(customFilePath: string, originalFilePath: string): Promise<void> {
  const customContent = await readFileContent(customFilePath);
  const originalContent = await readFileContent(originalFilePath);

  const customFile = { path: customFilePath, content: customContent };
  const originalFile = { path: originalFilePath, content: originalContent };
  const mergedContent = mergeModuleDeclarations(customFile, originalFile);
  const cleanedContent = removeTsIgnore(mergedContent);

  await writeFileContent(originalFilePath, cleanedContent);
}

export async function processDirectory(customDir: string, originalDir: string): Promise<void> {
  // Note: the originalDir is in reality the output directory but for readability we call it originalDir
  // since we copied over eveything from the original directory to the output directory avoid
  // overwriting the original files.
  const entries = await fs.readdir(customDir, { withFileTypes: true });

  for (const entry of entries) {
    const customPath = path.join(customDir, entry.name);
    const originalPath = path.join(originalDir, entry.name);

    if (entry.isFile() && path.extname(entry.name) === ".ts") {
      await processFile(customPath, originalPath);
    } else if (entry.isDirectory()) {
      const subCustomDir = path.join(customDir, entry.name);
      const subOutDir = path.join(originalDir, entry.name);
      await fs.ensureDir(subOutDir);
      await processDirectory(subCustomDir, subOutDir);
    }
  }
}

export function mergeModuleDeclarations(
  customContent: { path: string; content: string },
  originalContent: { path: string; content: string }
): string {
  const project = new Project();

  // Add the custom and out content as in-memory source files
  const customVirtualSourceFile = project.createSourceFile("custom.ts", customContent.content);
  const originalVirtualSourceFile = outputProject.createSourceFile(
    originalContent.path,
    originalContent.content,
    { overwrite: true }
  );

  // Create a map of of all the available customizations in the current file.
  const originalDeclarationsMap = getOriginalDeclarationsMap(originalVirtualSourceFile);

  // Merge custom declarations into the out source file
  augmentFunctions(
    customVirtualSourceFile.getFunctions(),
    originalDeclarationsMap.functions,
    originalVirtualSourceFile
  );

  augmentClasses(
    originalDeclarationsMap.classes,
    customVirtualSourceFile.getClasses(),
    originalVirtualSourceFile
  );

  augmentInterfaces(
    originalDeclarationsMap.interfaces,
    customVirtualSourceFile.getInterfaces(),
    originalVirtualSourceFile
  );

  originalVirtualSourceFile.fixMissingImports();
  sortSourceFileContents(originalVirtualSourceFile);
  copyCustomImports(customVirtualSourceFile, originalVirtualSourceFile);
  return originalVirtualSourceFile.getFullText();
}

function copyCustomImports(customFile: SourceFile, originalFile: SourceFile) {
  for (const customImport of customFile.getImportDeclarations()) {
    if (customImport.isModuleSpecifierRelative()) {
      continue;
    }

    const originalImport = originalFile.getImportDeclaration(
      customImport.getModuleSpecifierValue()
    );

    if (!originalImport) {
      originalFile.addImportDeclaration(customImport.getStructure());
    }

    if (originalImport?.getNamespaceImport()) {
      continue;
    }

    const originalNamedImports = originalImport?.getNamedImports().map((i) => i.getName()) || [];

    const allImports = new Set<string>(originalNamedImports);
    for (const customNamedImport of customImport.getNamedImports()) {
      allImports.add(customNamedImport.getName());
    }

    originalImport?.removeNamedImports();
    originalImport?.addNamedImports(Array.from(allImports));
  }
  originalFile.organizeImports();
}
