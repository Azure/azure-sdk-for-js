let nock = require('nock');

module.exports.hash = "98aacaa3c4cd6e8a687856c9c25251f3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1/custom/models/c7218fa6-05b6-4d7c-bf60-8929eb8fc1c6')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '24',
  'apim-request-id',
  'e726cfdf-6a1f-48cf-aa38-8ffd281f2e7a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:09:43 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1/custom/models/ddb0dd82-f2ca-4be6-8bc2-bdb7278589fb')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '23',
  'apim-request-id',
  'c4d02a22-1263-46d6-b8ff-6f99ee8859a4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:09:44 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1/custom/models/a3877e0d-44cc-425f-8273-6cec3180018f')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '30',
  'apim-request-id',
  '1f9d7fd8-ae58-4163-9dca-f2f86838b1ce',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:09:44 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1/custom/models/3e9469cc-a370-4d59-98df-e03c58a9f259')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '25',
  'apim-request-id',
  'a15ffffc-e361-4492-8f29-966cd4eee647',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:09:44 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1/custom/models/f053fea9-e6e3-4758-8213-23a10bfe53c0')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '26',
  'apim-request-id',
  'f2d23528-14f9-4822-a002-293ec9db5a90',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:09:44 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1/custom/models/ac414e79-56f7-4153-a6ee-30814fd2f9e9')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '22',
  'apim-request-id',
  '5208167e-e1ac-4636-bc01-0df16a50b001',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:09:44 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/c7218fa6-05b6-4d7c-bf60-8929eb8fc1c6')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=c7218fa6-05b6-4d7c-bf60-8929eb8fc1c6' not found."}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  'e6a3ff39-5dd0-4cdb-a8b2-1af1b956dfe0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:09:44 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/ac414e79-56f7-4153-a6ee-30814fd2f9e9')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=ac414e79-56f7-4153-a6ee-30814fd2f9e9' not found."}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '5239bec4-0c02-4c34-85c5-3a7cb63c555d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:09:44 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/a3877e0d-44cc-425f-8273-6cec3180018f')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=a3877e0d-44cc-425f-8273-6cec3180018f' not found."}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '81',
  'apim-request-id',
  'ba150fc3-5d65-40eb-8166-bf94702f70f3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:09:44 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/f053fea9-e6e3-4758-8213-23a10bfe53c0')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=f053fea9-e6e3-4758-8213-23a10bfe53c0' not found."}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  '7fe9fcd0-bd66-4a85-b8f4-a5eb32d6a69c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:09:44 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/ddb0dd82-f2ca-4be6-8bc2-bdb7278589fb')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=ddb0dd82-f2ca-4be6-8bc2-bdb7278589fb' not found."}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  'd81a0a52-a2f1-4b5d-a5b4-a2126cc354b6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:09:44 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/3e9469cc-a370-4d59-98df-e03c58a9f259')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=3e9469cc-a370-4d59-98df-e03c58a9f259' not found."}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '80b1390e-47b1-4f86-b420-5c385cf22915',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:09:44 GMT'
]);
