// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable valid-jsdoc */
/* eslint-disable guard-for-in */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */

import { TypeChecker } from "./internal";
import { InterfaceInfo } from "./internal";
import { InterfaceKinds } from "./internal";
import { EntityKinds } from "./internal";
import { ContentInfo } from "./internal";
import { LanguageStringType } from "./internal";
import { ComplexSchemaInfoImpl } from "./internal";
import { ComplexSchemaInfo } from "./internal";
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
import { MaterialTypeNameCollection } from "./internal";
import { ExtensionKind } from "./internal";
import { ContentInfoImpl } from "./internal";
import { EntityInfo } from "./internal";
import { TraversalStatus } from "./internal";
export class InterfaceInfoImpl implements InterfaceInfo, TypeChecker {
  public dtdlVersion: number;
  public id: string;
  public childOf: string | undefined;
  public definedIn: string | undefined;
  public entityKind: InterfaceKinds;
  public comment?: string;
  public contents?: { [value: string]: ContentInfo };
  private _contentsValueConstraints: ValueConstraint[] = [];
  private _contentsInstanceProperties: string[] = [];
  private _contentsAllowedVersionsV2: Set<number> = new Set<number>().add(2);
  private _contentsAllowedVersionsV3: Set<number> = new Set<number>().add(3).add(2);
  public description?: LanguageStringType;
  public displayName?: LanguageStringType;
  public extends?: InterfaceInfo[];
  private _extendsValueConstraints: ValueConstraint[] = [];
  private _extendsInstanceProperties: string[] = [];
  private _extendsAllowedVersionsV2: Set<number> = new Set<number>().add(2);
  private _extendsAllowedVersionsV3: Set<number> = new Set<number>().add(3).add(2);
  public languageVersion?: number;
  public schemas?: ComplexSchemaInfo[];
  private _schemasValueConstraints: ValueConstraint[] = [];
  private _schemasInstanceProperties: string[] = [];
  private _schemasAllowedVersionsV2: Set<number> = new Set<number>().add(2);
  private _schemasAllowedVersionsV3: Set<number> = new Set<number>().add(3);
  public supplementalTypeIds: string[];
  public supplementalProperties: { [x: string]: any };
  public supplementalTypes: SupplementalTypeInfo[];
  public undefinedTypes: string[];
  public undefinedProperties: { [name: string]: any };
  public sourceObject: any;
  public isPartition: boolean;
  private partitionJsonText: string | undefined;
  protected static _versionlessTypes: Set<string>;
  protected static _concreteKinds: { [x: number]: InterfaceKinds[] };
  protected static _badTypeActionFormat: { [x: number]: string };
  protected static _badTypeCauseFormat: { [x: number]: string };
  protected _checkedForDescendantSchemaOrContentsComponentNarrow: boolean;
  protected _idOfDescendantSchemaOrContentsComponentNarrow: InDTMI | undefined;
  protected _checkedDescendantEnumValueDatatype: string | undefined;
  protected _originalContents?: { [value: string]: ContentInfo };
  protected _checkedForDescendantSchemaArray: boolean;
  protected _idOfDescendantSchemaArray: InDTMI | undefined;
  protected _countOfExtendsNarrowStatus: TraversalStatus;
  protected _countOfExtendsNarrowValue: number;
  protected _countOfContentsOrFieldsOrEnumValuesOrRequestOrResponseOrPropertiesOrSchemaOrElementSchemaOrMapValueNarrowStatus: TraversalStatus;
  protected _countOfContentsOrFieldsOrEnumValuesOrRequestOrResponseOrPropertiesOrSchemaOrElementSchemaOrMapValueNarrowValue: number;

