function normalizePath(p) {
  return p.replace(/\\/g, "/");
}

module.exports = {
  normalizePath,
};
