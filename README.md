# bf-wiki-fr

This project makes it easy to develop JS and CSS on wiki/fandom (cause doing it in a "native" way totally sucks: loading/edit/refreshing wiki pages all day long take ages)

Just use `npm run watch` and you're good to go !

On each save, all your files will be compiled, minified, pushed and ready on your wiki !

## Installation

    npm install

## Customize

You can copy and tweak my code to work for you.

There are mostly three important environment variables to use
- `process.env.WIKI_BOT_USERNAME`
- `process.env.WIKI_BOT_PASSWORD`
- `process.env.WIKI_DOMAIN_EU_FR`

All usefull scripts are in `gulfile.js`
