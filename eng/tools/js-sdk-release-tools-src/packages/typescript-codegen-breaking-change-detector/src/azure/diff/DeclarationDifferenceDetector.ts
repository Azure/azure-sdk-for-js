// TODO: add test for interfaces
import {
  InterfaceDeclaration,
  Node,
  ParameterDeclaration,
  Signature,
  SyntaxKind,
  Symbol,
  SymbolFlags,
  FunctionDeclaration,
  TypeNode,
  TypeAliasDeclaration,
  CallSignatureDeclaration,
  ClassDeclaration,
  EnumDeclaration,
  EnumMember,
} from 'ts-morph';
import {
  DiffLocation,
  DiffPair,
  DiffReasons,
  FindMappingCallSignatureLikeDeclaration,
  AssignDirection,
  NameNode,
  CallSignatureLikeDeclaration,
  DeclarationDifferenceDetectorOptions,
} from '../common/types';
import {
  getCallableEntityParametersFromSymbol,
  isMethodOrArrowFunction,
  isPropertyArrowFunction,
  isPropertyMethod,
  isSameCallSignatureLikeDeclaration,
} from '../../utils/ast-utils';

export class DeclarationDifferenceDetector {
  constructor(private options: DeclarationDifferenceDetectorOptions) {}

  private findBreakingReasons(source: Node, target: Node): DiffReasons {
    // Note: if return type node defined,
    // it's a funtion/method/signature's return type node,
    // return it, it will be used to compare later
    // Otherwise, it's a non-funtion/method/signature node, return its type node
    const getTypeNode = (node: Node): TypeNode => {
      const symbol = node.getSymbol();
      const isTyped = Node.isTyped(node);
      if (symbol && isPropertyArrowFunction(symbol)) {
        if (isTyped) return node.getTypeNodeOrThrow().asKindOrThrow(SyntaxKind.FunctionType).getReturnTypeNodeOrThrow();
        else throw new Error(`Should not reach here: "${node.getText()}"`);
      }
      // Note: if the node is a constructor, the return type is the instance type
      if (Node.isReturnTyped(node)) return node.getReturnTypeNodeOrThrow();
      if (isTyped) return node.getTypeNodeOrThrow();
      throw new Error(`Unsupported ${node.getKindName()} node: "${node.getText()}"`);
    };
    let breakingReasons = DiffReasons.None;

    const targetTypeNode = getTypeNode(target);
    const sourceTypeNode = getTypeNode(source);

    // check if concrete type -> any. e.g. string -> any
    if (this.options.ConcretTypeToAnyAsBreakingChange) {
      const isConcretTypeToAny = this.canConvertConcretTypeToAny(targetTypeNode?.getKind(), sourceTypeNode?.getKind());
      if (isConcretTypeToAny) breakingReasons |= DiffReasons.TypeChanged;
    }

    // check type predicates
    if (
      targetTypeNode &&
      sourceTypeNode &&
      targetTypeNode.isKind(SyntaxKind.TypePredicate) &&
      sourceTypeNode.isKind(SyntaxKind.TypePredicate)
    ) {
      const getTypeName = (node: TypeNode) =>
        node.asKindOrThrow(SyntaxKind.TypePredicate).getTypeNodeOrThrow().getText();
      if (getTypeName(targetTypeNode) !== getTypeName(sourceTypeNode)) breakingReasons |= DiffReasons.TypeChanged;
    }

    // check type
    const assignable = sourceTypeNode.getType().isAssignableTo(targetTypeNode.getType());
    if (!assignable) breakingReasons |= DiffReasons.TypeChanged;

    // check required -> optional (from source to target)
    const isOptional = (node: Node) => node.getSymbolOrThrow().isOptional();
    if (this.options.RequiredToOptionalAsBreakingChange) {
      const incompatibleOptional = isOptional(target) && !isOptional(source);
      if (incompatibleOptional) breakingReasons |= DiffReasons.RequiredToOptional;
    }
    // check optional -> required (from source to target)
    if (this.options.OptionalToRequiredAsBreakingChange) {
      const incompatibleOptional = isOptional(source) && !isOptional(target);
      if (incompatibleOptional) breakingReasons |= DiffReasons.OptionalToRequired;
    }

    // check readonly -> mutable
    const isReadonly = (node: Node) => Node.isReadonlyable(node) && node.isReadonly();
    const incompatibleReadonly = isReadonly(target) && !isReadonly(source);
    if (incompatibleReadonly) breakingReasons |= DiffReasons.ReadonlyToMutable;

    return breakingReasons;
  }

