// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { Receiver } from "../../src/receivers/receiver";

export function getDeadLetterPath(receiver: Receiver<{}>) {
  return `${receiver.entityPath}/$DeadLetterQueue`;
}
