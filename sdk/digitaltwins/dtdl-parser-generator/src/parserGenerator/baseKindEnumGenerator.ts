// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable sort-imports */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TsLibrary } from "../codeGenerator/tsLibrary";
import { TypeGenerator } from "./typeGenerator";
import { NameFormatter } from "./nameFormatter";
import { MaterialClassDigest } from "./metamodelDigest";
import { TypeKindValuesHelper } from "./typeKindValuesHelper";

export class BaseKindEnumGenerator implements TypeGenerator {
  private readonly _materialClassesObject: { [code: string]: MaterialClassDigest };
  private _rawBaseType: string;

  constructor(rawBaseType: string, materialClassesObject: { [code: string]: MaterialClassDigest }) {
    this._rawBaseType = rawBaseType;
    this._materialClassesObject = materialClassesObject;
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  generateType(parserLibrary: TsLibrary): void {
    Object.entries(this._materialClassesObject).forEach(([key, materialClassDigest]) => {
      const typeKindValues = TypeKindValuesHelper.generateConcreteTypesKindValues(
        this._rawBaseType,
        key,
        materialClassDigest
      );
      const typeAliasNameForBaseKind = NameFormatter.formatNameForEnumDisjunction(key); // SchemaKinds or EntityKinds
      if (typeKindValues.size > 0) {
        const typeKindValuesOred = Array.from(typeKindValues).join("|"); // 'array'|'boolean'|'date'|'duration';`
        const params = {
          name: typeAliasNameForBaseKind,
          typeToBeAliased: typeKindValuesOred,
          exports: true
        };
        parserLibrary.typeAlias(params);
      }
    });
    // Introduce reference kinds separately
    const refKind = "reference";
    const typeKindEnum = NameFormatter.formatNameForEnumDisjunction(refKind);
    const params = { name: typeKindEnum, typeToBeAliased: `'${refKind}'`, exports: true };
    parserLibrary.typeAlias(params);
  }
}
