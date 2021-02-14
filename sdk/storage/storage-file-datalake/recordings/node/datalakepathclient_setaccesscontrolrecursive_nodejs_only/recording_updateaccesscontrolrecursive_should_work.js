let nock = require('nock');

module.exports.hash = "6ba6d49cba26b09c87804042e480c693";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem160242185732706180","file":"file160242185762800604","directory":"directory160242185852009366","subdirectory1":"subdirectory1160242185852009199","fileName1":"fileName1160242185852006207","fileName2":"fileName2160242185852006815","subdirectory2":"subdirectory2160242185852008135","fileName3":"fileName3160242185852004818","fileName4":"fileName4160242185852004531"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242185732706180')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 11 Oct 2020 13:08:59 GMT',
  'ETag',
  '"0x8D86DE6D13DA239"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '76186822-601e-006a-07cf-9ffd81000000',
  'x-ms-client-request-id',
  '3dcd7ab6-562d-412f-ac57-55dbd539e858',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 11 Oct 2020 13:08:58 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242185732706180/file160242185762800604')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:08:59 GMT',
  'ETag',
  '"0x8D86DE6D16C6387"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66c1a6ad-a01f-0017-1ecf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'b4f0fd40-3387-47a1-ace6-737aca91c4c8',
  'Date',
  'Sun, 11 Oct 2020 13:08:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160242185732706180/file160242185762800604', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '66c1a6b0-a01f-0017-21cf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '7568b757-b768-4f6f-bccf-3fb0f443e09c',
  'Date',
  'Sun, 11 Oct 2020 13:08:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160242185732706180/file160242185762800604')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:09:00 GMT',
  'ETag',
  '"0x8D86DE6D1C6C22B"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '66c1a6b3-a01f-0017-24cf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '5d795b2d-3136-4ce4-9127-2a254544d8f7',
  'Date',
  'Sun, 11 Oct 2020 13:08:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242185732706180/directory160242185852009366')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:09:00 GMT',
  'ETag',
  '"0x8D86DE6D1F739F9"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66c1a6bb-a01f-0017-2bcf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '041d72d2-2fcb-4cd3-a387-428680d8bdc7',
  'Date',
  'Sun, 11 Oct 2020 13:08:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242185732706180/directory160242185852009366/subdirectory1160242185852009199')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:09:00 GMT',
  'ETag',
  '"0x8D86DE6D22485BE"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66c1a6be-a01f-0017-2ecf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'ae006156-8afd-4cde-aa99-d49fd2542361',
  'Date',
  'Sun, 11 Oct 2020 13:09:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242185732706180/directory160242185852009366/subdirectory2160242185852008135')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:09:01 GMT',
  'ETag',
  '"0x8D86DE6D250F176"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66c1a6c2-a01f-0017-32cf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '8431224b-6a76-495e-8bd7-3d4c5a1ae31b',
  'Date',
  'Sun, 11 Oct 2020 13:09:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242185732706180/directory160242185852009366/subdirectory1160242185852009199/fileName1160242185852006207')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:09:01 GMT',
  'ETag',
  '"0x8D86DE6D27DF3CB"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66c1a6c6-a01f-0017-36cf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '4fb30070-ab84-48d2-ab53-4021412db8b7',
  'Date',
  'Sun, 11 Oct 2020 13:09:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242185732706180/directory160242185852009366/subdirectory1160242185852009199/fileName2160242185852006815')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:09:01 GMT',
  'ETag',
  '"0x8D86DE6D2AAB2D5"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66c1a6c7-a01f-0017-37cf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '4c68f09c-52b7-43c7-8067-0d41e179d462',
  'Date',
  'Sun, 11 Oct 2020 13:09:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242185732706180/directory160242185852009366/subdirectory2160242185852008135/fileName3160242185852004818')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:09:02 GMT',
  'ETag',
  '"0x8D86DE6D2D8D201"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66c1a6cc-a01f-0017-3ccf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '6ff1145e-c44b-4de0-a580-a55e7d96382e',
  'Date',
  'Sun, 11 Oct 2020 13:09:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242185732706180/directory160242185852009366/subdirectory2160242185852008135/fileName4160242185852004531')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:09:02 GMT',
  'ETag',
  '"0x8D86DE6D305F3BA"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66c1a6d1-a01f-0017-41cf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '3e04668e-6d29-4fe2-90e7-1b7cbd884bbe',
  'Date',
  'Sun, 11 Oct 2020 13:09:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160242185732706180/directory160242185852009366')
  .query(true)
  .reply(200, {"directoriesSuccessful":3,"failedEntries":[],"failureCount":0,"filesSuccessful":4}, [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  '66c1a6d6-a01f-0017-46cf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '77fb3353-e4b4-46a6-826c-96f4913fac0d',
  'Date',
  'Sun, 11 Oct 2020 13:09:02 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem160242185732706180')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '76186922-601e-006a-46cf-9ffd81000000',
  'x-ms-client-request-id',
  '7fc57abc-2c9b-4d27-ba8a-90fa64a152ca',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 11 Oct 2020 13:09:02 GMT'
]);
