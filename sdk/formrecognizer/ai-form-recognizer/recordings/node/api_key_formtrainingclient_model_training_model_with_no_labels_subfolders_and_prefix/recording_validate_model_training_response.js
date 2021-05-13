let nock = require('nock');

module.exports.hash = "15deadcc32a26b43204d25c8176b5506";

module.exports.testInfo = {"uniqueName":{"3":"modelName162078255693403980"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":true},"useLabelFile":false,"modelName":"modelName162078255693403980"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1/custom/models/56fe126e-d52c-49f2-95e0-286b3ba1ca4e',
  'x-envoy-upstream-service-time',
  '589',
  'apim-request-id',
  'd4822149-c4d8-41f3-b010-b0f2b8c6e922',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:22:36 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/56fe126e-d52c-49f2-95e0-286b3ba1ca4e')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"56fe126e-d52c-49f2-95e0-286b3ba1ca4e","modelName":"modelName162078255693403980","status":"creating","createdDateTime":"2021-05-12T01:22:37Z","lastUpdatedDateTime":"2021-05-12T01:22:37Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  '2438f81b-6255-4679-be2f-28cb5ed860a8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:22:36 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/56fe126e-d52c-49f2-95e0-286b3ba1ca4e')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"56fe126e-d52c-49f2-95e0-286b3ba1ca4e","modelName":"modelName162078255693403980","status":"creating","createdDateTime":"2021-05-12T01:22:37Z","lastUpdatedDateTime":"2021-05-12T01:22:37Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  'b6befaee-41ce-47d0-bc27-d887280d1133',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:22:37 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/56fe126e-d52c-49f2-95e0-286b3ba1ca4e')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"56fe126e-d52c-49f2-95e0-286b3ba1ca4e","modelName":"modelName162078255693403980","status":"creating","createdDateTime":"2021-05-12T01:22:37Z","lastUpdatedDateTime":"2021-05-12T01:22:37Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '28',
  'apim-request-id',
  '4f6c4e0e-6271-4a8d-aac6-84a157f3d799',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:22:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/56fe126e-d52c-49f2-95e0-286b3ba1ca4e')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"56fe126e-d52c-49f2-95e0-286b3ba1ca4e","modelName":"modelName162078255693403980","status":"creating","createdDateTime":"2021-05-12T01:22:37Z","lastUpdatedDateTime":"2021-05-12T01:22:37Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '31',
  'apim-request-id',
  'b5759400-25e4-45db-bea7-c6c2a2201dcb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:22:47 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/56fe126e-d52c-49f2-95e0-286b3ba1ca4e')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"56fe126e-d52c-49f2-95e0-286b3ba1ca4e","modelName":"modelName162078255693403980","status":"creating","createdDateTime":"2021-05-12T01:22:37Z","lastUpdatedDateTime":"2021-05-12T01:22:37Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '31',
  'apim-request-id',
  '249329d3-a117-4ffb-a290-747732d58e90',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:22:52 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/56fe126e-d52c-49f2-95e0-286b3ba1ca4e')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"56fe126e-d52c-49f2-95e0-286b3ba1ca4e","modelName":"modelName162078255693403980","status":"ready","createdDateTime":"2021-05-12T01:22:37Z","lastUpdatedDateTime":"2021-05-12T01:22:54Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"subfolder/Form_6.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Content-Length',
  '1037',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  'a3a98457-3fef-4570-9982-971a15d5795e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:22:57 GMT'
]);
