import template from "string-template";
import { DetectContext, DetectResult } from "./DifferenceDetector.js";
import { DiffLocation, DiffPair, DiffReasons } from "typescript-codegen-breaking-change-detector";
import { InterfaceDeclaration, Node, PropertySignature, SyntaxKind } from "ts-morph";
import { SDKType } from "../../common/types.js";

// NOTE: enum value matters for the order of output changelog items
export enum ChangelogItemCategory {
  /** features */
  // operation group
  OperationGroupAdded = 0,
  // routes group (only for rest level client)
  RoutesGroupAdded = 100,
  // operation
  OperationAdded = 200,
  // class
  ClassAdded = 300,
  ClassConstructorAdded = 301,
  // model
  ModelAdded = 400,
  ModelOptionalPropertyAdded = 401,
  // type alias
  TypeAliasAdded = 500,
  // function
  FunctionAdded = 600,
  FunctionOverloadAdded = 601,
  // enum
  EnumAdded = 700,
  EnumMemberAdded = 701,

  /** breaking changes */
  // operation group
  OperationGroupRemoved = 10000,
  // routes group
  RoutesGroupRemoved = 20000,
  // operation
  OperationRemoved = 30000,
  OperationSignatureChanged = 30001,
  // class
  ClassRemoved = 40000,
  ClassChanged = 40001,
  ClassPropertyRemoved = 40002,
  ClassPropertyOptionalToRequired = 40003,
  // model
  ModelRemoved = 50000,
  ModelRequiredPropertyAdded = 50001,
  ModelPropertyTypeChanged = 50002,
  ModelPropertyRemoved = 50003,
  ModelPropertyOptionalToRequired = 50004,
  ModelPropertyRequiredToOptional = 50005,
  // type alias
  TypeAliasRemoved = 60000,
  TypeAliasTypeChanged = 60001,
  // function
  FunctionRemoved = 70000,
  FunctionOverloadRemoved = 70001,
  FunctionSignatureChanged = 70002,
  // enum
  EnumRemoved = 80000,
  EnumMemberRemoved = 80001,
}

export interface ChangelogResult {
  hasBreakingChange: boolean;
  hasFeature: boolean;
  changelogItems: ChangelogItems;
  content: string;
  breakingChangeItems?: string[];
}

export interface ChangelogItems {
  features: Map<ChangelogItemCategory, string[]>;
  breakingChanges: Map<ChangelogItemCategory, string[]>;
}

// first breaking change category, used to distinguish features and breaking changes
const FirstBreakingChangeCategory = ChangelogItemCategory.OperationGroupRemoved;

// TODO: use consistent upper/lower case
// TODO: use consistent word: removed/deleted
// TODO: consider enum get wider or narrower
export class ChangelogGenerator {
  /** operation group */
  private operationGroupAddedTemplate = "Added operation group {interfaceName}";
  private operationGroupRemovedTemplate = "Removed operation group {interfaceName}";

  /** operation */
  private operationAddedTemplate = "Added operation {interfaceName}.{signatureName}";
  private operationRemovedTemplate = "Removed operation {interfaceName}.{signatureName}";
  private operationSignatureChangedTemplate =
    "Operation {interfaceName}.{signatureName} has a new signature";

  /** routes group */
  private routesGroupAddedTemplate = "Added Routes interface";
  private routesGroupRemovedTemplate = "Removed Routes interface";

  /** routes operation */
  private routesOperationAddedTemplate = "Added operation in Routes for path: {path}";
  private routesOperationRemovedTemplate = "Removed operation in Routes for path: {path}";
  private routesOperationSignatureChangedTemplate =
    'Operation in "Routes" has a new signature for path: {path}';

