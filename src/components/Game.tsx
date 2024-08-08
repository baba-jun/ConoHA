import PricingCard from "./PricingCard";

const Game = () => {
  return (
    <main>
    <div className='left-area'>
    <section className="os-selection">
      <h2>イメージタイプ</h2>
      <div className="os-grid">
      <div className="radio-button">
          <input type="radio" id="7DaystoDie" name="image" value="7DaystoDie" />
          <label htmlFor="7DaystoDie">
            <img src="src/assets/games/7daysToDie.png" alt="7 Days to Die" />
          </label>
          <p className="undercaption">7 Days to Die</p>
        </div>

        <div className="radio-button">
          <input type="radio" id="Survival Evolved" name="image" value="ARK:Survival Evolved" />
          <label htmlFor="Survival Evolved">
            <img src="src/assets/games/ARK.png" alt="ARK: Survival Evolved" />
          </label>
          <p className="undercaption">ARK: Survival Evolved</p>
        </div>

        <div className="radio-button">
          <input type="radio" id="Arma3" name="image" value="Arma3" />
          <label htmlFor="Arma3">
            <img src="src/assets/games/Arma3.png" alt="Arma3" />
          </label>
          <p className="undercaption">Arma3</p>
        </div>

        <div className="radio-button">
          <input type="radio" id="AssettoCorsa" name="image" value="AssettoCorsa" />
          <label htmlFor="AssettoCorsa">
            <img src="src/assets/games/AssettoCorsa.png" alt="AssettoCorsa" />
          </label>
          <p className="undercaption">AssettoCorsa</p>
        </div>

        <div className="radio-button">
          <input type="radio" id="CoreKeeper" name="image" value="CoreKeeper" />
          <label htmlFor="CoreKeeper">
            <img src="src/assets/games/CoreKeeper.png" alt="CoreKeeper" />
          </label>
          <p className="undercaption">CoreKeeper</p>
        </div>

        <div className="radio-button">
          <input type="radio" id="CS2" name="image" value="CS2" />
          <label htmlFor="CS2">
            <img src="src/assets/games/CS2.png" alt="CS2" />
          </label>
          <p className="undercaption">CS2</p>
        </div>

        <div className="radio-button">
          <input type="radio" id="DayZ" name="image" value="DayZ" />
          <label htmlFor="DayZ">
            <img src="src/assets/games/DayZ.png" alt="DayZ" />
          </label>
          <p className="undercaption">DayZ</p>
        </div>

        <div className="radio-button">
          <input type="radio" id="Enshrouded" name="image" value="Enshrouded" />
          <label htmlFor="Enshrouded">
            <img src="src/assets/games/Enshrouded.png" alt="Enshrouded" />
          </label>
          <p className="undercaption">Enshrouded</p>
        </div>

        <div className="radio-button">
          <input type="radio" id="Factorio" name="image" value="Factorio" />
          <label htmlFor="Factorio">
            <img src="src/assets/games/Factorio.png" alt="Factorio" />
          </label>
          <p className="undercaption">Factorio</p>
        </div>

        <div className="radio-button">
          <input type="radio" id="FiveM" name="image" value="FiveM" />
          <label htmlFor="FiveM">
            <img src="src/assets/games/FiveM.png" alt="FiveM" />
          </label>
          <p className="undercaption">FiveM</p>
        </div>

        <div className="radio-button">
          <input type="radio" id="MinecraftI" name="image" value="MinecraftI" />
          <label htmlFor="MinecraftI">
            <img src="src/assets/games/Minecraft.png" alt="MinecraftI" />
          </label>
          <p className="undercaption">Minecraft 統合版</p>
        </div>

        <div className="radio-button">
          <input type="radio" id="MinecraftJ" name="image" value="MinecraftJ" />
          <label htmlFor="MinecraftJ">
            <img src="src/assets/games/Minecraft.png" alt="MinecraftJ" />
          </label>
          <p className="undercaption">Minecraft Java版</p>
        </div>

        <div className="radio-button">
          <input type="radio" id="MinecraftF" name="image" value="MinecraftF" />
          <label htmlFor="MinecraftF">
            <img src="src/assets/games/Minecraft.png" alt="MinecraftF" />
          </label>
          <p className="undercaption">Minecraft Forge</p>
        </div>

        <div className="radio-button">
          <input type="radio" id="MinecraftP" name="image" value="MinecraftP" />
          <label htmlFor="MinecraftP">
            <img src="src/assets/games/Minecraft.png" alt="MinecraftP" />
          </label>
          <p className="undercaption">Minecraft Paper</p>
        </div>

        <div className="radio-button">
          <input type="radio" id="MinecraftS" name="image" value="MinecraftS" />
          <label htmlFor="MinecraftS">
            <img src="src/assets/games/Minecraft.png" alt="MinecraftS" />
          </label>
          <p className="undercaption">Minecraft Spigot</p>
        </div>

        <div className="radio-button">
          <input type="radio" id="Palworld" name="image" value="Palworld" />
          <label htmlFor="Palworld">
            <img src="src/assets/games/Palworld.png" alt="Palworld" />
          </label>
          <p className="undercaption">Palworld</p>
        </div>

        <div className="radio-button">
          <input type="radio" id="ProjectZomboid" name="image" value="ProjectZomboid" />
          <label htmlFor="ProjectZomboid">
            <img src="src/assets/games/ProjectZomboid.png" alt="ProjectZomboid" />
          </label>
          <p className="undercaption">Project Zomboid</p>
        </div>

        <div className="radio-button">
          <input type="radio" id="Rust" name="image" value="Rust" />
          <label htmlFor="Rust">
            <img src="src/assets/games/Rust.png" alt="Rust" />
          </label>
          <p className="undercaption">Rust</p>
        </div>

        <div className="radio-button">
          <input type="radio" id="Satisfactory" name="image" value="Satisfactory" />
          <label htmlFor="Satisfactory">
            <img src="src/assets/games/Satisfactory.png" alt="Satisfactory" />
          </label>
          <p className="undercaption">Satisfactory</p>
        </div>

        <div className="radio-button">
          <input type="radio" id="Soulmask" name="image" value="Soulmask" />
          <label htmlFor="Soulmask">
            <img src="src/assets/games/Soulmask.png" alt="Soulmask" />
          </label>
          <p className="undercaption">Soulmask</p>
        </div>

        <div className="radio-button">
          <input type="radio" id="TeamFortress2" name="image" value="TeamFortress2" />
          <label htmlFor="TeamFortress2">
            <img src="src/assets/games/TeamFortress2.png" alt="TeamFortress2" />
          </label>
          <p className="undercaption">TeamFortress2</p>
        </div>

        <div className="radio-button">
          <input type="radio" id="Terraria" name="image" value="Terraria" />
          <label htmlFor="Terraria">
            <img src="src/assets/games/Terraria.png" alt="Terraria" />
          </label>
          <p className="undercaption">Terraria</p>
        </div>

        <div className="radio-button">
          <input type="radio" id="Unturned" name="image" value="Unturned" />
          <label htmlFor="Unturned">
            <img src="src/assets/games/Unturned.png" alt="Unturned" />
          </label>
          <p className="undercaption">Unturned</p>
        </div>

        <div className="radio-button">
          <input type="radio" id="Valheim" name="image" value="Valheim" />
          <label htmlFor="Valheim">
            <img src="src/assets/games/Valheim.png" alt="Valheim" />
          </label>
          <p className="undercaption">Valheim</p>
        </div>

        <button className="next">次へ</button>
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