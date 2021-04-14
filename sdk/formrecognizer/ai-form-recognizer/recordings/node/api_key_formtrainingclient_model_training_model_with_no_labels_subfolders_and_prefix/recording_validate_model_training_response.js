let nock = require('nock');

module.exports.hash = "cf906e870ff3c40c0091416016a3efe0";

module.exports.testInfo = {"uniqueName":{"3":"modelName161714588670200901"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.3/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":true},"useLabelFile":false,"modelName":"modelName161714588670200901"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.3/custom/models/ba53ea34-a14a-40c5-87bc-83b6144528c6',
  'x-envoy-upstream-service-time',
  '250',
  'apim-request-id',
  '89130167-7248-4c0b-8265-9a1ccd918c0c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:11:26 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/ba53ea34-a14a-40c5-87bc-83b6144528c6')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"ba53ea34-a14a-40c5-87bc-83b6144528c6","modelName":"modelName161714588670200901","status":"creating","createdDateTime":"2021-03-30T23:11:26Z","lastUpdatedDateTime":"2021-03-30T23:11:26Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  '37b3ecb1-a996-4663-8242-d7910eecaee7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:11:26 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/ba53ea34-a14a-40c5-87bc-83b6144528c6')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"ba53ea34-a14a-40c5-87bc-83b6144528c6","modelName":"modelName161714588670200901","status":"creating","createdDateTime":"2021-03-30T23:11:26Z","lastUpdatedDateTime":"2021-03-30T23:11:26Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  'f13bf305-a285-4cd2-8011-5012673fbb15',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:11:26 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/ba53ea34-a14a-40c5-87bc-83b6144528c6')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"ba53ea34-a14a-40c5-87bc-83b6144528c6","modelName":"modelName161714588670200901","status":"creating","createdDateTime":"2021-03-30T23:11:26Z","lastUpdatedDateTime":"2021-03-30T23:11:26Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '7daa25cd-7841-4e44-ad65-067323ff3fc3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:11:32 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/ba53ea34-a14a-40c5-87bc-83b6144528c6')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"ba53ea34-a14a-40c5-87bc-83b6144528c6","modelName":"modelName161714588670200901","status":"creating","createdDateTime":"2021-03-30T23:11:26Z","lastUpdatedDateTime":"2021-03-30T23:11:26Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  '46b1dd95-a98b-4ec7-bb8e-e00c33af109d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:11:37 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/ba53ea34-a14a-40c5-87bc-83b6144528c6')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"ba53ea34-a14a-40c5-87bc-83b6144528c6","modelName":"modelName161714588670200901","status":"creating","createdDateTime":"2021-03-30T23:11:26Z","lastUpdatedDateTime":"2021-03-30T23:11:26Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  '4deb0505-a04b-4ebb-91e3-51d8e25a2e53',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:11:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/ba53ea34-a14a-40c5-87bc-83b6144528c6')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"ba53ea34-a14a-40c5-87bc-83b6144528c6","modelName":"modelName161714588670200901","status":"ready","createdDateTime":"2021-03-30T23:11:26Z","lastUpdatedDateTime":"2021-03-30T23:11:45Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"subfolder/Form_6.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Content-Length',
  '1037',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '22',
  'apim-request-id',
  '206c7a96-b364-4480-b95d-0879ea67c959',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:11:47 GMT'
]);
