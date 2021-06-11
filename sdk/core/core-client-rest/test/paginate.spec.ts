import { assert } from "chai";
import { Client, getClient } from "../src";
import { paginate } from "../src/paginate";

describe.only("Paginate heleper", () => {
  let client: Client;

  beforeEach(() => {
    client = getClient("http://localhost:3000", { allowInsecureConnection: true });
  });

  it("Paging_getNoItemNamePages", async () => {
    // Paginate assumes the resource supports get and nextLink is an opaque url to which a get can be done
    // by default and following autorest x-ms-pageable extension, Paginate assumes that the pageable result
    // will contain a property nextLink which is the opaque url for the next page, and a value property containing
    // an array with the results (the page);
    const items = paginate(client, "/paging/noitemname");
    let result = [];
    for await (const item of items) {
      result.push(item);
    }

    assert.lengthOf(result, 1);
  });

  it("Paging_getSinglePages", async () => {
    // Autorest x-ms-pageable extension allows setting a different name for the property that contains the page
    // we can allow overriding this through the pagingOptions values.
    // The extension also allows setting a custom nextLink property name.
    const items = paginate(client, "/paging/single", { valuesName: "values" });
    let result = [];
    for await (const item of items) {
      result.push(item);
    }

    assert.lengthOf(result, 1);
  });

  it("Paging_firstResponseEmpty", async () => {
    // First response has an empty [] next page contains a page with an element
    const items = paginate(client, "/paging/firstResponseEmpty/1");
    let result = [];
    for await (const item of items) {
      result.push(item);
    }

    assert.lengthOf(result, 1);
  });

  it("Paging_getMultiplePages", async () => {
    const items = paginate(client, "/paging/multiple", { valuesName: "values" });
    let result = [];
    for await (const item of items) {
      result.push(item);
    }

    assert.lengthOf(result, 10);
  });
});
