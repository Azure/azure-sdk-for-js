// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getIdentifierKind } from "@azure/communication-common";
import { RoomModel } from "@azure/communication-rooms";

export const printRoom = (room: RoomModel): void => {
  console.log(`Room ID: ${room.id}`);
  console.log(`Valid From: ${room.validFrom}`);
  console.log(`Valid Until: ${room.validUntil}`);
  console.log(`Room Join Policy: ${room.roomJoinPolicy}`);
  console.log(`Participants:`);
  for (const participant of room.participants) {
    const identifierKind = getIdentifierKind(participant.id);
    let id;
    const role = participant.role;
    switch (identifierKind.kind) {
      case "communicationUser":
        id = identifierKind.communicationUserId;
        break;
      case "microsoftTeamsUser":
        id = identifierKind.microsoftTeamsUserId;
        break;
      case "phoneNumber":
        id = identifierKind.phoneNumber;
        break;
      case "unknown":
        id = identifierKind.id;
        console.log("Unknown user");
        break;
    }
    console.log(`${id} - ${role}`);
  }
}
