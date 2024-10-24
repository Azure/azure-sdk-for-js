// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AnalyzeFromImageData200Response, ImageAnalysisResultOutput } from "../src";

describe("snippets", function () {
    it("Configure_Client", function () {
        const { ImageAnalysisClient } = require("@azure-rest/ai-vision-image-analysis");
        const { AzureKeyCredential } = require('@azure/core-auth');

        const endpoint = "<your_endpoint>";
        const key = "<your_key>";
        const credential = new AzureKeyCredential(key);

        // @ts-ignore
        let client = new ImageAnalysisClient(endpoint, credential);
    });

    it("ImageAnalysisEntraIDAuth", function () {
        const { ImageAnalysisClient } = require("@azure-rest/ai-vision-image-analysis");
        const { DefaultAzureCredential } = require('@azure/core-auth');

        const endpoint = "<your_endpoint>";
        const credential = new DefaultAzureCredential();

        // @ts-ignore
        const client = new ImageAnalysisClient(endpoint, credential);
    });

    const { ImageAnalysisClient } = require("@azure-rest/ai-vision-image-analysis");
    const { DefaultAzureCredential } = require('@azure/core-auth');
    const endpoint = "<your_endpoint>";
    const credential = new DefaultAzureCredential();

    // @ts-ignore
    const client = new ImageAnalysisClient(endpoint, credential);

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
        const fs = require("fs");

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
        });
    });

    it("logging", function () {
        const { setLogLevel } = require("@azure/logger");

        setLogLevel("info");
    });
});