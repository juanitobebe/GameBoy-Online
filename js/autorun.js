function readBlob(blob) {
  return new Promise((resolve, reject) => {
    var fr = new FileReader();
    fr.onload = () => {
      resolve(fr.result);
    };
    fr.readAsDataURL(blob);
  });
}

function autorun() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const rom = urlParams.get("rom");
  const proxyUrl = "https://cors-anywhere.herokuapp.com/"; // Don't judge me
  fetch(proxyUrl + rom)
    .then((res) => res.blob()) // Gets the response and returns it as a blob
    .then(readBlob)
    .then((readerResult) => {
      // I probably do't need to do this... but well I need this quick.
      const rom_b64 = readerResult.replace(/^data:.+;base64,/, "");
      initPlayer();
      start(document.getElementById("mainCanvas"), base64_decode(rom_b64));
    });
}
