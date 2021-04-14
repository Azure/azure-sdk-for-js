let nock = require('nock');

module.exports.hash = "98aacaa3c4cd6e8a687856c9c25251f3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1-preview.3/custom/models/3a97a25c-aa72-4512-93da-766c2e504b2b')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  'ff6a7d22-9aaf-4c35-b8da-e80abee5b108',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:13:46 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1-preview.3/custom/models/542bd102-93ad-4a08-a51d-aac779db0474')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  '1d7dab73-963e-4307-9eea-58571944a6c2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:13:46 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1-preview.3/custom/models/ba53ea34-a14a-40c5-87bc-83b6144528c6')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  'd4685d17-44bb-49cc-b6f0-490c60f1faea',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:13:46 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1-preview.3/custom/models/19289163-d697-4dcb-9ca6-0ee36e398c03')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '45',
  'apim-request-id',
  '0d0aea30-134b-493e-860d-2e9451352055',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:13:46 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1-preview.3/custom/models/4c98fec3-1a50-4643-ada6-c0abf3a2f2d1')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  '88a16c7c-0085-45c8-a0ed-1c37f9789841',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:13:46 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1-preview.3/custom/models/b51b10a5-d01d-49d1-a7f5-da824c25a59e')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '133',
  'apim-request-id',
  'abd381bc-1b4a-4062-b363-46b0155b2429',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:13:47 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/3a97a25c-aa72-4512-93da-766c2e504b2b')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=3a97a25c-aa72-4512-93da-766c2e504b2b' not found."}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '7c99adcb-31cc-4265-8ce6-23662591c14a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:13:47 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/542bd102-93ad-4a08-a51d-aac779db0474')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=542bd102-93ad-4a08-a51d-aac779db0474' not found."}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  '9b4123bb-87cd-4b18-a389-a3980c63498e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:13:47 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/4c98fec3-1a50-4643-ada6-c0abf3a2f2d1')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=4c98fec3-1a50-4643-ada6-c0abf3a2f2d1' not found."}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '21',
  'apim-request-id',
  '3c5fbf9f-8f86-4366-91fe-9eb3bacbfe9f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:13:47 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/b51b10a5-d01d-49d1-a7f5-da824c25a59e')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=b51b10a5-d01d-49d1-a7f5-da824c25a59e' not found."}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '22',
  'apim-request-id',
  '00c8cca3-0a6d-4ebf-a222-da8227450384',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:13:47 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/ba53ea34-a14a-40c5-87bc-83b6144528c6')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=ba53ea34-a14a-40c5-87bc-83b6144528c6' not found."}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '29',
  'apim-request-id',
  '0a7d0758-19c6-4de4-9112-2a290c8b6407',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:13:47 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models/19289163-d697-4dcb-9ca6-0ee36e398c03')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=19289163-d697-4dcb-9ca6-0ee36e398c03' not found."}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '64',
  'apim-request-id',
  '23b55bc0-93ff-4909-8dff-4f3a1fbcf9cf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 30 Mar 2021 23:13:47 GMT'
]);
