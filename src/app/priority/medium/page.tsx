import { Priority } from "@/mainTypes";
import ReusablePriorityPage from "../reusablePriorityPage/page";

export default function MediumPage() {
  return <ReusablePriorityPage priority={Priority.Medium} />;
}
