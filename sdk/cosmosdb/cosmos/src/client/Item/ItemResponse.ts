import { CosmosResponse } from "../../request/CosmosResponse";
import { Resource } from "../Resource";
import { Item } from "./Item";
import { ItemDefinition } from "./ItemDefinition";

export interface ItemResponse<T extends ItemDefinition> extends CosmosResponse<T & Resource, Item> {
  /** Reference to the {@link Item} the response corresponds to. */
  item: Item;
}
