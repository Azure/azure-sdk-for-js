// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable valid-jsdoc */
/* eslint-disable guard-for-in */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */

import { TypeChecker } from "./internal";
import { PrimitiveSchemaInfo } from "./internal";
import { PrimitiveSchemaKinds } from "./internal";
import { EntityKinds } from "./internal";
import { LanguageStringType } from "./internal";
import { SupplementalTypeInfo } from "./internal";
import { SupplementalTypeInfoImpl } from "./internal";
import { IdValidator } from "./internal";
import { ParsingError, createParsingError } from "./internal";
import { AggregateContext } from "./internal";
import { InDTMI } from "./internal";
import { Reference, referenceInit } from "../common/reference";
import { Model } from "./internal";
import { ParsedObjectPropertyInfo } from "./internal";
import { ElementPropertyConstraint, ValueParser, ValueConstraint } from "./internal";
import { ModelParserImpl } from "./internal";
import { BooleanInfoImpl } from "./internal";
import { DateInfoImpl } from "./internal";
import { DateTimeInfoImpl } from "./internal";
import { DoubleInfoImpl } from "./internal";
import { DurationInfoImpl } from "./internal";
import { FloatInfoImpl } from "./internal";
import { IntegerInfoImpl } from "./internal";
import { LongInfoImpl } from "./internal";
import { StringInfoImpl } from "./internal";
import { TimeInfoImpl } from "./internal";
import { MaterialTypeNameCollection } from "./internal";
import { ExtensionKind } from "./internal";
import { EntityInfo } from "./internal";
export abstract class PrimitiveSchemaInfoImpl implements PrimitiveSchemaInfo, TypeChecker {
  public dtdlVersion: number;
  public id: string;
  public childOf: string | undefined;
  public definedIn: string | undefined;
  public entityKind: PrimitiveSchemaKinds;
  public comment?: string;
  public description?: LanguageStringType;
  public displayName?: LanguageStringType;
  public languageVersion?: number;
  public supplementalTypeIds: string[];
  public supplementalProperties: { [x: string]: any };
  public supplementalTypes: SupplementalTypeInfo[];
  public undefinedTypes: string[];
  public undefinedProperties: { [name: string]: any };
  public sourceObject: any;
  public isPartition: boolean;
  protected static _versionlessTypes: Set<string>;
  protected static _concreteKinds: { [x: number]: PrimitiveSchemaKinds[] };
  protected static _badTypeActionFormat: { [x: number]: string };
  protected static _badTypeCauseFormat: { [x: number]: string };
  protected _checkedForDescendantSchemaOrContentsComponentNarrow: boolean;
  protected _idOfDescendantSchemaOrContentsComponentNarrow: InDTMI | undefined;
  protected _checkedDescendantEnumValueDatatype: string | undefined;
  protected _checkedForDescendantSchemaArray: boolean;
  protected _idOfDescendantSchemaArray: InDTMI | undefined;

  constructor(
    dtdlVersion: number,
    id: string,
    childOf: string | undefined,
    definedIn: string | undefined,
    entityKind: PrimitiveSchemaKinds
  ) {
    this.dtdlVersion = dtdlVersion;
    this.id = id;
    this.childOf = childOf;
    this.definedIn = definedIn;
    this.entityKind = entityKind;
    this.description = {};
    this.displayName = {};
    this.supplementalTypeIds = [];
    this.supplementalProperties = {};
    this.supplementalTypes = [];
    this.isPartition = false;
    this.undefinedTypes = [];
    this.undefinedProperties = {};
    this._checkedForDescendantSchemaOrContentsComponentNarrow = false;
    this._idOfDescendantSchemaOrContentsComponentNarrow = undefined;
    this._checkedDescendantEnumValueDatatype = undefined;
    this._checkedForDescendantSchemaArray = false;
    this._idOfDescendantSchemaArray = undefined;
  }

  static initialize() {
    this._versionlessTypes = new Set<string>()
      .add("dtmi:dtdl:class:Entity")
      .add("dtmi:dtdl:class:PrimitiveSchema")
      .add("dtmi:dtdl:class:Schema");
    this._concreteKinds = {};
    this._concreteKinds[2] = [];
    this._concreteKinds[2].push("boolean");
    this._concreteKinds[2].push("date");
    this._concreteKinds[2].push("datetime");
    this._concreteKinds[2].push("double");
    this._concreteKinds[2].push("duration");
    this._concreteKinds[2].push("float");
    this._concreteKinds[2].push("integer");
    this._concreteKinds[2].push("long");
    this._concreteKinds[2].push("string");
    this._concreteKinds[2].push("time");
    this._concreteKinds[3] = [];
    this._concreteKinds[3].push("boolean");
    this._concreteKinds[3].push("date");
    this._concreteKinds[3].push("datetime");
    this._concreteKinds[3].push("double");
    this._concreteKinds[3].push("duration");
    this._concreteKinds[3].push("float");
    this._concreteKinds[3].push("integer");
    this._concreteKinds[3].push("long");
    this._concreteKinds[3].push("string");
    this._concreteKinds[3].push("time");
    this._badTypeActionFormat = {};
    this._badTypeCauseFormat = {};
    this._badTypeActionFormat[2] = `Choose one of the following values for property '{property}': boolean, date, dateTime, double, duration, float, integer, long, string, time.`;
    this._badTypeActionFormat[3] = `Choose one of the following values for property '{property}': boolean, date, dateTime, double, duration, float, integer, long, string, time.`;
    this._badTypeCauseFormat[2] = `{primaryId:p} property '{property}' has value{secondaryId:e} that is not a standard value for this property.`;
    this._badTypeCauseFormat[3] = `{primaryId:p} property '{property}' has value{secondaryId:e} that is not a standard value for this property.`;
  }

