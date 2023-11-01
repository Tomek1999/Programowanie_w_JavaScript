document.addEventListener("keypress", onKeyPress);

let recording = false;
let channel = 1;
let channelSoundsTables = {
  1: [],
  2: [],
  3: [],
  4: [],
};

const keyToSound = {
  a: document.querySelector("#s1"),
  s: document.querySelector("#s2"),
  d: document.querySelector("#s3"),
  f: document.querySelector("#s4"),
  g: document.querySelector("#s5"),
  q: document.querySelector("#s6"),
  w: document.querySelector("#s7"),
  e: document.querySelector("#s8"),
  r: document.querySelector("#s9"),
};

function onKeyPress(event) {
  const sound = keyToSound[event.key];
  playSound(sound);
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();

  if (recording) {
    const soundsTable = channelSoundsTables[channel] || channelSoundsTables[1];
    soundsTable.push(sound);
  }
}

function startRecording(recordingChannel) {
  if (!recording) {
    recording = true;
    channel = recordingChannel;
  } else {
    alert("Stop the active recording before starting a new one.");
  }
}

function stopRecording() {
  recording = false;
}

function playChannel(selectedChannel) {
  const activePlay = channelSoundsTables[selectedChannel] || [];

  if (activePlay.length > 0) {
    let delay = 0;

    activePlay.forEach((element) => {
      setTimeout(() => {
        element.play();
      }, delay);

      delay += 1000;
    });
  } else {
    alert("The selected channel is empty.");
  }
}
