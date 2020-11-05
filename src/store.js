import { readable, writable } from 'svelte/store';

export const dataStore = writable(0);

export const personalData = writable({
  data1: '',
  data2: '',
  data3: {
    data31: '',
    data32: {
      data321: '',
    },
  },
});

const cStore = () => {
  return {
    suma: (newValue) => dataStore.update(value => value + 1),
    resta: (newValue) => dataStore.update(value => value - 1),
  }
}

export const customStore = cStore();

const getDate = () => {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };
  const dateTimeFormat = new Intl.DateTimeFormat('es-ES', options);
  return dateTimeFormat.format(new Date());
}
export const getTime = readable(null, set => {
  set(getDate());
});

export const getRealTime = readable(null, set => {
  setInterval(() => set(getDate()), 1000);
});