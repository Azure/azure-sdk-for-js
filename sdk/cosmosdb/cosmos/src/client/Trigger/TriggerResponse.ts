// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { CosmosHeaders } from "../../queryExecutionContext";
import { ResourceResponse } from "../../request";
import { Resource } from "../Resource";
import { Trigger } from "./index";
import { TriggerDefinition } from "./TriggerDefinition";

export class TriggerResponse extends ResourceResponse<TriggerDefinition & Resource> {
  constructor(
    resource: TriggerDefinition & Resource,
    headers: CosmosHeaders,
    statusCode: number,
    trigger: Trigger
  ) {
    super(resource, headers, statusCode);
    this.trigger = trigger;
  }
  /** A reference to the {@link Trigger} corresponding to the returned {@link TriggerDefinition}. */
  public readonly trigger: Trigger;
}
