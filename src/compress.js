const fs = require("fs");
const zlib = require("zlib");

function gzipSize(filePath) {
  const buffer = fs.readFileSync(filePath);
  return zlib.gzipSync(buffer).length;
}

function brotliSize(filePath) {
  const buffer = fs.readFileSync(filePath);
  return zlib.brotliCompressSync(buffer).length;
}

module.exports = {
  gzipSize,
  brotliSize
};
