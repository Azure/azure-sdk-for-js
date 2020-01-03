let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem157534403612808735","file":"file157534403727507398"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534403612808735')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:27:58 GMT',
  'ETag',
  '"0x8D777A0CB71B2D0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd698e8f5-a01e-0002-4489-a94764000000',
  'x-ms-client-request-id',
  '7fd87000-4605-4fa7-96f5-83325baebccb',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:27:58 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534403612808735/file157534403727507398')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:27:59 GMT',
  'ETag',
  '"0x8D777A0CC2396A5"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd253da4d-801f-005a-3789-a9431f000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'f861af36-80b1-40fc-b241-e752c4bafc5e',
  'Date',
  'Tue, 03 Dec 2019 03:27:59 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem157534403612808735/file157534403727507398', "Hello World")
  .query(true)
  .reply(202, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'd253da4e-801f-005a-3889-a9431f000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '446331f3-f2cb-412d-8ac8-e3e7eed97705',
  'Date',
  'Tue, 03 Dec 2019 03:27:59 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem157534403612808735/file157534403727507398')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:28:00 GMT',
  'ETag',
  '"0x8D777A0CC7F0021"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'd253da4f-801f-005a-3989-a9431f000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '9fa38f0c-bf7d-4433-926a-1bae205dda28',
  'Date',
  'Tue, 03 Dec 2019 03:27:59 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem157534403612808735/file157534403727507398')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:28:00 GMT',
  'ETag',
  '"0x8D777A0CC7F0021"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  'd253da50-801f-005a-3a89-a9431f000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '1eff03c4-0dc6-422f-8e3e-75fd339162c6',
  'Date',
  'Tue, 03 Dec 2019 03:28:00 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem157534403612808735/file157534403727507398')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:28:00 GMT',
  'ETag',
  '"0x8D777A0CC7F0021"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rwxr-x-w-',
  'x-ms-acl',
  'user::rwx,group::r-x,other::-w-',
  'x-ms-request-id',
  'd253da51-801f-005a-3b89-a9431f000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '468d31dc-3f66-4f08-be8e-91f68ba72e40',
  'Date',
  'Tue, 03 Dec 2019 03:28:00 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534403612808735')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd698eebf-a01e-0002-0d89-a94764000000',
  'x-ms-client-request-id',
  'd208fb8a-14da-40dd-ab69-f608c99ad1d3',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:28:00 GMT' ]);
