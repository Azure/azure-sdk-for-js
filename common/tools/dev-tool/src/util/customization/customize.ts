// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import { copyFile, cp, mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "../pathUtil";
import {
  Project,
  FunctionDeclaration,
  ClassDeclaration,
  InterfaceDeclaration,
  TypeAliasDeclaration,
  SourceFile,
  ImportDeclaration,
} from "ts-morph";
import { augmentFunctions } from "./functions";
import { augmentClasses } from "./classes";
import { augmentInterfaces } from "./interfaces";
import { sortSourceFileContents } from "./helpers/preformat";
import { addHeaderToFiles } from "./helpers/addFileHeaders";
import { resolveProject } from "../resolveProject";
import { augmentTypeAliases } from "./aliases";
import { setCustomizationState, resetCustomizationState } from "./state";
import { getNewCustomFiles } from "./helpers/files";
import { augmentImports } from "./imports";
import { format } from "../prettier";
import { augmentExports } from "./exports";

let outputProject = new Project();

export async function customize(originalDir: string, customDir: string, outDir: string) {
  // Initialize the state
  setCustomizationState({ customDir, originalDir, outDir });
  // Bring everything from original into the output
  await cp(originalDir, outDir, { recursive: true });

  if (!(await directoryExists(customDir))) {
    return;
  }

  // Bring files only present in custom into the output
  await copyFilesInCustom(originalDir, customDir, outDir);

  const projectInfo = await resolveProject(process.cwd());

  outputProject = new Project({
    tsConfigFilePath: path.join(projectInfo.path, "tsconfig.json"),
    libFolderPath: path.join(projectInfo.path, "node_modules", "typescript", "lib"),
  });
  // Merge the module declarations for all files in the custom directory and its subdirectories
  await processDirectory(customDir, outDir);

  // Add file headers
  await addHeaderToFiles(outDir);

  // reset the state at the end.
  resetCustomizationState();
}

async function directoryExists(path: string) {
  try {
    const stats = await stat(path);
    return stats.isDirectory();
  } catch (error: unknown) {
    if (error instanceof Object && (error as Record<string, unknown>).code === "ENOENT") {
      return false; // Directory does not exist
    } else {
      throw error; // Other error occurred, propagate it
    }
  }
}

async function copyFilesInCustom(originalDir: string, customDir: string, outDir: string) {
  const filesToCopy = await getNewCustomFiles(originalDir, customDir);

  for (const file of filesToCopy) {
    const sourcePath = file;
    const destPath = file.replace(customDir, outDir);
    await mkdir(path.dirname(destPath), { recursive: true });
    await copyFile(sourcePath, destPath);
  }
}

type CustomDeclarationsMap = {
  functions: Map<string, FunctionDeclaration>;
  classes: Map<string, ClassDeclaration>;
  interfaces: Map<string, InterfaceDeclaration>;
  typeAliases: Map<string, TypeAliasDeclaration>;
  imports: Map<string, ImportDeclaration>;
};

export async function readFileContent(filepath: string): Promise<string> {
  return await readFile(filepath, "utf8");
}

export async function writeFileContent(filepath: string, content: string): Promise<void> {
  const formattedContent = await format(content, "typescript");
  await writeFile(filepath, formattedContent);
}

export function getOriginalDeclarationsMap(sourceFile: SourceFile): CustomDeclarationsMap {
  const originalDeclarationsMap: CustomDeclarationsMap = {
    functions: new Map<string, FunctionDeclaration>(),
    classes: new Map<string, ClassDeclaration>(),
    interfaces: new Map<string, InterfaceDeclaration>(),
    typeAliases: new Map<string, TypeAliasDeclaration>(),
    imports: new Map<string, ImportDeclaration>(),
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

  for (const originalImport of sourceFile.getImportDeclarations()) {
    originalDeclarationsMap.imports.set(originalImport.getModuleSpecifierValue(), originalImport);
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
  // since we copied over everything from the original directory to the output directory avoid
  // overwriting the original files.
  const entries = await readdir(customDir, { withFileTypes: true });

  for (const entry of entries) {
    const customPath = path.join(customDir, entry.name);
    const originalPath = path.join(originalDir, entry.name);

    if (entry.isFile() && path.extname(entry.name) === ".ts") {
      await processFile(customPath, originalPath);
    } else if (entry.isDirectory()) {
      const subCustomDir = path.join(customDir, entry.name);
      const subOutDir = path.join(originalDir, entry.name);
      await mkdir(subOutDir, { recursive: true });
      await processDirectory(subCustomDir, subOutDir);
    }
  }
}

export function mergeModuleDeclarations(
  customContent: { path: string; content: string },
  originalContent: { path: string; content: string },
): string {
  const project = new Project({ useInMemoryFileSystem: true });

  // Add the custom and out content as in-memory source files
  const customVirtualSourceFile = project.createSourceFile(
    customContent.path,
    customContent.content,
  );
  const originalVirtualSourceFile = outputProject.createSourceFile(
    originalContent.path,
    originalContent.content,
    { overwrite: true },
  );

  // Create a map of of all the available customizations in the current file.
  const originalDeclarationsMap = getOriginalDeclarationsMap(originalVirtualSourceFile);

  // Merge custom declarations into the out source file
  augmentFunctions(
    customVirtualSourceFile.getFunctions(),
    originalDeclarationsMap.functions,
    originalVirtualSourceFile,
  );

  augmentClasses(
    originalDeclarationsMap.classes,
    customVirtualSourceFile.getClasses(),
    originalVirtualSourceFile,
  );

  augmentInterfaces(
    originalDeclarationsMap.interfaces,
    customVirtualSourceFile.getInterfaces(),
    originalVirtualSourceFile,
  );

  augmentTypeAliases(
    originalDeclarationsMap.typeAliases,
    customVirtualSourceFile.getTypeAliases(),
    originalVirtualSourceFile,
  );

  augmentImports(
    originalDeclarationsMap.imports,
    customVirtualSourceFile.getImportDeclarations(),
    originalVirtualSourceFile,
  );

  augmentExports(customVirtualSourceFile, originalVirtualSourceFile);

  sortSourceFileContents(originalVirtualSourceFile);

  return originalVirtualSourceFile.getFullText();
}
