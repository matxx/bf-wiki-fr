# bf-wiki-fr

This project makes it easy to develop JS and CSS on wiki/fandom (cause doing it in a "native" way totally sucks: loading/edit/refreshing wiki pages all day long take ages)

Just use `npm run dev` and you're good to go !

On each save, all your files will be compiled, minified, pushed and ready on your wiki !

## Installation

    npm install

## Development

Before your first deploy, you need to make sure that your MediaWiki:Common.css contains this line :

    @import url("/MediaWiki:Dev.css?ctype=text/css&action=raw");

When using `npm run dev`, all your recent changes (modified files in git status) will be compiled and uploaded to MediaWiki:Dev.css

## Deploy

Just hit `npm run deploy` and all your SCSS will be compiled, minified and pushed to MediaWiki:Common.css

## Customize

You can copy and tweak my code to work for you.

There are mostly three important environment variables to use
- `process.env.WIKI_BOT_USERNAME`
- `process.env.WIKI_BOT_PASSWORD`
- `process.env.WIKI_DOMAIN_EU_FR`

All useful scripts are in `gulfile.js`
