let nock = require('nock');

module.exports.hash = "322d467b8d45b1d35853c220ed663b12";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/tableClientTestSASConnectionStringnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#tableClientTestSASConnectionStringnode","value":[{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A04.1614904Z'\"","PartitionKey":"listEntitiesTest","RowKey":"0","Timestamp":"2021-09-07T16:24:04.1614904Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A04.2385453Z'\"","PartitionKey":"listEntitiesTest","RowKey":"1","Timestamp":"2021-09-07T16:24:04.2385453Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A04.9120248Z'\"","PartitionKey":"listEntitiesTest","RowKey":"10","Timestamp":"2021-09-07T16:24:04.9120248Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A04.9890796Z'\"","PartitionKey":"listEntitiesTest","RowKey":"11","Timestamp":"2021-09-07T16:24:04.9890796Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A05.0751409Z'\"","PartitionKey":"listEntitiesTest","RowKey":"12","Timestamp":"2021-09-07T16:24:05.0751409Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A05.1471918Z'\"","PartitionKey":"listEntitiesTest","RowKey":"13","Timestamp":"2021-09-07T16:24:05.1471918Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A05.2212449Z'\"","PartitionKey":"listEntitiesTest","RowKey":"14","Timestamp":"2021-09-07T16:24:05.2212449Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A05.3013019Z'\"","PartitionKey":"listEntitiesTest","RowKey":"15","Timestamp":"2021-09-07T16:24:05.3013019Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A05.3743539Z'\"","PartitionKey":"listEntitiesTest","RowKey":"16","Timestamp":"2021-09-07T16:24:05.3743539Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A05.4494078Z'\"","PartitionKey":"listEntitiesTest","RowKey":"17","Timestamp":"2021-09-07T16:24:05.4494078Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A05.5224598Z'\"","PartitionKey":"listEntitiesTest","RowKey":"18","Timestamp":"2021-09-07T16:24:05.5224598Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A05.59351Z'\"","PartitionKey":"listEntitiesTest","RowKey":"19","Timestamp":"2021-09-07T16:24:05.59351Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A04.3115973Z'\"","PartitionKey":"listEntitiesTest","RowKey":"2","Timestamp":"2021-09-07T16:24:04.3115973Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A04.4016614Z'\"","PartitionKey":"listEntitiesTest","RowKey":"3","Timestamp":"2021-09-07T16:24:04.4016614Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A04.479717Z'\"","PartitionKey":"listEntitiesTest","RowKey":"4","Timestamp":"2021-09-07T16:24:04.479717Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A04.5487662Z'\"","PartitionKey":"listEntitiesTest","RowKey":"5","Timestamp":"2021-09-07T16:24:04.5487662Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A04.6308241Z'\"","PartitionKey":"listEntitiesTest","RowKey":"6","Timestamp":"2021-09-07T16:24:04.6308241Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A04.7008744Z'\"","PartitionKey":"listEntitiesTest","RowKey":"7","Timestamp":"2021-09-07T16:24:04.7008744Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A04.7729253Z'\"","PartitionKey":"listEntitiesTest","RowKey":"8","Timestamp":"2021-09-07T16:24:04.7729253Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A04.8419745Z'\"","PartitionKey":"listEntitiesTest","RowKey":"9","Timestamp":"2021-09-07T16:24:04.8419745Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A03.9823625Z'\"","PartitionKey":"listEntitiesTest","RowKey":"binary1","Timestamp":"2021-09-07T16:24:03.9823625Z","foo@odata.type":"Edm.Binary","foo":"QmFy"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '007652a7-e002-0038-7504-a4c0e6000000',
  'x-ms-client-request-id',
  '1e70dc6c-e793-4b04-9638-3eac31950a5a',
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
