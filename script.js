const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['advokat',
'alergolog',
'anesteziolog',
'animator',
'aranzer',
'archeolog',
'architekt',
'automechanik',
'barman',
'biolog',
'celnik',
'chemik',
'chirurg',
'copywriter',
'cukrar',
'cisnik',
'dermatolog',
'designer',
'developer',
'diabetolog',
'editor',
'ekonom',
'elektrikar',
'exekutor',
'filozof',
'fotograf',
'fyzik',
'fyzioterapeut',
'genetik',
'geodet',
'geolog',
'grafik',
'gynekolog',
'hasic',
'herec',
'historik',
'instalater',
'internista',
'jerabnik',
'kadernice',
'kameraman',
'kardiolog',
'keramik',
'klempir',
'knihovnik',
'kosmeticka',
'kouc',
'kovar',
'krejci',
'laborant',
'lesnik',
'letuska',
'logoped',
'lekarnik',
'malir',
'masker',
'maser',
'matematik',
'meteorolog',
'neurolog',
'notar',
'novinar',
'namornik',
'oftalmolog',
'optik',
'ortoped',
'otorinolaryngolog',
'patolog',
'pediatr',
'pekar',
'pokladni',
'policista',
'programator',
'projektant',
'pravnik',
'pruvodce',
'psychiatr',
'radiolog',
'recepcni',
'reznik',
'ridic',
'reziser', 
'sociolog',
'sklar',
'soudce',
'statik',
'statistik',
'stavbyvedouci',
'stomatolog',
'svarec',
'tanecnik',
'taxikar',
'technolog',
'tester',
'tlumocnik',
'truhlar',
'uklizec',
'ucitel',
'udrzbar',
'vojak',
'veterinar',
'zpevak',
'zednik',
'zlatnik',
'zahradnik',
'zvukar'
];

let selectedWord = words[(Math.floor(Math.random() * words.length))];

console.log (selectedWord)
let playable = true;

const correctLetters = [];
const wrongLetters = [];

// Show hidden word
function displayWord() {
    wordEl.focus();
	wordEl.innerHTML = `
    ${selectedWord
			.split('')
			.map(
				letter => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
          </span>
        `
			)
			.join('')}
  `;

	const innerWord = wordEl.innerText.replace(/\n/g, '');

	if (innerWord === selectedWord) {
		finalMessage.innerText = 'Gratulujeme! Výhra!';
		popup.style.display = 'flex';

		playable = false;
	}
}

// Update the wrong letters
function updateWrongLettersEl() {
	// Display wrong letters
	wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Špatný výběr :(</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;

	// Display parts
	figureParts.forEach((part, index) => {
		const errors = wrongLetters.length;

		if (index < errors) {
			part.style.display = 'block';
		} else {
			part.style.display = 'none';
		}
	});

	// Check if lost
	if (wrongLetters.length === figureParts.length) {
		finalMessage.innerText = `Nic moc. Mělo to být:   ${selectedWord}
        `;
		popup.style.display = 'flex';

		playable = false;
	}
}

// Show notification
function showNotification() {
	notification.classList.add('show');

	setTimeout(() => {
		notification.classList.remove('show');
	}, 2000);
}

// Keydown letter press
window.addEventListener('keydown', e => {
	if (playable) {
		if (e.keyCode >= 65 && e.keyCode <= 90) {
			const letter = e.key.toLowerCase();

			if (selectedWord.includes(letter)) {
				if (!correctLetters.includes(letter)) {
					correctLetters.push(letter);

					displayWord();
				} else {
					showNotification();
				}
			} else {
				if (!wrongLetters.includes(letter)) {
					wrongLetters.push(letter);

					updateWrongLettersEl();
				} else {
					showNotification();
				}
			}
		}
	}
});

// Restart game and play again
playAgainBtn.addEventListener('click', () => {
	playable = true;

	//  Empty arrays
	correctLetters.splice(0);
	wrongLetters.splice(0);

	selectedWord = words[Math.floor(Math.random() * words.length)];

	displayWord();

	updateWrongLettersEl();

	popup.style.display = 'none';
});

displayWord();