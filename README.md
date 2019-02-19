# chibacity-radio
Music streaming service made with IPFS/IPLD and Ethereum.

site ipfs hash: [Qmad2zjK72ireVuHNmkeH4YePwH6bZVQUK889wcCxTPyJs](https://ipfs.infura.io/ipfs/Qmad2zjK72ireVuHNmkeH4YePwH6bZVQUK889wcCxTPyJs/)

ChibaCity Radio is an exercise to myself to learn IPFS/IPLD and integrate it with an [Ethereum contract.](https://github.com/velasquez/chibacity-contracts)

As one of my main interest in life is music, i used [ujomusic.com](https://www.ujomusic.com) recordings registry using [CoalaIP](https://www.coalaip.org) standard to create a playlist made of CIDs of MusicRecording objects served by an Ethereum contract. Every hash in the play list allows the site to fetch artist and song information along with a recording link to reproduce the songs.

At this stage this is a very MVP of how a radio station or streaming service could work using almost only decentralized services.

### Current state:

- The site hosted on IPFS fetch a hash from an Ethereum contract which resolves to a file in json format with a list of CIDs of MusicRecording Objects also hosted on IPFS on linked data format.
- The site pulls the object finding basic song and artist information and a link for an mp3 recording and plays it.
- Once the song is over step 2 is repeated with the next MusicRecording Object until the last one and loops from the beginning of the list again and again.

### What’s next (among other things)?

- Change the ‘Owner’ address of the contract that serves the playlist hash to a contract with a more interesting method to select the playlist that is currently ‘oficial’, for example by paying or with a TCR system
- Integrate better with Ujomusic for donations to the artists, badges, or buying an album for the ‘now playing’ artist.
- Create a contract on Ethereum that accepts donations to the radio station integrated with Ujomusic information for the playlist artists and distribute such donation among those artists and the radio it self for some kind of infrastructure.
- Move to main net.
- Have more sources for the song and MusicRecording objects than just the IPFS infura gateway/RPC for fail over. 
- ...

