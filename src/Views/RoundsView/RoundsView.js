import '../../components/GameRound/GameRound.js'

export class RoundsView extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  connectedCallback() {
    this.render();
  }


  render() {
    this.shadowRoot.innerHTML = `
        <style>     
          .container {
            display: flex;
            flex-direction: column;
            text-align: center;
            height: 100%;
            box-sizing: border-box;
            padding: 0px 8px;
          }
          
          .container > h1 {
            margin-top: 8%;
            margin-bottom: 40px;
          }
            
          @media (min-width: 600px) {
            .container > h1 {
              margin-bottom: 80px;
            }
          }              
        </style>

        <main class="container">
            <h1>Confira as rodadas do nosso campeonato fictício!</h1>
            <game-round api-url="https://sevn-pleno-esportes.deno.dev"></game-round>
        </main>
    `;
  }


}

customElements.define('rounds-view', RoundsView);