  constructor(
    dtdlVersion: number,
    id: string,
    childOf: string | undefined,
    definedIn: string | undefined,
    entityKind: InterfaceKinds
  ) {
    this.dtdlVersion = dtdlVersion;
    this.id = id;
    this.childOf = childOf;
    this.definedIn = definedIn;
    this.entityKind = entityKind;
    this.contents = {};
    this.description = {};
    this.displayName = {};
    this.extends = [];
    this.schemas = [];
    this.supplementalTypeIds = [];
    this.supplementalProperties = {};
    this.supplementalTypes = [];
    this.isPartition = true;
    this.undefinedTypes = [];
    this.undefinedProperties = {};
    this._checkedForDescendantSchemaOrContentsComponentNarrow = false;
    this._idOfDescendantSchemaOrContentsComponentNarrow = undefined;
    this._checkedDescendantEnumValueDatatype = undefined;
    this._checkedForDescendantSchemaArray = false;
    this._idOfDescendantSchemaArray = undefined;
    this._countOfExtendsNarrowStatus = TraversalStatus.NotStarted;
    this._countOfExtendsNarrowValue = 0;
    this._countOfContentsOrFieldsOrEnumValuesOrRequestOrResponseOrPropertiesOrSchemaOrElementSchemaOrMapValueNarrowStatus =
      TraversalStatus.NotStarted;
    this._countOfContentsOrFieldsOrEnumValuesOrRequestOrResponseOrPropertiesOrSchemaOrElementSchemaOrMapValueNarrowValue = 0;
  }

  static initialize() {
    this._versionlessTypes = new Set<string>()
      .add("dtmi:dtdl:class:Entity")
      .add("dtmi:dtdl:class:Interface");
    this._concreteKinds = {};
    this._concreteKinds[2] = [];
    this._concreteKinds[2].push("interface");
    this._concreteKinds[3] = [];
    this._concreteKinds[3].push("interface");
    this._badTypeActionFormat = {};
    this._badTypeCauseFormat = {};
    this._badTypeActionFormat[2] = `Provide a value for property '{property}' with @type Interface.`;
    this._badTypeActionFormat[3] = `Provide a value for property '{property}' with @type Interface.`;
    this._badTypeCauseFormat[2] = `{primaryId:p} property '{property}' has value{secondaryId:e} that does not have @type of Interface.`;
    this._badTypeCauseFormat[3] = `{primaryId:p} property '{property}' has value{secondaryId:e} that does not have @type of Interface.`;
  }

  addType(dtmi: string, supplementalType: SupplementalTypeInfo | undefined): void {
    this.supplementalTypeIds.push(dtmi);
    if (supplementalType !== undefined) {
      this.supplementalTypes.push(supplementalType);
    }

    (supplementalType as SupplementalTypeInfoImpl).attachConstraints(this);
    (supplementalType as SupplementalTypeInfoImpl).bindInstanceProperties(this);
  }

  tryParseSupplementalProperty(
    model: Model,
    objectPropertyInfoList: ParsedObjectPropertyInfo[],
    elementPropertyConstraints: ElementPropertyConstraint[],
    aggregateContext: AggregateContext,
    parsingErrors: ParsingError[],
    propName: string,
    propToken: any
  ): boolean {
    const propDtmi = aggregateContext.createDtmi(propName);
    if (propDtmi === undefined) {
      return false;
    }

    for (const supplementalType of this.supplementalTypes) {
      if (
        (supplementalType as SupplementalTypeInfoImpl).tryParseProperty(
          model,
          objectPropertyInfoList,
          elementPropertyConstraints,
          aggregateContext,
          parsingErrors,
          this.id,
          propDtmi.value,
          propToken,
          this.supplementalProperties
        )
      ) {
        return true;
      }
    }

    return false;
  }

  doesHaveType(typeId: string): boolean {
    return (
      InterfaceInfoImpl._versionlessTypes.has(new InDTMI(typeId).versionless) ||
      this.supplementalTypes.some((st) => (st as SupplementalTypeInfoImpl).doesHaveType(typeId))
    );
  }

  addConstraint(propertyName: string, valueConstraint: ValueConstraint): void {
    switch (propertyName) {
      case "contents":
        if (this._contentsValueConstraints === undefined) {
          this._contentsValueConstraints = <ValueConstraint[]>[];
        }

        this._contentsValueConstraints.push(valueConstraint);
        break;
      case "extends":
        if (this._extendsValueConstraints === undefined) {
          this._extendsValueConstraints = <ValueConstraint[]>[];
        }

        this._extendsValueConstraints.push(valueConstraint);
        break;
      case "schemas":
        if (this._schemasValueConstraints === undefined) {
          this._schemasValueConstraints = <ValueConstraint[]>[];
        }

        this._schemasValueConstraints.push(valueConstraint);
        break;
    }
  }

