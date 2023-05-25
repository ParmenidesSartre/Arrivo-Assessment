const fs = require('fs');
const path = require('path');

// Recursive function to traverse directories
function traverseDir(dir, callback) {
  fs.readdirSync(dir).forEach((file) => {
    let fullPath = path.join(dir, file);

    if (fs.statSync(fullPath).isDirectory()) {
      traverseDir(fullPath, callback);
    } else {
      callback(fullPath);
    }
  });
}

// Output file
let outputFile = path.join(__dirname, 'output.txt');

// Clear output file before start
fs.writeFileSync(outputFile, '', 'utf8');

traverseDir(__dirname, (filepath) => {
  // Ignore output.txt file itself
  if (filepath === outputFile) return;

  let fileContent = fs.readFileSync(filepath, 'utf8');
  let formattedContent = `\nFile: ${filepath}\nContent:\n${fileContent}\n`;
  fs.appendFileSync(outputFile, formattedContent, 'utf8');
});
