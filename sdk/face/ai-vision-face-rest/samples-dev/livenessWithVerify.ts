import { randomUUID } from 'crypto';

import { AzureKeyCredential } from '@azure/core-auth';

import createFaceClient, {
    CreateLivenessWithVerifySession200Response,
    DeleteLivenessWithVerifySession200Response,
    GetLivenessWithVerifySessionAuditEntries200Response,
    GetLivenessWithVerifySessionResult200Response,
} from '@azure-rest/ai-vision-face';

/**
 * This sample demonstrates how to create a liveness detection session.
 *
 * @summary creates a liveness detection session
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

async function main() {
    const endpoint = process.env['FACE_ENDPOINT'] || '<endpoint>';
    const apikey = process.env['FACE_APIKEY'] || '<apikey>';
    const credential = new AzureKeyCredential(apikey);
    const client = createFaceClient(endpoint, credential);

    // Create session.
    const createLivenessSessionResponse = await client.path('/detectLivenessWithVerify/singleModal/sessions').post({
        body: {
            livenessOperationMode: 'Passive',
            deviceCorrelationId: randomUUID(),
            sendResultsToClient: false,
            authTokenTimeToLiveInSeconds: 60,
        },
    }) as CreateLivenessWithVerifySession200Response;
    console.log('Create liveness session:');
    console.log(JSON.stringify(createLivenessSessionResponse.body, null, 2));

    const { sessionId } = createLivenessSessionResponse.body;

    // Get session results.
    const getLivenessSessionResultResponse1 = await client.path('/detectLivenessWithVerify/singleModal/sessions/{sessionId}', sessionId).get() as GetLivenessWithVerifySessionResult200Response;
    console.log('Get liveness detection results:');
    console.log(JSON.stringify(getLivenessSessionResultResponse1.body, null, 2));

    console.log();
    console.log('Please refer to https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/tutorials/liveness to download client SDK to run session starts and detcet liveness call.');
    console.log('Press any key to continue when you complete these steps to run sample to get session results.');
    await pressAnyKeyToContinue();
    console.log();

    // Get session results.
    const getLivenessSessionResultResponse2 = await client.path('/detectLivenessWithVerify/singleModal/sessions/{sessionId}', sessionId).get() as GetLivenessWithVerifySessionResult200Response;
    console.log('Get liveness detection results:');
    console.log(JSON.stringify(getLivenessSessionResultResponse2.body, null, 2));

    // Get audit entries.
    const getAuditEntryResponse = await client.path('/detectLivenessWithVerify/singleModal/sessions/{sessionId}/audit', sessionId).get() as GetLivenessWithVerifySessionAuditEntries200Response;
    console.log('Get audit entries:');
    console.log(JSON.stringify(getAuditEntryResponse.body, null, 2));

    // Delete session.
    const deleteLivenessSessionResponse = await client.path('/detectLivenessWithVerify/singleModal/sessions/{sessionId}', sessionId).delete() as DeleteLivenessWithVerifySession200Response;
    console.log('Delete liveness session:');
    console.log(JSON.stringify(deleteLivenessSessionResponse.body, null, 2));
}

main().catch(console.error);
