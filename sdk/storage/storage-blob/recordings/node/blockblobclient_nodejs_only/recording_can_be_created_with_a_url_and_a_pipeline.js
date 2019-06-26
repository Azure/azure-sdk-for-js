let nock = require('nock');

module.exports.testInfo = {"container":"container156150805919903636","blob":"blob156150805941704833","randomstring":"randomstring156150805941808552"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156150805919903636')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 26 Jun 2019 00:14:19 GMT',
  'ETag',
  '"0x8D6F9CB3BA307D7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '27cd17f6-e01e-008e-6db4-2b3530000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 26 Jun 2019 00:14:18 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156150805919903636/blob156150805941704833', "randomstring156150805941808552")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '3gvlMZ7DAQ6uXqFqPrpmiQ==',
  'Last-Modified',
  'Wed, 26 Jun 2019 00:14:19 GMT',
  'ETag',
  '"0x8D6F9CB3BD00419"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9cbd4376-e01e-00e8-3fb4-2b876a000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 26 Jun 2019 00:14:19 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156150805919903636/blob156150805941704833')
  .reply(200, "randomstring156150805941808552", [ 'Content-Length',
  '30',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  '3gvlMZ7DAQ6uXqFqPrpmiQ==',
  'Last-Modified',
  'Wed, 26 Jun 2019 00:14:19 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D6F9CB3BD00419"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '87d1673f-b01e-0037-53b4-2bd63e000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-creation-time',
  'Wed, 26 Jun 2019 00:14:19 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 26 Jun 2019 00:14:19 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156150805919903636')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2fb23be2-001e-0061-18b4-2b3e4e000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 26 Jun 2019 00:14:19 GMT',
  'Connection',
  'close' ]);

