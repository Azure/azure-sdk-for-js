window.addEventListener("DOMContentLoaded", function () {
  const getChoicesBtn = document.getElementById("getChoices");
  if (!getChoicesBtn) {
    throw new Error("Unable to locate a button with id=getChoices");
  }

  getChoicesBtn.addEventListener("click", async function () {
    const prompt = document.getElementById("prompt").value;
    const response = await fetch("/api/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });
    const { completions } = await response.json();
    console.log({ completions });
    const resultContainer = document.getElementById("results");

    // TODO: add some validation
    resultContainer.innerHTML = completions.choices[0].text;
  });
});
