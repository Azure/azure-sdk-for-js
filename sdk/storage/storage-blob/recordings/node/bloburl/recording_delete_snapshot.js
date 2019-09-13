let nock = require('nock');

module.exports.testInfo = {"container":"container156776191963906582","blob":"blob156776192004809228"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776191963906582')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:25:19 GMT',
  'ETag',
  '"0x8D732AC230356A8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0493a0c9-501e-0055-3e95-64e708000000',
  'x-ms-client-request-id',
  'eee9d677-dc11-4971-8b65-76bf9dcc66bd',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:25:19 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776191963906582/blob156776192004809228', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:25:20 GMT',
  'ETag',
  '"0x8D732AC23411184"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4054e83c-701e-0100-4d95-64098e000000',
  'x-ms-client-request-id',
  '66a57c5b-0fbe-4ac9-9743-c5b67656a2f8',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 06 Sep 2019 09:25:19 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776191963906582/blob156776192004809228')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:25:20 GMT',
  'ETag',
  '"0x8D732AC23411184"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '891e628c-501e-014a-4f95-64aa01000000',
  'x-ms-client-request-id',
  'c76d82e0-c014-4f2a-a247-9eaa139eb24c',
  'x-ms-version',
  '2019-02-02',
  'x-ms-snapshot',
  '2019-09-06T09:25:20.7478977Z',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Fri, 06 Sep 2019 09:25:20 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156776191963906582/blob156776192004809228')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:25:20 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D732AC23411184"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0eef7eb3-301e-00a7-7095-641f41000000',
  'x-ms-client-request-id',
  'f976e80d-7f04-4c51-bcef-430ac1a425a2',
  'x-ms-version',
  '2019-02-02',
  'x-ms-snapshot',
  '2019-09-06T09:25:20.7478977Z',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Fri, 06 Sep 2019 09:25:20 GMT',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-snapshot,x-ms-tag-count,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding,content-md5,x-ms-content-crc64',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 09:25:20 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156776191963906582/blob156776192004809228')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dbcecc62-501e-00c3-2f95-64eed9000000',
  'x-ms-client-request-id',
  '3f08cc79-2e4b-41ab-bbc4-53a318eb0771',
  'x-ms-version',
  '2019-02-02',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Fri, 06 Sep 2019 09:25:20 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156776191963906582/blob156776192004809228')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '26851218-801e-00ef-5195-640276000000',
  'x-ms-client-request-id',
  '3e0a0330-02bf-42d1-9ba5-eef8e24d159e',
  'x-ms-version',
  '2019-02-02',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Fri, 06 Sep 2019 09:25:21 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156776191963906582')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container156776191963906582\"><Blobs /><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3c71b834-801e-00c0-0795-640fbd000000',
  'x-ms-client-request-id',
  '1b496308-3672-401e-8fa8-9ff1a4078625',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding,content-md5,x-ms-content-crc64',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 09:25:21 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156776191963906582')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '42b97b88-701e-0042-7c95-644e03000000',
  'x-ms-client-request-id',
  '5c6db85e-a2c7-44d4-bfac-f8464b227096',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:25:21 GMT',
  'Connection',
  'close' ]);

