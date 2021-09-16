let nock = require('nock');

module.exports.hash = "e1e4db7e2b3b1ead247a97667a30445f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/tableClientTestSASConnectionStringnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#tableClientTestSASConnectionStringnode","value":[{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A04.1614904Z'\"","PartitionKey":"listEntitiesTest","RowKey":"0","Timestamp":"2021-09-07T16:24:04.1614904Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A04.2385453Z'\"","PartitionKey":"listEntitiesTest","RowKey":"1","Timestamp":"2021-09-07T16:24:04.2385453Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A04.9120248Z'\"","PartitionKey":"listEntitiesTest","RowKey":"10","Timestamp":"2021-09-07T16:24:04.9120248Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A04.9890796Z'\"","PartitionKey":"listEntitiesTest","RowKey":"11","Timestamp":"2021-09-07T16:24:04.9890796Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A05.0751409Z'\"","PartitionKey":"listEntitiesTest","RowKey":"12","Timestamp":"2021-09-07T16:24:05.0751409Z","foo":"testEntity"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '007652bc-e002-0038-0904-a4c0e6000000',
  'x-ms-client-request-id',
  '285047ad-f773-497f-b0c7-7d530fd754ab',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-continuation-NextPartitionKey',
  '1!24!bGlzdEVudGl0aWVzVGVzdA--',
  'x-ms-continuation-NextRowKey',
  '1!4!MTM-',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,x-ms-continuation-NextPartitionKey,x-ms-continuation-NextRowKey,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 07 Sep 2021 16:24:05 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/tableClientTestSASConnectionStringnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#tableClientTestSASConnectionStringnode","value":[{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A05.1471918Z'\"","PartitionKey":"listEntitiesTest","RowKey":"13","Timestamp":"2021-09-07T16:24:05.1471918Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A05.2212449Z'\"","PartitionKey":"listEntitiesTest","RowKey":"14","Timestamp":"2021-09-07T16:24:05.2212449Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A05.3013019Z'\"","PartitionKey":"listEntitiesTest","RowKey":"15","Timestamp":"2021-09-07T16:24:05.3013019Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A05.3743539Z'\"","PartitionKey":"listEntitiesTest","RowKey":"16","Timestamp":"2021-09-07T16:24:05.3743539Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A05.4494078Z'\"","PartitionKey":"listEntitiesTest","RowKey":"17","Timestamp":"2021-09-07T16:24:05.4494078Z","foo":"testEntity"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '007652cf-e002-0038-1c04-a4c0e6000000',
  'x-ms-client-request-id',
  '7b7583b8-a575-458f-9a2f-ce4a0d2f68a3',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-continuation-NextPartitionKey',
  '1!24!bGlzdEVudGl0aWVzVGVzdA--',
  'x-ms-continuation-NextRowKey',
  '1!4!MTg-',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,x-ms-continuation-NextPartitionKey,x-ms-continuation-NextRowKey,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 07 Sep 2021 16:24:05 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/tableClientTestSASConnectionStringnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#tableClientTestSASConnectionStringnode","value":[{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A05.5224598Z'\"","PartitionKey":"listEntitiesTest","RowKey":"18","Timestamp":"2021-09-07T16:24:05.5224598Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A05.59351Z'\"","PartitionKey":"listEntitiesTest","RowKey":"19","Timestamp":"2021-09-07T16:24:05.59351Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A04.3115973Z'\"","PartitionKey":"listEntitiesTest","RowKey":"2","Timestamp":"2021-09-07T16:24:04.3115973Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A04.4016614Z'\"","PartitionKey":"listEntitiesTest","RowKey":"3","Timestamp":"2021-09-07T16:24:04.4016614Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A04.479717Z'\"","PartitionKey":"listEntitiesTest","RowKey":"4","Timestamp":"2021-09-07T16:24:04.479717Z","foo":"testEntity"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '007652d7-e002-0038-2404-a4c0e6000000',
  'x-ms-client-request-id',
  '40105a9f-97e6-4026-80b3-b55ce49e6ebf',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-continuation-NextPartitionKey',
  '1!24!bGlzdEVudGl0aWVzVGVzdA--',
  'x-ms-continuation-NextRowKey',
  '1!4!NQ--',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,x-ms-continuation-NextPartitionKey,x-ms-continuation-NextRowKey,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 07 Sep 2021 16:24:05 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/tableClientTestSASConnectionStringnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#tableClientTestSASConnectionStringnode","value":[{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A04.5487662Z'\"","PartitionKey":"listEntitiesTest","RowKey":"5","Timestamp":"2021-09-07T16:24:04.5487662Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A04.6308241Z'\"","PartitionKey":"listEntitiesTest","RowKey":"6","Timestamp":"2021-09-07T16:24:04.6308241Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A04.7008744Z'\"","PartitionKey":"listEntitiesTest","RowKey":"7","Timestamp":"2021-09-07T16:24:04.7008744Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A04.7729253Z'\"","PartitionKey":"listEntitiesTest","RowKey":"8","Timestamp":"2021-09-07T16:24:04.7729253Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A04.8419745Z'\"","PartitionKey":"listEntitiesTest","RowKey":"9","Timestamp":"2021-09-07T16:24:04.8419745Z","foo":"testEntity"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '007652e4-e002-0038-3004-a4c0e6000000',
  'x-ms-client-request-id',
  '2c92e9eb-e830-4a08-a88b-f29bc1ef7381',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-continuation-NextPartitionKey',
  '1!24!bGlzdEVudGl0aWVzVGVzdA--',
  'x-ms-continuation-NextRowKey',
  '1!12!YmluYXJ5MQ--',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,x-ms-continuation-NextPartitionKey,x-ms-continuation-NextRowKey,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 07 Sep 2021 16:24:05 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/tableClientTestSASConnectionStringnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#tableClientTestSASConnectionStringnode","value":[{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A03.9823625Z'\"","PartitionKey":"listEntitiesTest","RowKey":"binary1","Timestamp":"2021-09-07T16:24:03.9823625Z","foo@odata.type":"Edm.Binary","foo":"QmFy"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '007652f1-e002-0038-3d04-a4c0e6000000',
  'x-ms-client-request-id',
  '2151e4c2-7b76-48ed-8b70-34d7cacc3dc3',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 07 Sep 2021 16:24:05 GMT'
]);
