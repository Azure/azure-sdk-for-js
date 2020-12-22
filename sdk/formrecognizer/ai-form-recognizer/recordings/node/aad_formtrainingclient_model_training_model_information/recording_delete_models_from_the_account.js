let nock = require('nock');

module.exports.hash = "98aacaa3c4cd6e8a687856c9c25251f3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  'e983f489-39bb-4463-9b91-f754ab6a2500',
  'x-ms-ests-server',
  '2.1.11251.20 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AmVLMPVikaBDsUPNxUf9UcTGLH8mAQAAAA1AStcOAAAA; expires=Sun, 20-Dec-2020 22:54:06 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 22:54:05 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1-preview.2/custom/models/c01ea28a-8731-4262-b2cd-ef75057a8e4e')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  '0287fb63-fb1b-43a5-ab46-015a2ca96254',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:54:05 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1-preview.2/custom/models/323be9ed-dbc2-4309-a3f7-e13c72aa8203')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '47',
  'apim-request-id',
  '7ed4d857-2c42-4ad6-ac12-2132a2ed9fb7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:54:06 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1-preview.2/custom/models/9327203f-7648-4ebe-851c-630c82d8485f')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  'c1feda4c-48e3-4f51-8a6a-65ccbc34218a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:54:06 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1-preview.2/custom/models/ee77b711-af30-4e5b-9db4-4d90cd3e3362')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '60',
  'apim-request-id',
  '1f58baa6-7ebd-40ba-9981-64774d8dde9f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:54:06 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1-preview.2/custom/models/09d65ded-18c8-4ce6-b3d0-a1a87919f199')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '99',
  'apim-request-id',
  'a874a733-e0d0-4d26-b587-59f53d3d0642',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:54:06 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1-preview.2/custom/models/07809340-33cb-4b2f-a155-48980a95b0a9')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '87',
  'apim-request-id',
  '2b761e0d-9b26-4675-9c97-4b1b2841415f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:54:06 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/9327203f-7648-4ebe-851c-630c82d8485f')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=9327203f-7648-4ebe-851c-630c82d8485f' not found."}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '24',
  'apim-request-id',
  '07ac4bae-1e8b-4dec-8850-817a71c23a28',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:54:05 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/ee77b711-af30-4e5b-9db4-4d90cd3e3362')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=ee77b711-af30-4e5b-9db4-4d90cd3e3362' not found."}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  'fab1f06b-3ef9-442a-bb81-48c8385a29c2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:54:06 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/07809340-33cb-4b2f-a155-48980a95b0a9')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=07809340-33cb-4b2f-a155-48980a95b0a9' not found."}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  '92b36b62-a6a4-42a2-8de2-e4684fec4da1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:54:06 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/09d65ded-18c8-4ce6-b3d0-a1a87919f199')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=09d65ded-18c8-4ce6-b3d0-a1a87919f199' not found."}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '60',
  'apim-request-id',
  '9ed3ccef-b3ba-457d-86f5-16151e8749fb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:54:06 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/c01ea28a-8731-4262-b2cd-ef75057a8e4e')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=c01ea28a-8731-4262-b2cd-ef75057a8e4e' not found."}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '53',
  'apim-request-id',
  '08b62317-c85a-4bff-ba39-8ac2a30d24a4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:54:06 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/323be9ed-dbc2-4309-a3f7-e13c72aa8203')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=323be9ed-dbc2-4309-a3f7-e13c72aa8203' not found."}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  '30674a4e-0fb9-4101-b26f-eacf640ebb6c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:54:06 GMT'
]);
