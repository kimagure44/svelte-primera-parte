<script>
  import { createEventDispatcher, beforeUpdate, afterUpdate, onMount, onDestroy, tick } from 'svelte';
  export let text = '';
  export let type = 'default';
  export let disabled = false;
  export let page = '';
  $: isDisbled = disabled ? 'disable' : '';
  const dispatch = createEventDispatcher();
  const clickFn = () => {
    dispatch('click-evt', { msn: 'inside', page });
  };

  // Ciclo de vida
  console.log('1 - Ejecución de script');
  
  onMount(async () => {
    console.log('2 - Mounted');
  });

  beforeUpdate(async () => {
    await tick();
		console.log('3 - Before Update');
	});

	afterUpdate(async () => {
    await tick();
		console.log('4 - After Update');
	});

  onDestroy(() => {
		console.log('5 - Destroy');
  });
  
  let status = false;
  const enter = () => { 
    status = true;
  };
  const exit = () => {
    status = false;
  };
</script>

<button class="btn {type} {isDisbled}" on:click={clickFn} on:mouseenter={enter} on:mouseleave={exit} {page}>
  <slot status={status}>{text}</slot>
  <slot name="info-text">Texto defecto</slot>
</button>

<style>
.btn {
  text-decoration: none;
  color: #fff;
  text-align: center;
  letter-spacing: .5px;
  transition: background-color .2s ease-out;
  cursor: pointer;
  font-size: 14px;
  outline: 0;
  border: none;
  border-radius: 2px;
  display: inline-block;
  height: 36px;
  line-height: 36px;
  padding: 0 16px;
  text-transform: uppercase;
  vertical-align: middle;
  -webkit-tap-highlight-color: transparent;
  margin: 10px;
}
.default {
  background-color: #26a69a;
}
.error {
  background-color: #e43d3d;
}
.warning {
  background-color: #c3bd43;
}
.info {
  background-color: #2599e4;
}
.disable {
  pointer-events: none;
  opacity: .4;
}
</style>