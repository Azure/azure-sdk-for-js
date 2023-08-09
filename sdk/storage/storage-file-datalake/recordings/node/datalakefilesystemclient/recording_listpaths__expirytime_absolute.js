let nock = require('nock');

module.exports.hash = "c64799872481f148782acae6cc75871a";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem169154750586705083","file":"file169154750600301518"},"newDate":{"now":"2023-08-09T02:18:26.003Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154750586705083')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:25 GMT',
  'ETag',
  '"0x8DB987EE97A2966"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c26421-101e-002e-2367-caab16000000',
  'x-ms-client-request-id',
  'c1eab297-d551-4ce9-b499-434e8cae06a4',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:24 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154750586705083/file169154750600301518')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:25 GMT',
  'ETag',
  '"0x8DB987EE9906FDE"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1673d47-f01f-0054-0b67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '9b594d4e-8a30-41ae-b2ab-a6b46ce472e7',
  'Date',
  'Wed, 09 Aug 2023 02:18:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154750586705083/file169154750600301518', "Hello, World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1673d48-f01f-0054-0c67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '4510bd8b-44d9-4792-94cd-e85060908e61',
  'Date',
  'Wed, 09 Aug 2023 02:18:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154750586705083/file169154750600301518')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:25 GMT',
  'ETag',
  '"0x8DB987EE9B64C7B"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  'f1673d49-f01f-0054-0d67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '7241e858-352a-461d-903b-f07567e926a4',
  'Date',
  'Wed, 09 Aug 2023 02:18:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154750586705083/file169154750600301518')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:25 GMT',
  'ETag',
  '"0x8DB987EE9B64C7B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c2645c-101e-002e-5367-caab16000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'e37cc36f-1ff9-4c54-b9d6-4c6a8b9c5706',
  'Date',
  'Wed, 09 Aug 2023 02:18:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem169154750586705083')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"12","creationTime":"133360211054915550","etag":"0x8DB987EE9B64C7B","expiryTime":"133360211360000000","group":"$superuser","lastModified":"Wed, 09 Aug 2023 02:18:25 GMT","name":"file169154750600301518","owner":"$superuser","permissions":"rw-r-----"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f1673d4e-f01f-0054-1267-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'b9528b24-9106-4712-a9a0-0b0febd49272',
  'Access-Control-Expose-Headers',
  'Content-Length,Content-Type,Date,Server,Transfer-Encoding,x-ms-client-request-id,x-ms-request-id,x-ms-version',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Aug 2023 02:18:25 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154750586705083/file169154750600301518')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211061108028',
  'x-ms-request-id',
  'f1673d4f-f01f-0054-1367-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '71080d7f-4284-4aa9-a931-94c25518c5c3',
  'Date',
  'Wed, 09 Aug 2023 02:18:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154750586705083')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c26487-101e-002e-7267-caab16000000',
  'x-ms-client-request-id',
  'd0778fd3-52e8-46b5-93b0-21c29fb92ad0',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:25 GMT'
]);
