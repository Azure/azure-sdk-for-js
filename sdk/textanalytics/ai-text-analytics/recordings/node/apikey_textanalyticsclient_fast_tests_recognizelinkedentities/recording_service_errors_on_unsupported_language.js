let nock = require('nock');

module.exports.hash = "fad55cf856722b5497b225d29f822c2b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/entities/linking', {"documents":[{"id":"0","text":"This is some text, but it doesn't matter.","language":"notalanguage"}]})
  .query(true)
  .reply(200, {"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en,es. For additional details see https://aka.ms/text-analytics/language-support?tabs=named-entity-recognition"}}}],"modelVersion":"2021-06-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '2',
  'apim-request-id',
  'c138d762-2327-4619-8d21-4bdad02da790',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:09:36 GMT'
]);
