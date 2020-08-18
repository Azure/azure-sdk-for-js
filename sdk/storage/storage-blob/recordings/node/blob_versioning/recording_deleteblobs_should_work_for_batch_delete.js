let nock = require('nock');

module.exports.hash = "f3924ffbb542416858b2a5df9d0271fe";

module.exports.testInfo = {"uniqueName":{"container":"container159218740931506721","blob":"blob159218740960300270"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218740931506721')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:16:49 GMT',
  'ETag',
  '"0x8D810D2293E9647"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f46e087-701e-006e-43bb-42188f000000',
  'x-ms-client-request-id',
  '6dcfe237-a65a-4dad-9217-278e642a7d6a',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 15 Jun 2020 02:16:48 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218740931506721/blob159218740960300270', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:16:49 GMT',
  'ETag',
  '"0x8D810D2296A411C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f46e15c-701e-006e-0ebb-42188f000000',
  'x-ms-client-request-id',
  'd582f000-d28e-4606-a54c-d7ec2b7570d8',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-15T02:16:49.6931100Z',
  'Date',
  'Mon, 15 Jun 2020 02:16:48 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218740931506721/blob159218740960300270')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:16:49 GMT',
  'ETag',
  '"0x8D810D229961401"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f46e25a-701e-006e-03bb-42188f000000',
  'x-ms-client-request-id',
  '0f95400a-997a-45e7-91dd-0da000ce2d48',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-15T02:16:49.9813137Z',
  'Date',
  'Mon, 15 Jun 2020 02:16:49 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159218740931506721')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f46e334-701e-006e-4cbb-42188f000000',
  'x-ms-client-request-id',
  '5e31ec86-f159-4460-b73a-edad1c387fd1',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 15 Jun 2020 02:16:49 GMT'
]);
