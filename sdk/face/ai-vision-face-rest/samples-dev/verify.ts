import { readFileSync } from 'fs';
import { AzureKeyCredential } from '@azure/core-auth';

import createFaceClient, {
    Detect200Response,
    FaceClient,
    VerifyFaceToFace200Response,
} from '@azure-rest/ai-vision-face';

const detect = async (client: FaceClient, fileName: string): Promise<string[]> => {
    const response = await client.path('/detect').post({
        contentType: 'application/octet-stream',
        queryParameters: {
            detectionModel: 'detection_03',
            recognitionModel: 'recognition_04',
            returnFaceId: true,
        },
        body: readFileSync(`samples-dev/data/${fileName}`),
    }) as Detect200Response;
    console.log(`Detect: ${fileName}`);
    console.log(JSON.stringify(response.body, null, 2));
    return response.body.map(face => face.faceId as string);
};

const verify = async (client: FaceClient, faceId1: string, faceId2: string): Promise<void> => {
    const response = await client.path('/verify').post({
        body: { faceId1, faceId2 },
    }) as VerifyFaceToFace200Response;
    console.log('Verify:');
    console.log(JSON.stringify(response.body, null, 2));
};

/**
 * This sample demonstrates how to create a liveness detection session.
 *
 * @summary creates a liveness detection session
 */

const main = async () => {
    const endpoint = process.env['FACE_ENDPOINT'] ?? '<endpoint>';
    const apikey = process.env['FACE_APIKEY'] ?? '<apikey>';
    const credential = new AzureKeyCredential(apikey);
    const client = createFaceClient(endpoint, credential);

    const [id_dad1] = await detect(client, 'Family1-Dad1.jpg');
    const [id_dad2] = await detect(client, 'Family1-Dad2.jpg');
    await verify(client, id_dad1, id_dad2);

    const [id_man] = await detect(client, 'Family3-Man1.jpg');
    await verify(client, id_dad1, id_man);
};

main().catch(console.error);
