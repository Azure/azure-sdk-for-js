# Form Recognizer client library overview

The Form Recognizer client library (`@azure/ai-form-recognizer`) provides three clients to interacts with the service:

- `LayoutRecognizerClient` providing methods to analyze and extract text and table structures from documents.
- `CustomFormRecognizerClient` providing methods to train custom models, managed trained models, and analyze documents using the trained model.
- `ReceiptRecognizerClient` providing methods to extract data from receipts using optical character recognition (ORC) and pre-built receipt model.


## Layout Recognizer Client

```ts
export class LayoutRecognizerClient {
    constructor(endpointUrl: string, credential: TokenCredential | CognitiveKeyCredential, options?: FormRecognizerClientOptions);
    readonly endpointUrl: string;
    extractLayout(body: HttpRequestBody, contentType: SupportedContentType, options: StartAnalyzeLayoutOptions): Promise<LayoutPollerLike>;
    extractLayoutFromUrl(imageSourceUrl: string, options: StartAnalyzeLayoutOptions): Promise<LayoutPollerLike>;
}
```

### Layout Models

Patching the original response from service:

- Re-define the type of `elements` from `string[]` to `TextElement[]`.
- Re-define the type of `tables`.

```ts
export type AnalyzeLayoutResultResponse = AnalyzeLayoutOperationResult & {
  _response: coreHttp.HttpResponse & {
    bodyAsText: string;
    parsedBody: AnalyzeOperationResultModel;
  }
}

export interface AnalyzeLayoutOperationResult {
  status: OperationStatus; // 'notStarted' | 'running' | 'succeeded' | 'failed';
  createdDateTime: Date;
  lastUpdatedDateTime: Date;
  analyzeResult?: AnalyzeLayoutResult;
}

export interface AnalyzeLayoutResult {
  version: string;
  readResults: ReadResult[];
  pageResults?: LayoutPageResult[];
}

export interface LayoutPageResult {
    page: number; // pageNumber
    keyValuePairs?: KeyValuePair[];
    tables?: DataTable[];
};

export type TextElement = (TextWord | TextLine) & { pageNumber: number };

export interface TextLine {
    boundingBox: number[];
    language?: Language; // "en" | "es"
    text: string;
    words: TextWord[];
}

export interface TextWord {
    boundingBox: number[];
    confidence?: number;
    text: string;
}

export interface KeyValueElement {
    boundingBox?: number[];
    elements?: TextElement[];
    text: string;
}

export interface KeyValuePair {
    confidence: number;
    key: KeyValueElement;
    label?: string;
    value: KeyValueElement;
}

export interface DataTable {
    rowNumber: number;
    colNumber: number;
    rows: DataTableRow[];
}

export interface DataTableRow {
    cells: DataTableCell[];
}

export interface DataTableCell {
    boundingBox: number[];
    columnIndex: number;
    columnSpan?: number;
    confidence: number;
    elements?: TextElement[];
    isFooter?: boolean;
    isHeader?: boolean;
    rowIndex: number;
    rowSpan?: number;
    text: string;
}
```

### Layout Sample

```js
  const { LayoutRecognizerClient, CognitiveKeyCredential } = require("@azure/ai-form-recognizer");

  const client = new LayoutRecognizerClient(endpoint, new CognitiveKeyCredential(apiKey));

  const readStream = fs.createReadStream(path);
  const poller = await client.extractLayout(readStream, "image/jpeg");
  await poller.pollUntilDone();
  const response = poller.getResult();

  if (!response) {
    throw new Error("Expecting valid response!");

  }

  console.log(response.status);
  console.log(response.analyzeResult.readResults);
  console.log(response.analyzeResult.pageResults);
```

## Receipt Recognizer Client

```ts
export class ReceiptRecognizerClient {
    constructor(endpointUrl: string, credential: TokenCredential | CognitiveKeyCredential, options?: FormRecognizerClientOptions);
    readonly endpointUrl: string;
    extractReceipt(body: HttpRequestBody, contentType: SupportedContentType, options: StartAnalyzeReceiptOptions): Promise<ReceiptPollerLike>;
    extractReceiptFromUrl(imageSourceUrl: string, options: StartAnalyzeReceiptOptions): Promise<ReceiptPollerLike>;
    }
```

### Receipt ModelsModel

