import * as esbuild from 'esbuild';
import { builtinModules } from 'module';

const isWatch = process.argv[2] === '--watch';

if (isWatch) {
  const ctx = await esbuild.context({
    entryPoints: ['src/app.ts'],
    outfile: '_dev/app.js',
    platform: 'node',
    external: [...builtinModules,'neo-blessed'],
    sourcemap: true,
    bundle: true,
  });
  
  if (isWatch) {
    console.log('Watching for app source files...');
    await ctx.watch();
  }
} else {
  await esbuild.build({
    entryPoints: ['src/app.ts'],
    outfile: 'dist/app.js',
    platform: 'node',
    external: [...builtinModules,'neo-blessed'],
    bundle: true,
    minify: true,
  });
}
