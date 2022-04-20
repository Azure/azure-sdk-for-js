// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable valid-jsdoc */
/* eslint-disable guard-for-in */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */

import { PropertyConstraint } from "./internal";
import { SupplementalPropertyInfoImpl, SupplementalTypeInfo } from "./internal";
import { ElementPropertyConstraint } from "./internal";
import { InDTMI } from "./internal";
import { ParsingError, createParsingError } from "./internal";
import { PropertyInstanceBinder } from "./internal";
import { PropertyValueConstrainer } from "./internal";
import { ValueConstraint } from "./internal";
import { ValueParser } from "./internal";
import { AggregateContext } from "./internal";
import { ParsedObjectPropertyInfo } from "./internal";
import { EntityKinds } from "./internal";
import { Model } from "./internal";
import { ExtensionKind } from "./internal";
import { URL } from "../utils/url";
/**
 * Class that provides information about a type is not materialized as a TS class.
 **/
export class SupplementalTypeInfoImpl implements SupplementalTypeInfo {
  readonly allowedCotypeKinds: EntityKinds[];
  readonly extensionKind: ExtensionKind;

  constructor(
    extensionKind: ExtensionKind,
    contextId: string,
    type: string,
    isAbstract: boolean,
    parentType?: string
  ) {
    // codegen-outline-begin constructor
    this.contextId = contextId;
    this.type = type;
    this.isAbstract = isAbstract;
    this.parentType = parentType;

    this.properties = {};
    this._propertyConstraints = [];
    this._allowedCotypeVersions = [];
    // codegen-outline-end
    this.extensionKind = extensionKind;
    this.allowedCotypeKinds = [];
  }

  addCotype(cotypeKind: EntityKinds): void {
    this.allowedCotypeKinds.push(cotypeKind);
  }

  // codegen-outline-begin fields
  // The context ID of the extension in which the supplemental type was defined.
  readonly contextId: string;
  // URI string that represents the type.
  readonly type: string;
  // True if the supplemental type is abstract.
  readonly isAbstract: boolean;
  // URI string that represents the immediate parent in the type hierarchy.
  readonly parentType?: string;
  // A dictionary that maps each string-valued property name to a SupplementalPropertyInfo object that describes the property with the given name.
  properties: { [x: string]: SupplementalPropertyInfoImpl };
  // A list of constraints on a property of an element.
  private _propertyConstraints: PropertyConstraint[];
  // A SupplementalTypeInfo that points to the parent of this supplemental type, if the parent is also supplemental.
  parentSupplementalType?: SupplementalTypeInfo;
  // A collection of kinds of allowed cotypes for this supplemental type.
  private _allowedCotypeVersions: number[];
  // codegen-outline-end

  // codegen-outline-begin block1
  doesHaveType(typeId: string): boolean {
    return (
      this.type === typeId ||
      (this.parentSupplementalType !== undefined &&
        (this.parentSupplementalType as SupplementalTypeInfoImpl).doesHaveType(typeId))
    );
  }

  addCotypeVersion(version: number) {
    this._allowedCotypeVersions.push(version);
  }

  /**
   * Attach any constraints to properties that are not properties of this supplemental type.
   * @param {PropertyValueConstrainer} propertyValueConstrainer - A PropertyValueConstrainer to call back to add each constraint.
   */
  attachConstraints(propertyValueConstrainer: PropertyValueConstrainer) {
    for (let i = 0; i < this._propertyConstraints.length; i++) {
      const propertyConstraint = this._propertyConstraints[i];
      propertyValueConstrainer.addConstraint(
        propertyConstraint.PropertyName,
        propertyConstraint.ValueConstraint
      );
    }

    if (this.parentSupplementalType !== undefined) {
      (this.parentSupplementalType as SupplementalTypeInfoImpl).attachConstraints(
        propertyValueConstrainer
      );
    }
  }

