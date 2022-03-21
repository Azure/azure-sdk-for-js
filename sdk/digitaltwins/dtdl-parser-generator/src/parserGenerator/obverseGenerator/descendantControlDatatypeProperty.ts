// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TsAccess, TsClass, TsScope } from "../../codeGenerator";
import { DescendantControl } from "./descendantControl";
import { MaterialProperty } from "./materialProperty";
import { NameFormatter } from "../nameFormatter";
import { ParserGeneratorValues } from "../parserGeneratorValues";
import { PropertyKind } from "./propertyKind";

export class DescendantControlDatatypeProperty implements DescendantControl {
  private _dtdlVersion: number;
  private _rootClass: string;
  private _propertyNames: string[];
  private _isNarrow: boolean;
  private _datatypeProperty: string;
  private _coreName: string;
  private _checkMethodName: string;

  constructor(
    dtdlVersion: number,
    rootClass: string,
    propertyNames: string[],
    isNarrow: boolean,
    datatypeProperty: string
  ) {
    this._dtdlVersion = dtdlVersion;
    this._rootClass = rootClass;
    this._propertyNames = propertyNames;
    this._isNarrow = isNarrow;
    this._datatypeProperty = datatypeProperty;

    const propertyNameDisjunction = this._propertyNames
      .map((p) => NameFormatter.formatNameAsProperty(p))
      .join("or");
    this._coreName = `${propertyNameDisjunction}${this._isNarrow ? "Narrow" : ""}`;
    this._checkMethodName = `checkDescendant${this._coreName}DataType`;
  }

  appliesToType(typeName: string): boolean {
    return this._rootClass === typeName;
  }

  addMembers(
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    obverseClass: TsClass,
    _typeName: string,
    classIsBase: boolean,
    classIsAbstract: boolean,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    materialProperties: MaterialProperty[]
  ): void {
    this.addCheckMethod(obverseClass, classIsBase, classIsAbstract, materialProperties);
  }

  addRestriction(
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    checkRestrictionsMethodBody: TsScope,
    dtdlVersion: number,
    typeName: string
  ): void {
    if (this._dtdlVersion === dtdlVersion && this._rootClass === typeName) {
      checkRestrictionsMethodBody.line(
        `const myUri: string = this.${NameFormatter.formatNameAsParameter(
          this._datatypeProperty
        )}?.${ParserGeneratorValues.IdentifierName} || ''`
      );
      checkRestrictionsMethodBody
        .if(`myUri === 'dtmi:dtdl:instance:Schema:integer;${dtdlVersion}'`)
        .line(
          `this.${this._checkMethodName}(new InDTMI(this.${ParserGeneratorValues.IdentifierName}), 'number', parsingErrors);`
        );

      checkRestrictionsMethodBody
        .if(`myUri === 'dtmi:dtdl:instance:Schema:string;${dtdlVersion}'`)
        .line(
          `this.${this._checkMethodName}(new InDTMI(this.${ParserGeneratorValues.IdentifierName}), 'string', parsingErrors);`
        );

      checkRestrictionsMethodBody
        .if(`myUri === 'dtmi:dtdl:instance:Schema:boolean;${dtdlVersion}'`)
        .line(
          `this.${this._checkMethodName}(new InDTMI(this.${ParserGeneratorValues.IdentifierName}), 'boolean', parsingErrors);`
        );
    }
  }

  addTransformation(
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    _applyTransformationsMethodBody: TsScope,
    _dtdlVersion: number,
    _typeName: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    _materialProperties: MaterialProperty[]
  ): void {
    /* empty */
  }

  addCheckMethod(
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    obverseClass: TsClass,
    _classIsBase: boolean,
    _classIsAbstract: boolean,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    materialProperties: MaterialProperty[]
  ): void {
    if (obverseClass.hasMethod(this._checkMethodName)) {
      return;
    }

    const checkedFieldName: string = `_checkedDescendant${this._coreName}Datatype`;
    obverseClass.field({
      name: checkedFieldName,
      type: "string | undefined",
      access: TsAccess.Protected
    });
    obverseClass.ctor.body.line(`this.${checkedFieldName} = undefined`);
    const concreteClassMethod = obverseClass.method({
      name: this._checkMethodName,
      returnType: "void"
    });
    concreteClassMethod.parameter({
      name: "ancestorId",
      type: ParserGeneratorValues.IdentifierType
    });
    concreteClassMethod.parameter({ name: "datatype", type: "string" });
    concreteClassMethod.parameter({ name: "parsingErrors", type: "ParsingError[]" });

    const ifNonMatch = concreteClassMethod.body.if(`this.${checkedFieldName} !== datatype`);
    ifNonMatch.line(`this.${checkedFieldName} = datatype;`);

    for (const materialProperty of materialProperties) {
      if (materialProperty.propertyKind === PropertyKind.Object && !this._isNarrow) {
        const varName: { ref: string } = { ref: "item" };
        materialProperty
          .iterate(concreteClassMethod.body, varName)
          .line(`${varName.ref}.${this._checkMethodName}(ancestorId, datatype, parsingErrors);`);
      }

      if (
        materialProperty.propertyKind === PropertyKind.Literal &&
        this._propertyNames.includes(materialProperty.propertyName)
      ) {
        const varName: { ref: string } = { ref: "item" };
        obverseClass.import(`import {Helpers} from './internal';`);
        materialProperty
          .iterate(ifNonMatch, varName)
          .if(`typeof(${varName.ref}) !== datatype`)
          .multiLine(`parsingErrors.push(createParsingError(`)
          .line(`'dtmi:dtdl:parsingError:nonConformantDatatype',`)
          .line(`{`)
          .line(
            `cause: \`{primaryId:p} property '${materialProperty.propertyName}' has value '{value}'. However, {secondaryId:n} specifies that the datatype of all descendant '${materialProperty.propertyName}' propeties must be \${datatype}.\`,`
          )
          .line(
            `action: \`Change the value of property '${materialProperty.propertyName}' to a value whose datatype is \${datatype}.\`,`
          )
          .line(`primaryId: this.${ParserGeneratorValues.IdentifierName},`)
          .line(`secondaryId: ancestorId.value,`)
          .line(`property: "${materialProperty.propertyName}",`)
          .line(`value: ${varName.ref}.toString(),`)
          .line(`}));`);
      }
    }
  }
}
