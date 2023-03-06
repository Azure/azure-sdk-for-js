// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { NodeVMExtension, NodeVMExtensionList } from "./models.js";
import { BatchServiceClient as Client, isUnexpected } from "../rest/index.js";

interface RequestOptions {
  customHeaders?: Record<string, string | number | boolean>;
}

interface RequestParametersCommon {
  requestOptions?: RequestOptions;
}

export interface ComputeNodeExtensionsgetExtensionOptions
  extends RequestParametersCommon {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  clientRequestId?: string;
  /** Whether the server should return the client-request-id in the response. */
  returnClientRequestId?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  ocpDate?: string;
  /** An OData $select clause. */
  $select?: string;
}

/** Gets information about the specified Compute Node Extension. */
export async function getExtension(
  context: Client,
  poolId: string,
  nodeId: string,
  extensionName: string,
  options: ComputeNodeExtensionsgetExtensionOptions = { requestOptions: {} }
): Promise<NodeVMExtension> {
  const result = await context
    .path(
      "/pools/{poolId}/nodes/{nodeId}/extensions/{extensionName}",
      poolId,
      nodeId,
      extensionName
    )
    .get({
      headers: {
        ...(options.clientRequestId && {
          "client-request-id": options.clientRequestId,
        }),
        ...(options.returnClientRequestId && {
          "return-client-request-id": options.returnClientRequestId,
        }),
        ...(options.ocpDate && { "ocp-date": options.ocpDate }),
        Accept: "application/json",
        ...options.requestOptions?.customHeaders,
      },
      queryParameters: {
        ...(options.timeOut && { timeOut: options.timeOut }),
        ...(options.$select && { $select: options.$select }),
      },
    });
  if (isUnexpected(result)) {
    throw result.body;
  }

  return {
    provisioningState: result.body["provisioningState"],
    vmExtension: !result.body.vmExtension
      ? undefined
      : {
          name: result.body.vmExtension?.["name"],
          publisher: result.body.vmExtension?.["publisher"],
          type: result.body.vmExtension?.["type"],
          typeHandlerVersion: result.body.vmExtension?.["typeHandlerVersion"],
          autoUpgradeMinorVersion:
            result.body.vmExtension?.["autoUpgradeMinorVersion"],
          settings: !result.body.vmExtension?.settings ? undefined : {},
          protectedSettings: !result.body.vmExtension?.protectedSettings
            ? undefined
            : {},
          provisionAfterExtensions:
            result.body.vmExtension?.["provisionAfterExtensions"],
        },
    instanceView: !result.body.instanceView
      ? undefined
      : {
          name: result.body.instanceView?.["name"],
          statuses: (result.body.instanceView?.["statuses"] ?? []).map((p) => ({
            code: p["code"],
            displayStatus: p["displayStatus"],
            level: p["level"],
            message: p["message"],
            time: p["time"],
          })),
          subStatuses: (result.body.instanceView?.["subStatuses"] ?? []).map(
            (p) => ({
              code: p["code"],
              displayStatus: p["displayStatus"],
              level: p["level"],
              message: p["message"],
              time: p["time"],
            })
          ),
        },
  };
}

interface RequestOptions {
  customHeaders?: Record<string, string | number | boolean>;
}

interface RequestParametersCommon {
  requestOptions?: RequestOptions;
}

export interface ComputeNodeExtensionslistExtensionsOptions
  extends RequestParametersCommon {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  maxresults?: number;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  ocpDate?: string;
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  clientRequestId?: string;
  /** Whether the server should return the client-request-id in the response. */
  returnClientRequestId?: boolean;
  /** An OData $select clause. */
  $select?: string;
}

/** Lists the Compute Nodes Extensions in the specified Pool. */
export async function listExtensions(
  context: Client,
  poolId: string,
  nodeId: string,
  options: ComputeNodeExtensionslistExtensionsOptions = { requestOptions: {} }
): Promise<NodeVMExtensionList> {
  const result = await context
    .path("/pools/{poolId}/nodes/{nodeId}/extensions", poolId, nodeId)
    .get({
      headers: {
        ...(options.ocpDate && { "ocp-date": options.ocpDate }),
        ...(options.clientRequestId && {
          "client-request-id": options.clientRequestId,
        }),
        ...(options.returnClientRequestId && {
          "return-client-request-id": options.returnClientRequestId,
        }),
        Accept: "application/json",
        ...options.requestOptions?.customHeaders,
      },
      queryParameters: {
        ...(options.maxresults && { maxresults: options.maxresults }),
        ...(options.timeOut && { timeOut: options.timeOut }),
        ...(options.$select && { $select: options.$select }),
      },
    });
  if (isUnexpected(result)) {
    throw result.body;
  }

  return {
    value: (result.body["value"] ?? []).map((p) => ({
      provisioningState: p["provisioningState"],
      vmExtension: !p.vmExtension
        ? undefined
        : {
            name: p.vmExtension?.["name"],
            publisher: p.vmExtension?.["publisher"],
            type: p.vmExtension?.["type"],
            typeHandlerVersion: p.vmExtension?.["typeHandlerVersion"],
            autoUpgradeMinorVersion: p.vmExtension?.["autoUpgradeMinorVersion"],
            settings: !p.vmExtension?.settings ? undefined : {},
            protectedSettings: !p.vmExtension?.protectedSettings
              ? undefined
              : {},
            provisionAfterExtensions:
              p.vmExtension?.["provisionAfterExtensions"],
          },
      instanceView: !p.instanceView
        ? undefined
        : {
            name: p.instanceView?.["name"],
            statuses: (p.instanceView?.["statuses"] ?? []).map((p) => ({
              code: p["code"],
              displayStatus: p["displayStatus"],
              level: p["level"],
              message: p["message"],
              time: p["time"],
            })),
            subStatuses: (p.instanceView?.["subStatuses"] ?? []).map((p) => ({
              code: p["code"],
              displayStatus: p["displayStatus"],
              level: p["level"],
              message: p["message"],
              time: p["time"],
            })),
          },
    })),
    nextLink: result.body["odata.nextLink"],
  };
}
