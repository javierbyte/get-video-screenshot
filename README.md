# Get Video Screenshot

Library to get screenshots of a video at any given time.
Dependency free (other than the browser itself, does not work on node).

## Usage

```
import GetVideoScreenshot from "get-video-screenshot";

const videoScreenshotGetter = GetVideoScreenshot(<Video Source>);
* Returns a `videoScreenshotGetter` object.

videoScreenshotGetter.get({time: <Int, Seconds>})
* Returns a promise with the image source as payload.
```

## Example Usage.

```js
import GetVideoScreenshot from "get-video-screenshot";

const videoScreenshotGetter = GetVideoScreenshot("./video.mp4");

const videoThumbnailSrc = await videoScreenshotGetter.get({ time: 1 });

// render to image to an <img /> tag
document.querySelector("img[data-thumbnail-render]").src = videoThumbnailSrc;
```
