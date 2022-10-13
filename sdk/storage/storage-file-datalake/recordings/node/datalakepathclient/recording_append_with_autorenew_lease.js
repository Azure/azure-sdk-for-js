let nock = require('nock');

module.exports.hash = "5af2f190fa16555bc74d6a7d07c3d960";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem166600132064000218","file":"file166600132092302718","tempfile2":"tempfile2166600132176008476"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem166600132064000218')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 17 Oct 2022 10:08:41 GMT',
  'ETag',
  '"0x8DAB02791248EEC"',
  'x-ms-request-id',
  'a108016b-201e-0006-6410-e203a9000000',
  'x-ms-client-request-id',
  'ab671d70-3b9c-4e10-abb6-8d454721716a',
  'x-ms-version',
  '2021-10-04',
  'Date',
  'Mon, 17 Oct 2022 10:08:40 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem166600132064000218/file166600132092302718')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 17 Oct 2022 10:08:41 GMT',
  'ETag',
  '"0x8DAB0279153C84D"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '294a9566-701f-0008-4f10-e2c247000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'e23a9c0d-dcb7-44a3-9c94-0ed5dba19c98',
  'Date',
  'Mon, 17 Oct 2022 10:08:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem166600132064000218/file166600132092302718', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '294a9567-701f-0008-5010-e2c247000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'd7802d09-04f4-4518-9ca5-fc691f611390',
  'Date',
  'Mon, 17 Oct 2022 10:08:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem166600132064000218/file166600132092302718')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 17 Oct 2022 10:08:42 GMT',
  'ETag',
  '"0x8DAB02791A83E2E"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '294a9568-701f-0008-5110-e2c247000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'f68b7903-929e-4e3e-9f23-97e7941847ae',
  'Date',
  'Mon, 17 Oct 2022 10:08:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem166600132064000218/tempfile2166600132176008476')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 17 Oct 2022 10:08:42 GMT',
  'ETag',
  '"0x8DAB02791D1B753"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '294a9569-701f-0008-5210-e2c247000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'bdc233b3-414c-42fe-84a1-edcd154679d8',
  'Date',
  'Mon, 17 Oct 2022 10:08:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem166600132064000218/tempfile2166600132176008476')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 17 Oct 2022 10:08:42 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DAB02791D1B753"',
  'x-ms-request-id',
  'a108016d-201e-0006-6510-e203a9000000',
  'x-ms-client-request-id',
  '3ce15cba-5d1f-467c-bbb6-ffcdb39543a5',
  'x-ms-version',
  '2021-10-04',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Mon, 17 Oct 2022 10:08:42 GMT',
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
  'Mon, 17 Oct 2022 10:08:42 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem166600132064000218/tempfile2166600132176008476', "HelloWorld")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-lease-renewed',
  'true',
  'x-ms-request-id',
  '294a956f-701f-0008-5310-e2c247000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'd4b41f41-cff0-4d9a-845c-c8fd56bcb766',
  'Date',
  'Mon, 17 Oct 2022 10:08:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem166600132064000218/tempfile2166600132176008476', "HelloWorld")
  .query(true)
  .reply(412, {"error":{"code":"LeaseIdMissing","message":"There is currently a lease on the resource and no lease ID was specified in the request.\nRequestId:294a9570-701f-0008-5410-e2c247000000\nTime:2022-10-17T10:08:58.0792493Z"}}, [
  'Content-Length',
  '219',
  'Content-Type',
  'application/json;charset=utf-8',
  'x-ms-error-code',
  'LeaseIdMissing',
  'x-ms-request-id',
  '294a9570-701f-0008-5410-e2c247000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'b60671f5-da63-4519-b581-ef75b5a7e445',
  'Date',
  'Mon, 17 Oct 2022 10:08:57 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem166600132064000218/tempfile2166600132176008476')
  .reply(200, "", [
  'x-ms-delete-type-permanent',
  'true',
  'x-ms-request-id',
  '294a9578-701f-0008-5610-e2c247000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '241a906a-546f-4fec-90ae-503720fb4a6e',
  'Date',
  'Mon, 17 Oct 2022 10:09:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem166600132064000218')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'a1080185-201e-0006-7310-e203a9000000',
  'x-ms-client-request-id',
  '4e929784-decb-4a43-bdb6-aedc6010d897',
  'x-ms-version',
  '2021-10-04',
  'Date',
  'Mon, 17 Oct 2022 10:09:12 GMT'
]);
