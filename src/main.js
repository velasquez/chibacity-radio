import 'babel-polyfill'
import ipfsAPI from 'ipfs-api'
import $ from 'jquery'

var ipfs;
var playList;
var playListIPLDHash="zdpuAvCSGPfSNzw1H2JxFLZ6nmc7ioYKz1C7nK8Ws7TCmvhN7";
var nextTrack = 0;

const showTrackInfo = async (musicRecording) => {
  $("#track_name").text(musicRecording.name);
  $("#artist_name").text(" by " + musicRecording.byArtist[0].name);
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

const setup = async () => {
  try {
    // setup ipfs
    ipfs = new ipfsAPI({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https'
    });
    await getIPLDPlayList();
    // generate interaction so the music starts
    $("#start_playing").click(() => {
      playNextTrack();
      $("#start_playing").hide();
    })
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