  /** model */
  private modelAddedTemplate = "Added Interface {interfaceName}";
  // NOTE: not in v1
  private modelRemovedTemplate = "Removed Interface {interfaceName}";
  private modelOptionalPropertyAddedTemplate =
    "Interface {interfaceName} has a new optional parameter {propertyName}";
  private modelRequiredPropertyAddedTemplate =
    "Interface {interfaceName} has a new required parameter {propertyName}";
  // NOTE: note in v1 except union type
  // TODO: should be called 'property'
  private modelPropertyTypeChangedTemplate =
    "Type of parameter {newPropertyName} of interface {interfaceName} is changed from {oldPropertyType} to {newPropertyType}";
  private modelPropertyRemovedTemplate =
    "Interface {interfaceName} no longer has parameter {propertyName}";
  private modelPropertyOptionalToRequiredTemplate =
    "Parameter {propertyName} of interface {interfaceName} is now required";
  private modelPropertyRequiredToOptionalTemplate =
    "Parameter {propertyName} of interface {interfaceName} is now optional";

  /** class */
  // TODO: add more detection for class changes
  private classAddedTemplate = "Added Class {className}";
  private classRemovedTemplate = "Deleted Class {className}";
  private classPropertyRemovedTemplate = "Class {className} no longer has parameter {propertyName}";
  private classPropertyOptionalToRequiredTemplate =
    "Parameter {propertyName} of class {className} is now required";
  // NOTE: not detected in v1 except constructor and it's parameters
  private classChangedTemplate = "Class {className} has a new signature";
  // NOTE: not in v1
  private classConstructorAddedTemplate =
    'Class {className} has a new constructor "{constructorSignature}"';

  /** type alias */
  // TODO: add more detection for class changes
  private typeAliasAddedTemplate = "Added Type Alias {typeName}";
  // NOTE: not in v1
  private typeAliasRemovedTemplate = "Removed Type Alias {typeName}";
  private typeAliasTypeChangedTemplate = 'Type alias "{typeName}" has been changed';

  /** function */
  private functionAddedTemplate = "Added function {functionName}";
  private functionRemovedTemplate = "Removed function {functionName}";
  private functionAddedOverloadTemplate = 'Added function overload "{functionSignature}"';
  private functionRemovedOverloadTemplate = 'Removed function overload "{functionSignature}"';
  private functionSignatureChangedTemplate = "Function {functionName} has a new signature";

  // TODO: detect enum member's initializer change
  /** enum */
  private enumAddedTemplate = "Added Enum {enumName}";
  private enumRemovedTemplate = "Removed Enum {enumName}";
  private enumMemberAddedTemplate = "Enum {enumName} has a new value {valueName}";
  private enumMemberRemovedTemplate = "Enum {enumName} no longer has value {valueName}";

  private changelogItems: ChangelogItems = {
    features: new Map<ChangelogItemCategory, string[]>(),
    breakingChanges: new Map<ChangelogItemCategory, string[]>(),
  };

  constructor(
    private detectContext: DetectContext,
    private detectResult: DetectResult,
  ) {}

  // TODO: add enum support
  public generate(): ChangelogResult {
    this.detectResult.interfaces.forEach((diffPairs, name) => {
      this.generateForInterfaces(diffPairs, name);
    });
    this.detectResult.classes.forEach((diffPairs, name) => {
      this.generateForClasses(diffPairs, name);
    });
    this.detectResult.typeAliases.forEach((diffPairs, name) => {
      this.generateForTypeAliases(diffPairs, name);
    });
    this.detectResult.functions.forEach((diffPairs, name) => {
      this.generateForFunctions(diffPairs, name);
    });
    this.detectResult.enums.forEach((diffPairs, name) => {
      this.generateForEnums(diffPairs, name);
    });
    const content = this.generateContentCore();
    const hasBreakingChange = this.hasBreakingChange();
    const hasFeature = this.hasFeature();
    const changelogItems = this.getChangelogItems();
    const breakingChangeItems = Array.from(this.changelogItems.breakingChanges).flatMap(
      ([_, items]) => items,
    );
    return { content, changelogItems, hasBreakingChange, hasFeature, breakingChangeItems };
  }

  private hasBreakingChange(): boolean {
    return this.changelogItems.breakingChanges.size > 0;
  }

  private hasFeature(): boolean {
    return this.changelogItems.features.size > 0;
  }

  private getChangelogItems(): ChangelogItems {
    return this.changelogItems;
  }

