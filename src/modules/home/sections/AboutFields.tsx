import { ClipRise } from "@/components/motion/ClipRise";
import { FIELDS } from "@/data/about";

const STAGGER = 0.07;

export function AboutFields() {
  return (
    /* Semua pill sewarna, `ember`. Dulu tiap chip punya warna tersier sendiri; */
    <ul className="flex flex-wrap gap-2">
      {FIELDS.map((fg, i) => (
        <li
          key={fg}
          className="rounded-full bg-ember px-3 py-1 text-[13px] text-dark"
        >
          <ClipRise lines={[fg]} delay={i * STAGGER} />
        </li>
      ))}
    </ul>
  );
}
