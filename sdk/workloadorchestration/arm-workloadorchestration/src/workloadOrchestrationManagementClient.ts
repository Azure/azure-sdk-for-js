// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createWorkloadOrchestrationManagement,
  WorkloadOrchestrationManagementContext,
  WorkloadOrchestrationManagementClientOptionalParams,
} from "./api/index.js";
import {
  ConfigTemplateVersionsOperations,
  _getConfigTemplateVersionsOperations,
} from "./classic/configTemplateVersions/index.js";
import {
  ConfigTemplatesOperations,
  _getConfigTemplatesOperations,
} from "./classic/configTemplates/index.js";
import { ContextsOperations, _getContextsOperations } from "./classic/contexts/index.js";
import { DiagnosticsOperations, _getDiagnosticsOperations } from "./classic/diagnostics/index.js";
import {
  DynamicSchemaVersionsOperations,
  _getDynamicSchemaVersionsOperations,
} from "./classic/dynamicSchemaVersions/index.js";
import {
  DynamicSchemasOperations,
  _getDynamicSchemasOperations,
} from "./classic/dynamicSchemas/index.js";
import { ExecutionsOperations, _getExecutionsOperations } from "./classic/executions/index.js";
import {
  InstanceHistoriesOperations,
  _getInstanceHistoriesOperations,
} from "./classic/instanceHistories/index.js";
import { InstancesOperations, _getInstancesOperations } from "./classic/instances/index.js";
import { JobsOperations, _getJobsOperations } from "./classic/jobs/index.js";
import {
  SchemaReferencesOperations,
  _getSchemaReferencesOperations,
} from "./classic/schemaReferences/index.js";
import {
  SchemaVersionsOperations,
  _getSchemaVersionsOperations,
} from "./classic/schemaVersions/index.js";
import { SchemasOperations, _getSchemasOperations } from "./classic/schemas/index.js";
import {
  SiteReferencesOperations,
  _getSiteReferencesOperations,
} from "./classic/siteReferences/index.js";
import {
  SolutionTemplateVersionsOperations,
  _getSolutionTemplateVersionsOperations,
} from "./classic/solutionTemplateVersions/index.js";
import {
  SolutionTemplatesOperations,
  _getSolutionTemplatesOperations,
} from "./classic/solutionTemplates/index.js";
import {
  SolutionVersionsOperations,
  _getSolutionVersionsOperations,
} from "./classic/solutionVersions/index.js";
import { SolutionsOperations, _getSolutionsOperations } from "./classic/solutions/index.js";
import { TargetsOperations, _getTargetsOperations } from "./classic/targets/index.js";
import {
  WorkflowVersionsOperations,
  _getWorkflowVersionsOperations,
} from "./classic/workflowVersions/index.js";
import { WorkflowsOperations, _getWorkflowsOperations } from "./classic/workflows/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export { WorkloadOrchestrationManagementClientOptionalParams } from "./api/workloadOrchestrationManagementContext.js";

export class WorkloadOrchestrationManagementClient {
  private _client: WorkloadOrchestrationManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Microsoft.Edge Resource Provider management API. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: WorkloadOrchestrationManagementClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createWorkloadOrchestrationManagement(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.siteReferences = _getSiteReferencesOperations(this._client);
    this.contexts = _getContextsOperations(this._client);
    this.diagnostics = _getDiagnosticsOperations(this._client);
    this.executions = _getExecutionsOperations(this._client);
    this.workflowVersions = _getWorkflowVersionsOperations(this._client);
    this.workflows = _getWorkflowsOperations(this._client);
    this.configTemplateVersions = _getConfigTemplateVersionsOperations(this._client);
    this.configTemplates = _getConfigTemplatesOperations(this._client);
    this.instanceHistories = _getInstanceHistoriesOperations(this._client);
    this.instances = _getInstancesOperations(this._client);
    this.solutionTemplates = _getSolutionTemplatesOperations(this._client);
    this.solutionTemplateVersions = _getSolutionTemplateVersionsOperations(this._client);
    this.solutions = _getSolutionsOperations(this._client);
    this.schemaReferences = _getSchemaReferencesOperations(this._client);
    this.dynamicSchemaVersions = _getDynamicSchemaVersionsOperations(this._client);
    this.targets = _getTargetsOperations(this._client);
    this.jobs = _getJobsOperations(this._client);
    this.solutionVersions = _getSolutionVersionsOperations(this._client);
    this.schemaVersions = _getSchemaVersionsOperations(this._client);
    this.schemas = _getSchemasOperations(this._client);
    this.dynamicSchemas = _getDynamicSchemasOperations(this._client);
  }

  /** The operation groups for siteReferences */
  public readonly siteReferences: SiteReferencesOperations;
  /** The operation groups for contexts */
  public readonly contexts: ContextsOperations;
  /** The operation groups for diagnostics */
  public readonly diagnostics: DiagnosticsOperations;
  /** The operation groups for executions */
  public readonly executions: ExecutionsOperations;
  /** The operation groups for workflowVersions */
  public readonly workflowVersions: WorkflowVersionsOperations;
  /** The operation groups for workflows */
  public readonly workflows: WorkflowsOperations;
  /** The operation groups for configTemplateVersions */
  public readonly configTemplateVersions: ConfigTemplateVersionsOperations;
  /** The operation groups for configTemplates */
  public readonly configTemplates: ConfigTemplatesOperations;
  /** The operation groups for instanceHistories */
  public readonly instanceHistories: InstanceHistoriesOperations;
  /** The operation groups for instances */
  public readonly instances: InstancesOperations;
  /** The operation groups for solutionTemplates */
  public readonly solutionTemplates: SolutionTemplatesOperations;
  /** The operation groups for solutionTemplateVersions */
  public readonly solutionTemplateVersions: SolutionTemplateVersionsOperations;
  /** The operation groups for solutions */
  public readonly solutions: SolutionsOperations;
  /** The operation groups for schemaReferences */
  public readonly schemaReferences: SchemaReferencesOperations;
  /** The operation groups for dynamicSchemaVersions */
  public readonly dynamicSchemaVersions: DynamicSchemaVersionsOperations;
  /** The operation groups for targets */
  public readonly targets: TargetsOperations;
  /** The operation groups for jobs */
  public readonly jobs: JobsOperations;
  /** The operation groups for solutionVersions */
  public readonly solutionVersions: SolutionVersionsOperations;
  /** The operation groups for schemaVersions */
  public readonly schemaVersions: SchemaVersionsOperations;
  /** The operation groups for schemas */
  public readonly schemas: SchemasOperations;
  /** The operation groups for dynamicSchemas */
  public readonly dynamicSchemas: DynamicSchemasOperations;
}
