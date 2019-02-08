import 'babel-polyfill'
import ipfsAPI from 'ipfs-api'
import $ from 'jquery'
import { ethers } from 'ethers'

var ipfs;
var playList;
var playListIPLDHash;
var nextTrack = 0;

// Ethereum variables
var eth_network = 'kovan';
var contractAddress = "0x3da43A2C62997A1dfa52E268427D1829aECC57cD";
var abi = [
  "function playlistHash() view returns(string)"
]


const showTrackInfo = async (musicRecording) => {
  $("#track_name").text(musicRecording.name);
  $("#artist_name").text(musicRecording.byArtist[0].name);
  $("#track_image").attr("src", musicRecording.byArtist[0].image[1].contentUrl);
}

const playTrack = async (contentUrl) => {
  $("#audio_source").attr("src", contentUrl);
  $("#audio")[0].load();
  $("#audio")[0].play();
}

const getMusicRecording = async (multihash) => {
  var err, node = await ipfs.dag.get(multihash);
  if (err) {
    throw err;
  }
  return node.value;
}

const playNextTrack = async () => {
  var multihash = playList[nextTrack];
  var musicRecording = await getMusicRecording(multihash);
  showTrackInfo(musicRecording);
  playTrack(musicRecording.audio[0].contentUrl);
  nextTrack += 1;
  if (nextTrack > playList.length-1) nextTrack = 0;
}

const getIPLDPlayList = async () => {
  playList = await ipfs.dag.get(playListIPLDHash + "/playlist");
  playList = playList.value;
}

const getPlayListHashFromEthereum = async () => {
  let provider = ethers.getDefaultProvider(eth_network);
  let contract = new ethers.Contract(contractAddress, abi, provider);
  let playlistHash = await contract.playlistHash();
  console.log(playlistHash);
  return playlistHash;
}

const setSiteInfo = () => {
  $("#ethereum_network").text("Ethereum Network: " + eth_network);
  $("#ethereum_address").text("Playlist Contract: " + contractAddress);
  $("#ipld_playlist_hash").text("IPLD Playlist Hash: " + playListIPLDHash);
}

const setup = async () => {
  try {
    // setup ipfs
    ipfs = new ipfsAPI({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https'
    });
    // get playlist IPLD hash from ethereum
    playListIPLDHash = await getPlayListHashFromEthereum();
    // set site information
    setSiteInfo();
    // get the playlist from IPLD
    await getIPLDPlayList();
    // load first track
    playNextTrack();
    // set *onended* event to play the next track
    var audio = document.getElementById("audio");
    audio.onended = () => {
      playNextTrack();
    }
  } catch(err) {
    console.log(err);
  }
}

setup();
