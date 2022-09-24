let nock = require('nock');

module.exports.hash = "4d5d176c77ccbf72071960240a99c41e";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165383028332601237","file":"file165383028359507236","testdir":"testdir165383028441005830"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383028332601237')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Sun, 29 May 2022 13:18:03 GMT',
  'ETag',
  '"0x8DA4175A994F9D1"',
  'x-ms-request-id',
  '84b4a80a-a01e-0003-6a5e-731608000000',
  'x-ms-client-request-id',
  '48b0ec38-b5f5-442b-89b7-b86f6f7da9fa',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:18:03 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383028332601237/file165383028359507236')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:18:04 GMT',
  'ETag',
  '"0x8DA4175A9C139F9"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '478a96e0-201f-0000-5a5e-73e568000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '474dc752-b3eb-4012-8aa5-3a2b7f99965b',
  'Date',
  'Sun, 29 May 2022 13:18:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383028332601237/file165383028359507236', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '478a96e1-201f-0000-5b5e-73e568000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '02fa4837-9114-47a3-b082-8887e4b5bd17',
  'Date',
  'Sun, 29 May 2022 13:18:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383028332601237/file165383028359507236')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:18:04 GMT',
  'ETag',
  '"0x8DA4175AA133C01"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '478a96e2-201f-0000-5c5e-73e568000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '5b1f11b2-1891-4d6f-a835-94e66365b090',
  'Date',
  'Sun, 29 May 2022 13:18:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383028332601237/testdir165383028441005830')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:18:04 GMT',
  'ETag',
  '"0x8DA4175AA3D85E7"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '478a96e3-201f-0000-5d5e-73e568000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '2b6afb98-3213-4ee2-bacd-02d98c5e0268',
  'Date',
  'Sun, 29 May 2022 13:18:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem165383028332601237/testdir165383028441005830')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Sun, 29 May 2022 13:18:04 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA4175AA3D85E7"',
  'x-ms-request-id',
  '84b4a80c-a01e-0003-6b5e-731608000000',
  'x-ms-client-request-id',
  '7853c1a4-6173-40f8-82cd-b4ad95593697',
  'x-ms-version',
  '2021-06-08',
  'x-ms-resource-type',
  'directory',
  'x-ms-meta-hdi_isfolder',
  'true',
  'x-ms-creation-time',
  'Sun, 29 May 2022 13:18:04 GMT',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,x-ms-meta-hdi_isfolder,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sun, 29 May 2022 13:18:05 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165383028332601237')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '84b4a80d-a01e-0003-6c5e-731608000000',
  'x-ms-client-request-id',
  '0ecc1375-e728-4f28-a0a5-23c98a467af3',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:18:05 GMT'
]);
