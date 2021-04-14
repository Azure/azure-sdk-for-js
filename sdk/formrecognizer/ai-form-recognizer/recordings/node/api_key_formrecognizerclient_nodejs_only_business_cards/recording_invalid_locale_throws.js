let nock = require('nock');

module.exports.hash = "4b7a28478b39a66897ea7ca47ed16eb5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.3/prebuilt/receipt/analyze', {"source":"https://storageaccount/testingdata/businessCard.jpg?sastoken"})
  .query(true)
  .reply(400, {"error":{"code":"UnsupportedLocale","innerError":{"requestId":"8f264dd7-1833-4158-8480-2dd9091c4e96"},"message":"Locale unsupported. Supported locales include en-AU, en-CA, en-GB, en-IN and en-US."}}, [
  'Content-Length',
  '200',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '581',
  'apim-request-id',
  '8f264dd7-1833-4158-8480-2dd9091c4e96',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:18:39 GMT'
]);
