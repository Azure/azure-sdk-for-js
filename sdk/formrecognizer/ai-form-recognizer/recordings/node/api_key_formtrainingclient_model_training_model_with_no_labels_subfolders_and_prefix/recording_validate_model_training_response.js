let nock = require('nock');

module.exports.hash = "8c1f0c6fb337da955d3b2a3f96436310";

module.exports.testInfo = {"uniqueName":{"3":"modelName160434062341207075"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":true},"useLabelFile":false,"modelName":"modelName160434062341207075"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/86ed5888-ce24-4634-b11a-1ec82455ca0b',
  'x-envoy-upstream-service-time',
  '49',
  'apim-request-id',
  '92c14fb6-0323-4e34-8840-f61a78ace527',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:10:23 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/86ed5888-ce24-4634-b11a-1ec82455ca0b')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"86ed5888-ce24-4634-b11a-1ec82455ca0b","modelName":"modelName160434062341207075","status":"creating","createdDateTime":"2020-11-02T18:10:23Z","lastUpdatedDateTime":"2020-11-02T18:10:23Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  '61c649ca-7d44-4baf-9124-76a5b9a39259',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:10:23 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/86ed5888-ce24-4634-b11a-1ec82455ca0b')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"86ed5888-ce24-4634-b11a-1ec82455ca0b","modelName":"modelName160434062341207075","status":"creating","createdDateTime":"2020-11-02T18:10:23Z","lastUpdatedDateTime":"2020-11-02T18:10:23Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '3c702440-7fd3-4d13-b4f0-75c0edd43231',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:10:23 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/86ed5888-ce24-4634-b11a-1ec82455ca0b')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"86ed5888-ce24-4634-b11a-1ec82455ca0b","modelName":"modelName160434062341207075","status":"creating","createdDateTime":"2020-11-02T18:10:23Z","lastUpdatedDateTime":"2020-11-02T18:10:23Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  'e16ecbad-0e71-43f5-8f70-c5d3d3ffac84',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:10:28 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/86ed5888-ce24-4634-b11a-1ec82455ca0b')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"86ed5888-ce24-4634-b11a-1ec82455ca0b","modelName":"modelName160434062341207075","status":"creating","createdDateTime":"2020-11-02T18:10:23Z","lastUpdatedDateTime":"2020-11-02T18:10:23Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  '32760d6b-0d2f-4d91-bfa8-3fd99aefd7a7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:10:33 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/86ed5888-ce24-4634-b11a-1ec82455ca0b')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"86ed5888-ce24-4634-b11a-1ec82455ca0b","modelName":"modelName160434062341207075","status":"creating","createdDateTime":"2020-11-02T18:10:23Z","lastUpdatedDateTime":"2020-11-02T18:10:23Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  'f8b2cf6b-b356-4f86-892a-15375a143e85',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:10:38 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/86ed5888-ce24-4634-b11a-1ec82455ca0b')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"86ed5888-ce24-4634-b11a-1ec82455ca0b","status":"ready","createdDateTime":"2020-11-02T18:10:23Z","lastUpdatedDateTime":"2020-11-02T18:10:39Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Ft Lauderdale, FL Phone:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"subfolder/Form_6.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  '9f9a8f08-f5f4-49b0-82a7-c9f4c32e44b0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:10:43 GMT'
]);
