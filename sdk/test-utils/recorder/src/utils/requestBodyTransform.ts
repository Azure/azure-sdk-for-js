export type RequestBodyType = string | { [x: string]: unknown };
/**
 * Under construction
 */
export function applyRequestBodyTransformations(
  runtime: "node" | "browser",
  fixture: string | { [x: string]: unknown },
  requestBodyTransformations: (
    | ((body: string) => string)
    | ((body: { [x: string]: unknown }) => { [x: string]: unknown })
  )[]
): string | { [x: string]: unknown } {
  if (runtime === "node") {
    if (typeof fixture !== "string") {
      return fixture;
    }
    // Modify the request body
    let updatedFixture = fixture;
    // console.log(`updatedFixture(stage 0) ==> ${updatedFixture}`);
    // PUT and PATCH may also have request bodies, currently focusing only on POST - can be extended as needed
    let matches = fixture.match(/\.post\((.*)\, (.*)\)\n\s*.reply\(/);
    // console.log(matches);
    if (matches?.[2] && typeof matches[2] === "string") {
      let updatedBody = matches[2]; // Must be string - either normal or JSON-stringified
      // normal string
      for (const transformation of requestBodyTransformations) {
        updatedBody = transformation(updatedBody as any) as string;
      }
      updatedFixture = fixture.replace(matches[2], updatedBody);
      // TODO: JSON stringified
    }
    // console.log(`updatedFixture(stage 1) ==> ${updatedFixture}`);
    // Modify the fixture with .filteringRequestBody method

    matches = updatedFixture.match(/\.post\((.*)\, (.*)\)\n\s*.reply\(/);
    if (matches?.[0]) {
      for (const transformation of requestBodyTransformations) {
        console.log(`.filteringRequestBody(${transformation.toString()})`);
        updatedFixture = updatedFixture.replace(
          matches[0],
          `.filteringRequestBody(${transformation.toString()})\n  ` + matches[0]
        );
      }
    }
    // console.log(`updatedFixture(stage 2) ==> ${updatedFixture}`);
    return updatedFixture;
  }

  return fixture;
}
