// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable valid-jsdoc */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ParserGeneratorValues } from "./parserGeneratorValues";
import { TsScope } from "../codeGenerator";

export class SupplementalType {
  protected typeUri: string | undefined;
  protected typeVariableName: string | undefined;

  constructor(typeUri: string | undefined) {
    this.typeUri = typeUri;
    this.typeVariableName = this.getTypeVariableName(typeUri);
  }

  /**
   * Define a variable for the supplemental type identifier value.
   * @param scope - A TsScope object to which to add generated code.
   */
  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  defineIdVariable(scope: TsScope): void {
    scope.line(
      `const ${this.typeVariableName}: ${ParserGeneratorValues.IdentifierType} = new ${ParserGeneratorValues.IdentifierType}("${this.typeUri}");`
    );
  }

  /**
   * Define a variable for the supplemental type information object.
   * @param scope - A TsScope object to which to add generated code.
   * @param contextIdVariables - A Dictionary mapping context IDs to variables that hold the context ID values.
   */
  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  defineInfoVariable(_scope: TsScope, _contextIdVariables: { [x: string]: string }): void {
    /* empty */
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  assignInfoVariable(_scope: TsScope, _dictionaryVariableName: string): void {
    /* empty */
  }

  /**
   * Get a variable name for the supplemental type identifier value.
   * @param typeUri - The URI of the supplemental type.
   * @returns - A string representation of the variable name.
   */
  getTypeVariableName(typeUri: string | undefined): string | undefined {
    return typeUri
      ? `${this.getVariableRoot(typeUri)}TypeId${this.getVariableSuffix(typeUri)}`
      : undefined;
  }

  /**
   * Get a variable name for the supplemental type information object.
   * @param typeUri - The URI of the supplemental type.
   * @returns - A string representation of the variable name.
   */
  getInfoVariableName(typeUri: string | undefined): string | undefined {
    return typeUri
      ? `${this.getVariableRoot(typeUri)}Info${this.getVariableSuffix(typeUri)}`
      : undefined;
  }

  getVariableRoot(typeUri: string): string {
    const lastLabelStart = typeUri.lastIndexOf(":") + 1;
    const versionStart = typeUri.indexOf(";");
    const lastLabelLength = (versionStart > 0 ? versionStart : typeUri.length) - lastLabelStart;
    const lastLabel = typeUri.substr(lastLabelStart, lastLabelLength);
    return lastLabel[0].toLowerCase() + lastLabel.substr(1);
  }

  getVariableSuffix(typeUri: string): string {
    const versionSuffixStart = typeUri.indexOf(";") + 1;
    if (versionSuffixStart > 0) {
      return `V${typeUri.substr(versionSuffixStart).replace(".", "_")}`;
    } else {
      const penultimateLabelEnd = typeUri.lastIndexOf(":");
      const penultimateLabelStart = typeUri.lastIndexOf(":", penultimateLabelEnd - 1) + 1;
      return typeUri.substr(penultimateLabelStart, penultimateLabelEnd - penultimateLabelStart);
    }
  }
}