  /**
   * Bind properties that are instance of another property.
   * @param {PropertyInstanceBinder} propertyInstanceBinder - A PropertyInstanceBinder to call back to add each instance binding.
   */
  bindInstanceProperties(propertyInstanceBinder: PropertyInstanceBinder) {
    // foreach key value pair in this.properties
    for (const [key, value] of Object.entries(this.properties)) {
      propertyInstanceBinder.addInstanceProperty(value.instanceProperty || "", key);
    }

    if (this.parentSupplementalType !== undefined) {
      (this.parentSupplementalType as SupplementalTypeInfoImpl).bindInstanceProperties(
        propertyInstanceBinder
      );
    }
  }

  /**
   * Parse a property in a JSON token
   * @param model - Model to which to add object properties.
   * @param objectPropertyInfoList - List of object info structs for deferred assignments.
   * @param elementPropertyConstraints - List of <c>ElementPropertyConstraint</c> to be checked after object property assignment.
   * @param aggregateContext - An <c>AggregateContext</c> object representing information retrieved from JSON-LD context blocks.
   * @param parsingErrors - A <c>ParsingErrorCollection</c> to which any parsing errors are added.
   * @param parentId - The identifier of the parent of the element.
   * @param propName - The name of the property by which the parent refers to this element, used for auto ID generation.
   * @param propToken - The property token to parse.
   * @param properties - A collection of properties to update with the property information.
   * @return True if the property name is recognized.
   */
  tryParseProperty(
    model: Model,
    objectPropertyInfoList: ParsedObjectPropertyInfo[],
    elementPropertyConstraints: ElementPropertyConstraint[],
    aggregateContext: AggregateContext,
    parsingErrors: ParsingError[],
    parentId: string,
    propName: string,
    propToken: any, // originally jtoken
    properties: { [x: string]: any }
  ): boolean {
    const propertyInfo: SupplementalPropertyInfoImpl = this.properties[propName];
    if (propertyInfo) {
      const urlType = new URL(propertyInfo.type);
      if (urlType.protocol.includes("http")) {
        switch (urlType.hash) {
          case "#langString": {
            properties[propName] = ValueParser.parseLangStringToken(
              parentId,
              propName,
              propToken,
              "en",
              undefined,
              undefined,
              parsingErrors
            );
            break;
          }
          case "#boolean": {
            properties[propName] = ValueParser.parseSingularBooleanToken(
              parentId,
              propName,
              propToken,
              parsingErrors
            );
            break;
          }
          case "#integer": {
            properties[propName] = ValueParser.parseSingularIntegerToken(
              parentId,
              propName,
              propToken,
              undefined,
              undefined,
              parsingErrors
            );
            break;
          }
          case "#string": {
            properties[propName] = ValueParser.parseSingularStringToken(
              parentId,
              propName,
              propToken,
              undefined,
              undefined,
              parsingErrors
            );
            break;
          }
          case "#JSON": {
            // TODO: Do we even need to be processing this or can we just treat it as a javascript object form?
            // const propDoc = JSON.parse(helpers.getJsonTextFromToken(propToken));
            properties[propName] = propToken;
            break;
          }
        }
      } else if (urlType.protocol.includes("dtmi")) {
        const valueCount: number = SupplementalTypeInfoImpl._parseToken(
          objectPropertyInfoList,
          elementPropertyConstraints,
          aggregateContext,
          parsingErrors,
          propToken,
          parentId,
          propName,
          propertyInfo.valueConstraint
        );
        properties[propName] = undefined; // make note of the fact that this property is present, even though we can't set it yet.

        if (
          propertyInfo.minCount !== undefined &&
          propertyInfo.minCount !== undefined &&
          valueCount < propertyInfo.minCount
        ) {
          parsingErrors.push(
            createParsingError("dtmi:dtdl:parsingError:propertyCountBelowMin", {
              cause: `{{primaryId:p}} property '{propName}' has '{valueCount}' value(s) but the required minimum count is '{propertyInfo.minCount}'.`,
              action: `Add one or more '{propName}' properties to the object until the minimum count is satisfied`,
              primaryId: parentId,
              property: propName
            })
          );
        } else if (propertyInfo.maxCount !== undefined && valueCount > propertyInfo.maxCount) {
          parsingErrors.push(
            createParsingError("dtmi:dtdl:parsingError:propertyCountAboveMax", {
              cause: `{{primaryId:p}} property '{propName}' has {valueCount} value(s) but the allowed maximum count is {propertyInfo.MinCount}.`,
              action: `Remove one or more '{propName}' propertes from the object until the maximum count is satisfied.`,
              primaryId: parentId,
              property: propName
            })
          );
        }
      }

      return true;
    }

    return (
      this.parentSupplementalType !== undefined &&
      (this.parentSupplementalType as SupplementalTypeInfoImpl).tryParseProperty(
        model,
        objectPropertyInfoList,
        elementPropertyConstraints,
        aggregateContext,
        parsingErrors,
        parentId,
        propName,
        propToken,
        properties
      )
    );
  }

