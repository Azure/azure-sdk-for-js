import {
  AssignDirection,
  AstContext,
  createAstContext,
  DiffLocation,
  DiffPair,
  DiffReasons,
  patchClass,
  patchFunction,
  patchInterface,
  patchTypeAlias,
  patchEnum,
  isPropertyMethod,
  patchRoutes,
} from "typescript-codegen-breaking-change-detector";
import { SDKType } from "../../common/types.js";
import { join } from "path";
import {
  FunctionDeclaration,
  ModuleKind,
  Project,
  ScriptTarget,
  SourceFile,
  SyntaxKind,
} from "ts-morph";
import { logger } from "../../utils/logger.js";
// Use the `ts` that ts-morph is built against, NOT the standalone `typescript` package.
// The nodes inspected below come from ts-morph, and a hoisted/mismatched standalone
// `typescript` (e.g. an old transitive copy) has different `SyntaxKind` numeric values,
// which silently breaks `ts.SyntaxKind`/`ts.isIdentifier` checks against ts-morph nodes.
import { ts } from "ts-morph";

const { JsxEmit } = ts;

export interface ApiViewOptions {
  path?: string;
  apiView?: string;
  sdkType: SDKType;
}

export interface DetectResult {
  interfaces: Map<string, DiffPair[]>;
  classes: Map<string, DiffPair[]>;
  typeAliases: Map<string, DiffPair[]>;
  functions: Map<string, DiffPair[]>;
  enums: Map<string, DiffPair[]>;
}

export interface DetectContext {
  sdkTypes: {
    target: SDKType;
    source: SDKType;
  };
  context: AstContext;
}

export class DifferenceDetector {
  private tempFolder: string;
  private context: AstContext | undefined;
  private result: DetectResult | undefined;

  constructor(
    private baselineApiViewOptions: ApiViewOptions,
    private currentApiViewOptions: ApiViewOptions,
  ) {
    this.tempFolder = join(
      "~/.tmp-breaking-change-detect-" + Math.random().toString(36).substring(7),
    );
  }

  public getDetectContext(): DetectContext {
    return {
      sdkTypes: {
        target: this.baselineApiViewOptions.sdkType,
        source: this.currentApiViewOptions.sdkType,
      },
      context: this.context!,
    };
  }

  public async detect(): Promise<DetectResult> {
    await this.load();
    await this.preprocess();
    await this.detectCore();
    this.postprocess();
    return this.result!;
  }

  private postprocess() {
    this.result?.functions.forEach((v, k) => {
      if (this.shouldIgnoreFunctionBreakingChange(v, k)) this.result?.functions.delete(k);
    });

    this.result?.classes.forEach((v, k) => {
      let filtered = this.filterIgnoreTargetNames(v);
      filtered = this.filterClassPropertiesMovedToInternals(filtered, k);
      if (filtered.length === 0) this.result?.classes.delete(k);
      else this.result?.classes.set(k, filtered);
    });

    this.result?.typeAliases.forEach((v, k) => {
      if (this.shouldIgnoreTypeAliasBreakingChange(v, k)) this.result?.typeAliases.delete(k);
    });

    this.result?.interfaces.forEach((v, k) => {
      if (this.shouldIgnoreInterfaceBreakingChange(v, k)) this.result?.interfaces.delete(k);
      if (this.hasIgnoreTargetNames(v)) this.result?.interfaces.delete(k);
    });

    // Handle generic interfaces - filter to only Added/Removed changes
    this.result?.interfaces.forEach((v, k) => {
      if (this.hasTypeParameters(k, SyntaxKind.InterfaceDeclaration)) {
        logger.warn(
          `Generic interface '${k}' breaking change detection is limited to Added/Removed changes only.`,
        );
        // For generic interfaces, only keep Added/Removed diff pairs
        const filteredDiffPairs = v.filter(
          (pair) => pair.reasons === DiffReasons.Added || pair.reasons === DiffReasons.Removed,
        );
        this.result?.interfaces.set(k, filteredDiffPairs);
      }
    });

    if (this.currentApiViewOptions.sdkType !== SDKType.RestLevelClient) return;

    // use Routes specific detection
    this.result?.interfaces.delete("Routes");
    const routesDiffPairs = patchRoutes(this.context!);
    this.result?.interfaces.set("Routes", routesDiffPairs);
  }

