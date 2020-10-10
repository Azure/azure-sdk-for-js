let nock = require('nock');

module.exports.hash = "9bcada1e1c90bd5e6d1bdb8e5fa637b4";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem160119597598007601","directory":"directory160119597641207244","file":"file160119597792806566"},"newDate":{"now":"2020-09-27T08:39:34.507Z","tmr":"2020-09-27T08:39:34.508Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2020-09-27T07:39:34Z</Start><Expiry>2020-10-02T08:39:34Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>1ce13278-a083-4d15-8796-de39717793e1</SignedOid><SignedTid>72f988bf-86f1-41af-91ab-2d7cd011db47</SignedTid><SignedStart>2020-09-27T07:39:34Z</SignedStart><SignedExpiry>2020-10-02T08:39:34Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2020-02-10</SignedVersion><Value>UqyKLG9BCI93ihy03vAzqHDOf1yE/ljQ1+SobVbO1tU=</Value></UserDelegationKey>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1b1d61a4-f01e-003d-51a9-943bbb000000',
  'x-ms-client-request-id',
  '710bf4c1-4023-48b0-8e8f-9f39ae2eae92',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 08:39:35 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160119597598007601')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 08:39:36 GMT',
  'ETag',
  '"0x8D862C0DD7905C7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1b1d61e0-f01e-003d-7da9-943bbb000000',
  'x-ms-client-request-id',
  '4c8b5dfc-bcee-4c71-aca0-d260c0287314',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 08:39:36 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160119597598007601/directory160119597641207244')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 27 Sep 2020 08:39:37 GMT',
  'ETag',
  '"0x8D862C0DE67DAFD"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '33e3a1f6-101f-0057-7ca9-94e393000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '7b67d1f1-cc31-4e36-8336-939bc3908800',
  'Date',
  'Sun, 27 Sep 2020 08:39:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160119597598007601/directory160119597641207244/file160119597792806566')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 27 Sep 2020 08:39:38 GMT',
  'ETag',
  '"0x8D862C0DEA4F54D"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '33e3a1f7-101f-0057-7da9-94e393000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '56895691-579b-4230-8ab3-a58f39b4c9ef',
  'Date',
  'Sun, 27 Sep 2020 08:39:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem160119597598007601')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","creationTime":"132456695777516285","etag":"0x8D862C0DE67DAFD","group":"1ce13278-a083-4d15-8796-de39717793e1","isDirectory":"true","lastModified":"Sun, 27 Sep 2020 08:39:37 GMT","name":"directory160119597641207244","owner":"1ce13278-a083-4d15-8796-de39717793e1","permissions":"rwxr-x---"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '33e3a1f9-101f-0057-7fa9-94e393000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'fa21bb63-ab4b-478c-bb08-fc778074b83c',
  'Date',
  'Sun, 27 Sep 2020 08:39:38 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem160119597598007601')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1b1d63e6-f01e-003d-77a9-943bbb000000',
  'x-ms-client-request-id',
  'a00f26d0-3f9c-4325-a614-29826a2ef10f',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 08:39:39 GMT'
]);
