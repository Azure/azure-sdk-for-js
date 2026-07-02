// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  getResiliencyInformation,
  getRoutesInformation,
  stopSiteFailoverTest,
  startSiteFailoverTest,
  getFailoverSingleTestDetails,
  getFailoverAllTestsDetails,
  listBySubscription,
  listByResourceGroup,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/expressRouteGateways/operations.js";
import type {
  ExpressRouteGatewaysGetResiliencyInformationOptionalParams,
  ExpressRouteGatewaysGetRoutesInformationOptionalParams,
  ExpressRouteGatewaysStopSiteFailoverTestOptionalParams,
  ExpressRouteGatewaysStartSiteFailoverTestOptionalParams,
  ExpressRouteGatewaysGetFailoverSingleTestDetailsOptionalParams,
  ExpressRouteGatewaysGetFailoverAllTestsDetailsOptionalParams,
  ExpressRouteGatewaysListBySubscriptionOptionalParams,
  ExpressRouteGatewaysListByResourceGroupOptionalParams,
  ExpressRouteGatewaysDeleteOptionalParams,
  ExpressRouteGatewaysUpdateTagsOptionalParams,
  ExpressRouteGatewaysCreateOrUpdateOptionalParams,
  ExpressRouteGatewaysGetOptionalParams,
} from "../../api/expressRouteGateways/options.js";
import type {
  TagsObject,
  GatewayResiliencyInformation,
  GatewayRouteSetsInformation,
  ExpressRouteFailoverTestDetails,
  ExpressRouteFailoverSingleTestDetails,
  ExpressRouteFailoverStopApiParameters,
  ExpressRouteGateway,
  ExpressRouteGatewayList,
} from "../../models/microsoft/network/models.js";
import type {
  ExpressRouteGatewaysStopSiteFailoverTestResponse,
  ExpressRouteGatewaysStartSiteFailoverTestResponse,
} from "../../models/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ExpressRouteGateways operations. */
export interface ExpressRouteGatewaysOperations {
  /** Retrieves the resiliency information for the ExpressRoute gateway. */
  getResiliencyInformation: (
    resourceGroupName: string,
    expressRouteGatewayName: string,
    options?: ExpressRouteGatewaysGetResiliencyInformationOptionalParams,
  ) => PollerLike<OperationState<GatewayResiliencyInformation>, GatewayResiliencyInformation>;
  /** @deprecated use getResiliencyInformation instead */
  beginGetResiliencyInformation: (
    resourceGroupName: string,
    expressRouteGatewayName: string,
    options?: ExpressRouteGatewaysGetResiliencyInformationOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<GatewayResiliencyInformation>, GatewayResiliencyInformation>
  >;
  /** @deprecated use getResiliencyInformation instead */
  beginGetResiliencyInformationAndWait: (
    resourceGroupName: string,
    expressRouteGatewayName: string,
    options?: ExpressRouteGatewaysGetResiliencyInformationOptionalParams,
  ) => Promise<GatewayResiliencyInformation>;
  /** Retrieves the route sets information for the ExpressRoute gateway. */
  getRoutesInformation: (
    resourceGroupName: string,
    expressRouteGatewayName: string,
    options?: ExpressRouteGatewaysGetRoutesInformationOptionalParams,
  ) => PollerLike<OperationState<GatewayRouteSetsInformation>, GatewayRouteSetsInformation>;
  /** @deprecated use getRoutesInformation instead */
  beginGetRoutesInformation: (
    resourceGroupName: string,
    expressRouteGatewayName: string,
    options?: ExpressRouteGatewaysGetRoutesInformationOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<GatewayRouteSetsInformation>, GatewayRouteSetsInformation>
  >;
  /** @deprecated use getRoutesInformation instead */
  beginGetRoutesInformationAndWait: (
    resourceGroupName: string,
    expressRouteGatewayName: string,
    options?: ExpressRouteGatewaysGetRoutesInformationOptionalParams,
  ) => Promise<GatewayRouteSetsInformation>;
  /** Stops failover simulation on the ExpressRoute gateway for the specified peering location. */
  stopSiteFailoverTest: (
    resourceGroupName: string,
    expressRouteGatewayName: string,
    body: {
      stopParameters: ExpressRouteFailoverStopApiParameters;
    },
    options?: ExpressRouteGatewaysStopSiteFailoverTestOptionalParams,
  ) => PollerLike<
    OperationState<ExpressRouteGatewaysStopSiteFailoverTestResponse>,
    ExpressRouteGatewaysStopSiteFailoverTestResponse
  >;
  /** @deprecated use stopSiteFailoverTest instead */
  beginStopSiteFailoverTest: (
    resourceGroupName: string,
    expressRouteGatewayName: string,
    body: {
      stopParameters: ExpressRouteFailoverStopApiParameters;
    },
    options?: ExpressRouteGatewaysStopSiteFailoverTestOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ExpressRouteGatewaysStopSiteFailoverTestResponse>,
      ExpressRouteGatewaysStopSiteFailoverTestResponse
    >
  >;
  /** @deprecated use stopSiteFailoverTest instead */
  beginStopSiteFailoverTestAndWait: (
    resourceGroupName: string,
    expressRouteGatewayName: string,
    body: {
      stopParameters: ExpressRouteFailoverStopApiParameters;
    },
    options?: ExpressRouteGatewaysStopSiteFailoverTestOptionalParams,
  ) => Promise<ExpressRouteGatewaysStopSiteFailoverTestResponse>;
  /** Starts failover simulation on the ExpressRoute gateway for the specified peering location. */
  startSiteFailoverTest: (
    resourceGroupName: string,
    expressRouteGatewayName: string,
    peeringLocation: string,
    options?: ExpressRouteGatewaysStartSiteFailoverTestOptionalParams,
  ) => PollerLike<
    OperationState<ExpressRouteGatewaysStartSiteFailoverTestResponse>,
    ExpressRouteGatewaysStartSiteFailoverTestResponse
  >;
  /** @deprecated use startSiteFailoverTest instead */
  beginStartSiteFailoverTest: (
    resourceGroupName: string,
    expressRouteGatewayName: string,
    peeringLocation: string,
    options?: ExpressRouteGatewaysStartSiteFailoverTestOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ExpressRouteGatewaysStartSiteFailoverTestResponse>,
      ExpressRouteGatewaysStartSiteFailoverTestResponse
    >
  >;
  /** @deprecated use startSiteFailoverTest instead */
  beginStartSiteFailoverTestAndWait: (
    resourceGroupName: string,
    expressRouteGatewayName: string,
    peeringLocation: string,
    options?: ExpressRouteGatewaysStartSiteFailoverTestOptionalParams,
  ) => Promise<ExpressRouteGatewaysStartSiteFailoverTestResponse>;
  /** Retrieves the details of a particular failover test performed on the ExpressRoute gateway based on the test Guid. */
  getFailoverSingleTestDetails: (
    resourceGroupName: string,
    expressRouteGatewayName: string,
    peeringLocation: string,
    failoverTestId: string,
    options?: ExpressRouteGatewaysGetFailoverSingleTestDetailsOptionalParams,
  ) => PollerLike<
    OperationState<ExpressRouteFailoverSingleTestDetails[]>,
    ExpressRouteFailoverSingleTestDetails[]
  >;
  /** @deprecated use getFailoverSingleTestDetails instead */
  beginGetFailoverSingleTestDetails: (
    resourceGroupName: string,
    expressRouteGatewayName: string,
    peeringLocation: string,
    failoverTestId: string,
    options?: ExpressRouteGatewaysGetFailoverSingleTestDetailsOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ExpressRouteFailoverSingleTestDetails[]>,
      ExpressRouteFailoverSingleTestDetails[]
    >
  >;
  /** @deprecated use getFailoverSingleTestDetails instead */
  beginGetFailoverSingleTestDetailsAndWait: (
    resourceGroupName: string,
    expressRouteGatewayName: string,
    peeringLocation: string,
    failoverTestId: string,
    options?: ExpressRouteGatewaysGetFailoverSingleTestDetailsOptionalParams,
  ) => Promise<ExpressRouteFailoverSingleTestDetails[]>;
  /** Retrieves the details of all the failover tests performed on the ExpressRoute gateway for different peering locations. */
  getFailoverAllTestsDetails: (
    resourceGroupName: string,
    expressRouteGatewayName: string,
    options?: ExpressRouteGatewaysGetFailoverAllTestsDetailsOptionalParams,
  ) => PollerLike<
    OperationState<ExpressRouteFailoverTestDetails[]>,
    ExpressRouteFailoverTestDetails[]
  >;
  /** @deprecated use getFailoverAllTestsDetails instead */
  beginGetFailoverAllTestsDetails: (
    resourceGroupName: string,
    expressRouteGatewayName: string,
    options?: ExpressRouteGatewaysGetFailoverAllTestsDetailsOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ExpressRouteFailoverTestDetails[]>,
      ExpressRouteFailoverTestDetails[]
    >
  >;
  /** @deprecated use getFailoverAllTestsDetails instead */
  beginGetFailoverAllTestsDetailsAndWait: (
    resourceGroupName: string,
    expressRouteGatewayName: string,
    options?: ExpressRouteGatewaysGetFailoverAllTestsDetailsOptionalParams,
  ) => Promise<ExpressRouteFailoverTestDetails[]>;
  /** Lists ExpressRoute gateways under a given subscription. */
  listBySubscription: (
    options?: ExpressRouteGatewaysListBySubscriptionOptionalParams,
  ) => Promise<ExpressRouteGatewayList>;
  /** Lists ExpressRoute gateways in a given resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ExpressRouteGatewaysListByResourceGroupOptionalParams,
  ) => Promise<ExpressRouteGatewayList>;
  /** Deletes the specified ExpressRoute gateway in a resource group. An ExpressRoute gateway resource can only be deleted when there are no connection subresources. */
  delete: (
    resourceGroupName: string,
    expressRouteGatewayName: string,
    options?: ExpressRouteGatewaysDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    expressRouteGatewayName: string,
    options?: ExpressRouteGatewaysDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    expressRouteGatewayName: string,
    options?: ExpressRouteGatewaysDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates express route gateway tags. */
  updateTags: (
    resourceGroupName: string,
    expressRouteGatewayName: string,
    expressRouteGatewayParameters: TagsObject,
    options?: ExpressRouteGatewaysUpdateTagsOptionalParams,
  ) => PollerLike<OperationState<ExpressRouteGateway>, ExpressRouteGateway>;
  /** @deprecated use updateTags instead */
  beginUpdateTags: (
    resourceGroupName: string,
    expressRouteGatewayName: string,
    expressRouteGatewayParameters: TagsObject,
    options?: ExpressRouteGatewaysUpdateTagsOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ExpressRouteGateway>, ExpressRouteGateway>>;
  /** @deprecated use updateTags instead */
  beginUpdateTagsAndWait: (
    resourceGroupName: string,
    expressRouteGatewayName: string,
    expressRouteGatewayParameters: TagsObject,
    options?: ExpressRouteGatewaysUpdateTagsOptionalParams,
  ) => Promise<ExpressRouteGateway>;
  /** Creates or updates a ExpressRoute gateway in a specified resource group. */
  createOrUpdate: (
    resourceGroupName: string,
    expressRouteGatewayName: string,
    putExpressRouteGatewayParameters: ExpressRouteGateway,
    options?: ExpressRouteGatewaysCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ExpressRouteGateway>, ExpressRouteGateway>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    expressRouteGatewayName: string,
    putExpressRouteGatewayParameters: ExpressRouteGateway,
    options?: ExpressRouteGatewaysCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ExpressRouteGateway>, ExpressRouteGateway>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    expressRouteGatewayName: string,
    putExpressRouteGatewayParameters: ExpressRouteGateway,
    options?: ExpressRouteGatewaysCreateOrUpdateOptionalParams,
  ) => Promise<ExpressRouteGateway>;
  /** Fetches the details of a ExpressRoute gateway in a resource group. */
  get: (
    resourceGroupName: string,
    expressRouteGatewayName: string,
    options?: ExpressRouteGatewaysGetOptionalParams,
  ) => Promise<ExpressRouteGateway>;
}

function _getExpressRouteGateways(context: NetworkManagementContext) {
  return {
    getResiliencyInformation: (
      resourceGroupName: string,
      expressRouteGatewayName: string,
      options?: ExpressRouteGatewaysGetResiliencyInformationOptionalParams,
    ) => getResiliencyInformation(context, resourceGroupName, expressRouteGatewayName, options),
    beginGetResiliencyInformation: async (
      resourceGroupName: string,
      expressRouteGatewayName: string,
      options?: ExpressRouteGatewaysGetResiliencyInformationOptionalParams,
    ) => {
      const poller = getResiliencyInformation(
        context,
        resourceGroupName,
        expressRouteGatewayName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGetResiliencyInformationAndWait: async (
      resourceGroupName: string,
      expressRouteGatewayName: string,
      options?: ExpressRouteGatewaysGetResiliencyInformationOptionalParams,
    ) => {
      return await getResiliencyInformation(
        context,
        resourceGroupName,
        expressRouteGatewayName,
        options,
      );
    },
    getRoutesInformation: (
      resourceGroupName: string,
      expressRouteGatewayName: string,
      options?: ExpressRouteGatewaysGetRoutesInformationOptionalParams,
    ) => getRoutesInformation(context, resourceGroupName, expressRouteGatewayName, options),
    beginGetRoutesInformation: async (
      resourceGroupName: string,
      expressRouteGatewayName: string,
      options?: ExpressRouteGatewaysGetRoutesInformationOptionalParams,
    ) => {
      const poller = getRoutesInformation(
        context,
        resourceGroupName,
        expressRouteGatewayName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGetRoutesInformationAndWait: async (
      resourceGroupName: string,
      expressRouteGatewayName: string,
      options?: ExpressRouteGatewaysGetRoutesInformationOptionalParams,
    ) => {
      return await getRoutesInformation(
        context,
        resourceGroupName,
        expressRouteGatewayName,
        options,
      );
    },
    stopSiteFailoverTest: (
      resourceGroupName: string,
      expressRouteGatewayName: string,
      body: {
        stopParameters: ExpressRouteFailoverStopApiParameters;
      },
      options?: ExpressRouteGatewaysStopSiteFailoverTestOptionalParams,
    ) => stopSiteFailoverTest(context, resourceGroupName, expressRouteGatewayName, body, options),
    beginStopSiteFailoverTest: async (
      resourceGroupName: string,
      expressRouteGatewayName: string,
      body: {
        stopParameters: ExpressRouteFailoverStopApiParameters;
      },
      options?: ExpressRouteGatewaysStopSiteFailoverTestOptionalParams,
    ) => {
      const poller = stopSiteFailoverTest(
        context,
        resourceGroupName,
        expressRouteGatewayName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStopSiteFailoverTestAndWait: async (
      resourceGroupName: string,
      expressRouteGatewayName: string,
      body: {
        stopParameters: ExpressRouteFailoverStopApiParameters;
      },
      options?: ExpressRouteGatewaysStopSiteFailoverTestOptionalParams,
    ) => {
      return await stopSiteFailoverTest(
        context,
        resourceGroupName,
        expressRouteGatewayName,
        body,
        options,
      );
    },
    startSiteFailoverTest: (
      resourceGroupName: string,
      expressRouteGatewayName: string,
      peeringLocation: string,
      options?: ExpressRouteGatewaysStartSiteFailoverTestOptionalParams,
    ) =>
      startSiteFailoverTest(
        context,
        resourceGroupName,
        expressRouteGatewayName,
        peeringLocation,
        options,
      ),
    beginStartSiteFailoverTest: async (
      resourceGroupName: string,
      expressRouteGatewayName: string,
      peeringLocation: string,
      options?: ExpressRouteGatewaysStartSiteFailoverTestOptionalParams,
    ) => {
      const poller = startSiteFailoverTest(
        context,
        resourceGroupName,
        expressRouteGatewayName,
        peeringLocation,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStartSiteFailoverTestAndWait: async (
      resourceGroupName: string,
      expressRouteGatewayName: string,
      peeringLocation: string,
      options?: ExpressRouteGatewaysStartSiteFailoverTestOptionalParams,
    ) => {
      return await startSiteFailoverTest(
        context,
        resourceGroupName,
        expressRouteGatewayName,
        peeringLocation,
        options,
      );
    },
    getFailoverSingleTestDetails: (
      resourceGroupName: string,
      expressRouteGatewayName: string,
      peeringLocation: string,
      failoverTestId: string,
      options?: ExpressRouteGatewaysGetFailoverSingleTestDetailsOptionalParams,
    ) =>
      getFailoverSingleTestDetails(
        context,
        resourceGroupName,
        expressRouteGatewayName,
        peeringLocation,
        failoverTestId,
        options,
      ),
    beginGetFailoverSingleTestDetails: async (
      resourceGroupName: string,
      expressRouteGatewayName: string,
      peeringLocation: string,
      failoverTestId: string,
      options?: ExpressRouteGatewaysGetFailoverSingleTestDetailsOptionalParams,
    ) => {
      const poller = getFailoverSingleTestDetails(
        context,
        resourceGroupName,
        expressRouteGatewayName,
        peeringLocation,
        failoverTestId,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGetFailoverSingleTestDetailsAndWait: async (
      resourceGroupName: string,
      expressRouteGatewayName: string,
      peeringLocation: string,
      failoverTestId: string,
      options?: ExpressRouteGatewaysGetFailoverSingleTestDetailsOptionalParams,
    ) => {
      return await getFailoverSingleTestDetails(
        context,
        resourceGroupName,
        expressRouteGatewayName,
        peeringLocation,
        failoverTestId,
        options,
      );
    },
    getFailoverAllTestsDetails: (
      resourceGroupName: string,
      expressRouteGatewayName: string,
      options?: ExpressRouteGatewaysGetFailoverAllTestsDetailsOptionalParams,
    ) => getFailoverAllTestsDetails(context, resourceGroupName, expressRouteGatewayName, options),
    beginGetFailoverAllTestsDetails: async (
      resourceGroupName: string,
      expressRouteGatewayName: string,
      options?: ExpressRouteGatewaysGetFailoverAllTestsDetailsOptionalParams,
    ) => {
      const poller = getFailoverAllTestsDetails(
        context,
        resourceGroupName,
        expressRouteGatewayName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGetFailoverAllTestsDetailsAndWait: async (
      resourceGroupName: string,
      expressRouteGatewayName: string,
      options?: ExpressRouteGatewaysGetFailoverAllTestsDetailsOptionalParams,
    ) => {
      return await getFailoverAllTestsDetails(
        context,
        resourceGroupName,
        expressRouteGatewayName,
        options,
      );
    },
    listBySubscription: (options?: ExpressRouteGatewaysListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ExpressRouteGatewaysListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      expressRouteGatewayName: string,
      options?: ExpressRouteGatewaysDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, expressRouteGatewayName, options),
    beginDelete: async (
      resourceGroupName: string,
      expressRouteGatewayName: string,
      options?: ExpressRouteGatewaysDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, expressRouteGatewayName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      expressRouteGatewayName: string,
      options?: ExpressRouteGatewaysDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, expressRouteGatewayName, options);
    },
    updateTags: (
      resourceGroupName: string,
      expressRouteGatewayName: string,
      expressRouteGatewayParameters: TagsObject,
      options?: ExpressRouteGatewaysUpdateTagsOptionalParams,
    ) =>
      updateTags(
        context,
        resourceGroupName,
        expressRouteGatewayName,
        expressRouteGatewayParameters,
        options,
      ),
    beginUpdateTags: async (
      resourceGroupName: string,
      expressRouteGatewayName: string,
      expressRouteGatewayParameters: TagsObject,
      options?: ExpressRouteGatewaysUpdateTagsOptionalParams,
    ) => {
      const poller = updateTags(
        context,
        resourceGroupName,
        expressRouteGatewayName,
        expressRouteGatewayParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateTagsAndWait: async (
      resourceGroupName: string,
      expressRouteGatewayName: string,
      expressRouteGatewayParameters: TagsObject,
      options?: ExpressRouteGatewaysUpdateTagsOptionalParams,
    ) => {
      return await updateTags(
        context,
        resourceGroupName,
        expressRouteGatewayName,
        expressRouteGatewayParameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      expressRouteGatewayName: string,
      putExpressRouteGatewayParameters: ExpressRouteGateway,
      options?: ExpressRouteGatewaysCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        expressRouteGatewayName,
        putExpressRouteGatewayParameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      expressRouteGatewayName: string,
      putExpressRouteGatewayParameters: ExpressRouteGateway,
      options?: ExpressRouteGatewaysCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        expressRouteGatewayName,
        putExpressRouteGatewayParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      expressRouteGatewayName: string,
      putExpressRouteGatewayParameters: ExpressRouteGateway,
      options?: ExpressRouteGatewaysCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        expressRouteGatewayName,
        putExpressRouteGatewayParameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      expressRouteGatewayName: string,
      options?: ExpressRouteGatewaysGetOptionalParams,
    ) => get(context, resourceGroupName, expressRouteGatewayName, options),
  };
}

export function _getExpressRouteGatewaysOperations(
  context: NetworkManagementContext,
): ExpressRouteGatewaysOperations {
  return {
    ..._getExpressRouteGateways(context),
  };
}
