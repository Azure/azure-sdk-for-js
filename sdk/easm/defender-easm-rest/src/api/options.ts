// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AssetResponseType } from "../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CreateOrReplacePolicyOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeletePolicyOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetPolicyOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ListPolicyOptionalParams extends OperationOptions {
  /** Filter the result list using the given expression. */
  filter?: string;
  /** The number of result items to skip. */
  skip?: number;
  /** The maximum number of result items per page. */
  maxpagesize?: number;
}

/** Optional parameters. */
export interface GetCisaCveOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetCisaCvesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DownloadTaskOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RunTaskOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CancelTaskOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetTaskOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ListTaskOptionalParams extends OperationOptions {
  /** Filter the result list using the given expression. */
  filter?: string;
  /** A list of expressions that specify the order of the returned resources. */
  orderby?: string;
  /** The number of result items to skip. */
  skip?: number;
  /** The maximum number of result items per page. */
  maxpagesize?: number;
}

/** Optional parameters. */
export interface DeleteSavedFilterOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CreateOrReplaceSavedFilterOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetSavedFilterOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ListSavedFilterOptionalParams extends OperationOptions {
  /** Filter the result list using the given expression. */
  filter?: string;
  /** The number of result items to skip. */
  skip?: number;
  /** The maximum number of result items per page. */
  maxpagesize?: number;
}

/** Optional parameters. */
export interface GetSnapshotExportOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetSummaryOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetSnapshotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetBillableOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetDiscoTemplateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ListDiscoTemplateOptionalParams extends OperationOptions {
  /** Filter the result list using the given expression. */
  filter?: string;
  /** The number of result items to skip. */
  skip?: number;
  /** The maximum number of result items per page. */
  maxpagesize?: number;
}

/** Optional parameters. */
export interface DismissAssetChainOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetAssetChainSummaryOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ListRunsOptionalParams extends OperationOptions {
  /** Filter the result list using the given expression. */
  filter?: string;
  /** The number of result items to skip. */
  skip?: number;
  /** The maximum number of result items per page. */
  maxpagesize?: number;
}

/** Optional parameters. */
export interface RunDiscoGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CreateOrReplaceDiscoGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeleteDiscoGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetDiscoGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ValidateDiscoGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ListDiscoGroupOptionalParams extends OperationOptions {
  /** Filter the result list using the given expression. */
  filter?: string;
  /** The number of result items to skip. */
  skip?: number;
  /** The maximum number of result items per page. */
  maxpagesize?: number;
}

/** Optional parameters. */
export interface DeleteDataConnectionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CreateOrReplaceDataConnectionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetDataConnectionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ValidateDataConnectionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ListDataConnectionOptionalParams extends OperationOptions {
  /** The number of result items to skip. */
  skip?: number;
  /** The maximum number of result items per page. */
  maxpagesize?: number;
}

/** Optional parameters. */
export interface GetDeltaSummaryOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetDeltaDetailsOptionalParams extends OperationOptions {
  /** The number of result items to skip. */
  skip?: number;
  /** The maximum number of result items per page. */
  maxpagesize?: number;
}

/** Optional parameters. */
export interface GetObservationsOptionalParams extends OperationOptions {
  /** Filter the result list using the given expression. */
  filter?: string;
  /** A list of expressions that specify the order of the returned resources. */
  orderby?: string;
  /** The number of result items to skip. */
  skip?: number;
  /** The maximum number of result items per page. */
  maxpagesize?: number;
}

/** Optional parameters. */
export interface GetAssetsExportOptionalParams extends OperationOptions {
  /** Filter the result list using the given expression. */
  filter?: string;
  /** A list of expressions that specify the order of the returned resources. */
  orderby?: string;
}

/** Optional parameters. */
export interface GetAssetResourceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface UpdateAssetsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ListAssetResourceOptionalParams extends OperationOptions {
  /** Filter the result list using the given expression. */
  filter?: string;
  /** A list of expressions that specify the order of the returned resources. */
  orderby?: string;
  /** The number of result items to skip. */
  skip?: number;
  /** The maximum number of result items per page. */
  maxpagesize?: number;
  /** Specify this value instead of 'skip' to use cursor-based searching. Initial value is '*' and subsequent values are returned in the response. */
  mark?: string;
  /** Specify the response type. The possible values are: ID, STANDARD, FULL, REDUCED */
  responseType?: AssetResponseType;
  /** The properties to include in the response. */
  responseIncludes?: string[];
  /** If it's recent only. */
  recentOnly?: boolean;
}
