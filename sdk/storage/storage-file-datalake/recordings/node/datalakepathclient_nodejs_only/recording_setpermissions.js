let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem157534404368207790","file":"file157534404482207959"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534404368207790')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:28:06 GMT',
  'ETag',
  '"0x8D777A0CFF17BDC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '352ec019-f01e-005e-7689-a9b69d000000',
  'x-ms-client-request-id',
  'b290dfef-17db-4156-ad72-a6f4384026d9',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:28:05 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534404368207790/file157534404482207959')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:28:07 GMT',
  'ETag',
  '"0x8D777A0D0C85801"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '50374722-a01f-0081-2b89-a9e7c9000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '0932c788-b975-43a4-afd0-0b9dd3d43d98',
  'Date',
  'Tue, 03 Dec 2019 03:28:06 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem157534404368207790/file157534404482207959', "Hello World")
  .query(true)
  .reply(202, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '50374724-a01f-0081-2c89-a9e7c9000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '1fa4f317-bc6e-41ad-b37c-3a95d4c05fa9',
  'Date',
  'Tue, 03 Dec 2019 03:28:07 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem157534404368207790/file157534404482207959')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:28:08 GMT',
  'ETag',
  '"0x8D777A0D12030B0"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '50374725-a01f-0081-2d89-a9e7c9000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'b52fe083-10c6-4c2c-b215-a106af035e2a',
  'Date',
  'Tue, 03 Dec 2019 03:28:07 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem157534404368207790/file157534404482207959')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:28:08 GMT',
  'ETag',
  '"0x8D777A0D12030B0"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  '50374726-a01f-0081-2e89-a9e7c9000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'f7cfe19d-36ca-4ad5-accb-e27fdd74636d',
  'Date',
  'Tue, 03 Dec 2019 03:28:07 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem157534404368207790/file157534404482207959')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:28:08 GMT',
  'ETag',
  '"0x8D777A0D12030B0"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rw-r-x-wt',
  'x-ms-acl',
  'user::rw-,group::r-x,other::-wx',
  'x-ms-request-id',
  '50374727-a01f-0081-2f89-a9e7c9000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'e5687623-c232-432e-911b-04178d3b97d1',
  'Date',
  'Tue, 03 Dec 2019 03:28:08 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534404368207790')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '352ec3be-f01e-005e-3889-a9b69d000000',
  'x-ms-client-request-id',
  '5b1b08bc-48da-4d79-b178-9237fb217976',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:28:08 GMT' ]);
