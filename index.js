var es = require('event-stream');
var rigger = require('rigger');
var path = require('path');

module.exports = function (options) {
    options = options || {};

    return es.map(function (file, cb) {
        options.cwd = path.dirname(file.path);
        options.filetype = path.extname(file.path).slice(1);
        options.targetType = path.extname(file.path).slice(1);

        rigger.process(file.contents.toString(), options, function (error, content) {
            file.contents = new Buffer(content);
            cb(error, file);
        });
    });
}