let nock = require('nock');

module.exports.hash = "15deadcc32a26b43204d25c8176b5506";

module.exports.testInfo = {"uniqueName":{"6":"modelName162196602280006971"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":false},"useLabelFile":false,"modelName":"modelName162196602280006971"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1/custom/models/ac414e79-56f7-4153-a6ee-30814fd2f9e9',
  'x-envoy-upstream-service-time',
  '219',
  'apim-request-id',
  'cd380b72-3df5-4272-ad88-b1c2b697da80',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:07:02 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/ac414e79-56f7-4153-a6ee-30814fd2f9e9')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"ac414e79-56f7-4153-a6ee-30814fd2f9e9","modelName":"modelName162196602280006971","status":"creating","createdDateTime":"2021-05-25T18:07:02Z","lastUpdatedDateTime":"2021-05-25T18:07:02Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '14d686fe-084b-4df1-aa4e-f54372e5a9c2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:07:03 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/ac414e79-56f7-4153-a6ee-30814fd2f9e9')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"ac414e79-56f7-4153-a6ee-30814fd2f9e9","modelName":"modelName162196602280006971","status":"creating","createdDateTime":"2021-05-25T18:07:02Z","lastUpdatedDateTime":"2021-05-25T18:07:02Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '63247d51-3d75-415b-ad40-04163b1442b3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:07:03 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/ac414e79-56f7-4153-a6ee-30814fd2f9e9')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"ac414e79-56f7-4153-a6ee-30814fd2f9e9","modelName":"modelName162196602280006971","status":"creating","createdDateTime":"2021-05-25T18:07:02Z","lastUpdatedDateTime":"2021-05-25T18:07:02Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  'c4825dd1-bb37-423a-9dd0-506d3c6ca0ca',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:07:07 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/ac414e79-56f7-4153-a6ee-30814fd2f9e9')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"ac414e79-56f7-4153-a6ee-30814fd2f9e9","modelName":"modelName162196602280006971","status":"creating","createdDateTime":"2021-05-25T18:07:02Z","lastUpdatedDateTime":"2021-05-25T18:07:02Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  'b13a0171-acbc-4335-b7fa-09c411535df9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:07:12 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/ac414e79-56f7-4153-a6ee-30814fd2f9e9')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"ac414e79-56f7-4153-a6ee-30814fd2f9e9","modelName":"modelName162196602280006971","status":"creating","createdDateTime":"2021-05-25T18:07:02Z","lastUpdatedDateTime":"2021-05-25T18:07:02Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '15d16810-ff2d-41fa-966b-64d14e45ad4b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:07:17 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/ac414e79-56f7-4153-a6ee-30814fd2f9e9')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"ac414e79-56f7-4153-a6ee-30814fd2f9e9","modelName":"modelName162196602280006971","status":"creating","createdDateTime":"2021-05-25T18:07:02Z","lastUpdatedDateTime":"2021-05-25T18:07:02Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '0ad3a1be-da9e-43bf-98ce-eb23fe11ed5e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:07:23 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/ac414e79-56f7-4153-a6ee-30814fd2f9e9')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"ac414e79-56f7-4153-a6ee-30814fd2f9e9","modelName":"modelName162196602280006971","status":"ready","createdDateTime":"2021-05-25T18:07:02Z","lastUpdatedDateTime":"2021-05-25T18:07:26Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Content-Length',
  '954',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '6d57371d-fa82-40e5-b5b3-2fab760d437b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:07:28 GMT'
]);
