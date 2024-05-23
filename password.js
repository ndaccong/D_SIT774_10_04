const { createHash } = require('crypto');

function hash(string) {
  return createHash('sha256').update(string).digest('hex');
}

console.log(hash('123456'));
console.log(hash('abcdef'));
console.log(hash('888888'));