  private getItemsFromCategoryMap(map: Map<ChangelogItemCategory, string[]>): string[] {
    const items: string[] = [];
    [...map.keys()].sort().forEach((category) => {
      const categoryItems = map.get(category);
      if (!categoryItems || categoryItems.length === 0) return;
      categoryItems.forEach((item) => items.push(item));
    });
    return items;
  }

  private generateSection(items: string[], title: string): string {
    if (items.length === 0) return "";
    let content = `### ${title}\n`;
    content += items.map((i) => `  - ${i}`).join("\n");
    content += "\n";
    return content;
  }

  private generateContentCore() {
    let content = "";
    const featureItems = this.getItemsFromCategoryMap(this.changelogItems.features);
    const breakingChangeItems = this.getItemsFromCategoryMap(this.changelogItems.breakingChanges);

    content += this.generateSection(featureItems, "Features Added");
    if (featureItems.length > 0 && breakingChangeItems.length > 0) content += "\n";
    content += this.generateSection(breakingChangeItems, "Breaking Changes");

    return content;
  }

  private addChangelogItem(category: ChangelogItemCategory, message: string) {
    if (category < FirstBreakingChangeCategory) {
      const messages = this.changelogItems.features.get(category) || [];
      if (!messages.includes(message)) messages.push(message);
      this.changelogItems.features.set(category, messages);
    } else {
      const messages = this.changelogItems.breakingChanges.get(category) || [];
      if (!messages.includes(message)) messages.push(message);
      this.changelogItems.breakingChanges.set(category, messages);
    }
  }

  private generateForFunctions(diffPairs: DiffPair[], functionName: string): void {
    diffPairs.forEach((p) => {
      // function added
      if (p.location === DiffLocation.Signature && this.hasReasons(p.reasons, DiffReasons.Added)) {
        const message = template(this.functionAddedTemplate, { functionName });
        this.addChangelogItem(ChangelogItemCategory.FunctionAdded, message);
      }
      // function removed
      if (
        p.location === DiffLocation.Signature &&
        this.hasReasons(p.reasons, DiffReasons.Removed)
      ) {
        const message = template(this.functionRemovedTemplate, { functionName });
        this.addChangelogItem(ChangelogItemCategory.FunctionRemoved, message);
      }
      // overload function added
      if (
        p.location === DiffLocation.Signature_Overload &&
        this.hasReasons(p.reasons, DiffReasons.Added)
      ) {
        const message = template(this.functionAddedOverloadTemplate, {
          functionSignature: p.source!.node.getText(),
        });
        this.addChangelogItem(ChangelogItemCategory.FunctionOverloadAdded, message);
      }
      // overload function removed
      if (
        p.location === DiffLocation.Signature_Overload &&
        this.hasReasons(p.reasons, DiffReasons.Removed)
      ) {
        const message = template(this.functionRemovedOverloadTemplate, {
          functionSignature: p.target!.node.getText(),
        });
        this.addChangelogItem(ChangelogItemCategory.FunctionOverloadRemoved, message);
      }
      // function return type changed
      if (
        p.location === DiffLocation.Signature_ReturnType &&
        this.hasReasons(p.reasons, DiffReasons.TypeChanged)
      ) {
        const message = template(this.functionSignatureChangedTemplate, { functionName });
        this.addChangelogItem(ChangelogItemCategory.FunctionSignatureChanged, message);
      }
      // function parameter list changed
      if (
        p.location === DiffLocation.Signature_ParameterList &&
        this.hasReasons(p.reasons, DiffReasons.CountChanged)
      ) {
        const message = template(this.functionSignatureChangedTemplate, { functionName });
        this.addChangelogItem(ChangelogItemCategory.FunctionSignatureChanged, message);
      }
      //  function parameter type changed
      if (
        p.location === DiffLocation.Parameter &&
        this.hasReasons(p.reasons, DiffReasons.TypeChanged)
      ) {
        const message = template(this.functionSignatureChangedTemplate, { functionName });
        this.addChangelogItem(ChangelogItemCategory.FunctionSignatureChanged, message);
      }
    });
  }

