// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosHeaders } from "../queryExecutionContext";
import type { StatusCode, SubStatusCode } from "../request";
import type { OperationResponse } from "../utils/batch";
import type { ItemBulkOperation } from "./ItemBulkOperation";

export class BulkResponse {
    statusCode: StatusCode;
    subStatusCode: SubStatusCode;
    headers: CosmosHeaders;
    operations: ItemBulkOperation[];
    result: OperationResponse[];

    constructor(
        statusCode: StatusCode,
        subStatusCode: SubStatusCode,
        headers: CosmosHeaders,
        operations: ItemBulkOperation[],
        result: OperationResponse[]
    ) {
        this.statusCode = statusCode;
        this.subStatusCode = subStatusCode;
        this.headers = headers;
        this.operations = operations;
        this.result = result;
    }

}
