// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import * as coreHttp from "@azure/core-http";
import { SparkBatch, SparkSession } from "./operations";
import { SparkClientContext } from "./sparkClientContext";
import { SparkClientOptionalParams } from "./models";

export class SparkClient extends SparkClientContext {
  /**
   * Initializes a new instance of the SparkClient class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param endpoint The workspace development endpoint, for example
   *                 https://myworkspace.dev.azuresynapse.net.
   * @param sparkPoolName Name of the spark pool.
   * @param options The parameter options
   */
  constructor(
    credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials,
    endpoint: string,
    sparkPoolName: string,
    options?: SparkClientOptionalParams
  ) {
    super(credentials, endpoint, sparkPoolName, options);
    this.sparkBatch = new SparkBatch(this);
    this.sparkSession = new SparkSession(this);
  }

  sparkBatch: SparkBatch;
  sparkSession: SparkSession;
}
