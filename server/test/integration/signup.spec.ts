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
  it ("should return 400 if email is invalid", async () => {
    const email = "integration-test@.com"
    await request(server)
      .post("/v1/newsletter/signup")
      .send({email})
      .expect(HttpStatus.BAD_REQUEST);
    });

    it("should not fail is email is already signup it should upsert",async () => {
        const email = "integration-test@gmail.com";
        const first = await prisma.newsletterSubscriber.findFirst({ 
            where: { email }
        });
        await request(server)
            .post("/v1/newsletter/signup")
            .send({email})
            .expect("Content-Type", /json/)
            .expect(HttpStatus.CREATED);

        const second = await prisma.newsletterSubscriber.findFirst({
            where: { email }
        });
        const hasNewToken = first?.token !== second?.token;
        expect(hasNewToken).toBeTruthy();    
    });

  it("should return 201 if an valid email is sent to body", async () => {
    await request(server)
      .post("/v1/newsletter/signup")
      .send({email: "valid@gmail.com"})
      .expect("Content-Type", /json/)
      expect(HttpStatus.CREATED);
    });
});


