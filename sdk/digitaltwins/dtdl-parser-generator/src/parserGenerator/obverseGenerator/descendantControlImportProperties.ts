// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  TsAccess,
  TsClass,
  TsElse,
  TsFor,
  TsForEach,
  TsFunction,
  TsIf,
  TsScope
} from "../../codeGenerator";
import { DescendantControl } from "./descendantControl";
import { MaterialProperty } from "./materialProperty";
import { NameFormatter } from "../nameFormatter";
import { ParserGeneratorValues } from "../parserGeneratorValues";
import { PropertyKind } from "./propertyKind";
import { PropertyRepresentation } from "./propertyRepresentation";

export class DescendantControlImportProperties implements DescendantControl {
  private _dtdlVersion: number;
  private _rootClass: string;
  private _definingClass: string;
  private _propertyNames: string[];
  private _isNarrow: boolean;
  private _importProperties: string[];
  private _maxDepth: number;
  private _getTransitivePropertiesMethodName: string;
  private _importPropertyMethodNames: { [x: string]: string };
  private _fieldNames: { [x: string]: string };
  private _propertiesDesc: string;

  constructor(
    dtdlVersion: number,
    rootClass: string,
    definingClass: string,
    propertyNames: string[],
    isNarrow: boolean,
    importProperties: string[],
    maxDepth: number
  ) {
    this._dtdlVersion = dtdlVersion;
    this._rootClass = rootClass;
    this._definingClass = definingClass;
    this._propertyNames = propertyNames;
    this._isNarrow = isNarrow;
    this._importProperties = importProperties;
    this._maxDepth = maxDepth;

    const propertyNameDisjunction = this._propertyNames
      .map((p) => NameFormatter.formatNameAsProperty(p))
      .join("Or");
    this._getTransitivePropertiesMethodName = `getTransitive${propertyNameDisjunction}${
      this._isNarrow ? "Narrow" : ""
    }`;

    this._importPropertyMethodNames = {};
    this._fieldNames = {};
    for (const importProperty of this._importProperties) {
      const coreName: string = NameFormatter.formatNameAsProperty(importProperty);
      this._importPropertyMethodNames[importProperty] = `Import${coreName}`;
      this._fieldNames[importProperty] = `${ParserGeneratorValues.ShadowPropertyPrefix}${coreName}`;
    }

    this._propertiesDesc = this._propertyNames.map((p) => `'${p}'`).join(" or ");
  }

  appliesToType(rawTypeName: string): boolean {
    return this._rootClass === rawTypeName;
  }

  addMembers(
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    obverseClass: TsClass,
    rawTypeName: string,
    classIsBase: boolean,
    classIsAbstract: boolean,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    materialProperties: MaterialProperty[]
  ): void {
    this.addGetTransitivePropertiesMethod(
      obverseClass,
      classIsBase,
      classIsAbstract,
      materialProperties
    );

    if (this._definingClass === rawTypeName) {
      for (const importProperty of this._importProperties) {
        this._addImportPropertyMethods(obverseClass, materialProperties, importProperty);
        this._addField(obverseClass, materialProperties, importProperty);
      }
    }
  }

  addRestriction(
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    _checkRestrictionsMethodBody: TsScope,
    _dtdlVersion: number,
    _rawTypeName: string
  ): void {
    /* empty */
  }

  addTransformation(
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    applyTransformationsMethodBody: TsScope,
    dtdlVersion: number,
    rawTypeName: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    _materialProperties: MaterialProperty[]
  ): void {
    if (this._dtdlVersion === dtdlVersion && this._rootClass === rawTypeName) {
      for (const importProperty of this._importProperties) {
        // TODO: Is this the same as the get first or nothing in C#?

        const importPropName: string = NameFormatter.formatNameAsProperty(importProperty);

        applyTransformationsMethodBody
          .if(`this._${ParserGeneratorValues.ShadowPropertyPrefix}${importPropName} === undefined`)
          .line(
            `this._${
              ParserGeneratorValues.ShadowPropertyPrefix
            }${importPropName} = {...this.${NameFormatter.formatNameAsParameter(importPropName)}};`
          );

        applyTransformationsMethodBody.line(
          `const tooDeepElementId: Reference<InDTMI> = {ref: undefined}`
        );
        applyTransformationsMethodBody.line(
          `const sources = this.${this._getTransitivePropertiesMethodName}(0, ${this._maxDepth}, tooDeepElementId, parsingErrors);`
        );
        applyTransformationsMethodBody.line("");

        const ifSourcesNotNull: TsIf = applyTransformationsMethodBody.if(`sources !== undefined`);

        const forEachDtmi: TsForEach = ifSourcesNotNull.forEach(`sources`, `dtmi`);

        for (const importProperty2 of this._importProperties) {
          const importPropName2: string = NameFormatter.formatNameAsProperty(importProperty2);

          forEachDtmi.line(
            `(model.dict[dtmi] as ${NameFormatter.formatNameAsImplementation(
              this._definingClass
            )}).import${importPropName2}(new InDTMI(this.${
              ParserGeneratorValues.IdentifierName
            }), \`${this._propertiesDesc}\`, this.${NameFormatter.formatNameAsParameter(
              importPropName2
            )} || {}, parsingErrors);`
          );
        }

        ifSourcesNotNull
          .elseIf(`tooDeepElementId.ref !== undefined`)
          .multiLine(`parsingErrors.push(createParsingError(`)
          .line(`'dtmi:dtdl:parsingError:excessiveDepth',`)
          .line("{")
          .line(
            `cause: \`{primaryId:n} is at the root of a ${
              this._isNarrow ? "chain of " + this._propertiesDesc + " properties" : "hierarchy"
            } that exceeds ${this._maxDepth} levels -- {secondaryId:n} is at level ${this
              ._maxDepth + 1}.\`,`
          )
          .line(
            `action :\`Change the value of one or more ${this._propertiesDesc} properties in the hierarchy to reduce the nesting depth.\`,`
          )
          .line(`primaryId: this.${ParserGeneratorValues.IdentifierName},`)
          .line(`secondaryId: tooDeepElementId.ref.value,`)
          .line(`}));`);
      }
    }
  }

