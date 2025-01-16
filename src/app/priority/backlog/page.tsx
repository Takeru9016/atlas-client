import { Priority } from "@/mainTypes";
import ReusablePriorityPage from "../reusablePriorityPage/page";

export default function BacklogPage() {
  return <ReusablePriorityPage priority={Priority.Backlog} />;
}
