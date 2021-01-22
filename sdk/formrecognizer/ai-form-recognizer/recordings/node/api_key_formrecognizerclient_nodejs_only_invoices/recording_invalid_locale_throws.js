let nock = require('nock');

module.exports.hash = "63ccfddb6fa59ed596ee7d1935cdc2b1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.2/prebuilt/invoice/analyze', {"source":"https://storageaccount/testingdata/Invoice_1.pdf?sastoken"})
  .query(true)
  .reply(400, {"error":{"code":"UnsupportedLocale","innerError":{"requestId":"4dc66be6-c220-4ff8-abfd-4b46dabebc24"},"message":"Locale unsupported. Supported locale includes en-US."}}, [
  'Content-Length',
  '169',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '517',
  'apim-request-id',
  '4dc66be6-c220-4ff8-abfd-4b46dabebc24',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 19 Nov 2020 15:50:44 GMT'
]);
