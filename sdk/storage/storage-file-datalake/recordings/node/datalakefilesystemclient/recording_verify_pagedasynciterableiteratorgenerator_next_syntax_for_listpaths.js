let nock = require('nock');

module.exports.hash = "c4ad2b1f046a4d87ab87e1522c5e5b11";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem169154751138405565","file0":"file0169154751151106611","file1":"file1169154751163602148"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154751138405565')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:30 GMT',
  'ETag',
  '"0x8DB987EECC3F668"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c26754-101e-002e-3067-caab16000000',
  'x-ms-client-request-id',
  'efb7dc16-eb5f-4c36-afc4-6e248f07c8b9',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:30 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154751138405565/file0169154751151106611')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:30 GMT',
  'ETag',
  '"0x8DB987EECD8C1A4"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1673dc0-f01f-0054-6067-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'b95cd7e8-286c-4659-a1b9-3204de333de2',
  'Date',
  'Wed, 09 Aug 2023 02:18:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154751138405565/file1169154751163602148')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:31 GMT',
  'ETag',
  '"0x8DB987EECEB4A0C"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1673dd3-f01f-0054-7367-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '88480411-a46a-454a-9485-edac798a4fee',
  'Date',
  'Wed, 09 Aug 2023 02:18:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem169154751138405565')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","creationTime":"133360211109986724","etag":"0x8DB987EECD8C1A4","expiryTime":"0","group":"$superuser","lastModified":"Wed, 09 Aug 2023 02:18:30 GMT","name":"file0169154751151106611","owner":"$superuser","permissions":"rw-r-----"},{"contentLength":"0","creationTime":"133360211111201292","etag":"0x8DB987EECEB4A0C","expiryTime":"0","group":"$superuser","lastModified":"Wed, 09 Aug 2023 02:18:31 GMT","name":"file1169154751163602148","owner":"$superuser","permissions":"rw-r-----"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f1673de4-f01f-0054-0267-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'ce150a13-154c-4492-a888-209fa95caf4e',
  'Access-Control-Expose-Headers',
  'Content-Length,Content-Type,Date,Server,Transfer-Encoding,x-ms-client-request-id,x-ms-request-id,x-ms-version',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Aug 2023 02:18:30 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154751138405565/file0169154751151106611')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211113699081',
  'x-ms-request-id',
  'f1673dee-f01f-0054-0b67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '0274085c-cff8-4428-ae18-072b42d9f8c6',
  'Date',
  'Wed, 09 Aug 2023 02:18:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154751138405565/file1169154751163602148')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211115084320',
  'x-ms-request-id',
  'f1673e07-f01f-0054-2367-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'babef041-cf7f-4962-8c1d-d618898f0e78',
  'Date',
  'Wed, 09 Aug 2023 02:18:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154751138405565')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c267c3-101e-002e-0967-caab16000000',
  'x-ms-client-request-id',
  '0da0442a-3266-4bed-b01a-bc336fa3a965',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:30 GMT'
]);
