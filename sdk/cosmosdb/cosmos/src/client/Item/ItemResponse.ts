import { CosmosHeaders } from "../../queryExecutionContext";
import { ResourceResponse } from "../../request/ResourceResponse";
import { Resource } from "../Resource";
import { Item } from "./Item";
import { ItemDefinition } from "./ItemDefinition";

export class ItemResponse<T extends ItemDefinition> extends ResourceResponse<T & Resource> {
  constructor(resource: T & Resource, headers: CosmosHeaders, statusCode: number, item: Item) {
    super(resource, headers, statusCode);
    this.item = item;
  }
  /** Reference to the {@link Item} the response corresponds to. */
  public readonly item: Item;
}
