import { HumanCard } from './HumanCard';
import { Results } from './Results';

export function HumanResults() {
  return (
    <section className="flex justify-between mx-40 mb-40 gap-[380px] h-[630px]">
      <HumanCard />
      <Results />
    </section>
  );
}
