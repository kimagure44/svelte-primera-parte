import op1 from './pages/opcion1.svelte';
import op2 from './pages/opcion2.svelte';
import op3 from './pages/opcion3.svelte';
import op4 from './pages/opcion4.svelte';
import op5 from './pages/opcion5.svelte';
import error from './pages/error.svelte';

const routes = {
  '/op1/:data1?/:data2?': op1,
  '/op2': op2,
  '/op3': op3,
  '/op4': op4,
  '/op5': op5,
  '*': error
};

export default routes;