let nock = require('nock');

module.exports.hash = "9d587ab532c5e0d032ecbf90067a4d6b";

module.exports.testInfo = {"uniqueName":{"container":"container163230261107903085","blob":"blob163230261136106627"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163230261107903085')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 22 Sep 2021 09:23:31 GMT',
  'ETag',
  '"0x8D97DAAA509BC85"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8e7a4896-f01e-0052-6c93-afa62a000000',
  'x-ms-client-request-id',
  '589046bf-593b-44af-ad93-ca083a396d36',
  'x-ms-version',
  '2020-12-06',
  'Date',
  'Wed, 22 Sep 2021 09:23:31 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163230261107903085/blob163230261136106627', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 22 Sep 2021 09:23:31 GMT',
  'ETag',
  '"0x8D97DAAA535432F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8e7a48c6-f01e-0052-1493-afa62a000000',
  'x-ms-client-request-id',
  '5e79eb31-86ed-4655-b9c9-960d492abb64',
  'x-ms-version',
  '2020-12-06',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2021-09-22T09:23:31.9279407Z',
  'Date',
  'Wed, 22 Sep 2021 09:23:31 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163230261107903085/blob163230261136106627')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Wed, 22 Sep 2021 09:23:32 GMT',
  'ETag',
  '"0x8D97DAAA55E4908"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8e7a48fd-f01e-0052-4393-afa62a000000',
  'x-ms-client-request-id',
  '23ec8b7f-ab78-44fe-9e64-bb03cf1c5261',
  'x-ms-version',
  '2020-12-06',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2021-09-22T09:23:32.1977880Z',
  'Date',
  'Wed, 22 Sep 2021 09:23:31 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163230261107903085/blob163230261136106627')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8e7a4925-f01e-0052-6393-afa62a000000',
  'x-ms-client-request-id',
  '3860e7e1-cd11-4c39-9763-e7fd85b87442',
  'x-ms-version',
  '2020-12-06',
  'x-ms-delete-type-permanent',
  'true',
  'Date',
  'Wed, 22 Sep 2021 09:23:32 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163230261107903085')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8e7a4953-f01e-0052-0293-afa62a000000',
  'x-ms-client-request-id',
  'dc0d63be-14d0-48e9-aece-a3b75a427751',
  'x-ms-version',
  '2020-12-06',
  'Date',
  'Wed, 22 Sep 2021 09:23:32 GMT'
]);
