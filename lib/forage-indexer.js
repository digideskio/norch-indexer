var fs = require('fs');
var request = require('request');
var program = require('commander');

program
  .version('0.0.1')
  .option('-d, --documentdirectory <documentdirectory>', 'specify the document directory,'
          + ' defaults to crawl/doc/ (MUST END WITH SLASH /)',
          String, 'doc/')
  .option('-e, --endpoint <endpoint>', 'specify the forage endpoint,',
          String, 'http://localhost:3000/indexer')
  .parse(process.argv);

var docdir = program.documentdirectory;

var forageFiles = fs.readdirSync(docdir);

var postToForage = function(path) {
  console.log(path);
  var r = request.post(program.endpoint, function (error, response, body) {
    if (f = forageFiles.pop())
      postToForage(docdir + f);
  });
  var form = r.form();
  form.append('document', fs.createReadStream(path));
}
postToForage(docdir + forageFiles.pop());

