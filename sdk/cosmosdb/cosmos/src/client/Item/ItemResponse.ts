// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { CosmosHeaders } from "../../queryExecutionContext";
import { MaterializedResponse } from "../../request";
import { GuaranteedResourceResponse } from "../../request/ResourceResponse";
import { Resource } from "../Resource";
import { Item } from "./Item";
import { ItemDefinition, ItemDefinitionResponse } from "./ItemDefinition";

export class ItemResponse<T extends ItemDefinitionResponse> extends GuaranteedResourceResponse<T & Resource> {
  constructor(
    resource: T & Resource,
    headers: CosmosHeaders,
    statusCode: number,
    subsstatusCode: number,
    item: Item
  ) {
    super(resource, headers, statusCode, subsstatusCode);
    this.item = item;
  }
  /** Reference to the {@link Item} the response corresponds to. */
  public readonly item: Item;
}

export function validateAndCreateItemResponse<T extends Required<ItemDefinition> = any>(response: MaterializedResponse<Resource>, item: Item): ItemResponse<T> {
  return new ItemResponse<T>(
    response.result as T & Resource,
    response.headers,
    response.code,
    response.substatus,
    item
  );
}
