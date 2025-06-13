const yaml = require('js-yaml');
const fs = require('fs-extra');
const path = require('path');
const mkdirp = require('mkdirp');

// Load config files
const landscape = yaml.load(fs.readFileSync('landscape.yml', 'utf8'));
const settings = yaml.load(fs.readFileSync('settings.yml', 'utf8'));

// Build basic HTML page
const outputDir = 'dist';
mkdirp.sync(outputDir);

const html = `
<!DOCTYPE html>
<html>
<head>
  <title>${settings.name || 'IDSA Landscape'}</title>
  <meta charset="utf-8" />
  <style>
    body { font-family: sans-serif; padding: 20px; }
    h1 { color: #005A9C; }
  </style>
</head>
<body>
  <h1>${settings.name || 'IDSA Landscape'}</h1>
  <p>${landscape.landscape.length} categories defined in landscape.yml</p>
</body>
</html>
`;

fs.writeFileSync(path.join(outputDir, 'index.html'), html);
console.log(`Built site with ${landscape.landscape.length} category groups.`);
