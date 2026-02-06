// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import type {
  FunctionDeclarationOverloadStructure,
  FunctionDeclarationStructure,
  MethodDeclarationOverloadStructure,
  MethodDeclarationStructure,
  ConstructorDeclarationOverloadStructure,
  ConstructorDeclarationStructure} from "ts-morph";
import {
  StructureKind
} from "ts-morph";

export function isOverload(
  method: ConstructorDeclarationStructure | ConstructorDeclarationOverloadStructure,
): method is ConstructorDeclarationOverloadStructure;
export function isOverload(
  method: FunctionDeclarationStructure | FunctionDeclarationOverloadStructure,
): method is FunctionDeclarationOverloadStructure;
export function isOverload(
  method: MethodDeclarationStructure | MethodDeclarationOverloadStructure,
): method is MethodDeclarationOverloadStructure;
export function isOverload(
  method:
    | ConstructorDeclarationStructure
    | ConstructorDeclarationOverloadStructure
    | MethodDeclarationStructure
    | MethodDeclarationOverloadStructure
    | FunctionDeclarationStructure
    | FunctionDeclarationOverloadStructure,
): method is FunctionDeclarationOverloadStructure | MethodDeclarationOverloadStructure {
  return (
    method.kind === StructureKind.MethodOverload ||
    method.kind === StructureKind.FunctionOverload ||
    method.kind === StructureKind.ConstructorOverload
  );
}
