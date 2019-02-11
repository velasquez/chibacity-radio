const ipfsAPI = require('ipfs-api')

var hash = process.argv[2];
console.log(hash, "pin this hash in infura");

var ipfs = new ipfsAPI({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https'
});

ipfs.pin.add(hash, (err, res) => {
  if (err) {
    console.log(err);
  }
  console.log(res);
});