  // TODO: fix target signature map to the same signatures
  private defaultFindMappingCallSignatureLikeDeclaration: FindMappingCallSignatureLikeDeclaration<CallSignatureLikeDeclaration> =
    (target: CallSignatureLikeDeclaration, declarations: CallSignatureLikeDeclaration[]) => {
      const declaration = declarations.find((s) => isSameCallSignatureLikeDeclaration(target, s));
      if (!declaration) return undefined;
      const id = declaration.getText();
      return { id, declaration };
    };

  private findCallSignatureLikeDeclarationBreakingChanges<T extends CallSignatureLikeDeclaration>(
    sourceDeclarations: T[],
    targetDeclarations: T[],
    findMappingConstructorLikeDeclaration: FindMappingCallSignatureLikeDeclaration<T>
  ): DiffPair[] {
    const pairs = targetDeclarations.reduce((result, targetDeclaration) => {
      const sourceContext = findMappingConstructorLikeDeclaration(targetDeclaration, sourceDeclarations);
      if (sourceContext) {
        const sourceDeclaration = sourceContext.declaration;
        // handle return type
        const returnPairs = this.findReturnTypeBreakingChangesCore(sourceDeclaration, targetDeclaration);
        if (returnPairs.length > 0) result.push(...returnPairs);

        // handle parameters
        const path = sourceContext.id;
        const parameterPairs = this.findParameterBreakingChangesCore(
          sourceDeclaration.getParameters(),
          targetDeclaration.getParameters(),
          path,
          path,
          sourceDeclaration,
          targetDeclaration
        );
        if (parameterPairs.length > 0) result.push(...parameterPairs);

        return result;
      }

      // not found
      const getNameNode = (n: T): NameNode => ({ name: n.getText(), node: n });
      const targetNameNode = getNameNode(targetDeclaration);
      const pair = this.createDiffPair(DiffLocation.Signature, DiffReasons.Removed, undefined, targetNameNode);
      result.push(pair);
      return result;
    }, new Array<DiffPair>());
    return pairs;
  }

  private getNameNodeFromSymbol(s: Symbol): NameNode {
    return { name: s.getName(), node: s.getValueDeclarationOrThrow() };
  }

  private getNameNodeFromNode(node?: Node): NameNode | undefined {
    if (!node) return undefined;
    const name = Node.hasName(node) ? node.getName() : node.getText();
    return { name, node };
  }

  private isClassicProperty(p: Symbol) {
    return (p.getFlags() & SymbolFlags.Property) !== 0 && !isMethodOrArrowFunction(p);
  }

  private canConvertConcretTypeToAny(targetKind: SyntaxKind | undefined, sourceKind: SyntaxKind | undefined) {
    return targetKind !== SyntaxKind.AnyKeyword && sourceKind === SyntaxKind.AnyKeyword;
  }

  private findClassicPropertyBreakingChanges(sourceProperty: Symbol, targetProperty: Symbol): DiffPair | undefined {
    const reasons = this.findBreakingReasons(
      sourceProperty.getValueDeclarationOrThrow(),
      targetProperty.getValueDeclarationOrThrow()
    );

    if (reasons === DiffReasons.None) return undefined;
    return this.createDiffPair(
      DiffLocation.Property,
      reasons,
      this.getNameNodeFromSymbol(sourceProperty),
      this.getNameNodeFromSymbol(targetProperty)
    );
  }

