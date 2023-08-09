let nock = require('nock');

module.exports.hash = "abdb3a72a29ed2da2a03386e3d4da38e";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem169154750283605727","filesystem169154750283605727":"filesystem169154750283605727169154750297206982","file":"file169154750311001624","dir":"dir169154750323403400"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154750283605727')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:22 GMT',
  'ETag',
  '"0x8DB987EE7ABA0EF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c262d5-101e-002e-0e67-caab16000000',
  'x-ms-client-request-id',
  '71ec746f-4320-4481-a8a6-f8df76c36984',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:21 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154750283605727169154750297206982')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:22 GMT',
  'ETag',
  '"0x8DB987EE7C05E5F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c262e1-101e-002e-1967-caab16000000',
  'x-ms-client-request-id',
  '3fc5241e-7320-40c8-9817-2cebf083259d',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:21 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154750283605727169154750297206982/file169154750311001624')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:22 GMT',
  'ETag',
  '"0x8DB987EE7D6D69C"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1673d38-f01f-0054-7e67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '769b31ba-6f15-4ca4-aada-2d3cbaf75823',
  'Date',
  'Wed, 09 Aug 2023 02:18:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154750283605727169154750297206982/dir169154750323403400')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:22 GMT',
  'ETag',
  '"0x8DB987EE7E9572C"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1673d39-f01f-0054-7f67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'd324cbe3-2705-4713-8d7d-d39428fc8eee',
  'Date',
  'Wed, 09 Aug 2023 02:18:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem169154750283605727169154750297206982')
  .query(true)
  .reply(200, {"paths":[{"EncryptionContext":"EncryptionContext","contentLength":"0","creationTime":"133360211027187500","etag":"0x8DB987EE7E9572C","expiryTime":"0","group":"$superuser","lastModified":"Wed, 09 Aug 2023 02:18:22 GMT","name":"dir169154750323403400","owner":"$superuser","permissions":"rw-r-----"},{"EncryptionContext":"EncryptionContext","contentLength":"0","creationTime":"133360211025974940","etag":"0x8DB987EE7D6D69C","expiryTime":"0","group":"$superuser","lastModified":"Wed, 09 Aug 2023 02:18:22 GMT","name":"file169154750311001624","owner":"$superuser","permissions":"rw-r-----"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f1673d3a-f01f-0054-8067-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'd313021e-6fbe-4c3b-87c2-5cabc283cc76',
  'Access-Control-Expose-Headers',
  'Content-Length,Content-Type,Date,Server,Transfer-Encoding,x-ms-client-request-id,x-ms-request-id,x-ms-version',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Aug 2023 02:18:22 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154750283605727169154750297206982/file169154750311001624')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211029670574',
  'x-ms-request-id',
  'f1673d3b-f01f-0054-0167-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '64f43009-8c09-4317-8c59-165143659187',
  'Date',
  'Wed, 09 Aug 2023 02:18:22 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154750283605727169154750297206982/dir169154750323403400')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211031116437',
  'x-ms-request-id',
  'f1673d3c-f01f-0054-0267-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '5d3a6e5d-5d7c-480a-9926-303a0ca984c6',
  'Date',
  'Wed, 09 Aug 2023 02:18:22 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154750283605727')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c26334-101e-002e-5f67-caab16000000',
  'x-ms-client-request-id',
  '17ca6886-1f53-4561-bce8-55daa1e6a94e',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:22 GMT'
]);
