let nock = require('nock');

module.exports.hash = "014c949602e7f255dd5b4b0acae0b8b5";

module.exports.testInfo = {"uniqueName":{"copySource":"copySource163337187682004555","copyTarget":"copyTarget163337188343308910"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/documentModels:build', {"modelId":"copySource163337187682004555","azureBlobSource":{"containerUrl":"https://storageaccount/trainingdata?sastoken"}})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'operation-location',
  'https://endpoint/formrecognizer/operations/31532996123_851d6657-7a4a-4aa4-a76c-1e920ba2eba8?api-version=2021-09-30-preview',
  'x-envoy-upstream-service-time',
  '1172',
  'apim-request-id',
  '851d6657-7a4a-4aa4-a76c-1e920ba2eba8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:24:37 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31532996123_851d6657-7a4a-4aa4-a76c-1e920ba2eba8')
  .query(true)
  .reply(200, {"operationId":"31532996123_851d6657-7a4a-4aa4-a76c-1e920ba2eba8","kind":"documentModelBuild","status":"running","createdDateTime":"2021-10-04T18:24:36Z","lastUpdatedDateTime":"2021-10-04T18:24:38Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/copySource163337187682004555?api-version=2021-09-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'f88705e6-38ce-4c21-af16-f356cf1ed5d3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:24:37 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31532996123_851d6657-7a4a-4aa4-a76c-1e920ba2eba8')
  .query(true)
  .reply(200, {"operationId":"31532996123_851d6657-7a4a-4aa4-a76c-1e920ba2eba8","kind":"documentModelBuild","status":"running","createdDateTime":"2021-10-04T18:24:36Z","lastUpdatedDateTime":"2021-10-04T18:24:38Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/copySource163337187682004555?api-version=2021-09-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'e48db71f-0b01-4027-8c32-98912a5c900e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:24:37 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31532996123_851d6657-7a4a-4aa4-a76c-1e920ba2eba8')
  .query(true)
  .reply(200, {"operationId":"31532996123_851d6657-7a4a-4aa4-a76c-1e920ba2eba8","kind":"documentModelBuild","status":"succeeded","createdDateTime":"2021-10-04T18:24:36Z","lastUpdatedDateTime":"2021-10-04T18:24:39Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/copySource163337187682004555?api-version=2021-09-30-preview","percentCompleted":100,"result":{"docTypes":{"copySource163337187682004555":{"fieldSchema":{"Merchant":{"type":"string"},"PhoneNumber":{"type":"string"},"Website":{"type":"string"},"Email":{"type":"string"},"PurchaseOrderNumber":{"type":"string"},"DatedAs":{"type":"string"},"VendorName":{"type":"string"},"CompanyName":{"type":"string"},"CompanyAddress":{"type":"string"},"CompanyPhoneNumber":{"type":"string"},"Subtotal":{"type":"string"},"Tax":{"type":"string"},"Total":{"type":"string"},"Signature":{"type":"string"},"Quantity":{"type":"number"}},"fieldConfidence":{"CompanyAddress":0.8,"CompanyName":0.95,"CompanyPhoneNumber":0.95,"DatedAs":0.95,"Email":0.8,"Merchant":0.95,"PhoneNumber":0.95,"PurchaseOrderNumber":0.95,"Quantity":0.95,"Signature":0.6,"Subtotal":0.95,"Tax":0.95,"Total":0.95,"VendorName":0.95,"Website":0.95}}},"modelId":"copySource163337187682004555","createdDateTime":"2021-10-04T18:24:39Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '33771d26-6fb8-4fd3-b54a-05bc05bb7a98',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:24:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/documentModels:authorizeCopy', {"modelId":"copyTarget163337188343308910"})
  .query(true)
  .reply(200, {"targetResourceId":"/subscriptions/e1367d46-77d4-4f57-8cfe-348edbdc84a3/resourceGroups/jstests/providers/Microsoft.CognitiveServices/accounts/jstests-fr","targetResourceRegion":"westus2","targetModelId":"copyTarget163337188343308910","targetModelLocation":"https://endpoint/formrecognizer/documentModels/copyTarget163337188343308910?api-version=2021-09-30-preview","accessToken":"accessToken","expirationDateTime":"2021-10-04T19:24:43Z"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '180',
  'apim-request-id',
  'aec3b35e-2621-4d7f-9e19-b5a0ddc2dc6a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:24:43 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/documentModels/copySource163337187682004555:copyTo', {"targetResourceId":"/subscriptions/e1367d46-77d4-4f57-8cfe-348edbdc84a3/resourceGroups/jstests/providers/Microsoft.CognitiveServices/accounts/jstests-fr","targetResourceRegion":"westus2","targetModelId":"copyTarget163337188343308910","targetModelLocation":"https://endpoint/formrecognizer/documentModels/copyTarget163337188343308910?api-version=2021-09-30-preview","accessToken":"accessToken","expirationDateTime":"2021-10-04T19:24:43.000Z"})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/operations/31532996116_3552b635-2126-4430-8837-c54a3103dce2?api-version=2021-09-30-preview',
  'x-envoy-upstream-service-time',
  '105',
  'apim-request-id',
  '3552b635-2126-4430-8837-c54a3103dce2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:24:43 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31532996116_3552b635-2126-4430-8837-c54a3103dce2')
  .query(true)
  .reply(200, {"operationId":"31532996116_3552b635-2126-4430-8837-c54a3103dce2","kind":"documentModelCopyTo","status":"notStarted","createdDateTime":"2021-10-04T18:24:43Z","lastUpdatedDateTime":"2021-10-04T18:24:43Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/copyTarget163337188343308910?api-version=2021-09-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '37c0355a-11ad-44dd-a736-c604d0f569d8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:24:43 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31532996116_3552b635-2126-4430-8837-c54a3103dce2')
  .query(true)
  .reply(200, {"operationId":"31532996116_3552b635-2126-4430-8837-c54a3103dce2","kind":"documentModelCopyTo","status":"running","createdDateTime":"2021-10-04T18:24:43Z","lastUpdatedDateTime":"2021-10-04T18:24:43Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/copyTarget163337188343308910?api-version=2021-09-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '98a9a050-6159-461b-b455-b65624ebba08',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:24:43 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31532996116_3552b635-2126-4430-8837-c54a3103dce2')
  .query(true)
  .reply(200, {"operationId":"31532996116_3552b635-2126-4430-8837-c54a3103dce2","kind":"documentModelCopyTo","status":"succeeded","createdDateTime":"2021-10-04T18:24:43Z","lastUpdatedDateTime":"2021-10-04T18:24:44Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/copyTarget163337188343308910?api-version=2021-09-30-preview","percentCompleted":100,"result":{"docTypes":{"copyTarget163337188343308910":{"fieldSchema":{"Merchant":{"type":"string"},"PhoneNumber":{"type":"string"},"Website":{"type":"string"},"Email":{"type":"string"},"PurchaseOrderNumber":{"type":"string"},"DatedAs":{"type":"string"},"VendorName":{"type":"string"},"CompanyName":{"type":"string"},"CompanyAddress":{"type":"string"},"CompanyPhoneNumber":{"type":"string"},"Subtotal":{"type":"string"},"Tax":{"type":"string"},"Total":{"type":"string"},"Signature":{"type":"string"},"Quantity":{"type":"number"}},"fieldConfidence":{"CompanyAddress":0.8,"CompanyName":0.95,"CompanyPhoneNumber":0.95,"DatedAs":0.95,"Email":0.8,"Merchant":0.95,"PhoneNumber":0.95,"PurchaseOrderNumber":0.95,"Quantity":0.95,"Signature":0.6,"Subtotal":0.95,"Tax":0.95,"Total":0.95,"VendorName":0.95,"Website":0.95}}},"modelId":"copyTarget163337188343308910","createdDateTime":"2021-10-04T18:24:39Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '21',
  'apim-request-id',
  'b6685483-ce70-49e4-83cc-0d9059a2e721',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:24:48 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/documentModels/copyTarget163337188343308910')
  .query(true)
  .reply(200, {"docTypes":{"copyTarget163337188343308910":{"fieldSchema":{"Merchant":{"type":"string"},"PhoneNumber":{"type":"string"},"Website":{"type":"string"},"Email":{"type":"string"},"PurchaseOrderNumber":{"type":"string"},"DatedAs":{"type":"string"},"VendorName":{"type":"string"},"CompanyName":{"type":"string"},"CompanyAddress":{"type":"string"},"CompanyPhoneNumber":{"type":"string"},"Subtotal":{"type":"string"},"Tax":{"type":"string"},"Total":{"type":"string"},"Signature":{"type":"string"},"Quantity":{"type":"number"}},"fieldConfidence":{"CompanyAddress":0.8,"CompanyName":0.95,"CompanyPhoneNumber":0.95,"DatedAs":0.95,"Email":0.8,"Merchant":0.95,"PhoneNumber":0.95,"PurchaseOrderNumber":0.95,"Quantity":0.95,"Signature":0.6,"Subtotal":0.95,"Tax":0.95,"Total":0.95,"VendorName":0.95,"Website":0.95}}},"modelId":"copyTarget163337188343308910","createdDateTime":"2021-10-04T18:24:39Z"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '26',
  'apim-request-id',
  'b3a9e7a7-c6b2-4b5e-900d-0e1742a34042',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:24:48 GMT'
]);
