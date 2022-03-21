// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable sort-imports */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MaterialClassDigest } from "./metamodelDigest";
import { NameFormatter } from "./nameFormatter";

export class TypeKindValuesHelper {
  public static generateConcreteTypesKindValues(
    baseTypeRawName: string,
    materialClassName: string,
    materialClassObject: MaterialClassDigest
  ): Set<string> {
    const typeKindValues = new Set<string>();
    const refKind = "reference";
    for (const dtdlVersion of materialClassObject.dtdlVersions) {
      if (dtdlVersion in materialClassObject.concreteSubclasses) {
        const subclassesNames: string[] = materialClassObject.concreteSubclasses[dtdlVersion];
        subclassesNames.forEach((element: string) => {
          typeKindValues.add(`'${NameFormatter.formatNameAsKindString(element)}'`);
        });
      }
      if (dtdlVersion in materialClassObject.extensibleMaterialSubclasses) {
        const extensibleClasses: string[] =
          materialClassObject.extensibleMaterialSubclasses[dtdlVersion];
        extensibleClasses.forEach((element: string) => {
          typeKindValues.add(`'${NameFormatter.formatNameAsKindString(element)}'`);
        });
      }
    }
    if (
      NameFormatter.formatNameAsKindString(materialClassName) === baseTypeRawName.toLowerCase() ||
      NameFormatter.formatNameAsKindString(materialClassName) === refKind
    ) {
      typeKindValues.add(`'${NameFormatter.formatNameAsKindString(refKind)}'`);
    }
    return typeKindValues;
  }
}
