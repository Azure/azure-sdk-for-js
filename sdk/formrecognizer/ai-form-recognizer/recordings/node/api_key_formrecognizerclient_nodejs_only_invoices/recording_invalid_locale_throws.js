let nock = require('nock');

module.exports.hash = "f9b0af32960e667684cf291afd8cedb2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1/prebuilt/invoice/analyze', {"source":"https://storageaccount/testingdata/Invoice_1.pdf?sastoken"})
  .query(true)
  .reply(400, {"error":{"code":"UnsupportedLocale","innerError":{"requestId":"ff4df504-5827-46d1-bcc2-2ac484cd277d"},"message":"Locale unsupported. Supported locale includes en-US."}}, [
  'Content-Length',
  '169',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '227',
  'apim-request-id',
  'ff4df504-5827-46d1-bcc2-2ac484cd277d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:28:49 GMT'
]);
