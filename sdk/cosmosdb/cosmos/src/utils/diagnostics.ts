// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CosmosDiagnostics, MetadataLookUpType } from "../CosmosDiagnostics";
import {
  DiagnosticDataValue,
  DiagnosticNodeInternal,
  DiagnosticNodeType,
} from "../diagnostics/DiagnosticNodeInternal";
import { ClientContext } from "../ClientContext";
import { getCurrentTimestampInMs } from "./time";
import { v4 } from "uuid";
import { CosmosDbDiagnosticLevel } from "../diagnostics/CosmosDbDiagnosticLevel";

/**
 * @hidden
 * Utility function to create an Empty CosmosDiagnostic object.
 */
export function getEmptyCosmosDiagnostics(): CosmosDiagnostics {
  return new CosmosDiagnostics(
    {
      requestDurationInMs: 0,
      requestStartTimeUTCInMs: getCurrentTimestampInMs(),
      totalRequestPayloadLengthInBytes: 0,
      totalResponsePayloadLengthInBytes: 0,
      locationEndpointsContacted: [],
      retryDiagnostics: {
        failedAttempts: [],
      },
      metadataDiagnostics: {
        metadataLookups: [],
      },
      gatewayStatistics: [],
    },
    {
      id: v4(),
      nodeType: DiagnosticNodeType.CLIENT_REQUEST_NODE,
      children: [],
      data: {},
      startTimeUTCInMs: getCurrentTimestampInMs(),
      durationInMs: 0,
    },
  );
}

/**
 * @hidden
 */
export type ExtractPromise<T> = T extends Promise<infer U> ? U : never;

/**
 * A supporting utility wrapper function, to be used inside a diagnostic session started
 * by `withDiagnostics` function.
 * Created a Diagnostic node and add it as a child to existing diagnostic session.
 * @hidden
 */
export async function addDignosticChild<
  Callback extends (node: DiagnosticNodeInternal) => Promise<any>,
>(
  callback: Callback,
  node: DiagnosticNodeInternal,
  type: DiagnosticNodeType,
  data: Partial<DiagnosticDataValue> = {},
): Promise<ExtractPromise<ReturnType<Callback>>> {
  const childNode = node.initializeChildNode(type, CosmosDbDiagnosticLevel.debug, data);
  try {
    const response = await callback(childNode);
    childNode.updateTimestamp();
    return response;
  } catch (e: any) {
    childNode.addData({
      failure: true,
    });
    childNode.updateTimestamp();
    throw e;
  }
}

/**
 * A supporting utility wrapper function, to be used inside a diagnostic session started
 * by `withDiagnostics` function.
 * Treats requests originating in  provided `callback` as metadata calls.
 * To realize this, starts a temporary diagnostic session, after execution of callback is
 * finished. Merges this temporary diagnostic session to the original diagnostic session
 * represented by the input parameter `node`.
 * @hidden
 */
export async function withMetadataDiagnostics<
  Callback extends (node: DiagnosticNodeInternal) => Promise<any>,
>(
  callback: Callback,
  node: DiagnosticNodeInternal,
  type: MetadataLookUpType,
): Promise<ExtractPromise<ReturnType<Callback>>> {
  const diagnosticNodeForMetadataCall = new DiagnosticNodeInternal(
    node.diagnosticLevel,
    DiagnosticNodeType.METADATA_REQUEST_NODE,
    null,
  );
  try {
    const response: any = await callback(diagnosticNodeForMetadataCall);
    node.addChildNode(diagnosticNodeForMetadataCall, CosmosDbDiagnosticLevel.debug, type);
    return response;
  } catch (e) {
    node.addChildNode(diagnosticNodeForMetadataCall, CosmosDbDiagnosticLevel.debug, type);
    throw e;
  }
}

/**
 * Utility wrapper function to managed lifecycle of a Diagnostic session.
 * Meant to be used at the root of the client operation. i.e. item.read(),
 * queryIterator.fetchAll().
 *
 * This utility starts a new diagnostic session. So using it any where else
 * other than start of operation, will result is different diagnostic sessions.
 *
 * Workings :
 * 1. Takes a callback function as input.
 * 2. Creates a new instance of DiagnosticNodeInternal, which can be though as starting
 * a new diagnostic session.
 * 3. Executes the callback function.
 * 4. If execution was successful. Converts DiagnosticNodeInternal to CosmosDiagnostics
 * and injects it to the response object and returns this object.
 * 5. If execution threw an exception. Sill converts DiagnosticNodeInternal to CosmosDiagnostics
 * and injects it to the Error object, and rethrows the Error object.
 *
 * @hidden
 */
export async function withDiagnostics<
  Callback extends (node: DiagnosticNodeInternal) => Promise<any>,
>(
  callback: Callback,
  clientContext: ClientContext,
  type: DiagnosticNodeType = DiagnosticNodeType.CLIENT_REQUEST_NODE,
): Promise<ExtractPromise<ReturnType<Callback>>> {
  const diagnosticNode = new DiagnosticNodeInternal(clientContext.diagnosticLevel, type, null);
  try {
    const response: any = await callback(diagnosticNode);
    diagnosticNode.updateTimestamp();
    const diagnostics = diagnosticNode.toDiagnostic(clientContext.getClientConfig());
    if (typeof response === "object" && response !== null) {
      (response as any).diagnostics = diagnostics;
    }
    clientContext.recordDiagnostics(diagnostics);
    return response;
  } catch (e: any) {
    diagnosticNode.updateTimestamp();
    diagnosticNode.addData({
      failure: true,
    });
    const diagnostics = diagnosticNode.toDiagnostic(clientContext.getClientConfig());
    e.diagnostics = diagnostics;
    clientContext.recordDiagnostics(diagnostics);
    throw e;
  }
}
