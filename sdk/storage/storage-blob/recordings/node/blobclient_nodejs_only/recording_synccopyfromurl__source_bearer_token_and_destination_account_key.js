let nock = require('nock');

module.exports.hash = "48e1fb673022ef39ea0cab082f7b791d";

module.exports.testInfo = {"uniqueName":{"container":"container162546564840202509","blob":"blob162546564956608265","copiedblob":"copiedblob162546565073103264"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162546564840202509')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:14:09 GMT',
  'ETag',
  '"0x8D93F7C1A2DBF6C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e81a186e-d01e-002c-1d64-712fd5000000',
  'x-ms-client-request-id',
  'e6999451-d6bf-4be5-a765-4c4f4c593640',
  'x-ms-version',
  '2020-10-02',
  'Date',
  'Mon, 05 Jul 2021 06:14:09 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162546564840202509/blob162546564956608265', "Hello World")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:14:10 GMT',
  'ETag',
  '"0x8D93F7C1ADF8C4C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f092c795-801e-0016-0664-71d1a1000000',
  'x-ms-client-request-id',
  '15a407e1-df87-44ba-82f2-7d4a2d4ec625',
  'x-ms-version',
  '2020-10-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 05 Jul 2021 06:14:09 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162546564840202509/copiedblob162546565073103264')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:14:12 GMT',
  'ETag',
  '"0x8D93F7C1BA34150"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd5442530-301e-0008-7764-7176b8000000',
  'x-ms-client-request-id',
  '440d0870-bae7-4023-937a-4716ba95434a',
  'x-ms-version',
  '2020-10-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-copy-id',
  '2a1b1dac-0ca0-40ee-81aa-03bb8e0e02c2',
  'x-ms-copy-status',
  'success',
  'Date',
  'Mon, 05 Jul 2021 06:14:11 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container162546564840202509/blob162546564956608265')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:14:10 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D93F7C1ADF8C4C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1c2d090a-601e-0013-5664-714833000000',
  'x-ms-client-request-id',
  'df5a6947-1840-487c-acc2-2d97aacca2c1',
  'x-ms-version',
  '2020-10-02',
  'x-ms-creation-time',
  'Mon, 05 Jul 2021 06:14:10 GMT',
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
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 05 Jul 2021 06:14:13 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container162546564840202509/copiedblob162546565073103264')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:14:12 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D93F7C1BA34150"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0ecbd697-501e-0022-3264-71632e000000',
  'x-ms-client-request-id',
  'a00d4bb7-11f5-49c3-a601-2556b4168cb7',
  'x-ms-version',
  '2020-10-02',
  'x-ms-creation-time',
  'Mon, 05 Jul 2021 06:14:12 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-copy-id',
  '2a1b1dac-0ca0-40ee-81aa-03bb8e0e02c2',
  'x-ms-copy-source',
  'https://fakestorageaccount.blob.core.windows.net/container162546564840202509/blob162546564956608265',
  'x-ms-copy-status',
  'success',
  'x-ms-copy-progress',
  '11/11',
  'x-ms-copy-completion-time',
  'Mon, 05 Jul 2021 06:14:12 GMT',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-copy-id,x-ms-copy-source,x-ms-copy-status,x-ms-copy-progress,x-ms-copy-completion-time,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 05 Jul 2021 06:14:13 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container162546564840202509')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2e6486e4-001e-0007-3564-71dd0f000000',
  'x-ms-client-request-id',
  '76358852-6995-465c-84dd-f0669770bc99',
  'x-ms-version',
  '2020-10-02',
  'Date',
  'Mon, 05 Jul 2021 06:14:15 GMT',
  'Connection',
  'close'
]);
