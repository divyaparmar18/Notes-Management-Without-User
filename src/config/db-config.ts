import { Note } from "../models/notes.model";
import { AppDataSource } from "./db";
const notesRepo = AppDataSource.getRepository(Note);

export { notesRepo };
