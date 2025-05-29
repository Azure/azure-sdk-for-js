/**
 * Represents a SQL query in the Azure Cosmos DB service.
 *
 * Queries with inputs should be parameterized to protect against SQL injection.
 *
 * @example Parameterized SQL Query
 * ```ts snippet:SqlQuerySpecParameterizedSqlQuery
 * import { SqlQuerySpec } from "@azure/cosmos";
 *
 * const query: SqlQuerySpec = {
 *   query: `SELECT * FROM Families f where f.lastName = @lastName`,
 *   parameters: [{ name: "@lastName", value: "Wakefield" }],
 * };
 * ```
 */
export interface SqlQuerySpec {
    /** The text of the SQL query */
    query: string;
    /** The parameters you provide in the query */
    parameters?: SqlParameter[];
}
/**
 * Represents a parameter in a Parameterized SQL query, specified in {@link SqlQuerySpec}
 */
export interface SqlParameter {
    /** Name of the parameter. (i.e. `@lastName`) */
    name: string;
    /** Value of the parameter (this is safe to come from users, assuming they are authorized) */
    value: JSONValue;
}
export type JSONValue = boolean | number | string | null | JSONArray | JSONObject | Date;
export interface JSONObject {
    [key: string]: JSONValue;
}
export interface JSONArray extends ArrayLike<JSONValue> {
}
//# sourceMappingURL=SqlQuerySpec.d.ts.map