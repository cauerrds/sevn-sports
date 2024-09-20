import '../TeamShield/TeamShield.js'

export class GameMatch extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  getTeamColors(teamId) {
    const teamColors = {
      "time-a": { primaryColor: '#FF0000', secondaryColor: '#E96565' },
      "time-b": { primaryColor: '#0038FF', secondaryColor: '#0038FF' },
      "time-c": { primaryColor: '#FF9900', secondaryColor: '#FF9900' },
      "time-d": { primaryColor: '#72CB00', secondaryColor: '#72CB00' },
      "time-e": { primaryColor: '#00C797', secondaryColor: '#00C797' },
      "time-f": { primaryColor: '#0088D4', secondaryColor: '#22B0FF' },
      "time-g": { primaryColor: '#AD00FF', secondaryColor: '#BF65E9' },
      "time-h": { primaryColor: '#FF00E5', secondaryColor: '#FF00D6' },
    };
    
    return teamColors[teamId] || { primaryColor: '#CCCCCC', secondaryColor: '#AAAAAA' };
  }

  render() {
    const teamHome = this.getAttribute('team-home');
    const scoreHome = this.getAttribute('score-home');
    const teamHomeId = this.getAttribute('team-home-id');
    const teamAway = this.getAttribute('team-away');
    const scoreAway = this.getAttribute('score-away');
    const teamAwayId = this.getAttribute('team-away-id');

    const { primaryColor: primaryColorHome, secondaryColor: secondaryColorHome } = this.getTeamColors(teamHomeId);
    const { primaryColor: primaryColorAway, secondaryColor: secondaryColorAway } = this.getTeamColors(teamAwayId);

    
    this.shadowRoot.innerHTML = `
      <style>
        .game-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .team-info {
          display: flex;
          align-items: center;
          column-gap: 10px;
        }
        .team-name {
          font-size: 16px;
          font-weight: bold;
          margin-left: 10px;
        }
        .score {
          font-size: 18px;
          font-weight: bold;
          margin: 0 20px;
        }
      </style>

      <div class="game-card">
        <div class="team-info">
          <team-shield name="${teamHome}" primary-color="${primaryColorHome}" secondary-color="${secondaryColorHome}"></team-shield>
          <div class="team-name">${teamHome}</div>
        </div>
        <div class="score">${scoreHome} x ${scoreAway}</div>
        <div class="team-info">
          <div class="team-name">${teamAway}</div>
          <team-shield name="${teamAway}" primary-color="${primaryColorAway}" secondary-color="${secondaryColorAway}"></team-shield>
        </div>
      </div>
    `;
  }


}

customElements.define('game-match', GameMatch);
