let nock = require('nock');

module.exports.hash = "8c94fa8da2c7dc61a44b79f6f91a3472";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/sentiment', {"documents":[{"id":"0","text":"Hello world!","language":"notalanguage"}]})
  .query(true)
  .reply(200, {"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: de,en,es,fr,hi,it,ja,ko,nl,no,pt-BR,pt-PT,tr,zh-Hans,zh-Hant. For additional details see https://aka.ms/text-analytics/language-support?tabs=sentiment-analysis"}}}],"modelVersion":"2020-04-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '3',
  'apim-request-id',
  'b2697f9d-10ad-4737-9dc9-84719148ebc2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:45:55 GMT'
]);
