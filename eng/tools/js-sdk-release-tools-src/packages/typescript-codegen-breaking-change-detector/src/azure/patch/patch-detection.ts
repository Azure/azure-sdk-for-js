// TODO: combine patch functions into findXXXDifference functions in `declaration-diff.ts`

import { CallSignatureDeclaration, FunctionDeclaration, Node, SourceFile, SyntaxKind } from 'ts-morph';
import {
  AstContext,
  DiffLocation,
  DiffPair,
  DiffReasons,
  AssignDirection,
  FindMappingCallSignatureLikeDeclaration,
  DeclarationDifferenceDetectorOptions,
} from '../common/types';
import { DeclarationDifferenceDetector } from '../diff/DeclarationDifferenceDetector';
import { logger } from '../../logging/logger';

// TODO: keep the same with v1, and separate input and output models in the future
const detectorOptions: DeclarationDifferenceDetectorOptions = {
  RequiredToOptionalAsBreakingChange: true,
  OptionalToRequiredAsBreakingChange: true,
  ReadonlyToMutableAsBreakingChange: true,
  MutableToReadonlyAsBreakingChange: true,
  ConcretTypeToAnyAsBreakingChange: false,
};
const detector = new DeclarationDifferenceDetector(detectorOptions);

const findMappingCallSignatureForRoutes: FindMappingCallSignatureLikeDeclaration<CallSignatureDeclaration> = (
  target: CallSignatureDeclaration,
  signatures: CallSignatureDeclaration[]
) => {
  const path = target
    .getParameters()
    .find((p) => p.getName() === 'path')
    ?.getText();
  if (!path) throw new Error(`Failed to find path in signature: ${target.getText()}`);

  const foundPaths = signatures.filter((p) => {
    const foundPath = p
      .getParameters()
      .find((p) => p.getName() === 'path')
      ?.getText();
    return foundPath && path === foundPath;
  });

  if (foundPaths.length === 0) return undefined;
  if (foundPaths.length > 1) logger.warn(`Found more than one mapping call signature for path '${path}'`);
  return { declaration: foundPaths[0], id: path };
};

export function patchRoutes(astContext: AstContext): DiffPair[] {
  const baseline = astContext.baseline.getInterface('Routes');
  const current = astContext.current.getInterface('Routes');

  if (!baseline && !current) throw new Error(`Failed to find interface 'Routes' in baseline and current package`);

  const addPair = detector.checkAddedDeclaration(DiffLocation.Interface, baseline, current);
  if (addPair) return [addPair];

  const removePair = detector.checkRemovedDeclaration(DiffLocation.Interface, baseline, current);
  if (removePair) return [removePair];

  return patchDeclaration(
    AssignDirection.CurrentToBaseline,
    detector.findInterfaceDifferences.bind(detector),
    baseline!,
    current!,
    findMappingCallSignatureForRoutes
  );
}

export function patchTypeAlias(name: string, astContext: AstContext, assignDirection: AssignDirection): DiffPair[] {
  const baseline = astContext.baseline.getTypeAlias(name);
  const current = astContext.current.getTypeAlias(name);

  if (!baseline && !current) throw new Error(`Failed to find type '${name}' in baseline and current package`);

  const addPair = detector.checkAddedDeclaration(DiffLocation.TypeAlias, baseline, current);
  if (addPair) return [addPair];

  const removePair = detector.checkRemovedDeclaration(DiffLocation.TypeAlias, baseline, current);
  if (removePair) return [removePair];
  return patchDeclaration(assignDirection, detector.findTypeAliasBreakingChanges.bind(detector), baseline!, current!);
}

