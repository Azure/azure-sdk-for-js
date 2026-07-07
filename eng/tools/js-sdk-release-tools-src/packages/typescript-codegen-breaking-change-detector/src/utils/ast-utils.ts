import {
  EnumDeclaration,
  InterfaceDeclaration,
  Node,
  SyntaxKind,
  TypeAliasDeclaration,
  TypeReferenceNode,
  createWrappedNode,
  TypeNode,
  ParameterDeclaration,
  SymbolFlags,
  Symbol,
  CallSignatureDeclaration,
  ConstructorDeclaration,
} from 'ts-morph';
import { ParserServices, ParserServicesWithTypeInformation } from '@typescript-eslint/typescript-estree';
import { Scope, ScopeManager } from '@typescript-eslint/scope-manager';

import { RenameAbleDeclarations } from '../azure/common/types';
import { TSESTree } from '@typescript-eslint/types';
import { findVariable } from '@typescript-eslint/utils/ast-utils';
import { logger } from '../logging/logger';

function tryFindDeclaration<TNode extends TSESTree.Node>(
  name: string,
  scope: Scope,
  typeGuard: ((node: TSESTree.Node) => node is TNode) | undefined,
  shouldLog: boolean = true
): TNode | undefined {
  const variable = findVariable(scope as Scope, name);
  const node = variable?.defs?.[0]?.node;
  if (!node) {
    if (shouldLog) logger.warn(`Failed to find ${name}'s declaration`);
    return undefined;
  }
  if (typeGuard && !typeGuard(node)) {
    if (shouldLog) logger.warn(`Found ${name}'s declaration but with another node type "${node.type}"`);
    return undefined;
  }
  return node as TNode;
}

function getAllTypeReferencesInNode(node: Node, found: Set<string>) {
  const types: TypeReferenceNode[] = [];
  if (!node) return types;
  node.forEachChild((child) => {
    if (Node.isTypeReference(child) && !found.has(child.getText())) {
      types.push(child);
    }

    const childTypes = getAllTypeReferencesInNode(child, found);
    childTypes.forEach((c) => {
      types.push(c);
    });
  });
  return types;
}

function updateRenameAbleDeclarations(
  declaration: TypeAliasDeclaration | InterfaceDeclaration | EnumDeclaration,
  renameAbleDeclarations: RenameAbleDeclarations,
  found: Set<string>
) {
  const foundDeclarations = new Set<string>(
    [...renameAbleDeclarations.interfaces, ...renameAbleDeclarations.typeAliases, ...renameAbleDeclarations.enums].map(
      (i) => i.getName()
    )
  );
  if (foundDeclarations.has(declaration.getName())) return;
  switch (declaration.getKind()) {
    case SyntaxKind.InterfaceDeclaration:
      renameAbleDeclarations.interfaces.push(declaration as InterfaceDeclaration);
      break;
    case SyntaxKind.TypeAliasDeclaration:
      renameAbleDeclarations.typeAliases.push(declaration as TypeAliasDeclaration);
      break;
    case SyntaxKind.EnumDeclaration:
      renameAbleDeclarations.enums.push(declaration as EnumDeclaration);
      break;
  }
  found.add(declaration.getName());
}

function findDeclarationOfTypeReference(
  reference: TypeReferenceNode,
  scope: Scope,
  service: ParserServicesWithTypeInformation
): (TypeAliasDeclaration | InterfaceDeclaration | EnumDeclaration) | undefined {
  const esDeclaration = tryFindDeclaration(reference.getText(), scope, undefined, false);
  if (!esDeclaration) return;
  const msDeclaration = convertToMorphNode(esDeclaration, service);
  const msDeclarationKind = msDeclaration.getKind();
  if (
    msDeclarationKind !== SyntaxKind.InterfaceDeclaration &&
    msDeclarationKind !== SyntaxKind.TypeAliasDeclaration &&
    msDeclarationKind !== SyntaxKind.EnumDeclaration
  )
    return;
  const declaration = msDeclaration as TypeAliasDeclaration | InterfaceDeclaration | EnumDeclaration;
  return declaration;
}

function findAllRenameAbleDeclarationsInNodeCore(
  node: Node,
  scope: Scope,
  service: ParserServicesWithTypeInformation,
  renameAbleDeclarations: RenameAbleDeclarations,
  found: Set<string>
): void {
  if (!node) return;

  const references = getAllTypeReferencesInNode(node, found);
  references.forEach((reference) => {
    const declaration = findDeclarationOfTypeReference(reference, scope, service);
    if (!declaration) return;
    updateRenameAbleDeclarations(declaration, renameAbleDeclarations, found);
    findAllRenameAbleDeclarationsInNodeCore(declaration, scope, service, renameAbleDeclarations, found);
  });
}

export function getGlobalScope(scopeManager: ScopeManager | null): Scope {
  const globalScope = scopeManager?.globalScope;
  if (!globalScope) throw new Error(`Failed to find global scope`);
  return globalScope;
}

export function findDeclaration<TNode extends TSESTree.Node>(
  name: string,
  scope: Scope,
  typeGuard: (node: TSESTree.Node) => node is TNode
): TNode {
  const node = tryFindDeclaration(name, scope, typeGuard);
  if (!node) throw new Error(`Failed to find "${name}"`);
  return node;
}

export function isParseServiceWithTypeInfo(service: ParserServices): service is ParserServicesWithTypeInformation {
  return service.program !== null;
}

