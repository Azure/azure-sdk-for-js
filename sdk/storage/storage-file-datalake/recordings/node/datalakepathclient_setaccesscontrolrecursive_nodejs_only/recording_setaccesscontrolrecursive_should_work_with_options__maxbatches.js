let nock = require('nock');

module.exports.hash = "da1657d25943900fe51a0429a42c5f17";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem160242184453406947","file":"file160242184483409364","directory":"directory160242184572807318","subdirectory1":"subdirectory1160242184572802780","fileName1":"fileName1160242184572806962","fileName2":"fileName2160242184572803175","subdirectory2":"subdirectory2160242184572809149","fileName3":"fileName3160242184572802056","fileName4":"fileName4160242184572804285"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242184453406947')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 11 Oct 2020 13:08:46 GMT',
  'ETag',
  '"0x8D86DE6C99D1FA1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '761864a1-601e-006a-4bcf-9ffd81000000',
  'x-ms-client-request-id',
  '589b4e0a-abb0-4822-83ca-9db15d9f7e39',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 11 Oct 2020 13:08:46 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242184453406947/file160242184483409364')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:08:46 GMT',
  'ETag',
  '"0x8D86DE6C9CCAD5E"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66c1a601-a01f-0017-76cf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '0d761bc9-a58b-4fea-a4e0-9fbb497132ca',
  'Date',
  'Sun, 11 Oct 2020 13:08:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160242184453406947/file160242184483409364', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '66c1a605-a01f-0017-7acf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'e1ecb792-d5f5-4fc1-ab63-d74fa93fd068',
  'Date',
  'Sun, 11 Oct 2020 13:08:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160242184453406947/file160242184483409364')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:08:47 GMT',
  'ETag',
  '"0x8D86DE6CA273D1C"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '66c1a606-a01f-0017-7bcf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'ff29ac47-a278-478c-b251-d04212290aad',
  'Date',
  'Sun, 11 Oct 2020 13:08:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242184453406947/directory160242184572807318')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:08:47 GMT',
  'ETag',
  '"0x8D86DE6CA5539B0"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66c1a607-a01f-0017-7ccf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '7e495dec-3b5e-4464-a9d0-39397095d566',
  'Date',
  'Sun, 11 Oct 2020 13:08:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242184453406947/directory160242184572807318/subdirectory1160242184572802780')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:08:48 GMT',
  'ETag',
  '"0x8D86DE6CA827074"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66c1a60b-a01f-0017-80cf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'c7c28151-7753-4780-9633-2fe80ebbe662',
  'Date',
  'Sun, 11 Oct 2020 13:08:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242184453406947/directory160242184572807318/subdirectory2160242184572809149')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:08:48 GMT',
  'ETag',
  '"0x8D86DE6CAAF2552"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66c1a610-a01f-0017-05cf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'da79d3f8-2855-49e3-93f1-e89ee0bbe0b6',
  'Date',
  'Sun, 11 Oct 2020 13:08:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242184453406947/directory160242184572807318/subdirectory1160242184572802780/fileName1160242184572806962')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:08:48 GMT',
  'ETag',
  '"0x8D86DE6CADBEBBE"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66c1a612-a01f-0017-07cf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '1d9581e9-4729-4786-886f-dfc96dfa568f',
  'Date',
  'Sun, 11 Oct 2020 13:08:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242184453406947/directory160242184572807318/subdirectory1160242184572802780/fileName2160242184572803175')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:08:48 GMT',
  'ETag',
  '"0x8D86DE6CB08C755"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66c1a615-a01f-0017-0acf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'a77447d0-93f4-496a-9787-e35e68efe540',
  'Date',
  'Sun, 11 Oct 2020 13:08:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242184453406947/directory160242184572807318/subdirectory2160242184572809149/fileName3160242184572802056')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:08:49 GMT',
  'ETag',
  '"0x8D86DE6CB357D95"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66c1a61a-a01f-0017-0fcf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '6a25616a-9707-44d0-ac50-80b2b7f20ef9',
  'Date',
  'Sun, 11 Oct 2020 13:08:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242184453406947/directory160242184572807318/subdirectory2160242184572809149/fileName4160242184572804285')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:08:49 GMT',
  'ETag',
  '"0x8D86DE6CB6367EB"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66c1a61d-a01f-0017-12cf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'f3e768fa-e89d-4827-9f54-6b94a51fa4b3',
  'Date',
  'Sun, 11 Oct 2020 13:08:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160242184453406947/directory160242184572807318')
  .query(true)
  .reply(200, {"directoriesSuccessful":2,"failedEntries":[],"failureCount":0,"filesSuccessful":0}, [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-continuation',
  'VBal/Y/O+8Gtom4YrAEYpgEveGlhb25saWV1YXBobnMBMDFENjQ1NEZBNDAzQjY0OC9maWxlc3lzdGVtMTYwMjQyMTg0NDUzNDA2OTQ3ATAxRDY5RkNGQTcyNjdBNjIvZGlyZWN0b3J5MTYwMjQyMTg0NTcyODA3MzE4L3N1YmRpcmVjdG9yeTExNjAyNDIxODQ1NzI4MDI3ODAvZmlsZU5hbWUxMTYwMjQyMTg0NTcyODA2OTYyFgAAAA==',
  'x-ms-request-id',
  '66c1a61e-a01f-0017-13cf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'dcd8842d-6bac-4f69-b818-91fb51624e07',
  'Date',
  'Sun, 11 Oct 2020 13:08:49 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem160242184453406947')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7618656f-601e-006a-70cf-9ffd81000000',
  'x-ms-client-request-id',
  'e1f86a07-bac9-45da-9381-cd74f5dcc53f',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 11 Oct 2020 13:08:49 GMT'
]);