  private shouldIgnoreInterfaceBreakingChange(v: DiffPair[], k: string): boolean {
    // TODO: Create a new PR to ignore all 'any' cases for breaking change detection

    if (k.endsWith("NextOptionalParams")) {
      // Ignore NextOptionalParams as they are not breaking changes
      return true;
    }

    if (k.endsWith("Result") && v.some((pair) => pair.reasons === DiffReasons.Removed)) {
      return true;
    }

    if (k.endsWith("Headers") && v.some((pair) => pair.reasons === DiffReasons.Removed)) {
      return true;
    }
    return false;
  }

  private shouldIgnoreTypeAliasBreakingChange(v: DiffPair[], k: string): boolean {
    return k.endsWith("Response") && v.some((pair) => pair.reasons === DiffReasons.Removed);
  }

  private shouldIgnoreFunctionBreakingChange(v: DiffPair[], k: string): boolean {
    return k === "getContinuationToken" && v.some((pair) => pair.reasons === DiffReasons.Removed);
  }

  private hasIgnoreTargetNames(v: DiffPair[]): boolean {
    // Check if any pair has a target name that should be ignored only when removed
    const ignoreTargets = ["resumeFrom", "$host", "endpoint"];
    return v.some((pair) => {
      const name = pair.target?.name || pair.source?.name;
      return name && ignoreTargets.includes(name) && pair.reasons === DiffReasons.Removed;
    });
  }

  // Returns only the diff pairs that are NOT for ignored target names.
  // This allows real breaking changes in the same class to still be detected.
  private filterIgnoreTargetNames(v: DiffPair[]): DiffPair[] {
    const ignoreTargets = ["resumeFrom", "$host", "endpoint"];
    return v.filter((pair) => {
      const name = pair.target?.name || pair.source?.name;
      return !(name && ignoreTargets.includes(name) && pair.reasons === DiffReasons.Removed);
    });
  }

  // Filters out class property removals that are "by design" when a property is no longer
  // a public class member but is still accessible via the current client's constructor
  // signatures. This is applied to every SDK transition (not just HLC -> Modular), because
  // the baseline SDK type detected from a downloaded npm package can be unreliable, and the
  // constructor-based check below is sufficient on its own to decide whether the removal is
  // non-breaking. A removed property is considered non-breaking when it is still accessible as:
  //   1. The constructor parameter name itself (e.g. subscriptionId)
  //   2. A property on the constructor parameter type (e.g. options?: XxxOptionalParams
  //      exposing apiVersion, cloudSetting, etc.)
  private filterClassPropertiesMovedToInternals(v: DiffPair[], className: string): DiffPair[] {
    const currentClass = this.context!.current.getClass(className);
    if (!currentClass) return v;

    const knownNames = new Set<string>();

    // Constructor parameters — ts-morph's getMembers() filters out bodyless
    // ConstructorDeclaration nodes (API-view declarations have signature-only constructors),
    // so iterate compilerNode.members directly.
    // For each parameter we collect:
    //   a) the parameter name itself (e.g. subscriptionId → filtered directly)
    //   b) all property names of the parameter's type, but ONLY for "option bag" types
    //      declared in the current project's own source files.
    //      Primitives (string, number, …) and library/external types (TokenCredential, etc.)
    //      are skipped to avoid polluting knownNames with built-in members like
    //      `length`, `toString`, `getToken`, which could hide real breaking changes.
    const checker = currentClass
      .getSourceFile()
      .getProject()
      .getProgram()
      .compilerObject.getTypeChecker();
    const projectFileNames = new Set(
      currentClass
        .getSourceFile()
        .getProject()
        .getSourceFiles()
        .map((sf) => sf.compilerNode.fileName),
    );
    for (const rawMember of (currentClass.compilerNode as ts.ClassDeclaration).members) {
      if (rawMember.kind !== ts.SyntaxKind.Constructor) continue;
      const ctor = rawMember as ts.ConstructorDeclaration;
      for (const param of ctor.parameters) {
        if (ts.isIdentifier(param.name)) {
          knownNames.add(param.name.text);
          // Strip undefined from optional params (T | undefined → T) before property lookup
          const paramType = checker.getNonNullableType(checker.getTypeAtLocation(param));
          // Only expand properties for types declared in this project's source files
          // (i.e., user-defined option bags like XxxOptionalParams).  Primitives and
          // external library types (from lib.d.ts / node_modules) are excluded.
          if (this.isProjectLocalType(paramType, checker, projectFileNames)) {
            for (const prop of checker.getPropertiesOfType(paramType)) {
              knownNames.add(prop.name);
            }
          }
        }
      }
    }

    if (knownNames.size === 0) return v;

    return v.filter((pair) => {
      if (pair.location !== DiffLocation.Property || (pair.reasons & DiffReasons.Removed) === 0)
        return true;
      const name = pair.target?.name;
      return !name || !knownNames.has(name);
    });
  }

