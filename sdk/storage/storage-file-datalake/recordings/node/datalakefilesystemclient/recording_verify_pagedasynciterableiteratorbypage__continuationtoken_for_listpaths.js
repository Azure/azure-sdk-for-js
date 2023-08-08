let nock = require('nock');

module.exports.hash = "dc9969d3d8a1368353672c67e1444429";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem169154751392305558","file0":"file0169154751405709032","file1":"file1169154751418600648","file2":"file2169154751431101548","file3":"file3169154751443308424"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154751392305558')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:33 GMT',
  'ETag',
  '"0x8DB987EEE47501B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c2692b-101e-002e-5767-caab16000000',
  'x-ms-client-request-id',
  '28238ea6-e124-4bb2-9574-9fa7ce88a899',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:32 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154751392305558/file0169154751405709032')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:33 GMT',
  'ETag',
  '"0x8DB987EEE5D3F4F"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1673ebb-f01f-0054-5467-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'a1bac8ff-0dd3-4a85-924a-0a87363e95cd',
  'Date',
  'Wed, 09 Aug 2023 02:18:32 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154751392305558/file1169154751418600648')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:33 GMT',
  'ETag',
  '"0x8DB987EEE7048CA"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1673ec3-f01f-0054-5c67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'b8264e83-406a-47f3-a028-47d500df67d6',
  'Date',
  'Wed, 09 Aug 2023 02:18:32 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154751392305558/file2169154751431101548')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:33 GMT',
  'ETag',
  '"0x8DB987EEE8374D1"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1673ece-f01f-0054-6767-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '4ac84ac3-aefa-4182-9cb4-2afedaf89c41',
  'Date',
  'Wed, 09 Aug 2023 02:18:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154751392305558/file3169154751443308424')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:33 GMT',
  'ETag',
  '"0x8DB987EEE960A7F"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1673ed6-f01f-0054-6f67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'd2403b72-d8dd-4ebb-b328-da222f46a397',
  'Date',
  'Wed, 09 Aug 2023 02:18:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem169154751392305558')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","creationTime":"133360211135446863","etag":"0x8DB987EEE5D3F4F","expiryTime":"0","group":"$superuser","lastModified":"Wed, 09 Aug 2023 02:18:33 GMT","name":"file0169154751405709032","owner":"$superuser","permissions":"rw-r-----"},{"contentLength":"0","creationTime":"133360211136694474","etag":"0x8DB987EEE7048CA","expiryTime":"0","group":"$superuser","lastModified":"Wed, 09 Aug 2023 02:18:33 GMT","name":"file1169154751418600648","owner":"$superuser","permissions":"rw-r-----"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-continuation',
  'VBbMhq/ug5q+5JwBGGkYZC9lbW1hZGF0YWxha2UBMDFENkZBMDAwMTkxNjUzNy9maWxlc3lzdGVtMTY5MTU0NzUxMzkyMzA1NTU4ATAxRDlDQTY3Q0JEMEIwREIvZmlsZTIxNjkxNTQ3NTE0MzExMDE1NDgWAAAA',
  'x-ms-request-id',
  'f1673ede-f01f-0054-7767-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '5d8012e4-23f4-478e-972e-1635af9dd9fe',
  'Access-Control-Expose-Headers',
  'Content-Length,Content-Type,Date,Server,Transfer-Encoding,x-ms-client-request-id,x-ms-continuation,x-ms-request-id,x-ms-version',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Aug 2023 02:18:33 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem169154751392305558')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","creationTime":"133360211135446863","etag":"0x8DB987EEE5D3F4F","expiryTime":"0","group":"$superuser","lastModified":"Wed, 09 Aug 2023 02:18:33 GMT","name":"file0169154751405709032","owner":"$superuser","permissions":"rw-r-----"},{"contentLength":"0","creationTime":"133360211136694474","etag":"0x8DB987EEE7048CA","expiryTime":"0","group":"$superuser","lastModified":"Wed, 09 Aug 2023 02:18:33 GMT","name":"file1169154751418600648","owner":"$superuser","permissions":"rw-r-----"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-continuation',
  'VBbMhq/ug5q+5JwBGGkYZC9lbW1hZGF0YWxha2UBMDFENkZBMDAwMTkxNjUzNy9maWxlc3lzdGVtMTY5MTU0NzUxMzkyMzA1NTU4ATAxRDlDQTY3Q0JEMEIwREIvZmlsZTIxNjkxNTQ3NTE0MzExMDE1NDgWAAAA',
  'x-ms-request-id',
  'f1673ee5-f01f-0054-7e67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '642f1d4a-396b-4dbe-a5d4-1fdbac16e71c',
  'Access-Control-Expose-Headers',
  'Content-Length,Content-Type,Date,Server,Transfer-Encoding,x-ms-client-request-id,x-ms-continuation,x-ms-request-id,x-ms-version',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Aug 2023 02:18:33 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154751392305558/file0169154751405709032')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211143061326',
  'x-ms-request-id',
  'f1673eeb-f01f-0054-0467-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '667ed645-4ad7-44c9-8c79-dd6ca4ad3ff9',
  'Date',
  'Wed, 09 Aug 2023 02:18:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154751392305558/file1169154751418600648')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211144609258',
  'x-ms-request-id',
  'f1673ef4-f01f-0054-0d67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '891af851-c04d-4fba-9983-112dd8c89b9f',
  'Date',
  'Wed, 09 Aug 2023 02:18:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154751392305558/file2169154751431101548')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211146088659',
  'x-ms-request-id',
  'f1673efb-f01f-0054-1367-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '7e32b5dc-f389-4c2b-a82a-386233ff7bb0',
  'Date',
  'Wed, 09 Aug 2023 02:18:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154751392305558/file3169154751443308424')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211147582526',
  'x-ms-request-id',
  'f1673efe-f01f-0054-1667-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'c5f37b93-ca6c-4878-a27f-3ccf81b27e7e',
  'Date',
  'Wed, 09 Aug 2023 02:18:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154751392305558')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c269e8-101e-002e-6a67-caab16000000',
  'x-ms-client-request-id',
  '367be25d-90cc-48df-87b8-09c871d38cb6',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:34 GMT'
]);
