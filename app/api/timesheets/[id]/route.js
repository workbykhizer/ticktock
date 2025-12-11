export async function GET(req, { params }) {
  const { id } = params;

  const timesheetDetails = {
    id,
    week: 1,
    dateRange: "21 - 26 January, 2024",
    totalHours: 20,
    days: [
      {
        date: "Jan 21",
        tasks: [
          { id: 1, name: "Homepage Development", hours: 4, project: "Project A" },
          { id: 2, name: "Homepage Development", hours: 4, project: "Project A" }
        ]
      },
      {
        date: "Jan 22",
        tasks: [
          { id: 3, name: "Homepage Development", hours: 4, project: "Project B" }
        ]
      }
    ]
  };

  return Response.json(timesheetDetails);
}
