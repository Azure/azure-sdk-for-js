let nock = require('nock');

module.exports.testInfo = {"container":"container155873882759907741","blob":"blob155873882794909864","newblockblob":"newblockblob155873882871909546"}

nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873882759907741')
  .query({"restype":"container"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 23:00:27 GMT',
  'ETag',
  '"0x8D6E09B9CDB433C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '56915567-901e-0074-2484-121b1e000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 23:00:27 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873882759907741/blob155873882794909864', "HelloWorld")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'aOEJ8PQMpyoV4FzCJ4b45g==',
  'Last-Modified',
  'Fri, 24 May 2019 23:00:27 GMT',
  'ETag',
  '"0x8D6E09B9D154500"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f6c2ea91-201e-0022-4d84-12f36e000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 23:00:27 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873882759907741', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers/>")
  .query({"restype":"container","comp":"acl"})
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 23:00:28 GMT',
  'ETag',
  '"0x8D6E09B9D540A8F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4b1ebaa1-001e-0035-5c84-12330d000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 23:00:27 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873882759907741/newblockblob155873882871909546')
  .query({"blockid":"MQ%3D%3D","comp":"block"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'aOEJ8PQMpyoV4FzCJ4b45g==',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6f5dfc0a-601e-000c-7f84-1273a9000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 23:00:28 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container155873882759907741/newblockblob155873882871909546')
  .query({"blocklisttype":"uncommitted","comp":"blocklist"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><BlockList><UncommittedBlocks><Block><Name>MQ==</Name><Size>10</Size></Block></UncommittedBlocks></BlockList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6635067a-a01e-0033-1584-12c475000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 May 2019 23:00:29 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container155873882759907741')
  .query({"restype":"container"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4fda643e-f01e-0009-4684-1287d6000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 23:00:28 GMT',
  'Connection',
  'close' ]);

