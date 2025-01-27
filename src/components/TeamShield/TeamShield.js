export class TeamShield extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const primaryColor = this.getAttribute('primary-color') || '#FF0000';
    const secondaryColor = this.getAttribute('secondary-color') || '#E96565';
    const opacity = this.getAttribute('secondary-opacity') || '0.3';

    this.shadowRoot.innerHTML = `
      <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C14.8835 1.49628 14.1602 4.31649 9.54496 5.01371C9.11253 5.07638 8.70368 5.10772 8.31056 5.10772C5.38575 5.10772 3.61671 3.51743 3.61671 3.51743L0 7.31688C0 7.31688 5.59803 9.10302 1.11646 25.1156C-1.91843 35.9577 14.5926 37.6028 16 40C17.3995 37.6028 33.9106 35.9577 30.8835 25.1156C26.4098 9.10302 32 7.31688 32 7.31688L28.3754 3.51743C28.3754 3.51743 26.6064 5.10772 23.6816 5.10772C23.2885 5.10772 22.8796 5.07638 22.4472 5.01371C17.8398 4.32432 17.1165 1.49628 15.9921 0L16 0Z" 
        fill="url(#paint0_linear)"/>
        <defs>
          <linearGradient id="paint0_linear" x1="16" y1="0" x2="16" y2="40" gradientUnits="userSpaceOnUse">
            <stop stop-color="${primaryColor}"/>
            <stop offset="1" stop-color="${secondaryColor}" stop-opacity="${opacity}"/>
          </linearGradient>
        </defs>
      </svg>
    `;
  }
}

customElements.define('team-shield', TeamShield);
