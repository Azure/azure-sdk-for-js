let nock = require('nock');

module.exports.hash = "7b6ab81851eb58d7d3f44dec3a2ccf39";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/documentModels/modelName164373411918807673')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '117',
  'apim-request-id',
  '380f4bab-b023-4c1e-9f62-3f4be9a1040e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Feb 2022 16:48:55 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/documentModels/modelName164373411918807673')
  .query(true)
  .reply(404, {"error":{"code":"NotFound","message":"Resource not found.","innererror":{"code":"ModelNotFound","message":"The requested model was not found."}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'x-envoy-upstream-service-time',
  '52',
  'apim-request-id',
  '2cb0a199-65ae-475c-a83c-f09d9a8921ef',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Feb 2022 16:48:55 GMT'
]);
