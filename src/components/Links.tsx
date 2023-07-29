import { Link } from "react-router-dom";

const links = [
  { label: "simple line", path: "line/simple" },
  { label: "responsive line", path: "line/responsive" },
  { label: "resizable line", path: "line/resizable" },
  { label: "zoomable line", path: "line/zoomable" },
  { label: "simple bar", path: "bar/simple" },
  { label: "responsive bar", path: "bar/responsive" },
  { label: "resizable bar", path: "bar/resizable" },
  { label: "zoomable bar", path: "bar/zoomable" },
  { label: "grouped bar", path: "bar/grouped" },
];

export default function Links() {
  return (
    <div className="flex flex-col items-start gap-4">
      {links.map((link) => (
        <Link
          key={link.path}
          className="text-xl text-sky-600 underline underline-offset-4 hover:text-sky-700"
          to={link.path}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
