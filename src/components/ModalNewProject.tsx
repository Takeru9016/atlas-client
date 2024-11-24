import { useState } from "react";

import { useCreateProjectMutation } from "@/state/api";

type ModalNewProjectProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ModalNewProject({
  isOpen,
  onClose,
}: ModalNewProjectProps) {
  const [createProject, { isLoading }] = useCreateProjectMutation();

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = async () => {
    if (!projectName || !projectDescription || !startDate || !endDate) {
      return null;
    }

    await createProject({
      name: projectName,
      description,
      startDate,
      endDate,
    });
  };
}
