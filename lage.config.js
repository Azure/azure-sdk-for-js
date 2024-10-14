module.exports = {
  pipeline: {
    build: ["^build"],
    test: ["build"],
    lint: [],
  },
  npmClient: "pnpm",
};
