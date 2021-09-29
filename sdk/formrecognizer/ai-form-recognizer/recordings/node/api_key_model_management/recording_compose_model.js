let nock = require('nock');

module.exports.hash = "afbb02c9f9c7c6145d298c93b54a2fd7";

module.exports.testInfo = {"uniqueName":{"input1":"input1163225987212409177","input2":"input2163225987212408525","composedModelName":"composedModelName163225988032605049"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/documentModels:build', {"modelId":"input1163225987212409177","azureBlobSource":{"containerUrl":"https://storageaccount/trainingdata?sastoken"}})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'operation-location',
  'https://endpoint/formrecognizer/operations/31534108128_4ba1af4d-97b6-4c4b-a79e-895ef6c2e808?api-version=2021-09-30-preview',
  'x-envoy-upstream-service-time',
  '2458',
  'apim-request-id',
  '4ba1af4d-97b6-4c4b-a79e-895ef6c2e808',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 21 Sep 2021 21:31:13 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31534108128_4ba1af4d-97b6-4c4b-a79e-895ef6c2e808')
  .query(true)
  .reply(200, {"operationId":"31534108128_4ba1af4d-97b6-4c4b-a79e-895ef6c2e808","kind":"documentModelBuild","status":"notStarted","createdDateTime":"2021-09-21T21:31:12Z","lastUpdatedDateTime":"2021-09-21T21:31:12Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/input1163225987212409177?api-version=2021-09-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  '2749a02f-5783-499a-9238-aafbe2868c2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 21 Sep 2021 21:31:14 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31534108128_4ba1af4d-97b6-4c4b-a79e-895ef6c2e808')
  .query(true)
  .reply(200, {"operationId":"31534108128_4ba1af4d-97b6-4c4b-a79e-895ef6c2e808","kind":"documentModelBuild","status":"notStarted","createdDateTime":"2021-09-21T21:31:12Z","lastUpdatedDateTime":"2021-09-21T21:31:12Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/input1163225987212409177?api-version=2021-09-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '43',
  'apim-request-id',
  'a6b09cdc-8787-4e78-9de3-bae9c6fd1861',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 21 Sep 2021 21:31:14 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/documentModels:build', {"modelId":"input2163225987212408525","azureBlobSource":{"containerUrl":"https://storageaccount/trainingdata?sastoken"}})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'operation-location',
  'https://endpoint/formrecognizer/operations/31534108128_0089fdca-aed6-4af1-b881-60043b463a02?api-version=2021-09-30-preview',
  'x-envoy-upstream-service-time',
  '2430',
  'apim-request-id',
  '0089fdca-aed6-4af1-b881-60043b463a02',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 21 Sep 2021 21:31:14 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31534108128_0089fdca-aed6-4af1-b881-60043b463a02')
  .query(true)
  .reply(200, {"operationId":"31534108128_0089fdca-aed6-4af1-b881-60043b463a02","kind":"documentModelBuild","status":"notStarted","createdDateTime":"2021-09-21T21:31:12Z","lastUpdatedDateTime":"2021-09-21T21:31:12Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/input2163225987212408525?api-version=2021-09-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '51',
  'apim-request-id',
  'a5c7e87a-06df-4b2c-b8bd-13949b557fd9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 21 Sep 2021 21:31:14 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31534108128_0089fdca-aed6-4af1-b881-60043b463a02')
  .query(true)
  .reply(200, {"operationId":"31534108128_0089fdca-aed6-4af1-b881-60043b463a02","kind":"documentModelBuild","status":"running","createdDateTime":"2021-09-21T21:31:12Z","lastUpdatedDateTime":"2021-09-21T21:31:14Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/input2163225987212408525?api-version=2021-09-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  '82845ba9-f29d-433b-85b6-8bee8b3f119b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 21 Sep 2021 21:31:14 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31534108128_4ba1af4d-97b6-4c4b-a79e-895ef6c2e808')
  .query(true)
  .reply(200, {"operationId":"31534108128_4ba1af4d-97b6-4c4b-a79e-895ef6c2e808","kind":"documentModelBuild","status":"succeeded","createdDateTime":"2021-09-21T21:31:12Z","lastUpdatedDateTime":"2021-09-21T21:31:16Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/input1163225987212409177?api-version=2021-09-30-preview","percentCompleted":100,"result":{"docTypes":{"input1163225987212409177":{"fieldSchema":{"Merchant":{"type":"string"},"PhoneNumber":{"type":"string"},"Website":{"type":"string"},"Email":{"type":"string"},"PurchaseOrderNumber":{"type":"string"},"DatedAs":{"type":"string"},"VendorName":{"type":"string"},"CompanyName":{"type":"string"},"CompanyAddress":{"type":"string"},"CompanyPhoneNumber":{"type":"string"},"Subtotal":{"type":"string"},"Tax":{"type":"string"},"Total":{"type":"string"},"Signature":{"type":"string"},"Quantity":{"type":"number"}},"fieldConfidence":{"CompanyAddress":0.8,"CompanyName":0.95,"CompanyPhoneNumber":0.95,"DatedAs":0.95,"Email":0.8,"Merchant":0.95,"PhoneNumber":0.95,"PurchaseOrderNumber":0.95,"Quantity":0.95,"Signature":0.6,"Subtotal":0.95,"Tax":0.95,"Total":0.95,"VendorName":0.95,"Website":0.95}}},"modelId":"input1163225987212409177","createdDateTime":"2021-09-21T21:31:16Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '43',
  'apim-request-id',
  'dd457fa5-d767-4028-8907-ff1760b9ca3a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 21 Sep 2021 21:31:19 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31534108128_0089fdca-aed6-4af1-b881-60043b463a02')
  .query(true)
  .reply(200, {"operationId":"31534108128_0089fdca-aed6-4af1-b881-60043b463a02","kind":"documentModelBuild","status":"succeeded","createdDateTime":"2021-09-21T21:31:12Z","lastUpdatedDateTime":"2021-09-21T21:31:17Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/input2163225987212408525?api-version=2021-09-30-preview","percentCompleted":100,"result":{"docTypes":{"input2163225987212408525":{"fieldSchema":{"Merchant":{"type":"string"},"PhoneNumber":{"type":"string"},"Website":{"type":"string"},"Email":{"type":"string"},"PurchaseOrderNumber":{"type":"string"},"DatedAs":{"type":"string"},"VendorName":{"type":"string"},"CompanyName":{"type":"string"},"CompanyAddress":{"type":"string"},"CompanyPhoneNumber":{"type":"string"},"Subtotal":{"type":"string"},"Tax":{"type":"string"},"Total":{"type":"string"},"Signature":{"type":"string"},"Quantity":{"type":"number"}},"fieldConfidence":{"CompanyAddress":0.8,"CompanyName":0.95,"CompanyPhoneNumber":0.95,"DatedAs":0.95,"Email":0.8,"Merchant":0.95,"PhoneNumber":0.95,"PurchaseOrderNumber":0.95,"Quantity":0.95,"Signature":0.6,"Subtotal":0.95,"Tax":0.95,"Total":0.95,"VendorName":0.95,"Website":0.95}}},"modelId":"input2163225987212408525","createdDateTime":"2021-09-21T21:31:16Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '45',
  'apim-request-id',
  'f4b2a4a3-2e74-4966-9c7e-ed976196f694',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 21 Sep 2021 21:31:20 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/documentModels/input1163225987212409177')
  .query(true)
  .reply(200, {"docTypes":{"input1163225987212409177":{"fieldSchema":{"Merchant":{"type":"string"},"PhoneNumber":{"type":"string"},"Website":{"type":"string"},"Email":{"type":"string"},"PurchaseOrderNumber":{"type":"string"},"DatedAs":{"type":"string"},"VendorName":{"type":"string"},"CompanyName":{"type":"string"},"CompanyAddress":{"type":"string"},"CompanyPhoneNumber":{"type":"string"},"Subtotal":{"type":"string"},"Tax":{"type":"string"},"Total":{"type":"string"},"Signature":{"type":"string"},"Quantity":{"type":"number"}},"fieldConfidence":{"CompanyAddress":0.8,"CompanyName":0.95,"CompanyPhoneNumber":0.95,"DatedAs":0.95,"Email":0.8,"Merchant":0.95,"PhoneNumber":0.95,"PurchaseOrderNumber":0.95,"Quantity":0.95,"Signature":0.6,"Subtotal":0.95,"Tax":0.95,"Total":0.95,"VendorName":0.95,"Website":0.95}}},"modelId":"input1163225987212409177","createdDateTime":"2021-09-21T21:31:16Z"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '187',
  'apim-request-id',
  '902989ff-a252-472d-8b51-ebd85e409520',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 21 Sep 2021 21:31:19 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/documentModels/input2163225987212408525')
  .query(true)
  .reply(200, {"docTypes":{"input2163225987212408525":{"fieldSchema":{"Merchant":{"type":"string"},"PhoneNumber":{"type":"string"},"Website":{"type":"string"},"Email":{"type":"string"},"PurchaseOrderNumber":{"type":"string"},"DatedAs":{"type":"string"},"VendorName":{"type":"string"},"CompanyName":{"type":"string"},"CompanyAddress":{"type":"string"},"CompanyPhoneNumber":{"type":"string"},"Subtotal":{"type":"string"},"Tax":{"type":"string"},"Total":{"type":"string"},"Signature":{"type":"string"},"Quantity":{"type":"number"}},"fieldConfidence":{"CompanyAddress":0.8,"CompanyName":0.95,"CompanyPhoneNumber":0.95,"DatedAs":0.95,"Email":0.8,"Merchant":0.95,"PhoneNumber":0.95,"PurchaseOrderNumber":0.95,"Quantity":0.95,"Signature":0.6,"Subtotal":0.95,"Tax":0.95,"Total":0.95,"VendorName":0.95,"Website":0.95}}},"modelId":"input2163225987212408525","createdDateTime":"2021-09-21T21:31:16Z"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '134',
  'apim-request-id',
  'e3ddf202-6d99-4514-adea-3b5b3d8f38d6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 21 Sep 2021 21:31:20 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/documentModels:compose', {"modelId":"composedModelName163225988032605049","componentModels":[{"modelId":"input1163225987212409177"},{"modelId":"input2163225987212408525"}]})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'operation-location',
  'https://endpoint/formrecognizer/operations/31534108120_ab7bde46-6da6-4c38-a7cd-4386ff0ac7e7?api-version=2021-09-30-preview',
  'x-envoy-upstream-service-time',
  '449',
  'apim-request-id',
  'ab7bde46-6da6-4c38-a7cd-4386ff0ac7e7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 21 Sep 2021 21:31:20 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31534108120_ab7bde46-6da6-4c38-a7cd-4386ff0ac7e7')
  .query(true)
  .reply(200, {"operationId":"31534108120_ab7bde46-6da6-4c38-a7cd-4386ff0ac7e7","kind":"documentModelCompose","status":"notStarted","createdDateTime":"2021-09-21T21:31:20Z","lastUpdatedDateTime":"2021-09-21T21:31:20Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/composedModelName163225988032605049?api-version=2021-09-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '32',
  'apim-request-id',
  '097d0932-b4be-4001-8925-c52b40a57fe5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 21 Sep 2021 21:31:20 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31534108120_ab7bde46-6da6-4c38-a7cd-4386ff0ac7e7')
  .query(true)
  .reply(200, {"operationId":"31534108120_ab7bde46-6da6-4c38-a7cd-4386ff0ac7e7","kind":"documentModelCompose","status":"running","createdDateTime":"2021-09-21T21:31:20Z","lastUpdatedDateTime":"2021-09-21T21:31:20Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/composedModelName163225988032605049?api-version=2021-09-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  'ccd7696b-df94-4f35-ac30-881be33a0064',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 21 Sep 2021 21:31:20 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31534108120_ab7bde46-6da6-4c38-a7cd-4386ff0ac7e7')
  .query(true)
  .reply(200, {"operationId":"31534108120_ab7bde46-6da6-4c38-a7cd-4386ff0ac7e7","kind":"documentModelCompose","status":"succeeded","createdDateTime":"2021-09-21T21:31:20Z","lastUpdatedDateTime":"2021-09-21T21:31:21Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/composedModelName163225988032605049?api-version=2021-09-30-preview","percentCompleted":100,"result":{"docTypes":{"input1163225987212409177":{"fieldSchema":{"Merchant":{"type":"string"},"PhoneNumber":{"type":"string"},"Website":{"type":"string"},"Email":{"type":"string"},"PurchaseOrderNumber":{"type":"string"},"DatedAs":{"type":"string"},"VendorName":{"type":"string"},"CompanyName":{"type":"string"},"CompanyAddress":{"type":"string"},"CompanyPhoneNumber":{"type":"string"},"Subtotal":{"type":"string"},"Tax":{"type":"string"},"Total":{"type":"string"},"Signature":{"type":"string"},"Quantity":{"type":"number"}},"fieldConfidence":{"CompanyAddress":0.8,"CompanyName":0.95,"CompanyPhoneNumber":0.95,"DatedAs":0.95,"Email":0.8,"Merchant":0.95,"PhoneNumber":0.95,"PurchaseOrderNumber":0.95,"Quantity":0.95,"Signature":0.6,"Subtotal":0.95,"Tax":0.95,"Total":0.95,"VendorName":0.95,"Website":0.95}},"input2163225987212408525":{"fieldSchema":{"Merchant":{"type":"string"},"PhoneNumber":{"type":"string"},"Website":{"type":"string"},"Email":{"type":"string"},"PurchaseOrderNumber":{"type":"string"},"DatedAs":{"type":"string"},"VendorName":{"type":"string"},"CompanyName":{"type":"string"},"CompanyAddress":{"type":"string"},"CompanyPhoneNumber":{"type":"string"},"Subtotal":{"type":"string"},"Tax":{"type":"string"},"Total":{"type":"string"},"Signature":{"type":"string"},"Quantity":{"type":"number"}},"fieldConfidence":{"CompanyAddress":0.8,"CompanyName":0.95,"CompanyPhoneNumber":0.95,"DatedAs":0.95,"Email":0.8,"Merchant":0.95,"PhoneNumber":0.95,"PurchaseOrderNumber":0.95,"Quantity":0.95,"Signature":0.6,"Subtotal":0.95,"Tax":0.95,"Total":0.95,"VendorName":0.95,"Website":0.95}}},"modelId":"composedModelName163225988032605049","createdDateTime":"2021-09-21T21:31:21Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  'd7d5a797-b1bc-4d2b-8992-7b0521b6c49f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 21 Sep 2021 21:31:25 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/documentModels/composedModelName163225988032605049')
  .query(true)
  .reply(200, {"docTypes":{"input1163225987212409177":{"fieldSchema":{"Merchant":{"type":"string"},"PhoneNumber":{"type":"string"},"Website":{"type":"string"},"Email":{"type":"string"},"PurchaseOrderNumber":{"type":"string"},"DatedAs":{"type":"string"},"VendorName":{"type":"string"},"CompanyName":{"type":"string"},"CompanyAddress":{"type":"string"},"CompanyPhoneNumber":{"type":"string"},"Subtotal":{"type":"string"},"Tax":{"type":"string"},"Total":{"type":"string"},"Signature":{"type":"string"},"Quantity":{"type":"number"}},"fieldConfidence":{"CompanyAddress":0.8,"CompanyName":0.95,"CompanyPhoneNumber":0.95,"DatedAs":0.95,"Email":0.8,"Merchant":0.95,"PhoneNumber":0.95,"PurchaseOrderNumber":0.95,"Quantity":0.95,"Signature":0.6,"Subtotal":0.95,"Tax":0.95,"Total":0.95,"VendorName":0.95,"Website":0.95}},"input2163225987212408525":{"fieldSchema":{"Merchant":{"type":"string"},"PhoneNumber":{"type":"string"},"Website":{"type":"string"},"Email":{"type":"string"},"PurchaseOrderNumber":{"type":"string"},"DatedAs":{"type":"string"},"VendorName":{"type":"string"},"CompanyName":{"type":"string"},"CompanyAddress":{"type":"string"},"CompanyPhoneNumber":{"type":"string"},"Subtotal":{"type":"string"},"Tax":{"type":"string"},"Total":{"type":"string"},"Signature":{"type":"string"},"Quantity":{"type":"number"}},"fieldConfidence":{"CompanyAddress":0.8,"CompanyName":0.95,"CompanyPhoneNumber":0.95,"DatedAs":0.95,"Email":0.8,"Merchant":0.95,"PhoneNumber":0.95,"PurchaseOrderNumber":0.95,"Quantity":0.95,"Signature":0.6,"Subtotal":0.95,"Tax":0.95,"Total":0.95,"VendorName":0.95,"Website":0.95}}},"modelId":"composedModelName163225988032605049","createdDateTime":"2021-09-21T21:31:21Z"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '133',
  'apim-request-id',
  '22e61c77-ff29-4065-a323-6325494c156d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 21 Sep 2021 21:31:25 GMT'
]);
