import PricingCard from "./PricingCard";

const Game = () => {
  return (
    <main>
    <div className='left-area'>
    <section className="os-selection">
      <h2>イメージタイプ</h2>
      <div className="os-grid">
      <div className="radio-button">
          <input type="radio" id="7DaystoDie" name="os" value="7 DaystoDie" />
          <label htmlFor="7DaystoDie">
            <img src="src/assets/7daysToDie.png" alt="7 Days to Die" />
            <div className="mask">
		          <div className="caption">7 Days to Die</div>
	          </div>
          </label>
          <p className="undercaption">7 Days to Die</p>
        </div>
        <div className="radio-button">
          <input type="radio" id="Survival Evolved" name="os" value="ARK: Survival Evolved" />
          <label htmlFor="Survival Evolved">ARK: Survival Evolved</label>
        </div>
        <div className="radio-button">
          <input type="radio" id="Arma3" name="os" value="Arma3" />
          <label htmlFor="Arma3">Arma 3</label>
        </div>
        <div className="radio-button">
          <input type="radio" id="AssettoCorsa" name="os" value="AssettoCorsa" />
          <label htmlFor="AssettoCorsa">AssettoCorsa</label>
        </div>
        <div className="radio-button">
          <input type="radio" id="CoreKeeper" name="os" value="CoreKeeper" />
          <label htmlFor="CoreKeeper">Core Keeper</label>
        </div>
        <div className="radio-button">
          <input type="radio" id="CS2" name="os" value="CS2" />
          <label htmlFor="CS2">CS2</label>
        </div>
        <div className="radio-button">
          <input type="radio" id="DayZ" name="os" value="DayZ" />
          <label htmlFor="DayZ">DayZ</label>
        </div>
        <div className="radio-button">
          <input type="radio" id="Enshrouded" name="os" value="Enshrouded" />
          <label htmlFor="Enshrouded">Enshrouded</label>
        </div>
        <div className="radio-button">
          <input type="radio" id="Factorio" name="os" value="Factorio" />
          <label htmlFor="Factorio">Factorio</label>
        </div>
        <div className="radio-button">
          <input type="radio" id="FiveM" name="os" value="FiveM" />
          <label htmlFor="FiveM">FiveM</label>
        </div>
      </div>
    </section>
    </div>
    <div className="right-area">
      <PricingCard />
    </div>
    </main>
  );
};

export default Game;