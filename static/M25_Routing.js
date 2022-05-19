const error = {
  data: function() {
    return {
      url: window.location.hash
    };
  },
  template: `
  <div>
    <p>URL no encaminada : {{url}} </p>
  </div>
  `
};

const Juego = {
  template: `
  <div>
  

  <input id="entrada"  type="text" name="txt" placeholder="entra paraula"/>
 
  <button id="entra" onclick="desar()">Entra</button>
  <button id="start">Start</button>
  <div id="sopa">
      <table></table>
  </div>
  <div id="llistaBlock">
      <ul id="llista"></ul>
  </div>
  Selecció: <span id="paraula"></span>
    </div>
  `
};
const paraules = {
  template: `
  <div> 
    <p>Palabras introducidas y almacenadas del juego</p>
    <button id="mostrar" onclick="mostrar()">Mostrar palabras guardadas</button>
    <a href="./componentAndClass.html">Componente propio y classe</a>
    </div>
  `
};

const rutes = {
  '#/': Juego,
  '#/paraules': paraules
};




var app = new Vue({
  el: '#app',
  data: {
    rutaActual: window.location.hash,
    rutes: rutes
  },
  methods: {
    navegar: function($event) {
      this.rutaActual = $event.target.hash;
    },
   
    },   
    
  
  computed: {
    vistaActual: function() {
      return this.rutes[this.rutaActual] || error;
    }
  },
  template: `
    <div>
      <ul>
        <li>
          <a href="#/" 
            v-on:click="navegar">
              Juego
          </a>
        </li>
        <li>
          <a href="#/paraules" 
            v-on:click="navegar">
            Palabras
          </a>
        </li>
      </ul>
      <div v-bind:is="vistaActual">        
      </div>
    </div>
    `
});