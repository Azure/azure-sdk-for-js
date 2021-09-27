// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env } from "@azure/test-utils-recorder";
// import { Uuid } from "../../src/uuid"
// import { CommunicationIdentityClient } from "@azure/communication-identity";
// import { CallingServerClient, MediaType, EventSubscriptionType } from "../../src";

describe("Server Call", function() {
    // let communicationIdentityClient = new CommunicationIdentityClient(env.COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING);

    // describe("Recording Operations", function() {
    //     it("Run all client operations", async function() {
    //         var groupId = Uuid.generateUuid();
    //         var fromUser = (await communicationIdentityClient.createUser()).communicationUserId;
    //         // var toUser = (await communicationIdentityClient.createUser()).communicationUserId;
    //         var callingServer = new CallingServerClient(env.COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING);
    //         var joinCallOptions = {
    //                 callbackUri: "https://bot.contoso.io/callback",
    //                 requestedMediaTypes: [MediaType.Audio],
    //                 requestedCallEvents: [EventSubscriptionType.ParticipantsUpdated]
    //             };

    //         var fromCallConnection = await callingServer.joinCall(groupId, {id: fromUser}, joinCallOptions);
    //         await fromCallConnection.hangUp();
    //     })
    // })

    it("testing env", function() {
        console.log("Hola!!: " + JSON.stringify(env, null, 4));
    })
})