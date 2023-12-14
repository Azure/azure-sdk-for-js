// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ListResponseOf } from "../../models/models.js";
import { Assistant, AssistantFile } from "../../../generated/src/models/models.js";
import {
  _listAssistantsSend,
  _listAssistantFilesSend,
} from "../../../generated/src/api/assistants/index.js";
import {
  AssistantsContext as Client,
  ListAssistantFiles200Response,
  ListAssistants200Response,
} from "../../../generated/src/rest/index.js";
import {
  AssistantsListAssistantsOptions,
  AssistantsListAssistantFilesOptions,
} from "../../../generated/src/models/options.js";

export async function _listAssistantsDeserialize(
  result: ListAssistants200Response
): Promise<ListResponseOf<Assistant>> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    data: result.body["data"].map((p) => ({
      id: p["id"],
      createdAt: new Date(p["created_at"]),
      name: p["name"],
      description: p["description"],
      model: p["model"],
      instructions: p["instructions"],
      tools: (p["tools"] ?? []).map((p) => ({
        type: p["type"],
        function: p["function"] || undefined,
      })),
      fileIds: p["file_ids"],
      metadata: p["metadata"],
    })),
    firstId: result.body["first_id"],
    lastId: result.body["last_id"],
    hasMore: result.body["has_more"],
  };
}

/** Returns a list of assistants. */
export async function listAssistants(
  context: Client,
  options: AssistantsListAssistantsOptions = { requestOptions: {} }
): Promise<ListResponseOf<Assistant>> {
  const result = await _listAssistantsSend(context, options);
  return _listAssistantsDeserialize(result);
}

export async function _listAssistantFilesDeserialize(
  result: ListAssistantFiles200Response
): Promise<ListResponseOf<AssistantFile>> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    data: result.body["data"].map((p) => ({
      id: p["id"],
      createdAt: new Date(p["created_at"]),
      assistantId: p["assistant_id"],
    })),
    firstId: result.body["first_id"],
    lastId: result.body["last_id"],
    hasMore: result.body["has_more"],
  };
}

/** Returns a list of assistant files. */
export async function listAssistantFiles(
  context: Client,
  assistantId: string,
  options: AssistantsListAssistantFilesOptions = { requestOptions: {} }
): Promise<ListResponseOf<AssistantFile>> {
  const result = await _listAssistantFilesSend(context, assistantId, options);
  return _listAssistantFilesDeserialize(result);
}
