let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem157534387166502454","file":"file157534387281903010"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534387166502454')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:25:14 GMT',
  'ETag',
  '"0x8D777A069698AB1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '35c55043-e01e-0041-7589-a96d8d000000',
  'x-ms-client-request-id',
  'c6921100-4358-4556-9282-63990a17fa31',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:25:13 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534387166502454/file157534387281903010')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:25:15 GMT',
  'ETag',
  '"0x8D777A06A1A31A0"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6315f46d-f01f-0055-2b89-a9aee9000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '740cda00-5880-4e72-8461-1e6211c7ff45',
  'Date',
  'Tue, 03 Dec 2019 03:25:15 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem157534387166502454/file157534387281903010', "Hello World")
  .query(true)
  .reply(202, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '6315f46e-f01f-0055-2c89-a9aee9000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'd544322c-e993-4966-930e-a263fa00f44c',
  'Date',
  'Tue, 03 Dec 2019 03:25:15 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem157534387166502454/file157534387281903010')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:25:16 GMT',
  'ETag',
  '"0x8D777A06A73E90F"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '6315f46f-f01f-0055-2d89-a9aee9000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '9440b61d-2cdf-4f1e-b487-6b1cb7a45726',
  'Date',
  'Tue, 03 Dec 2019 03:25:15 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534387166502454')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '35c55403-e01e-0041-6489-a96d8d000000',
  'x-ms-client-request-id',
  '8adec956-f2c7-4ea6-b792-1a4561f09ae0',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:25:15 GMT' ]);