  private findPropertyBreakingChanges(sourceProperties: Symbol[], targetProperties: Symbol[]): DiffPair[] {
    const sourcePropMap = sourceProperties.reduce((map, p) => {
      map.set(p.getName(), p);
      return map;
    }, new Map<string, Symbol>());

    const removed = targetProperties.reduce((result, targetProperty) => {
      const name = targetProperty.getName();
      if (sourcePropMap.has(name)) {
        return result;
      }

      const isPropertyFunction = isMethodOrArrowFunction(targetProperty);
      const location = isPropertyFunction ? DiffLocation.Signature : DiffLocation.Property;
      const pair = this.createDiffPair(
        location,
        DiffReasons.Removed,
        undefined,
        this.getNameNodeFromSymbol(targetProperty)
      );
      result.push(pair);
      return result;
    }, new Array<DiffPair>());

    const changed = targetProperties.reduce((result, targetProperty) => {
      const name = targetProperty.getName();
      const sourceProperty = sourcePropMap.get(name);
      if (!sourceProperty) return result;

      const isTargetPropertyClassic = this.isClassicProperty(targetProperty);
      const isSourcePropertyClassic = this.isClassicProperty(sourceProperty);

      // handle different property kinds
      if (isTargetPropertyClassic !== isSourcePropertyClassic) {
        return [
          ...result,
          this.createDiffPair(
            DiffLocation.Signature,
            DiffReasons.TypeChanged,
            this.getNameNodeFromSymbol(sourceProperty),
            this.getNameNodeFromSymbol(targetProperty)
          ),
        ];
      }

      // handle classic property
      if (isTargetPropertyClassic && isSourcePropertyClassic) {
        const classicBreakingPair = this.findClassicPropertyBreakingChanges(sourceProperty, targetProperty);
        if (!classicBreakingPair) return result;
        return [...result, classicBreakingPair];
      }

      // handle method and arrow function
      if (
        (isPropertyMethod(targetProperty) || isPropertyArrowFunction(targetProperty)) &&
        (isPropertyMethod(sourceProperty) || isPropertyArrowFunction(sourceProperty))
      ) {
        const functionPropertyDetails = this.findFunctionPropertyBreakingChangeDetails(sourceProperty, targetProperty);
        return [...result, ...functionPropertyDetails];
      }

      throw new Error('Should never reach here');
    }, new Array<DiffPair>());
    return [...removed, ...changed];
  }

  private findReturnTypeBreakingChangesCore(source: Node, target: Node): DiffPair[] {
    const getName = (node: Node) => (Node.hasName(node) ? node.getName() : node.getText());
    const targetNameNode = target ? { name: getName(target), node: target } : undefined;
    const sourceNameNode = source ? { name: getName(source), node: source } : undefined;

    const isSourceConstructorDeclaration = Node.isConstructorDeclaration(source);
    const isTargetConstructorDeclaration = Node.isConstructorDeclaration(target);
    if (isSourceConstructorDeclaration !== isTargetConstructorDeclaration) {
      const pair = this.createDiffPair(
        DiffLocation.Signature,
        DiffReasons.NotComparable,
        sourceNameNode,
        targetNameNode
      );
      return [pair];
    }
    if (isSourceConstructorDeclaration) return [];

    const reasons = this.findBreakingReasons(source, target);
    if (reasons === DiffReasons.None) return [];
    const pair = this.createDiffPair(DiffLocation.Signature_ReturnType, reasons, sourceNameNode, targetNameNode);
    return [pair];
  }

  private findReturnTypeBreakingChanges(sourceMethod: Symbol, targetMethod: Symbol): DiffPair[] {
    const targetDeclaration = targetMethod.getValueDeclarationOrThrow();
    const sourceDeclaration = sourceMethod.getValueDeclarationOrThrow();
    return this.findReturnTypeBreakingChangesCore(sourceDeclaration, targetDeclaration);
  }

