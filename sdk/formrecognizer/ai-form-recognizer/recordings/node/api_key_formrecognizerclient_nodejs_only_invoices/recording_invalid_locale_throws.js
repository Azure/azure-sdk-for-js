let nock = require('nock');

module.exports.hash = "63ccfddb6fa59ed596ee7d1935cdc2b1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.2/prebuilt/invoice/analyze', {"source":"https://storageaccount/testingdata/Invoice_1.pdf?sastoken"})
  .query(true)
  .reply(400, {"error":{"code":"UnsupportedLocale","innerError":{"requestId":"34e3e199-590e-4a78-b3c2-df3498f55943"},"message":"Locale unsupported. Supported locale includes en-US."}}, [
  'Content-Length',
  '169',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '718',
  'apim-request-id',
  '34e3e199-590e-4a78-b3c2-df3498f55943',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 16 Nov 2020 22:43:24 GMT'
]);
