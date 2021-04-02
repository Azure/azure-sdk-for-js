let nock = require('nock');

module.exports.hash = "98aacaa3c4cd6e8a687856c9c25251f3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1-preview.2/custom/models/992346fd-ed27-4d79-931a-0635136495e0')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '27',
  'apim-request-id',
  'f7fe2790-7df3-4c61-aa0e-75390cc2d88d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:29:16 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1-preview.2/custom/models/bd8ef335-78bf-4871-9869-61aea800efda')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '23',
  'apim-request-id',
  '07817872-5973-47d0-a140-e5e71ba89ffc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:29:15 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1-preview.2/custom/models/02c173df-4900-4259-a8f9-c049ff2a8d81')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  '4e552488-a789-41fa-ac87-5fa8e5d005db',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:29:16 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1-preview.2/custom/models/bb1db6bb-ac45-4b83-bb09-93af97238e69')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '23',
  'apim-request-id',
  '8298c4f9-a470-40b0-9901-fb5a0b03d31a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:29:16 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1-preview.2/custom/models/d68509d8-68a3-4d32-9b8d-5a12df5eb8ec')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '24',
  'apim-request-id',
  'e3e307cb-c33a-4f89-b666-46830ace626e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:29:15 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1-preview.2/custom/models/662ce68e-5eb8-4d34-b234-5a3f54c0b4c5')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '188',
  'apim-request-id',
  '74b605d0-9027-4ede-8eb6-9fce36d64205',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:29:16 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/992346fd-ed27-4d79-931a-0635136495e0')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=992346fd-ed27-4d79-931a-0635136495e0' not found."}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  'b1e46caa-504c-4aa4-9dea-9d5c79317839',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:29:16 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/02c173df-4900-4259-a8f9-c049ff2a8d81')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=02c173df-4900-4259-a8f9-c049ff2a8d81' not found."}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '01fa1ac7-3a4e-468f-b131-00a9628334e9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:29:16 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/662ce68e-5eb8-4d34-b234-5a3f54c0b4c5')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=662ce68e-5eb8-4d34-b234-5a3f54c0b4c5' not found."}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '106004f2-98ed-4c26-9afd-89b1a1f2e339',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:29:16 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/bb1db6bb-ac45-4b83-bb09-93af97238e69')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=bb1db6bb-ac45-4b83-bb09-93af97238e69' not found."}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '6829a8ae-a0c2-4af3-90b2-a575e1224cd6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:29:16 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/d68509d8-68a3-4d32-9b8d-5a12df5eb8ec')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=d68509d8-68a3-4d32-9b8d-5a12df5eb8ec' not found."}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  'fd3af3a5-2039-4e16-8369-e9adacf236f1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:29:16 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/bd8ef335-78bf-4871-9869-61aea800efda')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=bd8ef335-78bf-4871-9869-61aea800efda' not found."}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  '5aac2110-28ed-4543-96be-1c279c2b0673',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:29:16 GMT'
]);
