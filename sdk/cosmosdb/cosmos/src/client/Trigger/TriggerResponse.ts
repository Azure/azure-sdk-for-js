import { Trigger } from ".";
import { CosmosResponse } from "../../request";
import { Resource } from "../Resource";
import { TriggerDefinition } from "./TriggerDefinition";

export interface TriggerResponse extends CosmosResponse<TriggerDefinition & Resource, Trigger> {
  /** A reference to the {@link Trigger} corresponding to the returned {@link TriggerDefinition}. */
  trigger: Trigger;
}
