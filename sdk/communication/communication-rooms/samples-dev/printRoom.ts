// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getIdentifierKind } from "@azure/communication-common";
import { RoomModel } from "@azure/communication-rooms";

export const printRoom = (room: RoomModel): void => {
  write(`Room ID: ${room.id}`);
  write(`Valid From: ${room.validFrom}`);
  write(`Valid Until: ${room.validUntil}`);
  write(`Room Join Policy: ${room.roomJoinPolicy}`);
  write(`Participants:`);
  for (const participant of room.participants!) {
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
        write("Unknown user");
        break;
    }
    write(`${id} - ${role}`);
  }
}

function write(message: string): void {
  const fs = require("fs");
  fs.writeFileSync("./logs.txt",message,{
    flag: 'w',
  });
}