  addType(dtmi: string, supplementalType: SupplementalTypeInfo | undefined): void {
    throw new Error("Attempt to add type to non augmentable type PrimitiveSchemaInfo");
  }

  doesHaveType(typeId: string): boolean {
    return PrimitiveSchemaInfoImpl._versionlessTypes.has(new InDTMI(typeId).versionless);
  }

  static parseObject(
    model: Model,
    objectPropertyInfoList: ParsedObjectPropertyInfo[],
    elementPropertyConstraints: ElementPropertyConstraint[],
    valueConstraints: ValueConstraint[],
    aggregateContext: AggregateContext,
    parsingErrors: ParsingError[],
    object: { [index: string]: any },
    parentId: string | undefined,
    definedIn: string | undefined,
    propName: string | undefined,
    dtmiSeg: string | undefined,
    keyProp: string | undefined,
    idRequired: boolean,
    typeRequired: boolean,
    allowIdReferenceSyntax: boolean,
    allowedVersions: Set<number>
  ): any {
    // This is a method to parse the object read from DTDL into a type of PrimitiveSchemaInfo
    const childAggregateContext = aggregateContext.getChildContext(object, parsingErrors);
    if (
      Object.keys(object).length === 1 &&
      Object.prototype.hasOwnProperty.call(object, "@id") &&
      typeof object["@id"] === "string"
    ) {
      if (allowIdReferenceSyntax && parentId !== undefined) {
        this.parseIdString(
          objectPropertyInfoList,
          elementPropertyConstraints,
          valueConstraints,
          childAggregateContext,
          parsingErrors,
          object["@id"],
          parentId,
          propName,
          keyProp,
          allowedVersions
        );
        return;
      } else {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:idReference", {
            cause: `{primaryId:p} property '{property}' has an inline definition containing nothing but an '@id' property.`,
            action: `Replace the inline definition with a string value of '{secondaryId}', or provide a complete inline definition for property '{property}'.`,
            primaryId: parentId,
            property: propName,
            secondaryId: object["@id"]
          })
        );
        return;
      }
    }

    if (
      allowedVersions !== undefined &&
      allowedVersions.size !== 0 &&
      !allowedVersions.has(childAggregateContext.dtdlVersion)
    ) {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:disallowedVersionDefinition", {
          cause: `{primaryId:p} property '{property}' has a value that specifies DTDL context version ${childAggregateContext.dtdlVersion}, which is not allowed for this property.`,
          action: `Change the DTDL context version of property '{property}' to one of the following: ${Array.from(
            allowedVersions.values()
          ).join(" ,")}.`,
          primaryId: parentId,
          property: propName
        })
      );
    }

    const typeToken = object["@type"];
    let typeTokenArr: any[] = [];
    const elementId = IdValidator.parseIdProperty(
      object,
      parentId !== undefined ? parentId : "",
      propName,
      dtmiSeg,
      idRequired,
      parsingErrors,
      childAggregateContext.dtdlVersion
    );
    if (elementId === undefined || elementId === null) {
      return;
    }

    if (Object.prototype.hasOwnProperty.call(model.dict, elementId)) {
      const elementDtmi = InDTMI.createDtmi(elementId);
      if (!elementDtmi?.isReserved) {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:duplicateDefinition", {
            cause: `{primaryId:p} has more than one definition.`,
            action: `Remove all but one JSON object containing '@id' property with value {primaryId}, or change the '@id' values so there are no duplicates.`,
            primaryId: elementId
          })
        );
      } else if (dtmiSeg !== undefined) {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:nonUniquePropertyValue", {
            cause: `{primaryId:p} property ${propName} contains more than one element whose property '{dtmiSeg}' has value ${dtmiSeg}`,
            action: `Change the value of property ${dtmiSeg} to a string value that is unique across all values of ${propName}.`,
            primaryId: parentId,
            property: propName,
            value: dtmiSeg
          })
        );
      }

      return;
    }

    if (typeRequired && typeToken === undefined) {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:badType", {
          cause: this._badTypeCauseFormat[childAggregateContext.dtdlVersion],
          action: this._badTypeActionFormat[childAggregateContext.dtdlVersion],
          primaryId: parentId,
          property: propName,
          secondaryId: elementId
        })
      );
      return;
    }

    if (typeToken === undefined) {
      typeTokenArr = ["PrimitiveSchema"];
    } else if (!Array.isArray(typeToken)) {
      typeTokenArr = [typeToken];
    } else {
      typeTokenArr = typeToken;
    }

    const elementInfo = this.parseTypeArray(
      typeTokenArr,
      elementId,
      parentId,
      definedIn,
      propName,
      childAggregateContext,
      parsingErrors
    );
    if (elementInfo === undefined) {
      return;
    }

    (elementInfo as PrimitiveSchemaInfoImpl).sourceObject = object;
    switch (childAggregateContext.dtdlVersion) {
      case 2: {
        (elementInfo as PrimitiveSchemaInfoImpl)?.parsePropertiesV2(
          model,
          objectPropertyInfoList,
          elementPropertyConstraints,
          childAggregateContext,
          parsingErrors,
          object,
          definedIn,
          allowIdReferenceSyntax
        );
        break;
      }

      case 3: {
        (elementInfo as PrimitiveSchemaInfoImpl)?.parsePropertiesV3(
          model,
          objectPropertyInfoList,
          elementPropertyConstraints,
          childAggregateContext,
          parsingErrors,
          object,
          definedIn,
          allowIdReferenceSyntax
        );
        break;
      }
    }

    model.dict[elementId] = elementInfo;
    if (parentId !== undefined) {
      const objectPropertyInfo: ParsedObjectPropertyInfo = {
        elementId: parentId,
        propertyName: propName || "",
        referencedElementId: elementId,
        keyProperty: keyProp,
        expectedKinds: [],
        allowedVersions: new Set<number>(),
        badTypeCauseFormat: undefined,
        badTypeActionFormat: undefined
      };
      objectPropertyInfoList.push(objectPropertyInfo);
      if (valueConstraints !== undefined && elementPropertyConstraints !== undefined) {
        for (const vc of valueConstraints) {
          const elementPropertyConstraint = {
            parentId: parentId,
            propertyName: propName,
            elementId: elementId,
            valueConstraint: vc
          };
          elementPropertyConstraints.push(elementPropertyConstraint);
        }
      }
    }
  }

  static parseTypeArray(
    tokenArr: any[],
    elementId: string,
    parentId: string | undefined,
    definedIn: string | undefined,
    propName: string | undefined,
    aggregateContext: AggregateContext,
    parsingErrors: ParsingError[]
  ): PrimitiveSchemaInfo | undefined {
    const materialKinds: EntityKinds[] = [];
    const elementInfo: Reference<PrimitiveSchemaInfo> = referenceInit();
    let anyFailures = false;
    const supplementalTypeIds: string[] = [];
    const undefinedTypes: string[] = [];
    for (const element of tokenArr) {
      if (typeof element !== "string") {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:badType", {
            cause: this._badTypeCauseFormat[aggregateContext.dtdlVersion],
            action: this._badTypeActionFormat[aggregateContext.dtdlVersion],
            primaryId: parentId,
            property: propName,
            secondaryId: elementId,
            value: element
          })
        );
        return undefined;
      }

      switch (aggregateContext.dtdlVersion) {
        case 2: {
          if (
            !this.tryParseTypeStringV2(
              element.toString(),
              elementId,
              parentId,
              definedIn,
              propName,
              materialKinds,
              supplementalTypeIds,
              elementInfo,
              undefinedTypes,
              aggregateContext,
              parsingErrors
            )
          ) {
            anyFailures = true;
          }

          break;
        }

        case 3: {
          if (
            !this.tryParseTypeStringV3(
              element.toString(),
              elementId,
              parentId,
              definedIn,
              propName,
              materialKinds,
              supplementalTypeIds,
              elementInfo,
              undefinedTypes,
              aggregateContext,
              parsingErrors
            )
          ) {
            anyFailures = true;
          }

          break;
        }
      }
    }

    if (anyFailures) {
      return undefined;
    }

    if (elementInfo.ref === undefined) {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:badType", {
          cause: this._badTypeCauseFormat[aggregateContext.dtdlVersion],
          action: this._badTypeActionFormat[aggregateContext.dtdlVersion],
          primaryId: parentId,
          property: propName,
          secondaryId: elementId
        })
      );
      return undefined;
    }

    if (materialKinds.length > 1) {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:multipleMaterialTypes", {
          cause: `{primaryId:p} has @type that specifies multiple material types: ${materialKinds.join(
            " ,"
          )}`,
          action: `Remove excess @type values so that only one material type remains.`,
          primaryId: elementId
        })
      );
      return undefined;
    }

    elementInfo.ref.undefinedTypes = undefinedTypes;
    for (const supplementalTypeId of supplementalTypeIds) {
      const supplementalTypeInfo = ModelParserImpl.retrieveSupplementalTypeCollection().supplementalTypes.get(
        supplementalTypeId
      );
      if (elementInfo.ref !== undefined && elementInfo.ref.entityKind !== undefined) {
        if (
          !(supplementalTypeInfo as SupplementalTypeInfoImpl)?.allowedCotypeKinds.includes(
            elementInfo.ref.entityKind
          )
        ) {
          parsingErrors.push(
            createParsingError("dtmi:dtdl:parsingError:invalidCotype", {
              cause: `{primaryId:p} has @type {value} that can only be applied to elements of @type ${(supplementalTypeInfo as SupplementalTypeInfoImpl)?.allowedCotypeKinds.join(
                " or "
              )} + '.'`,
              action: `Remove @type '{value}' from element.`,
              primaryId: elementId,
              value: AggregateContext.getTermOrUri(supplementalTypeId)
            })
          );
        } else if (
          !(supplementalTypeInfo as SupplementalTypeInfoImpl)?.allowedCotypeVersions.includes(
            elementInfo.ref.dtdlVersion
          )
        ) {
          parsingErrors.push(
            createParsingError("dtmi:dtdl:parsingError:invalidCotypeVersion", {
              cause: `{primaryId:p} has @type {value} that can only be applied to elements defined in DTDL version ${(supplementalTypeInfo as SupplementalTypeInfoImpl)?.allowedCotypeVersions.join(
                " or "
              )} + '.'`,
              action: `Remove @type '{value}' from element.`,
              primaryId: elementId,
              value: AggregateContext.getTermOrUri(supplementalTypeId)
            })
          );
        } else {
          (elementInfo.ref as PrimitiveSchemaInfoImpl).addType(
            supplementalTypeId,
            supplementalTypeInfo
          );
        }
      }
    }

    return elementInfo.ref;
    // this ends the method.
  }

  doesPropertyDictContainKey(propertyName: string, key: string | undefined): boolean {
    switch (propertyName) {
      default:
        return false;
    }
  }

  static tryParseTypeStringV2(
    typestring: string,
    elementId: string,
    parentId: string | undefined,
    definedIn: string | undefined,
    propName: string | undefined,
    materialKinds: EntityKinds[],
    supplementalTypeIds: string[],
    elementInfo: Reference<PrimitiveSchemaInfo>,
    undefinedTypes: string[],
    aggregateContext: AggregateContext,
    parsingErrors: ParsingError[]
  ): boolean {
    switch (typestring) {
      case "Boolean":
      case "dtmi:dtdl:class:Boolean;2":
        elementInfo.ref = new BooleanInfoImpl(2, elementId, parentId, definedIn, "boolean");
        materialKinds.push("boolean");
        return true;
      case "Date":
      case "dtmi:dtdl:class:Date;2":
        elementInfo.ref = new DateInfoImpl(2, elementId, parentId, definedIn, "date");
        materialKinds.push("date");
        return true;
      case "DateTime":
      case "dtmi:dtdl:class:DateTime;2":
        elementInfo.ref = new DateTimeInfoImpl(2, elementId, parentId, definedIn, "datetime");
        materialKinds.push("datetime");
        return true;
      case "Double":
      case "dtmi:dtdl:class:Double;2":
        elementInfo.ref = new DoubleInfoImpl(2, elementId, parentId, definedIn, "double");
        materialKinds.push("double");
        return true;
      case "Duration":
      case "dtmi:dtdl:class:Duration;2":
        elementInfo.ref = new DurationInfoImpl(2, elementId, parentId, definedIn, "duration");
        materialKinds.push("duration");
        return true;
      case "Float":
      case "dtmi:dtdl:class:Float;2":
        elementInfo.ref = new FloatInfoImpl(2, elementId, parentId, definedIn, "float");
        materialKinds.push("float");
        return true;
      case "Integer":
      case "dtmi:dtdl:class:Integer;2":
        elementInfo.ref = new IntegerInfoImpl(2, elementId, parentId, definedIn, "integer");
        materialKinds.push("integer");
        return true;
      case "Long":
      case "dtmi:dtdl:class:Long;2":
        elementInfo.ref = new LongInfoImpl(2, elementId, parentId, definedIn, "long");
        materialKinds.push("long");
        return true;
      case "String":
      case "dtmi:dtdl:class:String;2":
        elementInfo.ref = new StringInfoImpl(2, elementId, parentId, definedIn, "string");
        materialKinds.push("string");
        return true;
      case "Time":
      case "dtmi:dtdl:class:Time;2":
        elementInfo.ref = new TimeInfoImpl(2, elementId, parentId, definedIn, "time");
        materialKinds.push("time");
        return true;
    }
    if (MaterialTypeNameCollection.isMaterialType(typestring)) {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:badType", {
          cause: this._badTypeCauseFormat[2],
          action: this._badTypeActionFormat[2],
          primaryId: parentId,
          property: propName,
          secondaryId: elementId,
          value: typestring
        })
      );
    }

    const supplementalTypeId = aggregateContext.createDtmi(typestring);
    if (supplementalTypeId === undefined) {
      if (undefinedTypes === undefined) {
        undefinedTypes = [];
      }

      undefinedTypes.push(typestring);
      return true;
    }

    const mapOfInDTMIToSupplementalTypeInfo = ModelParserImpl.retrieveSupplementalTypeCollection()
      .supplementalTypes;
    if (
      supplementalTypeId !== undefined &&
      !mapOfInDTMIToSupplementalTypeInfo.has(supplementalTypeId.value)
    ) {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:badType", {
          cause: this._badTypeCauseFormat[2],
          action: this._badTypeActionFormat[2],
          primaryId: parentId,
          property: propName,
          secondaryId: elementId,
          value: typestring
        })
      );
      return false;
    }

    if (supplementalTypeId !== undefined) {
      const supplementalTypeInfo = mapOfInDTMIToSupplementalTypeInfo.get(supplementalTypeId.value);
      if (supplementalTypeInfo?.isAbstract) {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:abstractSupplementalType", {
            cause: `{primaryId:p} has @type that specifies supplemental type {value} that is abstract.`,
            action: `Remove @type {value} or replace with a concrete subtype of {value}.`,
            primaryId: elementId,
            property: "@type",
            value: AggregateContext.getTermOrUri(supplementalTypeId.value)
          })
        );
      }

      switch ((supplementalTypeInfo as SupplementalTypeInfoImpl)?.extensionKind) {
        case ExtensionKind.UNIT:
          parsingErrors.push(
            createParsingError("dtmi:dtdl:parsingError:badType", {
              cause: this._badTypeCauseFormat[2],
              action: this._badTypeActionFormat[2],
              primaryId: parentId,
              property: propName,
              secondaryId: elementId,
              value: typestring
            })
          );
          break;
        case ExtensionKind.UNITATTRIBUTE:
          parsingErrors.push(
            createParsingError("dtmi:dtdl:parsingError:badType", {
              cause: this._badTypeCauseFormat[2],
              action: this._badTypeActionFormat[2],
              primaryId: parentId,
              property: propName,
              secondaryId: elementId,
              value: typestring
            })
          );
          break;
      }

      supplementalTypeIds.push(supplementalTypeId.value);
      return true;
    }

    return true;
  }

  parsePropertiesV2(
    model: Model,
    objectPropertyInfoList: ParsedObjectPropertyInfo[],
    elementPropertyConstraints: ElementPropertyConstraint[],
    aggregateContext: AggregateContext,
    parsingErrors: ParsingError[],
    object: { [index: string]: any },
    definedIn: string | undefined,
    allowIdReferenceSyntax: boolean
  ): void {
    this.languageVersion = 2;

    for (const propKey in object) {
      const propValue = object[propKey];
      if (propValue === undefined || propValue === null) {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:propertyValueNull", {
            cause: `{primaryId:p} property '{property}' has value null, which is not allowed in DTDL models.`,
            action: `Change the value of '{property}' to a value that is legal for this property.`,
            primaryId: this.id,
            property: propKey
          })
        );
        continue;
      }

      if (propKey[0] === "@") {
        continue;
      }

      switch (propKey) {
        case "comment":
        case "dtmi:dtdl:property:comment;2":
          this.comment = ValueParser.parseSingularStringToken(
            this.id,
            "comment",
            propValue,
            512,
            undefined,
            parsingErrors
          );
          continue;
        case "description":
        case "dtmi:dtdl:property:description;2":
          this.description = ValueParser.parseLangStringToken(
            this.id,
            "description",
            propValue,
            "en",
            512,
            undefined,
            parsingErrors
          );
          continue;
        case "displayName":
        case "dtmi:dtdl:property:displayName;2":
          this.displayName = ValueParser.parseLangStringToken(
            this.id,
            "displayName",
            propValue,
            "en",
            64,
            undefined,
            parsingErrors
          );
          continue;
      }

      if (this.undefinedTypes !== undefined && this.undefinedTypes.length > 0) {
        this.undefinedProperties[propKey] = propValue;
      } else {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:noTypeThatAllows", {
            cause: `{primaryId:p} does not have a @type that allows property ${propKey}.`,
            action: `Remove property ${propKey} or correct if misspelled.`,
            primaryId: this.id,
            property: propKey
          })
        );
      }
    }

    for (const supplementalType of this.supplementalTypes) {
      (supplementalType as SupplementalTypeInfoImpl).checkForRequiredProperties(
        parsingErrors,
        this.id,
        this.supplementalProperties
      );
    }
  }

  static tryParseTypeStringV3(
    typestring: string,
    elementId: string,
    parentId: string | undefined,
    definedIn: string | undefined,
    propName: string | undefined,
    materialKinds: EntityKinds[],
    supplementalTypeIds: string[],
    elementInfo: Reference<PrimitiveSchemaInfo>,
    undefinedTypes: string[],
    aggregateContext: AggregateContext,
    parsingErrors: ParsingError[]
  ): boolean {
    switch (typestring) {
      case "Boolean":
      case "dtmi:dtdl:class:Boolean;3":
        elementInfo.ref = new BooleanInfoImpl(3, elementId, parentId, definedIn, "boolean");
        materialKinds.push("boolean");
        return true;
      case "Date":
      case "dtmi:dtdl:class:Date;3":
        elementInfo.ref = new DateInfoImpl(3, elementId, parentId, definedIn, "date");
        materialKinds.push("date");
        return true;
      case "DateTime":
      case "dtmi:dtdl:class:DateTime;3":
        elementInfo.ref = new DateTimeInfoImpl(3, elementId, parentId, definedIn, "datetime");
        materialKinds.push("datetime");
        return true;
      case "Double":
      case "dtmi:dtdl:class:Double;3":
        elementInfo.ref = new DoubleInfoImpl(3, elementId, parentId, definedIn, "double");
        materialKinds.push("double");
        return true;
      case "Duration":
      case "dtmi:dtdl:class:Duration;3":
        elementInfo.ref = new DurationInfoImpl(3, elementId, parentId, definedIn, "duration");
        materialKinds.push("duration");
        return true;
      case "Float":
      case "dtmi:dtdl:class:Float;3":
        elementInfo.ref = new FloatInfoImpl(3, elementId, parentId, definedIn, "float");
        materialKinds.push("float");
        return true;
      case "Integer":
      case "dtmi:dtdl:class:Integer;3":
        elementInfo.ref = new IntegerInfoImpl(3, elementId, parentId, definedIn, "integer");
        materialKinds.push("integer");
        return true;
      case "Long":
      case "dtmi:dtdl:class:Long;3":
        elementInfo.ref = new LongInfoImpl(3, elementId, parentId, definedIn, "long");
        materialKinds.push("long");
        return true;
      case "String":
      case "dtmi:dtdl:class:String;3":
        elementInfo.ref = new StringInfoImpl(3, elementId, parentId, definedIn, "string");
        materialKinds.push("string");
        return true;
      case "Time":
      case "dtmi:dtdl:class:Time;3":
        elementInfo.ref = new TimeInfoImpl(3, elementId, parentId, definedIn, "time");
        materialKinds.push("time");
        return true;
    }
    if (MaterialTypeNameCollection.isMaterialType(typestring)) {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:badType", {
          cause: this._badTypeCauseFormat[3],
          action: this._badTypeActionFormat[3],
          primaryId: parentId,
          property: propName,
          secondaryId: elementId,
          value: typestring
        })
      );
    }

    const supplementalTypeId = aggregateContext.createDtmi(typestring);
    if (supplementalTypeId === undefined) {
      if (undefinedTypes === undefined) {
        undefinedTypes = [];
      }

      undefinedTypes.push(typestring);
      return true;
    }

    const mapOfInDTMIToSupplementalTypeInfo = ModelParserImpl.retrieveSupplementalTypeCollection()
      .supplementalTypes;
    if (
      supplementalTypeId !== undefined &&
      !mapOfInDTMIToSupplementalTypeInfo.has(supplementalTypeId.value)
    ) {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:badType", {
          cause: this._badTypeCauseFormat[3],
          action: this._badTypeActionFormat[3],
          primaryId: parentId,
          property: propName,
          secondaryId: elementId,
          value: typestring
        })
      );
      return false;
    }

    if (supplementalTypeId !== undefined) {
      const supplementalTypeInfo = mapOfInDTMIToSupplementalTypeInfo.get(supplementalTypeId.value);
      if (supplementalTypeInfo?.isAbstract) {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:abstractSupplementalType", {
            cause: `{primaryId:p} has @type that specifies supplemental type {value} that is abstract.`,
            action: `Remove @type {value} or replace with a concrete subtype of {value}.`,
            primaryId: elementId,
            property: "@type",
            value: AggregateContext.getTermOrUri(supplementalTypeId.value)
          })
        );
      }

      switch ((supplementalTypeInfo as SupplementalTypeInfoImpl)?.extensionKind) {
        case ExtensionKind.LATENTTYPE:
          parsingErrors.push(
            createParsingError("dtmi:dtdl:parsingError:badType", {
              cause: this._badTypeCauseFormat[3],
              action: this._badTypeActionFormat[3],
              primaryId: parentId,
              property: propName,
              secondaryId: elementId,
              value: typestring
            })
          );
          break;
        case ExtensionKind.NAMEDLATENTTYPE:
          parsingErrors.push(
            createParsingError("dtmi:dtdl:parsingError:badType", {
              cause: this._badTypeCauseFormat[3],
              action: this._badTypeActionFormat[3],
              primaryId: parentId,
              property: propName,
              secondaryId: elementId,
              value: typestring
            })
          );
          break;
        case ExtensionKind.UNIT:
          parsingErrors.push(
            createParsingError("dtmi:dtdl:parsingError:badType", {
              cause: this._badTypeCauseFormat[3],
              action: this._badTypeActionFormat[3],
              primaryId: parentId,
              property: propName,
              secondaryId: elementId,
              value: typestring
            })
          );
          break;
        case ExtensionKind.UNITATTRIBUTE:
          parsingErrors.push(
            createParsingError("dtmi:dtdl:parsingError:badType", {
              cause: this._badTypeCauseFormat[3],
              action: this._badTypeActionFormat[3],
              primaryId: parentId,
              property: propName,
              secondaryId: elementId,
              value: typestring
            })
          );
          break;
      }

      supplementalTypeIds.push(supplementalTypeId.value);
      return true;
    }

    return true;
  }

  parsePropertiesV3(
    model: Model,
    objectPropertyInfoList: ParsedObjectPropertyInfo[],
    elementPropertyConstraints: ElementPropertyConstraint[],
    aggregateContext: AggregateContext,
    parsingErrors: ParsingError[],
    object: { [index: string]: any },
    definedIn: string | undefined,
    allowIdReferenceSyntax: boolean
  ): void {
    this.languageVersion = 3;

    for (const propKey in object) {
      const propValue = object[propKey];
      if (propValue === undefined || propValue === null) {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:propertyValueNull", {
            cause: `{primaryId:p} property '{property}' has value null, which is not allowed in DTDL models.`,
            action: `Change the value of '{property}' to a value that is legal for this property.`,
            primaryId: this.id,
            property: propKey
          })
        );
        continue;
      }

      if (propKey[0] === "@") {
        continue;
      }

      switch (propKey) {
        case "comment":
        case "dtmi:dtdl:property:comment;3":
          this.comment = ValueParser.parseSingularStringToken(
            this.id,
            "comment",
            propValue,
            512,
            undefined,
            parsingErrors
          );
          continue;
        case "description":
        case "dtmi:dtdl:property:description;3":
          this.description = ValueParser.parseLangStringToken(
            this.id,
            "description",
            propValue,
            "en",
            512,
            undefined,
            parsingErrors
          );
          continue;
        case "displayName":
        case "dtmi:dtdl:property:displayName;3":
          this.displayName = ValueParser.parseLangStringToken(
            this.id,
            "displayName",
            propValue,
            "en",
            64,
            undefined,
            parsingErrors
          );
          continue;
      }

      if (this.undefinedTypes !== undefined && this.undefinedTypes.length > 0) {
        this.undefinedProperties[propKey] = propValue;
      } else {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:noTypeThatAllows", {
            cause: `{primaryId:p} does not have a @type that allows property ${propKey}.`,
            action: `Remove property ${propKey} or correct if misspelled.`,
            primaryId: this.id,
            property: propKey
          })
        );
      }
    }

    for (const supplementalType of this.supplementalTypes) {
      (supplementalType as SupplementalTypeInfoImpl).checkForRequiredProperties(
        parsingErrors,
        this.id,
        this.supplementalProperties
      );
    }
  }

  static parseToken(
    model: Model,
    objectPropertyInfoList: ParsedObjectPropertyInfo[],
    elementPropertyConstraints: ElementPropertyConstraint[],
    valueConstraints: ValueConstraint[],
    aggregateContext: AggregateContext,
    parsingErrors: ParsingError[],
    token: any,
    parentId: string | undefined,
    definedIn: string | undefined,
    propName: string | undefined,
    dtmiSeg: string | undefined,
    keyProp: string | undefined,
    idRequired: boolean,
    typeRequired: boolean,
    allowIdReferenceSyntax: boolean,
    allowedVersions: Set<number>
  ): number {
    let valueCount = 0;
    if (typeof token === "string") {
      if (parentId !== undefined) {
        this.parseIdString(
          objectPropertyInfoList,
          elementPropertyConstraints,
          valueConstraints,
          aggregateContext,
          parsingErrors,
          token.toString(),
          parentId,
          propName,
          keyProp,
          allowedVersions
        );
        valueCount++;
      }
    } else if (Array.isArray(token)) {
      for (const elementToken of token) {
        valueCount += this.parseToken(
          model,
          objectPropertyInfoList,
          elementPropertyConstraints,
          valueConstraints,
          aggregateContext,
          parsingErrors,
          elementToken,
          parentId,
          definedIn,
          propName,
          dtmiSeg,
          keyProp,
          idRequired,
          typeRequired,
          allowIdReferenceSyntax,
          allowedVersions
        );
      }
    } else if (typeof token === "object") {
      this.parseObject(
        model,
        objectPropertyInfoList,
        elementPropertyConstraints,
        valueConstraints,
        aggregateContext,
        parsingErrors,
        token,
        parentId,
        definedIn,
        propName,
        dtmiSeg,
        keyProp,
        idRequired,
        typeRequired,
        allowIdReferenceSyntax,
        allowedVersions
      );
      valueCount++;
    } else {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:badDtmiOrTerm", {
          cause: `{primaryId:p} property '{property}' has value '{value}' that is not a DTMI or a DTDL term.`,
          action: `Replace the value of property '{property}, with a valid DTMI or a term defined by DTDL -- see https://github.com/Azure/opendigitaltwins-dtdl/tree/master/DTDL.`,
          primaryId: parentId,
          property: propName,
          value: token.toString()
        })
      );
    }

    return valueCount;
  }

  static parseIdString(
    objectPropertyInfoList: ParsedObjectPropertyInfo[],
    elementPropertyConstraints: ElementPropertyConstraint[],
    valueConstraints: ValueConstraint[],
    aggregateContext: AggregateContext,
    parsingErrors: ParsingError[],
    idString: string,
    parentId: string,
    propName: string | undefined,
    keyProp: string | undefined,
    allowedVersions: Set<number>
  ): void {
    const elementId = aggregateContext.createDtmi(idString);
    if (elementId !== undefined) {
      const objectPropertyInfo = {
        elementId: parentId,
        propertyName: propName ?? "",
        referencedElementId: elementId.value,
        keyProperty: keyProp,
        expectedKinds: this._concreteKinds[aggregateContext.dtdlVersion],
        allowedVersions: allowedVersions,
        badTypeCauseFormat: this._badTypeCauseFormat[aggregateContext.dtdlVersion],
        badTypeActionFormat: this._badTypeActionFormat[aggregateContext.dtdlVersion]
      };
      objectPropertyInfoList.push(objectPropertyInfo);
      if (valueConstraints !== null && elementPropertyConstraints !== null) {
        for (const vc of valueConstraints) {
          const elementPropertyConstraint = {
            parentId: parentId,
            propertyName: propName ?? "",
            elementId: elementId.value,
            valueConstraint: vc
          };
          elementPropertyConstraints.push(elementPropertyConstraint);
        }
      }
    } else {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:badDtmiOrTerm", {
          cause: `{primaryId:p} property '{property}' has value '{value}' that is not a DTMI or a DTDL term.`,
          action: `Replace the value of property '{property}, with a valid DTMI or a term defined by DTDL -- see https://github.com/Azure/opendigitaltwins-dtdl/tree/master/DTDL.`,
          primaryId: parentId,
          property: propName,
          value: idString
        })
      );
    }
  }

  validateInstance(instanceText: string): boolean {
    throw new Error("cannot validate anything in an abstract class");
  }

  validateInstanceElement(instanceElt: any): boolean {
    throw new Error("cannot validate anything in an abstract class");
  }

  validateInstanceInternal(instanceElt: any, instanceName: string | undefined): boolean {
    throw new Error("cannot validate anything in an abstract class");
  }

  validateInstanceV2(instanceElt: any, instanceName: string | undefined): boolean {
    throw new Error("cannot validate anything in an abstract class");
  }

  validateInstanceV3(instanceElt: any, instanceName: string | undefined): boolean {
    throw new Error("cannot validate anything in an abstract class");
  }

  /**
   * Set partition information.
   **/
  setPartitionInfo(partitionJsonText: string): void {
    throw new Error(`attempt to set partition info on non-partition type PrimitiveSchemaInfoInfo`);
  }

  applyTransformationsV2(model: Model, parsingErrors: ParsingError[]) {}

  applyTransformationsV3(model: Model, parsingErrors: ParsingError[]) {}

  checkRestrictionsV2(parsingErrors: ParsingError[]) {}

  checkRestrictionsV3(parsingErrors: ParsingError[]) {}

  trySetObjectProperty(propertyName: string, value: any, key: string | undefined): boolean {
    switch (propertyName) {
      default:
        break;
    }
    return false;
  }

  /**
   * Check the nesting depth of all descendant elementSchema or schema properties.
   **/
  checkDepthOfElementSchemaOrSchema(
    depth: number,
    depthLimit: number,
    tooDeepElementId: Reference<InDTMI>,
    parsingErrors: ParsingError[]
  ): boolean {
    tooDeepElementId.ref = undefined;
    return true;
  }

  tryGetDescendantSchemaOrContentsComponentNarrow(elementId: Reference<InDTMI>): boolean {
    if (this._checkedForDescendantSchemaOrContentsComponentNarrow) {
      elementId.ref = this._idOfDescendantSchemaOrContentsComponentNarrow;
      return this._idOfDescendantSchemaOrContentsComponentNarrow !== undefined;
    }

    this._checkedForDescendantSchemaOrContentsComponentNarrow = true;

    elementId.ref = undefined;
    return false;
  }

  checkDescendantEnumValueDataType(
    ancestorId: InDTMI,
    datatype: string,
    parsingErrors: ParsingError[]
  ): void {
    if (this._checkedDescendantEnumValueDatatype !== datatype) {
      this._checkedDescendantEnumValueDatatype = datatype;
    }
  }

  tryGetDescendantSchemaArray(elementId: Reference<InDTMI>): boolean {
    if (this._checkedForDescendantSchemaArray) {
      elementId.ref = this._idOfDescendantSchemaArray;
      return this._idOfDescendantSchemaArray !== undefined;
    }

    this._checkedForDescendantSchemaArray = true;

    elementId.ref = undefined;
    return false;
  }

  getCountOfExtendsNarrow(parsingErrors: ParsingError[]): number {
    throw new Error("Can not execute on an abstract class");
  }

  getCountOfContentsOrFieldsOrEnumValuesOrRequestOrResponseOrPropertiesOrSchemaOrElementSchemaOrMapValueNarrow(
    parsingErrors: ParsingError[]
  ): number {
    throw new Error("Can not execute on an abstract class");
  }
}

PrimitiveSchemaInfoImpl.initialize();
