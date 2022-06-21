let nock = require('nock');

module.exports.hash = "fc35ee1d226aaa97cbb673c7ed676cad";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165451992908301460","file":"file165451993057307634","testdir":"testdir165451993248302882"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165451992908301460')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 06 Jun 2022 12:52:10 GMT',
  'ETag',
  '"0x8DA47BB5EF3FA1F"',
  'x-ms-request-id',
  '6711ea33-e01e-0007-7ca4-79fda4000000',
  'x-ms-client-request-id',
  '3cd065e3-a491-44e9-899d-109323f2819b',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Mon, 06 Jun 2022 12:52:09 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165451992908301460/file165451993057307634')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 06 Jun 2022 12:52:11 GMT',
  'ETag',
  '"0x8DA47BB5FD6EE2A"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '32962803-b01f-0009-71a4-793c4a000000',
  'x-ms-version',
  '2021-08-06',
  'x-ms-client-request-id',
  'f1698cd7-a0ed-4c0d-b42f-592e33d39845',
  'Date',
  'Mon, 06 Jun 2022 12:52:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165451992908301460/file165451993057307634', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '32962804-b01f-0009-72a4-793c4a000000',
  'x-ms-version',
  '2021-08-06',
  'x-ms-client-request-id',
  '7af4968d-117a-4ffc-91e9-39e5e11d6a14',
  'Date',
  'Mon, 06 Jun 2022 12:52:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165451992908301460/file165451993057307634')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 06 Jun 2022 12:52:12 GMT',
  'ETag',
  '"0x8DA47BB602B754C"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '32962805-b01f-0009-73a4-793c4a000000',
  'x-ms-version',
  '2021-08-06',
  'x-ms-client-request-id',
  '527e8cff-e565-4d25-ac1b-df9c7c6ef0d1',
  'Date',
  'Mon, 06 Jun 2022 12:52:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165451992908301460/testdir165451993248302882')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 06 Jun 2022 12:52:12 GMT',
  'ETag',
  '"0x8DA47BB605478E4"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '3296280c-b01f-0009-74a4-793c4a000000',
  'x-ms-version',
  '2021-08-06',
  'x-ms-client-request-id',
  'a9c63bf5-656c-4bde-83d3-72d496186561',
  'Date',
  'Mon, 06 Jun 2022 12:52:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem165451992908301460/testdir165451993248302882')
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
  'Mon, 06 Jun 2022 12:52:12 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA47BB605478E4"',
  'x-ms-request-id',
  '6711ea39-e01e-0007-7da4-79fda4000000',
  'x-ms-client-request-id',
  '2efd57e4-1439-4485-a64e-384b52e4294a',
  'x-ms-version',
  '2021-06-08',
  'x-ms-resource-type',
  'file',
  'x-ms-meta-a',
  'a',
  'x-ms-meta-b',
  'b',
  'x-ms-creation-time',
  'Mon, 06 Jun 2022 12:52:12 GMT',
  'x-ms-lease-status',
  'locked',
  'x-ms-lease-state',
  'leased',
  'x-ms-lease-duration',
  'fixed',
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
  'rwx-w----',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,x-ms-meta-a,x-ms-meta-b,Content-Type,Content-Encoding,Content-Language,Cache-Control,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-lease-duration,x-ms-blob-type,Content-Disposition,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 06 Jun 2022 12:52:12 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem165451992908301460/testdir165451993248302882')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 06 Jun 2022 12:52:12 GMT',
  'ETag',
  '"0x8DA47BB605478E4"',
  'Vary',
  'Origin',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rwx-w----',
  'x-ms-acl',
  'user::rwx,group::-w-,other::---',
  'x-ms-request-id',
  '3296280d-b01f-0009-75a4-793c4a000000',
  'x-ms-version',
  '2021-08-06',
  'x-ms-client-request-id',
  '692b93c9-41bd-4b0f-9f8a-3f96abeb4eb5',
  'Date',
  'Mon, 06 Jun 2022 12:52:13 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165451992908301460')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '6711ea3c-e01e-0007-80a4-79fda4000000',
  'x-ms-client-request-id',
  '83e23d31-9f39-4236-877b-82494b79ba9d',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Mon, 06 Jun 2022 12:52:12 GMT'
]);
