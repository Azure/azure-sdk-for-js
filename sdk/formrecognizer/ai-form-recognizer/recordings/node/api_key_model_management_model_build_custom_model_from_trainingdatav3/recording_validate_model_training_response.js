let nock = require('nock');

module.exports.hash = "efe63fbb523fcf030074aa573e076058";

module.exports.testInfo = {"uniqueName":{"1":"modelName163337188938006462"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/documentModels:build', {"modelId":"modelName163337188938006462","azureBlobSource":{"containerUrl":"https://storageaccount/trainingdata?sastoken"}})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'operation-location',
  'https://endpoint/formrecognizer/operations/31532996111_385e6300-1ce1-4beb-afa9-0a38d7000c98?api-version=2021-09-30-preview',
  'x-envoy-upstream-service-time',
  '1168',
  'apim-request-id',
  '385e6300-1ce1-4beb-afa9-0a38d7000c98',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:24:49 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31532996111_385e6300-1ce1-4beb-afa9-0a38d7000c98')
  .query(true)
  .reply(200, {"operationId":"31532996111_385e6300-1ce1-4beb-afa9-0a38d7000c98","kind":"documentModelBuild","status":"notStarted","createdDateTime":"2021-10-04T18:24:49Z","lastUpdatedDateTime":"2021-10-04T18:24:49Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/modelName163337188938006462?api-version=2021-09-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'f45e4897-72a8-414f-bab7-fdf646a40a0b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:24:49 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31532996111_385e6300-1ce1-4beb-afa9-0a38d7000c98')
  .query(true)
  .reply(200, {"operationId":"31532996111_385e6300-1ce1-4beb-afa9-0a38d7000c98","kind":"documentModelBuild","status":"running","createdDateTime":"2021-10-04T18:24:49Z","lastUpdatedDateTime":"2021-10-04T18:24:50Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/modelName163337188938006462?api-version=2021-09-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '307e01fd-66be-4f1e-a18a-3e43fd300262',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:24:49 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31532996111_385e6300-1ce1-4beb-afa9-0a38d7000c98')
  .query(true)
  .reply(200, {"operationId":"31532996111_385e6300-1ce1-4beb-afa9-0a38d7000c98","kind":"documentModelBuild","status":"succeeded","createdDateTime":"2021-10-04T18:24:49Z","lastUpdatedDateTime":"2021-10-04T18:24:51Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/modelName163337188938006462?api-version=2021-09-30-preview","percentCompleted":100,"result":{"docTypes":{"modelName163337188938006462":{"fieldSchema":{"Merchant":{"type":"string"},"PhoneNumber":{"type":"string"},"Website":{"type":"string"},"Email":{"type":"string"},"PurchaseOrderNumber":{"type":"string"},"DatedAs":{"type":"string"},"VendorName":{"type":"string"},"CompanyName":{"type":"string"},"CompanyAddress":{"type":"string"},"CompanyPhoneNumber":{"type":"string"},"Subtotal":{"type":"string"},"Tax":{"type":"string"},"Total":{"type":"string"},"Signature":{"type":"string"},"Quantity":{"type":"number"}},"fieldConfidence":{"CompanyAddress":0.8,"CompanyName":0.95,"CompanyPhoneNumber":0.95,"DatedAs":0.95,"Email":0.8,"Merchant":0.95,"PhoneNumber":0.95,"PurchaseOrderNumber":0.95,"Quantity":0.95,"Signature":0.6,"Subtotal":0.95,"Tax":0.95,"Total":0.95,"VendorName":0.95,"Website":0.95}}},"modelId":"modelName163337188938006462","createdDateTime":"2021-10-04T18:24:51Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  'ba3709b2-6cd7-45c2-bd7d-d49795c81615',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:24:55 GMT'
]);
