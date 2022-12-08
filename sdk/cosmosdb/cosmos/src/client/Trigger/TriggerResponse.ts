// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { CosmosHeaders } from "../../queryExecutionContext";
import { GuaranteedResourceResponse, MaterializedResponse } from "../../request";
import { Resource } from "../Resource";
import { Trigger } from "./index";
import { TriggerDefinition, TriggerDefinitionResponse } from "./TriggerDefinition";

export class TriggerResponse extends GuaranteedResourceResponse<TriggerDefinitionResponse & Resource> {
  constructor(
    resource: TriggerDefinitionResponse & Resource,
    headers: CosmosHeaders,
    statusCode: number,
    trigger: Trigger
  ) {
    super(resource, headers, statusCode);
    this.trigger = trigger;
  }
  /** A reference to the {@link Trigger} corresponding to the returned {@link TriggerDefinitionResponse}. */
  public readonly trigger: Trigger;
}

export function createTriggerResponse<T extends TriggerDefinition = any>(response: MaterializedResponse<T & Resource>, trigger: Trigger): TriggerResponse {
  const resource = response.result;
  if (resource.body !== undefined && resource.triggerOperation !== undefined && resource.triggerType !== undefined) {
    const checkedResource: TriggerDefinitionResponse & Resource = {
      ...resource,
      body: resource.body,
      triggerOperation: resource.triggerOperation,
      triggerType: resource.triggerType,
    }
    return new TriggerResponse(
      checkedResource,
      response.headers,
      response.code,
      trigger
    );
  }
  throw new Error("Necessary properties of TriggerDefinition missing.");
}