let nock = require('nock');

module.exports.testInfo = {"now":"2019-05-24T23:02:57.001Z","tmr":"2019-05-24T23:02:57.001Z","container":"container155873897700105566"}

nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873897700105566')
  .query({"restype":"container"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 23:02:57 GMT',
  'ETag',
  '"0x8D6E09BF5F34623"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6f5eecc4-601e-000c-5e84-1273a9000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 23:02:56 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container155873897700105566')
  .query({"sv":"2016-05-31","spr":"https%2Chttp","st":"2019-05-24T22%3A57%3A57Z","se":"2019-05-25T23%3A02%3A57Z","sip":"0.0.0.0-255.255.255.255","sr":"c","sp":"racwdl","sig":"QhWj5dbmJphF%2Ffhn9X99K3wfDanlUKnqd2FYqcIHaus%3D","restype":"container","comp":"list"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://coolstorageaccount1234.blob.core.windows.net/\" ContainerName=\"container155873897700105566\"><Blobs /><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f4d33fb3-801e-0006-5784-126a20000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 May 2019 23:02:57 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container155873897700105566')
  .query({"restype":"container"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '875ef71d-301e-0079-0f84-12f412000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 23:02:57 GMT',
  'Connection',
  'close' ]);

