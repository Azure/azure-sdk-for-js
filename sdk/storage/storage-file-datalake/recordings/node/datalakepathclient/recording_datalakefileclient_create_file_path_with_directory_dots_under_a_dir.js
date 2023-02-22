let nock = require('nock');

module.exports.hash = "98f14b3173bde95c5dd7cc83616c7f23";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem167703368693005188","file":"file167703368705204353","dirname":"dirname167703368741905313","filename":"filename167703368753205110","filename1":"filename1167703368777407558"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167703368693005188')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 22 Feb 2023 02:41:27 GMT',
  'ETag',
  '"0x8DB147E4BB2EEE9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '21a64f9b-f01e-0019-1e67-4679ba000000',
  'x-ms-client-request-id',
  'f2400d31-895a-432a-998b-fb9af36c2549',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Wed, 22 Feb 2023 02:41:26 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167703368693005188/file167703368705204353')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 22 Feb 2023 02:41:27 GMT',
  'ETag',
  '"0x8DB147E4BC6EEAD"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '53f966fd-501f-004d-5367-4636ed000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '34d7e0e9-ad80-4695-8547-f018d1379a36',
  'Date',
  'Wed, 22 Feb 2023 02:41:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem167703368693005188/file167703368705204353', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '53f966fe-501f-004d-5467-4636ed000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'd6b653b6-5ee3-4544-9246-d29ef86802fa',
  'Date',
  'Wed, 22 Feb 2023 02:41:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem167703368693005188/file167703368705204353')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 22 Feb 2023 02:41:27 GMT',
  'ETag',
  '"0x8DB147E4BEC3164"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '53f966ff-501f-004d-5567-4636ed000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '6c891134-5d71-4085-953d-6763945ab910',
  'Date',
  'Wed, 22 Feb 2023 02:41:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167703368693005188/dirname167703368741905313')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 22 Feb 2023 02:41:27 GMT',
  'ETag',
  '"0x8DB147E4BFD913F"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '53f96700-501f-004d-5667-4636ed000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'f90e235f-2f45-4670-af22-70ec0deb8a45',
  'Date',
  'Wed, 22 Feb 2023 02:41:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167703368693005188/dirname167703368741905313/filename167703368753205110')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 22 Feb 2023 02:41:27 GMT',
  'ETag',
  '"0x8DB147E4C10FB5E"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '53f96701-501f-004d-5767-4636ed000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'def699cc-c1e0-47d1-b419-bc84b122695e',
  'Date',
  'Wed, 22 Feb 2023 02:41:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem167703368693005188')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","creationTime":"133215072877673310","etag":"0x8DB147E4C10FB5E","expiryTime":"0","group":"$superuser","lastModified":"Wed, 22 Feb 2023 02:41:27 GMT","name":"dirname167703368741905313/filename167703368753205110","owner":"$superuser","permissions":"rw-r-----"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '53f96702-501f-004d-5867-4636ed000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '4169debb-a227-4126-a082-eb060246c321',
  'Access-Control-Expose-Headers',
  'Content-Length,Content-Type,Date,Server,Transfer-Encoding,x-ms-client-request-id,x-ms-request-id,x-ms-version',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 22 Feb 2023 02:41:27 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167703368693005188/filename1167703368777407558')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 22 Feb 2023 02:41:27 GMT',
  'ETag',
  '"0x8DB147E4C3446B2"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '53f96704-501f-004d-5967-4636ed000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'c3dc87e7-2b21-4ab7-ad6c-a8e00777e23a',
  'Date',
  'Wed, 22 Feb 2023 02:41:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem167703368693005188')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","creationTime":"133215072876400959","etag":"0x8DB147E4BFD913F","expiryTime":"0","group":"$superuser","isDirectory":"true","lastModified":"Wed, 22 Feb 2023 02:41:27 GMT","name":"dirname167703368741905313","owner":"$superuser","permissions":"rwxr-x---"},{"contentLength":"11","creationTime":"133215072872820397","etag":"0x8DB147E4BEC3164","expiryTime":"0","group":"$superuser","lastModified":"Wed, 22 Feb 2023 02:41:27 GMT","name":"file167703368705204353","owner":"$superuser","permissions":"rw-r-----"},{"contentLength":"0","creationTime":"133215072879986354","etag":"0x8DB147E4C3446B2","expiryTime":"0","group":"$superuser","lastModified":"Wed, 22 Feb 2023 02:41:27 GMT","name":"filename1167703368777407558","owner":"$superuser","permissions":"rw-r-----"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '53f96707-501f-004d-5c67-4636ed000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '02ee46fd-f469-4523-bf90-80374e31420f',
  'Access-Control-Expose-Headers',
  'Content-Length,Content-Type,Date,Server,Transfer-Encoding,x-ms-client-request-id,x-ms-request-id,x-ms-version',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 22 Feb 2023 02:41:27 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem167703368693005188')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '21a650ee-f01e-0019-4e67-4679ba000000',
  'x-ms-client-request-id',
  '3d204b85-f978-4c3e-a7dc-9a49f455f1c8',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Wed, 22 Feb 2023 02:41:27 GMT'
]);
