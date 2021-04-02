let nock = require('nock');

module.exports.hash = "0b380ec49ea2252e1bfbaa30e93be775";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models')
  .query(true)
  .reply(200, {"modelList":[{"modelId":"0061e8b2-9b26-498d-bd3a-f5b43b2bdbde","modelName":"p2 unlabeled form testing","status":"ready","createdDateTime":"2020-11-19T17:16:38Z","lastUpdatedDateTime":"2020-11-19T17:16:54Z"},{"modelId":"02c173df-4900-4259-a8f9-c049ff2a8d81","modelName":"modelName160588237204706422","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-11-20T14:26:12Z","lastUpdatedDateTime":"2020-11-20T14:26:14Z"},{"modelId":"07dacf7a-15f6-4a3d-9dee-2da61ea43956","modelName":"p2 labeled form testing","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-11-19T17:17:23Z","lastUpdatedDateTime":"2020-11-19T17:17:25Z"},{"modelId":"1437c8d3-4ba7-42c5-8479-0bd168fd353d","modelName":"p1 unlabeled form testing","status":"ready","createdDateTime":"2020-11-19T17:16:19Z","lastUpdatedDateTime":"2020-11-19T17:16:33Z"},{"modelId":"40375d84-f14d-46ca-8398-013ee339adef","modelName":"customFormModelName160580293122704418","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-11-19T16:22:11Z","lastUpdatedDateTime":"2020-11-19T16:22:13Z"},{"modelId":"662ce68e-5eb8-4d34-b234-5a3f54c0b4c5","modelName":"modelName160588251832005580","status":"ready","createdDateTime":"2020-11-20T14:28:38Z","lastUpdatedDateTime":"2020-11-20T14:28:54Z"},{"modelId":"992346fd-ed27-4d79-931a-0635136495e0","modelName":"modelName160588238914401527","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-11-20T14:26:29Z","lastUpdatedDateTime":"2020-11-20T14:26:31Z"},{"modelId":"adcf6d36-3690-4a88-8e8d-505f04ee7f7b","modelName":"p1 labeled form testing","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-11-19T17:17:14Z","lastUpdatedDateTime":"2020-11-19T17:17:16Z"},{"modelId":"bb1db6bb-ac45-4b83-bb09-93af97238e69","modelName":"modelName160588244402009695","status":"ready","createdDateTime":"2020-11-20T14:27:24Z","lastUpdatedDateTime":"2020-11-20T14:27:42Z"},{"modelId":"bd8ef335-78bf-4871-9869-61aea800efda","modelName":"modelName160588248093907972","status":"ready","createdDateTime":"2020-11-20T14:28:01Z","lastUpdatedDateTime":"2020-11-20T14:28:17Z"},{"modelId":"cfd02c8a-4fac-4fb2-9a58-d09d85a0eb9d","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-11-19T17:01:52Z","lastUpdatedDateTime":"2020-11-19T17:01:55Z"},{"modelId":"d68509d8-68a3-4d32-9b8d-5a12df5eb8ec","modelName":"modelName160588240669007916","status":"ready","createdDateTime":"2020-11-20T14:26:46Z","lastUpdatedDateTime":"2020-11-20T14:27:04Z"},{"modelId":"e5a12366-fb04-4ec2-80cb-f4c4706117f6","modelName":"unlabeled testing","status":"ready","createdDateTime":"2020-11-19T17:02:37Z","lastUpdatedDateTime":"2020-11-19T17:03:16Z"}],"nextLink":""}, [
  'Content-Length',
  '2727',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '142',
  'apim-request-id',
  'fd5243d7-0f81-4bff-9a6c-2c234d8e9e9c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 14:29:15 GMT'
]);
