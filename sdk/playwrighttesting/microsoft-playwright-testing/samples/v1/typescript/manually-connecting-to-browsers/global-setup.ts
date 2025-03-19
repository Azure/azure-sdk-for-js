export default async function (): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  console.log("Customer Global Setup");
}