  private generateForEnums(diffPairs: DiffPair[], enumName: string): void {
    diffPairs.forEach((p) => {
      // enum added
      if (p.location === DiffLocation.Enum && this.hasReasons(p.reasons, DiffReasons.Added)) {
        const message = template(this.enumAddedTemplate, { enumName });
        this.addChangelogItem(ChangelogItemCategory.EnumAdded, message);
      }
      // enum removed
      if (p.location === DiffLocation.Enum && this.hasReasons(p.reasons, DiffReasons.Removed)) {
        const message = template(this.enumRemovedTemplate, { enumName });
        this.addChangelogItem(ChangelogItemCategory.EnumRemoved, message);
      }
      // overload enum member added
      if (p.location === DiffLocation.EnumMember && this.hasReasons(p.reasons, DiffReasons.Added)) {
        const message = template(this.enumMemberAddedTemplate, {
          enumName,
          valueName: p.source!.node.asKindOrThrow(SyntaxKind.EnumMember).getName(),
        });
        this.addChangelogItem(ChangelogItemCategory.EnumMemberAdded, message);
      }
      // overload enum member removed
      if (
        p.location === DiffLocation.EnumMember &&
        this.hasReasons(p.reasons, DiffReasons.Removed)
      ) {
        const message = template(this.enumMemberRemovedTemplate, {
          enumName,
          valueName: p.target!.node.asKindOrThrow(SyntaxKind.EnumMember).getName(),
        });
        this.addChangelogItem(ChangelogItemCategory.EnumMemberRemoved, message);
      }
    });
  }

  private generateForTypeAliases(diffPairs: DiffPair[], typeName: string): void {
    diffPairs.forEach((p) => {
      // type alias added
      if (p.location === DiffLocation.TypeAlias && this.hasReasons(p.reasons, DiffReasons.Added)) {
        const message = template(this.typeAliasAddedTemplate, { typeName });
        this.addChangelogItem(ChangelogItemCategory.TypeAliasAdded, message);
      }
      // NOTE: not detected in v1
      // type alias removed
      if (
        p.location === DiffLocation.TypeAlias &&
        this.hasReasons(p.reasons, DiffReasons.Removed)
      ) {
        const message = template(this.typeAliasRemovedTemplate, { typeName });
        this.addChangelogItem(ChangelogItemCategory.TypeAliasRemoved, message);
      }
      // type alias type changed
      if (
        p.location === DiffLocation.TypeAlias &&
        this.hasReasons(p.reasons, DiffReasons.TypeChanged)
      ) {
        // TODO: improve changelog to tell the most outer impacted declarations
        const oldTypeText = p.target!.node.getText();
        const newTypeText = p.source!.node.getText();
        if (oldTypeText !== newTypeText) {
          const message = template(this.typeAliasTypeChangedTemplate, { typeName });
          this.addChangelogItem(ChangelogItemCategory.TypeAliasTypeChanged, message);
        }
      }
    });
  }

  private generateForClasses(diffPairs: DiffPair[], className: string): void {
    diffPairs.forEach((p) => {
      // class added
      if (p.location === DiffLocation.Class && this.hasReasons(p.reasons, DiffReasons.Added)) {
        const message = template(this.classAddedTemplate, { className });
        this.addChangelogItem(ChangelogItemCategory.ClassAdded, message);
      }
      // class removed
      if (p.location === DiffLocation.Class && this.hasReasons(p.reasons, DiffReasons.Removed)) {
        const message = template(this.classRemovedTemplate, { className });
        this.addChangelogItem(ChangelogItemCategory.ClassRemoved, message);
      }
      // class signature added: only report when it is truly a constructor declaration,
      // not a regular method (which also uses DiffLocation.Signature)
      if (p.location === DiffLocation.Signature && this.hasReasons(p.reasons, DiffReasons.Added)) {
        if (p.source!.node.getKind() === SyntaxKind.Constructor) {
          const constructorSignature = p.source!.node.getText();
          const message = template(this.classConstructorAddedTemplate, {
            className,
            constructorSignature,
          });
          this.addChangelogItem(ChangelogItemCategory.ClassConstructorAdded, message);
        } else {
          // new method added to the class (e.g. newly introduced operation on the client)
          const signatureName = p.source!.name;
          const message = template(this.operationAddedTemplate, {
            interfaceName: className,
            signatureName,
          });
          this.addChangelogItem(ChangelogItemCategory.OperationAdded, message);
        }
      }
      // class type changed (constructor removed / signature incompatible)
      // NOTE: not detected in v1 except constructor and it's parameters
      if (
        p.location === DiffLocation.Signature &&
        this.hasReasons(p.reasons, DiffReasons.Removed)
      ) {
        if (p.target!.node.getKind() === SyntaxKind.Constructor) {
          const message = template(this.classChangedTemplate, { className });
          this.addChangelogItem(ChangelogItemCategory.ClassChanged, message);
        }
        // method removal on the class is handled as ClassPropertyRemoved via DiffLocation.Property
      }
      // class property removed
      if (p.location === DiffLocation.Property && this.hasReasons(p.reasons, DiffReasons.Removed)) {
        const message = template(this.classPropertyRemovedTemplate, {
          className,
          propertyName: p.target!.name,
        });
        this.addChangelogItem(ChangelogItemCategory.ClassPropertyRemoved, message);
      }
      // class property optional to required (baseline to current)
      if (
        p.location === DiffLocation.Property &&
        this.hasReasons(p.reasons, DiffReasons.RequiredToOptional)
      ) {
        const message = template(this.classPropertyOptionalToRequiredTemplate, {
          className,
          propertyName: p.source!.name,
        });
        this.addChangelogItem(ChangelogItemCategory.ClassPropertyOptionalToRequired, message);
      }
    });
  }

