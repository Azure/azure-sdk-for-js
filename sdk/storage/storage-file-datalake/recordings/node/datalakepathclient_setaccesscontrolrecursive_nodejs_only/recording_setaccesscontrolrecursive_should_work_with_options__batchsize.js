let nock = require('nock');

module.exports.hash = "6f872c2ff4eaadb73312542f93733ba6";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem159298728650606218","file":"file159298728681903574","directory":"directory159298728779307316","subdirectory1":"subdirectory1159298728779300370","fileName1":"fileName1159298728779304994","fileName2":"fileName2159298728779300607","subdirectory2":"subdirectory2159298728779309200","fileName3":"fileName3159298728779300783","fileName4":"fileName4159298728779302274"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298728650606218')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:03 GMT',
  'ETag',
  '"0x8D81818832C18C7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e9cc3ac7-501e-0079-0a01-4ab184000000',
  'x-ms-client-request-id',
  '612111a2-c688-43ee-811d-97035f936498',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Wed, 24 Jun 2020 08:28:02 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298728650606218/file159298728681903574')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:03 GMT',
  'ETag',
  '"0x8D81818836053A5"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b1d85bd-901f-0014-6001-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'e96f782f-6474-4955-a4a3-d7747f8a5ef3',
  'Date',
  'Wed, 24 Jun 2020 08:28:03 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159298728650606218/file159298728681903574', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '9b1d85be-901f-0014-6101-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '493c492f-c8a0-4338-a21a-71234f35f422',
  'Date',
  'Wed, 24 Jun 2020 08:28:03 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159298728650606218/file159298728681903574')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:04 GMT',
  'ETag',
  '"0x8D8181883C3FFEA"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '9b1d85bf-901f-0014-6201-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '2a93b666-dd2b-4779-9163-2fa787f2fe64',
  'Date',
  'Wed, 24 Jun 2020 08:28:03 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298728650606218/directory159298728779307316')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:04 GMT',
  'ETag',
  '"0x8D8181883F0AAE7"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b1d85c0-901f-0014-6301-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'b610cc97-d471-4370-8442-9a10217e4dc2',
  'Date',
  'Wed, 24 Jun 2020 08:28:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298728650606218/directory159298728779307316/subdirectory1159298728779300370')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:04 GMT',
  'ETag',
  '"0x8D818188423F1C1"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b1d85c1-901f-0014-6401-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'e9e81d52-b315-4452-8462-57abea38748a',
  'Date',
  'Wed, 24 Jun 2020 08:28:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298728650606218/directory159298728779307316/subdirectory2159298728779309200')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:05 GMT',
  'ETag',
  '"0x8D81818845205D4"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b1d85c2-901f-0014-6501-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '83178177-9c12-42b9-aff0-05aa421aa72a',
  'Date',
  'Wed, 24 Jun 2020 08:28:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298728650606218/directory159298728779307316/subdirectory1159298728779300370/fileName1159298728779304994')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:05 GMT',
  'ETag',
  '"0x8D818188484AD77"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b1d85c3-901f-0014-6601-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '156496eb-21e6-4e67-9717-e445776496fd',
  'Date',
  'Wed, 24 Jun 2020 08:28:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298728650606218/directory159298728779307316/subdirectory1159298728779300370/fileName2159298728779300607')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:05 GMT',
  'ETag',
  '"0x8D8181884B58124"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b1d85c4-901f-0014-6701-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '38411200-281e-4763-a69c-aba995512f15',
  'Date',
  'Wed, 24 Jun 2020 08:28:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298728650606218/directory159298728779307316/subdirectory2159298728779309200/fileName3159298728779300783')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:06 GMT',
  'ETag',
  '"0x8D8181884E308DA"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b1d85c6-901f-0014-6901-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '5ae18197-3714-4790-ae6e-1e7e5b13074d',
  'Date',
  'Wed, 24 Jun 2020 08:28:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298728650606218/directory159298728779307316/subdirectory2159298728779309200/fileName4159298728779302274')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:06 GMT',
  'ETag',
  '"0x8D81818852A0621"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b1d85c7-901f-0014-6a01-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '6315794b-53bb-40d0-a6d1-69dc7e472b7f',
  'Date',
  'Wed, 24 Jun 2020 08:28:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159298728650606218/directory159298728779307316')
  .query(true)
  .reply(200, {"directoriesSuccessful":2,"failedEntries":[],"failureCount":0,"filesSuccessful":0}, [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-continuation',
  'VBav0Zj06ubcsRsYswEYrQEvYWNsdGVzdGNibjA0cHJkc3RyMDFhATAxRDVBNTg4Q0Q0MTY1MzMvZmlsZXN5c3RlbTE1OTI5ODcyODY1MDYwNjIxOAEwMUQ2NEEwMTYwQjVGMjhGL2RpcmVjdG9yeTE1OTI5ODcyODc3OTMwNzMxNi9zdWJkaXJlY3RvcnkxMTU5Mjk4NzI4Nzc5MzAwMzcwL2ZpbGVOYW1lMTE1OTI5ODcyODc3OTMwNDk5NBYAAAA=',
  'x-ms-request-id',
  '9b1d85c9-901f-0014-6b01-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'f0837646-0ed2-42a7-ac35-6ee9549a9b6c',
  'Date',
  'Wed, 24 Jun 2020 08:28:06 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159298728650606218/directory159298728779307316')
  .query(true)
  .reply(200, {"directoriesSuccessful":0,"failedEntries":[],"failureCount":0,"filesSuccessful":2}, [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-continuation',
  'VBa/jvGll8XO43IYlwEYkQEvYWNsdGVzdGNibjA0cHJkc3RyMDFhATAxRDVBNTg4Q0Q0MTY1MzMvZmlsZXN5c3RlbTE1OTI5ODcyODY1MDYwNjIxOAEwMUQ2NEEwMTYwQjVGMjhGL2RpcmVjdG9yeTE1OTI5ODcyODc3OTMwNzMxNi9zdWJkaXJlY3RvcnkyMTU5Mjk4NzI4Nzc5MzA5MjAwFgAAAA==',
  'x-ms-request-id',
  '9b1d85cb-901f-0014-6d01-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '43bcbb02-6e4d-42cb-893d-482e2d7ef128',
  'Date',
  'Wed, 24 Jun 2020 08:28:07 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159298728650606218/directory159298728779307316')
  .query(true)
  .reply(200, {"directoriesSuccessful":1,"failedEntries":[],"failureCount":0,"filesSuccessful":1}, [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-continuation',
  'VBakmKuNiLD6kYUBGLMBGK0BL2FjbHRlc3RjYm4wNHByZHN0cjAxYQEwMUQ1QTU4OENENDE2NTMzL2ZpbGVzeXN0ZW0xNTkyOTg3Mjg2NTA2MDYyMTgBMDFENjRBMDE2MEI1RjI4Ri9kaXJlY3RvcnkxNTkyOTg3Mjg3NzkzMDczMTYvc3ViZGlyZWN0b3J5MjE1OTI5ODcyODc3OTMwOTIwMC9maWxlTmFtZTQxNTkyOTg3Mjg3NzkzMDIyNzQWAAAA',
  'x-ms-request-id',
  '9b1d85cd-901f-0014-6e01-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '68dacbf6-defb-4811-8f2c-9903e2c52f27',
  'Date',
  'Wed, 24 Jun 2020 08:28:07 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159298728650606218/directory159298728779307316')
  .query(true)
  .reply(200, {"directoriesSuccessful":0,"failedEntries":[],"failureCount":0,"filesSuccessful":1}, [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  '9b1d85ce-901f-0014-6f01-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'fe8b3786-55c2-4dce-8bf7-3956122666fb',
  'Date',
  'Wed, 24 Jun 2020 08:28:07 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem159298728650606218')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e9cc3d4c-501e-0079-1801-4ab184000000',
  'x-ms-client-request-id',
  '6ad4af9f-f0ef-46a5-93d1-aa268b33e391',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Wed, 24 Jun 2020 08:28:07 GMT'
]);
