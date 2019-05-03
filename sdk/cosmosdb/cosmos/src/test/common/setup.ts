process.on("unhandledRejection", error => {
  if (error.body) {
    try {
      error.body = JSON.parse(error.body);
    } catch (err) {
      /* NO OP */
    }
  }
  console.error(new Error("Unhandled exception found"));
  console.error(JSON.stringify(error, null, " "));
});