  private generateForOperationGroupInterface(diffPair: DiffPair, interfaceName: string) {
    const getInterfaceNameInBaseline = (): string => {
      if (
        this.detectContext.sdkTypes.source === SDKType.ModularClient &&
        this.detectContext.sdkTypes.target === SDKType.HighLevelClient
      )
        return interfaceName.substring(0, interfaceName.length - "Operations".length);
      return interfaceName;
    };
    const baselineInterfaceName = getInterfaceNameInBaseline();
    /** operation group changes */
    // operation group added
    if (
      diffPair.location === DiffLocation.Interface &&
      this.hasReasons(diffPair.reasons, DiffReasons.Added)
    ) {
      const message = template(this.operationGroupAddedTemplate, { interfaceName });
      this.addChangelogItem(ChangelogItemCategory.OperationGroupAdded, message);
    }
    // operation group removed
    if (
      diffPair.location === DiffLocation.Interface &&
      this.hasReasons(diffPair.reasons, DiffReasons.Removed)
    ) {
      const message = template(this.operationGroupRemovedTemplate, {
        interfaceName: baselineInterfaceName,
      });
      this.addChangelogItem(ChangelogItemCategory.OperationGroupRemoved, message);
    }

    /** operation changes */
    // operation added
    if (
      diffPair.location === DiffLocation.Signature &&
      this.hasReasons(diffPair.reasons, DiffReasons.Added)
    ) {
      const message = template(this.operationAddedTemplate, {
        interfaceName,
        signatureName: diffPair.source!.name,
      });
      this.addChangelogItem(ChangelogItemCategory.OperationAdded, message);
    }
    // operation removed
    if (
      diffPair.location === DiffLocation.Signature &&
      this.hasReasons(diffPair.reasons, DiffReasons.Removed)
    ) {
      const message = template(this.operationRemovedTemplate, {
        interfaceName: baselineInterfaceName,
        signatureName: diffPair.target!.name,
      });
      this.addChangelogItem(ChangelogItemCategory.OperationRemoved, message);
    }
    // operation signature's parameter type changed
    if (
      diffPair.location === DiffLocation.Parameter &&
      this.hasReasons(diffPair.reasons, DiffReasons.TypeChanged)
    ) {
      const signatureName = () => {
        const parent = diffPair.source!.node.asKindOrThrow(SyntaxKind.Parameter).getParentOrThrow();
        switch (parent.getKind()) {
          case SyntaxKind.MethodSignature:
            return parent.asKindOrThrow(SyntaxKind.MethodSignature).getName();
          case SyntaxKind.FunctionType:
            return parent
              .asKindOrThrow(SyntaxKind.FunctionType)
              .getParentOrThrow()
              .asKindOrThrow(SyntaxKind.PropertySignature)
              .getName();
        }
      };
      const message = template(this.operationSignatureChangedTemplate, {
        interfaceName: baselineInterfaceName,
        signatureName: signatureName(),
      });
      this.addChangelogItem(ChangelogItemCategory.OperationSignatureChanged, message);
    }
    // operation signature's parameter list changed
    if (
      diffPair.location === DiffLocation.Signature_ParameterList &&
      this.hasReasons(diffPair.reasons, DiffReasons.CountChanged)
    ) {
      const message = template(this.operationSignatureChangedTemplate, {
        interfaceName: baselineInterfaceName,
        signatureName: diffPair.target!.name,
      });
      this.addChangelogItem(ChangelogItemCategory.OperationSignatureChanged, message);
    }
    // operation signature's return type changed
    // NOTE: not detected in v1
    if (
      diffPair.location === DiffLocation.Signature_ReturnType &&
      this.hasReasons(diffPair.reasons, DiffReasons.TypeChanged)
    ) {
      const message = template(this.operationSignatureChangedTemplate, {
        interfaceName: baselineInterfaceName,
        signatureName: diffPair.target!.name,
      });
      this.addChangelogItem(ChangelogItemCategory.OperationSignatureChanged, message);
    }
    // operation parameter
    if (
      diffPair.location === DiffLocation.Signature &&
      this.hasReasons(diffPair.reasons, DiffReasons.RequiredToOptional)
    ) {
      const message = template(this.operationSignatureChangedTemplate, {
        interfaceName: baselineInterfaceName,
        // TODO: get signature name
        signatureName: "TODO",
      });
      this.addChangelogItem(ChangelogItemCategory.OperationSignatureChanged, message);
    }
    // operation signature's parameter required/optional changed
    // NOTE: not detected in v2
    if (
      diffPair.location === DiffLocation.Signature &&
      this.hasReasons(diffPair.reasons, DiffReasons.OptionalToRequired)
    ) {
      const message = template(this.operationSignatureChangedTemplate, {
        interfaceName: baselineInterfaceName,
        // TODO: get signature name
        signatureName: "TODO",
      });
      this.addChangelogItem(ChangelogItemCategory.OperationSignatureChanged, message);
    }
  }

