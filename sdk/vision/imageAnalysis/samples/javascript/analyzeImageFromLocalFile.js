const fs = require("fs");

const imagePath = "./path/to/your/image.jpg";
const features = ["Caption", "DenseCaptions", "Objects", "People", "Read", "SmartCrops", "Tags"];

async function analyzeImageFromFile() {
    const imageBuffer = fs.readFileSync(imagePath);

    const result = await client.path("/imageanalysis:analyze").post({
    body: imageBuffer,
    queryParameters: {
        features: features,
        "smartCrops-aspect-ratios": [0.9, 1.33]
    },
    contentType: "application/octet-stream"
    });

    console.log("Image analysis result:", result.body);
}

analyzeImageFromFile();