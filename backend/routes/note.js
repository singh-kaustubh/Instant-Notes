import { request, Router } from "express";
const router = Router();
import Note from "../models/Note.js";
import fetchUser from "../middleware/fetchUser.js";
import { body } from "express-validator";
import { validationResult } from "express-validator";
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const notes = await Note.find({ user: userId });
    if (!notes) {
      return res.status(200).send("No notes added by the user");
    }
    res.status(200).json(notes);
  } catch (err) {
    console.log(err);
    res.status(400).send("Internal server error");
  }
});
router.post(
  "/addnote",
  fetchUser,
  [
    body("title").isLength({ min: 3 }),
    body("description").isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ erros: errors.array() });
      }
      const userId = req.user.id;
      const newNote = new Note({
        title: title,
        description: description,
        tag: tag,
        user: userId,
      });
      await newNote.save();
      res.status(200).json(newNote);
    } catch (error) {
      console.log(error);
      res.status(400).send("Internal Server Error!");
    }
  }
);
router.put("/updatenote/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }
  let note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(404).json({ error: "Note not found" });
  }
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not allowed");
  }
  try {
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    console.log(error);
    res.status(400).send("Internal server error");
  }
});
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Not found");
  }
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not allowed to delete this note");
  }
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(200).json("Note has been deleted");
  } catch (error) {
    console.log(error);
    res.status(400).send("Internal server error");
  }
});

export default router;
