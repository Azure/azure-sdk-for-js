import type { CosmosDiagnostics } from "../../CosmosDiagnostics.js";
import type { CosmosHeaders } from "../../queryExecutionContext/index.js";
import { ResourceResponse } from "../../request/index.js";
import type { Resource } from "../Resource.js";
import type { Trigger } from "./index.js";
import type { TriggerDefinition } from "./TriggerDefinition.js";
export declare class TriggerResponse extends ResourceResponse<TriggerDefinition & Resource> {
    constructor(resource: TriggerDefinition & Resource, headers: CosmosHeaders, statusCode: number, trigger: Trigger, diagnostics: CosmosDiagnostics);
    /** A reference to the {@link Trigger} corresponding to the returned {@link TriggerDefinition}. */
    readonly trigger: Trigger;
}
//# sourceMappingURL=TriggerResponse.d.ts.map