const yaml = require('js-yaml');
const fs = require('fs-extra');
const path = require('path');
const mkdirp = require('mkdirp');

const landscape = yaml.load(fs.readFileSync('landscape.yml', 'utf8'));
const settings = yaml.load(fs.readFileSync('settings.yml', 'utf8'));

const outputDir = 'dist';
mkdirp.sync(outputDir);

function renderItem(wrappedItem) {
  const item = wrappedItem.item;
  const logoPath = item.logo ? `hosted_logos/${item.logo}` : '';
  return `
    <div style="margin-bottom: 20px;">
      ${item.logo ? `<img src="${logoPath}" alt="${item.name}" style="height: 40px;"><br/>` : ''}
      <a href="${item.homepage_url}" target="_blank"><strong>${item.name}</strong></a><br/>
      <small>${item.organization?.name || ''}</small>
    </div>
  `;
}

function renderSubcategory(subcat) {
  const items = subcat.subcategory.items.map(renderItem).join('\n');
  return `
    <div style="margin-bottom: 30px;">
      <h3>${subcat.subcategory.name}</h3>
      ${items}
    </div>
  `;
}

function renderCategory(cat) {
  const subs = cat.category.subcategories.map(renderSubcategory).join('\n');
  return `
    <section style="margin-bottom: 50px;">
      <h2>${cat.category.name}</h2>
      ${subs}
    </section>
  `;
}

const body = landscape.landscape.map(renderCategory).join('\n');

const html = `
<!DOCTYPE html>
<html>
<head>
  <title>${settings.name || 'IDSA Landscape'}</title>
  <meta charset="utf-8" />
  <style>
    body { font-family: sans-serif; padding: 40px; max-width: 800px; margin: auto; }
    h1 { color: #005A9C; }
    h2 { margin-top: 40px; color: #222; }
    h3 { margin-top: 20px; color: #444; }
    img { vertical-align: middle; }
  </style>
</head>
<body>
  <h1>${settings.name || 'IDSA Landscape'}</h1>
  ${body}
</body>
</html>
`;

fs.writeFileSync(path.join(outputDir, 'index.html'), html);
console.log(`Built landscape with ${landscape.landscape.length} categories.`);
