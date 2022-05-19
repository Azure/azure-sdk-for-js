import {generateProject} from "./scaffolding"

generateProject(
  {category: "foo", displayName: "bar", name: "baz", tech: "react"},
  {
    apiVersion: "1",
    managementApiEndpoint: "foo.com",
    resourceGroupName: "fooRG",
    serviceName: "fooService",
    subscriptionId: "1234",
  }
).catch(console.error)
