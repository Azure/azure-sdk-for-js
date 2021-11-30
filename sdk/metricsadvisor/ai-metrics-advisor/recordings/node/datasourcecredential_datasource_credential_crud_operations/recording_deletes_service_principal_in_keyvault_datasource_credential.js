let nock = require('nock');

module.exports.hash = "44a5fcea9bd5ac23896f5b38bbf86c7e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/credentials/f08830ff-ef02-481d-a697-8cc1b8610ee2')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '00e5b457-044d-4886-a4a4-11243ad9b46c',
  'x-envoy-upstream-service-time',
  '116',
  'apim-request-id',
  '00e5b457-044d-4886-a4a4-11243ad9b46c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:41 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/f08830ff-ef02-481d-a697-8cc1b8610ee2')
  .reply(404, {"code":"404 NOT_FOUND","message":"credentialId is invalid."}, [
  'Content-Length',
  '61',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '484ed1ae-24e0-4605-a237-8e8781b45418',
  'x-envoy-upstream-service-time',
  '111',
  'apim-request-id',
  '484ed1ae-24e0-4605-a237-8e8781b45418',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:41 GMT'
]);
