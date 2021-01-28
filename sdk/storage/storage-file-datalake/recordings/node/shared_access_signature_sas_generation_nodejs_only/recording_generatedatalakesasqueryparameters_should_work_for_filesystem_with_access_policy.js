let nock = require('nock');

module.exports.hash = "6bb2814c3664616597c8f4ca9cfeea39";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem161069077938008645","file":"file161069078083902614"},"newDate":{"now":"2021-01-15T06:06:19.379Z","tmr":"2021-01-15T06:06:19.380Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem161069077938008645')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 15 Jan 2021 06:06:20 GMT',
  'ETag',
  '"0x8D8B91BADEA5D17"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c12265c9-301e-000c-0304-ebab6f000000',
  'x-ms-client-request-id',
  '5270b401-37b1-4c38-ab05-657df28f2dfa',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Fri, 15 Jan 2021 06:06:19 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem161069077938008645/file161069078083902614')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Fri, 15 Jan 2021 06:06:21 GMT',
  'ETag',
  '"0x8D8B91BAEBCB74B"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd60bd40d-001f-0004-7b04-ebb01c000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  '99e21036-e5b1-4289-872c-6da758358024',
  'Date',
  'Fri, 15 Jan 2021 06:06:21 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem161069077938008645', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers><SignedIdentifier><Id>unique-id</Id><AccessPolicy><Start>2021-01-15T05:56:19.3790000Z</Start><Expiry>2021-01-25T06:06:19.3800000Z</Expiry><Permission>racwdl</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>")
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 15 Jan 2021 06:06:23 GMT',
  'ETag',
  '"0x8D8B91BAF74AE15"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9ce3e19f-401e-0021-3304-eb28af000000',
  'x-ms-client-request-id',
  '6c3b0d54-5e7a-405b-9f94-866866faea77',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Fri, 15 Jan 2021 06:06:22 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem161069077938008645/file161069078083902614')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Fri, 15 Jan 2021 06:06:21 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D8B91BAEBCB74B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd4245393-a01e-0064-2d04-ebf53e000000',
  'x-ms-client-request-id',
  '12b07880-d54b-40a3-9996-83a19abf7f95',
  'x-ms-version',
  '2020-04-08',
  'x-ms-creation-time',
  'Fri, 15 Jan 2021 06:06:21 GMT',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 15 Jan 2021 06:06:53 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem161069077938008645')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7dcf6fe9-f01e-0055-5b04-ebaee9000000',
  'x-ms-client-request-id',
  'bf9ea6d9-c8eb-4c0d-a3e2-9c7ee343e99b',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Fri, 15 Jan 2021 06:06:55 GMT',
  'Connection',
  'close'
]);
