import { readFileSync } from 'fs';
import { AzureKeyCredential } from '@azure/core-auth';

import createFaceClient, {
    Detect200Response,
    DetectFromUrl200Response,
    FaceAttributeTypeDetection01,
    FaceAttributeTypeDetection03,
    FaceAttributeTypeRecognition04,
} from '@azure-rest/ai-vision-face';

/**
 * This sample demonstrates how to create a liveness detection session.
 *
 * @summary creates a liveness detection session
 */
async function main() {
    const endpoint = process.env['FACE_ENDPOINT'] ?? '<endpoint>';
    const apikey = process.env['FACE_APIKEY'] ?? '<apikey>';
    const credential = new AzureKeyCredential(apikey);
    const client = createFaceClient(endpoint, credential);

    // Detect from image.
    const fileName = 'samples-dev/data/detection5.jpg';
    const detectFromImageResponse = await client.path('/detect').post({
        contentType: 'application/octet-stream',
        queryParameters: {
            detectionModel: 'detection_03',
            recognitionModel: 'recognition_04',
            returnFaceLandmarks: true,
            returnRecognitionModel: true,
            faceIdTimeToLive: 120,
            returnFaceAttributes: [FaceAttributeTypeDetection03.HEAD_POSE, FaceAttributeTypeDetection03.MASK, FaceAttributeTypeRecognition04.QUALITY_FOR_RECOGNITION],
            returnFaceId: false,
        },
        body: readFileSync(fileName),
    }) as Detect200Response;
    console.log(`Detect from image: ${fileName}`);
    console.log(JSON.stringify(detectFromImageResponse.body, null, 2));

    // Detect from URL.
    const url = 'https://aka.ms/facesampleurl';
    const detectFromUrlResponse = await client.path('/detect').post({
        contentType: 'application/json',
        queryParameters: {
            detectionModel: 'detection_01',
            recognitionModel: 'recognition_04',
            returnFaceLandmarks: true,
            returnRecognitionModel: true,
            faceIdTimeToLive: 120,
            returnFaceAttributes: [FaceAttributeTypeDetection01.ACCESSORIES, FaceAttributeTypeDetection01.GLASSES, FaceAttributeTypeDetection01.EXPOSURE, FaceAttributeTypeDetection01.NOISE],
            returnFaceId: false,
        },
        body: { url },
    }) as DetectFromUrl200Response;
    console.log(`Detect from URL: ${url}`);
    console.log(JSON.stringify(detectFromUrlResponse.body, null, 2));
}

main().catch(console.error);