  addGetTransitivePropertiesMethod(
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    obverseClass: TsClass,
    classIsBase: boolean,
    classIsAbstract: boolean,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    materialProperties: MaterialProperty[]
  ): void {
    if (obverseClass.hasMethod(this._getTransitivePropertiesMethodName)) {
      return;
    }

    if (classIsBase) {
      const baseClassMethod: TsFunction = obverseClass.method({
        name: this._getTransitivePropertiesMethodName,
        returnType: `Set<string> | undefined`,
        abstract: true
      });
      baseClassMethod.parameter({ name: "depth", type: ParserGeneratorValues.ObverseTypeInteger });
      baseClassMethod.parameter({
        name: "depthLimit",
        type: "number",
        description: "The allowed limit on the depth."
      });
      baseClassMethod.parameter({
        name: "tooDeepElementId",
        type: `Reference<${ParserGeneratorValues.IdentifierType}>`,
        description: "An out parameter for the ID of the first element that exceeds the depth."
      });
      baseClassMethod.parameter({
        name: "parsingErrors",
        type: "ParsingError[]",
        description: "A ParsingError list to which any parsing errors are added."
      });
    } else if (!classIsAbstract) {
      const concreteClassMethod: TsFunction = obverseClass.method({
        name: this._getTransitivePropertiesMethodName,
        returnType: "Set<string> | undefined"
      });
      concreteClassMethod.parameter({ name: "depth", type: "number" });
      concreteClassMethod.parameter({
        name: "depthLimit",
        type: ParserGeneratorValues.ObverseTypeInteger
      });
      concreteClassMethod.parameter({
        name: "tooDeepElementId",
        type: `Reference<${ParserGeneratorValues.IdentifierType}>`
      });
      concreteClassMethod.parameter({ name: "parsingErrors", type: "ParsingError[]" });

      for (const materialProperty of materialProperties) {
        if (
          materialProperty.propertyKind === PropertyKind.Object &&
          this._propertyNames.includes(materialProperty.propertyName)
        ) {
          materialProperty
            .checkPresence(concreteClassMethod.body)
            .if("depth === depthLimit")
            .line(
              `tooDeepElementId.ref = new InDTMI(this.${ParserGeneratorValues.IdentifierName});`
            )
            .line("return undefined;");
        }
      }

      concreteClassMethod.body.line("const closure: Set<string> = new Set<string>();");
      concreteClassMethod.body.line(``);

      for (const materialProperty of materialProperties) {
        const isRelevantProperty: boolean = this._propertyNames.includes(
          materialProperty.propertyName
        );
        const conditionalIncrement: string = isRelevantProperty ? " + 1" : "";

        if (
          materialProperty.propertyKind === PropertyKind.Object &&
          (isRelevantProperty || !this._isNarrow)
        ) {
          const varName: { ref: string } = { ref: "item" };
          const iterationScope: TsScope = materialProperty.iterate(
            concreteClassMethod.body,
            varName
          );

          iterationScope.line(
            `const others: Set<string> | undefined = ${varName.ref}.${this._getTransitivePropertiesMethodName}(depth${conditionalIncrement}, depthLimit, tooDeepElementId, parsingErrors);`
          );

          const ifOthersNotUndefined: TsIf = iterationScope.if("others !== undefined");

          if (isRelevantProperty) {
            ifOthersNotUndefined.line(
              `closure.add(${varName.ref}.${ParserGeneratorValues.IdentifierName});`
            );
          }

          ifOthersNotUndefined.line("others.forEach((item) => closure.add(item));");

          const othersIsUndefined: TsElse = ifOthersNotUndefined.else();

          const ifTooDeepElementIsThis: TsIf = othersIsUndefined.if(
            `tooDeepElementId.ref?.value === this.${ParserGeneratorValues.IdentifierName}`
          );

          ifTooDeepElementIsThis
            .line("parsingErrors.push(createParsingError(")
            .line(`'dtmi:dtdl:parsingError:recursiveStructure',`)
            .line("{")
            .line(
              `cause: \`{primaryId:n} is at the root of a ${
                this._isNarrow ? `chain of ${this._propertiesDesc} properties` : "hierarchy"
              } that includes itself.\`,`
            )
            .line(
              `action: \`Change the value of one or more ${this._propertiesDesc} properties in the hierarchy to remeve the recursion.\`,`
            )
            .line(`primaryId: this.${ParserGeneratorValues.IdentifierName},`)
            .line(`}));`);

          ifTooDeepElementIsThis.line("tooDeepElementId.ref = undefined;");

          othersIsUndefined.line("return undefined;");
        }
      }

      concreteClassMethod.body.line("tooDeepElementId.ref = undefined;");
      concreteClassMethod.body.line("return closure;");
    }
  }

