
const quotes = ["After a certain age, you are no longer product of how you were raised.",
"A person often meets his destiny on the road he took to avoid it.",
"Be good technically, and if there is something in you, it will come out.",
"Change is hard at first, messy in the middle and gorgeous at the end.",
"Cheap pleasures can kill big, ambitious goals.",
"Comparison destroys personality.",
"Consider everything an experiment.",
"Consistency grows only where systems exist.",
"Continuous improvement beats delayed perfection.",
"Delay is fear.",
"Do not apologize for your nature.",
"Don’t try to create and analyze at the same time. They’re different process.",
"Eco > Ego.",
"Either increase your sacrifice, or reduce desire.",
"Eliminate the fear of a bad future and the memory of a bad past.",
"Empathy is never a sin.",
"Empathy without bondaries is self-destruction.",
"Fast isn’t always forward, so don’t forget to pause.",
"Focus on improvement, not perfection.",
"Get rid of secret rules.",
"Get your dopamine from action.",
"Great things start simple.",
"Have twice as much fun.",
"I am > I was.",
"It’s better to look silly than to be destructive.",
"If nobody wants to touch it, then you shouldn’t touch it either.",
"Let people be.",
"Life rewards action, not intelligence.",
"Mastery is the ultimate status.",
"Neglect the unimportant.",
"Once the decision is made, everything else is noise.",
"Only love and death change all things.",
"Preparation always beats planning.",
"Progress beats potential.",
"Real growth is learning to be steady in the uncertainty.",
"Remember when you wanted all you currently have.",
"Save deep thinking for deep problems.",
"Set the bar lower.",
"Simple is beautiful.",
"Simplify your task.",
"Sprint, rest, repeat.",
"Start small.",
"Take part in the joy of creation.",
"The obvious needs to be said.",
"Time is your most precious asset.",
"Trade perfect for done.",
"Treat your ideas with respect.",
"When fisherman cannot go to the sea, they repair nets.",
"Worrying is worshiping the problem.",
"You can’t defeat the demons you enjoy playing with.",
"Your brain resistance is proportional to the perceived effort."
];


/*
const coin = document.getElementById("spinning");
spinning.classList.add("spin_active");

const frase = quotes[Math.floor(Math.random() * quotes.length)];
document.querySelector('.random_message').innerText = frase;
*/
const image = document.getElementById("spinning");
const fraseEl = document.querySelector(".random_message");


// após 5s: fade + spin + frase
setTimeout(() => {
    // fade in
    image.classList.add("fade_in");
    image.classList.add("spin_active");

    // frase
    	setTimeout(() => {
			const frase = quotes[Math.floor(Math.random() * quotes.length)];
		    fraseEl.innerText = frase;
	    }, 1000);

}, 1000);
