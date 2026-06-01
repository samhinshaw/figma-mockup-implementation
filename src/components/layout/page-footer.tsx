import { Heart } from "lucide-react";

export function PageFooter() {
  return (
    <footer className="mt-2 border-t border-brand-hairline pt-5 text-sm text-brand-body">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © 2026, made with{" "}
          <span className="inline-flex items-center gap-1">
            <Heart className="size-3.5 text-brand-red" fill="currentColor" />
          </span>{" "}
          by Material Shadcn for a better web.
        </p>
        <nav className="flex gap-5">
          <a
            href="#"
            className="text-brand-body transition-colors hover:text-brand-title"
          >
            About Us
          </a>
          <a
            href="#"
            className="text-brand-body transition-colors hover:text-brand-title"
          >
            Blog
          </a>
          <a
            href="#"
            className="text-brand-body transition-colors hover:text-brand-title"
          >
            License
          </a>
        </nav>
      </div>
    </footer>
  );
}
