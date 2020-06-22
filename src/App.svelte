<script>
	let num1 = 10;
	let num2 = 20;
	let cont = 0;
	let aviso = '';
	let name = '';
	let age = 0;
	let aleatorio = 0;
	const provincias = ['Alava','Albacete','Alicante','Almería','Asturias','Avila','Badajoz','Barcelona','Burgos','Cáceres',
											'Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Granada','Guadalajara',
											'Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra',
											'Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
											'Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza'];
	let tareas = [
		{
			id: 1,
			tarea: 'Xxxxxx',
			descripcion: 'zxc zc x zxclñkñkl klñlsdfñlskdfk sdf'
		},
		{
			id: 2,
			tarea: 'Yyyyyy',
			descripcion: 'zxc zc x zxclñkñkl klñlsdfñlskdfk sdf'
		},
		{
			id: 3,
			tarea: 'Aaaaaa',
			descripcion: 'zxc zc x zxclñkñkl klñlsdfñlskdfk sdf'
		},
		{
			id: 4,
			tarea: 'Bbbbbb',
			descripcion: 'zxc zc x zxclñkñkl klñlsdfñlskdfk sdf'
		},
		{
			id: 5,
			tarea: 'Cccccc',
			descripcion: 'zxc zc x zxclñkñkl klñlsdfñlskdfk sdf'
		},
	];
	const removeTask = () => {
		/* 
			Clonamos cada vez que pulsamos para que cambie la referencia y la "variable reactive (propiedad computada)" se entere que ha modificado, 
			y pueda volver a "renderizar"	el contenido en el listado
		*/
		tareas = [...tareas];
		tareas.shift();
	};
	const contador = () => {
		cont ++;
	};
	const over = () => {
		aviso = 'Dentro de la caja';
	};
	const out = () => {
		aviso = 'Fuera de la caja';
	};
	const rand = () => {
		aleatorio = Math.floor((Math.random() * 100) + 1);
	};
	$: saludo = `Tu nombre es ${name} y tienes ${age || 0} años`;
	$: acceso = age < 18 ? 'No autorizado' : 'Adelante';
	$: {
		if (age === 0) {
			saludo = `Bienvenido!!!, ha nacido ${name} y tiene ${age || 0} años`;
		}
	};
	$: taskList = tareas;
	const starWars = () => {
		return new Promise(async(resolve, reject) => {
			const url = 'https://swapi.dev/api/people/';
			const result = await fetch(url);
			const data = await result.json();
			setTimeout(() => {
				if (result.ok) {
					resolve(data.results);
				} else {
					reject('conectado con la API');
				}
			}, 3 * 1000); // Simulando una pequeña pausa
		})
	};
	const clickMethod = (evt) => {
		console.log(evt, evt.detail);
	};
	import PsButton from './components/button.svelte';
</script>

