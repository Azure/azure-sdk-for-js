let nock = require('nock');

module.exports.hash = "e978e119647af339523ff4e1a918c659";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.3/prebuilt/receipt/analyze', {"source":"https://storageaccount/testingdata/contoso-allinone.jpg?sastoken"})
  .query(true)
  .reply(400, {"error":{"code":"UnsupportedLocale","innerError":{"requestId":"00b60a41-0fd6-4f04-9f29-94707786b468"},"message":"Locale unsupported. Supported locales include en-AU, en-CA, en-GB, en-IN and en-US."}}, [
  'Content-Length',
  '200',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '699',
  'apim-request-id',
  '00b60a41-0fd6-4f04-9f29-94707786b468',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:18:17 GMT'
]);
