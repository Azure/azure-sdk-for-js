let nock = require('nock');

module.exports.hash = "6ad0a28cbebf4779e48a68feffee3534";

module.exports.testInfo = {"uniqueName":{"container":"container163256836424707779","blob":"blob163256836556201916"},"newDate":{"tmr":"2021-09-25T11:12:46.106Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163256836424707779')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 25 Sep 2021 11:12:45 GMT',
  'ETag',
  '"0x8D9801566BAA90A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '32811714-201e-006e-23fe-b18fed000000',
  'x-ms-client-request-id',
  'c7ffccd8-f72b-4ea0-9b2d-dab2e84474e1',
  'x-ms-version',
  '2020-12-06',
  'Date',
  'Sat, 25 Sep 2021 11:12:45 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163256836424707779/blob163256836556201916', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sat, 25 Sep 2021 11:12:45 GMT',
  'ETag',
  '"0x8D9801566E5F9AC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '328117a2-201e-006e-1efe-b18fed000000',
  'x-ms-client-request-id',
  'fc6ac2ca-61fb-4339-8cd3-0a52722ec638',
  'x-ms-version',
  '2020-12-06',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2021-09-25T11:12:45.8652076Z',
  'Date',
  'Sat, 25 Sep 2021 11:12:45 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163256836424707779/blob163256836556201916')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Sat, 25 Sep 2021 11:12:46 GMT',
  'ETag',
  '"0x8D98015670EFF81"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3281180e-201e-006e-7efe-b18fed000000',
  'x-ms-client-request-id',
  'd3cc8dc6-242a-454c-9975-8a9b3f1fa095',
  'x-ms-version',
  '2020-12-06',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2021-09-25T11:12:46.1350545Z',
  'Date',
  'Sat, 25 Sep 2021 11:12:46 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container163256836424707779/blob163256836556201916')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sat, 25 Sep 2021 11:12:45 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D9801566E5F9AC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '32811894-201e-006e-72fe-b18fed000000',
  'x-ms-client-request-id',
  '3dab889f-6b8f-4d9b-b3b6-7d05977353fa',
  'x-ms-version',
  '2020-12-06',
  'x-ms-version-id',
  '2021-09-25T11:12:45.8652076Z',
  'x-ms-creation-time',
  'Sat, 25 Sep 2021 11:12:45 GMT',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sat, 25 Sep 2021 11:12:46 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163256836424707779/blob163256836556201916')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '32811907-201e-006e-58fe-b18fed000000',
  'x-ms-client-request-id',
  '127a13d5-28b6-463c-968b-d6128a658029',
  'x-ms-version',
  '2020-12-06',
  'x-ms-delete-type-permanent',
  'true',
  'Date',
  'Sat, 25 Sep 2021 11:12:46 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container163256836424707779/blob163256836556201916')
  .query(true)
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '32811950-201e-006e-14fe-b18fed000000',
  'x-ms-client-request-id',
  '40cf7ea4-2e91-433f-8b15-ad2b91ab4e14',
  'x-ms-version',
  '2020-12-06',
  'x-ms-error-code',
  'BlobNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sat, 25 Sep 2021 11:12:46 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container163256836424707779/blob163256836556201916')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Sat, 25 Sep 2021 11:12:46 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D98015670EFF81"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '328119a5-201e-006e-57fe-b18fed000000',
  'x-ms-client-request-id',
  '622b2a9c-6c5b-4c5b-a597-41fefbf92f89',
  'x-ms-version',
  '2020-12-06',
  'x-ms-version-id',
  '2021-09-25T11:12:46.1350545Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Sat, 25 Sep 2021 11:12:46 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'x-ms-last-access-time',
  'Sat, 25 Sep 2021 11:12:46 GMT',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-last-access-time,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sat, 25 Sep 2021 11:12:47 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163256836424707779')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '32811a0b-201e-006e-2ffe-b18fed000000',
  'x-ms-client-request-id',
  '08078bde-e4f3-49fc-b1e8-a81471b7a96a',
  'x-ms-version',
  '2020-12-06',
  'Date',
  'Sat, 25 Sep 2021 11:12:47 GMT'
]);
