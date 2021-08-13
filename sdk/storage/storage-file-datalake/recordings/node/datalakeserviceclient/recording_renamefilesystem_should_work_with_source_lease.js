let nock = require('nock');

module.exports.hash = "14e248bf1d430f6602cd5c156a42b0e5";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem161121468613402397","newfilesystem":"newfilesystem161121468673509849"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem161121468613402397')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 21 Jan 2021 07:38:06 GMT',
  'ETag',
  '"0x8D8BDDF7E0AE63A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ca3e2c9-001e-000c-03c8-ef0fb8000000',
  'x-ms-client-request-id',
  '4ce71dad-790f-467c-990f-08f79ddbac24',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Thu, 21 Jan 2021 07:38:05 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem161121468613402397')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 21 Jan 2021 07:38:06 GMT',
  'ETag',
  '"0x8D8BDDF7E0AE63A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ca3e2d1-001e-000c-09c8-ef0fb8000000',
  'x-ms-client-request-id',
  'a0ed286b-729d-4c86-b825-812234fde790',
  'x-ms-version',
  '2020-04-08',
  'x-ms-lease-id',
  '8153c98e-5f45-4b3b-9571-c32b7ecb81b8',
  'Date',
  'Thu, 21 Jan 2021 07:38:06 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/newfilesystem161121468673509849')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ca3e2d4-001e-000c-0cc8-ef0fb8000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  'a1ed3a96-f405-472d-891d-f54996b9ecd5',
  'Date',
  'Thu, 21 Jan 2021 07:38:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/newfilesystem161121468673509849')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 21 Jan 2021 07:38:06 GMT',
  'ETag',
  '"0x8D8BDDF7E67C7A9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ca3e2d8-001e-000c-10c8-ef0fb8000000',
  'x-ms-client-request-id',
  'd506ffd1-1e73-438f-89fe-87554a36652f',
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
  'Thu, 21 Jan 2021 07:38:06 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/newfilesystem161121468673509849')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ca3e2db-001e-000c-12c8-ef0fb8000000',
  'x-ms-client-request-id',
  '5c01837a-acc6-40cf-bd2c-d777835fb292',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Thu, 21 Jan 2021 07:38:07 GMT'
]);
