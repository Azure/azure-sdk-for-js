// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { CosmosDiagnostics } from "../../CosmosDiagnostics.js";
import type { CosmosHeaders } from "../../queryExecutionContext/index.js";
import { ResourceResponse } from "../../request/index.js";
import type { Resource } from "../Resource.js";
import type { Trigger } from "./index.js";
import type { TriggerDefinition } from "./TriggerDefinition.js";

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
