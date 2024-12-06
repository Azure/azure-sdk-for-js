// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FunctionDefinition, FunctionToolDefinition, MessageAttachment, MessageAttachmentToolDefinition, RequiredActionOutput, RequiredToolCallOutput, ToolDefinitionOutputParent, ToolDefinitionParent, VectorStoreDataSource } from "./inputOutputs.js";

/**
 * Create MessageAttachment object that describes to which tools a file has been attached.
 *
 * @param tools - The tools to add to this file.
 * @param fileId - The ID of the file to attach to the message.
 * @param dataSources - An array of Azure asset IDs representing data sources.
 * @returns A MessageAttachment object containing the provided tools, file ID, and data sources.
 */
export function createMessageAttachment(
  tools: MessageAttachmentToolDefinition[],
  fileId?: string,
  dataSources?: Array<VectorStoreDataSource>,
) : MessageAttachment {
  return {
    file_id: fileId,
    data_sources: dataSources,
    tools: tools,
  }
}

/**
 * Determines if the given output is of the specified type.
 *
 * @template T - The type to check against, which extends one of the possible output parent types.
 * @param output - The action to check, which can be of type `RequiredActionOutput`, `RequiredToolCallOutput`, or `ToolDefinitionOutputParent`.
 * @param type - The type to check the action against.
 * @returns A boolean indicating whether the action is of the specified type.
 */
export function isOutputOfType<T extends { type: string }>(output: RequiredActionOutput | RequiredToolCallOutput | ToolDefinitionOutputParent, type: string): output is T {
    return output.type === type;
}

/**
 * Converts a function definition to a function tool definition.
 *
 * @param functionDefintion - The function definition to convert.
 * @returns The function tool definition.
 */
export function fromFunctionDefinition(functionDefintion: FunctionDefinition): FunctionToolDefinition {
    return {
        type: "function",
        function: functionDefintion
    }
}

/** Types of connection tools sued to configure an agent */
export enum connectionToolType {
  /** Bing grounding search tool */
  BingGrounding = "bing_grounding",
  /** Microsoft Fabric tool */
  MicrosoftFabric = "microsoft_fabric",
  /** Sharepoint tool */
  SharepointGrounding = "sharepoint_grounding",
}

/**
 * Creates a tool definition for a connection tool with the given connection ids.
 *
 * @param toolType - The type of the connection tool.
 * @param connectionIds - A list of the IDs of the connections to use.
 * @returns The function tool definition.
 */
export function fromConnectionId(toolType : connectionToolType, connectionIds: string[]) : ToolDefinitionParent {
  return {
    type: toolType,
    [toolType]: {
      connections: connectionIds.map(connectionId => ({connection_id: connectionId}))
    }
  }
}