```ts
export interface CommonFieldValue {
  text?: string;
  boundingBox: number[];
  confidence: number;
  elements?: TextElement[];
  page: number;
}

export type StringFieldValue = {
  type: "string";
  valueString: string;
} & CommonFieldValue;

export type DateFieldValue = {
  type: "date";
  valueDate: string;
} & CommonFieldValue;

export type TimeFieldValue = {
  type: "time";
  valueTime: string;
} & CommonFieldValue;

export type PhoneNumberFieldValue = {
  type: "phoneNumber";
  valuePhoneNumber: string;
} & CommonFieldValue;

export type NumberFieldValue = {
  type: "number";
  valueNumber: number;
} & CommonFieldValue;

export type IntegerFieldValue = {
  type: "integer";
  valueInteger: number;
} & CommonFieldValue;

export type ArrayFieldValue = {
  type: "array";
  valueArray: FieldValue[];
} & CommonFieldValue;

export type ObjectFieldValue = {
  type: "object";
  valueObject: { [propertyName: string]: FieldValue };
} & CommonFieldValue;

export type FieldValue =
  | StringFieldValue
  | DateFieldValue
  | TimeFieldValue
  | PhoneNumberFieldValue
  | NumberFieldValue
  | IntegerFieldValue
  | ArrayFieldValue
  | ObjectFieldValue;

export type ReceiptItemField = {
  type: "object";
  valueObject: {
    Name: StringFieldValue;
    Quantity: NumberFieldValue;
    Price: NumberFieldValue;
    TotalPrice: NumberFieldValue;
  }
} & CommonFieldValue

export interface ReceiptItem {
  name?: string;
  price?: number;
  quantity?: number;
  totalPrice?: number;
}

export interface ReceiptItemArrayField {
  type: "array";
  valueArray: ReceiptItemField[];
}

export interface RawReceipt {
  ReceiptType: StringFieldValue;
  MerchantName: StringFieldValue;
  MerchantPhoneNumber: PhoneNumberFieldValue;
  MerchantAddress: StringFieldValue;
  Items: ReceiptItemArrayField;
  Subtotal: NumberFieldValue;
  Tax: NumberFieldValue;
  Tip: NumberFieldValue;
  Total: NumberFieldValue;
  TransactionDate: DateFieldValue;
  TransactionTime: TimeFieldValue;
}

export interface Receipt {
  receiptType: string;
  merchantName: string;
  merchantPhoneNumber: string;
  merchantAddress: string;
  items: ReceiptItem[];
  subtotal: number;
  tax: number;
  tip: number;
  total: number;
  transactionDate: string;
  transactionTime: string;
}

export interface RawReceiptResult {
  docType: "prebuilt:receipt";
  pageRange: number[];
  fields: { [propertyName: string]: FieldValue };
}

export type ReceiptResult = RawReceiptResult & Receipt

export interface AnalyzeReceiptResult {
  version: string;
  readResults: ReadResult[];
  receiptResults?: ReceiptResult[];
}

export interface AnalyzeReceiptOperationResult {
  status: OperationStatus; // 'notStarted' | 'running' | 'succeeded' | 'failed';
  createdDateTime: Date;
  lastUpdatedDateTime: Date;
  analyzeResult?: AnalyzeReceiptResult;
}
export type AnalyzeReceiptResultResponse = AnalyzeReceiptOperationResult & {
  _response: coreHttp.HttpResponse & {
    bodyAsText: string;
    parsedBody: AnalyzeOperationResultModel;
  }
}

```


### Receipt Sample

```js
  const readStream = fs.createReadStream(path);

  const client = new ReceiptRecognizerClient(endpoint, new CognitiveKeyCredential(apiKey));
  const poller = await client.extractReceipt(readStream, "image/jpeg");

  await poller.pollUntilDone();
  const response = poller.getResult();

  console.log(`## Response status ${response.status}`);

  console.log("## First receipt:")
  console.log(response.analyzeResult.receiptResults[0]);
  console.log("#### Items:")
  console.log(`   \t Quantity\tName\tPrice\tTotalPrice`);
  let i = 1;
  for (const item of response.analyzeResult.receiptResults[0].items) {
    console.log(`${i++})\t ${item.quantity || ""}\t${item.name}\t$${item.price || "<missing>"}\t$${item.totalPrice || "<missing>"}`);
  }
  console.log("##### Raw 'MerchantAddress' field:");
  console.log(response.analyzeResult.receiptResults[0].fields["MerchantAddress"])
