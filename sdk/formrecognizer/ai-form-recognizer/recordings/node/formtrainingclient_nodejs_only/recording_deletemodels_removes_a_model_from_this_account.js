let nock = require('nock');

module.exports.hash = "8232f19e9921a14456cba8aae18c6094";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1-preview.1/custom/models/6cbed01d-0235-4a16-9842-aea3706bbd9a')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '29',
  'apim-request-id',
  '57f46993-7244-4c4c-94ea-9cc19385c052',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 21 Oct 2020 18:08:49 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/6cbed01d-0235-4a16-9842-aea3706bbd9a')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=6cbed01d-0235-4a16-9842-aea3706bbd9a' not found."}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '9c149657-5211-4d1c-8ffa-429cb06031be',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 21 Oct 2020 18:08:49 GMT'
]);
