import { serve } from "https://deno.land/std@0.209.0/http/server.ts";

const PORT = 3000;

// Funzione per eseguire il file JAR
async function executeJar(level: number): Promise<string> {

  // example: java -jar qqwing-1.3.4.jar --generate 1 --one-line --solution --difficulty expert
  let levelString = "";
  switch (level) {
    case 1:
      levelString = "simple";
      break;
    case 2:
      levelString = "easy";
      break;
    case 3:
      levelString = "intermediate";
      break;
    case 4:
      levelString = "expert";
      break;
    case 5:
      levelString = "expert";
      break;
  }

  const process = Deno.run({
    cmd: ["java", "-jar", "qqwing-1.3.4.jar", "--generate", "1", "--one-line", "--solution", "--difficulty", levelString],
    stdout: "piped",
    stderr: "piped",
  });

  // Leggi stdout e stderr
  const [stdout, stderr] = await Promise.all([
    process.output(),
    process.stderrOutput(),
  ]);

  const status = await process.status();
  process.close();

  if (!status.success) {
    throw new Error(new TextDecoder().decode(stderr));
  }
  const output = new TextDecoder().decode(stdout);
  const lines = output.split("\n");
  const sudokuString = lines[0];
  const solutionString = lines[1];
  return JSON.stringify({ sudokuString, solutionString, level });
}

// Gestore per le richieste
async function handler(req: Request): Promise<Response> {
  // Add CORS headers
  const headers = new Headers({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers });
  }

  if (req.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers,
    });
  }

  try {
    const url = new URL(req.url);
    const level = parseInt(url.searchParams.get("level") || "1");

    if (isNaN(level) || level < 1 || level > 5) {
      return new Response(
        JSON.stringify({ error: "Level must be between 1 and 5" }),
        { status: 400, headers }
      );
    }

    const result = await executeJar(level);
    return new Response(result, { headers });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers,
    });
  }
}

// Avvia il server
console.log(`Server running on http://localhost:${PORT}`);
serve(handler, { port: PORT });
