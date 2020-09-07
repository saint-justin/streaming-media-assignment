const fs = require('fs');
const path = require('path');

const streamMedia = (req, res, type, name) => {
  const file = path.resolve(__dirname, name);

  fs.stat(file, (err, stats) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404);
      }
      return res.end(err);
    }

    let { range } = req.headers;
    if (!range) {
      range = 'bytes=0-';
    }

    const positions = range.replace(/bytes=/, '').split('-');

    let start = parseInt(positions[0], 10);

    const total = stats.size;
    const end = positions[1] ? parseInt(positions[1], 10) : total - 1;

    if (start > end) {
      start = end - 1;
    }

    const chunksize = (end - start) + 1;
    res.writeHead(206, {
      'Content-Range': `bytes ${start} ${end}-${end}/${total}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': type,
    });

    const stream = fs.createReadStream(file, { start, end });

    stream.on('open', () => {
      stream.pipe(res);
    });

    stream.on('error', (streamErr) => {
      res.end(streamErr);
    });

    return stream;
  });
};

const getParty = (req, res) => {
  streamMedia(req, res, 'video/mp4', '../client/party.mp4');
};

const getBling = (req, res) => {
  streamMedia(req, res, 'audio/mpeg', '../client/bling.mp3');
};

const getBird = (req, res) => {
  streamMedia(req, res, 'video/mp4', '../client/bird.mp4');
};

module.exports = {
  getParty,
  getBling,
  getBird,
};
