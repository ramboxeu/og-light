const gulp = require('gulp');
const connect = require(`gulp-connect`);

gulp.task(`default`, [`serve`]);

gulp.task(`serve`, () => {
    connect.server({
        root: `./`,
        livereload: true
    });
});

gulp.task(`html`, () => {
    gulp.src(`index.html`).pipe(gulp.dest('./')).pipe(connect.reload());
});

gulp.task(`resources`, () => {
    gulp.src(`./resources/*`).pipe(gulp.dest('./resources')).pipe(connect.reload());
});

gulp.watch([`src/**/*.ts`], [`compile`]);
gulp.watch([`./index.html`], [`html`]);
gulp.watch([`./resources/*`], [`resources`]);
