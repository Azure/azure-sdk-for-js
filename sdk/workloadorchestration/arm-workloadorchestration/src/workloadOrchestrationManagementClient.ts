// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  WorkloadOrchestrationManagementContext,
  WorkloadOrchestrationManagementClientOptionalParams} from "./api/index.js";
import {
  createWorkloadOrchestrationManagement
} from "./api/index.js";
import type {
  ConfigTemplateVersionsOperations} from "./classic/configTemplateVersions/index.js";
import {
  _getConfigTemplateVersionsOperations,
} from "./classic/configTemplateVersions/index.js";
import type {
  ConfigTemplatesOperations} from "./classic/configTemplates/index.js";
import {
  _getConfigTemplatesOperations,
} from "./classic/configTemplates/index.js";
import type { ContextsOperations} from "./classic/contexts/index.js";
import { _getContextsOperations } from "./classic/contexts/index.js";
import type { DiagnosticsOperations} from "./classic/diagnostics/index.js";
import { _getDiagnosticsOperations } from "./classic/diagnostics/index.js";
import type {
  DynamicSchemaVersionsOperations} from "./classic/dynamicSchemaVersions/index.js";
import {
  _getDynamicSchemaVersionsOperations,
} from "./classic/dynamicSchemaVersions/index.js";
import type {
  DynamicSchemasOperations} from "./classic/dynamicSchemas/index.js";
import {
  _getDynamicSchemasOperations,
} from "./classic/dynamicSchemas/index.js";
import type { ExecutionsOperations} from "./classic/executions/index.js";
import { _getExecutionsOperations } from "./classic/executions/index.js";
import type {
  InstanceHistoriesOperations} from "./classic/instanceHistories/index.js";
import {
  _getInstanceHistoriesOperations,
} from "./classic/instanceHistories/index.js";
import type { InstancesOperations} from "./classic/instances/index.js";
import { _getInstancesOperations } from "./classic/instances/index.js";
import type { JobsOperations} from "./classic/jobs/index.js";
import { _getJobsOperations } from "./classic/jobs/index.js";
import type {
  SchemaReferencesOperations} from "./classic/schemaReferences/index.js";
import {
  _getSchemaReferencesOperations,
} from "./classic/schemaReferences/index.js";
import type {
  SchemaVersionsOperations} from "./classic/schemaVersions/index.js";
import {
  _getSchemaVersionsOperations,
} from "./classic/schemaVersions/index.js";
import type { SchemasOperations} from "./classic/schemas/index.js";
import { _getSchemasOperations } from "./classic/schemas/index.js";
import type {
  SiteReferencesOperations} from "./classic/siteReferences/index.js";
import {
  _getSiteReferencesOperations,
} from "./classic/siteReferences/index.js";
import type {
  SolutionTemplateVersionsOperations} from "./classic/solutionTemplateVersions/index.js";
import {
  _getSolutionTemplateVersionsOperations,
} from "./classic/solutionTemplateVersions/index.js";
import type {
  SolutionTemplatesOperations} from "./classic/solutionTemplates/index.js";
import {
  _getSolutionTemplatesOperations,
} from "./classic/solutionTemplates/index.js";
import type {
  SolutionVersionsOperations} from "./classic/solutionVersions/index.js";
import {
  _getSolutionVersionsOperations,
} from "./classic/solutionVersions/index.js";
import type { SolutionsOperations} from "./classic/solutions/index.js";
import { _getSolutionsOperations } from "./classic/solutions/index.js";
import type { TargetsOperations} from "./classic/targets/index.js";
import { _getTargetsOperations } from "./classic/targets/index.js";
import type {
  WorkflowVersionsOperations} from "./classic/workflowVersions/index.js";
import {
  _getWorkflowVersionsOperations,
} from "./classic/workflowVersions/index.js";
import type { WorkflowsOperations} from "./classic/workflows/index.js";
import { _getWorkflowsOperations } from "./classic/workflows/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { WorkloadOrchestrationManagementClientOptionalParams } from "./api/workloadOrchestrationManagementContext.js";

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