  addInstanceProperty(propertyName: string, instancePropertyName: string): void {
    switch (propertyName) {
      case "contents":
        if (this._contentsInstanceProperties === undefined) {
          this._contentsInstanceProperties = <string[]>[];
        }

        this._contentsInstanceProperties.push(instancePropertyName);
        break;
      case "extends":
        if (this._extendsInstanceProperties === undefined) {
          this._extendsInstanceProperties = <string[]>[];
        }

        this._extendsInstanceProperties.push(instancePropertyName);
        break;
      case "schemas":
        if (this._schemasInstanceProperties === undefined) {
          this._schemasInstanceProperties = <string[]>[];
        }

        this._schemasInstanceProperties.push(instancePropertyName);
        break;
    }
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
    // This is a method to parse the object read from DTDL into a type of InterfaceInfo
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
      typeTokenArr = ["Interface"];
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

    (elementInfo as InterfaceInfoImpl).sourceObject = object;
    switch (childAggregateContext.dtdlVersion) {
      case 2: {
        (elementInfo as InterfaceInfoImpl)?.parsePropertiesV2(
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
        (elementInfo as InterfaceInfoImpl)?.parsePropertiesV3(
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
  ): InterfaceInfo | undefined {
    const materialKinds: EntityKinds[] = [];
    const elementInfo: Reference<InterfaceInfo> = referenceInit();
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
          (elementInfo.ref as InterfaceInfoImpl).addType(supplementalTypeId, supplementalTypeInfo);
        }
      }
    }

    return elementInfo.ref;
    // this ends the method.
  }

  doesPropertyDictContainKey(propertyName: string, key: string | undefined): boolean {
    switch (propertyName) {
      case "contents":
        if (key !== undefined && Object.prototype.hasOwnProperty.call(this.contents, key)) {
          return true;
        } else {
          return false;
        }

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
    elementInfo: Reference<InterfaceInfo>,
    undefinedTypes: string[],
    aggregateContext: AggregateContext,
    parsingErrors: ParsingError[]
  ): boolean {
    switch (typestring) {
      case "Interface":
      case "dtmi:dtdl:class:Interface;2":
        if (elementId.length > 128) {
          parsingErrors.push(
            createParsingError("dtmi:dtdl:parsingError:idTooLongForInterface", {
              cause:
                "Identifier '{{{{primaryId}}}}' is too long for an element with @type Interface -- length limit for this type is 128.",
              action:
                "Select a shorter value for the identifier or trim current value to fewer than 128 characters.",
              primaryId: elementId,
              property: "@id"
            })
          );
        }

        elementInfo.ref = new InterfaceInfoImpl(2, elementId, parentId, definedIn, "interface");
        materialKinds.push("interface");
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
      let valueCount: number;
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
        case "contents":
        case "dtmi:dtdl:property:contents;2":
          valueCount = ContentInfoImpl.parseToken(
            model,
            objectPropertyInfoList,
            elementPropertyConstraints,
            this._contentsValueConstraints,
            aggregateContext,
            parsingErrors,
            propValue,
            this.id,
            this.id,
            "contents",
            "name",
            "name",
            false,
            true,
            allowIdReferenceSyntax,
            this._contentsAllowedVersionsV2
          );
          if (valueCount > 300) {
            parsingErrors.push(
              createParsingError("dtmi:dtdl:parsingError:propertyCountAboveMax", {
                cause: `{primaryId:p} property 'contents' has value valueCount values, but the allowed maximum count is 300`,
                action: `Remove one or more 'contents' to the object until the maximum count is satisfied.`,
                primaryId: this.id,
                property: "contents"
              })
            );
          }

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
        case "extends":
        case "dtmi:dtdl:property:extends;2":
          valueCount = InterfaceInfoImpl.parseToken(
            model,
            objectPropertyInfoList,
            elementPropertyConstraints,
            this._extendsValueConstraints,
            aggregateContext,
            parsingErrors,
            propValue,
            this.id,
            this.id,
            "extends",
            undefined,
            undefined,
            true,
            true,
            allowIdReferenceSyntax,
            this._extendsAllowedVersionsV2
          );
          if (valueCount > 2) {
            parsingErrors.push(
              createParsingError("dtmi:dtdl:parsingError:propertyCountAboveMax", {
                cause: `{primaryId:p} property 'extends' has value valueCount values, but the allowed maximum count is 2`,
                action: `Remove one or more 'extends' to the object until the maximum count is satisfied.`,
                primaryId: this.id,
                property: "extends"
              })
            );
          }

          continue;
        case "schemas":
        case "dtmi:dtdl:property:schemas;2":
          ComplexSchemaInfoImpl.parseToken(
            model,
            objectPropertyInfoList,
            elementPropertyConstraints,
            this._schemasValueConstraints,
            aggregateContext,
            parsingErrors,
            propValue,
            this.id,
            this.id,
            "schemas",
            undefined,
            undefined,
            true,
            true,
            allowIdReferenceSyntax,
            this._schemasAllowedVersionsV2
          );
          continue;
      }

      if (
        this.tryParseSupplementalProperty(
          model,
          objectPropertyInfoList,
          elementPropertyConstraints,
          aggregateContext,
          parsingErrors,
          propKey,
          propValue
        )
      ) {
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
    elementInfo: Reference<InterfaceInfo>,
    undefinedTypes: string[],
    aggregateContext: AggregateContext,
    parsingErrors: ParsingError[]
  ): boolean {
    switch (typestring) {
      case "Interface":
      case "dtmi:dtdl:class:Interface;3":
        if (elementId.length > 128) {
          parsingErrors.push(
            createParsingError("dtmi:dtdl:parsingError:idTooLongForInterface", {
              cause:
                "Identifier '{{{{primaryId}}}}' is too long for an element with @type Interface -- length limit for this type is 128.",
              action:
                "Select a shorter value for the identifier or trim current value to fewer than 128 characters.",
              primaryId: elementId,
              property: "@id"
            })
          );
        }

        elementInfo.ref = new InterfaceInfoImpl(3, elementId, parentId, definedIn, "interface");
        materialKinds.push("interface");
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
        case "contents":
        case "dtmi:dtdl:property:contents;3":
          ContentInfoImpl.parseToken(
            model,
            objectPropertyInfoList,
            elementPropertyConstraints,
            this._contentsValueConstraints,
            aggregateContext,
            parsingErrors,
            propValue,
            this.id,
            this.id,
            "contents",
            "name",
            "name",
            false,
            true,
            allowIdReferenceSyntax,
            this._contentsAllowedVersionsV3
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
        case "extends":
        case "dtmi:dtdl:property:extends;3":
          InterfaceInfoImpl.parseToken(
            model,
            objectPropertyInfoList,
            elementPropertyConstraints,
            this._extendsValueConstraints,
            aggregateContext,
            parsingErrors,
            propValue,
            this.id,
            this.id,
            "extends",
            undefined,
            undefined,
            true,
            true,
            allowIdReferenceSyntax,
            this._extendsAllowedVersionsV3
          );
          continue;
        case "schemas":
        case "dtmi:dtdl:property:schemas;3":
          ComplexSchemaInfoImpl.parseToken(
            model,
            objectPropertyInfoList,
            elementPropertyConstraints,
            this._schemasValueConstraints,
            aggregateContext,
            parsingErrors,
            propValue,
            this.id,
            this.id,
            "schemas",
            undefined,
            undefined,
            true,
            true,
            allowIdReferenceSyntax,
            this._schemasAllowedVersionsV3
          );
          continue;
      }

      if (
        this.tryParseSupplementalProperty(
          model,
          objectPropertyInfoList,
          elementPropertyConstraints,
          aggregateContext,
          parsingErrors,
          propKey,
          propValue
        )
      ) {
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
    const instanceElt = JSON.parse(instanceText);
    return this.validateInstanceElement(instanceElt);
  }

  validateInstanceElement(instanceElt: any): boolean {
    return false;
  }

  validateInstanceInternal(instanceElt: any, instanceName: string | undefined): boolean {
    return false;
  }

  validateInstanceV2(instanceElt: any, instanceName: string | undefined): boolean {
    return false;
  }

  validateInstanceV3(instanceElt: any, instanceName: string | undefined): boolean {
    return false;
  }

  /**
   * Set partition information.
   **/
  setPartitionInfo(partitionJsonText: string): void {
    this.partitionJsonText = partitionJsonText;
  }

  /**
   * Gets a JSON string that holds the portion of the DTDL model that defines this InterfaceInfo.
   **/
  getJsonLdText(): string {
    return this.partitionJsonText || "";
  }

  /**
   * Gets a JsonElement that holds the portion of the DTDL model that defines this InterfaceInfo.
   **/
  getJsonLd(): any {
    return JSON.parse(this.partitionJsonText || "");
  }

  applyTransformations(model: Model, parsingErrors: ParsingError[]): void {
    if (this.dtdlVersion === 2) {
      this.applyTransformationsV2(model, parsingErrors);
    }

    if (this.dtdlVersion === 3) {
      this.applyTransformationsV3(model, parsingErrors);
    }
  }

  applyTransformationsV2(model: Model, parsingErrors: ParsingError[]) {
    if (this._originalContents === undefined) {
      this._originalContents = { ...this.contents };
    }

    const tooDeepElementId: Reference<InDTMI> = { ref: undefined };
    const sources = this.getTransitiveExtendsNarrow(0, 10, tooDeepElementId, parsingErrors);

    if (sources !== undefined) {
      sources.forEach((dtmi) => {
        (model.dict[dtmi] as InterfaceInfoImpl).importContents(
          new InDTMI(this.id),
          `'extends'`,
          this.contents || {},
          parsingErrors
        );
      });
    } else if (tooDeepElementId.ref !== undefined) {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:excessiveDepth", {
          cause: `{primaryId:n} is at the root of a chain of 'extends' properties that exceeds 10 levels -- {secondaryId:n} is at level 11.`,
          action: `Change the value of one or more 'extends' properties in the hierarchy to reduce the nesting depth.`,
          primaryId: this.id,
          secondaryId: tooDeepElementId.ref.value
        })
      );
    }
  }

  applyTransformationsV3(model: Model, parsingErrors: ParsingError[]) {
    if (this._originalContents === undefined) {
      this._originalContents = { ...this.contents };
    }

    const tooDeepElementId: Reference<InDTMI> = { ref: undefined };
    const sources = this.getTransitiveExtendsNarrow(0, 10, tooDeepElementId, parsingErrors);

    if (sources !== undefined) {
      sources.forEach((dtmi) => {
        (model.dict[dtmi] as InterfaceInfoImpl).importContents(
          new InDTMI(this.id),
          `'extends'`,
          this.contents || {},
          parsingErrors
        );
      });
    } else if (tooDeepElementId.ref !== undefined) {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:excessiveDepth", {
          cause: `{primaryId:n} is at the root of a chain of 'extends' properties that exceeds 10 levels -- {secondaryId:n} is at level 11.`,
          action: `Change the value of one or more 'extends' properties in the hierarchy to reduce the nesting depth.`,
          primaryId: this.id,
          secondaryId: tooDeepElementId.ref.value
        })
      );
    }
  }

  checkRestrictions(parsingErrors: ParsingError[]): void {
    if (this.dtdlVersion === 2) {
      this.checkRestrictionsV2(parsingErrors);
    }

    if (this.dtdlVersion === 3) {
      this.checkRestrictionsV3(parsingErrors);
    }
  }

  checkRestrictionsV2(parsingErrors: ParsingError[]) {}

  checkRestrictionsV3(parsingErrors: ParsingError[]) {
    const numExtendsNarrowValues: number = this.getCountOfExtendsNarrow(parsingErrors);
    if (numExtendsNarrowValues > 1024) {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:excessiveCount", {
          cause: `{primaryId:n} is at the root of a hierarchy that contains ${numExtendsNarrowValues} 'extends' properties, but the allowed maximum count is 1024.`,
          action: `Remove one or more 'extends' property values to reduce the total count.`,
          primaryId: this.id
        })
      );
    }

    const numContentsOrFieldsOrEnumValuesOrRequestOrResponseOrPropertiesOrSchemaOrElementSchemaOrMapValueNarrowValues: number = this.getCountOfContentsOrFieldsOrEnumValuesOrRequestOrResponseOrPropertiesOrSchemaOrElementSchemaOrMapValueNarrow(
      parsingErrors
    );
    if (
      numContentsOrFieldsOrEnumValuesOrRequestOrResponseOrPropertiesOrSchemaOrElementSchemaOrMapValueNarrowValues >
      100000
    ) {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:excessiveCount", {
          cause: `{primaryId:n} is at the root of a hierarchy that contains ${numContentsOrFieldsOrEnumValuesOrRequestOrResponseOrPropertiesOrSchemaOrElementSchemaOrMapValueNarrowValues} 'contents' or 'fields' or 'enumValues' or 'request' or 'response' or 'properties' or 'schema' or 'elementSchema' or 'mapValue' properties, but the allowed maximum count is 100000.`,
          action: `Remove one or more 'contents' or 'fields' or 'enumValues' or 'request' or 'response' or 'properties' or 'schema' or 'elementSchema' or 'mapValue' property values to reduce the total count.`,
          primaryId: this.id
        })
      );
    }
  }

  trySetObjectProperty(propertyName: string, value: any, key: string | undefined): boolean {
    switch (propertyName) {
      case "contents":
      case "dtmi:dtdl:property:contents;2":
      case "dtmi:dtdl:property:contents;3":
        if (key !== undefined && this.contents !== undefined) {
          this.contents[key] = value as ContentInfoImpl;
          return true;
        }

        break;
      case "extends":
      case "dtmi:dtdl:property:extends;2":
      case "dtmi:dtdl:property:extends;3":
        if (this.extends !== undefined) {
          this.extends.push(value as InterfaceInfoImpl);
          return true;
        }

        break;
      case "schemas":
      case "dtmi:dtdl:property:schemas;2":
      case "dtmi:dtdl:property:schemas;3":
        if (this.schemas !== undefined) {
          this.schemas.push(value as ComplexSchemaInfoImpl);
          return true;
        }

        break;
      default:
        break;
    }
    for (const supplementalType of this.supplementalTypes) {
      if (
        (supplementalType as SupplementalTypeInfoImpl).trySetObjectProperty(
          propertyName,
          value,
          key,
          this.supplementalProperties
        )
      ) {
        return true;
      }
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
    for (const item of Object.values(this.contents || {})) {
      if (
        !(item as ContentInfoImpl).checkDepthOfElementSchemaOrSchema(
          depth,
          depthLimit,
          tooDeepElementId,
          parsingErrors
        )
      ) {
        if (tooDeepElementId.ref?.value === this.id) {
          parsingErrors.push(
            createParsingError("dtmi:dtdl:parsingError:recursiveStructure", {
              cause: `{primaryId:n} is at the root of a hierarchy that includes itself.`,
              action: `Change the value of one or more 'elementSchema' or 'schema' properties in the hierarchy to remeve the recursion.`,
              primaryId: this.id
            })
          );
          tooDeepElementId.ref = undefined;
        }

        return false;
      }
    }

    for (const item of this.extends || []) {
      if (
        !(item as InterfaceInfoImpl).checkDepthOfElementSchemaOrSchema(
          depth,
          depthLimit,
          tooDeepElementId,
          parsingErrors
        )
      ) {
        if (tooDeepElementId.ref?.value === this.id) {
          parsingErrors.push(
            createParsingError("dtmi:dtdl:parsingError:recursiveStructure", {
              cause: `{primaryId:n} is at the root of a hierarchy that includes itself.`,
              action: `Change the value of one or more 'elementSchema' or 'schema' properties in the hierarchy to remeve the recursion.`,
              primaryId: this.id
            })
          );
          tooDeepElementId.ref = undefined;
        }

        return false;
      }
    }

    for (const item of this.schemas || []) {
      if (
        !(item as ComplexSchemaInfoImpl).checkDepthOfElementSchemaOrSchema(
          depth,
          depthLimit,
          tooDeepElementId,
          parsingErrors
        )
      ) {
        if (tooDeepElementId.ref?.value === this.id) {
          parsingErrors.push(
            createParsingError("dtmi:dtdl:parsingError:recursiveStructure", {
              cause: `{primaryId:n} is at the root of a hierarchy that includes itself.`,
              action: `Change the value of one or more 'elementSchema' or 'schema' properties in the hierarchy to remeve the recursion.`,
              primaryId: this.id
            })
          );
          tooDeepElementId.ref = undefined;
        }

        return false;
      }
    }

    tooDeepElementId.ref = undefined;
    return true;
  }

  tryGetDescendantSchemaOrContentsComponentNarrow(elementId: Reference<InDTMI>): boolean {
    if (this._checkedForDescendantSchemaOrContentsComponentNarrow) {
      elementId.ref = this._idOfDescendantSchemaOrContentsComponentNarrow;
      return this._idOfDescendantSchemaOrContentsComponentNarrow !== undefined;
    }

    this._checkedForDescendantSchemaOrContentsComponentNarrow = true;

    for (const item of Object.values(this.contents || {})) {
      if ((item as ContentInfoImpl).entityKind === "component") {
        elementId.ref = new InDTMI((item as ContentInfoImpl).id);
        this._idOfDescendantSchemaOrContentsComponentNarrow = elementId.ref;
        return true;
      }

      if ((item as ContentInfoImpl).tryGetDescendantSchemaOrContentsComponentNarrow(elementId)) {
        this._idOfDescendantSchemaOrContentsComponentNarrow = elementId.ref;
        return true;
      }
    }

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

    for (const item of Object.values(this.contents || {})) {
      (item as ContentInfoImpl).checkDescendantEnumValueDataType(
        ancestorId,
        datatype,
        parsingErrors
      );
    }

    for (const item of this.extends || []) {
      (item as InterfaceInfoImpl).checkDescendantEnumValueDataType(
        ancestorId,
        datatype,
        parsingErrors
      );
    }

    for (const item of this.schemas || []) {
      (item as ComplexSchemaInfoImpl).checkDescendantEnumValueDataType(
        ancestorId,
        datatype,
        parsingErrors
      );
    }
  }

  getTransitiveExtendsNarrow(
    depth: number,
    depthLimit: number,
    tooDeepElementId: Reference<InDTMI>,
    parsingErrors: ParsingError[]
  ): Set<string> | undefined {
    if (this.extends !== undefined && this.extends.length !== 0) {
      if (depth === depthLimit) {
        tooDeepElementId.ref = new InDTMI(this.id);
        return undefined;
      }
    }

    const closure: Set<string> = new Set<string>();

    for (const item of this.extends || []) {
      const others:
        | Set<string>
        | undefined = (item as InterfaceInfoImpl).getTransitiveExtendsNarrow(
        depth + 1,
        depthLimit,
        tooDeepElementId,
        parsingErrors
      );
      if (others !== undefined) {
        closure.add((item as InterfaceInfoImpl).id);
        others.forEach((item) => closure.add(item));
      } else {
        if (tooDeepElementId.ref?.value === this.id) {
          parsingErrors.push(
            createParsingError("dtmi:dtdl:parsingError:recursiveStructure", {
              cause: `{primaryId:n} is at the root of a chain of 'extends' properties that includes itself.`,
              action: `Change the value of one or more 'extends' properties in the hierarchy to remeve the recursion.`,
              primaryId: this.id
            })
          );
          tooDeepElementId.ref = undefined;
        }

        return undefined;
      }
    }

    tooDeepElementId.ref = undefined;
    return closure;
  }

  /**
   * Copy the values of this object's Contents property into contents`.
   **/
  importContents(
    ancestorId: InDTMI,
    importPropertyName: string,
    contents: { [value: string]: ContentInfo },
    parsingErrors: ParsingError[]
  ): void {
    const currentObject = this._originalContents || this.contents || {};
    for (const [key, value] of Object.entries(currentObject)) {
      if (Object.prototype.hasOwnProperty.call(contents, key)) {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:nonUniqueImportedPropertyValue", {
            cause: `{primaryId:n}, because it transitively ${importPropertyName} {secondaryId}, has property 'contents' that contains more than one element whose property 'name' has value '${key}'.`,
            action: `Either change the value of property 'name' to a unique string value, or remove one or more ${importPropertyName} properties so that 'contents' will not be imported.`,
            primaryId: ancestorId.value,
            secondaryId: this.id,
            property: `contents`,
            value: `name`
          })
        );
      } else {
        contents[key] = value;
      }
    }
  }

  tryGetDescendantSchemaArray(elementId: Reference<InDTMI>): boolean {
    if (this._checkedForDescendantSchemaArray) {
      elementId.ref = this._idOfDescendantSchemaArray;
      return this._idOfDescendantSchemaArray !== undefined;
    }

    this._checkedForDescendantSchemaArray = true;

    for (const item of Object.values(this.contents || {})) {
      if ((item as ContentInfoImpl).tryGetDescendantSchemaArray(elementId)) {
        this._idOfDescendantSchemaArray = elementId.ref;
        return true;
      }
    }

    for (const item of this.extends || []) {
      if ((item as InterfaceInfoImpl).tryGetDescendantSchemaArray(elementId)) {
        this._idOfDescendantSchemaArray = elementId.ref;
        return true;
      }
    }

    for (const item of this.schemas || []) {
      if ((item as ComplexSchemaInfoImpl).tryGetDescendantSchemaArray(elementId)) {
        this._idOfDescendantSchemaArray = elementId.ref;
        return true;
      }
    }

    elementId.ref = undefined;
    return false;
  }

  getCountOfExtendsNarrow(parsingErrors: ParsingError[]): number {
    if (this._countOfExtendsNarrowStatus === TraversalStatus.Complete) {
      return this._countOfExtendsNarrowValue;
    }

    if (this._countOfExtendsNarrowStatus === TraversalStatus.InProgress) {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:recursiveStructure", {
          cause: `{primaryId:n} is at the root of a hierarchy that includes itself.`,
          action: `Change the value of one or more 'extends' properties in the hierarchy to remeve the recursion.`,
          primaryId: this.id
        })
      );
      return 0;
    }

    this._countOfExtendsNarrowStatus = TraversalStatus.InProgress;
    for (const item of this.extends || []) {
      this._countOfExtendsNarrowValue +=
        (item as InterfaceInfoImpl).getCountOfExtendsNarrow(parsingErrors) + 1;
    }

    this._countOfExtendsNarrowStatus = TraversalStatus.Complete;
    return this._countOfExtendsNarrowValue;
  }

  getCountOfContentsOrFieldsOrEnumValuesOrRequestOrResponseOrPropertiesOrSchemaOrElementSchemaOrMapValueNarrow(
    parsingErrors: ParsingError[]
  ): number {
    if (
      this
        ._countOfContentsOrFieldsOrEnumValuesOrRequestOrResponseOrPropertiesOrSchemaOrElementSchemaOrMapValueNarrowStatus ===
      TraversalStatus.Complete
    ) {
      return this
        ._countOfContentsOrFieldsOrEnumValuesOrRequestOrResponseOrPropertiesOrSchemaOrElementSchemaOrMapValueNarrowValue;
    }

    if (
      this
        ._countOfContentsOrFieldsOrEnumValuesOrRequestOrResponseOrPropertiesOrSchemaOrElementSchemaOrMapValueNarrowStatus ===
      TraversalStatus.InProgress
    ) {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:recursiveStructure", {
          cause: `{primaryId:n} is at the root of a hierarchy that includes itself.`,
          action: `Change the value of one or more 'contents' or 'fields' or 'enumValues' or 'request' or 'response' or 'properties' or 'schema' or 'elementSchema' or 'mapValue' properties in the hierarchy to remeve the recursion.`,
          primaryId: this.id
        })
      );
      return 0;
    }

    this._countOfContentsOrFieldsOrEnumValuesOrRequestOrResponseOrPropertiesOrSchemaOrElementSchemaOrMapValueNarrowStatus =
      TraversalStatus.InProgress;
    for (const item of Object.values(this.contents || {})) {
      this._countOfContentsOrFieldsOrEnumValuesOrRequestOrResponseOrPropertiesOrSchemaOrElementSchemaOrMapValueNarrowValue +=
        (item as ContentInfoImpl).getCountOfContentsOrFieldsOrEnumValuesOrRequestOrResponseOrPropertiesOrSchemaOrElementSchemaOrMapValueNarrow(
          parsingErrors
        ) + 1;
    }

    this._countOfContentsOrFieldsOrEnumValuesOrRequestOrResponseOrPropertiesOrSchemaOrElementSchemaOrMapValueNarrowStatus =
      TraversalStatus.Complete;
    return this
      ._countOfContentsOrFieldsOrEnumValuesOrRequestOrResponseOrPropertiesOrSchemaOrElementSchemaOrMapValueNarrowValue;
  }
}

InterfaceInfoImpl.initialize();
