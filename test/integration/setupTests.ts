import { noteRepositoryMock } from "../mocks/notes.repository.mock";

// Mock initialization to avoid real DB operations
jest.mock("../../src/config/db", () => ({
  AppDataSource: {
    initialize: jest.fn().mockResolvedValue(undefined),
    getRepository: jest.fn().mockReturnValue(noteRepositoryMock),
  },
}));
