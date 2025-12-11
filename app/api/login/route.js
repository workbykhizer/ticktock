export async function POST(req) {
  const { email, password } = await req.json();

  // Replace with real auth check
  if (email === "test@example.com" && password === "123456") {
    // Set cookie with user info (simple example)
    const response = new Response(JSON.stringify({ message: "Login successful!" }), {
      status: 200,
    });
    response.headers.append(
      "Set-Cookie",
      `user=${encodeURIComponent(JSON.stringify({ name: "Khizer Mehmood" }))}; Path=/; HttpOnly`
    );
    return response;
  } else {
    return new Response(JSON.stringify({ message: "Invalid credentials" }), { status: 401 });
  }
}
