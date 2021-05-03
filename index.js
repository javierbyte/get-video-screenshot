function GetVideoScreenshot(videoSrc) {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");

    function videoScreenshotGetter(videoEl) {
      let internals = {
        videoEl,
        videoDuration: videoEl.duration,
      };

      return {
        get({ time }) {
          return new Promise((resolveGet, rejectGet) => {
            if (time < 0 || time > internals.videoDuration) {
              rejectGet(null, `Time "${time}" is not valid.`);
            }

            internals.videoEl.onseeked = function (e) {
              const canvas = document.createElement("canvas");
              canvas.height = internals.videoEl.videoHeight;
              canvas.width = internals.videoEl.videoWidth;
              const ctx = canvas.getContext("2d");
              ctx.drawImage(
                internals.videoEl,
                0,
                0,
                canvas.width,
                canvas.height
              );

              resolveGet({
                src: canvas.toDataURL(),
                time: internals.videoEl.currentTime,
              });
            };

            internals.videoEl.currentTime = time;
          });
        },
        info: {
          videoDuration: internals.videoDuration,
        },
      };
    }

    video.onloadedmetadata = function () {
      resolve(videoScreenshotGetter(this));
    };
    video.onerror = function (e) {
      reject(e);
    };
    video.src = videoSrc;
  });
}

export default GetVideoScreenshot;
