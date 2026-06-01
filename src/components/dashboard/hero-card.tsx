import { personaAvatar } from "@/lib/avatars";
import { useHero } from "@/data/queries";

/**
 * HeroCard — the full-width dark banner at the top of the dashboard
 * ("Build Amazing Teams"). Smart component: reads its own content via useHero()
 * and renders a glassy CTA plus an overlapping avatar crowd built from
 * `teamSeeds`.
 */
export function HeroCard() {
  const { data, isPending } = useHero();

  if (isPending || data === undefined) {
    return (
      <section className="relative overflow-hidden rounded-3xl bg-hero-grain p-8 text-white lg:p-10">
        <div className="relative z-10 max-w-md">
          <div className="h-8 w-2/3 rounded bg-white/15 lg:h-9" />
          <div className="mt-4 h-4 w-full rounded bg-white/15" />
          <div className="mt-2 h-4 w-5/6 rounded bg-white/15" />
          <div className="mt-6 h-9 w-32 rounded-lg bg-white/15" />
        </div>
      </section>
    );
  }

  // Split the crowd into two rows of equal-ish size (~6 per row).
  const half = Math.ceil(data.teamSeeds.length / 2);
  const rows = [data.teamSeeds.slice(0, half), data.teamSeeds.slice(half)];

  return (
    <section className="relative min-h-[260px] overflow-hidden rounded-3xl bg-hero-grain p-8 text-white lg:p-10">
      <div className="relative z-10 flex max-w-md flex-col">
        <h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
          {data.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-white/70 lg:text-base">
          {data.description}
        </p>
        <div>
          <button
            type="button"
            className="mt-6 inline-flex h-9 items-center rounded-lg bg-white/10 px-4 text-sm font-medium text-white shadow-sm ring-1 ring-white/15 transition-colors hover:bg-white/15"
          >
            {data.ctaLabel}
          </button>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col gap-2 md:flex"
      >
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex -space-x-3"
            style={{ marginLeft: rowIndex % 2 === 1 ? "1.25rem" : undefined }}
          >
            {row.map((seed) => (
              <span
                key={seed}
                className="inline-flex size-14 items-center justify-center overflow-hidden rounded-full bg-white/5 ring-2 ring-white/15"
              >
                <img
                  src={personaAvatar(seed)}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="size-full object-cover"
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
