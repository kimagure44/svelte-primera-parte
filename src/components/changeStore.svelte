<script>
	import { onDestroy } from 'svelte';
  import { dataStore, personalData } from '../store';
  let value = null;
  const unsubStore = dataStore.subscribe( data => value = data);
  onDestroy(unsubStore);
  const suma = () => dataStore.update(value => value + 1);
  const resta = () => dataStore.update(value => value - 1);
  const obj = () => personalData.update(data => {
    const nRand = Math.floor(Math.random() * 100);
    data.data1 = nRand;
    data.data2 = nRand;
    return data;
  });
</script>
<main class="component-store">
  <p>Valor del store dentro del componente {value}</p>
  <button on:click={suma}>Suma 1 Update</button>
  <button on:click={resta}>Resta 1 Update</button>
  <button on:click={obj}>Random Object Update</button>
</main>
<style>
.component-store p {
  box-shadow: 0 0 9px 1px rgba(0,0,0,0.3);
  padding: 10px;
  width: 200px;
  margin: 0 auto;
}
</style>