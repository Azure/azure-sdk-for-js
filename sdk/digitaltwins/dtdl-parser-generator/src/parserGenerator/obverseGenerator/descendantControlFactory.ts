// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DescendantControl } from "./descendantControl";
import { DescendantControlDatatypeProperty } from "./descendantControlDatatypeProperty";
import { DescendantControlDigest } from "../metamodelDigest";
import { DescendantControlExcludeType } from "./descendantControlExcludeType";
import { DescendantControlImportProperties } from "./descendantControlImportProperties";
import { DescendantControlMaxCount } from "./descendantControlMaxCount";
import { DescendantControlMaxDepth } from "./descendantControlMaxDepth";

export class DescendantControlFactory {
  private _kindEnum: string;
  private _kindProperty: string;

  constructor(kindEnum: string, kindProperty: string) {
    this._kindEnum = kindEnum;
    this._kindProperty = kindProperty;
  }

  create(descendantControlDigest: DescendantControlDigest): DescendantControl[] {
    const descendantControls: DescendantControl[] = [];

    if (descendantControlDigest.excludeType !== undefined) {
      descendantControls.push(
        new DescendantControlExcludeType(
          descendantControlDigest.dtdlVersion,
          descendantControlDigest.rootClass,
          descendantControlDigest.properties,
          descendantControlDigest.narrow,
          descendantControlDigest.excludeType,
          this._kindEnum,
          this._kindProperty
        )
      );
    }

    if (descendantControlDigest.datatypeProperty !== undefined) {
      descendantControls.push(
        new DescendantControlDatatypeProperty(
          descendantControlDigest.dtdlVersion,
          descendantControlDigest.rootClass,
          descendantControlDigest.properties,
          descendantControlDigest.narrow,
          descendantControlDigest.datatypeProperty
        )
      );
    }

    if (descendantControlDigest.maxDepth !== undefined) {
      if (descendantControlDigest.importProperties !== undefined) {
        descendantControls.push(
          new DescendantControlImportProperties(
            descendantControlDigest.dtdlVersion,
            descendantControlDigest.rootClass,
            descendantControlDigest.definingClass,
            descendantControlDigest.properties,
            descendantControlDigest.narrow,
            descendantControlDigest.importProperties,
            descendantControlDigest.maxDepth as number
          )
        );
      } else {
        descendantControls.push(
          new DescendantControlMaxDepth(
            descendantControlDigest.dtdlVersion,
            descendantControlDigest.rootClass,
            descendantControlDigest.properties,
            descendantControlDigest.narrow,
            descendantControlDigest.maxDepth as number
          )
        );
      }
    }

    if (descendantControlDigest.maxCount !== undefined) {
      descendantControls.push(
        new DescendantControlMaxCount(
          descendantControlDigest.dtdlVersion,
          descendantControlDigest.rootClass,
          descendantControlDigest.properties,
          descendantControlDigest.narrow,
          descendantControlDigest.maxCount as number
        )
      );
    }

    return descendantControls;
  }
}
