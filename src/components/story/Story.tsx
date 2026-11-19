import stamp from '../../assets/deco/stamp-yellow.svg';
import { SITE } from '../../data/site';
import { Halftone } from '../ui/Halftone';
import { Marker } from '../ui/Marker';
import { MaskedLines } from '../ui/MaskedLines';
import './story.css';

export function Story() {
  const [first, second] = SITE.family;

  return (
    <section className="story grain" id="story" aria-labelledby="story-heading">
      <Halftone tone="purple" className="story__halftone" />
      <div className="story__grid">
        <h2 className="disp story__big reveal-lines" id="story-heading">
          <MaskedLines lines={['Same crew.', <span className="outline outline--purple">New obsession.</span>]} />
        </h2>
        <div className="story__aside reveal">
          <p className="story__family">
            <span>{first}</span>
            <span>{second}</span>
          </p>
          <p className="story__and">
            …and now <b>{SITE.name}</b>. Same people, new kitchen, one very specific obsession.
          </p>
          <img className="story__stamp ink" src={stamp} alt="" />
        </div>
        <p className="story__col story__col--1 reveal">
          The team behind {first} and {second} has spent years figuring out what Mumbai actually wants to eat
          after a long day. The answer kept coming back the same: something hot, something crunchy, something you
          can't eat politely.
        </p>
        <p className="story__col story__col--2 reveal">
          So we built a whole kitchen around it. A short menu, a fryer that never gets a day off, and burgers
          stacked the way we'd want to eat them ourselves. Highness is the place you crave, then the place you
          take everyone else.
        </p>
        <blockquote className="story__quote reveal">
          “We didn't open another café. We opened the place we kept{' '}
          <Marker>
            <b>ordering from</b>
          </Marker>{' '}
          in our heads.”
        </blockquote>
      </div>
    </section>
  );
}
