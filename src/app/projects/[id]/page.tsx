"use client";

import { useState, useEffect } from "react";

import { ProjectHeader, BoardView, ListView, TimelineView } from "@/components";

type Props = {
  params: Promise<{ id: string }>;
};

export default function Project({ params }: Props) {
  const [id, setId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  // Resolve the params promise to extract `id`
  useEffect(() => {
    params
      .then(({ id }) => setId(id))
      .catch((err) => {
        console.error("Error fetching params:", err);
      });
  }, [params]);

  // Display a loading state until the `id` is resolved
  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
        id={id}
      /> */}
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Board" && (
        <BoardView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "List" && (
        <ListView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "Timeline" && (
        <TimelineView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {/* {activeTab === "Table" && (
        <Table id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )} */}
    </div>
  );
}
