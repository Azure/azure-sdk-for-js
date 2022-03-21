// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable sort-imports */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TsClass, TsScope } from "../../codeGenerator";
import { NameFormatter } from "../nameFormatter";

export class ExtensibleMaterialClass {
  private _dtdlVersion: number;
  private _typeName: string;
  private _className: string;
  private _kindEnum: string;
  private _kindValue: string;

  constructor(dtdlVersion: number, typeName: string, kindEnum: string) {
    this._dtdlVersion = dtdlVersion;
    this._typeName = typeName;
    this._kindEnum = kindEnum;
    this._className = NameFormatter.formatNameAsImplementation(typeName);
    this._kindValue = NameFormatter.formatNameAsEnumValue(typeName);
  }

  public addCaseToParseTypeStringSwitch(
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    obverseClass: TsClass,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    switchOnExtensionKind: TsScope,
    extensibleMaterialSubtypes: string[],
    parentIdVar: string,
    definedInVar: string
  ): void {
    switchOnExtensionKind.line(`case ExtensionKind.${this._kindValue}:`);
    if (extensibleMaterialSubtypes.includes(this._typeName)) {
      if (obverseClass.name !== this._className) {
        obverseClass.import(`import {${this._className}} from './internal';`);
      }
      switchOnExtensionKind
        .line(
          `elementInfo.ref = new ${this._className}(${
            this._dtdlVersion
          }, elementId, ${parentIdVar}, ${definedInVar}, '${NameFormatter.formatNameAsKindString(
            this._kindValue
          )}');`
        )
        .line(
          `(elementInfo.ref as ${this._className}).addType(supplementalTypeId.value, supplementalTypeInfo);`
        )
        .line(`materialKinds.push('${NameFormatter.formatNameAsKindString(this._kindValue)}');`)
        .line(`return true;`);
    } else {
      switchOnExtensionKind
        .line("parsingErrors.push(createParsingError(")
        .line(`'dtmi:dtdl:parsingError:badType',`)
        .line("{")
        .line(`cause: this._badTypeCauseFormat[${this._dtdlVersion}],`)
        .line(`action: this._badTypeActionFormat[${this._dtdlVersion}],`)
        .line(`primaryId: parentId,`)
        .line(`property: propName,`)
        .line(`secondaryId: elementId,`)
        .line(`value: typestring`)
        .line(`}));`)
        .line("break;");
    }
  }
}
