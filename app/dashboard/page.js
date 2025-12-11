import Header from "@/components/Header";
import TimesheetTable from "@/components/TimsheetTable";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 w-full">
        <div
          className="
            max-w-7xl
            mx-auto
            px-4 sm:px-6 lg:px-8
            py-6 sm:py-8 lg:py-12
          "
        >
          <TimesheetTable />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div
          className="
            max-w-7xl
            mx-auto
            px-4 sm:px-6 lg:px-8
            py-6 sm:py-8
            text-center
            text-xs sm:text-sm
            text-gray-600
          "
        >
          © {new Date().getFullYear()} ticktock. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
