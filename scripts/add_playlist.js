const ipfsAPI = require('ipfs-api')

var jsonFile = process.argv[2];
console.log(jsonFile, "add playlist to ipfs");

var ipfs = new ipfsAPI({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https'
});

var json = require('../' + jsonFile);
ipfs.dag.put(json, { format: 'dag-cbor', hashAlg: 'sha2-256' }, (err, cid) => {
  console.log(cid.toBaseEncodedString())
});

// TODO: pin playlist
