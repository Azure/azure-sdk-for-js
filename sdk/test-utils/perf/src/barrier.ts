// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Message } from "./messages";
import { multicoreUtils } from "./multicore";

export type Stage =
  | "globalSetup"
  | "setup"
  | "postSetup"
  | "warmup"
  | "test"
  | "preCleanup"
  | "cleanup"
  | "globalCleanup";

export type BarrierMessageType = "enter" | "exit" | "complete" | "acknowledgeCompletion";

export type BarrierMessage = {
  tag: "barrier";
  message: BarrierMessageType;
  stage: Stage;
};

const getBarrierMessage = async (
  message: BarrierMessageType,
  stage: Stage
): Promise<BarrierMessage> =>
  multicoreUtils.getMessage(
    (m: Message) => m.tag === "barrier" && m.message === message && m.stage === stage
  ) as Promise<BarrierMessage>;

/**
 * Called by the manager. Tell all the workers to start on the given stage and wait until they have all finished.
 */
export const performStage = async (stage: Stage) => {
  if (!multicoreUtils.isManager) {
    throw new Error("Must be manager");
  }

  // Start waiting for the completion messages. We need to do this _before_ we tell the workers to start in case one finishes
  // before we send the messages to everyone. If we don't, a message might be missed due to the race condition since we don't buffer
  // the messages.
  const allComplete = multicoreUtils.getMessageFromAll(
    (msg) => msg.tag === "barrier" && msg.stage === stage && msg.message === "exit"
  );

  // Send a message to all workers so they start working
  multicoreUtils.broadcastMessage({
    tag: "barrier",
    message: "enter",
    stage,
  });

  await allComplete;

  // Send messages to all the workers saying everyone is done. We require acknowledgements for these messages so that the
  // manager doesn't continue until all of the workers are guaranteed to have received the completion message. Again,
  // we start waiting for acknowledgements before broadcasting the completion message so that we don't miss any acks.
  const allAcked = multicoreUtils.getMessageFromAll(
    (msg) => msg.tag === "barrier" && msg.stage === stage && msg.message === "acknowledgeCompletion"
  );

  multicoreUtils.broadcastMessage({
    tag: "barrier",
    message: "complete",
    stage,
  });

  await allAcked;
};

/**
 * Called by workers. Wait for the all-clear from the manager to proceed into the given stage.
 */
export const enterStage = async (stage: Stage): Promise<void> => {
  if (multicoreUtils.isManager) {
    throw new Error("Must be worker");
  }

  await getBarrierMessage("enter", stage);
};

/**
 * Called by workers. Wait until all other workers have completed the stage.
 */
export const exitStage = async (stage: Stage): Promise<void> => {
  if (multicoreUtils.isManager) {
    throw new Error("Must be worker");
  }

  multicoreUtils.sendMessage({
    tag: "barrier",
    message: "exit",
    stage,
  });

  await getBarrierMessage("complete", stage);

  multicoreUtils.sendMessage({
    tag: "barrier",
    message: "acknowledgeCompletion",
    stage,
  });
};
