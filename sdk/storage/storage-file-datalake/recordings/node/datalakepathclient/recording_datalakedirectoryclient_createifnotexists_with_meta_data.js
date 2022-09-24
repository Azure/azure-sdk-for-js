let nock = require('nock');

module.exports.hash = "9211a0b199a7858e8e7a81516b370a8f";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165383028525202224","file":"file165383028553302854","testdir":"testdir165383028634902012"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383028525202224')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Sun, 29 May 2022 13:18:05 GMT',
  'ETag',
  '"0x8DA4175AABB087B"',
  'x-ms-request-id',
  '84b4a80e-a01e-0003-6d5e-731608000000',
  'x-ms-client-request-id',
  'd78709d7-63b0-4fb5-9e36-90393c62f22d',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:18:05 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383028525202224/file165383028553302854')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:18:06 GMT',
  'ETag',
  '"0x8DA4175AAE9ECBF"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '478a96e4-201f-0000-5e5e-73e568000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'b7989b5e-bfeb-4b17-8055-260503b484ad',
  'Date',
  'Sun, 29 May 2022 13:18:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383028525202224/file165383028553302854', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '478a96e5-201f-0000-5f5e-73e568000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '1b656912-08db-429a-8f44-72e09a4ebd27',
  'Date',
  'Sun, 29 May 2022 13:18:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383028525202224/file165383028553302854')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:18:06 GMT',
  'ETag',
  '"0x8DA4175AB3CC5D8"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '478a96e6-201f-0000-605e-73e568000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '4d9d0cc7-2dcc-476a-a2d2-0ee35360a1cb',
  'Date',
  'Sun, 29 May 2022 13:18:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383028525202224/testdir165383028634902012')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:18:06 GMT',
  'ETag',
  '"0x8DA4175AB636000"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '478a96e7-201f-0000-615e-73e568000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '11d4060f-4014-4075-8ff0-9fe54bfbf1ab',
  'Date',
  'Sun, 29 May 2022 13:18:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem165383028525202224/testdir165383028634902012')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Sun, 29 May 2022 13:18:06 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA4175AB636000"',
  'x-ms-request-id',
  '84b4a810-a01e-0003-6e5e-731608000000',
  'x-ms-client-request-id',
  'd5905ecd-7dd6-4a73-bd28-9497edc32a32',
  'x-ms-version',
  '2021-06-08',
  'x-ms-resource-type',
  'directory',
  'x-ms-meta-a',
  'a',
  'x-ms-meta-b',
  'b',
  'x-ms-meta-hdi_isfolder',
  'true',
  'x-ms-creation-time',
  'Sun, 29 May 2022 13:18:06 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Cool',
  'x-ms-access-tier-inferred',
  'true',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rwxr-x---',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,x-ms-meta-a,x-ms-meta-b,x-ms-meta-hdi_isfolder,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sun, 29 May 2022 13:18:06 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165383028525202224')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '84b4a811-a01e-0003-6f5e-731608000000',
  'x-ms-client-request-id',
  '4c2d920a-7060-4e69-9627-d8f023b9d31a',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:18:07 GMT'
]);