  // Returns true only for types whose symbol is declared in the project's own source files
  // (i.e., user-defined option-bag interfaces such as XxxOptionalParams).
  // Primitives (string, number, boolean, …) have no symbol; external library types
  // (TokenCredential, PagedAsyncIterableIterator, …) are declared in node_modules or
  // lib.d.ts — none of those match the project file set, so they are excluded.
  private isProjectLocalType(
    type: ts.Type,
    checker: ts.TypeChecker,
    projectFileNames: Set<string>,
  ): boolean {
    // Union types: treat as a local option-bag if ALL non-undefined constituent types are local.
    // This handles the common pattern `XxxOptionalParams | undefined`.
    if (type.isUnion()) {
      return type.types
        .filter((t) => !(t.flags & ts.TypeFlags.Undefined))
        .every((t) => this.isProjectLocalType(t, checker, projectFileNames));
    }
    const symbol = type.getSymbol() ?? (type as ts.Type & { aliasSymbol?: ts.Symbol }).aliasSymbol;
    if (!symbol) return false;
    const decls = symbol.getDeclarations();
    if (!decls || decls.length === 0) return false;
    return decls.some((d) => projectFileNames.has(d.getSourceFile().fileName));
  }

  // Returns the target name for a baseline operations-group interface.
  // Appends 'Operations' only if the resulting name exists in the target Modular interface set;
  // otherwise keeps the original name unchanged.
  private getOperationsGroupName(name: string, targetInterfaceNames: Set<string>): string {
    const nameWithOps = name + "Operations";
    return targetInterfaceNames.has(nameWithOps) ? nameWithOps : name;
  }

