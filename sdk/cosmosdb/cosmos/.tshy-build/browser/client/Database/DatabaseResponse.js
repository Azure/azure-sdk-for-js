import { ResourceResponse } from "../../request/ResourceResponse.js";
/** Response object for Database operations */
export class DatabaseResponse extends ResourceResponse {
    constructor(resource, headers, statusCode, database, diagnostics) {
        super(resource, headers, statusCode, diagnostics);
        this.database = database;
    }
}
//# sourceMappingURL=DatabaseResponse.js.map