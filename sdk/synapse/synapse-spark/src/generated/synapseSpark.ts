import * as coreHttp from "@azure/core-http";
import { SparkBatch, SparkSession } from "./operations";
import { SynapseSparkContext } from "./synapseSparkContext";
import { SynapseSparkOptionalParams } from "./models";

export class SynapseSpark extends SynapseSparkContext {
  /**
   * Initializes a new instance of the SynapseSpark class.
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
    options?: SynapseSparkOptionalParams
  ) {
    super(credentials, endpoint, sparkPoolName, options);
    this.sparkBatch = new SparkBatch(this);
    this.sparkSession = new SparkSession(this);
  }

  sparkBatch: SparkBatch;
  sparkSession: SparkSession;
}
