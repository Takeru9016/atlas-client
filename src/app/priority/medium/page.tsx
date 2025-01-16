import { Priority } from "@/mainTypes";
import ReusablePriorityPage from "../reusablePriorityPage/page";

type Props = {};

export default function MediumPage(props: Props) {
  return <ReusablePriorityPage priority={Priority.Medium} />;
}
