if ("function" !== typeof atob) {
  throw new Error("Your browser environment is missing the global `atob` function");
}

export default atob;
