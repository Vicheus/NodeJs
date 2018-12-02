var shell = require('shelljs');

shell.cp('-R', 'src/public/fonts', 'dist/public/fonts');
shell.cp('-R', 'src/public/images', 'dist/public/images');
shell.cp('-R', 'src/views', 'dist/views');
shell.cp('-R', 'src/config', 'dist/config');
