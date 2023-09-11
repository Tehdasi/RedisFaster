import { performance } from "perf_hooks";
import supertest from "supertest";
import { buildApp } from "./app";

const app = supertest(buildApp());

async function basicLatencyTest() {
    await app.post("/reset").expect(204);
    const start = performance.now();
    await app.post("/charge").expect(200);
    await app.post("/charge").expect(200);
    await app.post("/charge").expect(200);
    await app.post("/charge").expect(200);
    await app.post("/charge").expect(200);
    console.log(`Latency: ${performance.now() - start} ms`);
}


async function otherTest()
{
    await app.post("/reset").expect(204);
    app.post("/charge").send({charges:"100"}).expect(200).then( function(a) { console.log(a.body)} );
    await app.post("/charge" ).send({charges:"100"}).expect(200).then( function(a) { console.log(a.body)} );
}

async function otherTest2()
{
    await app.post("/reset").expect(204);
    await app.post("/tr").expect(204);
}



basicLatencyTest();