  private generateForRoutesInterface(diffPair: DiffPair, interfaceName: string) {
    /** routes interface changes */
    // routes interface added
    if (
      diffPair.location === DiffLocation.Interface &&
      this.hasReasons(diffPair.reasons, DiffReasons.Added)
    ) {
      const message = template(this.routesGroupAddedTemplate);
      this.addChangelogItem(ChangelogItemCategory.RoutesGroupAdded, message);
    }
    // routes interface removed
    if (
      diffPair.location === DiffLocation.Interface &&
      this.hasReasons(diffPair.reasons, DiffReasons.Removed)
    ) {
      const message = template(this.routesGroupRemovedTemplate);
      this.addChangelogItem(ChangelogItemCategory.RoutesGroupRemoved, message);
    }

    /** routes operation changes */
    const getPath = (node?: Node) => {
      const path = node
        ?.asKind(SyntaxKind.CallSignature)
        ?.getParameter("path")
        ?.getTypeNode()
        ?.getText();
      if (!path) throw new Error("Failed to get path for Routes interface");
      return path;
    };

    // operation added
    if (
      diffPair.location === DiffLocation.Signature &&
      this.hasReasons(diffPair.reasons, DiffReasons.Added)
    ) {
      const path = getPath(diffPair.source?.node || diffPair.target?.node);
      const message = template(this.routesOperationAddedTemplate, { path });
      this.addChangelogItem(ChangelogItemCategory.OperationAdded, message);
    }
    // operation removed
    if (
      diffPair.location === DiffLocation.Signature &&
      this.hasReasons(diffPair.reasons, DiffReasons.Removed)
    ) {
      const path = getPath(diffPair.source?.node || diffPair.target?.node);
      const message = template(this.routesOperationRemovedTemplate, { path });
      this.addChangelogItem(ChangelogItemCategory.OperationRemoved, message);
    }
    // operation signature's parameter type changed
    if (
      diffPair.location === DiffLocation.Parameter &&
      this.hasReasons(diffPair.reasons, DiffReasons.TypeChanged)
    ) {
      const path = getPath(diffPair.source?.node.getParent() || diffPair.target?.node.getParent());
      const message = template(this.routesOperationSignatureChangedTemplate, { path });
      this.addChangelogItem(ChangelogItemCategory.OperationSignatureChanged, message);
    }
    // operation signature's parameter list changed
    if (
      diffPair.location === DiffLocation.Signature_ParameterList &&
      this.hasReasons(diffPair.reasons, DiffReasons.CountChanged)
    ) {
      const path = getPath(diffPair.source?.node || diffPair.target?.node);
      const message = template(this.routesOperationSignatureChangedTemplate, { path });
      this.addChangelogItem(ChangelogItemCategory.OperationSignatureChanged, message);
    }
    // operation signature's return type changed
    // NOTE: not detected in v1
    if (
      diffPair.location === DiffLocation.Signature_ReturnType &&
      this.hasReasons(diffPair.reasons, DiffReasons.TypeChanged)
    ) {
      const path = getPath(diffPair.source?.node || diffPair.target?.node);
      const message = template(this.routesOperationSignatureChangedTemplate, { path });
      this.addChangelogItem(ChangelogItemCategory.OperationSignatureChanged, message);
    }
    // operation parameter
    if (
      diffPair.location === DiffLocation.Signature &&
      this.hasReasons(diffPair.reasons, DiffReasons.RequiredToOptional)
    ) {
      const path = getPath(diffPair.source?.node || diffPair.target?.node);
      const message = template(this.routesOperationSignatureChangedTemplate, { path });
      this.addChangelogItem(ChangelogItemCategory.OperationSignatureChanged, message);
    }
    // operation signature's parameter required/optional changed
    if (
      diffPair.location === DiffLocation.Signature &&
      this.hasReasons(diffPair.reasons, DiffReasons.OptionalToRequired)
    ) {
      const path = getPath(diffPair.source?.node || diffPair.target?.node);
      const message = template(this.routesOperationSignatureChangedTemplate, { path });
      this.addChangelogItem(ChangelogItemCategory.OperationSignatureChanged, message);
    }
  }

