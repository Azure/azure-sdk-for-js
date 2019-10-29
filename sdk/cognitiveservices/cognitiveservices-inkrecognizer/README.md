# Azure InkRecognizer library for JavaScript

The Ink Recognizer Cognitive Service provides a cloud-based REST API to analyze and recognize digital ink content. Unlike services that use Optical Character Recognition (OCR), the API requires digital ink stroke data as input. Digital ink strokes are time-ordered series of 2D points (X,Y coordinates) that represent the motion of input tools such as digital pens or fingers. It then recognizes the shapes and handwritten content from the input and returns a JSON response containing all recognized entities.

With the Ink Recognizer SDK, you can easily connect to the Azure Ink Recognizer service and recognize handwritten content in your applications. Here are the features you can utilize:

- Handwriting recognition
- Layout recognition
- Shape recognition
- Combined shapes and text recognition

This SDK will:

- Take your ink stroke data and format it into valid JSON.
- Send a request to the Ink Recognizer API with your data.
- Process the API response by parsing the returned JSON message.

[API reference documentation][ref_inkrecognizer_sdk] | [Product documentation][inkrecognizer_docs]

## Getting started

### Install the package

The preferred way to install the Azure InkRecognizer library for Javascript is to use the npm package manager.

Simply type the following into a terminal window:

```bash
npm install @azure/cognitiveservices-inkrecognizer
```

### Prerequisites

You must have a [Cognitive Services API account][cog_serv_acc]. If you don't have an Azure subscription, you can [create an account][create_acc] for free. You can get your subscription key from the [Azure portal][az_portal] after creating your account, or [Azure website][az_web] after activating a free trial.

### Key concepts

#### InkStroke and InkPoint

The InkStroke interface represents an ink stroke (a collection of ink points from the time a user places the writing instrument on the writing surface until the the instrument is lifted. You will be expected to implement this interface so that the InkRecognizer Client object can use it to translate the ink to JSON for delivery to the Ink Recognizer service.

```TypeScript
interface InkStroke {
    id: number;
    kind?: InkStrokeKind;
    points: InkPoint[];
    language?: string;
}
```

The InkPoint interface represents a single position on the path of an ink stroke. You are expected to implement this interface as well.

```TypeScript
interface InkPoint {
    x: number;
    y: number;
}
```

The StrokeKind enum represents the class a stroke belongs to. You are expected to set this value when it is known with absolute certainty. The default value is "Unknown". If all strokes are of certain kind, instead of specifying in each stroke, you can specify the applicationType.

```TypeScript
enum InkStrokeKind {
    InkDrawing = "inkDrawing",
    InkWriting = "inkWriting",
    Unknown = "unknown",
}
```

#### ApplicationType

InkRecognizer can recognize ink strokes that are a mix of writing and drawing. However, if application is certain about user input, it can specify the applicationType. E.g., a form filling app expects all user input to be writing.

```TypeScript
enum ApplicationKind {
    Drawing = "drawing",
    Writing = "writing",
    Mixed = "mixed",
}
```

### Examples

#### Create client

You will need to then create an InkRecognizerClient object as follows:

```TypeScript
const serverBase = "https://api.cognitive.microsoft.com";
const apiKey = "[Fill your API key]";
const creds = new corehttp.ApiKeyCredentials({ inHeader: { "'Ocp-Apim-Subscription-Key'": apiKey } });
const inkRecognizerClient = new InkRecognizerClient(serverBase, creds);
```

#### Send request

You can then send the strokes for processing to the service through the client

```TypeScript
const result:InkrecognitionResult = await inkRecognizerClient.recognizeInk(strokes);
```

#### Use the response

You can call methods on the InkRecognitionResult. For example, you can search for specific recognized words in the recognized text as follows:

```TypeScript
const targetWord = 'home';
let occurrence = 0;

for (const word of result.inkWords) {
    if (targetWord === word.text) {
        ++ occurrence;
    }
}
console.log(occurrence.toString() + "word found.");
});
```

<!-- LINKS -->
[az_portal]: https://docs.microsoft.com/en-us/azure/cognitive-services/cognitive-services-apis-create-account#get-the-keys-for-your-resource
[az_web]: https://azure.microsoft.com/try/cognitive-services/my-apis
[cog_serv_acc]: https://docs.microsoft.com/en-us/azure/cognitive-services/cognitive-services-apis-create-account
[create_acc]: https://azure.microsoft.com/try/cognitive-services/
[inkrecognizer_docs]: https://docs.microsoft.com/en-us/azure/cognitive-services/ink-recognizer/
[ref_inkrecognizer_sdk]: https://docs.microsoft.com/en-us/rest/api/cognitiveservices/inkrecognizer/inkrecognizer


![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcognitiveservices%2Fcognitiveservices-inkrecognizer%2FREADME.png)
