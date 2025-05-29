import type { CosmosDiagnostics } from "../../CosmosDiagnostics.js";
import type { CosmosHeaders } from "../../queryExecutionContext/index.js";
import { ResourceResponse } from "../../request/ResourceResponse.js";
import type { Resource } from "../Resource.js";
import type { ContainerDefinition } from "./ContainerDefinition.js";
import type { Container } from "./index.js";
/** Response object for Container operations */
export declare class ContainerResponse extends ResourceResponse<ContainerDefinition & Resource> {
    constructor(resource: ContainerDefinition & Resource, headers: CosmosHeaders, statusCode: number, container: Container, diagnostics: CosmosDiagnostics);
    /** A reference to the {@link Container} that the returned {@link ContainerDefinition} corresponds to. */
    readonly container: Container;
}
//# sourceMappingURL=ContainerResponse.d.ts.map