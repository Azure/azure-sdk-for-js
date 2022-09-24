let nock = require('nock');

module.exports.hash = "0fa0c445aecea2f0694049d98b7f0393";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165383023549006126","file":"file165383023576307658","testfile":"testfile165383023659208167"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383023549006126')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Sun, 29 May 2022 13:17:16 GMT',
  'ETag',
  '"0x8DA41758D11DC8F"',
  'x-ms-request-id',
  '84b4a7b1-a01e-0003-335e-731608000000',
  'x-ms-client-request-id',
  '5147522c-3820-4fce-8333-a81f8c0ec6bb',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:17:15 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383023549006126/file165383023576307658')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:17:16 GMT',
  'ETag',
  '"0x8DA41758D400AB9"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '5506db32-a01f-0005-655e-73f0c9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '36b2bd8b-61bd-47c3-a975-24f1a4d6bf91',
  'Date',
  'Sun, 29 May 2022 13:17:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383023549006126/file165383023576307658', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '5506db33-a01f-0005-665e-73f0c9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '019968f5-9b65-4809-a723-998044cff208',
  'Date',
  'Sun, 29 May 2022 13:17:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383023549006126/file165383023576307658')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:17:16 GMT',
  'ETag',
  '"0x8DA41758D92DA19"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '5506db34-a01f-0005-675e-73f0c9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '0794b26b-5f5a-47e4-a173-e2f8f4ee40ed',
  'Date',
  'Sun, 29 May 2022 13:17:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383023549006126/testfile165383023659208167')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:17:17 GMT',
  'ETag',
  '"0x8DA41758DBC9CE8"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '5506db35-a01f-0005-685e-73f0c9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'b9bacc65-162d-481a-a2c3-0dc8d3f606a3',
  'Date',
  'Sun, 29 May 2022 13:17:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem165383023549006126/testfile165383023659208167')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Sun, 29 May 2022 13:17:17 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA41758DBC9CE8"',
  'x-ms-request-id',
  '84b4a7b3-a01e-0003-345e-731608000000',
  'x-ms-client-request-id',
  'cb56b2ff-f898-4999-ba55-f7ca8a1fade8',
  'x-ms-version',
  '2021-06-08',
  'x-ms-resource-type',
  'file',
  'x-ms-meta-a',
  'a',
  'x-ms-meta-b',
  'b',
  'x-ms-creation-time',
  'Sun, 29 May 2022 13:17:17 GMT',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,x-ms-meta-a,x-ms-meta-b,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sun, 29 May 2022 13:17:17 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165383023549006126')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '84b4a7b4-a01e-0003-355e-731608000000',
  'x-ms-client-request-id',
  'dc8e83c9-5d72-45f1-b7ac-d86901ad0f65',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:17:17 GMT'
]);
