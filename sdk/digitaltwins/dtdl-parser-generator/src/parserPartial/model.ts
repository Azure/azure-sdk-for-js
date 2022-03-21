// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable valid-jsdoc */

// This file should be codegenned; it assumes knowledge that the base DTDL type is Entity
// All methods are currently dummies; they should call corresponding methods on the EntityInfo objects in the dictionary

// codegen-outline-begin topoffile
import { ParsedObjectPropertyInfo, ParsingError, createParsingError } from "../parser/internal";
// codegen-outline-end

// type EntityInfo = { [prop: string]: any }; // faking for now since the EntityInfo class is not defined
type EntityInfoImpl = { [prop: string]: any }; // faking for now since the EntityInfoImpl class is not defined
// TODO: Eventually this needs to be codegenned
export type ModelDict = { [id: string]: any };

export class Model {
  // codegen-outline-begin fields
  readonly dict: ModelDict;
  // codegen-outline-end

  constructor() {
    // codegen-outline-begin constructor
    this.dict = {};
    // codegen-outline-end
  }

  // codegen-outline-begin method-block

  hasElementWithId(elementId: string): boolean {
    return Object.prototype.hasOwnProperty.call(this.dict, elementId);
  }

  /**
   * Set the object properties from objectPropertyInfoList on elements in this Model.
   * @param objectPropertyInfoList - Object property information for the this.
   * @param parsingErrors - A list of ParsingErrors to which any parsing error is added.
   */
  setObjectProperties(
    objectPropertyInfoList: ParsedObjectPropertyInfo[],
    parsingErrors: ParsingError[]
  ): void {
    for (const objectPropertyInfo of objectPropertyInfoList) {
      if (!(this.dict[objectPropertyInfo.referencedElementId] as EntityInfoImpl)?.isPartition) {
        // TODO: will this ever be undefined?
        const elementIdValue = this.dict[objectPropertyInfo.elementId] as EntityInfoImpl;
        // TODO: isPartition will be a boolean value... So is this OR operation correct?
        const sourcePartition: string | undefined =
          elementIdValue?.isPartition || elementIdValue?.definedIn === undefined
            ? objectPropertyInfo.elementId
            : elementIdValue?.definedIn;
        const targetPartition: string | undefined = this.dict[
          objectPropertyInfo.referencedElementId
        ]?.definedIn;
        if (targetPartition !== undefined && targetPartition !== sourcePartition) {
          parsingErrors.push(
            createParsingError("dtmi:dtdl:parsingError:crossPartitionReference", {
              cause: `{primaryId:p} property '${objectPropertyInfo.propertyName}' refers to \${secondaryId}, which is defined under ${targetPartition}.`,
              action: `Create a copy of \${secondaryId} under ${sourcePartition}, give it a unique @id value, and refer to it instead of \${secondaryId}.`,
              primaryId: objectPropertyInfo.elementId,
              secondaryId: objectPropertyInfo.referencedElementId,
              property: objectPropertyInfo.propertyName
            })
          );
        }
      }
      // TODO: this is replacing this.IsKindInSet, which is generated. What do we do here?
      if (
        objectPropertyInfo.expectedKinds !== undefined &&
        objectPropertyInfo.expectedKinds.length !== 0 &&
        !this.isKindInSet(objectPropertyInfo.referencedElementId, objectPropertyInfo.expectedKinds)
      ) {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:badType", {
            cause: objectPropertyInfo.badTypeCauseFormat || "",
            action: objectPropertyInfo.badTypeActionFormat || "",
            primaryId: objectPropertyInfo.elementId,
            secondaryId: objectPropertyInfo.referencedElementId,
            property: objectPropertyInfo.propertyName,
            value: this.getKindString(objectPropertyInfo.referencedElementId)
          })
        );
      }

      if (
        objectPropertyInfo.allowedVersions !== undefined &&
        objectPropertyInfo.allowedVersions.size !== 0 &&
        typeof this.dict[objectPropertyInfo.referencedElementId]?.dtdlVersion === "number" &&
        !objectPropertyInfo.allowedVersions.has(
          this.dict[objectPropertyInfo.referencedElementId]?.dtdlVersion as number
        )
      ) {
        parsingErrors.push(
          createParsingError(`dtmi:dtdl:parsingError:disallowedVersionReference`, {
            cause: `{primaryId:p} property '${objectPropertyInfo.propertyName}' refers to {secondaryId}, which is defined in DTDL version {this.dict[objectPropertyInfo.referencedElementId.value]?.dtdlVersion}, which is not allowed for this property.`,
            action: `Change the value of property '{property}' to an element defined in one of the following DTDL versions: {string.Join(" ,", objectPropertyInfo.AllowedVersions)}.`,
            primaryId: objectPropertyInfo.elementId,
            secondaryId: objectPropertyInfo.referencedElementId,
            property: objectPropertyInfo.propertyName
          })
        );
      }

      let dictKey: string = "";
      if (objectPropertyInfo.keyProperty !== undefined) {
        const keyToken = (this.dict[objectPropertyInfo.referencedElementId] as EntityInfoImpl)
          ?.sourceObject[objectPropertyInfo.keyProperty];
        if (keyToken === undefined || typeof keyToken !== "string") {
          parsingErrors.push(
            createParsingError(`dtmi:dtdl:parsingError:missingRequiredProperty`, {
              cause: `{primaryId:p} property '${objectPropertyInfo.propertyName}' requires property '${objectPropertyInfo.keyProperty}' to be specified but it is not.`,
              action: `Add a '${objectPropertyInfo.keyProperty}' property with a string value that is unique across all values of '${objectPropertyInfo.propertyName}'.`,
              primaryId: objectPropertyInfo.elementId,
              property: objectPropertyInfo.propertyName,
              value: objectPropertyInfo.keyProperty
            })
          );
        }

        // TODO: Is this equivalent to ((JValue)keyToken).Value<string>();
        dictKey = keyToken.toString();
      }

      // TODO: Rather than undefined I have defined dictKey as ''. Should that change? We should be aware to avoid bugs.
      if (
        this.doesPropertyDictContainKey(
          objectPropertyInfo.elementId,
          objectPropertyInfo.propertyName,
          dictKey
        )
      ) {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:nonUniquePropertyValue", {
            cause: `{primaryId:p} property '${objectPropertyInfo.propertyName}' contains more than one element whose property '${objectPropertyInfo.keyProperty}' has value '${dictKey}'.`,
            action: `Change the value of property '${objectPropertyInfo.keyProperty}' to a string value that is unique across all values of '${objectPropertyInfo.propertyName}'.`,
            primaryId: objectPropertyInfo.elementId,
            property: objectPropertyInfo.propertyName,
            value: objectPropertyInfo.keyProperty
          })
        );
      } else {
        this.trySetObjectProperty(
          objectPropertyInfo.elementId,
          objectPropertyInfo.propertyName,
          objectPropertyInfo.referencedElementId,
          dictKey
        );
      }
    }
  }
  // codegen-outline-end

  trySetObjectProperty(
    _elementId: string,
    _propertyName: string,
    _referencedElementId: string,
    _dictKey: string
  ): void {
    throw new Error("Method not implemented.");
  }

  getKindString(_referencedElementId: string): string {
    throw new Error("Method not implemented.");
  }

  isKindInSet(_referencedElementId: string, _expectedKinds: any[]): boolean {
    throw new Error("Method not implemented.");
  }

  applyTransformations(_parsingErrors: ParsingError[]): void {
    /* empty */
  }

  checkRestrictions(_parsingErrors: ParsingError[]): void {
    /* empty */
  }

  doesHaveType(_elementId: string, _typeId: string): boolean {
    return true;
  }

  doesPropertyDictContainKey(_elementId: string, _propertyName: string, _key: string): boolean {
    return false;
  }
}
