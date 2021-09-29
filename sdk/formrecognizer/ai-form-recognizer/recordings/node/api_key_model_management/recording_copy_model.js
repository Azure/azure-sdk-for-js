let nock = require('nock');

module.exports.hash = "fe857f45ace1bf3e04807e8f1900735b";

module.exports.testInfo = {"uniqueName":{"copySource":"copySource163225988631507929","copyTarget":"copyTarget163225989374906515"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/documentModels:build', {"modelId":"copySource163225988631507929","azureBlobSource":{"containerUrl":"https://storageaccount/trainingdata?sastoken"}})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'operation-location',
  'https://endpoint/formrecognizer/operations/31534108114_03ad1098-2b37-4a16-9e92-06c753aeb291?api-version=2021-09-30-preview',
  'x-envoy-upstream-service-time',
  '1951',
  'apim-request-id',
  '03ad1098-2b37-4a16-9e92-06c753aeb291',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 21 Sep 2021 21:31:28 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31534108114_03ad1098-2b37-4a16-9e92-06c753aeb291')
  .query(true)
  .reply(200, {"operationId":"31534108114_03ad1098-2b37-4a16-9e92-06c753aeb291","kind":"documentModelBuild","status":"notStarted","createdDateTime":"2021-09-21T21:31:26Z","lastUpdatedDateTime":"2021-09-21T21:31:26Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/copySource163225988631507929?api-version=2021-09-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '33',
  'apim-request-id',
  'ce2b217c-ce9d-4553-8bde-6f57ccd95def',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 21 Sep 2021 21:31:28 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31534108114_03ad1098-2b37-4a16-9e92-06c753aeb291')
  .query(true)
  .reply(200, {"operationId":"31534108114_03ad1098-2b37-4a16-9e92-06c753aeb291","kind":"documentModelBuild","status":"notStarted","createdDateTime":"2021-09-21T21:31:26Z","lastUpdatedDateTime":"2021-09-21T21:31:26Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/copySource163225988631507929?api-version=2021-09-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  'bce1df77-7d2c-48bb-ac81-cc3518e95705',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 21 Sep 2021 21:31:28 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31534108114_03ad1098-2b37-4a16-9e92-06c753aeb291')
  .query(true)
  .reply(200, {"operationId":"31534108114_03ad1098-2b37-4a16-9e92-06c753aeb291","kind":"documentModelBuild","status":"succeeded","createdDateTime":"2021-09-21T21:31:26Z","lastUpdatedDateTime":"2021-09-21T21:31:30Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/copySource163225988631507929?api-version=2021-09-30-preview","percentCompleted":100,"result":{"docTypes":{"copySource163225988631507929":{"fieldSchema":{"Merchant":{"type":"string"},"PhoneNumber":{"type":"string"},"Website":{"type":"string"},"Email":{"type":"string"},"PurchaseOrderNumber":{"type":"string"},"DatedAs":{"type":"string"},"VendorName":{"type":"string"},"CompanyName":{"type":"string"},"CompanyAddress":{"type":"string"},"CompanyPhoneNumber":{"type":"string"},"Subtotal":{"type":"string"},"Tax":{"type":"string"},"Total":{"type":"string"},"Signature":{"type":"string"},"Quantity":{"type":"number"}},"fieldConfidence":{"CompanyAddress":0.8,"CompanyName":0.95,"CompanyPhoneNumber":0.95,"DatedAs":0.95,"Email":0.8,"Merchant":0.95,"PhoneNumber":0.95,"PurchaseOrderNumber":0.95,"Quantity":0.95,"Signature":0.6,"Subtotal":0.95,"Tax":0.95,"Total":0.95,"VendorName":0.95,"Website":0.95}}},"modelId":"copySource163225988631507929","createdDateTime":"2021-09-21T21:31:30Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  '0764711b-3d86-4805-96fe-f8b9668c5603',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 21 Sep 2021 21:31:33 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/documentModels/copySource163225988631507929')
  .query(true)
  .reply(200, {"docTypes":{"copySource163225988631507929":{"fieldSchema":{"Merchant":{"type":"string"},"PhoneNumber":{"type":"string"},"Website":{"type":"string"},"Email":{"type":"string"},"PurchaseOrderNumber":{"type":"string"},"DatedAs":{"type":"string"},"VendorName":{"type":"string"},"CompanyName":{"type":"string"},"CompanyAddress":{"type":"string"},"CompanyPhoneNumber":{"type":"string"},"Subtotal":{"type":"string"},"Tax":{"type":"string"},"Total":{"type":"string"},"Signature":{"type":"string"},"Quantity":{"type":"number"}},"fieldConfidence":{"CompanyAddress":0.8,"CompanyName":0.95,"CompanyPhoneNumber":0.95,"DatedAs":0.95,"Email":0.8,"Merchant":0.95,"PhoneNumber":0.95,"PurchaseOrderNumber":0.95,"Quantity":0.95,"Signature":0.6,"Subtotal":0.95,"Tax":0.95,"Total":0.95,"VendorName":0.95,"Website":0.95}}},"modelId":"copySource163225988631507929","createdDateTime":"2021-09-21T21:31:30Z"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '127',
  'apim-request-id',
  'a8d0f844-0854-4c1d-94bb-6db1997e4fe9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 21 Sep 2021 21:31:33 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/documentModels:authorizeCopy', {"modelId":"copyTarget163225989374906515"})
  .query(true)
  .reply(200, {"targetResourceId":"/subscriptions/e1367d46-77d4-4f57-8cfe-348edbdc84a3/resourceGroups/jstests/providers/Microsoft.CognitiveServices/accounts/jstests-fr","targetResourceRegion":"centraluseuap","targetModelId":"copyTarget163225989374906515","targetModelLocation":"https://endpoint/formrecognizer/documentModels/copyTarget163225989374906515?api-version=2021-09-30-preview","accessToken":"accessToken","expirationDateTime":"2021-09-21T22:31:34Z"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '560',
  'apim-request-id',
  'd5eb1524-8de1-4dc6-97c7-450eff545d19',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 21 Sep 2021 21:31:33 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/documentModels/copySource163225988631507929:copyTo', {"targetResourceId":"/subscriptions/e1367d46-77d4-4f57-8cfe-348edbdc84a3/resourceGroups/jstests/providers/Microsoft.CognitiveServices/accounts/jstests-fr","targetResourceRegion":"centraluseuap","targetModelId":"copyTarget163225989374906515","targetModelLocation":"https://endpoint/formrecognizer/documentModels/copyTarget163225989374906515?api-version=2021-09-30-preview","accessToken":"accessToken","expirationDateTime":"2021-09-21T22:31:34.000Z"})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/operations/31534108106_7911688f-a2f7-4cf8-ae07-9136dc15aa25?api-version=2021-09-30-preview',
  'x-envoy-upstream-service-time',
  '538',
  'apim-request-id',
  '7911688f-a2f7-4cf8-ae07-9136dc15aa25',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 21 Sep 2021 21:31:34 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31534108106_7911688f-a2f7-4cf8-ae07-9136dc15aa25')
  .query(true)
  .reply(200, {"operationId":"31534108106_7911688f-a2f7-4cf8-ae07-9136dc15aa25","kind":"documentModelCopyTo","status":"notStarted","createdDateTime":"2021-09-21T21:31:34Z","lastUpdatedDateTime":"2021-09-21T21:31:34Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/copyTarget163225989374906515?api-version=2021-09-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '33',
  'apim-request-id',
  '541f0d28-8397-4c7d-b332-a1f037bd9f26',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 21 Sep 2021 21:31:34 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31534108106_7911688f-a2f7-4cf8-ae07-9136dc15aa25')
  .query(true)
  .reply(200, {"operationId":"31534108106_7911688f-a2f7-4cf8-ae07-9136dc15aa25","kind":"documentModelCopyTo","status":"notStarted","createdDateTime":"2021-09-21T21:31:34Z","lastUpdatedDateTime":"2021-09-21T21:31:34Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/copyTarget163225989374906515?api-version=2021-09-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  '58082976-7fdb-4979-a3aa-e4bcb3410c70',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 21 Sep 2021 21:31:34 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31534108106_7911688f-a2f7-4cf8-ae07-9136dc15aa25')
  .query(true)
  .reply(200, {"operationId":"31534108106_7911688f-a2f7-4cf8-ae07-9136dc15aa25","kind":"documentModelCopyTo","status":"succeeded","createdDateTime":"2021-09-21T21:31:34Z","lastUpdatedDateTime":"2021-09-21T21:31:36Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/copyTarget163225989374906515?api-version=2021-09-30-preview","percentCompleted":100,"result":{"docTypes":{"copyTarget163225989374906515":{"fieldSchema":{"Merchant":{"type":"string"},"PhoneNumber":{"type":"string"},"Website":{"type":"string"},"Email":{"type":"string"},"PurchaseOrderNumber":{"type":"string"},"DatedAs":{"type":"string"},"VendorName":{"type":"string"},"CompanyName":{"type":"string"},"CompanyAddress":{"type":"string"},"CompanyPhoneNumber":{"type":"string"},"Subtotal":{"type":"string"},"Tax":{"type":"string"},"Total":{"type":"string"},"Signature":{"type":"string"},"Quantity":{"type":"number"}},"fieldConfidence":{"CompanyAddress":0.8,"CompanyName":0.95,"CompanyPhoneNumber":0.95,"DatedAs":0.95,"Email":0.8,"Merchant":0.95,"PhoneNumber":0.95,"PurchaseOrderNumber":0.95,"Quantity":0.95,"Signature":0.6,"Subtotal":0.95,"Tax":0.95,"Total":0.95,"VendorName":0.95,"Website":0.95}}},"modelId":"copyTarget163225989374906515","createdDateTime":"2021-09-21T21:31:30Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  'a4c2cbdd-f754-4b97-add3-e0356763532d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 21 Sep 2021 21:31:40 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/documentModels/copyTarget163225989374906515')
  .query(true)
  .reply(200, {"docTypes":{"copyTarget163225989374906515":{"fieldSchema":{"Merchant":{"type":"string"},"PhoneNumber":{"type":"string"},"Website":{"type":"string"},"Email":{"type":"string"},"PurchaseOrderNumber":{"type":"string"},"DatedAs":{"type":"string"},"VendorName":{"type":"string"},"CompanyName":{"type":"string"},"CompanyAddress":{"type":"string"},"CompanyPhoneNumber":{"type":"string"},"Subtotal":{"type":"string"},"Tax":{"type":"string"},"Total":{"type":"string"},"Signature":{"type":"string"},"Quantity":{"type":"number"}},"fieldConfidence":{"CompanyAddress":0.8,"CompanyName":0.95,"CompanyPhoneNumber":0.95,"DatedAs":0.95,"Email":0.8,"Merchant":0.95,"PhoneNumber":0.95,"PurchaseOrderNumber":0.95,"Quantity":0.95,"Signature":0.6,"Subtotal":0.95,"Tax":0.95,"Total":0.95,"VendorName":0.95,"Website":0.95}}},"modelId":"copyTarget163225989374906515","createdDateTime":"2021-09-21T21:31:30Z"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '129',
  'apim-request-id',
  '092fcbff-90fd-493d-991d-c2caafb1295a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 21 Sep 2021 21:31:40 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/documentModels/copyTarget163225989374906515')
  .query(true)
  .reply(200, {"docTypes":{"copyTarget163225989374906515":{"fieldSchema":{"Merchant":{"type":"string"},"PhoneNumber":{"type":"string"},"Website":{"type":"string"},"Email":{"type":"string"},"PurchaseOrderNumber":{"type":"string"},"DatedAs":{"type":"string"},"VendorName":{"type":"string"},"CompanyName":{"type":"string"},"CompanyAddress":{"type":"string"},"CompanyPhoneNumber":{"type":"string"},"Subtotal":{"type":"string"},"Tax":{"type":"string"},"Total":{"type":"string"},"Signature":{"type":"string"},"Quantity":{"type":"number"}},"fieldConfidence":{"CompanyAddress":0.8,"CompanyName":0.95,"CompanyPhoneNumber":0.95,"DatedAs":0.95,"Email":0.8,"Merchant":0.95,"PhoneNumber":0.95,"PurchaseOrderNumber":0.95,"Quantity":0.95,"Signature":0.6,"Subtotal":0.95,"Tax":0.95,"Total":0.95,"VendorName":0.95,"Website":0.95}}},"modelId":"copyTarget163225989374906515","createdDateTime":"2021-09-21T21:31:30Z"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '234',
  'apim-request-id',
  '331a58e8-4438-42a6-8184-775277194b37',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 21 Sep 2021 21:31:40 GMT'
]);
