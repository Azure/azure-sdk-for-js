// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AnalyzeFromImageData200Response, ImageAnalysisResultOutput } from "../src";

describe("snippets", function () {
    it("Configure_Client", function () {
        import createImageAnalysisClient from "@azure-rest/ai-vision-image-analysis";
        import { AzureKeyCredential } from "@azure/identity";

        const endpoint = "<your_endpoint>";
        const key = "<your_key>";
        const credential = new AzureKeyCredential(key);

        const client = createImageAnalysisClient(endpoint, credential);
    });

    it("ImageAnalysisEntraIDAuth", function () {
        import createImageAnalysisClient from "@azure-rest/ai-vision-image-analysis"
        import { DefaultAzureCredential } from "@azure/identity"

        const endpoint = "<your_endpoint>";
        const credential = new DefaultAzureCredential();

        const client = createImageAnalysisClient(endpoint, credential);
    });

    import createImageAnalysisClient from "@azure-rest/ai-vision-image-analysis"
    import { DefaultAzureCredential } from "@azure/identity"
    const endpoint = "<your_endpoint>";
    const credential = new DefaultAzureCredential();

    const client = createImageAnalysisClient(endpoint, credential);

    it("ImageAnalysisFromUrl", function () {
        const imageUrl = "https://example.com/image.jpg";
        const features = ["Caption", "DenseCaptions", "Objects", "People", "Read", "SmartCrops", "Tags"];

        async function analyzeImageFromUrl() {
            const result = await client.path("/imageanalysis:analyze").post({
                body: {
                    url: imageUrl,
                },
                queryParameters: {
                    features: features,
                    "smartCrops-aspect-ratios": [0.9, 1.33],
                },
                contentType: "application/json",
            });

            console.log("Image analysis result:", result.body);
        }

        analyzeImageFromUrl();
    });

    it("ImageAnalysisFromLocalFile", function () {
        import * as fs from "fs"

        const imagePath = "./path/to/your/image.jpg";
        const features = ["Caption", "DenseCaptions", "Objects", "People", "Read", "SmartCrops", "Tags"];

        async function analyzeImageFromFile() {
            const imageBuffer = fs.readFileSync(imagePath);

            const result = await client.path("/imageanalysis:analyze").post({
                body: imageBuffer,
                queryParameters: {
                    features: features,
                    "smartCrops-aspect-ratios": [0.9, 1.33],
                },
                contentType: "application/octet-stream",
            });

            console.log("Image analysis result:", result.body);
        }
        analyzeImageFromFile();
    });

    it("readmeText", function () {
        const features: string[] = [
            'Read'
        ];

        const imageUrl: string = 'https://aka.ms/azsdk/image-analysis/sample.jpg';

        client.path('/imageanalysis:analyze').post({
            body: { url: imageUrl },
            queryParameters: { features: features },
            contentType: 'application/json'
        }).then( (result: AnalyzeFromImageData200Response) => {
            const iaResult: ImageAnalysisResultOutput = result.body as ImageAnalysisResultOutput;

            // Process the response
            if (iaResult.readResult && iaResult.readResult.blocks.length > 0) {
                iaResult.readResult.blocks.forEach(block => {
                    console.log(`Detected text block: ${JSON.stringify(block)}`);
                });
            } else {
                console.log('No text blocks detected.');
            }

            return;
        }).catch( (error) => {
            console.error('Error:', error);
        });
    });

    it("logging", function () {
        import { setLogLevel } from "@azure/logger"

        setLogLevel("info");
    });
});
