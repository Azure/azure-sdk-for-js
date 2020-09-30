// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TableServiceClientOptions } from "../models";
import { TablesSharedKeyCredential } from "../TablesSharedKeyCredential";

export interface ConnectionString {
  kind: "AccountConnString" | "SASConnString";
  url: string;
  accountName: string;
  accountKey?: any;
  accountSas?: string;
}

export interface ClientParamsFromConnectionString {
  url: string;
  options?: TableServiceClientOptions;
  credential?: TablesSharedKeyCredential;
}
