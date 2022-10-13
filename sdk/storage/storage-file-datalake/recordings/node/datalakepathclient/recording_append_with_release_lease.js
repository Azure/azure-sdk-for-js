let nock = require('nock');

module.exports.hash = "febad1bae5a98ac012e2172288d4148a";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem166600135340509016","file":"file166600135369500137","tempfile2":"tempfile2166600135453805497"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem166600135340509016')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 17 Oct 2022 10:09:13 GMT',
  'ETag',
  '"0x8DAB027A4AC7112"',
  'x-ms-request-id',
  'a1080188-201e-0006-7410-e203a9000000',
  'x-ms-client-request-id',
  'ce53a0fd-58ef-4cd7-ad7a-d21e0bb48350',
  'x-ms-version',
  '2021-10-04',
  'Date',
  'Mon, 17 Oct 2022 10:09:12 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem166600135340509016/file166600135369500137')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 17 Oct 2022 10:09:14 GMT',
  'ETag',
  '"0x8DAB027A4E0537D"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '294a9579-701f-0008-5710-e2c247000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '4724bdaa-249b-46a1-8ed6-b38f047f4fd8',
  'Date',
  'Mon, 17 Oct 2022 10:09:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem166600135340509016/file166600135369500137', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '294a957a-701f-0008-5810-e2c247000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '067a50e2-e2f9-4130-a197-e21a6e9049ce',
  'Date',
  'Mon, 17 Oct 2022 10:09:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem166600135340509016/file166600135369500137')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 17 Oct 2022 10:09:14 GMT',
  'ETag',
  '"0x8DAB027A532EA35"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '294a957b-701f-0008-5910-e2c247000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '3edfffa2-9f90-4dab-ae78-efd4540e0333',
  'Date',
  'Mon, 17 Oct 2022 10:09:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem166600135340509016/tempfile2166600135453805497')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 17 Oct 2022 10:09:15 GMT',
  'ETag',
  '"0x8DAB027A55AA1E4"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '294a957c-701f-0008-5a10-e2c247000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '2716ba11-90ae-4aab-8c37-06f5809cf3cb',
  'Date',
  'Mon, 17 Oct 2022 10:09:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem166600135340509016/tempfile2166600135453805497', "HelloWorld")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '294a957d-701f-0008-5b10-e2c247000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '1e0fd86f-ccf7-4fb1-8126-d2a3ce646730',
  'Date',
  'Mon, 17 Oct 2022 10:09:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem166600135340509016/tempfile2166600135453805497', "HelloWorld")
  .query(true)
  .reply(202, "", [
  'Last-Modified',
  'Mon, 17 Oct 2022 10:09:15 GMT',
  'ETag',
  '"0x8DAB027A5AC785E"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '294a957e-701f-0008-5c10-e2c247000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '0ad71612-45e2-475a-9379-933ac4a9a793',
  'Date',
  'Mon, 17 Oct 2022 10:09:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem166600135340509016/tempfile2166600135453805497')
  .reply(200, "", [
  'Content-Length',
  '20',
  'Content-Type',
  'application/json',
  'Last-Modified',
  'Mon, 17 Oct 2022 10:09:15 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DAB027A5AC785E"',
  'x-ms-request-id',
  'a108018b-201e-0006-7510-e203a9000000',
  'x-ms-client-request-id',
  '0ad2ee84-b341-4584-b656-07179f9182d3',
  'x-ms-version',
  '2021-10-04',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Mon, 17 Oct 2022 10:09:15 GMT',
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
  'Date',
  'Mon, 17 Oct 2022 10:09:15 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem166600135340509016/tempfile2166600135453805497')
  .reply(200, "", [
  'x-ms-delete-type-permanent',
  'true',
  'x-ms-request-id',
  '294a957f-701f-0008-5d10-e2c247000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '0bec20d9-9cec-45db-92f7-ed63e81c82d2',
  'Date',
  'Mon, 17 Oct 2022 10:09:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem166600135340509016')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'a108018c-201e-0006-7610-e203a9000000',
  'x-ms-client-request-id',
  '58ee977d-2e99-408c-9935-5b76a145c99e',
  'x-ms-version',
  '2021-10-04',
  'Date',
  'Mon, 17 Oct 2022 10:09:16 GMT'
]);
