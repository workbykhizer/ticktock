export async function POST(req, { params }) {
  const { id } = params;
  const body = await req.json();

  const newTask = {
    id: Date.now(),
    timesheetId: id,
    date: body.date,
    project: body.project,
    workType: body.workType,
    description: body.description,
    hours: body.hours,
  };

  return Response.json({ success: true, task: newTask });
}
