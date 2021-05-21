let nock = require('nock');

module.exports.hash = "15deadcc32a26b43204d25c8176b5506";

module.exports.testInfo = {"uniqueName":{"5":"modelName162078262220001401"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":false},"useLabelFile":false,"modelName":"modelName162078262220001401"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1/custom/models/3fe12716-3902-45f3-9247-c0a4dfeedff8',
  'x-envoy-upstream-service-time',
  '220',
  'apim-request-id',
  '4c2d067d-2009-419e-a50c-ad28ff5b8451',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:23:41 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/3fe12716-3902-45f3-9247-c0a4dfeedff8')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"3fe12716-3902-45f3-9247-c0a4dfeedff8","modelName":"modelName162078262220001401","status":"creating","createdDateTime":"2021-05-12T01:23:42Z","lastUpdatedDateTime":"2021-05-12T01:23:42Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '3e411a4d-8de5-40b4-a7ad-2d741ab23320',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:23:41 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/3fe12716-3902-45f3-9247-c0a4dfeedff8')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"3fe12716-3902-45f3-9247-c0a4dfeedff8","modelName":"modelName162078262220001401","status":"creating","createdDateTime":"2021-05-12T01:23:42Z","lastUpdatedDateTime":"2021-05-12T01:23:42Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  'bb22bdf0-9299-4f05-9a6b-3aa07ac283e9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:23:41 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/3fe12716-3902-45f3-9247-c0a4dfeedff8')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"3fe12716-3902-45f3-9247-c0a4dfeedff8","modelName":"modelName162078262220001401","status":"creating","createdDateTime":"2021-05-12T01:23:42Z","lastUpdatedDateTime":"2021-05-12T01:23:42Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  '7df5f970-67e8-44f7-9914-dbbfe31e0073',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:23:47 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/3fe12716-3902-45f3-9247-c0a4dfeedff8')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"3fe12716-3902-45f3-9247-c0a4dfeedff8","modelName":"modelName162078262220001401","status":"creating","createdDateTime":"2021-05-12T01:23:42Z","lastUpdatedDateTime":"2021-05-12T01:23:42Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '48551498-bc5e-4470-a42c-e6c102f46553',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:23:52 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/3fe12716-3902-45f3-9247-c0a4dfeedff8')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"3fe12716-3902-45f3-9247-c0a4dfeedff8","modelName":"modelName162078262220001401","status":"ready","createdDateTime":"2021-05-12T01:23:42Z","lastUpdatedDateTime":"2021-05-12T01:23:56Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Content-Length',
  '954',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  'b3661187-9af9-4de4-a8e2-1731889b9a89',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:23:57 GMT'
]);