  private generateForModelInterface(diffPair: DiffPair, interfaceName: string): void {
    /** model changes */
    // model added
    if (
      diffPair.location === DiffLocation.Interface &&
      this.hasReasons(diffPair.reasons, DiffReasons.Added)
    ) {
      const message = template(this.modelAddedTemplate, { interfaceName });
      this.addChangelogItem(ChangelogItemCategory.ModelAdded, message);
    }
    // NOTE: not detected in v1
    // model removed
    if (
      diffPair.location === DiffLocation.Interface &&
      this.hasReasons(diffPair.reasons, DiffReasons.Removed)
    ) {
      const message = template(this.modelRemovedTemplate, { interfaceName });
      this.addChangelogItem(ChangelogItemCategory.ModelRemoved, message);
    }
    if (
      diffPair.location === DiffLocation.Property &&
      this.hasReasons(diffPair.reasons, DiffReasons.Added)
    ) {
      // model's optional property added
      if (diffPair.source?.node.getSymbolOrThrow().isOptional()) {
        const message = template(this.modelOptionalPropertyAddedTemplate, {
          interfaceName,
          propertyName: diffPair.source!.name,
        });
        this.addChangelogItem(ChangelogItemCategory.ModelOptionalPropertyAdded, message);
        // model's required property added
      } else {
        const message = template(this.modelRequiredPropertyAddedTemplate, {
          interfaceName,
          propertyName: diffPair.source!.name,
        });
        this.addChangelogItem(ChangelogItemCategory.ModelRequiredPropertyAdded, message);
      }
    }

    // model's property type changed
    // NOTE: not detected in v1 except for union type
    // NOTE: discuss if extend union type to be breaking or not
    if (
      diffPair.location === DiffLocation.Property &&
      this.hasReasons(diffPair.reasons, DiffReasons.TypeChanged)
    ) {
      const getTypeText = (node: Node) =>
        node.asKindOrThrow(SyntaxKind.PropertySignature).getTypeNodeOrThrow().getText();
      const oldPropertyTypeText = getTypeText(diffPair.target!.node);
      const newPropertyTypeText = getTypeText(diffPair.source!.node);
      // TODO: improve changelog to tell the most outer impacted declarations
      if (oldPropertyTypeText !== newPropertyTypeText) {
        const message = template(this.modelPropertyTypeChangedTemplate, {
          interfaceName,
          newPropertyName: diffPair.source!.name,
          oldPropertyType: oldPropertyTypeText,
          newPropertyType: newPropertyTypeText,
        });
        this.addChangelogItem(ChangelogItemCategory.ModelPropertyTypeChanged, message);
      }
    }
    // model's property removed
    if (
      diffPair.location === DiffLocation.Property &&
      this.hasReasons(diffPair.reasons, DiffReasons.Removed)
    ) {
      const message = template(this.modelPropertyRemovedTemplate, {
        interfaceName,
        propertyName: diffPair.target!.name,
      });
      this.addChangelogItem(ChangelogItemCategory.ModelPropertyRemoved, message);
    }
    // model's property optional to required
    if (
      diffPair.location === DiffLocation.Property &&
      this.hasReasons(diffPair.reasons, DiffReasons.RequiredToOptional)
    ) {
      const message = template(this.modelPropertyOptionalToRequiredTemplate, {
        interfaceName,
        propertyName: diffPair.source!.name,
      });
      this.addChangelogItem(ChangelogItemCategory.ModelPropertyOptionalToRequired, message);
    }
    // TODO: cannot distinguish input/output model for now, add as breaking change
    // model's property required to optional
    if (
      diffPair.location === DiffLocation.Property &&
      this.hasReasons(diffPair.reasons, DiffReasons.OptionalToRequired)
    ) {
      const message = template(this.modelPropertyRequiredToOptionalTemplate, {
        interfaceName,
        propertyName: diffPair.source!.name,
      });
      this.addChangelogItem(ChangelogItemCategory.ModelPropertyRequiredToOptional, message);
    }
  }

