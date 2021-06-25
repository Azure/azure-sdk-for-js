let nock = require('nock');

module.exports.hash = "b5935ccd1f790970d86fe93b4a0414a9";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/languages', {"documents":[{"id":"0","text":"hello","countryHint":"invalidcountry"}]})
  .reply(200, {"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Country Hint.","innererror":{"code":"InvalidCountryHint","message":"Country hint is not valid. Please specify an ISO 3166-1 alpha-2 two letter country code."}}}],"modelVersion":"2021-01-05"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '2',
  'apim-request-id',
  '492bd2aa-bbe7-48ea-b38f-44c9e8a50f47',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:00:30 GMT'
]);
