// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SupplementalConstraint } from "./supplementalConstraint";
import { SupplementalCotype } from "./supplementalCotype";
import { SupplementalProperty } from "./supplementalProperty";
import { SupplementalType } from "./supplementalType";
import { SupplementalTypeDigest } from "./metamodelDigest";
import { TsScope } from "../codeGenerator";

export class SupplementalTypeExtension extends SupplementalType {
  private _isAbstract: string;
  private _extensionKind: string;
  private _extensionContext: string;
  private _properties: SupplementalProperty[];
  private _constraints: SupplementalConstraint[];
  private _cotypes: SupplementalCotype[];
  private _cotypeVersions: number[];
  private _infoVariableName: string;
  private _parentTypeVariableName: string;

  constructor(typeUri: string, supplementalTypeDigest: SupplementalTypeDigest, kindEnum: string) {
    super(typeUri);
    this._isAbstract = `${supplementalTypeDigest.abstract}`;
    this._extensionKind = supplementalTypeDigest.extensionKind;
    this._extensionContext = supplementalTypeDigest.extensionContext;

    this._properties = [];
    this._constraints = [];
    this._cotypes = [];
    this._cotypeVersions = supplementalTypeDigest.cotypeVersions;

    for (const [key, value] of Object.entries(supplementalTypeDigest.properties)) {
      this._properties.push(new SupplementalProperty(key, value));
    }

    for (const constraint of supplementalTypeDigest.constraints) {
      this._constraints.push(new SupplementalConstraint(constraint));
    }

    for (const cotype of supplementalTypeDigest.cotypes) {
      this._cotypes.push(new SupplementalCotype(cotype, kindEnum));
    }

    this._infoVariableName = `${this.getInfoVariableName(typeUri)}` || "undefined";
    this._parentTypeVariableName = `${this.getTypeVariableName(supplementalTypeDigest.parent)}`;
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  defineInfoVariable(scope: TsScope, contextIdVariables: { [x: string]: string }): void {
    let parentTypeVar;
    if (this._parentTypeVariableName === "undefined") {
      parentTypeVar = "undefined";
    } else {
      parentTypeVar = `${this._parentTypeVariableName}.value`;
    }
    const parameters = `ExtensionKind.${this._extensionKind.toUpperCase()}, ${
      contextIdVariables[this._extensionContext]
    }.value, ${this.typeVariableName}.value, ${this._isAbstract}, ${parentTypeVar}`;
    scope.line(`const ${this._infoVariableName} = new SupplementalTypeInfoImpl(${parameters});`);

    for (const property of this._properties) {
      property.addProperty(scope, this._infoVariableName);
    }

    for (const constraint of this._constraints) {
      constraint.addConstraint(scope, this._infoVariableName);
    }

    for (const cotype of this._cotypes) {
      cotype.addCotype(scope, this._infoVariableName);
    }

    for (const cotypeVersion of this._cotypeVersions) {
      scope.line(`${this._infoVariableName}.addCotypeVersion(${cotypeVersion})`);
    }
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  assignInfoVariable(scope: TsScope, dictionaryVariableName: string): void {
    scope.line(
      `${dictionaryVariableName}.set(${this.typeVariableName}.value, ${this._infoVariableName});`
    );
    // this.supplementalTypes.set(accelerationTypeIdV2.value, accelerationInfoV2);
  }
}
