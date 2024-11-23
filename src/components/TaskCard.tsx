import Image from "next/image";

import { Task } from "@/mainTypes";
import { format } from "date-fns";

type TaskCardProps = {
  task: Task;
};

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="mb-6 rounded-lg bg-white p-6 shadow-lg dark:bg-dark-secondary dark:text-gray-200">
      {task.attachments && task.attachments.length > 0 && (
        <div className="mb-4">
          <p className="text-lg font-semibold">Attachments:</p>
          <div className="mt-2 flex flex-wrap gap-4">
            {task.attachments.map((attachment, index) => (
              <Image
                key={index}
                src={`/${attachment.fileURL}`}
                alt={attachment.fileName}
                width={400}
                height={200}
                className="rounded-lg shadow-md"
              />
            ))}
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        <p className="text-sm">
          <strong>ID:</strong> {task.id}
        </p>
        <p className="text-sm">
          <strong>Title:</strong> {task.title}
        </p>
        <p className="text-sm">
          <strong>Description:</strong>{" "}
          {task.description || "No description provided"}
        </p>
        <p className="text-sm">
          <strong>Status:</strong> {task.status}
        </p>
        <p className="text-sm">
          <strong>Priority:</strong> {task.priority}
        </p>
        <p className="text-sm">
          <strong>Tags:</strong> {task.tags || "No Tags Provided"}
        </p>
        <p className="text-sm">
          <strong>Start Date:</strong>{" "}
          {task.startDate
            ? format(new Date(task.startDate), "P")
            : "No Start Date"}
        </p>
        <p className="text-sm">
          <strong>Due Date:</strong>{" "}
          {task.dueDate ? format(new Date(task.dueDate), "P") : "No Due Date"}
        </p>
        <p className="text-sm">
          <strong>Author:</strong>{" "}
          {task.author ? task.author.username : "No Author"}
        </p>
        <p className="text-sm">
          <strong>Assignee:</strong>{" "}
          {task.assignee ? task.assignee.username : "No Assignee"}
        </p>
      </div>
    </div>
  );
}
