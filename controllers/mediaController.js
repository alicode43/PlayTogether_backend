export const uploadMedia = (file, sharedMedia, io) => {
    const media = {
      type: "upload",
      url: `http://localhost:5000/uploads/${file.filename}`,
    };
    sharedMedia.push(media);
    io.emit("new-media", media);
    return media;
  };
  
  export const shareLink = (body, sharedMedia, io) => {
    const { url, title } = body;
    const media = {
      type: "link",
      url,
      title,
    };
    sharedMedia.push(media);
    io.emit("new-media", media);
    return media;
  };
  