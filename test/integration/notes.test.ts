import request from "supertest";
import { app } from "../../src/server";
import { noteRepositoryMock } from "../mocks/notes.repository.mock";

describe("Notes API", () => {
  const newNote = { title: "Test Note", content: "Test content" };
  const testNoteId = 1;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("POST /notes - should create a new note", async () => {
    noteRepositoryMock.save.mockResolvedValue({ ...newNote, id: testNoteId });

    const response = await request(app)
      .post("/notes")
      .send(newNote)
      .expect("Content-Type", /json/)
      .expect(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Note created successfully");
  });

  test("GET /note/:id - should fetch a note by ID", async () => {
    noteRepositoryMock.findOne.mockResolvedValue({
      ...newNote,
      id: testNoteId,
    });

    const response = await request(app)
      .get(`/note/${testNoteId}`)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Notes fetched successfully");
  });

  test("GET /notes - should query notes by title", async () => {
    noteRepositoryMock.find.mockResolvedValue([{ ...newNote, id: testNoteId }]);

    const response = await request(app)
      .get("/notes")
      .query({ title: "Test" })
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Notes fetched successfully");
  });

  test("PUT /notes/:id - should update a note by ID", async () => {
    const updatedNote = { title: "Updated Note", content: "Updated content" };
    noteRepositoryMock.save.mockResolvedValue({
      ...updatedNote,
      id: testNoteId,
    });

    const response = await request(app)
      .put(`/notes/${testNoteId}`) // Use backticks for string interpolation
      .send(updatedNote)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Note updated successfully");
  });

  test("DELETE /notes/:id - should delete a note by ID", async () => {
    noteRepositoryMock.delete.mockResolvedValue({ affected: 1 });

    const response = await request(app)
      .delete(`/notes/${testNoteId}`)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Note deleted successfully");
  });

  // Add more tests as needed
});
