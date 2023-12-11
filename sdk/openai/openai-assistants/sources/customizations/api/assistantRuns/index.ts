import {
  AssistantRun,
  ListResponseOf,
} from "../../models/models.js";
import {
  _listRunsSend,
} from "../../../generated/src/api/assistantRuns/index.js";
import {
  AssistantsContext as Client,
  ListRuns200Response,
} from "../../../generated/src/rest/index.js";
import {
  AssistantRunsListRunsOptions,
} from "../../../generated/src/models/options.js";

export async function _listRunsDeserialize(
  result: ListRuns200Response
): Promise<ListResponseOf<AssistantRun>> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    object: result.body["object"],
    data: result.body["data"].map((p) => ({
      id: p["id"],
      threadId: p["thread_id"],
      assistantId: p["assistant_id"],
      status: p["status"],
      requiredAction: !p.required_action
        ? undefined
        : { type: p.required_action?.["type"] },
      lastError: !p.last_error
        ? undefined
        : { code: p.last_error?.["code"], message: p.last_error?.["message"] },
      model: p["model"],
      instructions: p["instructions"],
      tools: p["tools"].map((p) => ({ type: p["type"], function: p["function"] || undefined })),
      fileIds: p["file_ids"],
      metadata: p["metadata"],
      createdAt: new Date(p["created_at"]),
      expiresAt: p["expires_at"] === null ? null : new Date(p["expires_at"]),
      startedAt: p["started_at"] === null ? null : new Date(p["started_at"]),
      completedAt:
        p["completed_at"] === null ? null : new Date(p["completed_at"]),
      cancelledAt:
        p["cancelled_at"] === null ? null : new Date(p["cancelled_at"]),
      failedAt: p["failed_at"] === null ? null : new Date(p["failed_at"]),
    })),
    firstId: result.body["first_id"],
    lastId: result.body["last_id"],
    hasMore: result.body["has_more"],
  };
}

/** Returns a list of runs associated with an assistant thread. */
export async function listRuns(
  context: Client,
  threadId: string,
  options: AssistantRunsListRunsOptions = { requestOptions: {} }
): Promise<ListResponseOf<AssistantRun>> {
  const result = await _listRunsSend(context, threadId, options);
  return _listRunsDeserialize(result);
}