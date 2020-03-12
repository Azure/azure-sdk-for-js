# Form Recognizer client library overview

The Form Recognizer client library (`@azure/ai-form-recognizer`) provides three clients to interacts with the service:

- `LayoutRecognizerClient` providing methods to analyze and extract text and table structures from documents.
- `CustomFormRecognizerClient` providing methods to train custom models, managed trained models, and analyze documents using the trained models. The training can be supervised with user-generated labels in addition to training documents, or unsupervised by just learning from provided training documents.
- `ReceiptRecognizerClient` providing methods to extract data from receipts using the pre-built receipt model provided by the service.


## Layout Recognizer Client

```typescript
export class LayoutRecognizerClient {
    constructor(endpointUrl: string, credential: TokenCredential | CognitiveKeyCredential, options?: FormRecognizerClientOptions);
    readonly endpointUrl: string;
    extractLayout(body: FormRecognizerRequestBody, contentType: SupportedContentType, options?: StartAnalyzeLayoutOptions): Promise<LayoutPollerLike>;
    extractLayoutFromUrl(documentUrl: string, options?: StartAnalyzeLayoutOptions): Promise<LayoutPollerLike>;
}
```

### Layout Models

Patching the original response from service:

- Re-define the type of `elements` from `string[]` to `ExtractedElement[]`.
- Re-define the type of `tables`.

```typescript
export type AnalyzeLayoutResultResponse = AnalyzeLayoutOperationResult & {
  _response: coreHttp.HttpResponse & {
    bodyAsText: string;
    parsedBody: AnalyzeOperationResultModel;
  }
}

export interface AnalyzeLayoutOperationResult {
  status: OperationStatus; // 'notStarted' | 'running' | 'succeeded' | 'failed';
  createdOn: Date;
  lastUpdatedOn: Date;
  analyzeResult?: AnalyzeLayoutResult;
}

export interface AnalyzeLayoutResult {
  version: string;
  readResults: ReadResult[];
  pageResults?: LayoutPageResult[];
}

export interface LayoutPageResult {
    pageNumber: number;
    keyValuePairs?: KeyValuePair[];
    tables?: DataTable[];
};

export type ExtractedElement = (TextWord | TextLine) & { pageNumber: number };

export interface TextLine {
    boundingBox: number[];
    // language?: Language; // it's recommended to hide this
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
    elements?: ExtractedElement[];
    text: string;
}

export interface KeyValuePair {
    confidence: number;
    key: KeyValueElement;
    label?: string;
    value: KeyValueElement;
}

// DataTable follows the HTML table model for cells
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
    columnSpan?: number; // default to 1
    confidence: number;
    elements?: ExtractedElement[];
    isFooter?: boolean; // default to false
    isHeader?: boolean; // default to false
    rowIndex: number;
    rowSpan?: number; // default to 1
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

```typescript
export type AnalyzeFormResultResponse = AnalyzeFormOperationResult & {
  _response: coreHttp.HttpResponse & {
    bodyAsText: string;
    parsedBody: AnalyzeOperationResultModel;
  };
}

export type AnalyzeFormOperationResult = Omit<AnalyzeOperationResultModel, 'analyzeResult'> & {
  status: OperationStatus; // 'notStarted' | 'running' | 'succeeded' | 'failed';
  createdOn: Date;
  lastUpdatedOn: Date;
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
## Receipt Recognizer Client

```typescript
export class ReceiptRecognizerClient {
    constructor(endpointUrl: string, credential: TokenCredential | CognitiveKeyCredential, options?: FormRecognizerClientOptions);
    readonly endpointUrl: string;
    extractReceipt(body: FormRecognizerRequestBody, contentType: SupportedContentType, options?: StartAnalyzeReceiptOptions): Promise<ReceiptPollerLike>;
    extractReceiptFromUrl(documentUrl: string, options?: StartAnalyzeReceiptOptions): Promise<ReceiptPollerLike>;
}
```

### Receipt Models

```typescript
export interface CommonFieldValue {
  text?: string;
  boundingBox: number[];
  confidence: number;
  elements?: ExtractedElement[];
  pageNumber: number;
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
  createdOn: Date;
  lastUpdatedOn: Date;
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

```typescript
export class CustomFormRecognizerClient {
    constructor(endpointUrl: string, credential: TokenCredential | CognitiveKeyCredential, options?: FormRecognizerClientOptions);
    deleteModel(modelId: string, options?: DeleteModelOptions): Promise<RestResponse>;
    readonly endpointUrl: string;
    extractCustomForm(modelId: string, body: FormRecognizerRequestBody, contentType: SupportedContentType, options?: StartAnalyzeFormOptions): Promise<FormPollerLike>;
    extractCustomFormFromUrl(modelId: string, documentUrl: string, options?: StartAnalyzeFormOptions): Promise<PollerLike<PollOperationState<GetAnalyzeFormResultResponse>, GetAnalyzeFormResultResponse>>;
    extractLabeledForm(modelId: string, body: FormRecognizerRequestBody, contentType: SupportedContentType, options?: StartAnalyzeLabeledFormOptions): Promise<LabeledFormPollerLike>;
    getLabeledModel(modelId: string, options?: GetLabeledModelOptions): Promise<LabeledFormModelResponse>;
    getModel(modelId: string, options?: GetModelOptions): Promise<CustomFormModelResponse>;
    getSummary(options?: GetSummaryOptions): Promise<GetCustomModelsResponse>;
    listModels(options?: ListModelsOptions): PagedAsyncIterableIterator<ModelInfo, GetCustomModelsResponse>;
    startTraining(source: string, options?: StartTrainingOptions<CustomFormModelResponse>): Promise<PollerLike<PollOperationState<CustomFormModelResponse>, CustomFormModelResponse>>;
    startTrainingWithLabel(source: string, options?: StartTrainingOptions<LabeledFormModelResponse>): Promise<PollerLike<PollOperationState<LabeledFormModelResponse>, LabeledFormModelResponse>>;
}
```
