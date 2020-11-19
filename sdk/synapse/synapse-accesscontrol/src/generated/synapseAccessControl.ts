import * as coreHttp from "@azure/core-http";
import { RoleDefinitions, RoleAssignments } from "./operations";
import * as Parameters from "./models/parameters";
import * as Mappers from "./models/mappers";
import { SynapseAccessControlContext } from "./synapseAccessControlContext";
import {
  SynapseAccessControlOptionalParams,
  SubjectInfo,
  Action,
  SynapseAccessControlCheckPrincipalAccessResponse
} from "./models";

export class SynapseAccessControl extends SynapseAccessControlContext {
  /**
   * Initializes a new instance of the SynapseAccessControl class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param endpoint The workspace development endpoint, for example
   *                 https://myworkspace.dev.azuresynapse.net.
   * @param options The parameter options
   */
  constructor(
    credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials,
    endpoint: string,
    options?: SynapseAccessControlOptionalParams
  ) {
    super(credentials, endpoint, options);
    this.roleDefinitions = new RoleDefinitions(this);
    this.roleAssignments = new RoleAssignments(this);
  }

  /**
   * Check if the given principalId has access to perform list of actions at a given scope.
   * @param subject Subject details
   * @param actions List of actions.
   * @param scope Scope at which the check access is done.
   * @param options The options parameters.
   */
  checkPrincipalAccess(
    subject: SubjectInfo,
    actions: Action[],
    scope: string,
    options?: coreHttp.OperationOptions
  ): Promise<SynapseAccessControlCheckPrincipalAccessResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      subject,
      actions,
      scope,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.sendOperationRequest(
      operationArguments,
      checkPrincipalAccessOperationSpec
    ) as Promise<SynapseAccessControlCheckPrincipalAccessResponse>;
  }

  roleDefinitions: RoleDefinitions;
  roleAssignments: RoleAssignments;
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const checkPrincipalAccessOperationSpec: coreHttp.OperationSpec = {
  path: "/checkAccessSynapseRbac",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.CheckPrincipalAccessResponse
    },
    default: {
      bodyMapper: Mappers.ErrorContract
    }
  },
  requestBody: {
    parameterPath: {
      subject: ["subject"],
      actions: ["actions"],
      scope: ["scope"]
    },
    mapper: Mappers.CheckPrincipalAccessRequest
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer
};
