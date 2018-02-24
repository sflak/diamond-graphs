// define (function (require) {
//     var fs = require('file-system');
//     var Promise = require('polyfill-promise');
//     var Sheets = require('google-sheets-api').Sheets;
// });

require(['file-system'], function (fs) {
    var fs = require('file-system');
});

 
// TODO: Replace these values with yours 
var documentId = '2PACX-1vREuGbFxskLjhoUy7xLGpXCFBABH-GyTEWDTVMqWoMB1FnY_eiyeAMB4Ofnc0w3G71VB6oyJVtZ2PFj';
var serviceEmail = 'diamondgraphs@diamondgraphs-196221.iam.gserviceaccount.com';
var serviceKey = fs.readFileSync('../misc/sheets.pem').toString();
 
var sheets = new Sheets({ email: serviceEmail, key: serviceKey });
 
sheets.getSheets(documentId)
.then(function(sheetsInfo) {
  // NOTE: Using first sheet in this example 
  var sheetInfo = sheetsInfo[0];
  return Promise.all([
    sheets.getSheet(documentId, sheetInfo.id),
    sheets.getRange(documentId, sheetInfo.id, 'A1:C3')
  ]);
})
.then(function(sheets) {
  console.log('Sheets metadata:', sheets[0]);
  console.log('Sheets contents:', sheets[1]);
})
.catch(function(err){
  console.error(err, 'Failed to read Sheets document');
});