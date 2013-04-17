var optimist = require("optimist")
               .usage("node trigger-finger [--dir=<dir> --dir=<dir> ...] --command=<command>")
               .demand("command")
               .default("dir", [ "." ])
               .argv;

var fs = require("fs");
var _  = require("underscore");
var walk = require("walk");

console.log("Trigger-finger watching directories: " + optimist.dir);

function handleChanges( dir, event, filename ) {
  console.log("Detected changes to " + filename + " in " + dir);
}

function createWatchers(dir) {

  var walker = walk.walk( dir, { followLinks: false } );

  walker.on("directories", function( root, stats, next ) {

    stats.forEach( function( s ) {
      createWatchers( root + "/" + s.name );
    });

    fs.watch( dir, function(event, filename) {
      handleChanges(dir, event, filename)
    });
  });
}

_( optimist.dir ).each(
  createWatchers
);
