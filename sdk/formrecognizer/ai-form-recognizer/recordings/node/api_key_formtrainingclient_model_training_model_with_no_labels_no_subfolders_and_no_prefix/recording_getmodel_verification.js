let nock = require('nock');

module.exports.hash = "8bb8cd761eb5b67ad00e62a47892af59";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/ccfa295d-de40-44bb-8166-039a37b2d8ab')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"ccfa295d-de40-44bb-8166-039a37b2d8ab","status":"ready","createdDateTime":"2020-11-02T18:12:02Z","lastUpdatedDateTime":"2020-11-02T18:12:16Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Ft Lauderdale, FL Phone:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '24',
  'apim-request-id',
  'e0f76868-d2df-4bbd-af92-cbc58f9e1617',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:12:17 GMT'
]);
