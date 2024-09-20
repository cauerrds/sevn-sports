
export class CustomHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  connectedCallback() {
    this.render();
  }


  render() {
    const mainTitle = this.getAttribute('main-title');

    this.shadowRoot.innerHTML = `
      <style>
        .container {
            width: 100%;
            background-color: #33B667;
            height: 76px;
            display: flex;
            justify-content: center;
            align-items: center;
            column-gap: 4px;
            color: #FFFFFF
        }

        .main-title {
            margin: 0;
            font-size: 22px;
        }
            
        .container > img {
            height: 22px;
        }
      </style>

      <div class="container">
          <h1 class="main-title">${mainTitle}</h1>
          <img src="./assets/images/ball.svg"  alt="Soccer Ball">
      </div>
  `;
  }


}

customElements.define('custom-header', CustomHeader);