export function patchFunction(name: string, astContext: AstContext): DiffPair[] {
  const getFunctions = (source: SourceFile) =>
    source
      .getStatements()
      .filter((s) => s.isKind(SyntaxKind.FunctionDeclaration) && s.getName() === name)
      .map((s) => s.asKindOrThrow(SyntaxKind.FunctionDeclaration));

  const baselineFunctions = getFunctions(astContext.baseline);
  const currentFunctions = getFunctions(astContext.current);

  if (baselineFunctions.length === 0 && currentFunctions.length === 0) {
    throw new Error(`Failed to find function '${name}' in baseline and current package`);
  }

  if (baselineFunctions.length > 1 || currentFunctions.length > 1) {
    logger.warn(`Found overloads for function '${name}'`);
  }

  const addPair = detector.checkAddedDeclaration(
    DiffLocation.Signature,
    baselineFunctions.length > 0 ? baselineFunctions[0] : undefined,
    currentFunctions.length > 0 ? currentFunctions[0] : undefined
  );
  if (addPair) return [addPair];

  const removePair = detector.checkRemovedDeclaration(
    DiffLocation.Signature,
    baselineFunctions.length > 0 ? baselineFunctions[0] : undefined,
    currentFunctions.length > 0 ? currentFunctions[0] : undefined
  );
  if (removePair) return [removePair];

  const getNameNode = (s: FunctionDeclaration) => ({ name, node: s as Node });
  if (currentFunctions.length === 0) {
    return [
      detector.createDiffPair(
        DiffLocation.Signature,
        DiffReasons.Removed,
        undefined,
        getNameNode(baselineFunctions[0])
      ),
    ];
  }

  // TODO: add both assign directions like routes
  const pairs = patchDeclaration(
    AssignDirection.CurrentToBaseline,
    detector.findFunctionDifferences.bind(detector),
    baselineFunctions[0],
    currentFunctions[0]
  );
  return pairs;
}

export function patchClass(name: string, astContext: AstContext, assignDirection: AssignDirection): DiffPair[] {
  const baseline = astContext.baseline.getClass(name);
  const current = astContext.current.getClass(name);

  if (!baseline && !current) throw new Error(`Failed to find class '${name}' in baseline and current package`);

  const addPair = detector.checkAddedDeclaration(DiffLocation.Class, baseline, current);
  if (addPair) return [addPair];

  const removePair = detector.checkRemovedDeclaration(DiffLocation.Class, baseline, current);
  if (removePair) return [removePair];

  return patchDeclaration(assignDirection, detector.findClassDifferences.bind(detector), baseline!, current!);
}

export function patchInterface(name: string, astContext: AstContext, assignDirection: AssignDirection): DiffPair[] {
  const baseline = astContext.baseline.getInterface(name);
  const current = astContext.current.getInterface(name);

  if (!baseline && !current) throw new Error(`Failed to find interface '${name}' in baseline and current package`);

  const addPair = detector.checkAddedDeclaration(DiffLocation.Interface, baseline, current);
  if (addPair) return [addPair];

  const removePair = detector.checkRemovedDeclaration(DiffLocation.Interface, baseline, current);
  if (removePair) return [removePair];

  const diffPairs = patchDeclaration(
    assignDirection,
    detector.findInterfaceDifferences.bind(detector),
    baseline!,
    current!
  );
  return diffPairs;
}

export function patchEnum(name: string, astContext: AstContext, assignDirection: AssignDirection): DiffPair[] {
  const baseline = astContext.baseline.getEnum(name);
  const current = astContext.current.getEnum(name);

  if (!baseline && !current) throw new Error(`Failed to find enum '${name}' in baseline and current package`);
  const addPair = detector.checkAddedDeclaration(DiffLocation.Enum, baseline, current);
  if (addPair) return [addPair];

  const removePair = detector.checkRemovedDeclaration(DiffLocation.Enum, baseline, current);
  if (removePair) return [removePair];

  return patchDeclaration(assignDirection, detector.findEnumDifferences.bind(detector), baseline!, current!);
}

export function patchDeclaration<T extends Node>(
  assignDirection: AssignDirection,
  findBreakingChanges: (source: T, target: T, ...extra: any) => DiffPair[],
  baseline: T,
  current: T,
  ...extra: any
): DiffPair[] {
  const updateAssignDirection = (pair: DiffPair) => {
    pair.assignDirection = assignDirection;
    return pair;
  };
  switch (assignDirection) {
    case AssignDirection.BaselineToCurrent: {
      return findBreakingChanges(baseline, current, ...extra).map(updateAssignDirection);
    }
    case AssignDirection.CurrentToBaseline: {
      return findBreakingChanges(current, baseline, ...extra).map(updateAssignDirection);
    }
    default:
      throw new Error(`Unsupported model type: ${assignDirection}`);
  }
}
