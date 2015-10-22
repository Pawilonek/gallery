fs = require('fs');
path = require('path');
//console.log(__dirname);
//var files = fs.readdirSync(__dirname);
//console.log(files);

function getFilesList(dir) {
    var files = fs.readdirSync(dir);
    var result = [];
    // todo: support: . ..
    for (var i=0; i<files.length; i++) {
        if (!files[i] || files[i] == "." || files[i] == "..") {
            continue;
        }
        var file = dir + path.sep + files[i];
        var $file = fs.statSync(file);
        if ($file.isDirectory()) {
            result = result.concat(getFilesList(file));
            continue;
        }
        if (path.extname(files[i]) != '.js') {
            continue;
        }

        result.push(file);
    }
    return result;
}

var dir = __dirname + path.sep + '..' +
    path.sep + 'js';

var files = getFilesList(dir);

if (files.length <= 0) {
    console.error("Not found any valid file");
    return;
}

for (var i=0; i<files.length; i++) {
    console.log(path.normalize(files[i]));
}


var UglifyJS = require("uglify-js");
var result = UglifyJS.minify(files, {
    mangle: false
    //outSourceMap: "out.js.map"
});

var outFile = __dirname + path.sep + '..' +
    path.sep + 'js.js';

fs.writeFile(outFile, result.code, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});
