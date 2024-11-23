import { useMemo, useState } from "react";
import { DisplayOption, ViewMode } from "gantt-task-react";

import { useAppSelector } from "@/app/redux";
import { useGetTasksQuery } from "@/state/api";

type TimelineViewProps = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

type TaskTypeItems = "task" | "milestone" | "project";

export default function TimelineView({
  id,
  setIsModalNewTaskOpen,
}: TimelineViewProps) {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTasksQuery({ projectId: Number(id) });

  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-US",
  });

  const ganttTasks = useMemo(() => {
    return (
      tasks?.map((task) => ({
        start: new Date(task.startDate as string),
        end: new Date(task.dueDate as string),
        title: task.title,
        id: `Task-${task.id}`,
        type: "task" as "TaskType",
        progress: task.points ? (task.points / 10) * 100 : 0,
        isDisabled: false,
      })) || []
    );
  }, [tasks]);

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    const errorMessage =
      "status" in error
        ? `Error: ${error.status}`
        : error.message || "An unknown error occurred";
    return <div>{errorMessage}</div>;
  }
}
