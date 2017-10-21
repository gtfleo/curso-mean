/*
    Arquivo responsável por estartar, dentro do build, o servidor, usando gulp-webserver
*/

const gulp = require('gulp')
const watch = require('gulp-watch')
const webserver = require('gulp-webserver')

// essa task ficará monitorando os arquivos (durante o desenvolvimento muda-se bastante os arquivos) e 
// sempre que houver uma alteração, ela vai disparar a task específica pra regerar o css, o js ou o html 
// e dar um reload na aplicação (restrito à pasta da aplicação)
// Qualquer mudança será copiada para a pasta public

//watch html: se modificado, joga p/ task app.html do arquivo app.js
//watch css: se modificado, joga p/ task app.css do arquivo app.js
//watch js: se modificado, joga p/ task app.js do arquivo app.js
//watch assets: se modificado, joga p/ task app.assets do arquivo app.js
gulp.task('watch', () => {
    watch('app/**/*.html', () => gulp.start('app.html'))
    watch('app/**/*.css', () => gulp.start('app.css'))
    watch('app/**/*.js', () => gulp.start('app.js'))
    watch('assets/**/*.*', () => gulp.start('app.assets'))
})

//inicializa o servidor, mas antes monitora os arquivos com o watch
//livereload: sempre que a pasta public mudar, vai ser dado um reload na aplicacao(refresh no browser)
//ope: abrir o browser automaticamente
gulp.task('server', ['watch'], () => {
    return gulp.src('public').pipe(webserver({
        livereload: true,
        port: 3000,
        open: true
    }))
})