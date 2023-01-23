let nock = require('nock');

module.exports.hash = "ba1f6efb81b1a47250af2ffda0038ba7";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem166600140769404310","file":"file166600140798602970","tempfile2":"tempfile2166600140880901049"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem166600140769404310')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 17 Oct 2022 10:10:08 GMT',
  'ETag',
  '"0x8DAB027C508B2BA"',
  'x-ms-request-id',
  'a10801c5-201e-0006-0e10-e203a9000000',
  'x-ms-client-request-id',
  'f7796fdd-ffe4-4c79-b1da-5705817155fe',
  'x-ms-version',
  '2021-10-04',
  'Date',
  'Mon, 17 Oct 2022 10:10:07 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem166600140769404310/file166600140798602970')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 17 Oct 2022 10:10:08 GMT',
  'ETag',
  '"0x8DAB027C539D576"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '294a95b8-701f-0008-7210-e2c247000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'f9983660-224b-4187-a1cb-184e4573eb7a',
  'Date',
  'Mon, 17 Oct 2022 10:10:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem166600140769404310/file166600140798602970', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '294a95b9-701f-0008-7310-e2c247000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '178e11da-4aab-4992-8c8d-775a410a776a',
  'Date',
  'Mon, 17 Oct 2022 10:10:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem166600140769404310/file166600140798602970')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 17 Oct 2022 10:10:09 GMT',
  'ETag',
  '"0x8DAB027C58C2827"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '294a95ba-701f-0008-7410-e2c247000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '37cdd6e2-f202-4131-ba82-bdccd1cd07b8',
  'Date',
  'Mon, 17 Oct 2022 10:10:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem166600140769404310/tempfile2166600140880901049')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 17 Oct 2022 10:10:09 GMT',
  'ETag',
  '"0x8DAB027C5B35580"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '294a95bb-701f-0008-7510-e2c247000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '78c637f4-4d38-47f1-aeaa-bd1b37eb7364',
  'Date',
  'Mon, 17 Oct 2022 10:10:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem166600140769404310/tempfile2166600140880901049', "HelloWorld")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '294a95bc-701f-0008-7610-e2c247000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'd31fb92b-cd2c-43cb-942d-adc38d7779bf',
  'Date',
  'Mon, 17 Oct 2022 10:10:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem166600140769404310/tempfile2166600140880901049', "HelloWorld")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '294a95bd-701f-0008-7710-e2c247000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '2f5f4807-b03e-4580-bf54-d290e2be651f',
  'Date',
  'Mon, 17 Oct 2022 10:10:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem166600140769404310/tempfile2166600140880901049')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 17 Oct 2022 10:10:10 GMT',
  'ETag',
  '"0x8DAB027C62E0F2A"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '294a95be-701f-0008-7810-e2c247000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '1bf69969-e68f-452d-886f-ce029ddd7e64',
  'Date',
  'Mon, 17 Oct 2022 10:10:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem166600140769404310/tempfile2166600140880901049')
  .reply(200, "", [
  'Content-Length',
  '20',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 17 Oct 2022 10:10:10 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DAB027C62E0F2A"',
  'x-ms-request-id',
  'a10801ca-201e-0006-1010-e203a9000000',
  'x-ms-client-request-id',
  'e91ad04d-1f61-413c-80c7-6aa82baf503c',
  'x-ms-version',
  '2021-10-04',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Mon, 17 Oct 2022 10:10:09 GMT',
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
  'Mon, 17 Oct 2022 10:10:09 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem166600140769404310/tempfile2166600140880901049')
  .reply(200, "", [
  'x-ms-delete-type-permanent',
  'true',
  'x-ms-request-id',
  '294a95bf-701f-0008-7910-e2c247000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '313509e5-1630-4a21-aed3-5e500743fb19',
  'Date',
  'Mon, 17 Oct 2022 10:10:10 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem166600140769404310')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'a10801cb-201e-0006-1110-e203a9000000',
  'x-ms-client-request-id',
  'a23e0879-acb3-4afc-a12a-d1b04c5feae9',
  'x-ms-version',
  '2021-10-04',
  'Date',
  'Mon, 17 Oct 2022 10:10:10 GMT'
]);
