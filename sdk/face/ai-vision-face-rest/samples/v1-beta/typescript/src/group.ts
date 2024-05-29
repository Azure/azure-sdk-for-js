import { readFileSync } from 'fs';
import { AzureKeyCredential } from '@azure/core-auth';

import createFaceClient, {
    isUnexpected,
} from '@azure-rest/ai-vision-face';

/**
 * This sample demonstrates how to group similar faces.
 *
 * @summary Face grouping.
 */

const main = async () => {
    const endpoint = process.env['FACE_ENDPOINT'] ?? '<endpoint>';
    const apikey = process.env['FACE_APIKEY'] ?? '<apikey>';
    const credential = new AzureKeyCredential(apikey);
    const client = createFaceClient(endpoint, credential);

    // Detect faces from image.
    const filename = 'data/nine-faces.png';
    const detectResponse = await client.path('/detect').post({
        contentType: 'application/octet-stream',
        queryParameters: {
            detectionModel: 'detection_03',
            recognitionModel: 'recognition_04',
            returnFaceId: true,
        },
        body: readFileSync(filename),
    });
    if (isUnexpected(detectResponse)) {
        throw new Error(detectResponse.body.error.message);
    }
    console.log(`Detect: ${filename}`);
    console.log(JSON.stringify(detectResponse.body, null, 2));

    // Group the faces.
    const groupResponse = await client.path('/group').post({
        body: {
            faceIds: detectResponse.body.map((face) => face.faceId as string),
        }
    });
    if (isUnexpected(groupResponse)) {
        throw new Error(groupResponse.body.error.message);
    }
    console.log('Group:');
    console.log(JSON.stringify(groupResponse.body, null, 2));
};

main().catch(console.error);
