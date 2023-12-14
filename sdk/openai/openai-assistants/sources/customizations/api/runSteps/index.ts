// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ListResponseOf } from "../../models/models.js";
import { RunStep } from "../../../generated/src/models/models.js";
import { _listRunStepsSend } from "../../../generated/src/api/runSteps/index.js";
import {
  AssistantsContext as Client,
  ListRunSteps200Response,
} from "../../../generated/src/rest/index.js";
import { RunStepsListRunStepsOptions } from "../../../generated/src/models/options.js";

export async function _listRunStepsDeserialize(
  result: ListRunSteps200Response
): Promise<ListResponseOf<RunStep>> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    data: result.body["data"].map((p) => ({
      id: p["id"],
      assistantId: p["assistant_id"],
      threadId: p["thread_id"],
      runId: p["run_id"],
      status: p["status"],
      stepDetails: { type: p.step_details["type"] },
      lastError:
        p.last_error === null
          ? null
          : { code: p.last_error["code"], message: p.last_error["message"] },
      createdAt: new Date(p["created_at"]),
      expiredAt: p["expired_at"] === null ? null : new Date(p["expired_at"]),
      completedAt: p["completed_at"] === null ? null : new Date(p["completed_at"]),
      cancelledAt: p["cancelled_at"] === null ? null : new Date(p["cancelled_at"]),
      failedAt: p["failed_at"] === null ? null : new Date(p["failed_at"]),
      metadata: p["metadata"],
    })),
    firstId: result.body["first_id"],
    lastId: result.body["last_id"],
    hasMore: result.body["has_more"],
  };
}

/** Returns a list of run steps associated an assistant thread run. */
export async function listRunSteps(
  context: Client,
  threadId: string,
  runId: string,
  options: RunStepsListRunStepsOptions = { requestOptions: {} }
): Promise<ListResponseOf<RunStep>> {
  const result = await _listRunStepsSend(context, threadId, runId, options);
  return _listRunStepsDeserialize(result);
}
