import { Clients } from './Clients';
import { Hero } from './Hero';
import { HumanResults } from './HumanResults';
import { Nav } from './Nav';
import { Projects } from './Projects';
import { WhyChooseUs } from './WhyChooseUs';
export const Main = () => {
  return (
    <>
      <Nav />
      <Hero />
      <Clients />
      <Projects />
      <WhyChooseUs />
      <HumanResults />
    </>
  );
};
