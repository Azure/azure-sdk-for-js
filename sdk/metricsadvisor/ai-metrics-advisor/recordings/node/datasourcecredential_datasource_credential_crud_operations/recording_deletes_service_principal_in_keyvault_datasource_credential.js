let nock = require('nock');

module.exports.hash = "44a5fcea9bd5ac23896f5b38bbf86c7e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/credentials/ec72ea83-4884-4e83-b23f-2f5ba5ea9786')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '1bd8ea49-433b-4030-a89a-78f5c5459843',
  'x-envoy-upstream-service-time',
  '114',
  'apim-request-id',
  '1bd8ea49-433b-4030-a89a-78f5c5459843',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:33 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/ec72ea83-4884-4e83-b23f-2f5ba5ea9786')
  .reply(404, {"code":"404 NOT_FOUND","message":"credentialId is invalid."}, [
  'Content-Length',
  '61',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '692ab78a-9ded-40a3-936a-1fea83ad3cdf',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  '692ab78a-9ded-40a3-936a-1fea83ad3cdf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:34 GMT'
]);
