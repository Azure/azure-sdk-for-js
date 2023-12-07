const imageUrl = 'https://example.com/image.jpg';
const features = ['Caption', 'DenseCaptions', 'Objects', 'People', 'Read', 'SmartCrops', 'Tags'];

async function analyzeImageFromUrl() {
    const result = await client.path('/imageanalysis:analyze').post({
    body: {
        url: imageUrl
    },
    queryParameters: {
        features: features,
        'smartCrops-aspect-ratios': [0.9, 1.33]
    },
    contentType: 'application/json'
    });

    console.log('Image analysis result:', result.body);
}

analyzeImageFromUrl();