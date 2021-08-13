let nock = require('nock');

module.exports.hash = "4177495e96b374c7026334f735767060";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem161121468340907965","newfilesystem":"newfilesystem161121468521002300"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem161121468340907965')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 21 Jan 2021 07:38:05 GMT',
  'ETag',
  '"0x8D8BDDF7D4A0B46"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ca3e2a4-001e-000c-6fc8-ef0fb8000000',
  'x-ms-client-request-id',
  '7f22a6e2-5a7b-43ae-9a2c-827c5fc6a555',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Thu, 21 Jan 2021 07:38:04 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/newfilesystem161121468521002300')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ca3e2aa-001e-000c-72c8-ef0fb8000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  'c7c6f4fb-6fd8-456e-b427-d422ac20c44e',
  'Date',
  'Thu, 21 Jan 2021 07:38:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/newfilesystem161121468521002300')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 21 Jan 2021 07:38:05 GMT',
  'ETag',
  '"0x8D8BDDF7D7EC685"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ca3e2b0-001e-000c-76c8-ef0fb8000000',
  'x-ms-client-request-id',
  '82f70f29-b28b-4212-84ac-5aa6da38d5fc',
  'x-ms-version',
  '2020-04-08',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-has-immutability-policy',
  'false',
  'x-ms-has-legal-hold',
  'false',
  'x-ms-default-encryption-scope',
  '$account-encryption-key',
  'x-ms-deny-encryption-scope-override',
  'false',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-lease-status,x-ms-lease-state,x-ms-has-immutability-policy,x-ms-has-legal-hold,x-ms-default-encryption-scope,x-ms-deny-encryption-scope-override',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 21 Jan 2021 07:38:05 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/newfilesystem161121468521002300')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ca3e2b9-001e-000c-7bc8-ef0fb8000000',
  'x-ms-client-request-id',
  '990824cf-03b6-41f1-9e84-55cec89c4d3b',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Thu, 21 Jan 2021 07:38:05 GMT'
]);
