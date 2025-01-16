import { Priority } from "@/mainTypes";
import ReusablePriorityPage from "../reusablePriorityPage/page";

export default function HighPage() {
  return <ReusablePriorityPage priority={Priority.High} />;
}
