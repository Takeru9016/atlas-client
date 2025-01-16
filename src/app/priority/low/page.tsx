import { Priority } from "@/mainTypes";
import ReusablePriorityPage from "../reusablePriorityPage/page";

export default function LowPage() {
  return <ReusablePriorityPage priority={Priority.Low} />;
}
