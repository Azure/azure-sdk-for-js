// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ExecutionContext } from "../../../../src/queryExecutionContext";
import { OrderByQueryExecutionContext } from "../../../../src/queryExecutionContext/orderByQueryExecutionContext";

export class TestOrderbyQueryExecutionContext
  extends OrderByQueryExecutionContext
  implements ExecutionContext {}
