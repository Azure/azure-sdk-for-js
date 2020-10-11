let nock = require('nock');

module.exports.hash = "40a2a13aeb4cfabdd2f878bc055a89a2";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem160242185317302296","file":"file160242185347203676","directory":"directory160242185435205746","subdirectory1":"subdirectory1160242185435205538","fileName1":"fileName1160242185435200504","fileName2":"fileName2160242185435201110","subdirectory2":"subdirectory2160242185435206202","fileName3":"fileName3160242185435206246","fileName4":"fileName4160242185435203369"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242185317302296')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 11 Oct 2020 13:08:55 GMT',
  'ETag',
  '"0x8D86DE6CEC35E82"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '76186738-601e-006a-5ecf-9ffd81000000',
  'x-ms-client-request-id',
  '9f720722-5e4a-464e-b70f-af962ed42951',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 11 Oct 2020 13:08:54 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242185317302296/file160242185347203676')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:08:55 GMT',
  'ETag',
  '"0x8D86DE6CEF23ED2"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66c1a671-a01f-0017-64cf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '30e6871e-93ca-4a22-896b-9866aecbacaf',
  'Date',
  'Sun, 11 Oct 2020 13:08:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160242185317302296/file160242185347203676', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '66c1a674-a01f-0017-67cf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'a5b2777a-1d72-4179-a5ba-cf1c72d32e44',
  'Date',
  'Sun, 11 Oct 2020 13:08:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160242185317302296/file160242185347203676')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:08:56 GMT',
  'ETag',
  '"0x8D86DE6CF4B7202"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '66c1a67b-a01f-0017-6dcf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'e6fab354-acdd-49ab-a20a-0da416a51664',
  'Date',
  'Sun, 11 Oct 2020 13:08:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242185317302296/directory160242185435205746')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:08:56 GMT',
  'ETag',
  '"0x8D86DE6CF787D25"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66c1a67e-a01f-0017-70cf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '5a58cfa5-b3b7-401c-b5d0-061703f50392',
  'Date',
  'Sun, 11 Oct 2020 13:08:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242185317302296/directory160242185435205746/subdirectory1160242185435205538')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:08:56 GMT',
  'ETag',
  '"0x8D86DE6CFA5BC13"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66c1a681-a01f-0017-73cf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '56ff0066-a0fc-4694-8081-e901ec0f74f9',
  'Date',
  'Sun, 11 Oct 2020 13:08:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242185317302296/directory160242185435205746/subdirectory2160242185435206202')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:08:56 GMT',
  'ETag',
  '"0x8D86DE6CFD2174D"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66c1a684-a01f-0017-76cf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '8cc89b59-e975-467f-8a06-1e21d34ee75f',
  'Date',
  'Sun, 11 Oct 2020 13:08:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242185317302296/directory160242185435205746/subdirectory1160242185435205538/fileName1160242185435200504')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:08:57 GMT',
  'ETag',
  '"0x8D86DE6CFFF0EBC"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66c1a686-a01f-0017-78cf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '1fbd8b2f-d56a-4e34-9654-94c4039ff59f',
  'Date',
  'Sun, 11 Oct 2020 13:08:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242185317302296/directory160242185435205746/subdirectory1160242185435205538/fileName2160242185435201110')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:08:57 GMT',
  'ETag',
  '"0x8D86DE6D02BD58A"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66c1a689-a01f-0017-7bcf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '3c0d2ddf-7104-42c8-b47f-aabded8fd6f0',
  'Date',
  'Sun, 11 Oct 2020 13:08:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242185317302296/directory160242185435205746/subdirectory2160242185435206202/fileName3160242185435206246')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:08:57 GMT',
  'ETag',
  '"0x8D86DE6D058898C"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66c1a68d-a01f-0017-7fcf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '73989f25-1bfd-4933-b4d3-8b90201951fe',
  'Date',
  'Sun, 11 Oct 2020 13:08:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242185317302296/directory160242185435205746/subdirectory2160242185435206202/fileName4160242185435203369')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:08:58 GMT',
  'ETag',
  '"0x8D86DE6D08652E2"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66c1a690-a01f-0017-02cf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '09c57090-13c1-42fb-b802-a83ad23f84ac',
  'Date',
  'Sun, 11 Oct 2020 13:08:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160242185317302296/directory160242185435205746')
  .query(true)
  .reply(200, {"directoriesSuccessful":2,"failedEntries":[],"failureCount":0,"filesSuccessful":0}, [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-continuation',
  'VBb2ue2Wkue3410YrAEYpgEveGlhb25saWV1YXBobnMBMDFENjQ1NEZBNDAzQjY0OC9maWxlc3lzdGVtMTYwMjQyMTg1MzE3MzAyMjk2ATAxRDY5RkNGQUM0Q0I0NEEvZGlyZWN0b3J5MTYwMjQyMTg1NDM1MjA1NzQ2L3N1YmRpcmVjdG9yeTExNjAyNDIxODU0MzUyMDU1MzgvZmlsZU5hbWUxMTYwMjQyMTg1NDM1MjAwNTA0FgAAAA==',
  'x-ms-request-id',
  '66c1a697-a01f-0017-09cf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '381ac342-36dd-49a9-b59d-d93bb9462014',
  'Date',
  'Sun, 11 Oct 2020 13:08:57 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160242185317302296/directory160242185435205746')
  .query(true)
  .reply(200, {"directoriesSuccessful":1,"failedEntries":[],"failureCount":0,"filesSuccessful":4}, [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  '66c1a69c-a01f-0017-0dcf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '7dd630a9-91bd-4743-b886-114d543e04af',
  'Date',
  'Sun, 11 Oct 2020 13:08:58 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem160242185317302296')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '76186809-601e-006a-72cf-9ffd81000000',
  'x-ms-client-request-id',
  'b84bfc02-7fbe-4496-9f48-b41718fa67cc',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 11 Oct 2020 13:08:58 GMT'
]);
