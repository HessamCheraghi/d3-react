import { Link } from "react-router-dom";

export default function Links() {
  return (
    <div className="flex flex-col items-start gap-4">
      <Link
        className="text-xl text-sky-600 underline underline-offset-4 hover:text-sky-700"
        to="line/simple"
      >
        simple line
      </Link>
    </div>
  );
}
