let nock = require('nock');

module.exports.hash = "5d1a030d2dace79c305671b92082a4a8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/custom/models/7ba0a695-b76d-42b8-8bfa-7276059b6c03')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"7ba0a695-b76d-42b8-8bfa-7276059b6c03","status":"ready","createdDateTime":"2020-05-02T06:36:42Z","lastUpdatedDateTime":"2020-05-02T06:36:51Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Address:","Company Name:","Company Phone:","Dated As:","Email:","Hero Limited","Name:","Phone:","Phone:","Purchase Order","Purchase Order","Purchase Order #:","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"subfolder/Form_6.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '5056',
  'apim-request-id',
  '0538152e-edc3-484e-a281-4f4666ff5ffe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 06:37:10 GMT'
]);
