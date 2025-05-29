import { SqlParameter, JSONArray, JSONObject, JSONValue } from "../queryExecutionContext/index.js";
import { TypeMarker } from "./enums/TypeMarker.js";
import { CosmosEncryptedNumber } from "./CosmosEncryptedNumber.js";
export interface EncryptionSqlParameter extends SqlParameter {
    type?: TypeMarker;
    path: string;
}
/**
 * Represents a builder class for building encrypted parameters in parametrized query.
 */
export declare class EncryptionQueryBuilder {
    private query;
    private parameters?;
    constructor(query: string);
    /**
     * Adds parameter to query
     */
    addParameter(name: string, value: boolean | string | null | JSONArray | JSONObject | Date | CosmosEncryptedNumber, path: string): void;
    /** Adds unencrypted parameter to query */
    addUnencryptedParameter(name: string, value: JSONValue, path: string): void;
}
//# sourceMappingURL=EncryptionQueryBuilder.d.ts.map