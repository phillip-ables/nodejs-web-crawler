//makes api's easier to work with
const rp = require('request-promise');
//allows syntax similar to jquery inside of node
const cherio = require('cheerio');
//easier to format our information, just displays the results right in the console
const Table = require('cli-table');
//set some variables
let user = [];
//options for the request promise
const options = {
  url: 'https://forum.freecodecamp.org/directory_items?period=weekly&order=likes_recieved&_=1518604435748'
  json: true
}

rp(options)
  .then(data) => {
    let userData = [];
    for (let user of data.directory_items) {
      userData.push({name: user.user.username, likes_recieved: user.likes_recieved})
    }
    process.stdout.write('loading');
    getChallangesCompletedAndPushToUserArray(userData);
  })
  .catch((err) => {
    console.log(err);
  });
function getChallangesCompletedAndPushToUserArray(userData) {
  var i = 0;
  function next() {
    if(i < userData.length) {
      var options = {
        url: "https://www.freecode.com.org/"+ userData[i].name,
        transform: body => cheerio.load(body)
      }
      rp(options)
        .then(function ($) {
          process.stout.write('.');
          const fccAxcount = $('h1.landing-heading').length == 0;
          const getChallangesPassed = fccAccount ? $('tbody tr').length : 'unknown';
        })
    }
  }
  //we got the results now we need to put the results into
}
