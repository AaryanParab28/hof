import threeQuarter from '../../assets/photos/sunlit-three-quarter.webp';
import side from '../../assets/photos/sunlit-side.webp';
import sticker from '../../assets/deco/sticker-purple.svg';
import './definition.css';

export function Definition() {
  return (
    <section className="define grain grain--soft" aria-labelledby="define-heading">
      <img
        className="define__photo define__photo--a reveal"
        src={threeQuarter}
        width={1100}
        height={737}
        loading="lazy"
        alt="The Highness burger from above, sesame bun and crispy fillet in hard sunlight"
      />
      <div className="define__sticker reveal" aria-hidden="true">
        <img className="ink sticker-depth" src={sticker} alt="" />
        <span>
          Not
          <br />
          royal.
          <br />
          Close.
        </span>
      </div>

      <article className="define__card reveal">
        <h2 className="disp define__word" id="define-heading">
          high·ness
        </h2>
        <p className="define__pron">/ ˈhaɪ·nəs / &nbsp;·&nbsp; noun &nbsp;·&nbsp; almost royal</p>
        <ol className="define__list">
          <li>A title for kings and queens. Not us.</li>
          <li>
            <em>(Goregaon, informal)</em> The state you enter one bite into a Highness burger:{' '}
            <span className="define__hl">eyes half-closed, sauce on your thumb</span>, already planning the next
            order.
          </li>
          <li>
            A place you go for “just one burger” and leave with fries, a shake and a{' '}
            <span className="define__hl">“bhai, one more”</span>.
          </li>
        </ol>
        <p className="define__syn">
          <b>Synonyms:</b> crunch drunk, food coma, sauce-brained. <b>See also:</b> high on food.
        </p>
        <p className="define__sig" aria-hidden="true">
          one more
          <br />
          bite.
        </p>
      </article>

      <img
        className="define__photo define__photo--b reveal"
        src={side}
        width={1100}
        height={737}
        loading="lazy"
        alt="Side view of the Highness burger, crispy fillet overhanging the bun"
      />
    </section>
  );
}
