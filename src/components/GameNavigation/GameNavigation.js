export class GameNavigation extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .arrows {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
        }
        button {
          background-color: #4CAF50;
          color: white;
          border: none;
          padding: 10px;
          cursor: pointer;
          border-radius: 5px;
        }
        button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
      </style>

      <div class="arrows">
        <button id="prev" disabled>&lt;</button>
        <button id="next">&gt;</button>
      </div>
    `;
  }
}

customElements.define('game-navigation', GameNavigation);