  private _addImportPropertyMethods(
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    obverseClass: TsClass,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    materialProperties: MaterialProperty[],
    importProperty: string
  ): void {
    const methodName: string = NameFormatter.formatNameAsMethod(
      this._importPropertyMethodNames[importProperty]
    );
    if (obverseClass.hasMethod(methodName)) {
      return;
    }

    const fieldName: string = this._fieldNames[importProperty];
    const paramName: string = NameFormatter.formatNameAsParameter(importProperty);

    const materialProperty: MaterialProperty = materialProperties.filter(
      (mp) => mp.propertyName === importProperty
    )[0];

    const method: TsFunction = obverseClass.method({ name: methodName, returnType: "void" });
    method.summary(
      `Copy the values of this object's ${NameFormatter.formatNameAsProperty(
        importProperty
      )} property into ${paramName}\`.`
    );

    method.parameter({
      name: "ancestorId",
      type: `${ParserGeneratorValues.IdentifierType}`,
      description: `The identifier of the ancestor element whose obverse class invokes the method.`
    });
    method.parameter({
      name: `importPropertyName`,
      type: `string`,
      description: `The name of the property responsible for the importing.`
    });
    method.parameter({
      name: paramName,
      type: materialProperty.propertyType,
      description: `The destination for the copied values.`
    });
    method.parameter({
      name: "parsingErrors",
      type: `ParsingError[]`,
      description: `A ParsingErrors to which any parsing errors are added.`
    });

    if (materialProperty.propertyRepresentation === PropertyRepresentation.List) {
      method.body.line(
        `${paramName}.AddRange(this.${NameFormatter.formatNameAsProperty(importProperty)});`
      );
    } else if (materialProperty.propertyRepresentation === PropertyRepresentation.Dictionary) {
      method.body.line(
        `const currentObject = this._${fieldName} || this.${NameFormatter.formatNameAsField(
          materialProperty.propertyName
        )} || {};`
      );

      const forEachKvp: TsFor = method.body.for(
        `const [key, value] of Object.entries(currentObject)`
      );

      const ifContainsKey: TsIf = forEachKvp.if(
        `Object.prototype.hasOwnProperty.call(${paramName}, key)`
      );

      ifContainsKey
        .multiLine(`parsingErrors.push(createParsingError(`)
        .line(`'dtmi:dtdl:parsingError:nonUniqueImportedPropertyValue',`)
        .line(`{`)
        .line(
          `cause: \`{primaryId:n}, because it transitively \${importPropertyName} {secondaryId}, has property '${importProperty}' that contains more than one element whose property '${materialProperty.keyProperty}' has value '\${key}'.\`,`
        )
        .line(
          `action: \`Either change the value of property '${materialProperty.keyProperty}' to a unique string value, or remove one or more \${importPropertyName} properties so that '${importProperty}' will not be imported.\`,`
        )
        .line(`primaryId: ancestorId.value,`)
        .line(`secondaryId: this.${ParserGeneratorValues.IdentifierName},`)
        .line(`property: \`${importProperty}\`,`)
        .line(`value: \`${materialProperty.keyProperty}\``)
        .line(`}));`);

      ifContainsKey.else().line(`${paramName}[key] = value;`);
    }
  }

  _addField(
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    obverseClass: TsClass,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    materialProperties: MaterialProperty[],
    importProperty: string
  ): void {
    const fieldName: string = `_${this._fieldNames[importProperty]}`;
    if (obverseClass.hasField(fieldName)) {
      return;
    }

    const materialProperty: MaterialProperty = materialProperties.filter(
      (mp) => mp.propertyName === importProperty
    )[0];
    obverseClass.field({
      name: fieldName,
      type: materialProperty.propertyType as string,
      access: TsAccess.Protected,
      optional: true
    });
  }
}
