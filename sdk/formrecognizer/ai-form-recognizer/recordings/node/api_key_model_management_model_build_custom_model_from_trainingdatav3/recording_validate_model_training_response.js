let nock = require('nock');

module.exports.hash = "efe63fbb523fcf030074aa573e076058";

module.exports.testInfo = {"uniqueName":{"1":"modelName163225990069002530"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/documentModels:build', {"modelId":"modelName163225990069002530","azureBlobSource":{"containerUrl":"https://storageaccount/trainingdata?sastoken"}})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'operation-location',
  'https://endpoint/formrecognizer/operations/31534108099_4433290a-436e-417a-8f97-f61d9b73d41b?api-version=2021-09-30-preview',
  'x-envoy-upstream-service-time',
  '2628',
  'apim-request-id',
  '4433290a-436e-417a-8f97-f61d9b73d41b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 21 Sep 2021 21:31:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31534108099_4433290a-436e-417a-8f97-f61d9b73d41b')
  .query(true)
  .reply(200, {"operationId":"31534108099_4433290a-436e-417a-8f97-f61d9b73d41b","kind":"documentModelBuild","status":"notStarted","createdDateTime":"2021-09-21T21:31:40Z","lastUpdatedDateTime":"2021-09-21T21:31:40Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/modelName163225990069002530?api-version=2021-09-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  'ba5ea39a-174a-4a20-ab22-41a8b0f648d0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 21 Sep 2021 21:31:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31534108099_4433290a-436e-417a-8f97-f61d9b73d41b')
  .query(true)
  .reply(200, {"operationId":"31534108099_4433290a-436e-417a-8f97-f61d9b73d41b","kind":"documentModelBuild","status":"notStarted","createdDateTime":"2021-09-21T21:31:40Z","lastUpdatedDateTime":"2021-09-21T21:31:40Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/modelName163225990069002530?api-version=2021-09-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '32',
  'apim-request-id',
  '799f60f8-1740-4e74-b309-c1635dc901e2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 21 Sep 2021 21:31:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31534108099_4433290a-436e-417a-8f97-f61d9b73d41b')
  .query(true)
  .reply(200, {"operationId":"31534108099_4433290a-436e-417a-8f97-f61d9b73d41b","kind":"documentModelBuild","status":"succeeded","createdDateTime":"2021-09-21T21:31:40Z","lastUpdatedDateTime":"2021-09-21T21:31:45Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/modelName163225990069002530?api-version=2021-09-30-preview","percentCompleted":100,"result":{"docTypes":{"modelName163225990069002530":{"fieldSchema":{"Merchant":{"type":"string"},"PhoneNumber":{"type":"string"},"Website":{"type":"string"},"Email":{"type":"string"},"PurchaseOrderNumber":{"type":"string"},"DatedAs":{"type":"string"},"VendorName":{"type":"string"},"CompanyName":{"type":"string"},"CompanyAddress":{"type":"string"},"CompanyPhoneNumber":{"type":"string"},"Subtotal":{"type":"string"},"Tax":{"type":"string"},"Total":{"type":"string"},"Signature":{"type":"string"},"Quantity":{"type":"number"}},"fieldConfidence":{"CompanyAddress":0.8,"CompanyName":0.95,"CompanyPhoneNumber":0.95,"DatedAs":0.95,"Email":0.8,"Merchant":0.95,"PhoneNumber":0.95,"PurchaseOrderNumber":0.95,"Quantity":0.95,"Signature":0.6,"Subtotal":0.95,"Tax":0.95,"Total":0.95,"VendorName":0.95,"Website":0.95}}},"modelId":"modelName163225990069002530","createdDateTime":"2021-09-21T21:31:45Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '46',
  'apim-request-id',
  '9c984eb6-2e11-450f-b47b-8840126047c8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 21 Sep 2021 21:31:48 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/documentModels/modelName163225990069002530')
  .query(true)
  .reply(200, {"docTypes":{"modelName163225990069002530":{"fieldSchema":{"Merchant":{"type":"string"},"PhoneNumber":{"type":"string"},"Website":{"type":"string"},"Email":{"type":"string"},"PurchaseOrderNumber":{"type":"string"},"DatedAs":{"type":"string"},"VendorName":{"type":"string"},"CompanyName":{"type":"string"},"CompanyAddress":{"type":"string"},"CompanyPhoneNumber":{"type":"string"},"Subtotal":{"type":"string"},"Tax":{"type":"string"},"Total":{"type":"string"},"Signature":{"type":"string"},"Quantity":{"type":"number"}},"fieldConfidence":{"CompanyAddress":0.8,"CompanyName":0.95,"CompanyPhoneNumber":0.95,"DatedAs":0.95,"Email":0.8,"Merchant":0.95,"PhoneNumber":0.95,"PurchaseOrderNumber":0.95,"Quantity":0.95,"Signature":0.6,"Subtotal":0.95,"Tax":0.95,"Total":0.95,"VendorName":0.95,"Website":0.95}}},"modelId":"modelName163225990069002530","createdDateTime":"2021-09-21T21:31:45Z"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '129',
  'apim-request-id',
  'e38f1a78-28db-408a-adab-77a767b5eecd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 21 Sep 2021 21:31:48 GMT'
]);