  private findParameterBreakingChangesCore(
    sourceParameters: ParameterDeclaration[],
    targetParameters: ParameterDeclaration[],
    sourceName: string,
    targetName: string,
    sourceNode: Node,
    targetNode: Node
  ): DiffPair[] {
    const pairs: DiffPair[] = [];

    // handle parameter counts
    const isSameParameterCount = targetParameters.length === sourceParameters.length;
    if (!isSameParameterCount) {
      const source = { name: sourceName, node: sourceNode };
      const target = { name: targetName, node: targetNode };
      const pair = this.createDiffPair(DiffLocation.Signature_ParameterList, DiffReasons.CountChanged, source, target);
      pairs.push(pair);
      return pairs;
    }

    // NOTE: parameter count is the same
    // handle each parameter
    targetParameters.forEach((targetParameter, i) => {
      const sourceParameter = sourceParameters[i];
      const getParameterNameNode = (p: ParameterDeclaration | undefined) =>
        p ? { name: p.getName() || '', node: p } : undefined;
      const target = getParameterNameNode(targetParameter);
      const source = getParameterNameNode(sourceParameter);
      const reasons = this.findBreakingReasons(sourceParameter, targetParameter);
      const pair = this.createDiffPair(DiffLocation.Parameter, reasons, source, target);
      pair.reasons = this.findBreakingReasons(sourceParameter, targetParameter);
      if (pair.reasons !== DiffReasons.None) pairs.push(pair);
    });

    return pairs;
  }

  // TODO: not support for overloads
  private findParameterBreakingChanges(sourceMethod: Symbol, targetMethod: Symbol): DiffPair[] {
    const targetParameters = getCallableEntityParametersFromSymbol(targetMethod);
    const sourceParameters = getCallableEntityParametersFromSymbol(sourceMethod);
    return this.findParameterBreakingChangesCore(
      sourceParameters,
      targetParameters,
      sourceMethod.getName(),
      targetMethod.getName(),
      sourceMethod.getValueDeclarationOrThrow(),
      targetMethod.getValueDeclarationOrThrow()
    );
  }

  private findFunctionPropertyBreakingChangeDetails(sourceMethod: Symbol, targetMethod: Symbol): DiffPair[] {
    const returnTypePairs = this.findReturnTypeBreakingChanges(sourceMethod, targetMethod);
    const parameterPairs = this.findParameterBreakingChanges(sourceMethod, targetMethod);
    return [...returnTypePairs, ...parameterPairs];
  }

  private updateDiffPairForNewFeature(p: DiffPair): DiffPair {
    p.reasons = DiffReasons.Added;
    const temp = p.source;
    p.source = p.target;
    p.target = temp;
    return p;
  }

  // TODO: support readonly properties
  // TODO: add generic test case: parameter with generic, return type with generic
  public findInterfaceDifferences(
    source: InterfaceDeclaration,
    target: InterfaceDeclaration,
    findMappingCallSignature = this.defaultFindMappingCallSignatureLikeDeclaration
  ): DiffPair[] {
    const getDeclaration = (s: Signature): CallSignatureDeclaration =>
      s.getDeclaration().asKindOrThrow(SyntaxKind.CallSignature);

    const targetSignatures = target
      .getType()
      .getCallSignatures()
      .map((c) => getDeclaration(c));
    const sourceSignatures = source
      .getType()
      .getCallSignatures()
      .map((c) => getDeclaration(c));
    const callSignatureBreakingChanges = this.findCallSignatureLikeDeclarationBreakingChanges(
      sourceSignatures,
      targetSignatures,
      findMappingCallSignature
    );
    const callSignatureNewFeatures = this.findCallSignatureLikeDeclarationBreakingChanges(
      targetSignatures,
      sourceSignatures,
      findMappingCallSignature
    )
      .filter((p) => p.reasons === DiffReasons.Removed)
      .map(this.updateDiffPairForNewFeature);
    const targetProperties = target.getType().getProperties();
    const sourceProperties = source.getType().getProperties();
    const propertyBreakingChanges = this.findPropertyBreakingChanges(sourceProperties, targetProperties);
    const propertyNewFeatures = this.findPropertyBreakingChanges(targetProperties, sourceProperties)
      .filter((p) => p.reasons === DiffReasons.Removed)
      .map(this.updateDiffPairForNewFeature);

    return [
      ...callSignatureBreakingChanges,
      ...callSignatureNewFeatures,
      ...propertyBreakingChanges,
      ...propertyNewFeatures,
    ];
  }

