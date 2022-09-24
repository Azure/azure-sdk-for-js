let nock = require('nock');

module.exports.hash = "2eae36d94f824b56537def308ffd3870";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165451934558606952","file":"file165451934806101062","testfile":"testfile165451935515900121"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165451934558606952')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 06 Jun 2022 12:42:27 GMT',
  'ETag',
  '"0x8DA47BA03511AB3"',
  'x-ms-request-id',
  '346ac4b8-701e-0008-0ba2-79c247000000',
  'x-ms-client-request-id',
  '4f1d9005-f97e-4208-bc7c-9ef2b6e09d41',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Mon, 06 Jun 2022 12:42:27 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165451934558606952/file165451934806101062')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 06 Jun 2022 12:42:29 GMT',
  'ETag',
  '"0x8DA47BA04A47D7A"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '36ee0cbb-701f-0008-28a2-79c247000000',
  'x-ms-version',
  '2021-08-06',
  'x-ms-client-request-id',
  'd5a44c52-4e6c-49fc-a533-1a1e31135aa6',
  'Date',
  'Mon, 06 Jun 2022 12:42:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165451934558606952/file165451934806101062', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '36ee0cbc-701f-0008-29a2-79c247000000',
  'x-ms-version',
  '2021-08-06',
  'x-ms-client-request-id',
  '566d8f51-863e-4327-9cfe-1373267d7bfe',
  'Date',
  'Mon, 06 Jun 2022 12:42:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165451934558606952/file165451934806101062')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 06 Jun 2022 12:42:29 GMT',
  'ETag',
  '"0x8DA47BA04FD3474"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '36ee0cbd-701f-0008-2aa2-79c247000000',
  'x-ms-version',
  '2021-08-06',
  'x-ms-client-request-id',
  'a04b8a65-9e77-40f9-889e-d296bda147c5',
  'Date',
  'Mon, 06 Jun 2022 12:42:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165451934558606952/testfile165451935515900121')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 06 Jun 2022 12:42:35 GMT',
  'ETag',
  '"0x8DA47BA0837E42C"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '36ee0cbe-701f-0008-2ba2-79c247000000',
  'x-ms-version',
  '2021-08-06',
  'x-ms-client-request-id',
  'ea8ce5a1-e7a2-40bb-a6cc-8ae74aa81ed5',
  'Date',
  'Mon, 06 Jun 2022 12:42:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem165451934558606952/testfile165451935515900121')
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
  'Mon, 06 Jun 2022 12:42:35 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA47BA0837E42C"',
  'x-ms-request-id',
  '346ac4bf-701e-0008-0da2-79c247000000',
  'x-ms-client-request-id',
  'c1f731aa-d97e-4e19-ba64-6696f9705172',
  'x-ms-version',
  '2021-06-08',
  'x-ms-resource-type',
  'file',
  'x-ms-meta-a',
  'a',
  'x-ms-meta-b',
  'b',
  'x-ms-creation-time',
  'Mon, 06 Jun 2022 12:42:35 GMT',
  'x-ms-expiry-time',
  'Mon, 06 Jun 2022 12:43:35 GMT',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,x-ms-meta-a,x-ms-meta-b,Content-Type,Content-Encoding,Content-Language,Cache-Control,Last-Modified,ETag,x-ms-creation-time,x-ms-expiry-time,x-ms-lease-status,x-ms-lease-state,x-ms-lease-duration,x-ms-blob-type,Content-Disposition,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 06 Jun 2022 12:42:34 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem165451934558606952/testfile165451935515900121')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 06 Jun 2022 12:42:35 GMT',
  'ETag',
  '"0x8DA47BA0837E42C"',
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
  '36ee0cbf-701f-0008-2ca2-79c247000000',
  'x-ms-version',
  '2021-08-06',
  'x-ms-client-request-id',
  '343b6713-b721-4801-9f08-8c582e8c2dc1',
  'Date',
  'Mon, 06 Jun 2022 12:42:36 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165451934558606952')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '346ac4c0-701e-0008-0ea2-79c247000000',
  'x-ms-client-request-id',
  'e692d14c-933a-4d19-b2eb-37d320d0833b',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Mon, 06 Jun 2022 12:42:37 GMT'
]);
