let nock = require('nock');

module.exports.hash = "ab91690f5ef35c8898e38f3c835cbc21";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/entities/recognition/pii', {"documents":[]})
  .query(true)
  .reply(400, {"error":{"code":"InvalidRequest","message":"Invalid Request.","innererror":{"code":"MissingInputRecords","message":"Missing input records."}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '5',
  'apim-request-id',
  'ee206b1a-bc4b-429f-bad0-5d1ff745ef3a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:00:39 GMT'
]);
