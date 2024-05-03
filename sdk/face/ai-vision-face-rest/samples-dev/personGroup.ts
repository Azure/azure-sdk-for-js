/**
 * This sample demonstrates how to create a liveness detection session.
 *
 * @summary creates a liveness detection session
 */

import { readFileSync } from 'fs';
import { AzureKeyCredential } from '@azure/core-auth';

import createFaceClient, {
    AddLargePersonGroupPersonFace200Response,
    CreateLargePersonGroup200Response,
    CreateLargePersonGroupPerson200Response,
    DeleteLargePersonGroup200Response,
    Detect200Response,
    FaceClient,
    IdentifyFromLargePersonGroup200Response,
    IdentifyFromPersonDirectory200Response,
    TrainLargePersonGroup202Response,
    VerifyFromLargePersonGroup200Response,
    getLongRunningPoller,
} from '@azure-rest/ai-vision-face';

interface LargePersonGroupPersonData {
    name: string;
    userData: string;
}

interface LargePersonGroupPersonFaceData {
    fileName: string;
    userData: string;
}

interface IdentifyParameters {
    faceIds: string[];
    largePersonGroupId?: string;
    personIds?: string[];
}

const createLargePersonGroup = async (client: FaceClient, largePersonGroupId: string, name: string, userData: string): Promise<void> => {
    const response = await client.path('/largepersongroups/{largePersonGroupId}', largePersonGroupId).put({
        body: {
            name,
            userData,
            recognitionModel: 'recognition_04',
        },
    }) as CreateLargePersonGroup200Response;
    console.log('Create large person group:');
    console.log(JSON.stringify(response.body, null, 2));
};

const createLargePersonGroupPersonWithFaces = async (client: FaceClient, largePersonGroupId: string, person: LargePersonGroupPersonData, faces: LargePersonGroupPersonFaceData[]): Promise<string> => {
    const createLargePersonGroupPersonResponse = await client.path('/largepersongroups/{largePersonGroupId}/persons', largePersonGroupId).post({
        body: { ...person },
    }) as CreateLargePersonGroupPerson200Response;
    console.log('Create large person group person:');
    console.log(JSON.stringify(createLargePersonGroupPersonResponse.body, null, 2));

    const { personId } = createLargePersonGroupPersonResponse.body;

    for (const face of faces) {
        const addFaceResponse = await client.path('/largepersongroups/{largePersonGroupId}/persons/{personId}/persistedfaces', largePersonGroupId, personId).post({
            queryParameters: {
                userData: face.userData,
                detectionModel: 'detection_03',
            },
            contentType: 'application/octet-stream',
            body: readFileSync(`samples-dev/data/${face.fileName}`),
        }) as AddLargePersonGroupPersonFace200Response;
        console.log(`Add face: ${face.fileName}`);
        console.log(JSON.stringify(addFaceResponse.body, null, 2));
    }

    return personId;
};

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

const verify = async (client: FaceClient, faceId: string, largePersonGroupId:string, personId: string): Promise<void> => {
    const response = await client.path('/verify').post({
        body: { faceId, largePersonGroupId, personId },
    }) as VerifyFromLargePersonGroup200Response;
    console.log('Verify:');
    console.log(JSON.stringify(response.body, null, 2));
};

const identify = async (client: FaceClient, params: IdentifyParameters): Promise<void> => {
    const response = await client.path('/identify').post({
        body: { ...params } as any,
    }) as IdentifyFromLargePersonGroup200Response | IdentifyFromPersonDirectory200Response;
    console.log('Identify:');
    console.log(JSON.stringify(response.body, null, 2));
};

const train = async (client: FaceClient, largePersonGroupId: string): Promise<void> => {
    const response = await client.path('/largepersongroups/{largePersonGroupId}/train', largePersonGroupId).post() as TrainLargePersonGroup202Response;
    console.log('Train:');
    console.log(JSON.stringify(response.body, null, 2));

    const poller = await getLongRunningPoller(client, response);
    await poller.pollUntilDone();
    console.log(`Long running operation: ${poller.getOperationState().status}`);
};

const deleteLargePersonGroup = async (client: FaceClient, largePersonGroupId: string): Promise<void> => {
    const response = await client.path('/largepersongroups/{largePersonGroupId}', largePersonGroupId).delete() as DeleteLargePersonGroup200Response;
    console.log('Delete large person group:');
    console.log(JSON.stringify(response.body, null, 2));
};

const main = async () => {
    const endpoint = process.env['FACE_ENDPOINT'] ?? '<endpoint>';
    const apikey = process.env['FACE_APIKEY'] ?? '<apikey>';
    const credential = new AzureKeyCredential(apikey);
    const client = createFaceClient(endpoint, credential);

    const largePersonGroupId = 'lpg_family1';
    await createLargePersonGroup(client, largePersonGroupId, 'Family 1', 'A sweet family');

    const bill = await createLargePersonGroupPersonWithFaces(client, largePersonGroupId, { name: 'Bill', userData: 'Dad' }, [
        { fileName: 'Family1-Dad1.jpg', userData: 'Dad1' },
        { fileName: 'Family1-Dad2.jpg', userData: 'Dad2' },
    ]);
    const clare = await createLargePersonGroupPersonWithFaces(client, largePersonGroupId, { name: 'Clare', userData: 'Mom' }, [
        { fileName: 'Family1-Mom1.jpg', userData: 'Mom1' },
        { fileName: 'Family1-Mom2.jpg', userData: 'Mom2' },
    ]);
    const ron = await createLargePersonGroupPersonWithFaces(client, largePersonGroupId, { name: 'Ron', userData: 'Son' }, [
        { fileName: 'Family1-Son1.jpg', userData: 'Son1' },
        { fileName: 'Family1-Son2.jpg', userData: 'Son2' },
    ]);

    const [id_dad] = await detect(client, 'Family1-Dad3.jpg');
    await verify(client, id_dad, largePersonGroupId, bill);
    await verify(client, id_dad, largePersonGroupId, clare);
    await identify(client, { faceIds: [id_dad], largePersonGroupId }); // not trained yet

    const gill = await createLargePersonGroupPersonWithFaces(client, largePersonGroupId, { name: 'Gill', userData: 'Daughter' }, [
        { fileName: 'Family1-Daughter1.jpg', userData: 'Daughter1' },
        { fileName: 'Family1-Daughter2.jpg', userData: 'Daughter2' },
    ]);

    const [id_daugher] = await detect(client, 'Family1-Daughter3.jpg');
    await verify(client, id_daugher, largePersonGroupId, gill);
    await identify(client, { faceIds: [id_daugher], personIds: [gill] }); // should not work

    await train(client, largePersonGroupId);
    await identify(client, { faceIds: [id_daugher], largePersonGroupId });

    await deleteLargePersonGroup(client, largePersonGroupId);
};

main().catch(console.error);
