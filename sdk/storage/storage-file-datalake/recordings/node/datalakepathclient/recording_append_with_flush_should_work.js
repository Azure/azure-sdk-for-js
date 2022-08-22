let nock = require('nock');

module.exports.hash = "7c5eaaa7032a0ec6b25fdd08849e5250";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165517452523001963","file":"file165517452681700984","tempfile2":"tempfile2165517455057005613"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165517452523001963')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Jun 2022 02:42:06 GMT',
  'ETag',
  '"0x8DA4DAF78D40BC3"',
  'x-ms-request-id',
  '0f95a3b1-e01e-0007-0598-7ffda4000000',
  'x-ms-client-request-id',
  '637560d1-f49a-44cd-9956-d2524cdf81de',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Tue, 14 Jun 2022 02:42:06 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165517452523001963/file165517452681700984')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 14 Jun 2022 02:42:08 GMT',
  'ETag',
  '"0x8DA4DAF79BC2AB3"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '7810fbfe-e01f-0001-6f98-7f1b65000000',
  'x-ms-version',
  '2021-10-04',
  'x-ms-client-request-id',
  '73cb53d2-d10b-42fb-ae4b-1c32fc1a96c1',
  'Date',
  'Tue, 14 Jun 2022 02:42:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165517452523001963/file165517452681700984', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '7810fbff-e01f-0001-7098-7f1b65000000',
  'x-ms-version',
  '2021-10-04',
  'x-ms-client-request-id',
  'e436dc77-6d32-4cab-8a0d-a861f00b1006',
  'Date',
  'Tue, 14 Jun 2022 02:42:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165517452523001963/file165517452681700984')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Tue, 14 Jun 2022 02:42:15 GMT',
  'ETag',
  '"0x8DA4DAF7E3A27D6"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '7810fc00-e01f-0001-7198-7f1b65000000',
  'x-ms-version',
  '2021-10-04',
  'x-ms-client-request-id',
  '06f7597a-ea80-4016-8567-76019547499b',
  'Date',
  'Tue, 14 Jun 2022 02:42:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165517452523001963/tempfile2165517455057005613')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 14 Jun 2022 02:42:30 GMT',
  'ETag',
  '"0x8DA4DAF87391756"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '7810fc0d-e01f-0001-7398-7f1b65000000',
  'x-ms-version',
  '2021-10-04',
  'x-ms-client-request-id',
  'f6141661-9ac9-4272-929d-e63f2c05bcb4',
  'Date',
  'Tue, 14 Jun 2022 02:42:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165517452523001963/tempfile2165517455057005613', "HelloWorld")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '7810fc0e-e01f-0001-7498-7f1b65000000',
  'x-ms-version',
  '2021-10-04',
  'x-ms-client-request-id',
  'f779a0b3-2df1-4aa0-86df-e2a8b0b14840',
  'Date',
  'Tue, 14 Jun 2022 02:42:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165517452523001963/tempfile2165517455057005613', "HelloWorld")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '7810fc0f-e01f-0001-7598-7f1b65000000',
  'x-ms-version',
  '2021-10-04',
  'x-ms-client-request-id',
  '53e049d7-255a-4038-bd85-53312fbd1d06',
  'Date',
  'Tue, 14 Jun 2022 02:42:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165517452523001963/tempfile2165517455057005613', "HelloWorld")
  .query(true)
  .reply(202, "", [
  'Last-Modified',
  'Tue, 14 Jun 2022 02:42:31 GMT',
  'ETag',
  '"0x8DA4DAF87B4FA74"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '7810fc10-e01f-0001-7698-7f1b65000000',
  'x-ms-version',
  '2021-10-04',
  'x-ms-client-request-id',
  '5ea77bac-9c74-4fc4-a37d-8e2eedb7e4ad',
  'Date',
  'Tue, 14 Jun 2022 02:42:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem165517452523001963/tempfile2165517455057005613')
  .reply(200, "", [
  'Content-Length',
  '30',
  'Content-Type',
  'application/json',
  'Last-Modified',
  'Tue, 14 Jun 2022 02:42:31 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA4DAF87B4FA74"',
  'x-ms-request-id',
  '0f95a3ce-e01e-0007-1698-7ffda4000000',
  'x-ms-client-request-id',
  'ff160c46-1aa1-4adc-bb0b-d24d786195b8',
  'x-ms-version',
  '2021-08-06',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Tue, 14 Jun 2022 02:42:30 GMT',
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
  'rw-r-----',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Jun 2022 02:42:31 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165517452523001963/tempfile2165517455057005613')
  .reply(200, "", [
  'x-ms-delete-type-permanent',
  'true',
  'x-ms-request-id',
  '7810fc1b-e01f-0001-7898-7f1b65000000',
  'x-ms-version',
  '2021-10-04',
  'x-ms-client-request-id',
  'c5d2ecf1-cd69-4bea-a4b7-f945b69e3264',
  'Date',
  'Tue, 14 Jun 2022 02:43:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165517452523001963')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '0f95a3df-e01e-0007-1a98-7ffda4000000',
  'x-ms-client-request-id',
  'f44210ff-4846-47ce-bf1c-c29d0045bac0',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Tue, 14 Jun 2022 02:43:07 GMT'
]);
