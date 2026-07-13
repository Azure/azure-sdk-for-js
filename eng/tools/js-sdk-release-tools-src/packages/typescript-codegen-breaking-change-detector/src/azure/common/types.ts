import { RuleListener, RuleModule } from '@typescript-eslint/utils/eslint-utils';

import { ParserServices } from '@typescript-eslint/parser';
import type { ScopeManager } from '@typescript-eslint/scope-manager';
import { TSESTree } from '@typescript-eslint/utils';
import type { VisitorKeys } from '@typescript-eslint/visitor-keys';
import {
  EnumDeclaration,
  InterfaceDeclaration,
  SourceFile,
  TypeAliasDeclaration,
  Node,
  CallSignatureDeclaration,
  ConstructorDeclaration,
} from 'ts-morph';

export interface ParseForESLintResult {
  ast: TSESTree.Program & {
    range?: [number, number];
    tokens?: TSESTree.Token[];
    comments?: TSESTree.Comment[];
  };
  services: ParserServices;
  visitorKeys: VisitorKeys;
  scopeManager: ScopeManager;
}

export interface CreateOperationRule {
  (baselineParsedResult: ParseForESLintResult | undefined): RuleModule<'default', readonly unknown[], RuleListener>;
}

export interface RuleMessage {
  id: string;
  kind: RuleMessageKind;
}

export enum RuleMessageKind {
  InlineDeclarationNameSetMessage = 'InlineDeclarationNameSetMessage',
}

export interface InlineDeclarationNameSetMessage extends RuleMessage {
  baseline: Map<string, NodeContext>;
  current: Map<string, NodeContext>;
  kind: RuleMessageKind.InlineDeclarationNameSetMessage;
}

export interface LinterSettings {
  reportInlineDeclarationNameSetMessage(message: InlineDeclarationNameSetMessage): void;
}

export interface NodeContext {
  node: InterfaceDeclaration | TypeAliasDeclaration | EnumDeclaration;
  used: boolean;
}

export interface RenameAbleDeclarations {
  interfaces: InterfaceDeclaration[];
  typeAliases: TypeAliasDeclaration[];
  enums: EnumDeclaration[];
}

export interface AstContext {
  baseline: SourceFile;
  current: SourceFile;
}

// TODO: support more node types
export interface NameNode {
  name: string;
  node: Node;
}

export enum DiffReasons {
  None = 0,

  // breaking changes
  Removed = 1,
  TypeChanged = 2,
  CountChanged = 4,
  RequiredToOptional = 8,
  OptionalToRequired = 16,
  ReadonlyToMutable = 32,
  MutableToReadonly = 64,

  // new features
  Added = 1024,

  // should not reach here
  NotComparable = 2048,
}

// TODO: add related locations for convienience
export interface DiffPair {
  target?: NameNode;
  source?: NameNode;
  location: DiffLocation;
  reasons: DiffReasons;
  assignDirection: AssignDirection;
}

// NOTE: When there is a '_', the first word indicate the node type
export enum DiffLocation {
  None,
  // NOTE: Signatue includes method/arrow-function/call-signature in interface
  //       Signatue includes method/arrow-function/constructor class
  //       Signatue includes function/arrow-function
  Signature,
  Signature_Overload,
  Signature_ReturnType,
  Signature_ParameterList,
  Parameter,
  Property,
  TypeAlias,
  Interface,
  Class,
  Enum,
  EnumMember,
}

export enum AssignDirection {
  None,
  BaselineToCurrent, // e.g. input model
  CurrentToBaseline, // e.g. output model
}

export type CallSignatureLikeDeclaration = CallSignatureDeclaration | ConstructorDeclaration;

export type FindMappingCallSignatureLikeDeclaration<T extends CallSignatureLikeDeclaration> = (
  target: T,
  declarations: T[]
) => { declaration: T; id: string } | undefined;

export interface DeclarationDifferenceDetectorOptions {
    RequiredToOptionalAsBreakingChange: boolean;
    OptionalToRequiredAsBreakingChange: boolean;
    ReadonlyToMutableAsBreakingChange: boolean;
    MutableToReadonlyAsBreakingChange: boolean;
    ConcretTypeToAnyAsBreakingChange: boolean;
}
