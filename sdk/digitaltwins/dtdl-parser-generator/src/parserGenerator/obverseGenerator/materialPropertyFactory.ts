// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context, MaterialPropertyDigest } from "../metamodelDigest";
import { ParserGeneratorValues } from "../parserGeneratorValues";
import { MaterialProperty } from "./materialProperty";
import { BooleanLiteralType } from "./booleanLiteralType";
import { IntegerLiteralType } from "./integerLiteralType";
import { LiteralType } from "./literalType";
import { LangStringLiteralProperty } from "./langstringLiteralProperty";
import { PluralTypedLiteralProperty } from "./pluralTypedLiteralProperty";
import { SingularTypedLiteralProperty } from "./singularTypedLiteralProperty";
import { StringLiteralType } from "./stringLiteralType";
import { PluralUntypedLiteralProperty } from "./pluralUntypedLiteralProperty";
import { SingularUntypedLiteralProperty } from "./singularUntypedLiteralProperty";
import { DictionaryObjectProperty } from "./dictionaryObjectProperty";
import { PluralObjectProperty } from "./pluralObjectProperty";
import { SingularObjectProperty } from "./singularObjectProperty";
import { PluralIdentifierProperty } from "./pluralIdentifierProperty";
import { SingularIdentifierProperty } from "./singularIdentifierProperty";
import { PropertyRestriction } from "./propertyRestriction";
import { PropertyRestrictionRequiredValues } from "./propertyRestrictionRequiredValues";
import { PropertyRestrictionUniqueProperties } from "./propertyRestrictionUniqueProperties";

export class MaterialPropertyFactory {
  // TODO Remove undefined
  public static create(
    dtdlVersions: number[],
    propertyName: string,
    propertyToken: MaterialPropertyDigest,
    dtdlContexts: { [contextId: string]: Context },
    baseClassname: string
  ): MaterialProperty | undefined {
    const propertyNameUris: { [dtdlVersion: number]: string } = {};
    for (const dtdlVersion of dtdlVersions) {
      propertyNameUris[dtdlVersion] =
        dtdlContexts[ParserGeneratorValues.getDtdlContextIdString(dtdlVersion)][propertyName];
    }
    // TODO Property Restrictions.
    const propertyRestrictions = this.getPropertyRestrictions(
      dtdlContexts,
      propertyName,
      propertyToken
    );
    if (propertyToken._.literal) {
      if (propertyToken._.datatype !== undefined) {
        if (propertyToken._.datatype === "langString") {
          return new LangStringLiteralProperty(
            propertyName,
            propertyNameUris,
            propertyToken,
            propertyRestrictions
          );
        }
        let literalType: LiteralType;
        switch (propertyToken._.datatype) {
          case "boolean":
            literalType = new BooleanLiteralType();
            break;
          case "integer":
            literalType = new IntegerLiteralType();
            break;
          case "string":
            literalType = new StringLiteralType();
            break;
          default:
            throw new Error("unrecongnied type");
        }

        if (propertyToken._.plural) {
          // TODO: This will eventually get implemented, and idk why will be obversePropertyName....
          // In the node case the obversePropertyName is the same as propertyName, so obversePropertyName is unnecessary. TODO: Remove obversePropertyName
          return new PluralTypedLiteralProperty({
            propertyName: propertyName,
            propertyNameUris: propertyNameUris,
            propertyDigest: propertyToken,
            propertyRestrictions: propertyRestrictions,
            datatype: propertyToken._.datatype,
            literalType: literalType
          });
        } else {
          // TODO: This will eventually get implemented, and idk why will be obversePropertyName....
          return new SingularTypedLiteralProperty({
            propertyName: propertyName,
            propertyNameUris: propertyNameUris,
            propertyDigest: propertyToken,
            propertyRestrictions: propertyRestrictions,
            datatype: propertyToken._.datatype,
            literalType: literalType
          });
        }
      } else {
        if (propertyToken._.plural) {
          return new PluralUntypedLiteralProperty(
            propertyName,
            propertyNameUris,
            propertyToken,
            propertyRestrictions
          );
        } else {
          return new SingularUntypedLiteralProperty(
            propertyName,
            propertyNameUris,
            propertyToken,
            propertyRestrictions
          );
        }
      }
    } else if (propertyToken._.class !== undefined) {
      if (propertyToken._.dictionaryKey !== undefined) {
        return new DictionaryObjectProperty(
          propertyName,
          propertyNameUris,
          propertyToken,
          propertyRestrictions
        );
      } else if (propertyToken._.plural) {
        return new PluralObjectProperty(
          propertyName,
          propertyNameUris,
          propertyToken,
          propertyRestrictions
        );
      } else {
        return new SingularObjectProperty(
          propertyName,
          propertyNameUris,
          propertyToken,
          propertyRestrictions
        );
      }
    } else {
      if (propertyToken._.plural) {
        return new PluralIdentifierProperty(
          propertyName,
          propertyNameUris,
          propertyToken,
          propertyRestrictions,
          baseClassname
        );
      } else {
        return new SingularIdentifierProperty(
          propertyName,
          propertyNameUris,
          propertyToken,
          propertyRestrictions,
          baseClassname
        );
      }
    }
  }

  private static getPropertyRestrictions(
    dtdlContexts: { [contextId: string]: Context },
    propertyName: string,
    propertyDigest: MaterialPropertyDigest
  ): { [x: number]: PropertyRestriction[] } {
    const propertyRestrictions: { [version: number]: PropertyRestriction[] } = {};

    Object.entries(propertyDigest).forEach(([version, versionedValue]) => {
      if (version === "_") {
        return; // skip underscore and stop processing this iteration
      }
      // const _versionedPropertyDigest = versionedValue;
      const versionedRestrictions: PropertyRestriction[] = [];
      if (
        !Object.prototype.hasOwnProperty.call(propertyRestrictions, version) &&
        propertyRestrictions[(version as unknown) as number] === undefined
      ) {
        propertyRestrictions[(version as unknown) as number] = versionedRestrictions;
      }
      if (versionedValue.values !== undefined) {
        versionedRestrictions.push(
          new PropertyRestrictionRequiredValues(
            propertyName,
            versionedValue.values,
            dtdlContexts[
              ParserGeneratorValues.getDtdlContextIdString((version as unknown) as number)
            ]
          )
        );
      }
      if (versionedValue.uniqueProperties !== undefined) {
        // eslint-disable-next-line no-empty
        for (const uniquePropName of versionedValue.uniqueProperties) {
          if (uniquePropName !== propertyDigest._.dictionaryKey) {
            versionedRestrictions.push(
              new PropertyRestrictionUniqueProperties(propertyName, uniquePropName)
            );
          }
        }
      }
    });
    return propertyRestrictions;
  }
}
