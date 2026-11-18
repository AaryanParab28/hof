import './house-rules.css';

const RULES = [
  { title: 'Fried when you order', body: 'Nothing sits under a heat lamp. Your chicken hits the oil after you hit “order”.' },
  { title: 'Bigger than the bun', body: "If the fillet doesn't spill over the edges, it goes back. That's the rule." },
  { title: 'Sauces made in-house', body: 'Herb mayo, spicy mayo, the works. Blended in our kitchen, not poured from a tub.' },
  { title: 'Messy is the point', body: 'Grab extra tissues. If your hands are clean afterwards, we did it wrong.' },
] as const;

export function HouseRules() {
  return (
    <section className="rules" aria-labelledby="rules-heading">
      <div className="rules__head">
        <h2 className="disp reveal" id="rules-heading">
          The Highness
          <br />
          <span className="outline outline--purple">house rules</span>
        </h2>
        <p className="reveal">
          Four rules the kitchen doesn't break. Not for rush hour, not for big orders, not even for your friend
          who “knows the owner”.
        </p>
      </div>
      <ol className="rules__grid">
        {RULES.map((rule, i) => (
          <li key={rule.title} className="rules__card reveal">
            <span className="rules__num" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <h3>{rule.title}</h3>
              <p>{rule.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
