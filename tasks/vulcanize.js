import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import { run } from 'do-task';
import babel from './babel';

const $ = gulpLoadPlugins();

export default async function vulcanize() {
  await run(babel);
  await new Promise((resolve, reject) => {
    gulp.src('./.tmp/theme.html')
      .pipe($.vulcanize({
        stripComments: true,
        inlineCss: true,
        inlineScripts: true
      }).on('error', reject))
      .pipe($.crisper({
        alwaysWriteScript: true
      }))
      .pipe($.if('*.js', $.uglify().on('error', reject)))
      .pipe($.if('*.html', $.htmlmin({
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        minifyJS: true,
        minifyCSS: true,
        removeStyleLinkTypeAttributes: true,
        removeScriptTypeAttributes: true,
        removeComments: true,
        removeAttributeQuotes: true
      })))
      .pipe(gulp.dest('./dist/'))
      .on('end', () => {
        gulp.src('./.tmp', { read: false })
          .pipe($.clean());
        resolve();
      });
  });
}