  private generateForInterfaces(diffPairs: DiffPair[], interfaceName: string): void {
    // TODO: remove when there's no high level client any more

    const isOperationGroupInterface = () => {
      const source = this.detectContext.context.current.getInterface(interfaceName);
      const target = this.detectContext.context.baseline.getInterface(interfaceName);
      const isOperationGroup =
        (source &&
          this.isOperationGroupInterfaceCore(source, this.detectContext.sdkTypes.source)) ||
        (target && this.isOperationGroupInterfaceCore(target, this.detectContext.sdkTypes.target));
      return isOperationGroup;
    };
    const isRoutesInterface =
      this.detectContext.sdkTypes.source === SDKType.RestLevelClient && interfaceName === "Routes";

    /** operation group and operationchanges */
    diffPairs.forEach((p) => {
      if (isRoutesInterface) this.generateForRoutesInterface(p, interfaceName);
      else if (isOperationGroupInterface())
        this.generateForOperationGroupInterface(p, interfaceName);
      else this.generateForModelInterface(p, interfaceName);
    });
  }

  // TODO: improve, only support one reason in expectedReasons
  private hasReasons(actualReasons: DiffReasons, expectedReasons: DiffReasons) {
    return (actualReasons & expectedReasons) > 0;
  }

  private isFunctionType(property: PropertySignature) {
    const kind = property.getTypeNode()?.getKind();
    return kind === SyntaxKind.FunctionType;
  }

  private isOperationGroupInterfaceCore(node: InterfaceDeclaration, sdkType: SDKType) {
    const memberCount = node.getMembers().length;
    switch (sdkType) {
      case SDKType.HighLevelClient:
        return memberCount > 0 && memberCount === node.getMethods().length;
      case SDKType.ModularClient:
        return (
          memberCount > 0 &&
          memberCount === node.getProperties().filter(this.isFunctionType).length &&
          node.getName().endsWith("Operations")
        );
      case SDKType.RestLevelClient:
        return false;
      default:
        throw new Error(`Unsupported SDK type ${sdkType} to distingush operation interface.`);
    }
  }
}