  // TODO: detect static properties and methods
  public findClassDifferences(source: ClassDeclaration, target: ClassDeclaration) {
    const getConstructors = (node: ClassDeclaration) => {
      return node.getChildSyntaxList()?.getChildrenOfKind(SyntaxKind.Constructor) ?? [];
    };
    const sourceConstructors = getConstructors(source);
    const targetConstructors = getConstructors(target);

    // find constructor breaking changes
    const constructorBreakingChanges = this.findCallSignatureLikeDeclarationBreakingChanges(
      sourceConstructors,
      targetConstructors,
      this.defaultFindMappingCallSignatureLikeDeclaration
    );

    const constructorNewFeatures = this.findCallSignatureLikeDeclarationBreakingChanges(
      targetConstructors,
      sourceConstructors,
      this.defaultFindMappingCallSignatureLikeDeclaration
    )
      .filter((p) => p.reasons === DiffReasons.Removed)
      .map(this.updateDiffPairForNewFeature);

    const targetProperties = target.getType().getProperties();
    const sourceProperties = source.getType().getProperties();
    const propertyBreakingChanges = this.findPropertyBreakingChanges(sourceProperties, targetProperties);
    const propertyNewFeatures = this.findPropertyBreakingChanges(targetProperties, sourceProperties)
      .filter((p) => p.reasons === DiffReasons.Removed)
      .map(this.updateDiffPairForNewFeature);

    return [
      ...constructorBreakingChanges,
      ...constructorNewFeatures,
      ...propertyBreakingChanges,
      ...propertyNewFeatures,
    ];
  }

  private findRemovedFunctionOverloads(
    sourceOverloads: FunctionDeclaration[],
    targetOverloads: FunctionDeclaration[]
  ): FunctionDeclaration[] {
    const overloads = targetOverloads.filter((t) => {
      const compatibleSourceFunction = sourceOverloads.find((s) => {
        // NOTE: isTypeAssignableTo does not work for overloads
        const returnTypePairs = [
          ...this.findReturnTypeBreakingChangesCore(s, t),
          ...this.findReturnTypeBreakingChangesCore(t, s),
        ];
        if (returnTypePairs.length > 0) return false;
        const parameterPairs = [
          ...this.findParameterBreakingChangesCore(s.getParameters(), t.getParameters(), '', '', s, t),
          ...this.findParameterBreakingChangesCore(t.getParameters(), s.getParameters(), '', '', t, s),
        ];
        return parameterPairs.length === 0;
      });
      return compatibleSourceFunction === undefined;
    });
    return overloads;
  }

  // TODO: move public function before private
  // TODO: support arrow function
  public findFunctionDifferences(source: FunctionDeclaration, target: FunctionDeclaration): DiffPair[] {
    const sourceOverloads = source.getOverloads();
    const targetOverloads = target.getOverloads();

    // private has overloads
    if (sourceOverloads.length > 1 || targetOverloads.length > 1) {
      const removedPairs = this.findRemovedFunctionOverloads(sourceOverloads, targetOverloads).map((t) =>
        this.createDiffPair(DiffLocation.Signature_Overload, DiffReasons.Removed, undefined, {
          name: t.getName()!,
          node: t,
        })
      );

      const addedPairs = this.findRemovedFunctionOverloads(targetOverloads, sourceOverloads).map(
        (t) =>
          this.createDiffPair(DiffLocation.Signature_Overload, DiffReasons.Added, {
            name: t.getName()!,
            node: t,
          }),
        undefined
      );
      return [...removedPairs, ...addedPairs];
    }

    // private has no overloads
    const returnTypePairs = this.findReturnTypeBreakingChangesCore(source, target);

    const parameterPairs = this.findParameterBreakingChangesCore(
      source.getParameters(),
      target.getParameters(),
      source.getName()!,
      target.getName()!,
      source,
      target
    );

    return [...returnTypePairs, ...parameterPairs];
  }

