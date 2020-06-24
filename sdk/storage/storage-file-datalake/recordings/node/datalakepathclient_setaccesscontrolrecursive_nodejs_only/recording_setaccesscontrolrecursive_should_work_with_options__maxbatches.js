let nock = require('nock');

module.exports.hash = "c9de68a9ba13fc45789d021f12a5542f";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem159298728247002032","file":"file159298728277801229","directory":"directory159298728374309170","subdirectory1":"subdirectory1159298728374307230","fileName1":"fileName1159298728374308050","fileName2":"fileName2159298728374303870","subdirectory2":"subdirectory2159298728374306079","fileName3":"fileName3159298728374300066","fileName4":"fileName4159298728374308433"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298728247002032')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 24 Jun 2020 08:27:59 GMT',
  'ETag',
  '"0x8D8181880C41DB5"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e9cc38a6-501e-0079-4a01-4ab184000000',
  'x-ms-client-request-id',
  'aeb133c7-17a4-4c4d-9ed8-79cb7bd17380',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Wed, 24 Jun 2020 08:27:58 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298728247002032/file159298728277801229')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:27:59 GMT',
  'ETag',
  '"0x8D8181880F4C8CC"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b1d85ae-901f-0014-5501-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'ae0c06c5-b862-477f-8483-732ad914b18a',
  'Date',
  'Wed, 24 Jun 2020 08:27:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159298728247002032/file159298728277801229', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '9b1d85b0-901f-0014-5601-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'd42864ff-8c7d-4fab-bf25-1df7cb1380ba',
  'Date',
  'Wed, 24 Jun 2020 08:27:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159298728247002032/file159298728277801229')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:00 GMT',
  'ETag',
  '"0x8D81818815A416F"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '9b1d85b1-901f-0014-5701-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '9c3db976-0fc7-4453-a091-89f077cdc5a8',
  'Date',
  'Wed, 24 Jun 2020 08:27:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298728247002032/directory159298728374309170')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:00 GMT',
  'ETag',
  '"0x8D81818818769E5"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b1d85b2-901f-0014-5801-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '05935087-f236-41cf-bd7f-440bc37254b9',
  'Date',
  'Wed, 24 Jun 2020 08:28:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298728247002032/directory159298728374309170/subdirectory1159298728374307230')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:00 GMT',
  'ETag',
  '"0x8D8181881B3F263"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b1d85b4-901f-0014-5901-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '9e815759-fb1e-4eae-b163-a3e5a3f0392e',
  'Date',
  'Wed, 24 Jun 2020 08:28:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298728247002032/directory159298728374309170/subdirectory2159298728374306079')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:01 GMT',
  'ETag',
  '"0x8D8181881E15F3D"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b1d85b5-901f-0014-5a01-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '8197fadc-0440-4c78-aa9e-73cccb7ebddb',
  'Date',
  'Wed, 24 Jun 2020 08:28:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298728247002032/directory159298728374309170/subdirectory1159298728374307230/fileName1159298728374308050')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:01 GMT',
  'ETag',
  '"0x8D81818820EBE21"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b1d85b6-901f-0014-5b01-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '0dc5b442-3178-4493-a9bc-26a23aef33e2',
  'Date',
  'Wed, 24 Jun 2020 08:28:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298728247002032/directory159298728374309170/subdirectory1159298728374307230/fileName2159298728374303870')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:01 GMT',
  'ETag',
  '"0x8D81818823C69F1"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b1d85b7-901f-0014-5c01-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '96041468-64ea-4ebc-96df-c0d2731b8615',
  'Date',
  'Wed, 24 Jun 2020 08:28:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298728247002032/directory159298728374309170/subdirectory2159298728374306079/fileName3159298728374300066')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:01 GMT',
  'ETag',
  '"0x8D81818826B6C5D"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b1d85b9-901f-0014-5d01-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '854f81d6-4ff2-49fe-ba76-6d25aa79747f',
  'Date',
  'Wed, 24 Jun 2020 08:28:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298728247002032/directory159298728374309170/subdirectory2159298728374306079/fileName4159298728374308433')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:02 GMT',
  'ETag',
  '"0x8D8181882980A6C"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b1d85bb-901f-0014-5e01-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'f7d6f048-d969-40b3-bf1c-920dc90b1583',
  'Date',
  'Wed, 24 Jun 2020 08:28:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159298728247002032/directory159298728374309170')
  .query(true)
  .reply(200, {"directoriesSuccessful":2,"failedEntries":[],"failureCount":0,"filesSuccessful":0}, [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-continuation',
  'VBaCh+GmyIXRtDEYswEYrQEvYWNsdGVzdGNibjA0cHJkc3RyMDFhATAxRDVBNTg4Q0Q0MTY1MzMvZmlsZXN5c3RlbTE1OTI5ODcyODI0NzAwMjAzMgEwMUQ2NEEwMTVFNERGOTJEL2RpcmVjdG9yeTE1OTI5ODcyODM3NDMwOTE3MC9zdWJkaXJlY3RvcnkxMTU5Mjk4NzI4Mzc0MzA3MjMwL2ZpbGVOYW1lMTE1OTI5ODcyODM3NDMwODA1MBYAAAA=',
  'x-ms-request-id',
  '9b1d85bc-901f-0014-5f01-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'e6c77c4e-7f83-4c88-b4b8-20bb09deb771',
  'Date',
  'Wed, 24 Jun 2020 08:28:02 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem159298728247002032')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e9cc3a86-501e-0079-5101-4ab184000000',
  'x-ms-client-request-id',
  '626310e3-6a92-47f1-854e-6ad3ed3ddbe4',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Wed, 24 Jun 2020 08:28:02 GMT'
]);
