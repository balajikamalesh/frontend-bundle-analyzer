const fs = require("fs");
const path = require("path");

function scanDir(dir, files = []) {
  if (!fs.existsSync(dir)) {
    throw new Error(`Directory not found: ${dir}`);
  }

  const entries = fs.readdirSync(dir);

  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scanDir(fullPath, files);
    } else {
      files.push({
        path: fullPath,
        size: stat.size
      });
    }
  }

  return files;
}

module.exports = scanDir;
