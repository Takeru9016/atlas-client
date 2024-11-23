import { useGetTasksQuery } from "@/state/api";
import {Task} from '@/mainTypes'
import Header from "./Header";
import TaskCard from './TaskCard'

type ListViewProps = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

export default function ListView({ id, setIsModalNewTaskOpen }: ListViewProps) {
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
    <div className="px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header name="List" />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {tasks?.map((task: Task) => <TaskCard key={task.id} task={task} />)}
      </div>
    </div>
  );
}
