// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { VoiceAgentsTelephonyOperations } from "../classic/voiceAgents/telephony/index.js";
import type { TelephonyCallJobSchedule } from "../models/models.js";

/** Applies the service's whole-second schedule precision before generated serialization. @internal */
export function withWholeSecondCallJobSchedules(
  operations: VoiceAgentsTelephonyOperations,
): VoiceAgentsTelephonyOperations {
  return {
    ...operations,
    createCallJob: async (agentName, idempotencyKey, job, options) => {
      const schedule = job.schedule;
      if (!schedule) {
        return operations.createCallJob(agentName, idempotencyKey, job, options);
      }
      return operations.createCallJob(
        agentName,
        idempotencyKey,
        {
          ...job,
          schedule: {
            ...schedule,
            not_before: toWholeSeconds(schedule.not_before, "not_before"),
            expires_at: toWholeSeconds(schedule.expires_at, "expires_at"),
          },
        },
        options,
      );
    },
  };
}

function toWholeSeconds(
  date: Date | undefined,
  field: keyof TelephonyCallJobSchedule,
): Date | undefined {
  if (date === undefined) return undefined;
  const milliseconds = date.getTime();
  if (!Number.isFinite(milliseconds)) {
    throw new RangeError(`schedule.${field} must be a valid Date.`);
  }
  return new Date(Math.floor(milliseconds / 1000) * 1000);
}
