import request from "supertest";
import HttpStatus from "http-status";
import { createServer } from "../../src/server";
import { PrismaClient } from "@prisma/client";

describe("signup", () => {
  const prisma = new PrismaClient();
  const server = createServer({prisma}).listen(80);
    afterAll(async () => {
    server.close();
    await prisma.$disconnect();
    });
    beforeEach(async () => {
    await prisma.newsletterSubscriber.deleteMany();
    });

  it("should return 400 if not send an email to body", async () => {
    await request(server)
      .post("/v1/newsletter/signup")
      .send()
      .expect(HttpStatus.BAD_REQUEST);  
  });
  
  it("should return 200 if an valid email is sent to body", async () => {
    await request(server)
      .post("/v1/newsletter/signup")
      .send({email: "valid@gmail.com"})
      .expect("Content-Type", /json/)
      expect(HttpStatus.OK);
    });
});