```

## Form Recognizer Client

```ts
export class CustomFormRecognizerClient {
export class CustomFormRecognizerClient {
    constructor(endpointUrl: string, credential: TokenCredential | CognitiveKeyCredential, options?: FormRecognizerClientOptions);
    deleteModel(modelId: string, options?: DeleteModelOptions): Promise<RestResponse>;
    readonly endpointUrl: string;
    extractCustomForm(modelId: string, body: HttpRequestBody, contentType: SupportedContentType, options: StartAnalyzeFormOptions): Promise<FormPollerLike>;
    extractCustomFormFromUrl(modelId: string, imageSourceUrl: string, options: StartAnalyzeFormOptions): Promise<PollerLike<PollOperationState<GetAnalyzeFormResultResponse>, GetAnalyzeFormResultResponse>>;
    extractLabeledForm(modelId: string, body: HttpRequestBody, contentType: SupportedContentType, options: StartAnalyzeLabeledFormOptions): Promise<LabeledFormPollerLike>;
    getLabeledModel(modelId: string, options: GetLabeledModelOptions): Promise<LabeledFormModelResponse>;
    getModel(modelId: string, options?: GetModelOptions): Promise<CustomFormModelResponse>;
    getSummary(options?: GetSummaryOptions): Promise<GetCustomModelsResponse>;
    listModels(options?: ListModelsOptions): PagedAsyncIterableIterator<ModelInfo, GetCustomModelsResponse>;
    startTraining(source: string, options?: StartTrainingOptions<CustomFormModelResponse>): Promise<PollerLike<PollOperationState<CustomFormModelResponse>, CustomFormModelResponse>>;
    startTrainingWithLabel(source: string, options?: StartTrainingOptions<LabeledFormModelResponse>): Promise<PollerLike<PollOperationState<LabeledFormModelResponse>, LabeledFormModelResponse>>;
}
```

### Form Models

- Trained Models

```typescript
export interface TrainResult {
  trainingDocuments: TrainingDocumentInfo[];
  fields: FormFieldsReport[];
  averageModelAccuracy: number;
  errors?: ErrorInformation[];
}

export interface CustomFormModelTrainResult {
  trainingDocuments: TrainingDocumentInfo[];
  errors?: ErrorInformation[];
}

export interface CustomFormModel {
  modelInfo: ModelInfo;
  keys?: KeysResult;
  trainResult?: CustomFormModelTrainResult;
}

export interface LabeledFormModel{
  modelInfo: ModelInfo;
  trainResult?: TrainResult;
};

export type CustomFormModelResponse = CustomFormModel & {
  _response: coreHttp.HttpResponse & {
      bodyAsText: string;
      parsedBody: Model;
    };
};

export type LabeledFormModelResponse = LabeledFormModel & {
  _response: coreHttp.HttpResponse & {
      bodyAsText: string;
      parsedBody: Model;
    };
};

```

- Analyze result

```ts
export type AnalyzeFormResultResponse = AnalyzeFormOperationResult & {
  _response: coreHttp.HttpResponse & {
    bodyAsText: string;
    parsedBody: AnalyzeOperationResultModel;
  };
}

export type AnalyzeFormOperationResult = Omit<AnalyzeOperationResultModel, 'analyzeResult'> & {
  status: OperationStatus; // 'notStarted' | 'running' | 'succeeded' | 'failed';
  createdDateTime: Date;
  lastUpdatedDateTime: Date;
  analyzeResult?: AnalyzeFormResult;
}

export interface AnalyzeFormResult {
  version: string;
  readResults: ReadResult[];
  pageResults?: PageResult[];
  documentResults?: DocumentResult[];
  errors?: ErrorInformation[];
}

export interface PageResult {
  page: number; // pageNumber
  clusterId?: number;
  keyValuePairs?: KeyValuePair[];
  tables?: DataTable[];
}

export interface ErrorInformation {
  code: string;
  message: string;
}
```

### Form Samples

- Train custom models

```js

  const client = new CustomFormRecognizerClient(endpoint, new CognitiveKeyCredential(apiKey));

  const trainingDataSource = "<url/path to blob container storing training documents>";

  const poller = await client.startTraining(trainingDataSource, {
    onProgress: (state) => { console.log("training status: "); console.log(state); }
  });

  await poller.pollUntilDone();
  const model = poller.getResult();
  console.log(model);
```

- Analyze Forms

```js
  const readStream = fs.createReadStream(path);

  const client = new CustomFormRecognizerClient(endpoint, new CognitiveKeyCredential(apiKey));
  const poller = await client.extractCustomForm(modelId, readStream, "application/pdf");
  await poller.pollUntilDone();
  const response = poller.getResult();

  if (!response) {
    throw new Error("Expecting valid response!");
  }

  console.log(response.status);
  console.log("### Page results:")

  for (const page of response.analyzeResult.pageResults || []) {
    console.log(`Page number: ${page.page}`);
    console.log(`cluster Id: ${page.clusterId}`);
    console.log("key-value pairs");
    for (const pair of page.keyValuePairs || []) {
      console.log(`\tkey: ${pair.key}, value: ${pair.value}`);
    }
    console.log("Tables");
    for (const table of page.tables || []) {
      for (const row of table.rows) {
        for (const cell of row.cells) {
          console.log(`cell (${cell.rowIndex},${cell.columnIndex}) ${cell.text}`);
        }
      }
    }
  }

  console.log(response.analyzeResult.readResults);
  console.log(response.analyzeResult.errors);
```

- List Models

```js
  const client = new CustomFormRecognizerClient(endpoint, new CognitiveKeyCredential(apiKey));

  const result = await client.listModels();
  let i = 0;
  for await (const model of result.modelList) {
    console.log(`model ${i++}:`);
    console.log(model);
  }
```

- Get Model with labels

```js
  const client = new CustomFormRecognizerClient(endpoint, new CognitiveKeyCredential(apiKey));
  const result = await client.getLabeledModel(modelId);
  console.log(result);
```

- Get Model

```js
  const client = new CustomFormRecognizerClient(endpoint, new CognitiveKeyCredential(apiKey));
  const result = await client.getModel(modelId);
  console.log(result);
```

- Delete Model

- Copy Model
