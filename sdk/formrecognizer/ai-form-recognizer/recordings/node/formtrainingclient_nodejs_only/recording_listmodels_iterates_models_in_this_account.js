let nock = require('nock');

module.exports.hash = "c6f8adc5b62e4205754c1e8f8c30ac2a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models')
  .query(true)
  .reply(200, {"modelList":[{"modelId":"a48175f5-15d3-4316-b057-616c8006b3fb","status":"creating","createdDateTime":"2020-08-21T16:24:37Z","lastUpdatedDateTime":"2020-08-21T16:24:37Z"}],"nextLink":""}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '7e6d32ec-cb37-41e6-9ff7-62a947dac69f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 16:43:40 GMT'
]);
