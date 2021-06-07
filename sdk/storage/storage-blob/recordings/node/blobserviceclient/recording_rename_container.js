let nock = require('nock');

module.exports.hash = "a5e83045e145cab1af51b3be9bfe2e01";

module.exports.testInfo = {"uniqueName":{"container":"container161070755602305820","newcontainer":"newcontainer161070755813108842"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container161070755602305820')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Fri, 15 Jan 2021 10:45:57 GMT',
  'ETag',
  '"0x8D8B942BDFEA860"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '752f95f2-e01e-0006-032b-eb1631000000',
  'x-ms-client-request-id',
  '13396ab2-95f1-4eab-a70a-0ce949b4d9db',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Fri, 15 Jan 2021 10:45:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/newcontainer161070755813108842')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '752f95f6-e01e-0006-052b-eb1631000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  '3cd4a0e6-e293-4ad1-be01-2368c3aa5c4f',
  'Date',
  'Fri, 15 Jan 2021 10:45:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/newcontainer161070755813108842')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Fri, 15 Jan 2021 10:45:58 GMT',
  'ETag',
  '"0x8D8B942BE2B7D1C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '752f9600-e01e-0006-0a2b-eb1631000000',
  'x-ms-client-request-id',
  '1072014e-0d9e-4366-96af-9ffe8bd9d184',
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
  'Fri, 15 Jan 2021 10:45:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/newcontainer161070755813108842')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '752f9609-e01e-0006-0f2b-eb1631000000',
  'x-ms-client-request-id',
  '32a8e0c9-8c0b-4cb5-9b73-6039d8071d85',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Fri, 15 Jan 2021 10:45:58 GMT'
]);
