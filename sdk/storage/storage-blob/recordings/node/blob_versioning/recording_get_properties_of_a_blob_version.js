let nock = require('nock');

module.exports.hash = "60bf506b341e62b4b649aa4832f73b66";

module.exports.testInfo = {"uniqueName":{"container":"container158512474743806447","blob":"blob158512474989600217"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158512474743806447')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Wed, 25 Mar 2020 08:25:50 GMT',
  'ETag',
  '"0x8D7D09620A60950"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '47fd4f0a-701e-000e-137e-02ac8e000000',
  'x-ms-client-request-id',
  'ed1d73c7-9b36-47b4-924f-fb64f597f951',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Wed, 25 Mar 2020 08:25:50 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158512474743806447/blob158512474989600217', "Hello World")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 25 Mar 2020 08:25:51 GMT',
  'ETag',
  '"0x8D7D09620E8A521"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '47fd4f1b-701e-000e-1d7e-02ac8e000000',
  'x-ms-client-request-id',
  '8bbe2f00-a4cd-47d6-9cce-d11644859808',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-25T08:25:51.2003873Z',
  'Date',
  'Wed, 25 Mar 2020 08:25:50 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158512474743806447/blob158512474989600217')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Wed, 25 Mar 2020 08:25:51 GMT',
  'ETag',
  '"0x8D7D09621203A2F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '47fd4f30-701e-000e-2c7e-02ac8e000000',
  'x-ms-client-request-id',
  '47a2baa3-c93f-400a-9094-25b8d369d2bd',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-25T08:25:51.5656511Z',
  'Date',
  'Wed, 25 Mar 2020 08:25:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container158512474743806447/blob158512474989600217')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 25 Mar 2020 08:25:51 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7D09620E8A521"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '47fd4f4d-701e-000e-467e-02ac8e000000',
  'x-ms-client-request-id',
  'f7c0e9e6-b916-4012-bf26-5c448ad93b6a',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-03-25T08:25:51.2003873Z',
  'x-ms-creation-time',
  'Wed, 25 Mar 2020 08:25:51 GMT',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 25 Mar 2020 08:25:52 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container158512474743806447/blob158512474989600217')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Wed, 25 Mar 2020 08:25:51 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7D09621203A2F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '47fd4f5c-701e-000e-507e-02ac8e000000',
  'x-ms-client-request-id',
  '3ec25096-10d0-4fc2-ba73-bc6f922120bd',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-03-25T08:25:51.5656511Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Wed, 25 Mar 2020 08:25:51 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 25 Mar 2020 08:25:52 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158512474743806447/blob158512474989600217')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Wed, 25 Mar 2020 08:25:51 GMT',
  'ETag',
  '"0x8D7D09621203A2F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '47fd4f66-701e-000e-597e-02ac8e000000',
  'x-ms-client-request-id',
  '69edbe4a-ff52-4654-b134-e8c4d2e36fda',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-03-25T08:25:53.1958278Z',
  'x-ms-snapshot',
  '2020-03-25T08:25:53.1948278Z',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Wed, 25 Mar 2020 08:25:52 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container158512474743806447/blob158512474989600217')
  .query(true)
  .reply(400, "", [
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-error-code',
  'MutuallyExclusiveQueryParameters',
  'x-ms-request-id',
  '47fd4f79-701e-000e-697e-02ac8e000000',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Wed, 25 Mar 2020 08:25:53 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container158512474743806447/blob158512474989600217')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 25 Mar 2020 08:25:51 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7D09620E8A521"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ddad7bd5-501e-0009-2d7f-02c0ed000000',
  'x-ms-client-request-id',
  'da4fadde-551c-418a-9324-a6708c8ced59',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-03-25T08:25:51.2003873Z',
  'x-ms-creation-time',
  'Wed, 25 Mar 2020 08:25:51 GMT',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 25 Mar 2020 08:26:00 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158512474743806447')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ddad7bfb-501e-0009-417f-02c0ed000000',
  'x-ms-client-request-id',
  'db180d6f-d167-4972-992e-0a218470ce2b',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Wed, 25 Mar 2020 08:26:00 GMT'
]);
