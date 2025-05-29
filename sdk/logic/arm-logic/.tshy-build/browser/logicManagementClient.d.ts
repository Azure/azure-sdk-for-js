import * as coreClient from "@azure/core-client";
import * as coreAuth from "@azure/core-auth";
import { Workflows, WorkflowVersions, WorkflowTriggers, WorkflowVersionTriggers, WorkflowTriggerHistories, WorkflowRuns, WorkflowRunActions, WorkflowRunActionRepetitions, WorkflowRunActionRepetitionsRequestHistories, WorkflowRunActionRequestHistories, WorkflowRunActionScopeRepetitions, WorkflowRunOperations, IntegrationAccounts, IntegrationAccountAssemblies, IntegrationAccountBatchConfigurations, IntegrationAccountSchemas, IntegrationAccountMaps, IntegrationAccountPartners, IntegrationAccountAgreements, IntegrationAccountCertificates, IntegrationAccountSessions, IntegrationServiceEnvironments, IntegrationServiceEnvironmentSkus, IntegrationServiceEnvironmentNetworkHealth, IntegrationServiceEnvironmentManagedApis, IntegrationServiceEnvironmentManagedApiOperations, Operations } from "./operationsInterfaces/index.js";
import { LogicManagementClientOptionalParams } from "./models/index.js";
export declare class LogicManagementClient extends coreClient.ServiceClient {
    $host: string;
    subscriptionId: string;
    apiVersion: string;
    /**
     * Initializes a new instance of the LogicManagementClient class.
     * @param credentials Subscription credentials which uniquely identify client subscription.
     * @param subscriptionId The subscription id.
     * @param options The parameter options
     */
    constructor(credentials: coreAuth.TokenCredential, subscriptionId: string, options?: LogicManagementClientOptionalParams);
    /** A function that adds a policy that sets the api-version (or equivalent) to reflect the library version. */
    private addCustomApiVersionPolicy;
    workflows: Workflows;
    workflowVersions: WorkflowVersions;
    workflowTriggers: WorkflowTriggers;
    workflowVersionTriggers: WorkflowVersionTriggers;
    workflowTriggerHistories: WorkflowTriggerHistories;
    workflowRuns: WorkflowRuns;
    workflowRunActions: WorkflowRunActions;
    workflowRunActionRepetitions: WorkflowRunActionRepetitions;
    workflowRunActionRepetitionsRequestHistories: WorkflowRunActionRepetitionsRequestHistories;
    workflowRunActionRequestHistories: WorkflowRunActionRequestHistories;
    workflowRunActionScopeRepetitions: WorkflowRunActionScopeRepetitions;
    workflowRunOperations: WorkflowRunOperations;
    integrationAccounts: IntegrationAccounts;
    integrationAccountAssemblies: IntegrationAccountAssemblies;
    integrationAccountBatchConfigurations: IntegrationAccountBatchConfigurations;
    integrationAccountSchemas: IntegrationAccountSchemas;
    integrationAccountMaps: IntegrationAccountMaps;
    integrationAccountPartners: IntegrationAccountPartners;
    integrationAccountAgreements: IntegrationAccountAgreements;
    integrationAccountCertificates: IntegrationAccountCertificates;
    integrationAccountSessions: IntegrationAccountSessions;
    integrationServiceEnvironments: IntegrationServiceEnvironments;
    integrationServiceEnvironmentSkus: IntegrationServiceEnvironmentSkus;
    integrationServiceEnvironmentNetworkHealth: IntegrationServiceEnvironmentNetworkHealth;
    integrationServiceEnvironmentManagedApis: IntegrationServiceEnvironmentManagedApis;
    integrationServiceEnvironmentManagedApiOperations: IntegrationServiceEnvironmentManagedApiOperations;
    operations: Operations;
}
//# sourceMappingURL=logicManagementClient.d.ts.map