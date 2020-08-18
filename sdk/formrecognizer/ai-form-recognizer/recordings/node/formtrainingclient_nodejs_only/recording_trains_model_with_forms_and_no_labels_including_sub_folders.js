let nock = require('nock');

module.exports.hash = "e08a7044ada52880b079cc16bc1f55f2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.0/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":true},"useLabelFile":false})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.0/custom/models/52668b65-a619-42d0-bc3d-504b1df7124e',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  '09ca870a-cc92-47da-b08f-be6c96e175da',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 18 Aug 2020 18:47:15 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models/52668b65-a619-42d0-bc3d-504b1df7124e')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"52668b65-a619-42d0-bc3d-504b1df7124e","status":"creating","createdDateTime":"2020-08-18T18:47:16Z","lastUpdatedDateTime":"2020-08-18T18:47:16Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '7331dc95-1001-4dfe-830c-7db4b53e9598',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 18 Aug 2020 18:47:15 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models/52668b65-a619-42d0-bc3d-504b1df7124e')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"52668b65-a619-42d0-bc3d-504b1df7124e","status":"creating","createdDateTime":"2020-08-18T18:47:16Z","lastUpdatedDateTime":"2020-08-18T18:47:16Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '21',
  'apim-request-id',
  'ce983204-fe2e-4342-b111-3f91a8760123',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 18 Aug 2020 18:47:15 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models/52668b65-a619-42d0-bc3d-504b1df7124e')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"52668b65-a619-42d0-bc3d-504b1df7124e","status":"creating","createdDateTime":"2020-08-18T18:47:16Z","lastUpdatedDateTime":"2020-08-18T18:47:16Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '21',
  'apim-request-id',
  'cd0a1b2e-10ec-419b-b88e-4c7f64452b9d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 18 Aug 2020 18:47:21 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models/52668b65-a619-42d0-bc3d-504b1df7124e')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"52668b65-a619-42d0-bc3d-504b1df7124e","status":"creating","createdDateTime":"2020-08-18T18:47:16Z","lastUpdatedDateTime":"2020-08-18T18:47:16Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '7d6546c1-6a3e-45d4-b67f-b16ac2a82394',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 18 Aug 2020 18:47:26 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models/52668b65-a619-42d0-bc3d-504b1df7124e')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"52668b65-a619-42d0-bc3d-504b1df7124e","status":"ready","createdDateTime":"2020-08-18T18:47:16Z","lastUpdatedDateTime":"2020-08-18T18:47:28Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"subfolder/Form_6.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  '8fc951f5-286c-428c-86be-69e9c44f681e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 18 Aug 2020 18:47:31 GMT'
]);
