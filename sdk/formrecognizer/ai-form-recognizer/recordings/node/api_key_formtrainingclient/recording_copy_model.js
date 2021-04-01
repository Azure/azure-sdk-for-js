let nock = require('nock');

module.exports.hash = "1ef7d98db6b23acd5f9d90b562e05065";

module.exports.testInfo = {"uniqueName":{"copyModelName":"copyModelName161714582641702875"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.3/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{},"useLabelFile":true,"modelName":"copyModelName161714582641702875"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.3/custom/models/622f73a7-8195-4e26-8ddc-9a0c0afc5b46',
  'x-envoy-upstream-service-time',
  '253',
  'apim-request-id',
  '4e2a679d-e172-4673-98d9-e1a980aff330',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:10:26 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/622f73a7-8195-4e26-8ddc-9a0c0afc5b46')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"622f73a7-8195-4e26-8ddc-9a0c0afc5b46","modelName":"copyModelName161714582641702875","status":"creating","createdDateTime":"2021-03-30T23:10:26Z","lastUpdatedDateTime":"2021-03-30T23:10:26Z"}}, [
  'Content-Length',
  '216',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  'b28c6321-1cd6-4bb1-84bd-b3446fa8be1b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:10:26 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/622f73a7-8195-4e26-8ddc-9a0c0afc5b46')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"622f73a7-8195-4e26-8ddc-9a0c0afc5b46","modelName":"copyModelName161714582641702875","status":"creating","createdDateTime":"2021-03-30T23:10:26Z","lastUpdatedDateTime":"2021-03-30T23:10:26Z"}}, [
  'Content-Length',
  '216',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '98a87c82-1cc7-417c-a194-59cf6c56b541',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:10:26 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/622f73a7-8195-4e26-8ddc-9a0c0afc5b46')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"622f73a7-8195-4e26-8ddc-9a0c0afc5b46","modelName":"copyModelName161714582641702875","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-03-30T23:10:26Z","lastUpdatedDateTime":"2021-03-30T23:10:30Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":0.995},{"fieldName":"CompanyPhoneNumber","accuracy":0.995},{"fieldName":"DatedAs","accuracy":0.995},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":0.995},{"fieldName":"PhoneNumber","accuracy":0.995},{"fieldName":"PurchaseOrderNumber","accuracy":0.995},{"fieldName":"Quantity","accuracy":0.995},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":0.995},{"fieldName":"Tax","accuracy":0.995},{"fieldName":"Total","accuracy":0.995},{"fieldName":"VendorName","accuracy":0.995},{"fieldName":"Website","accuracy":0.995}],"errors":[]}}, [
  'Content-Length',
  '1288',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  '687849c7-5e21-48c0-9a29-6ba1e7a8676b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:10:31 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.3/custom/models/copyAuthorization')
  .reply(201, {"modelId":"98c3b96a-cd3b-48cb-ad44-8ee337138a30","accessToken":"accessToken","expirationDateTimeTicks":1617232232}, [
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.3/custom/models/98c3b96a-cd3b-48cb-ad44-8ee337138a30',
  'x-envoy-upstream-service-time',
  '239',
  'apim-request-id',
  'b35e6e21-6ed2-4f85-a020-d7ecb66d3e04',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:10:32 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.3/custom/models/622f73a7-8195-4e26-8ddc-9a0c0afc5b46/copy', {"targetResourceId":"/subscriptions/e1367d46-77d4-4f57-8cfe-348edbdc84a3/resourceGroups/jstests/providers/Microsoft.CognitiveServices/accounts/jstests-fr","targetResourceRegion":"westus2","copyAuthorization":{"modelId":"98c3b96a-cd3b-48cb-ad44-8ee337138a30","accessToken":"accessToken","expirationDateTimeTicks":1617232232}})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1-preview.3/custom/models/622f73a7-8195-4e26-8ddc-9a0c0afc5b46/copyresults/ec660226-efe8-47e1-bf9f-b24420031e64',
  'x-envoy-upstream-service-time',
  '42',
  'apim-request-id',
  '03278897-dd38-4188-bd50-8d971f3bdd35',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:10:32 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/622f73a7-8195-4e26-8ddc-9a0c0afc5b46/copyResults/ec660226-efe8-47e1-bf9f-b24420031e64')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-03-30T23:10:32Z","lastUpdatedDateTime":"2021-03-30T23:10:32Z","copyResult":{"modelId":"98c3b96a-cd3b-48cb-ad44-8ee337138a30"}}, [
  'Content-Length',
  '173',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  'b589b36d-d06e-4db4-b56f-9b8ce4ca74f6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:10:32 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/622f73a7-8195-4e26-8ddc-9a0c0afc5b46/copyResults/ec660226-efe8-47e1-bf9f-b24420031e64')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-03-30T23:10:32Z","lastUpdatedDateTime":"2021-03-30T23:10:32Z","copyResult":{"modelId":"98c3b96a-cd3b-48cb-ad44-8ee337138a30"}}, [
  'Content-Length',
  '173',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  '7e8d30f7-e502-4c26-af76-3563b4180947',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:10:32 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/622f73a7-8195-4e26-8ddc-9a0c0afc5b46/copyResults/ec660226-efe8-47e1-bf9f-b24420031e64')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-03-30T23:10:32Z","lastUpdatedDateTime":"2021-03-30T23:10:32Z","copyResult":{"modelId":"98c3b96a-cd3b-48cb-ad44-8ee337138a30"}}, [
  'Content-Length',
  '173',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '8eb27c91-9e4c-4910-8320-b2aadbb65837',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:10:37 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/622f73a7-8195-4e26-8ddc-9a0c0afc5b46/copyResults/ec660226-efe8-47e1-bf9f-b24420031e64')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-03-30T23:10:32Z","lastUpdatedDateTime":"2021-03-30T23:10:32Z","copyResult":{"modelId":"98c3b96a-cd3b-48cb-ad44-8ee337138a30"}}, [
  'Content-Length',
  '173',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '99df5073-04dd-4e20-af26-da9dacd6c60f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:10:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/622f73a7-8195-4e26-8ddc-9a0c0afc5b46/copyResults/ec660226-efe8-47e1-bf9f-b24420031e64')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-03-30T23:10:32Z","lastUpdatedDateTime":"2021-03-30T23:10:32Z","copyResult":{"modelId":"98c3b96a-cd3b-48cb-ad44-8ee337138a30"}}, [
  'Content-Length',
  '173',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  'de1f4057-2c51-4ab4-a970-ec650efa8de3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:10:48 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/622f73a7-8195-4e26-8ddc-9a0c0afc5b46/copyResults/ec660226-efe8-47e1-bf9f-b24420031e64')
  .reply(200, {"status":"succeeded","createdDateTime":"2021-03-30T23:10:50.1215914Z","lastUpdatedDateTime":"2021-03-30T23:10:50.1215916Z","copyResult":{"modelId":"98c3b96a-cd3b-48cb-ad44-8ee337138a30"}}, [
  'Content-Length',
  '188',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '06436059-5d1d-44ef-9aaa-fb67662a2b57',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:10:52 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/98c3b96a-cd3b-48cb-ad44-8ee337138a30')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"98c3b96a-cd3b-48cb-ad44-8ee337138a30","modelName":"copyModelName161714582641702875","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-03-30T23:10:26Z","lastUpdatedDateTime":"2021-03-30T23:10:30Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":0.995},{"fieldName":"CompanyPhoneNumber","accuracy":0.995},{"fieldName":"DatedAs","accuracy":0.995},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":0.995},{"fieldName":"PhoneNumber","accuracy":0.995},{"fieldName":"PurchaseOrderNumber","accuracy":0.995},{"fieldName":"Quantity","accuracy":0.995},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":0.995},{"fieldName":"Tax","accuracy":0.995},{"fieldName":"Total","accuracy":0.995},{"fieldName":"VendorName","accuracy":0.995},{"fieldName":"Website","accuracy":0.995}],"errors":[]}}, [
  'Content-Length',
  '1288',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  'abce6047-9750-45a1-b22a-d05c9ad088ba',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:10:53 GMT'
]);