  private convertHighLevelClientToModularClientCode(
    code: string,
    targetInterfaceNames: Set<string>,
  ): string {
    const project = new Project({
      compilerOptions: {
        jsx: JsxEmit.Preserve,
        target: ScriptTarget.ES5,
        module: ModuleKind.CommonJS,
        strict: true,
        esModuleInterop: true,
        lib: ["es2015", "es2017", "esnext"],
        experimentalDecorators: true,
        rootDir: ".",
      },
    });
    const sourceFile = project.createSourceFile("index.ts", code, { overwrite: true });
    const outputFile = project.createSourceFile("output.ts", "", { overwrite: true });

    for (const statement of sourceFile.getStatements()) {
      if (statement.getKind() !== SyntaxKind.InterfaceDeclaration) {
        outputFile.addStatements(statement.getText().trim());
        continue;
      }

      const iface = statement.asKindOrThrow(SyntaxKind.InterfaceDeclaration);
      const members = iface.getMembers();
      const isOperationsGroup =
        members.length > 0 && members.every((m) => isPropertyMethod(m.getSymbolOrThrow()));

      if (!isOperationsGroup) {
        outputFile.addStatements(statement.getText().trim());
        continue;
      }

      // Build converted interface in the new file to avoid rename conflicts in the original
      const newName = this.getOperationsGroupName(iface.getName(), targetInterfaceNames);
      const properties = members
        .filter((m) => m.getKind() === SyntaxKind.MethodSignature)
        .map((method) => {
          const methodSig = method.asKindOrThrow(SyntaxKind.MethodSignature);
          const params = methodSig.getParameters().map((p) => ({
            name: p.getName(),
            type: p.getTypeNodeOrThrow().getText(),
          }));
          const returnType = methodSig.getReturnTypeNodeOrThrow().getText();
          return {
            name: methodSig.getName(),
            type: `(${params.map((p) => `${p.name}: ${p.type}`).join(", ")}) => ${returnType}`,
          };
        });

      outputFile.addInterface({ name: newName, isExported: iface.isExported(), properties });
    }

    return outputFile.getFullText();
  }

  private async preprocess() {
    const baselineSdkType = this.baselineApiViewOptions.sdkType;
    const currentSdkType = this.currentApiViewOptions.sdkType;
    if (baselineSdkType === currentSdkType) return;
    if (baselineSdkType !== SDKType.HighLevelClient || currentSdkType !== SDKType.ModularClient) {
      logger.error(
        `Failed to preprocess baseline SDK type '${baselineSdkType}' and current SDK type '${currentSdkType}' for difference detection. Only ${SDKType.HighLevelClient} to ${SDKType.ModularClient} is supported.`,
      );
      return;
    }

    const targetInterfaceNames = new Set(
      this.context!.current.getInterfaces().map((i) => i.getName()),
    );
    const highLevelCodeInModularWay = this.convertHighLevelClientToModularClientCode(
      this.context?.baseline.getFullText()!,
      targetInterfaceNames,
    );
    const generateApiView = (code: string) => {
      return `
\`\`\` ts
    ${code}
\`\`\`
    `;
    };
    const baselineApiView = generateApiView(highLevelCodeInModularWay);
    const currentApiView = generateApiView(this.context!.current.getFullText()!);
    this.context = await createAstContext(
      { apiView: baselineApiView },
      { apiView: currentApiView },
      this.tempFolder,
      true,
    );
  }

  private async load() {
    this.context = await createAstContext(
      { path: this.baselineApiViewOptions.path, apiView: this.baselineApiViewOptions.apiView },
      { path: this.currentApiViewOptions.path, apiView: this.currentApiViewOptions.apiView },
      this.tempFolder,
      true,
    );
  }

  private getUniqueDeclarationNames(getDeclarationFn: (sourceFile: SourceFile) => string[]) {
    const uniquefy = (arrays: (string | undefined)[]) => {
      const arr = arrays.filter((a) => a !== undefined).map((a) => a!);
      return [...new Set(arr)];
    };
    const namesFromBoth = [
      ...getDeclarationFn(this.context!.baseline),
      ...getDeclarationFn(this.context!.current),
    ];
    return uniquefy(namesFromBoth);
  }

