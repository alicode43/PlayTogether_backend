import express from "express";
import upload from "../utils/multerConfig.js";
import { uploadMedia, shareLink } from "../controllers/mediaController.js";

export default (sharedMedia, io) => {
  const router = express.Router();

  // Upload endpoint
  router.post("/upload", upload.single("file"), (req, res) => {
    const media = uploadMedia(req.file, sharedMedia, io);
    res.status(201).json(media);
  });

  // Share link endpoint
  router.post("/link", (req, res) => {
    const media = shareLink(req.body, sharedMedia, io);
    res.status(201).json(media);
  });

  return router;
};
