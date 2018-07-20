import { Trigger } from ".";
import { CosmosResponse } from "../../request";
import { TriggerDefinition } from "./TriggerDefinition";

export interface TriggerResponse extends CosmosResponse<TriggerDefinition, Trigger> {
  /** A reference to the {@link Trigger} corresponding to the returned {@link TriggerDefinition}. */
  trigger: Trigger;
}