  public findTypeAliasBreakingChanges(source: TypeAliasDeclaration, target: TypeAliasDeclaration): DiffPair[] {
    if (source.getType().isAssignableTo(target.getType()) && target.getType().isAssignableTo(source.getType()))
      return [];

    let sourceNameNode: NameNode = { name: source.getName(), node: source };
    let targetNameNode: NameNode = { name: target.getName(), node: target };
    return [this.createDiffPair(DiffLocation.TypeAlias, DiffReasons.TypeChanged, sourceNameNode, targetNameNode)];
  }

  public findEnumDifferences(source: EnumDeclaration, target: EnumDeclaration): DiffPair[] {
    const sourceMembers = source.getMembers();
    const targetMembers = target.getMembers();

    const sourceMemberMap = new Map<string, EnumMember>(sourceMembers.map((m) => [m.getName(), m]));
    const targetMemberMap = new Map<string, EnumMember>(targetMembers.map((m) => [m.getName(), m]));

    // check removed members
    const removedPairs = targetMembers.reduce((result, targetMember) => {
      if (!sourceMemberMap.has(targetMember.getName())) {
        const pair = this.createDiffPair(DiffLocation.EnumMember, DiffReasons.Removed, undefined, {
          name: targetMember.getName(),
          node: targetMember,
        });
        result.push(pair);
      }
      return result;
    }, new Array<DiffPair>());

    // check added members
    const addedPairs = sourceMembers.reduce((result, sourceMember) => {
      if (!targetMemberMap.has(sourceMember.getName())) {
        const pair = this.createDiffPair(
          DiffLocation.EnumMember,
          DiffReasons.Added,
          { name: sourceMember.getName(), node: sourceMember },
          undefined
        );
        result.push(pair);
      }
      return result;
    }, new Array<DiffPair>());

    // TODO: detect member value changes

    return [...removedPairs, ...addedPairs];
  }

  public createDiffPair(
    location: DiffLocation,
    reasons: DiffReasons,
    source?: NameNode,
    target?: NameNode,
    assignDirection: AssignDirection = AssignDirection.None
  ): DiffPair {
    return { location, reasons, target, source, assignDirection };
  }

  public checkRemovedDeclaration(
    location: DiffLocation,
    baseline?: Node,
    current?: Node,
    assignDirection: AssignDirection = AssignDirection.CurrentToBaseline
  ): DiffPair | undefined {
    if (baseline && current) return undefined;

    const sourceNameNode =
      assignDirection === AssignDirection.BaselineToCurrent
        ? this.getNameNodeFromNode(baseline)
        : this.getNameNodeFromNode(current);
    const targetNameNode =
      assignDirection === AssignDirection.BaselineToCurrent
        ? this.getNameNodeFromNode(current)
        : this.getNameNodeFromNode(baseline);
    if (!current)
      return this.createDiffPair(location, DiffReasons.Removed, sourceNameNode, targetNameNode, assignDirection);
  }

  public checkAddedDeclaration(
    location: DiffLocation,
    baseline?: Node,
    current?: Node,
    assignDirection: AssignDirection = AssignDirection.CurrentToBaseline
  ): DiffPair | undefined {
    if (baseline && current) return undefined;

    const sourceNameNode =
      assignDirection === AssignDirection.BaselineToCurrent
        ? this.getNameNodeFromNode(baseline)
        : this.getNameNodeFromNode(current);
    const targetNameNode =
      assignDirection === AssignDirection.BaselineToCurrent
        ? this.getNameNodeFromNode(current)
        : this.getNameNodeFromNode(baseline);
    if (!baseline)
      return this.createDiffPair(location, DiffReasons.Added, sourceNameNode, targetNameNode, assignDirection);
  }
}
