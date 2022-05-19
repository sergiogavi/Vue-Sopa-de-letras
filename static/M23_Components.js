Vue.component('ComponentPropi', {
  data: function() {
    return {
      text: 'Palabras encontradas'
    };
  },
  props: ['text2'],
  
  template: `
  <div>
    <h1 v-on:click="text = text.split('').reverse().join('')">{{text}}</h1>
    <h2 >{{text2}}</h2>
  </div>
  `
});

let app = new Vue({
  el: '#app',
  data: {
    
  },
  template: `
      <div>
        <component-propi></component-propi>
        
      </div>
      
      `
});