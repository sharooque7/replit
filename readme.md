```
 "dev": "NODE_ENV=development tsx server/index.ts",
"build": "npx vite build && npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
"preview": "vite preview",

```
