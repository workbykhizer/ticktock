"use client"

import { useEffect, useState } from "react"
import TaskCard from "@/components/TaskCard"
import AddTaskButton from "@/components/AddTaskButton"
import AddTaskModal from "@/components/AddTaskModal"
import Header from "@/components/Header"

export default function TimesheetDetail() {
  const [details, setDetails] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [editTask, setEditTask] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  

  // Fetch timesheet details
  useEffect(() => {
    fetch(`/api/timesheets/1`)
      .then((res) => res.json())
      .then(setDetails)
  }, [])

  // Add new task callback
  const handleTaskAdded = (newTask) => {
    setDetails((prev) => ({
      ...prev,
      days: prev.days.map((day) =>
        day.date === newTask.date
          ? { ...day, tasks: [...day.tasks, newTask] }
          : day
      ),
    }))
  }

  if (!details)
    return (
      <p className="p-6 text-center text-gray-500 text-lg h-screen bg-white">
        Loading...
      </p>
    )

  // Calculate total hours and percentage
  const totalHours = details.days.reduce(
    (sum, day) => sum + day.tasks.reduce((t, task) => t + task.hours, 0),
    0
  )

  const weeklyTargetHours = details.targetHours || 40 // fallback to 40 if not in API
  const progressPercent = Math.min(
    Math.round((totalHours / weeklyTargetHours) * 100),
    100
  )

  return (
    <div className="flex h-screen bg-white text-black">
      <div className="flex-1 overflow-y-auto">
        <Header />

        <div className="container px-8 py-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-black mb-1">
              This week's timesheet
            </h2>
            <p className="text-sm text-gray-500">{details.dateRange}</p>
          </div>

          {/* Dynamic Progress Bar */}
          <div className="mb-8 flex justify-between items-center">
            <div></div>
            <div className="flex items-center gap-4">
              <div className="text-sm font-semibold text-orange-600">
                {totalHours}/{weeklyTargetHours} hrs
              </div>
              <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-600 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-600">{progressPercent}%</div>
            </div>
          </div>

          <div className="space-y-6">
            {details.days.map((day) => (
              <div key={day.date}>
                {day.tasks.length > 0 && (
                  <>
                    <h3 className="text-sm font-semibold text-gray-800 mb-3">
                      {day.date}
                    </h3>
                    <div className="space-y-2 ml-4">
                      {day.tasks.map((task) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          onEdit={() => {
                            setEditTask(task)
                            setSelectedDate(day.date)
                            setModalOpen(true)
                          }}
                        />
                      ))}
                    </div>
                    <div className="mt-3 ml-4">
                      <AddTaskButton
                        onClick={() => {
                          setEditTask(null)
                          setSelectedDate(day.date)
                          setModalOpen(true)
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 mt-8 py-4 px-8 text-center text-xs text-gray-500">
          © 2025 Timesheets. All rights reserved.
        </div>
      </div>

      {modalOpen && (
        <AddTaskModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSuccess={handleTaskAdded}
          selectedDate={selectedDate}
          task={editTask}
        />
      )}
    </div>
  )
}
