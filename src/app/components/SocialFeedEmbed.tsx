import { useEffect } from "react";

const ELFSIGHT_SCRIPT_SRC = "https://elfsightcdn.com/platform.js";
const ELFSIGHT_APP_CLASS = "elfsight-app-7b3c7a49-f701-4009-a3cc-ebc640a1b177";

export function SocialFeedEmbed() {
  useEffect(() => {
    if (document.querySelector(`script[src="${ELFSIGHT_SCRIPT_SRC}"]`)) {
      return;
    }

    const script = document.createElement("script");
    script.src = ELFSIGHT_SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <section className="page-section page-section--soft home-social-feed-section" aria-labelledby="home-social-feed-title">
      <div className="route-container">
        <div className="section-heading home-social-feed-section__heading">
          <p className="route-eyebrow">Social Moments</p>
          <h2 id="home-social-feed-title">Action moments at Terminal Sekinchan</h2>
          <p>
            Real visitor posts from the train ride, aircraft landmark, paddy fields, and photo spots.
          </p>
        </div>
        <div className="home-social-feed">
          <div className={ELFSIGHT_APP_CLASS} data-elfsight-app-lazy />
        </div>
      </div>
    </section>
  );
}
