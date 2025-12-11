export async function POST(req) {
  try {
    const body = await req.json();

    const { date, project, typeOfWork, description, hours } = body;

    if (!project || !typeOfWork || !description || !hours) {
      return Response.json(
        { error: "All fields are required!" },
        { status: 400 }
      );
    }

    // Later you will save it to DB
    const newTask = {
      id: Date.now(),
      date,
      project,
      typeOfWork,
      description,
      hours,
    };

    return Response.json(
      { message: "Task added successfully", task: newTask },
      { status: 201 }
    );
  } catch (e) {
    return Response.json({ error: "Invalid request" }, { status: 500 });
  }
}
