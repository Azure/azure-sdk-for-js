import { CosmosResponse } from "../../request/CosmosResponse";
import { Item } from "./Item";

export interface ItemResponse<T> extends CosmosResponse<T, Item> {
  /** Reference to the {@link Item} the response corresponds to. */
  item: Item;
}
