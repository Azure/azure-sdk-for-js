let nock = require('nock');

module.exports.hash = "7c0111a7cb8e47c7f98611b4a04dcb71";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/d3cc7368-a46c-4486-bcb8-b8f352262b77')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'd218c70e-19d0-4e38-9c74-bcab97332f76',
  'x-envoy-upstream-service-time',
  '235',
  'apim-request-id',
  'd218c70e-19d0-4e38-9c74-bcab97332f76',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 20 Oct 2020 22:50:39 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/d3cc7368-a46c-4486-bcb8-b8f352262b77')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'b391344e-ba3c-4442-8daf-d949948d65f8',
  'x-envoy-upstream-service-time',
  '53',
  'apim-request-id',
  'b391344e-ba3c-4442-8daf-d949948d65f8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 20 Oct 2020 22:50:39 GMT',
  'Connection',
  'close'
]);
