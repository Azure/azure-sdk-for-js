let nock = require('nock');

module.exports.hash = "44cf59a6b6dce3791dba9f2ad2f2fb2b";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem166600137442500133","file":"file166600137470305164","tempfile2":"tempfile2166600137551305694"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem166600137442500133')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 17 Oct 2022 10:09:34 GMT',
  'ETag',
  '"0x8DAB027B1340F52"',
  'x-ms-request-id',
  'a10801a5-201e-0006-7d10-e203a9000000',
  'x-ms-client-request-id',
  '619a2c98-4a68-402f-b19f-0c3024cc231a',
  'x-ms-version',
  '2021-10-04',
  'Date',
  'Mon, 17 Oct 2022 10:09:34 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem166600137442500133/file166600137470305164')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 17 Oct 2022 10:09:35 GMT',
  'ETag',
  '"0x8DAB027B1612DD1"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '294a9592-701f-0008-6710-e2c247000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '2f69d72a-4865-4418-ad98-12bd9f568321',
  'Date',
  'Mon, 17 Oct 2022 10:09:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem166600137442500133/file166600137470305164', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '294a9593-701f-0008-6810-e2c247000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'c3ff752a-9634-4f1c-8a11-a1083b1ceebc',
  'Date',
  'Mon, 17 Oct 2022 10:09:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem166600137442500133/file166600137470305164')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 17 Oct 2022 10:09:35 GMT',
  'ETag',
  '"0x8DAB027B1B341F9"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '294a9594-701f-0008-6910-e2c247000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '3cbc6b88-373d-4953-8eb5-e98afc639e39',
  'Date',
  'Mon, 17 Oct 2022 10:09:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem166600137442500133/tempfile2166600137551305694')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 17 Oct 2022 10:09:36 GMT',
  'ETag',
  '"0x8DAB027B1DCB55F"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '294a9595-701f-0008-6a10-e2c247000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'e6638aa5-fb6e-48cf-8990-6a9be719f5f4',
  'Date',
  'Mon, 17 Oct 2022 10:09:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem166600137442500133/tempfile2166600137551305694', "HelloWorld")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '294a9597-701f-0008-6c10-e2c247000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'f8b14a0b-d802-4942-9d7b-0855e57b4aae',
  'Date',
  'Mon, 17 Oct 2022 10:09:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem166600137442500133/tempfile2166600137551305694', "HelloWorld")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '294a9599-701f-0008-6d10-e2c247000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'c233007c-f8b8-42b0-99a3-ca0623455135',
  'Date',
  'Mon, 17 Oct 2022 10:09:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem166600137442500133/tempfile2166600137551305694')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 17 Oct 2022 10:09:51 GMT',
  'ETag',
  '"0x8DAB027BB4D8322"',
  'x-ms-lease-renewed',
  'true',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '294a95ad-701f-0008-6e10-e2c247000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'b61f41fc-4a4e-42d5-964a-c3d71b9c19b1',
  'Date',
  'Mon, 17 Oct 2022 10:09:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem166600137442500133/tempfile2166600137551305694')
  .reply(412, {"error":{"code":"LeaseIdMissing","message":"There is currently a lease on the resource and no lease ID was specified in the request.\nRequestId:294a95ae-701f-0008-6f10-e2c247000000\nTime:2022-10-17T10:09:52.1510544Z"}}, [
  'Content-Length',
  '219',
  'Content-Type',
  'application/json;charset=utf-8',
  'x-ms-error-code',
  'LeaseIdMissing',
  'x-ms-request-id',
  '294a95ae-701f-0008-6f10-e2c247000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '67d44da4-1dbc-40a3-86c9-287023e9e9b5',
  'Date',
  'Mon, 17 Oct 2022 10:09:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem166600137442500133/tempfile2166600137551305694')
  .reply(200, "", [
  'Content-Length',
  '20',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 17 Oct 2022 10:09:51 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DAB027BB4D8322"',
  'x-ms-request-id',
  'a10801ac-201e-0006-7f10-e203a9000000',
  'x-ms-client-request-id',
  'b4731589-b198-4160-9a6a-28f62fd3e3c3',
  'x-ms-version',
  '2021-10-04',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Mon, 17 Oct 2022 10:09:36 GMT',
  'x-ms-lease-status',
  'locked',
  'x-ms-lease-state',
  'leased',
  'x-ms-lease-duration',
  'fixed',
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
  'Mon, 17 Oct 2022 10:09:51 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem166600137442500133/tempfile2166600137551305694')
  .reply(200, "", [
  'x-ms-delete-type-permanent',
  'true',
  'x-ms-request-id',
  '294a95b7-701f-0008-7110-e2c247000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '4ce75557-faeb-457b-bf8c-b8601cb07fb1',
  'Date',
  'Mon, 17 Oct 2022 10:10:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem166600137442500133')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'a10801c2-201e-0006-0d10-e203a9000000',
  'x-ms-client-request-id',
  '0185c6bf-a768-44b1-aa56-15dc0040d054',
  'x-ms-version',
  '2021-10-04',
  'Date',
  'Mon, 17 Oct 2022 10:10:07 GMT'
]);
