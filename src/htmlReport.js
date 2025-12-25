const fs = require("fs");
const path = require("path");

function generateHTMLReport(result, outputPath) {
  const templatePath = path.join(__dirname, "../templates/report.html");
  const template = fs.readFileSync(templatePath, "utf-8");

  const treeData = {
    name: "bundle",
    children: result.files.map(f => ({
      name: path.basename(f.path),
      value: f.size,
      raw: f.size,
      gzip: f.gzipSize,
      brotli: f.brotliSize
    }))
  };

  const html = template.replace(
    "__DATA__",
    JSON.stringify(treeData)
  );

  fs.writeFileSync(outputPath, html);
}

module.exports = generateHTMLReport;