  // TODO: support type parameters
  private hasTypeParametersCore(name: string, kind: SyntaxKind, sourceFile: SourceFile): boolean {
    switch (kind) {
      case SyntaxKind.InterfaceDeclaration:
        return (sourceFile.getInterface(name)?.getTypeParameters().length ?? 0) > 0;
      case SyntaxKind.ClassDeclaration:
        return (sourceFile.getClass(name)?.getTypeParameters().length ?? 0) > 0;
      case SyntaxKind.TypeAliasDeclaration:
        return (sourceFile.getTypeAlias(name)?.getTypeParameters().length ?? 0) > 0;
      case SyntaxKind.FunctionDeclaration:
        return (
          (this.getFunctions(sourceFile)
            .find((d) => d.getName() === name)
            ?.getTypeParameters().length ?? 0) > 0
        );
      default:
        return false;
    }
  }

  private hasTypeParameters(name: string, kind: SyntaxKind): boolean {
    return (
      this.hasTypeParametersCore(name, kind, this.context!.baseline) ||
      this.hasTypeParametersCore(name, kind, this.context!.current)
    );
  }

  private getFunctions(sourceFile: SourceFile): FunctionDeclaration[] {
    return sourceFile
      .getStatements()
      .filter((d) => d.getKind() === SyntaxKind.FunctionDeclaration)
      .map((d) => d.asKindOrThrow(SyntaxKind.FunctionDeclaration));
  }

  private async detectCore(): Promise<void> {
    const interfaceNames = this.getUniqueDeclarationNames((s) =>
      s.getInterfaces().map((i) => i.getName()),
    );
    const classNames = this.getUniqueDeclarationNames((s) =>
      s.getClasses().map((i) => i.getName()!),
    );
    const typeAliasNames = this.getUniqueDeclarationNames((s) =>
      s.getTypeAliases().map((i) => i.getName()),
    );
    const functionNames = this.getUniqueDeclarationNames((s) =>
      this.getFunctions(s).map((d) => d.getName()!),
    );
    const enumNames = this.getUniqueDeclarationNames((s) => s.getEnums().map((i) => i.getName()));

    // TODO: be careful about input models and output models
    const interfaceDiffPairs = interfaceNames.reduce((map, n) => {
      const diffPairs = patchInterface(n, this.context!, AssignDirection.CurrentToBaseline);
      map.set(n, diffPairs);
      return map;
    }, new Map<string, DiffPair[]>());
    const classDiffPairs = classNames.reduce((map, n) => {
      if (this.hasTypeParameters(n, SyntaxKind.ClassDeclaration)) {
        logger.warn(`Generic class '${n}' breaking change detection is not supported.`);
        return map;
      }
      const diffPairs = patchClass(n, this.context!, AssignDirection.CurrentToBaseline);
      map.set(n, diffPairs);
      return map;
    }, new Map<string, DiffPair[]>());
    const typeAliasDiffPairs = typeAliasNames.reduce((map, n) => {
      if (this.hasTypeParameters(n, SyntaxKind.TypeAliasDeclaration)) {
        logger.warn(`Generic type alias '${n}' breaking change detection is not supported.`);
        return map;
      }
      const diffPairs = patchTypeAlias(n, this.context!, AssignDirection.CurrentToBaseline);
      map.set(n, diffPairs);
      return map;
    }, new Map<string, DiffPair[]>());
    const functionDiffPairs = functionNames.reduce((map, n) => {
      if (this.hasTypeParameters(n, SyntaxKind.FunctionDeclaration)) {
        logger.warn(`Generic interface '${n}' breaking change detection is not supported.`);
        return map;
      }
      // TODO: add assign direction
      const diffPairs = patchFunction(n, this.context!);
      map.set(n, diffPairs);
      return map;
    }, new Map<string, DiffPair[]>());
    const enumDiffPairs = enumNames.reduce((map, n) => {
      const diffPairs = patchEnum(n, this.context!, AssignDirection.CurrentToBaseline);
      map.set(n, diffPairs);
      return map;
    }, new Map<string, DiffPair[]>());

    this.result = {
      interfaces: interfaceDiffPairs,
      classes: classDiffPairs,
      typeAliases: typeAliasDiffPairs,
      functions: functionDiffPairs,
      enums: enumDiffPairs,
    };
  }
}
