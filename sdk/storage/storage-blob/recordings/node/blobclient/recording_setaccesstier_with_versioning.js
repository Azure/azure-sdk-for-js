let nock = require('nock');

module.exports.hash = "bc95e7de4f0c5b417fa80f59fc8b2621";

module.exports.testInfo = {"uniqueName":{"container":"container159834991890409683","blob":"blob159834991918708443"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159834991890409683')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Aug 2020 10:05:18 GMT',
  'ETag',
  '"0x8D848DE5F27CAF7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3537e6b6-b01e-0085-4bc7-7a607d000000',
  'x-ms-client-request-id',
  'dc0ac5aa-8f6f-470a-adb1-f33e19b00d3a',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 25 Aug 2020 10:05:18 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159834991890409683/blob159834991918708443', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 25 Aug 2020 10:05:19 GMT',
  'ETag',
  '"0x8D848DE5F534FC0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3537e6d7-b01e-0085-68c7-7a607d000000',
  'x-ms-client-request-id',
  '2c54c655-3bfb-44ff-bba2-8e0c64e608f7',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-08-25T10:05:19.2160192Z',
  'Date',
  'Tue, 25 Aug 2020 10:05:18 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159834991890409683/blob159834991918708443')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Aug 2020 10:05:19 GMT',
  'ETag',
  '"0x8D848DE5F7EAD76"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3537e6f7-b01e-0085-02c7-7a607d000000',
  'x-ms-client-request-id',
  'edc7eb55-b18f-4f97-ba7d-b2df7beccc64',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-08-25T10:05:19.5022237Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 25 Aug 2020 10:05:18 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159834991890409683/blob159834991918708443')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3537e716-b01e-0085-1bc7-7a607d000000',
  'x-ms-client-request-id',
  'fb2eaa20-4946-4c3d-8430-39465fe2f081',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 25 Aug 2020 10:05:18 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159834991890409683/blob159834991918708443')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 25 Aug 2020 10:05:19 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D848DE5F7EAD76"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3537e735-b01e-0085-39c7-7a607d000000',
  'x-ms-client-request-id',
  'b65a4dbb-daec-4e35-a6b1-146eb495c791',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-08-25T10:05:19.5022237Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-meta-a',
  'a',
  'x-ms-creation-time',
  'Tue, 25 Aug 2020 10:05:19 GMT',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Cool',
  'x-ms-access-tier-change-time',
  'Tue, 25 Aug 2020 10:05:19 GMT',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,x-ms-meta-a,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-change-time,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 25 Aug 2020 10:05:19 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159834991890409683')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3537e76b-b01e-0085-68c7-7a607d000000',
  'x-ms-client-request-id',
  '5eed4e77-b8f0-46d2-82dc-5167a10f822d',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 25 Aug 2020 10:05:19 GMT'
]);
