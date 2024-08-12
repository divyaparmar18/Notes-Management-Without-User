import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IResponse } from "../interfaces/common";
import {
  createNote,
  deleteNote,
  fetchNoteById,
  getNotes,
  queryNotesByTitle,
  softDeleteNote,
  updateNote,
} from "../service/notes";
import { getStatus } from "../utils/status-helper";

/**
 * Handles note creation.
 *
 * @param {Request} req - The Express request object, note details in the request body.
 * @param {Response} res - The Express response object.
 *
 * @returns {Promise<void>} A Promise representing the completion of the creation operation.
 */
export const handleCreateNote = async (req: Request, res: Response) => {
  createNote(req.body)
    .then((response: IResponse) => {
      const status = getStatus(response.success);
      return res.status(status).send(response);
    })
    .catch((err: any) => {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
    });
};

/**
 * Handles fetching a note by its ID.
 *
 * @param {Request} req - The Express request object, note ID in the request parameters.
 * @param {Response} res - The Express response object.
 *
 * @returns {Promise<void>} A Promise representing the completion of the fetch operation.
 */
export const handleFetchNoteById = async (req: Request, res: Response) => {
  const noteId = req.params.id;
  fetchNoteById(noteId)
    .then((response: IResponse) => {
      const status = getStatus(response.success);
      return res.status(status).send(response);
    })
    .catch((err: any) => {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
    });
};

/**
 * Handles querying notes by title substring.
 *
 * @param {Request} req - The Express request object, query parameters for title substring.
 * @param {Response} res - The Express response object.
 *
 * @returns {Promise<void>} A Promise representing the completion of the query operation.
 */
export const handleQueryNotesByTitle = async (req: Request, res: Response) => {
  const titleSubstring = req.query.title as string;
  queryNotesByTitle(titleSubstring)
    .then((response: IResponse) => {
      const status = getStatus(response.success);
      return res.status(status).send(response);
    })
    .catch((err: any) => {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
    });
};

/**
 * Handles updating a note by its ID.
 *
 * @param {Request} req - The Express request object, note ID in the request parameters, and update details in the request body.
 * @param {Response} res - The Express response object.
 *
 * @returns {Promise<void>} A Promise representing the completion of the update operation.
 */
export const handleUpdateNote = async (req: Request, res: Response) => {
  const noteId = req.params.id;
  updateNote(noteId, req.body)
    .then((response: IResponse) => {
      const status = getStatus(response.success);
      return res.status(status).send(response);
    })
    .catch((err: any) => {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
    });
};

/**
 * Handles deleting a note by its ID.
 *
 * @param {Request} req - The Express request object, note ID in the request parameters.
 * @param {Response} res - The Express response object.
 *
 * @returns {Promise<void>} A Promise representing the completion of the delete operation.
 */
export const handleDeleteNote = async (req: Request, res: Response) => {
  const noteId = req.params.id;
  deleteNote(noteId)
    .then((response: IResponse) => {
      const status = getStatus(response.success);
      return res.status(status).send(response);
    })
    .catch((err: any) => {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
    });
};

/**
 * Handles fetching notes with pagination.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
export const getNotesByPagination = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = parseInt(req.query.limit as string, 10) || 10;
  getNotes(page, limit)
    .then((response: IResponse) => {
      const status = getStatus(response.success);
      return res.status(status).send(response);
    })
    .catch((err: any) => {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
    });
};

/**
 * Handles soft deletion of a note by its ID.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
export const deleteNoteSoftly = async (req: Request, res: Response) => {
  const id = req.params.id;
  softDeleteNote(id)
    .then((response: IResponse) => {
      const status = getStatus(response.success);
      return res.status(status).send(response);
    })
    .catch((err: any) => {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
    });
};