  /**
   * Check that all non-optional properties have been set.
   * @param parsingErrors - A list of ParsingErrors to which missing-required-property parsing errors are added as appropriate.
   * @param parentId - The identifier of the parent of the element.
   * @param properties - A collection of properties to update with the property information.
   */
  checkForRequiredProperties(
    parsingErrors: ParsingError[],
    parentId: string,
    properties: { [x: string]: any }
  ): void {
    for (const [key, value] of Object.entries(this.properties)) {
      if (!value.isOptional && !Object.keys(properties).includes(key)) {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:missingRequiredProperty", {
            cause: `{{primaryId:p}} property '${key}' is required but missing.`,
            action: `Add a '${key}' property to the object.`,
            primaryId: parentId,
            property: key
          })
        );
      }
    }
  }

  /**
   * Try to set an object property with a given propertyName
   * @param propertyName - The name of the property whose value to set if the property is recognized.
   * @param value - The value to set.
   * @param key - The key for dictionary properties.
   * @param properties - A collection of properties to update with the property information.
   * @returns True if the property name is recognized.
   */
  trySetObjectProperty(
    propertyName: string,
    value: any,
    key: string | undefined,
    properties: { [x: string]: any }
  ): boolean {
    if (
      this.parentSupplementalType !== undefined &&
      (this.parentSupplementalType as SupplementalTypeInfoImpl).trySetObjectProperty(
        propertyName,
        value,
        key,
        properties
      )
    ) {
      return true;
    }

    const propertyInfo: SupplementalPropertyInfoImpl = this.properties[propertyName];
    if (
      propertyInfo === undefined ||
      (!propertyInfo.type.includes("dtmi") && !propertyInfo.type.includes("urn"))
    ) {
      return false;
    }

    if (propertyInfo.dictionaryKey !== undefined) {
      if (
        !Object.keys(properties).includes(propertyName) ||
        properties[propertyName] === undefined
      ) {
        properties[propertyName] = {};
      }

      if (key !== undefined) {
        properties[propertyName][key] = value;
      }
    } else if (propertyInfo.isPlural) {
      if (
        !Object.keys(properties).includes(propertyName) ||
        properties[propertyName] === undefined
      ) {
        properties[propertyName] = [];
      }

      (properties[propertyName] as Array<any>).push(value);
    } else {
      properties[propertyName] = value;
    }

    return true;
  }

  /**
   * Adds a property to this supplemental type
   * @param propertyName - Name of the property.
   * @param propertyTypeUri - URI that defines the type of the property.
   * @param maxCount - The maximum count of permitted values of the property.
   * @param minCount - The minimum count of permitted values of the property.
   * @param isPlural - True if the property is plural.
   * @param isOptional - True if the property is optional.
   * @param dictionaryKey - The name of the child property that acts as a dictionary key, or undefined if this property is not expressed as a dictionary.
   * @param instanceProperty - The name of a property of which this property's value must be an instance.
   */
  addProperty(
    propertyName: string,
    propertyTypeUri: string,
    isPlural: boolean,
    isOptional: boolean,
    maxCount?: number,
    minCount?: number,
    dictionaryKey?: string,
    instanceProperty?: string
  ) {
    this.properties[propertyName] = new SupplementalPropertyInfoImpl(
      propertyTypeUri,
      isPlural,
      isOptional,
      minCount,
      maxCount,
      dictionaryKey,
      instanceProperty
    );
  }

  /**
   * Adds a type constraint to this supplemental type.
   * @param propertyName - Name of the property whose type to constrain.
   * @param valueConstraint A ValueConstraint for values of this property.
   */
  addConstraint(propertyName: string, valueConstraint: ValueConstraint) {
    const newPropertyConstraint: PropertyConstraint = {
      PropertyName: propertyName,
      ValueConstraint: valueConstraint
    };
    this._propertyConstraints.push(newPropertyConstraint);
  }

  private static _parseToken(
    objectPropertyInfoList: ParsedObjectPropertyInfo[],
    elementPropertyConstraints: ElementPropertyConstraint[],
    aggregateContext: AggregateContext,
    parsingErrors: ParsingError[],
    token: any,
    parentId: string,
    propName: string,
    valueConstraint?: ValueConstraint
  ): number {
    let valueCount: number = 0;

    if (typeof token === "string") {
      if (parentId !== "") {
        // TODO FOR LATER : Do we need to create DTMI ?
        const parentDtmi = InDTMI.createDtmi(parentId);
        const elementId = aggregateContext.createDtmi(token);
        // parentDtmi *should* never be undefined, because parentId is not empty string.
        // But we need this check anyway for type coercion.
        if (elementId !== undefined && parentDtmi !== undefined) {
          objectPropertyInfoList.push({
            elementId: parentDtmi.value,
            propertyName: propName,
            referencedElementId: elementId.value,
            keyProperty: undefined,
            expectedKinds: undefined,
            allowedVersions: undefined,
            badTypeCauseFormat: undefined,
            badTypeActionFormat: undefined
          });
          if (valueConstraint !== undefined && elementPropertyConstraints !== undefined) {
            const elementPropertyConstraint = {
              parentId: parentId,
              propertyName: propName ?? "",
              elementId: elementId.value,
              valueConstraint: valueConstraint
            };
            elementPropertyConstraints.push(elementPropertyConstraint);
          }
        } else {
          parsingErrors.push(
            createParsingError("dtmi:dtdl:parsingError:badDtmiOrTerm", {
              cause: `{primaryId:p} property '{propName}' has value '{propVal}' that is not a DTMI or a DTDL term.`,
              action: `Replace the value of property '{propName}', with a valid DTMI or a term defined by DTDL -- see https://github.com/Azure/opendigitaltwins-dtdl/tree/master/DTDL.`,
              primaryId: parentId,
              property: propName,
              value: token
            })
          );
        }

        valueCount++;
      }
    } else if (Array.isArray(token)) {
      token.forEach((elementToken: any) => {
        valueCount += this._parseToken(
          objectPropertyInfoList,
          elementPropertyConstraints,
          aggregateContext,
          parsingErrors,
          elementToken,
          parentId,
          propName,
          valueConstraint
        );
      });
    } else {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:badDtmiOrTerm", {
          cause:
            "{primaryId:p} property '{property}' has value '{value}' that is not a DTMI or a DTDL term.",
          action:
            "Replace the value of property '{property}, with a valid DTMI or a term defined by DTDL -- see https://github.com/Azure/opendigitaltwins-dtdl/tree/master/DTDL.",
          primaryId: parentId,
          property: propName,
          value: token
        })
      );
      valueCount++;
    }

    return valueCount;
  }

  public get allowedCotypeVersions(): number[] {
    return this._allowedCotypeVersions;
  }
  // codegen-outline-end
}
