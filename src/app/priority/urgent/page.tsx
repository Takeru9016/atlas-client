import { Priority } from "@/mainTypes";
import ReusablePriorityPage from "../reusablePriorityPage/page";

export default function UrgentPage() {
  return <ReusablePriorityPage priority={Priority.Urgent} />;
}
