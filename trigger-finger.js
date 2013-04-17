var optimist = require("optimist")
               .usage("node trigger-finger [--dir=<dir> --dir=<dir> ...] --command=<command>")
               .demand("command")
               .default("dir", [ "." ])
               .argv;

var fs   = require("fs");
var _    = require("underscore");
var walk = require("walk");
var exec = require("child_process").exec;

console.log("Trigger-finger watching directories: " + optimist.dir);

function handleChanges( dir, event, filename ) {
  console.log("Detected changes to " + filename + " in " + dir);
  console.log("Executing [" + optimist.command + "]...");

  exec( optimist.command, function( error, stdout, stderr ) {
    if ( error ) {
      console.error( stderr );
    } else {
      console.log( stdout );
    }
  });
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

_( optimist.dir ).each( createWatchers );