export function isInterfaceDeclarationNode(node: TSESTree.Node): node is TSESTree.TSInterfaceDeclaration {
  return node.type === TSESTree.AST_NODE_TYPES.TSInterfaceDeclaration;
}

export function convertToMorphNode(node: TSESTree.Node, service: ParserServicesWithTypeInformation) {
  const tsNode = service.esTreeNodeToTSNodeMap.get(node);
  const typeChecker = service.program.getTypeChecker();
  const moNode = createWrappedNode(tsNode, { typeChecker });
  return moNode;
}

export function findAllRenameAbleDeclarationsInNode(
  node: Node,
  scope: Scope,
  service: ParserServicesWithTypeInformation
): { interfaces: InterfaceDeclaration[]; typeAliases: TypeAliasDeclaration[]; enums: EnumDeclaration[] } {
  const renameAbleDeclarations: RenameAbleDeclarations = {
    interfaces: [],
    typeAliases: [],
    enums: [],
  };
  const found = new Set<string>();
  findAllRenameAbleDeclarationsInNodeCore(node, scope, service, renameAbleDeclarations, found);
  return renameAbleDeclarations;
}

export function getCallableEntityReturnTypeNode(node: Node): TypeNode | undefined {
  switch (node.getKind()) {
    case SyntaxKind.MethodSignature:
      return node.asKindOrThrow(SyntaxKind.MethodSignature).getReturnTypeNode();
    case SyntaxKind.FunctionDeclaration:
      return node.asKindOrThrow(SyntaxKind.FunctionDeclaration).getReturnTypeNode();
    case SyntaxKind.PropertySignature:
      return node.asKindOrThrow(SyntaxKind.PropertySignature).getTypeNode();
    case SyntaxKind.CallSignature:
      return node.asKindOrThrow(SyntaxKind.CallSignature).getReturnTypeNode();
    default:
      throw new Error(`Unsupported function kind: ${node.getKindName()}`);
  }
}

export function getCallableEntityReturnTypeNodeFromSymbol(symbol: Symbol): TypeNode | undefined {
  const node = symbol.getValueDeclarationOrThrow();
  return getCallableEntityReturnTypeNode(node);
}

export function getCallableEntityParameters(node: Node): ParameterDeclaration[] {
  switch (node.getKind()) {
    case SyntaxKind.MethodSignature:
      return node.asKindOrThrow(SyntaxKind.MethodSignature).getParameters();
    case SyntaxKind.FunctionDeclaration:
      return node.asKindOrThrow(SyntaxKind.FunctionDeclaration).getParameters();
    case SyntaxKind.PropertySignature:
      return getCallableEntityReturnTypeNode(node)?.asKindOrThrow(SyntaxKind.FunctionType).getParameters() ?? [];
    case SyntaxKind.CallSignature:
      return node.asKindOrThrow(SyntaxKind.CallSignature).getParameters();
    case SyntaxKind.MethodDeclaration:
      return node.asKindOrThrow(SyntaxKind.MethodDeclaration).getParameters();
    case SyntaxKind.PropertyDeclaration:
      return (
        node
          .asKindOrThrow(SyntaxKind.PropertyDeclaration)
          .getTypeNode()
          ?.asKindOrThrow(SyntaxKind.FunctionType)
          .getParameters() ?? []
      );
    default:
      throw new Error(`Unsupported function kind: ${node.getKindName()}`);
  }
}

export function getCallableEntityParametersFromSymbol(symbol: Symbol): ParameterDeclaration[] {
  const node = symbol.getValueDeclarationOrThrow();
  return getCallableEntityParameters(node);
}

// Note: return true when parameters list is the same in name and type
export function isSameCallSignatureLikeDeclaration<T extends CallSignatureDeclaration | ConstructorDeclaration>(
  left: T,
  right: T
): boolean {
  const leftReturnType = left.getReturnTypeNode()?.getType();
  const rightReturnType = right.getReturnTypeNode()?.getType();
  if (
    leftReturnType &&
    rightReturnType &&
    (!leftReturnType.isAssignableTo(rightReturnType) || !rightReturnType.isAssignableTo(leftReturnType))
  ) {
    return false;
  }

  if (left.getTypeParameters().length !== right.getTypeParameters().length) return false;
  if (left.getParameters().length !== right.getParameters().length) return false;

  const isEveryParameterSame = left.getParameters().filter((leftParameter, i) => {
    const rightParameter = right.getParameters()[i];

    const leftParaType = leftParameter.getType();
    const rightParaType = rightParameter.getType();
    if (!leftParaType && !rightParaType) return true;
    if (!leftParaType || !rightParaType) return false;
    if (!leftParaType.isAssignableTo(rightParaType) || !rightParaType.isAssignableTo(leftParaType)) return false;
    return true;
  });
  return isEveryParameterSame.length === left.getParameters().length;
}

export function isPropertyMethod(p: Symbol) {
  const node = p.getValueDeclaration();
  return node && (node.getKind() === SyntaxKind.MethodSignature || node.getKind() === SyntaxKind.MethodDeclaration);
}

export function isPropertyArrowFunction(p: Symbol) {
  const node = p.getValueDeclaration();
  return (
    node &&
    (node.getKind() === SyntaxKind.PropertySignature || node.getKind() === SyntaxKind.PropertyDeclaration) &&
    Node.isTyped(node) &&
    node.getTypeNodeOrThrow().isKind(SyntaxKind.FunctionType)
  );
}

export function isMethodOrArrowFunction(p: Symbol) {
  return isPropertyMethod(p) || isPropertyArrowFunction(p);
}
