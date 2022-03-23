let nock = require('nock');

module.exports.hash = "10dee01e55eb8c63349d922e6530a55b";

module.exports.testInfo = {"uniqueName":{"container":"container163245501658103082","appendblob":"appendblob163245501775303064"},"newDate":{"now":"2021-09-24T03:43:36.580Z","tmr":"2021-09-24T03:43:36.581Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163245501658103082')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 Sep 2021 03:43:37 GMT',
  'ETag',
  '"0x8D97F0D7E31BE5F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ea210a08-e01e-0095-53f6-b03277000000',
  'x-ms-client-request-id',
  '767c16a0-dce2-4bb1-ac44-155e141346d9',
  'x-ms-version',
  '2020-12-06',
  'Date',
  'Fri, 24 Sep 2021 03:43:37 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163245501658103082/appendblob163245501775303064')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 Sep 2021 03:43:38 GMT',
  'ETag',
  '"0x8D97F0D7E627D2D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ea210a5e-e01e-0095-17f6-b03277000000',
  'x-ms-client-request-id',
  '5e6b4c87-15c8-4660-a50b-db63a367eb9b',
  'x-ms-version',
  '2020-12-06',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2021-09-24T03:43:38.1322029Z',
  'Date',
  'Fri, 24 Sep 2021 03:43:37 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163245501658103082/appendblob163245501775303064')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ea210a85-e01e-0095-33f6-b03277000000',
  'x-ms-client-request-id',
  '85831ba0-6b97-4356-bbd4-40fca68f5e93',
  'x-ms-version',
  '2020-12-06',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Fri, 24 Sep 2021 03:43:38 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163245501658103082')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ea210ab6-e01e-0095-5af6-b03277000000',
  'x-ms-client-request-id',
  'a70afcb5-b1e1-4853-a5d5-bb1e3ce16dfb',
  'x-ms-version',
  '2020-12-06',
  'Date',
  'Fri, 24 Sep 2021 03:43:38 GMT'
]);
