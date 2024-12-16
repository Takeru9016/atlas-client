import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { useAppSelector } from "@/app/redux";
import { useGetTasksQuery } from "@/state/api";
import Header from "./Header";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";

type TableViewProps = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
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
    width: 400,
  },
  {
    field: "status",
    headerName: "Status",
    width: 125,
    renderCell: (params) => (
      <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
        {params.value}
      </span>
    ),
  },
  {
    field: "priority",
    headerName: "Priority",
    width: 100,
  },
  {
    field: "tags",
    headerName: "Tags",
    width: 175,
  },
  {
    field: "startDate",
    headerName: "Start Date",
    width: 150,
  },
  {
    field: "dueDate",
    headerName: "Due Date",
    width: 150,
  },
  {
    field: "author",
    headerName: "Author",
    width: 175,
    renderCell: (params) => params.value.username || "Unknown",
  },
  {
    field: "assignee",
    headerName: "Assignee",
    width: 175,
    renderCell: (params) => params.value.username || "Unassigned",
  },
];

export default function TableView({
  id,
  setIsModalNewTaskOpen,
}: TableViewProps) {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTasksQuery({ projectId: Number(id) });

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    const errorMessage =
      "status" in error
        ? `Error: ${error.status}`
        : error.message || "An unknown error occurred";
    return <div>{errorMessage}</div>;
  }

  return (
    <div className="h=[540px] w-full px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header
          name="Table"
          buttonComponent={
            <button
              className="flex items-center rounded-md bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
              onClick={() => setIsModalNewTaskOpen(true)}
            >
              Add Task
            </button>
          }
          isSmallText
        />
      </div>
      <DataGrid
        rows={tasks || []}
        columns={columns}
        className={dataGridClassNames}
        sx={dataGridSxStyles(isDarkMode)}
      />
    </div>
  );
}
