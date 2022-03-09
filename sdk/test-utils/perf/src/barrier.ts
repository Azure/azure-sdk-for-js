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

export type BarrierMessageType = "enter" | "exit" | "complete";

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

  multicoreUtils.broadcastMessage({
    tag: "barrier",
    message: "complete",
    stage,
  });
};

export const enterStage = async (stage: Stage): Promise<void> => {
  if (multicoreUtils.isManager) {
    throw new Error("Must be worker");
  }

  await multicoreUtils.getMessage(
    (m) => m.tag === "barrier" && m.stage === stage && m.message === "enter"
  );
};

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
};
