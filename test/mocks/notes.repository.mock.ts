import { Repository } from "typeorm";
import { Note } from "../../src/models/notes.model";

const noteRepositoryMock = {
  save: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  delete: jest.fn(),
  create: jest.fn(), // Add this if `create` method is used
};

export { noteRepositoryMock };
