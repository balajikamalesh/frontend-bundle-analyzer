function filterAssets(files) {
  return files.filter(file =>
    file.path.endsWith(".js") || file.path.endsWith(".css")
  );
}

module.exports = filterAssets;
