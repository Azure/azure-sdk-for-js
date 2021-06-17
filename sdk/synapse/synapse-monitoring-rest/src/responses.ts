// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SparkJobListViewResponse, SqlQueryStringDataModel } from "./models";
import { HttpResponse } from "@azure-rest/core-client";

/** Get list of spark applications for the workspace. */
export interface GetSparkJobList200Response extends HttpResponse {
  status: "200";
  body: SparkJobListViewResponse;
}

/** Get SQL OD/DW Query for the workspace. */
export interface GetSqlJobQueryString200Response extends HttpResponse {
  status: "200";
  body: SqlQueryStringDataModel;
}
