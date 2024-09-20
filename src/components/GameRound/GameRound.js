import '../GameMatch/GameMatch.js'
import '../GameNavigation/GameNavigation.js'

export class GameRound extends HTMLElement {
  static get observedAttributes() {
    return ['api-url'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.currentRoundIndex = 0;
    this.rounds = [];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'api-url' && oldValue !== newValue) {
      this.fetchGames();
    }
  }

  connectedCallback() {
    if (this.hasAttribute('api-url')) {
      this.fetchGames();
    }
  }

  async fetchGames() {
    const apiUrl = this.getAttribute('api-url');
    if (!apiUrl) {
      console.error('API URL not provided');
      return;
    }

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      this.rounds = await response.json();

      console.log(this.rounds);
      
      this.render();
    } catch (error) {
      console.error('Failed to fetch games:', error);
    }
  }

  render() {
    if (this.rounds.length === 0) {
      this.shadowRoot.innerHTML = `<p>No data available</p>`;
      return;
    }

    const round = this.rounds[this.currentRoundIndex];
    this.shadowRoot.innerHTML = `
      <style>
        .container {
          text-align: center;
          font-family: Arial, sans-serif;
          width: 100%;
          max-width: 100%;
          border: 1px solid #DDDDDD;
          border-radius: 10px;
          padding: 20px;
          margin: 0 auto;
          box-sizing: border-box;
        }

        .title-container {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 56px;
        }
          
        .title {
          font-size: 16px;
          margin: 0;
          line-height: 19.36px;
        }

        .rounds {
          display: flex;
          flex-direction: column;
          flex: 1;
          row-gap: 4px;
        }

        .subtitle {
          font-size: 12px;
          color: gray;
          margin: 0;
        }

        .games {
          display: flex;
          flex-direction: column;
          row-gap: 16px;
        }

        .navigation-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          width: 30px;
          height: 30px;
        }

        .divider {
          border-bottom: 1px solid #DDDDDD;
        }          

        .button-icon {
          width: 100%;
          height: 100%;
        }

        .fill {
          width: 30px;
          height: 30px;
        }

        @media (min-width: 600px) {
          .container {
            max-width: 340px;
          }
        }        
      </style>

      <div class="container">
        <div class="title-container">
          ${round.round != 1 ? 
            `<button id="prev" class="navigation-button">
              <img src="./assets/images/back_button.svg" class="button-icon" alt="Previous">
            </button>` : '<div class="fill"></div>'
          }
          <div class="rounds">
            <h1 class="title">Rodadas de Jogos</h1>
            <h2 class="subtitle">RODADA ${round.round} </h2>
          </div>
          ${round.round !=  this.rounds?.length? 
            `<button id="next" class="navigation-button">
              <img src="./assets/images/next_button.svg" class="button-icon" alt="Next">
            </button>` : '<div class="fill"></div>'
          }          
                  
        </div>
        <div class="games">
          ${round.games.map((game, index) => `
            <game-match
              team-home="${game.team_home_name}"
              score-home="${game.team_home_score}"
              team-away="${game.team_away_name}"
              score-away="${game.team_away_score}"
              team-home-id="${game.team_home_id}"
              team-away-id="${game.team_away_id}"
            ></game-match>
            ${index < round.games.length - 1 ? '<div class="divider"></div>' : ''}            
          `).join('')}
        </div>
      </div>
    `;

    this.shadowRoot.querySelector('#prev')?.addEventListener('click', () => this.prevRound());
    this.shadowRoot.querySelector('#next')?.addEventListener('click', () => this.nextRound());
  }

  prevRound() {
    if (this.currentRoundIndex > 0) {
      this.currentRoundIndex--;
      this.render();
    }
  }

  nextRound() {
    if (this.currentRoundIndex < this.rounds.length - 1) {
      this.currentRoundIndex++;
      this.render();
    }
  }
}

customElements.define('game-round', GameRound);


