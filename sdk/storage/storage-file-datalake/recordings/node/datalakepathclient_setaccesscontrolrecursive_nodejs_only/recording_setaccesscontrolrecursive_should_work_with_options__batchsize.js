let nock = require('nock');

module.exports.hash = "009d588711fdac7c2896a88469c45466";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem160242184840703287","file":"file160242184870908359","directory":"directory160242184960105730","subdirectory1":"subdirectory1160242184960105228","fileName1":"fileName1160242184960109876","fileName2":"fileName2160242184960105982","subdirectory2":"subdirectory2160242184960106995","fileName3":"fileName3160242184960106161","fileName4":"fileName4160242184960106516"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242184840703287')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 11 Oct 2020 13:08:50 GMT',
  'ETag',
  '"0x8D86DE6CBEC3AC4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '76186578-601e-006a-76cf-9ffd81000000',
  'x-ms-client-request-id',
  '5af974e5-cb00-4700-a45b-1e808441351e',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 11 Oct 2020 13:08:49 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242184840703287/file160242184870908359')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:08:50 GMT',
  'ETag',
  '"0x8D86DE6CC1C4526"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66c1a628-a01f-0017-1ccf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '1b6646b5-2434-4477-9b7d-82d6d699b393',
  'Date',
  'Sun, 11 Oct 2020 13:08:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160242184840703287/file160242184870908359', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '66c1a62c-a01f-0017-20cf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '8470d66c-caed-4e7f-b272-edd1020e10a0',
  'Date',
  'Sun, 11 Oct 2020 13:08:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160242184840703287/file160242184870908359')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:08:51 GMT',
  'ETag',
  '"0x8D86DE6CC766E52"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '66c1a62e-a01f-0017-22cf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '2ed66973-6659-4ab5-849c-6d8d28e4dd75',
  'Date',
  'Sun, 11 Oct 2020 13:08:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242184840703287/directory160242184960105730')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:08:51 GMT',
  'ETag',
  '"0x8D86DE6CCA44650"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66c1a632-a01f-0017-26cf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'cc400f82-df3d-48cf-ab12-fd37370957a4',
  'Date',
  'Sun, 11 Oct 2020 13:08:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242184840703287/directory160242184960105730/subdirectory1160242184960105228')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:08:51 GMT',
  'ETag',
  '"0x8D86DE6CCD19923"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66c1a638-a01f-0017-2ccf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'f232c7cc-8c8c-4f4a-9ea5-02c50e1158b2',
  'Date',
  'Sun, 11 Oct 2020 13:08:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242184840703287/directory160242184960105730/subdirectory2160242184960106995')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:08:52 GMT',
  'ETag',
  '"0x8D86DE6CCFEDA82"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66c1a63d-a01f-0017-31cf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'd23a3fa5-cc4a-4c11-964f-794f6371647d',
  'Date',
  'Sun, 11 Oct 2020 13:08:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242184840703287/directory160242184960105730/subdirectory1160242184960105228/fileName1160242184960109876')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:08:52 GMT',
  'ETag',
  '"0x8D86DE6CD2B95A8"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66c1a645-a01f-0017-39cf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '37dd754d-2f5c-4e18-9437-11facae9405c',
  'Date',
  'Sun, 11 Oct 2020 13:08:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242184840703287/directory160242184960105730/subdirectory1160242184960105228/fileName2160242184960105982')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:08:52 GMT',
  'ETag',
  '"0x8D86DE6CD585EDF"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66c1a64a-a01f-0017-3ecf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'd0ce2ce6-995f-4bcd-9cc2-8ceecb969b52',
  'Date',
  'Sun, 11 Oct 2020 13:08:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242184840703287/directory160242184960105730/subdirectory2160242184960106995/fileName3160242184960106161')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:08:53 GMT',
  'ETag',
  '"0x8D86DE6CD85855B"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66c1a64e-a01f-0017-42cf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '3127da35-1585-461e-90d1-1e7e84596fcc',
  'Date',
  'Sun, 11 Oct 2020 13:08:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242184840703287/directory160242184960105730/subdirectory2160242184960106995/fileName4160242184960106516')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:08:53 GMT',
  'ETag',
  '"0x8D86DE6CDB2976C"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66c1a651-a01f-0017-45cf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '52f52675-caf6-49d8-acf9-c56a6f2ba100',
  'Date',
  'Sun, 11 Oct 2020 13:08:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160242184840703287/directory160242184960105730')
  .query(true)
  .reply(200, {"directoriesSuccessful":2,"failedEntries":[],"failureCount":0,"filesSuccessful":0}, [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-continuation',
  'VBb+y8qNp/iU6z8YrAEYpgEveGlhb25saWV1YXBobnMBMDFENjQ1NEZBNDAzQjY0OC9maWxlc3lzdGVtMTYwMjQyMTg0ODQwNzAzMjg3ATAxRDY5RkNGQTk3NTZDM0IvZGlyZWN0b3J5MTYwMjQyMTg0OTYwMTA1NzMwL3N1YmRpcmVjdG9yeTExNjAyNDIxODQ5NjAxMDUyMjgvZmlsZU5hbWUxMTYwMjQyMTg0OTYwMTA5ODc2FgAAAA==',
  'x-ms-request-id',
  '66c1a652-a01f-0017-46cf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'f5735335-7dd2-4f02-adc7-eb95278d057f',
  'Date',
  'Sun, 11 Oct 2020 13:08:53 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160242184840703287/directory160242184960105730')
  .query(true)
  .reply(200, {"directoriesSuccessful":0,"failedEntries":[],"failureCount":0,"filesSuccessful":2}, [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-continuation',
  'VBaTxefExKKH7bUBGJABGIoBL3hpYW9ubGlldWFwaG5zATAxRDY0NTRGQTQwM0I2NDgvZmlsZXN5c3RlbTE2MDI0MjE4NDg0MDcwMzI4NwEwMUQ2OUZDRkE5NzU2QzNCL2RpcmVjdG9yeTE2MDI0MjE4NDk2MDEwNTczMC9zdWJkaXJlY3RvcnkyMTYwMjQyMTg0OTYwMTA2OTk1FgAAAA==',
  'x-ms-request-id',
  '66c1a659-a01f-0017-4dcf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '99562f41-a862-4c90-906d-7b9bda555a4b',
  'Date',
  'Sun, 11 Oct 2020 13:08:53 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160242184840703287/directory160242184960105730')
  .query(true)
  .reply(200, {"directoriesSuccessful":1,"failedEntries":[],"failureCount":0,"filesSuccessful":1}, [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-continuation',
  'VBbgo7CHho7IhdMBGKwBGKYBL3hpYW9ubGlldWFwaG5zATAxRDY0NTRGQTQwM0I2NDgvZmlsZXN5c3RlbTE2MDI0MjE4NDg0MDcwMzI4NwEwMUQ2OUZDRkE5NzU2QzNCL2RpcmVjdG9yeTE2MDI0MjE4NDk2MDEwNTczMC9zdWJkaXJlY3RvcnkyMTYwMjQyMTg0OTYwMTA2OTk1L2ZpbGVOYW1lNDE2MDI0MjE4NDk2MDEwNjUxNhYAAAA=',
  'x-ms-request-id',
  '66c1a65e-a01f-0017-52cf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '237b43ec-dc78-49b7-a6f0-dbfede5bc9b9',
  'Date',
  'Sun, 11 Oct 2020 13:08:53 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160242184840703287/directory160242184960105730')
  .query(true)
  .reply(200, {"directoriesSuccessful":0,"failedEntries":[],"failureCount":0,"filesSuccessful":1}, [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  '66c1a665-a01f-0017-59cf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '5a7f97e3-03d9-42f7-85ec-b731861c425a',
  'Date',
  'Sun, 11 Oct 2020 13:08:53 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem160242184840703287')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '76186722-601e-006a-4ccf-9ffd81000000',
  'x-ms-client-request-id',
  '4d2cf05e-ced3-4da8-8426-60988b171551',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 11 Oct 2020 13:08:54 GMT'
]);
