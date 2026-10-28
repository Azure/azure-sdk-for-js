// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { VoiceAgentServerEvent } from "@azure/ai-projects";

const lifecycle = {
  handoff_id: "handoff-1",
  edge_id: "entry_to_billing",
  from_node_id: "$entrypoint",
  to_node_id: "billing",
  from_model: "gpt-realtime",
  to_model: "gpt-realtime",
  tool_call_id: "call-1",
  node_generation: 1,
};

export const handoffEvents = [
  { ...lifecycle, type: "session.handoff.started", event_id: "handoff-started" },
  {
    ...lifecycle,
    type: "session.handoff.completed",
    event_id: "handoff-completed",
    node_generation: 2,
    prepare_duration_ms: 0,
    duration_ms: 12,
  },
  {
    ...lifecycle,
    type: "session.handoff.aborted",
    event_id: "handoff-interrupted",
    reason: "user_interruption",
  },
  {
    ...lifecycle,
    type: "session.handoff.aborted",
    event_id: "handoff-error",
    reason: "error",
    error: {
      type: "server_error",
      code: "target_unavailable",
      message: "The handoff target could not be prepared.",
    },
  },
] satisfies VoiceAgentServerEvent[];
