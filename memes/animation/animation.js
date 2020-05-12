(function(){
	let ENABLED = false;
	let HASH_NAME = 'reality';

	start();
	window.addEventListener("hashchange", start);

	function start() {

		if(!window.location.hash.includes(HASH_NAME) || ENABLED)
			return;

		ENABLED =  true;

		let script = document.createElement('script');
		script.onload = function() {
			animate();
		}

		script.src = 'https://cdnjs.cloudflare.com/ajax/libs/web-animations/2.3.2/web-animations.min.js';
		document.head.appendChild(script);
	}

	function animate() {

		const ACTIONS = [];
		let FRAME_COUNT = 0;

		let OLDBODY = document.body;

		const UTILS = {

			delay(millis) {
				return new Promise(resolve => {
					setTimeout(resolve, millis);
				})
			},

			shuffle(a) {
				var j, x, i;
				for (i = a.length - 1; i > 0; i--) {
					j = Math.floor(Math.random() * (i + 1));
					x = a[i];
					a[i] = a[j];
					a[j] = x;
				}
				return a;
			}
		} 

		init();
		requestAnimationFrame(update);

		function update() {

			for (let action of ACTIONS) {
				action();
			}

			FRAME_COUNT++;
			requestAnimationFrame(update);
		}

		async function init() {

			let newBody = document.createElement('body');
			newBody.appendChild(OLDBODY);
			document.documentElement.appendChild(newBody);
			document.body = newBody;
			
			changeMenu();
			await UTILS.delay(1*1000);
			changeParag();
			await UTILS.delay(1*1000);
			addText('DIPLLOÔÔOÔMMEME', 0, 40);
			await UTILS.delay(1*1000);
			moveImg();
			await UTILS.delay(1*1000);
			addText('1 DAY LEFTTT', -10, 70);
			await UTILS.delay(2*1000);
			changeCells();
			addText('JURYYYYYYYY', -8, 10);
			await UTILS.delay(0.5*1000);
			rotateAll();
			addOverlay();
			await UTILS.delay(1*1000);
			addFlames();
			await UTILS.delay(1*1000);
			addText('MARCHE PAAAAASS', 5, 0);
			await UTILS.delay(1*1000);
			addText('FUUUUUUCKKK', 0, 90);
			await UTILS.delay(1*1000);
			addEmoji();
			
		}

		function addEmoji() {
			let elem = document.createElement('div');
			let url = 'https://matoseb.com/archives/memes/animation/rsrc/emoji.jpg';
			elem.style.cssText = `mix-blend-mode: multiply; transform: scale(0); width: 100%; height: 100%; left: 50vw; top: 50vh; z-index: 2100; position: fixed; font-size: 100vmin; background: url(${url}) no-repeat; background-size: contain`;
			document.body.appendChild(elem);

			elem.animate(
				[{transform: 'translate(-50%, -50%) scale(0)', opacity: 0}, {transform: 'translate(-50%, -50%) scale(1.5)', opacity: 1, offset: 0.3}, {transform: 'translate(-50%, -50%) scale(1.5)', opacity: 0}], {
					duration: 2000,
					iterations: Infinity,
					fill: 'forwards',
				}
				);

		}

		async function changeParag() {

			for (let elem of document.querySelectorAll('p')) {
				await UTILS.delay(50);

				ACTIONS.push(
					function() {

						let random = Math.floor(Math.random()*50 + 30);

						if(FRAME_COUNT%random!==0)
							return;

						let txt = elem.textContent + 'AH';
						let pos = Math.floor(Math.random()*txt.length);
						txt = txt.substring(0, pos) + 'AH' + txt.substring(pos);
						txt = txt.substring(0,50);
						elem.textContent = txt;

						elem.style.fontSize = (1+Math.sin(FRAME_COUNT*0.01)*0.5) +'em';
					}

					)
			}
		}

		function addFlames() {
			let elem = document.createElement('div');
			let url = 'https://matoseb.com/archives/memes/animation/rsrc/fire.gif';
			elem.style.cssText = `translateY(100%); width: 100%; height: 80vh; z-index: 2000; opacity: 0.5; position: fixed; bottom: 0; left: 0; background: url("${url}") repeat; background-size: contain;`;
			document.body.appendChild(elem);

			elem.animate(
				[{transform: 'translateY(100%)'}, {transform: 'translateY(0)'}], {
					duration: 1000,
					iterations: 1,
					fill: 'forwards',
				}
				);
		}

		async function changeMenu() {

			for (let elem of document.querySelectorAll("ul.count1 .level1 a")) {
				await UTILS.delay(100);

				ACTIONS.push(
					function() {

						let random = Math.floor(Math.random()*10 + 5);

						if(FRAME_COUNT%random!==0)
							return;

						let txt = 'F' + elem.textContent;
						txt = txt.substring(0,10);

						elem.textContent = txt;
					}

					)
			}
		}

		function rotateAll() {

			let animation = [

			{ transform: 'rotate(0deg)' },
			{ transform: 'rotate(-2deg)' },
			{ transform: 'rotate(4deg)' },
			{ transform: 'rotate(-3deg)' },
			{ transform: 'rotate(4deg)' },
			{ transform: 'rotate(-6deg)' },
			{ transform: 'rotate(3deg)' },
			{ transform: 'rotate(-7deg)' }
			];

			OLDBODY.animate(
				animation, {
					duration: 100,
					iterations: Infinity,
				}
				);
		}

		async function addText(text, angle = 0, offsetY = 0) {
			let elem = document.createElement('div');
			let duration = 3000;

			let len = text.length;
			elem.style.cssText = `white-space: nowrap; text-align: center; z-index: 500; position: absolute; top: ${offsetY}vh; left: 0; color: black; font-weight: bold; font-size: 20vmin`;
			elem.textContent = text;

			OLDBODY.appendChild(elem);

			let anim = [{transform: `rotate(${angle}deg) translate(100%, 0)`}, {transform: `rotate(${angle}deg) translate(-100%, 0)`}];
			elem.animate(
				anim, {
					duration,
					iterations: Infinity,
				}
				);

			console.log(elem);
		}

		function addOverlay() {
			let elem = document.createElement('div');
			elem.style.cssText = 'opacity: 0; z-index: 1000; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: red; mix-blend-mode: darken';
			document.body.appendChild(elem);

			elem.animate(
				[{opacity: 0}, {opacity: 1}], {
					delay: Math.random()*100,
					duration: 1000,
					iterations: 1,
					fill: 'forwards',
				}
				);

		}

		async function changeCells() {

			for (let elem of document.querySelectorAll('.outer')) {

				await UTILS.delay(100);
				let animation = [

				{ transform: 'scale(1)' },
				{ transform: 'scale(1.2)' },
				{ transform: 'scale(1)' },
				];

				elem.animate(
					animation, {
						delay: Math.random()*100,
						duration: 100,
						iterations: Infinity,
					}
					);
			}
		}

		function moveImg() {
			document.querySelectorAll("img").forEach(async elem => {

				await UTILS.delay(100);
				let animation = [

				{ transform: 'translate(-20px, 0px) rotate(0deg)' },
				{ transform: 'translate(3px, 5px) rotate(-20deg)' },
				{ transform: 'translate(-23px, 45px) rotate(30deg)' },
				{ transform: 'translate(73px, -35px) rotate(-20deg)' },
				{ transform: 'translate(3px, -5px) rotate(10deg)' },
				{ transform: 'translate(-23px, 65px) rotate(-10deg)' },
				{ transform: 'translate(23px, 25px) rotate(10deg)' },
				{ transform: 'translate(10px, -20px) rotate(-10deg)' }
				];

				elem.animate(
					UTILS.shuffle(animation), {
						duration: 200,
						iterations: Infinity,
					}
					);
			});
		}
	}	
})();
