// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ProfessionalServiceContext,
  ProfessionalServiceClientOptionalParams,
} from "./api/index.js";
import { createProfessionalService } from "./api/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { ProfessionalServiceOperationStatusesOperations } from "./classic/professionalServiceOperationStatuses/index.js";
import { _getProfessionalServiceOperationStatusesOperations } from "./classic/professionalServiceOperationStatuses/index.js";
import type { ProfessionalServiceSubscriptionLevelOperations } from "./classic/professionalServiceSubscriptionLevel/index.js";
import { _getProfessionalServiceSubscriptionLevelOperations } from "./classic/professionalServiceSubscriptionLevel/index.js";
import type { ProfessionalServiceSubscriptionLevelGlobalOperations } from "./classic/professionalServiceSubscriptionLevelGlobal/index.js";
import { _getProfessionalServiceSubscriptionLevelGlobalOperations } from "./classic/professionalServiceSubscriptionLevelGlobal/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { ProfessionalServiceClientOptionalParams } from "./api/professionalServiceContext.js";

export class ProfessionalServiceClient {
  private _client: ProfessionalServiceContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Microsoft.ProfessionalService Resource Provider - GA API */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: ProfessionalServiceClientOptionalParams = {},
  ) {
    this._client = createProfessionalService(credential, subscriptionId, options);
    this.pipeline = this._client.pipeline;
    this.professionalServiceOperationStatuses = _getProfessionalServiceOperationStatusesOperations(
      this._client,
    );
    this.professionalServiceSubscriptionLevelGlobal =
      _getProfessionalServiceSubscriptionLevelGlobalOperations(this._client);
    this.professionalServiceSubscriptionLevel = _getProfessionalServiceSubscriptionLevelOperations(
      this._client,
    );
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for professionalServiceOperationStatuses */
  public readonly professionalServiceOperationStatuses: ProfessionalServiceOperationStatusesOperations;
  /** The operation groups for professionalServiceSubscriptionLevelGlobal */
  public readonly professionalServiceSubscriptionLevelGlobal: ProfessionalServiceSubscriptionLevelGlobalOperations;
  /** The operation groups for professionalServiceSubscriptionLevel */
  public readonly professionalServiceSubscriptionLevel: ProfessionalServiceSubscriptionLevelOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
