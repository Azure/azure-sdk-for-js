// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { FunctionDeclaration, SourceFile } from "ts-morph";
import { isOverload } from "./helpers/overloads";

export function augmentFunctions(
  customFunctions: FunctionDeclaration[],
  originalFunctions: Map<string, FunctionDeclaration>,
  originalFile: SourceFile
) {
  for (const customFunction of customFunctions) {
    const customFunctionName = customFunction.getName();
    const originalFunction = originalFunctions.get(customFunctionName ?? "");
    augmentFunction(customFunction, originalFunction, originalFile);
  }
}

export function augmentFunction(
  customFunction: FunctionDeclaration,
  originalFunction: FunctionDeclaration | undefined,
  originalFile: SourceFile
) {
  // If the custom function doesn't exist in the original file, we just need to add it

  if (!originalFunction) {
    addFunctionToFile(customFunction, originalFile);
    return;
  }

  // Original function with the same name exists so
  // we need to check if the custom method is using the original method
  // to determine if we need to augment or replace
  if (isAugmentingFunction(customFunction)) {
    convertToPrivateFunction(originalFunction, originalFile);
    addFunctionToFile(customFunction, originalFile);
  } else {
    // This is not using the original method so we'll replace it
    originalFunction.remove();
    addFunctionToFile(customFunction, originalFile);
  }
}

function isAugmentingFunction(fn: FunctionDeclaration): boolean {
  const customFunctionContent = fn.getBody()?.getFullText();
  const fnRegex = new RegExp(`_${fn.getName()}\\s*\\(`);
  if (customFunctionContent?.match(fnRegex)) {
    return true;
  }

  return false;
}

export function convertToPrivateFunction(
  originalFunction: FunctionDeclaration,
  originalFile: SourceFile
) {
  const functionStructure = originalFunction.getStructure();

  if (isOverload(functionStructure)) {
    return;
  }

  functionStructure.isExported = false;
  functionStructure.name = `_${functionStructure.name}`;
  functionStructure.isDefaultExport = false;

  originalFile.addFunction(functionStructure);

  originalFunction.remove();
}

export function addFunctionToFile(fn: FunctionDeclaration, file: SourceFile) {
  const functionStructure = fn.getStructure();

  // custom is adding a new function this is a new method on the class, we'll add it to original
  if (!isOverload(functionStructure)) {
    file.addFunction(functionStructure);
  }
}
