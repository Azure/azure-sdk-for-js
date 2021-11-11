// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CosmosHeaders } from "../../queryExecutionContext";
import { Item } from "./Item";
import { ItemDefinition } from "./ItemDefinition";
import { Resource } from "../Resource";
import { ResourceResponse } from "../../request/ResourceResponse";

export class ItemResponse<T extends ItemDefinition> extends ResourceResponse<T & Resource> {
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
