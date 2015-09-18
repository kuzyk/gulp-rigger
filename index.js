var es = require('event-stream');
var rigger = require('rigger');
var path = require('path');

module.exports = function (options) {
    options = options || {};

    return es.map(function (file, cb) {
        if(!options.cwd){
                options.cwd = path.dirname(file.path);
        }
        if(!options.filetype){
                options.filetype = path.extname(file.path).slice(1);
        }
        // CHANGED: send full file path to rigger to avoid self-inclusion
        if(!options.filepath){
            options.filepath = file.path;
        }
        if(!options.targetType){
                options.targetType = path.extname(file.path).slice(1);
        }

        rigger.process(file.contents.toString(), options, function (error, content) {
            if (error) {
                cb(error);
            } else {
                file.contents = new Buffer(content);
                cb(null, file);
            }
        });
    });
}
