const request = require('request');
const config = require('../config.js');

let getReposByUsername = (body, callback) => {
  let options = {
    url: `https://api.github.com/users/${body.username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`,
    }, 
    encoding: 'utf8'
  };

  // let data = [];
  request.get(options, (err, response) => {
    if (err) {
      callback(err);
    } else {
      callback(null, JSON.parse(response.body));
    }
  });

    // .on('response', (response) => {
    //   debugger;
    // })
    // .on('error', (error) => {
    //   callback('Error in getting users repos in request.get().');
    // })
    //
    // Another way to do it asynchronously as the data is streamed:
    // .on('data', (chunk) => {
    //   data.push(chunk);
    // })
    // .on('end', () => {
    //   data = data.join('');
    //   callback(null, JSON.parse(data));
    // });
   
};

module.exports.getReposByUsername = getReposByUsername;