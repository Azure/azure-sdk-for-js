// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import {
  ClassDeclaration,
  FunctionDeclaration,
  InterfaceDeclaration,
  TypeAliasDeclaration,
} from "ts-morph";

export type Declaration =
  | FunctionDeclaration
  | ClassDeclaration
  | InterfaceDeclaration
  | TypeAliasDeclaration;
