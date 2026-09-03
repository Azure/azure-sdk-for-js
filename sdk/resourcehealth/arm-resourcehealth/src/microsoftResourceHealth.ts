// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  MicrosoftResourceHealthContext,
  MicrosoftResourceHealthOptionalParams,
  createMicrosoftResourceHealth,
} from "./api/index.js";
import {
  AvailabilityStatusesOperations,
  _getAvailabilityStatusesOperations,
} from "./classic/availabilityStatuses/index.js";
import {
  ChildAvailabilityStatusesOperations,
  _getChildAvailabilityStatusesOperations,
} from "./classic/childAvailabilityStatuses/index.js";
import {
  ChildResourcesOperations,
  _getChildResourcesOperations,
} from "./classic/childResources/index.js";
import {
  EmergingIssuesOperations,
  _getEmergingIssuesOperations,
} from "./classic/emergingIssues/index.js";
import { EventOperations, _getEventOperations } from "./classic/event/index.js";
import { EventsOperations, _getEventsOperations } from "./classic/events/index.js";
import {
  ImpactedResourcesOperations,
  _getImpactedResourcesOperations,
} from "./classic/impactedResources/index.js";
import { MetadataOperations, _getMetadataOperations } from "./classic/metadata/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import {
  SecurityAdvisoryImpactedResourcesOperations,
  _getSecurityAdvisoryImpactedResourcesOperations,
} from "./classic/securityAdvisoryImpactedResources/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { MicrosoftResourceHealthOptionalParams } from "./api/microsoftResourceHealthContext.js";

export class MicrosoftResourceHealth {
  private _client: MicrosoftResourceHealthContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: MicrosoftResourceHealthOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: MicrosoftResourceHealthOptionalParams,
  );
  /** The Resource Health Client. */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | MicrosoftResourceHealthOptionalParams,
    options?: MicrosoftResourceHealthOptionalParams,
  ) {
    let subscriptionId: string | undefined;

    if (typeof subscriptionIdOrOptions === "string") {
      subscriptionId = subscriptionIdOrOptions;
    } else if (typeof subscriptionIdOrOptions === "object") {
      options = subscriptionIdOrOptions;
    }

    options = options ?? {};
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createMicrosoftResourceHealth(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.childResources = _getChildResourcesOperations(this._client);
    this.emergingIssues = _getEmergingIssuesOperations(this._client);
    this.securityAdvisoryImpactedResources = _getSecurityAdvisoryImpactedResourcesOperations(
      this._client,
    );
    this.events = _getEventsOperations(this._client);
    this.event = _getEventOperations(this._client);
    this.metadata = _getMetadataOperations(this._client);
    this.impactedResources = _getImpactedResourcesOperations(this._client);
    this.childAvailabilityStatuses = _getChildAvailabilityStatusesOperations(this._client);
    this.availabilityStatuses = _getAvailabilityStatusesOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for childResources */
  public readonly childResources: ChildResourcesOperations;
  /** The operation groups for emergingIssues */
  public readonly emergingIssues: EmergingIssuesOperations;
  /** The operation groups for securityAdvisoryImpactedResources */
  public readonly securityAdvisoryImpactedResources: SecurityAdvisoryImpactedResourcesOperations;
  /** The operation groups for events */
  public readonly events: EventsOperations;
  /** The operation groups for event */
  public readonly event: EventOperations;
  /** The operation groups for metadata */
  public readonly metadata: MetadataOperations;
  /** The operation groups for impactedResources */
  public readonly impactedResources: ImpactedResourcesOperations;
  /** The operation groups for childAvailabilityStatuses */
  public readonly childAvailabilityStatuses: ChildAvailabilityStatusesOperations;
  /** The operation groups for availabilityStatuses */
  public readonly availabilityStatuses: AvailabilityStatusesOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
