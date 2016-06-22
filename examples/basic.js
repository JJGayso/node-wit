'use strict';

let Wit = null;
try {
  // if running from repo
  Wit = require('../').Wit;
} catch (e) {
  Wit = require('node-wit').Wit;
}

const accessToken = (() => {
  if (process.argv.length !== 3) {
    console.log('usage: node examples/basic.js <wit-access-token>');
    process.exit(1);
  }
  return process.argv[2];
})();

const actions = {
  send(request, response) {
    const {sessionId, context, entities} = request;
    const {text, quickreplies} = response;
    return new Promise(function(resolve, reject) {
      console.log('user said...', request.text);
      console.log('sending...', JSON.stringify(response));
      return resolve();
    });
  },
  merge({context}) {
    return Promise.resolve(context);
  }
};

const client = new Wit({accessToken, actions});
client.interactive();
