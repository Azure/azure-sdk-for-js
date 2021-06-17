// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import "./models";

export type GetSparkJobListParameters = RequestParameters;

export interface GetSqlJobQueryStringQueryParamProperties {
  filter?: string;
  $orderby?: string;
  skip?: string;
}

export interface GetSqlJobQueryStringQueryParam {
  queryParameters?: GetSqlJobQueryStringQueryParamProperties;
}

export type GetSqlJobQueryStringParameters = RequestParameters &
  GetSqlJobQueryStringQueryParam;
