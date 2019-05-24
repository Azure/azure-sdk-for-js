let nock = require('nock');

module.exports.testInfo = {"container":"container155873882290303723","blob":"blob155873882329302357","randomstring":"randomstring155873882329506721"}

nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873882290303723')
  .query({"restype":"container"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 23:00:22 GMT',
  'ETag',
  '"0x8D6E09B9A1794D6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c275fae3-801e-0049-3e84-12ae38000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 23:00:22 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873882290303723/blob155873882329302357', "randomstring155873882329506721")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'ifLOyxYreEGhVOrfAfWS/w==',
  'Last-Modified',
  'Fri, 24 May 2019 23:00:23 GMT',
  'ETag',
  '"0x8D6E09B9A55F340"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ebf8c30e-401e-0098-0f84-121367000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 23:00:22 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container155873882290303723/blob155873882329302357')
  .reply(200, "randomstring155873882329506721", [ 'Content-Length',
  '30',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'ifLOyxYreEGhVOrfAfWS/w==',
  'Last-Modified',
  'Fri, 24 May 2019 23:00:23 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D6E09B9A55F340"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '588e5892-c01e-0082-6484-123c08000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-creation-time',
  'Fri, 24 May 2019 23:00:23 GMT',
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
  'Fri, 24 May 2019 23:00:23 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container155873882290303723')
  .query({"restype":"container"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '16d6b5e5-e01e-001d-7784-1244b2000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 23:00:23 GMT',
  'Connection',
  'close' ]);

