// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AggregateContext,
  InDTMI,
  Model,
  ParsedObjectPropertyInfo,
  ParsingError
} from "../parser/internal";
import { ModelParserImpl } from "./modelParserImpl";
import { ParsingException } from "../parser/parsingException";

export class StandardElements {
  // codegen-outline-begin fields
  private static _standardModel: Model;
  private static _elementReferences: { [dtmi: string]: Set<InDTMI> };
  // codegen-outline-end

  // codegen-outline-begin methods
  static initialize(): void {
    this._standardModel = new Model();
    this._elementReferences = {};

    const objectPropertyInfoList: ParsedObjectPropertyInfo[] = [];
    const aggregateContext = new AggregateContext(true, true);
    const parsingErrors: ParsingError[] = [];
    StandardElements.parseResourceIntoStandardModel(
      this.getDigestElements(),
      objectPropertyInfoList,
      aggregateContext,
      parsingErrors
    );

    for (const objectPropertyInfo of objectPropertyInfoList) {
      if (!this._elementReferences[objectPropertyInfo.elementId]) {
        this._elementReferences[objectPropertyInfo.elementId] = new Set<InDTMI>();
      }

      // TODO FOR LATER : How is 1 dtmi related to a set ?
      this._elementReferences[objectPropertyInfo.elementId].add(
        new InDTMI(objectPropertyInfo.referencedElementId)
      );
    }
    this._standardModel.setObjectProperties(objectPropertyInfoList, parsingErrors);
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  public static tryAddElementToModel(model: Model, elementId: string): boolean {
    if (this._standardModel.dict[elementId] === undefined) {
      return false;
    }

    model.dict[elementId] = this._standardModel.dict[elementId];

    if (this._elementReferences[elementId] !== undefined) {
      this._elementReferences[elementId].forEach((referencedElementId) => {
        if (model.dict[referencedElementId.value] === undefined) {
          this.tryAddElementToModel(model, referencedElementId.value);
        }
      });
    }

    return true;
  }

  static parseResourceIntoStandardModel(
    resource: any[],
    objectPropertyInfoList: ParsedObjectPropertyInfo[],
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    aggregateContext: AggregateContext,
    parsingErrors: ParsingError[]
  ): void {
    for (const modelElement of resource) {
      ModelParserImpl._parseObject(
        this._standardModel,
        objectPropertyInfoList,
        [],
        aggregateContext.getChildContext(modelElement, parsingErrors),
        parsingErrors,
        modelElement
      );
    }
    if (parsingErrors.length !== 0) {
      throw new ParsingException(parsingErrors);
    }
  }
  // codegen-outline-end

  static getDigestElements(): any {
    throw new Error("GetDigestElements Not Implemented");
  }
}

// This is commented so it is not run on code evaluation. When standard element is generated
// it will have an initialize call.
// StandardElements.initialize();
