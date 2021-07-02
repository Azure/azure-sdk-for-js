let nock = require('nock');

module.exports.hash = "15deadcc32a26b43204d25c8176b5506";

module.exports.testInfo = {"uniqueName":{"4":"modelName162196596371005097"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":true},"useLabelFile":false,"modelName":"modelName162196596371005097"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1/custom/models/3e9469cc-a370-4d59-98df-e03c58a9f259',
  'x-envoy-upstream-service-time',
  '218',
  'apim-request-id',
  'e7c79045-dac4-47ef-8e2b-5bf07e2251ba',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:06:03 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/3e9469cc-a370-4d59-98df-e03c58a9f259')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"3e9469cc-a370-4d59-98df-e03c58a9f259","modelName":"modelName162196596371005097","status":"creating","createdDateTime":"2021-05-25T18:06:03Z","lastUpdatedDateTime":"2021-05-25T18:06:03Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  'e563fba8-755c-420d-bbfe-b1999f286357',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:06:03 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/3e9469cc-a370-4d59-98df-e03c58a9f259')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"3e9469cc-a370-4d59-98df-e03c58a9f259","modelName":"modelName162196596371005097","status":"creating","createdDateTime":"2021-05-25T18:06:03Z","lastUpdatedDateTime":"2021-05-25T18:06:03Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '8413c964-479d-46ee-a401-0bdbc46c6b14',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:06:03 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/3e9469cc-a370-4d59-98df-e03c58a9f259')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"3e9469cc-a370-4d59-98df-e03c58a9f259","modelName":"modelName162196596371005097","status":"creating","createdDateTime":"2021-05-25T18:06:03Z","lastUpdatedDateTime":"2021-05-25T18:06:03Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '0c53d75e-24bf-4ffb-9aea-af35421787f1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:06:08 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/3e9469cc-a370-4d59-98df-e03c58a9f259')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"3e9469cc-a370-4d59-98df-e03c58a9f259","modelName":"modelName162196596371005097","status":"creating","createdDateTime":"2021-05-25T18:06:03Z","lastUpdatedDateTime":"2021-05-25T18:06:03Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '408803d4-cdc5-469a-9087-658e0fc3bc74',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:06:13 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/3e9469cc-a370-4d59-98df-e03c58a9f259')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"3e9469cc-a370-4d59-98df-e03c58a9f259","modelName":"modelName162196596371005097","status":"creating","createdDateTime":"2021-05-25T18:06:03Z","lastUpdatedDateTime":"2021-05-25T18:06:03Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '724f666e-bf84-414c-9e20-39a1f8e4d6b9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:06:19 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/3e9469cc-a370-4d59-98df-e03c58a9f259')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"3e9469cc-a370-4d59-98df-e03c58a9f259","modelName":"modelName162196596371005097","status":"ready","createdDateTime":"2021-05-25T18:06:03Z","lastUpdatedDateTime":"2021-05-25T18:06:22Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"subfolder/Form_6.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Content-Length',
  '1037',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '3f6bf56e-a731-481c-9d6f-6476c6ef20f8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:06:24 GMT'
]);
