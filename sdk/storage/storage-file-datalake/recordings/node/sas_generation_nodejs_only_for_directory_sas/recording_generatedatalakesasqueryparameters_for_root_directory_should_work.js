let nock = require('nock');

module.exports.hash = "b4b8deb6e1719c1d4d6d0f34b1905856";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem160793974124704491","directory":"directory160793974271506132","file":"file160793974420506988"},"newDate":{"now":"2020-12-14T09:55:44.522Z","tmr":"2020-12-14T09:55:44.522Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160793974124704491')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 14 Dec 2020 09:55:42 GMT',
  'ETag',
  '"0x8D8A0166B74058D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7f24e959-d01e-002f-46ff-d1c4a4000000',
  'x-ms-client-request-id',
  'd61339dc-a836-445a-92f1-3297ff3b6dfa',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Mon, 14 Dec 2020 09:55:42 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160793974124704491/directory160793974271506132')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Mon, 14 Dec 2020 09:55:44 GMT',
  'ETag',
  '"0x8D8A0166C5BC1B3"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd0c75e86-f01f-007c-0bff-d1d8ab000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  'c4ce70e2-2059-4efa-a52c-7a705df72aae',
  'Date',
  'Mon, 14 Dec 2020 09:55:43 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160793974124704491/directory160793974271506132/file160793974420506988')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Mon, 14 Dec 2020 09:55:44 GMT',
  'ETag',
  '"0x8D8A0166C8C691B"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd0c75e9c-f01f-007c-1fff-d1d8ab000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  '63dba480-6eb5-485b-b027-d1b64bad2a49',
  'Date',
  'Mon, 14 Dec 2020 09:55:43 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem160793974124704491/')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Mon, 14 Dec 2020 09:55:42 GMT',
  'ETag',
  '"0x8D8A0166B75F9C6"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rwxr-x---',
  'x-ms-acl',
  'user::rwx,group::r-x,other::---',
  'x-ms-request-id',
  'd0c75eb6-f01f-007c-37ff-d1d8ab000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  '5ff65f53-8865-4378-afb8-044c06bd3ce5',
  'Date',
  'Mon, 14 Dec 2020 09:55:43 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem160793974124704491')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7f24eca7-d01e-002f-33ff-d1c4a4000000',
  'x-ms-client-request-id',
  '3d00aa46-0ac5-473e-8772-bbf00e64352c',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Mon, 14 Dec 2020 09:55:44 GMT' ]);
