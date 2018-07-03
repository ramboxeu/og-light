const gulp = require('gulp');
const ts = require('gulp-typescript');
const connect = require(`gulp-connect`);
const exec = require(`child_process`).exec;

gulp.task(`default`, [`serve`, `compile`]);

gulp.task(`compile`, () => {
    return gulp.src(`src/**/*.ts`).pipe(ts({outFile: 'build.js'})).pipe(gulp.dest(`dist/`)).pipe(connect.reload());
});

gulp.task(`serve`, () => {
    connect.server({
        root: `./`,
        livereload: true
    });
});

gulp.task(`html`, () => {
    gulp.src(`index.html`).pipe(gulp.dest('./')).pipe(connect.reload());
});

gulp.task(`css`, () => {
    gulp.src(`./css/*`).pipe(gulp.dest('./css')).pipe(connect.reload());
});

gulp.task(`img`, () => {
    gulp.src(`./img/*`).pipe(gulp.dest('./img')).pipe(connect.reload());
});

// Experimental version! Use it with responsibility
gulp.task(`release`, () => {
    if(process.argv[3] != null || process.argv[3] != undefined){
        exec(`git checkout gh-pages`, () => {
            exec(`git add -f dist/`, () => {
                exec(`git commit`, () => {
                    exec(`git tag -a ${process.argv[3]} -m`, () => {
                        exec(`git push`)
                    })
                })
            })
        })
    }
});

gulp.watch([`./src/**/*.ts`], [`compile`]);
gulp.watch([`./index.html`], [`html`]);
gulp.watch([`./img/*`], [`img`]);
gulp.watch([`./css/*`], [`css`]);