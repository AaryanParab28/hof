import { SITE } from '../../data/site';
import { ExternalLink } from '../ui/ExternalLink';
import './visit.css';

export function Visit() {
  return (
    <section className="visit" id="visit" aria-labelledby="visit-heading">
      <div className="visit__grid">
        <div className="reveal">
          <p className="eyebrow visit__eyebrow">Come hungry</p>
          <h2 className="disp visit__title" id="visit-heading">
            Find
            <br />
            your
            <br />
            <span className="outline outline--yellow">fix.</span>
          </h2>
          <p className="whisper visit__lead">Dine in, take away, or get it delivered still crunchy.</p>
        </div>

        <div className="visit__ticket reveal">
          <dl>
            <dt>Where</dt>
            <dd>
              {SITE.name} — {SITE.tagline}
              <br />
              {SITE.area}
              <br />
              <ExternalLink className="visit__map-link" href={SITE.directionsUrl}>
                View on Google ↗
              </ExternalLink>
            </dd>
            {SITE.hours && (
              <>
                <dt>When</dt>
                <dd>{SITE.hours}</dd>
              </>
            )}
            {SITE.phone && (
              <>
                <dt>Call</dt>
                <dd>
                  <a href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</a>
                </dd>
              </>
            )}
            {SITE.instagram && (
              <>
                <dt>Social</dt>
                <dd>
                  <ExternalLink href={`https://instagram.com/${SITE.instagram}`}>@{SITE.instagram}</ExternalLink>
                </dd>
              </>
            )}
            <dt>Order</dt>
            <dd>Delivery and takeaway on Zomato.</dd>
          </dl>
          <div className="visit__btns">
            <ExternalLink className="btn btn--purple" href={SITE.zomatoUrl}>
              Order on Zomato
            </ExternalLink>
            <ExternalLink className="btn btn--cream" href={SITE.directionsUrl}>
              Directions ↗
            </ExternalLink>
          </div>
        </div>
      </div>
    </section>
  );
}
