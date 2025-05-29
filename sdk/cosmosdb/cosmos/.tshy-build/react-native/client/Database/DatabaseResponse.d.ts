import type { CosmosDiagnostics } from "../../CosmosDiagnostics.js";
import type { CosmosHeaders } from "../../queryExecutionContext/index.js";
import { ResourceResponse } from "../../request/ResourceResponse.js";
import type { Resource } from "../Resource.js";
import type { Database } from "./Database.js";
import type { DatabaseDefinition } from "./DatabaseDefinition.js";
/** Response object for Database operations */
export declare class DatabaseResponse extends ResourceResponse<DatabaseDefinition & Resource> {
    constructor(resource: DatabaseDefinition & Resource, headers: CosmosHeaders, statusCode: number, database: Database, diagnostics: CosmosDiagnostics);
    /** A reference to the {@link Database} that the returned {@link DatabaseDefinition} corresponds to. */
    readonly database: Database;
}
//# sourceMappingURL=DatabaseResponse.d.ts.map