<main>
	<div class="card">
		<h1>La suma de { num1 } y { num2 } es igual a { num1 + num2 }</h1>
		<div>
			Número 1<input type="range" min="0" max="100" bind:value={num1} />
		</div>
		<div>
			Número 2<input type="range" min="0" max="100" bind:value={num2} />
		</div>
	</div>
	<div class="card">
		<p>
			Contador { cont }
		</p>
		<button on:click={contador}>Suma</button>
		<p>
			El cursor esta... { aviso }
		</p>
		<div class="box" on:mouseover={over} on:mouseout={out}></div>
	</div>
	<div class="card">
		<p>{ saludo } --- { acceso }</p>
		Nombre: <input type="text" bind:value={name} placeholder="Indica un nombre" />
		Edad: <input type="number" bind:value={age} placeholder="Indica una edad" min="0" />
	</div>
	<div class="card">
		{ #if aleatorio <= 50 }
			<h1>[{ aleatorio }] Menor que o igual 50</h1>
		{ :else }
			<h1>[{ aleatorio }] Mayor que 50</h1>
		{ /if }
		<button on:click={rand}>Aleatorio</button>
	</div>
	<div class="card">
		Provincias
		<select name="provincia" id="provincia" placeholder="Selecciona tu provincia">
			{#each provincias as item, index}
				<option value={index}>{ item }</option>
			{/each}
		</select>
		<div class="task-container">
			Listado de tareas<button on:click={removeTask} title="Eliminar una tarea">-</button>
			{#each taskList as item}
				<div class="task">
					<ul>
						<li><b>ID:</b> { item.id }</li>
						<li><b>Tarea:</b> { item.tarea }</li>
						<li><b>Descripcion:</b> {item.descripcion }</li>
					</ul>
				</div>
			{:else}
				<h1>No tienes ninguna tarea pendiente</h1>
			{/each}
		</div>
	</div>
	<div class="card">
		<h1>Conectando a la API de Star Wars</h1>
		<div>
			{ #await starWars() }
		 		<div class="lds-ripple"><div></div><div></div></div>
		 	{ :then result }
		 		{#each result as item}
				<div class="task">
					<ul>
						<li><b>Cumpleaños:</b> { item.birth_year }</li>
						<li><b>Color de ojos:</b> { item.eye_color }</li>
						<li><b>Total peliculas:</b> { item.films.length }</li>
						<li><b>Sexo:</b> { item.gender }</li>
						<li><b>Color de pelo:</b> { item.hair_color }</li>
						<li><b>Altura:</b> { item.height } cm</li>
						<li><b>Peso:</b> { item.mass } kg</li>
						<li><b>Nombre:</b> { item.name }</li>
						<li><b>Color de piel:</b> { item.skin_color }</li>
					</ul>
				</div>
			{:else}
				<h1>No existe ningún registro mas</h1>
			{/each}
		 	{ :catch err }
		 		<div>{ err }</div>
		 	{ /await }
		</div>
	</div>
	<div class="card">
		<h1>COMPONENTES</h1>
		<div class="components">
			<PsButton text="Click" />
			<PsButton text="Click" type="error" />
			<PsButton text="Click" type="warning" />
			<PsButton text="Click" type="info" />
			<PsButton text="Click" type="default" />
			<PsButton text="Click" type="error" disabled={true} />
			<PsButton text="Evento" type="default" on:click-evt={clickMethod} />
			<PsButton>
				<span class="btn-special">Slot botón 0</span>
			</PsButton>
			<PsButton>
				<span class="btn-special">Slot botón 1</span>
				<span slot="info-text" class="btn-special">Texto info</span>
			</PsButton>
		</div>
	</div>
</main>

<style>
 .btn-special {
	 color: #000000;
	 font-size: 10px;
 }
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	.card {
    box-shadow: 0 0 10px 3px rgba(0,0,0,0.1);
		padding: 10px;
		margin: 15px;
	}

	.box {
    width: 50%;
    height: 100px;
    margin: 0 auto;
		background: #eeeeee;
		cursor: pointer;
	}
	
	.task {
    border: 1px solid #dddddd;
    margin: 5px;
	}

	.task ul {
    margin: 0;
    padding: 5px;
    list-style: none;
    text-align: left;
	}
	
	.task-container {
		text-align: left;
	}

	button {
		cursor: pointer;
	}

	.lds-ripple {
		display: inline-block;
		position: relative;
		width: 80px;
		height: 80px;
	}

	.lds-ripple div {
		position: absolute;
		border: 4px solid #ff3e00;
		opacity: 1;
		border-radius: 50%;
		animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
	}

	.lds-ripple div:nth-child(2) {
		animation-delay: -0.5s;
	}

	@keyframes lds-ripple {
		0% {
			top: 36px;
			left: 36px;
			width: 0;
			height: 0;
			opacity: 1;
		}
		100% {
			top: 0px;
			left: 0px;
			width: 72px;
			height: 72px;
			opacity: 0;
		}
	}

	.components {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: start;
		align-items: auto;
		align-content: start
	}
	.item {
 	 flex: 0 0 auto;
	  margin: 10px;
	}

</style>