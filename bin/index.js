#!/usr/bin/env node

// Imports
const { Command } = require("commander");
const chalk = require("chalk");
const path = require("path");

const scanDir = require("../src/scanFiles");
const filterAssets = require("../src/filterAssets");
const analyze = require("../src/analyze");
const generateHTMLReport = require("../src/htmlReport");
const { formatBytes } = require("../src/utils");

// CLI Setup
const program = new Command();

program
  .name("bundle-analyzer")
  .description("Analyze frontend bundle size")
  .argument("<dir>", "Build directory")
  .option("--json", "Output JSON only")
  .option("--gzip", "Calculate gzip size")
  .option("--brotli", "Calculate brotli size")
  .option("--html", "Generate HTML treemap report")
  .parse(process.argv);

const [dir] = program.args;
const options = program.opts();
const targetDir = path.resolve(dir);

try {
  const allFiles = scanDir(targetDir);
  const assets = filterAssets(allFiles);
  const result = analyze(assets, options);

  if (options.json) {
    // JSON MODE
    console.log(JSON.stringify(result, null, 2));
    process.exit(0);
  } else if (options.html) {
    // HTML MODE
    const output = path.resolve("bundle-report.html");
    generateHTMLReport(result, output);
    console.log(chalk.green(`\n✅ HTML report generated:`), output);
  } else {
    // NORMAL CLI OUTPUT
    console.log(chalk.cyan("\n📦 Frontend Bundle Analyzer\n"));

    console.log("Total:", formatBytes(result.total));
    if (options.gzip) console.log("Gzip:", formatBytes(result.totalGzip));
    if (options.brotli) console.log("Brotli:", formatBytes(result.totalBrotli));

    console.log("\n" + chalk.bold("Breakdown by Type:"));
    for (const [type, sizes] of Object.entries(result.byType)) {
      let line = `  ${type}: ${formatBytes(sizes.raw)}`;

      if (options.gzip) {
        line += ` | gzip: ${formatBytes(sizes.gzip)}`;
      }

      if (options.brotli) {
        line += ` | brotli: ${formatBytes(sizes.brotli)}`;
      }

      console.log(line);
    }

    console.log("\n" + chalk.bold("Files:"));
    console.table(
      result.files.map((f) => {
        const row = {
          File: f.path,
          Raw: formatBytes(f.size),
        };

        if (options.gzip) row.Gzip = formatBytes(f.gzipSize);
        if (options.brotli) row.Brotli = formatBytes(f.brotliSize);

        return row;
      })
    );
  }
} catch (err) {
  console.error(chalk.red("❌ Error:"), err.message);
  process.exit(1);
}
