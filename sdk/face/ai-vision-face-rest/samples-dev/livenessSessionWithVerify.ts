import { randomUUID } from 'crypto';

import { AzureKeyCredential } from '@azure/core-auth';

import createFaceClient, {
    isUnexpected,
} from '@azure-rest/ai-vision-face';

/**
 * This sample demonstrates how to create a liveness detection with face verification session.
 *
 * @summary Liveness detection with face verification.
 */

const pressAnyKeyToContinue = () => new Promise<void>(resolve => {
    const { stdin } = process;
    const { isRaw } = stdin;
    stdin.setRawMode(true);
    stdin.resume();
    stdin.once('data', () => {
        stdin.pause();
        stdin.setRawMode(isRaw);
        resolve();
    });
});

const waitForLivenessRequest = async () => {
    // Wait for request from client device.
};

const sendTokenToClientDevices = async (token: string) => {
    // Send the token to client devices.
};

const waitForLivenessSessionComplete = async () => {
    console.log('Please refer to https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/tutorials/liveness and use the mobile client SDK to perform liveness detection on your mobile application.');
    console.log('Press any key to continue when you complete these steps to run sample to get session results...');
    await pressAnyKeyToContinue();
};

async function main() {
    // This sample follows the documentation: https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/tutorials/liveness
    // We will follow the steps in https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/tutorials/liveness#perform-liveness-detection-with-face-verification to demo the sample code in app server.

    const endpoint = process.env['FACE_ENDPOINT'] ?? '<endpoint>';
    const apikey = process.env['FACE_APIKEY'] ?? '<apikey>';
    const credential = new AzureKeyCredential(apikey);
    const client = createFaceClient(endpoint, credential);

    // 1. A client device will send a request to start liveness check to us.
    await waitForLivenessRequest();

    // 2.Send a request to Face API to create a liveness detection session.
    const createLivenessSessionResponse = await client.path('/detectLivenessWithVerify/singleModal/sessions').post({
        body: {
            livenessOperationMode: 'Passive',
            deviceCorrelationId: randomUUID(),
            sendResultsToClient: false,
            authTokenTimeToLiveInSeconds: 60,
        },
    });
    if (isUnexpected(createLivenessSessionResponse)) {
        throw new Error(createLivenessSessionResponse.body.error.message);
    }
    console.log('Create liveness session:');
    console.log(JSON.stringify(createLivenessSessionResponse.body, null, 2));

    const { sessionId, authToken } = createLivenessSessionResponse.body;

    // 3. Pass the AuthToken to client device.
    // Client device will process the step 4, 5, 6 in the documentation 'Orchestrate the liveness solution'
    await sendTokenToClientDevices(authToken);

    // 7. wait for client device notifyus us that liveness session completed.
    await waitForLivenessSessionComplete();

    // 8. After client devices perform the action, we can get the result from the following APIs.
    // Get session results.
    const getLivenessSessionResultResponse = await client.path('/detectLivenessWithVerify/singleModal/sessions/{sessionId}', sessionId).get();
    if (isUnexpected(getLivenessSessionResultResponse)) {
        throw new Error(getLivenessSessionResultResponse.body.error.message);
    }
    console.log('Get liveness detection results:');
    console.log(JSON.stringify(getLivenessSessionResultResponse.body, null, 2));

    // Get audit entries.
    const getAuditEntryResponse = await client.path('/detectLivenessWithVerify/singleModal/sessions/{sessionId}/audit', sessionId).get();
    if (isUnexpected(getAuditEntryResponse)) {
        throw new Error(getAuditEntryResponse.body.error.message);
    }
    console.log('Get audit entries:');
    console.log(JSON.stringify(getAuditEntryResponse.body, null, 2));

    // We can also list all liveness sessions of this face account.
    const getLivenessSessionsResponse = await client.path('/detectLivenessWithVerify/singleModal/sessions').get();
    if (isUnexpected(getLivenessSessionsResponse)) {
        throw new Error(getLivenessSessionsResponse.body.error.message);
    }
    console.log('Get liveness sessions:');
    console.log(JSON.stringify(getLivenessSessionsResponse.body, null, 2));

    // Delete session.
    const deleteLivenessSessionResponse = await client.path('/detectLivenessWithVerify/singleModal/sessions/{sessionId}', sessionId).delete();
    if (isUnexpected(deleteLivenessSessionResponse)) {
        throw new Error(deleteLivenessSessionResponse.body.error.message);
    }
    console.log('Delete liveness session:');
    console.log(JSON.stringify(deleteLivenessSessionResponse.body, null, 2));
}

main().catch(console.error);
