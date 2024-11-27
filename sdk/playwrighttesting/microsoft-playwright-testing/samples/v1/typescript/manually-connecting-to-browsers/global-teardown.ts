export default async function () {
  await new Promise((resolve) => setTimeout(resolve, 100));
  console.log("Customer Global Teardown");
}
