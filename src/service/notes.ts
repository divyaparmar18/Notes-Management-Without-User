import { notesRepo } from "../config/db-config";
import { ILike, DeleteResult } from "typeorm";
import {
  NOTE_CREATED,
  NOTE_DELETED,
  NOTE_UPDATED,
  NOTES_FETCHED,
} from "../constants/message";
import { NOTE_NOT_FOUND } from "../constants/error";
import { NoteInput } from "../interfaces/notes";
import { IResponse } from "../interfaces/common";
import logger from "../utils/logger";

/**
 * Creates a new note and returns a response.
 *
 * @param {NoteInput} noteInput - The details of the note to create.
 * @returns {Promise<IResponse>} A promise representing the creation operation.
 */
export const createNote = async (noteInput: NoteInput): Promise<IResponse> => {
  try {
    const { title, body } = noteInput;
    const createdNote = notesRepo.create({
      title,
      body,
    });
    const savedNote = await notesRepo.save(createdNote);
    return {
      success: true,
      message: NOTE_CREATED,
      data: savedNote,
    };
  } catch (error: any) {
    logger.info(`error in createNote ${error.message}`);
    throw {
      success: false,
      message: error.message || "Failed to create note.",
    };
  }
};

/**
 * Fetches a note by its ID and returns a response.
 *
 * @param {string} noteId - The ID of the note to fetch.
 * @returns {Promise<IResponse>} A promise representing the fetch operation.
 */
export const fetchNoteById = async (noteId: string): Promise<IResponse> => {
  try {
    const note = await notesRepo.findOne({ where: { id: noteId } });
    if (note) {
      return {
        success: true,
        message: NOTES_FETCHED,
        data: note,
      };
    }
    return NOTE_NOT_FOUND;
  } catch (error: any) {
    logger.info(`error in fetchNoteById ${error.message}`);
    throw {
      success: false,
      message: error.message || "Failed to fetch notes.",
    };
  }
};

/**
 * Queries notes by title substring and returns a response.
 *
 * @param {string} titleSubstring - The substring to search for in note titles.
 * @returns {Promise<IResponse>} A promise representing the query operation.
 */
export const queryNotesByTitle = async (
  titleSubstring: string
): Promise<IResponse> => {
  try {
    const notes = await notesRepo.find({
      where: {
        title: ILike(`%${titleSubstring}%`),
      },
    });
    return {
      success: true,
      message: NOTES_FETCHED,
      data: notes,
    };
  } catch (error: any) {
    logger.info(`error while queryNotesByTitle ${error.message}`);

    throw {
      success: false,
      message: error.message || "Failed to query notes.",
    };
  }
};

/**
 * Updates a note by its ID and returns a response.
 *
 * @param {string} noteId - The ID of the note to update.
 * @param {NoteUpdateInput} noteUpdateInput - The details to update the note with.
 * @returns {Promise<IResponse>} A promise representing the update operation.
 */
export const updateNote = async (
  noteId: string,
  noteUpdateInput: NoteInput
): Promise<IResponse> => {
  try {
    const note = await notesRepo.findOne({ where: { id: noteId } });
    if (note) {
      const updatedNote = {
        ...note,
        ...noteUpdateInput,
        updated_at: new Date(),
      };
      const savedNote = await notesRepo.save(updatedNote);
      return {
        success: true,
        message: NOTE_UPDATED,
        data: savedNote,
      };
    }
    return NOTE_NOT_FOUND;
  } catch (error: any) {
    logger.info(`error while updateNote ${error.message}`);

    throw {
      success: false,
      message: error.message || "Failed to update note.",
    };
  }
};

/**
 * Deletes a note by its ID and returns a response.
 *
 * @param {string} noteId - The ID of the note to delete.
 * @returns {Promise<IResponse>} A promise representing the deletion operation.
 */
export const deleteNote = async (noteId: string): Promise<IResponse> => {
  try {
    const deleteResult: DeleteResult = await notesRepo.delete(noteId);
    if (deleteResult.affected) {
      return NOTE_DELETED;
    }
    return NOTE_NOT_FOUND;
  } catch (error: any) {
    logger.info(`error in deleteNote ${error.message}`);

    throw {
      success: false,
      message: error.message || "Failed to delete note.",
    };
  }
};

/**
 * Retrieves notes with pagination.
 *
 * @param {number} page - The page number for pagination.
 * @param {number} limit - The number of notes per page.
 * @returns {Promise<IResponse>} A promise representing the retrieval operation.
 */
export const getNotes = async (
  page: number,
  limit: number
): Promise<IResponse> => {
  try {
    const [notes, total] = await notesRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      where: { isDeleted: false }, // Exclude soft-deleted notes
    });

    return {
      success: true,
      message: NOTES_FETCHED,
      data: {
        notes,
        total,
        page,
        limit,
      },
    };
  } catch (error: any) {
    logger.info(`error in getNotes ${error.message}`);
    throw {
      success: false,
      message: error.message || "Failed to get notes",
    };
  }
};

/**
 * Soft deletes a note by its ID.
 *
 * @param {string} id - The ID of the note to delete.
 * @returns {Promise<IResponse>} A promise representing the deletion operation.
 */
export const softDeleteNote = async (id: string): Promise<IResponse> => {
  try {
    const note = await notesRepo.findOne({ where: { id, isDeleted: false } });
    if (note) {
      note.isDeleted = true;
      await notesRepo.save(note);
      return NOTE_DELETED;
    }
    return NOTE_NOT_FOUND;
  } catch (error: any) {
    logger.info(`error in softDeleteNote${error.message}`);
    throw {
      success: false,
      message: error.message || "Failed to delete note",
    };
  }
};
