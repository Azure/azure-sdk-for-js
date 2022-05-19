import {assert} from "chai"
import {generateProject} from "../src"
import {promises} from "fs"
import sinon from "sinon"

describe("generateProject", () => {
  let sandbox: sinon.SinonSandbox
  let writeFileSpy: sinon.SinonStub

  beforeEach(() => {
    sandbox = sinon.createSandbox()
    writeFileSpy = sandbox.stub(promises, "writeFile")
    sandbox.stub(promises, "mkdir")
  })

  afterEach(() => {
    sandbox.restore()
  })

  it("should generate react project", async () => {
    let writtenFiles: {name: string; content: string}[] = []
    writeFileSpy.callsFake((name, content) => {
      writtenFiles.push({name, content})
    })
    await generateProject(
      {category: "foo", displayName: "bar", name: "baz", tech: "react"},
      {
        apiVersion: "1",
        managementApiEndpoint: "foo.com",
        resourceGroupName: "fooRG",
        serviceName: "fooService",
        subscriptionId: "1234",
      }
    )

    assert.include(writtenFiles[0].content, `"managementApiEndpoint": "foo.com"`)
  })
})
