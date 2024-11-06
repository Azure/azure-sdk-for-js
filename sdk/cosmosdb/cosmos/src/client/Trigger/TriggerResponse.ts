// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { CosmosDiagnostics } from "../../CosmosDiagnostics";
import type { CosmosHeaders } from "../../queryExecutionContext";
import { ResourceResponse } from "../../request";
import type { Resource } from "../Resource";
import type { Trigger } from "./index";
import type { TriggerDefinition } from "./TriggerDefinition";

export class TriggerResponse extends ResourceResponse<TriggerDefinition & Resource> {
  constructor(
    resource: TriggerDefinition & Resource,
    headers: CosmosHeaders,
    statusCode: number,
    trigger: Trigger,
    diagnostics: CosmosDiagnostics,
  ) {
    super(resource, headers, statusCode, diagnostics);
    this.trigger = trigger;
  }
  /** A reference to the {@link Trigger} corresponding to the returned {@link TriggerDefinition}. */
  public readonly trigger: Trigger;
}
