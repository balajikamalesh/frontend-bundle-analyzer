const { gzipSize, brotliSize } = require("./compress");

function analyze(files, options = {}) {
  let total = 0;
  let totalGzip = 0;
  let totalBrotli = 0;

  const byType = {};

  const analyzedFiles = files.map(file => {
    total += file.size;

    const ext = file.path.split(".").pop();
    byType[ext] = byType[ext] || {
      raw: 0,
      gzip: 0,
      brotli: 0
    };

    byType[ext].raw += file.size;

    const result = {
      path: file.path,
      size: file.size
    };

    if (options.gzip) {
      const gz = gzipSize(file.path);
      result.gzipSize = gz;
      totalGzip += gz;
      byType[ext].gzip += gz;
    }

    if (options.brotli) {
      const br = brotliSize(file.path);
      result.brotliSize = br;
      totalBrotli += br;
      byType[ext].brotli += br;
    }

    return result;
  });

  return {
    total,
    totalGzip,
    totalBrotli,
    byType,
    files: analyzedFiles
  };
}

module.exports = analyze;
