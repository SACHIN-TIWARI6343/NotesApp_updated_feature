const Note = require("../models/Note");
const User = require("../models/User");

const mongoose = require("mongoose");



const createUserNote = async (title, content, userId) => {

    // Create note
    const note = await Note.create({
      title,
      content,
      owner: userId,   // this is the important line where we associate the note with the authenticated user
    });

    return note;
    
}

const getUserNotes = async (userId) => {
  
    return await Note.find({
    owner: userId,
    archived: false,
  }).sort({ created_at: -1 });
}

const getNotebyId = async (id, userId) => {


  if (!mongoose.Types.ObjectId.isValid(id)) {

     const error = new Error("Note not found");
     error.statusCode = 404;
     throw error;

  }

  const note = await Note.findById(id);
  if (!note) {
      const error = new Error("Note not found");
      error.statusCode = 404;
      throw error;
  }

  const isOwner = note.owner.toString() === userId.toString();
  const isSharedWithUser = (note.sharedWith || []).some(
    (u) => u.toString() === userId.toString() 
  );

  if (!isOwner && !isSharedWithUser) {
    const error = new Error("Forbidden");
    error.statusCode = 403;
    throw error;
  }

  return note;

};

const updateUserNote = async (noteId, userId, title, content) => {

  const note = await Note.findById(noteId);

  if (!note) {
    const error = new Error("Note not found");
    error.statusCode = 404;
    throw error;
  }
  
  if (note.owner.toString() !== userId.toString()) {
    const error = new Error("Forbidden");
    error.statusCode = 403;
    throw error;
  }

  note.title = title;
  note.content = content;
  await note.save();
  return note;


};

const deleteUserNote = async (noteId, userId) => {

  const note = await Note.findById(noteId);
  if (!note) {
    const error = new Error("Note not found");
    error.statusCode = 404;
    throw error;
  }
  if (note.owner.toString() !== userId.toString()) {
    const error = new Error("Forbidden");
    error.statusCode = 403;
    throw error;
  }

  await note.deleteOne();
  return true;

};
const toggleUsrNoteArchive = async (noteId, userId) => {

  const note = await Note.findById(noteId);
  if (!note) {
    const error = new Error("Note not found");
    error.statusCode = 404;
    throw error;
  }
  if (note.owner.toString() !== userId.toString()) {
    const error = new Error("Forbidden");
    error.statusCode = 403;
    throw error;
  }

  note.archived = !note.archived;
  await note.save();
  return note;


};

const shareNoteWithUser = async (noteId, ownerId, share_with_email) => {

  if (!share_with_email) {
    const error = new Error("share_with_email is required");
    error.statusCode = 400;
    throw error;
  }

  const note = await Note.findById(noteId);
  if (!note) {
    const error = new Error("Note not found");
    error.statusCode = 404;
    throw error;
  }
  if (note.owner.toString() !== ownerId.toString()) {
    const error = new Error("Forbidden");
    error.statusCode = 403;
    throw error;
  };

  const targetUser = await User.findOne({ email: share_with_email });

  if (!targetUser) {
    const error = new Error("Share user not found");
    error.statusCode = 404;
    throw error;
  }

  if (targetUser._id.toString() === ownerId.toString()) {
    const error = new Error("You cannot share a note with yourself");
    error.statusCode = 400;
    throw error;
  }

  const alreadyShared = (note.sharedWith).some(
    (userId) => userId.toString() === targetUser._id.toString()
  );

  if (alreadyShared) return note;

  note.sharedWith.push(targetUser._id);

  await note.save();

  return note;
  
};



module.exports = {
    createUserNote,
    getUserNotes,
    getNotebyId,
    updateUserNote,
    deleteUserNote,
    toggleUsrNoteArchive,
    shareNoteWithUser
} ;