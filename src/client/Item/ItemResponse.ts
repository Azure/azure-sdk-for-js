import { CosmosResponse } from "../../request/CosmosResponse";
import { Item } from "./Item";

export interface ItemResponse<T> extends CosmosResponse<T, Item> {
    item: Item;
}
