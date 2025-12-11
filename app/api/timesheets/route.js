export async function GET() {
  const timesheets = [
    { id: 1, week: 1, dateRange: "21 - 26 January, 2024", status: "COMPLETED" },
    { id: 2, week: 2, dateRange: "27 Jan - 2 Feb, 2024", status: "INCOMPLETE" },
    { id: 3, week: 3, dateRange: "3 - 9 February, 2024", status: "MISSING" }
  ];

  return Response.json({ timesheets });
}
