import type { SparkBatch } from "../operationsInterfaces/index.js";
import type { SparkClient } from "../sparkClient.js";
import type { SparkBatchGetSparkBatchJobsOptionalParams, SparkBatchGetSparkBatchJobsResponse, SparkBatchJobOptions, SparkBatchCreateSparkBatchJobOptionalParams, SparkBatchCreateSparkBatchJobResponse, SparkBatchGetSparkBatchJobOptionalParams, SparkBatchGetSparkBatchJobResponse, SparkBatchCancelSparkBatchJobOptionalParams } from "../models/index.js";
/** Class containing SparkBatch operations. */
export declare class SparkBatchImpl implements SparkBatch {
    private readonly client;
    /**
     * Initialize a new instance of the class SparkBatch class.
     * @param client - Reference to the service client
     */
    constructor(client: SparkClient);
    /**
     * List all spark batch jobs which are running under a particular spark pool.
     * @param options - The options parameters.
     */
    getSparkBatchJobs(options?: SparkBatchGetSparkBatchJobsOptionalParams): Promise<SparkBatchGetSparkBatchJobsResponse>;
    /**
     * Create new spark batch job.
     * @param sparkBatchJobOptions - Livy compatible batch job request payload.
     * @param options - The options parameters.
     */
    createSparkBatchJob(sparkBatchJobOptions: SparkBatchJobOptions, options?: SparkBatchCreateSparkBatchJobOptionalParams): Promise<SparkBatchCreateSparkBatchJobResponse>;
    /**
     * Gets a single spark batch job.
     * @param batchId - Identifier for the batch job.
     * @param options - The options parameters.
     */
    getSparkBatchJob(batchId: number, options?: SparkBatchGetSparkBatchJobOptionalParams): Promise<SparkBatchGetSparkBatchJobResponse>;
    /**
     * Cancels a running spark batch job.
     * @param batchId - Identifier for the batch job.
     * @param options - The options parameters.
     */
    cancelSparkBatchJob(batchId: number, options?: SparkBatchCancelSparkBatchJobOptionalParams): Promise<void>;
}
//# sourceMappingURL=sparkBatch.d.ts.map