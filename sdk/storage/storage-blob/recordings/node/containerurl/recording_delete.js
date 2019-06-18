let nock = require('nock');

module.exports.testInfo = {"container":"container156058653468501422"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156058653468501422')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 15 Jun 2019 08:15:35 GMT',
  'ETag',
  '"0x8D6F169A4744A69"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '304d17fd-e01e-00ac-0d52-235b06000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 15 Jun 2019 08:15:34 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156058653468501422')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8964e39f-a01e-0045-7e52-23a700000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 15 Jun 2019 08:15:35 GMT',
  'Connection',
  'close' ]);

