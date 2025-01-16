"use client";

import { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { Priority, Task } from "@/mainTypes";
import { Header, ModalNewTask, TaskCard } from "@/components";
import { useAppSelector } from "@/app/redux";
import { useGetTasksByUserQuery } from "@/state/api";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";

type PageProps = {
  params: { priority: Priority };
  searchParams?: { [key: string]: string | string[] | undefined };
};

const columns: GridColDef[] = [
  {
    field: "title",
    headerName: "Title",
    width: 100,
  },
  {
    field: "description",
    headerName: "Description",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    renderCell: (params) => (
      <span
        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
          params.value === "Completed"
            ? "bg-green-100 text-green-800"
            : params.value === "In Progress"
              ? "bg-blue-100 text-blue-800"
              : params.value === "To Do"
                ? "bg-gray-100 text-gray-800"
                : "bg-yellow-100 text-yellow-800"
        }`}
      >
        {params.value}
      </span>
    ),
  },
  {
    field: "priority",
    headerName: "Priority",
    width: 75,
    renderCell: (params) => (
      <span
        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
          params.value === "High"
            ? "bg-red-100 text-red-800"
            : params.value === "Medium"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-green-100 text-green-800"
        }`}
      >
        {params.value}
      </span>
    ),
  },
  {
    field: "tags",
    headerName: "Tags",
    width: 130,
    renderCell: (params) => (
      <div className="flex flex-wrap gap-1">
        {params.value?.split(",").map((tag: string) => (
          <span
            key={tag}
            className="inline-flex rounded-full bg-blue-100 px-2 text-xs font-semibold text-blue-800"
          >
            {tag.trim()}
          </span>
        ))}
      </div>
    ),
  },
  {
    field: "startDate",
    headerName: "Start Date",
    width: 130,
    valueFormatter: (params: {
      value: string | number | Date | null | undefined;
    }) => {
      if (!params.value) return "";
      return new Date(params.value).toLocaleDateString();
    },
  },
  {
    field: "dueDate",
    headerName: "Due Date",
    width: 130,
    valueFormatter: (params: {
      value: string | number | Date | null | undefined;
    }) => {
      if (!params.value) return "";
      return new Date(params.value).toLocaleDateString();
    },
  },
  {
    field: "author",
    headerName: "Author",
    width: 150,
    renderCell: (params) => params.value?.username || "Unknown",
  },
  {
    field: "assignee",
    headerName: "Assignee",
    width: 150,
    renderCell: (params) => params.value?.username || "Unassigned",
  },
];

export default function ReusablePriorityPage({
  params,
  searchParams,
}: PageProps) {
  const [view, setView] = useState<"list" | "table">("list");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const userId = 1; // TODO: Replace with actual user ID from auth
  const {
    data: tasks,
    isLoading,
    isError: isTasksError,
  } = useGetTasksByUserQuery(userId || 0, {
    skip: userId === null,
  });

  const filteredTasks = tasks?.filter(
    (task: Task) => task.priority === params.priority,
  );

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (isTasksError || !tasks) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-lg text-red-500">Error fetching tasks</div>
      </div>
    );
  }

  return (
    <div className="m-5 p-4">
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
      />

      <Header
        name={`${params.priority} Priority Tasks`}
        buttonComponent={
          <button
            className="mr-3 rounded bg-blue-500 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-700"
            onClick={() => setIsModalNewTaskOpen(true)}
          >
            Add Task
          </button>
        }
      />

      <div className="mb-4 flex justify-start">
        <button
          className={`rounded-l px-4 py-2 transition-colors ${
            view === "list"
              ? "bg-gray-300 dark:bg-gray-700"
              : "bg-white dark:bg-gray-800"
          }`}
          onClick={() => setView("list")}
        >
          List
        </button>
        <button
          className={`rounded-r px-4 py-2 transition-colors ${
            view === "table"
              ? "bg-gray-300 dark:bg-gray-700"
              : "bg-white dark:bg-gray-800"
          }`}
          onClick={() => setView("table")}
        >
          Table
        </button>
      </div>

      {view === "list" ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTasks?.map((task: Task) => (
            <TaskCard key={task.id} task={task} />
          ))}
          {filteredTasks?.length === 0 && (
            <div className="col-span-full text-center text-gray-500">
              No tasks found with {params.priority} priority
            </div>
          )}
        </div>
      ) : (
        filteredTasks && (
          <div className="z-0 w-full">
            <DataGrid
              rows={filteredTasks}
              columns={columns}
              checkboxSelection
              getRowId={(row) => row.id}
              className={dataGridClassNames}
              sx={dataGridSxStyles(isDarkMode)}
              pageSizeOptions={[5, 10, 25]}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 10, page: 0 },
                },
              }}
            />
          </div>
        )
      )}
    </div>
  );
}
