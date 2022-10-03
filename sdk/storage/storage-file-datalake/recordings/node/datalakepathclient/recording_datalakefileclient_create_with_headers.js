let nock = require('nock');

module.exports.hash = "a78dfd8d8a38542379483e3b083aca32";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165383020347404461","file":"file165383020374802276","testfile":"testfile165383020529902706"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383020347404461')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Sun, 29 May 2022 13:16:43 GMT',
  'ETag',
  '"0x8DA417579FD042D"',
  'x-ms-request-id',
  '84b4a78a-a01e-0003-1c5e-731608000000',
  'x-ms-client-request-id',
  'f4698b9b-fc00-4b3e-8727-430f88d42c31',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:16:43 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383020347404461/file165383020374802276')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:45 GMT',
  'ETag',
  '"0x8DA41757A9837C7"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '5506db13-a01f-0005-4d5e-73f0c9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '4f3c9a5a-4244-4afc-a1ae-c7cf0fb49e39',
  'Date',
  'Sun, 29 May 2022 13:16:45 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383020347404461/file165383020374802276', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '5506db15-a01f-0005-4e5e-73f0c9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'b4ce3762-ba97-46d4-8716-38b544d8899c',
  'Date',
  'Sun, 29 May 2022 13:16:45 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383020347404461/file165383020374802276')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:45 GMT',
  'ETag',
  '"0x8DA41757AED79DB"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '5506db16-a01f-0005-4f5e-73f0c9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'f046e993-c436-472a-89b5-6ca11027403c',
  'Date',
  'Sun, 29 May 2022 13:16:45 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383020347404461/testfile165383020529902706')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:45 GMT',
  'ETag',
  '"0x8DA41757B15DD51"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '5506db17-a01f-0005-505e-73f0c9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '7dee5986-c907-4c39-b80b-d45d23a56dac',
  'Date',
  'Sun, 29 May 2022 13:16:45 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem165383020347404461/testfile165383020529902706')
  .reply(200, [], [
  'Cache-Control',
  'control',
  'Content-Length',
  '0',
  'Content-Type',
  'type/subtype',
  'Content-Encoding',
  'encoding',
  'Content-Language',
  'language',
  'Last-Modified',
  'Sun, 29 May 2022 13:16:45 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA41757B15DD51"',
  'x-ms-request-id',
  '84b4a78d-a01e-0003-1d5e-731608000000',
  'x-ms-client-request-id',
  '4d3c0366-0e39-4e3b-ad6a-91886ca95f5b',
  'x-ms-version',
  '2021-06-08',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Sun, 29 May 2022 13:16:45 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'Content-Disposition',
  'disposition',
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
  'rw-r-----',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,Content-Type,Content-Encoding,Content-Language,Cache-Control,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,Content-Disposition,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sun, 29 May 2022 13:16:46 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165383020347404461')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '84b4a78e-a01e-0003-1e5e-731608000000',
  'x-ms-client-request-id',
  '6a08d968-adeb-4d33-9d4b-57ac1fc05190',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:16:46 GMT'
]);
