function decorate_input (input) {
	input.style.width = '400px';
	input.style.backgroundColor = '#FFFFAA';
	input.style.padding = '25px';
	input.style.border = 'none';
	input.style.fontFamily = 'monospace';
	input.style.fontSize = '25px';
	input.type = 'text';
}

function populate_balance(acc, element) {
	acc.account_get_balance(function(res){
		element.innerHTML = '<b>Summa:</b> ' + res.balance;
	});
}

function populate_history(acc, element) {
	acc.account_get_history(function(res){
		element.innerHTML = '';
		function make_row (sender, receiver, amount, timestamp) {
			var tr = document.createElement('tr');
			element.appendChild(tr);

			var td_sender = document.createElement('td');
			td_sender.innerHTML = sender;

			var td_receiver = document.createElement('td');
			td_receiver.innerHTML = receiver;

			var td_amount = document.createElement('td');
			td_amount.innerHTML = amount;

			td_sender.style.padding = td_receiver.style.padding = td_amount.style.padding = '10px';

			tr.appendChild(td_sender);
			tr.appendChild(td_receiver);
			tr.appendChild(td_amount);
		}
		make_row('<b>Sändare</b>','<b>Mottagare</b>','<b>SEK</b>');
		res.history.forEach(function(transfer){
			make_row(transfer.sender, transfer.receiver, transfer.amount);
		});
	});
}

function display_account (acc) {
	clear();
	var body = document.createElement('div');
	body.style.padding = '25px';
	document.getElementById('content').appendChild(body);

	var p_info = document.createElement('p');
	p_info.innerHTML = '<b>Kontonummer:</b> ' + acc.id;
	body.appendChild(p_info);

	var p_balance = document.createElement('p');
	body.appendChild(p_balance);

	var p_transfer = document.createElement('p');
	p_transfer.innerHTML = '<h1>Överföring</h1>';
	body.appendChild(p_transfer);

	var p_transfer_0 = document.createElement('p');
	p_transfer_0.innerHTML = 'Summa (SEK):';
	p_transfer.appendChild(p_transfer_0);

	var p_transfer_1 = document.createElement('p');
	p_transfer.appendChild(p_transfer_1);

	var p_transfer_2 = document.createElement('p');
	p_transfer_2.innerHTML = 'Mottagare (NR):';
	p_transfer.appendChild(p_transfer_2);

	var p_transfer_3 = document.createElement('p');
	p_transfer.appendChild(p_transfer_3);

	var p_transfer_4 = document.createElement('p');
	p_transfer_4.style.textAlign = 'center';
	p_transfer.appendChild(p_transfer_4);

	var input_amount = document.createElement('input');
	decorate_input(input_amount);

	var input_receiver = document.createElement('input');
	decorate_input(input_receiver);

	p_transfer_1.appendChild(input_amount);
	p_transfer_3.appendChild(input_receiver);

	var button = document.createElement('input');
	button.type = 'button';
	button.value = 'Starta överföring';
	p_transfer_4.appendChild(button);

	var p_history = document.createElement('p');
	p_history.innerHTML = '<h1>Historik</h1>';
	body.appendChild(p_history);

	var history_table = document.createElement('table');
	history_table.border = '1';
	p_history.appendChild(history_table);

	populate_all = function () {
		populate_balance(acc, p_balance);
		populate_history(acc, history_table);
	}

	populate_all();
	setInterval(populate_all, 1000);

	button.onclick = function() {
		acc.account_make_transfer(
			input_receiver.value,
			input_amount.value,
			function() {
				populate_all();
				alert('Transaction completed');
				input_receiver.value = '';
				input_amount.value = '';
			}
		);
	}
}

function display_challenge (acc, challenge) {
	clear();
	var body = document.createElement('div');
	body.style.padding = '25px';
	document.getElementById('content').appendChild(body);

	var p0 = document.createElement('p');
	p0.innerHTML = '<b>Kontonummer:</b> ' + acc.id;

	var p1 = document.createElement('p');
	p1.innerHTML = 'För att logga in i vårt supersäkra system behöver du ange följande kod i din säkerhetsdosa:';

	var p2 = document.createElement('p');
	p2.style.fontFamily = 'monospace';
	p2.style.fontSize = '25px';
	p2.innerHTML = challenge;

	var p3 = document.createElement('p');
	p3.innerHTML = 'Ange sedan svarskoden nedan:';

	var p4 = document.createElement('p');
	var p5 = document.createElement('p');
	p5.style.textAlign = 'center';

	body.appendChild(p0);
	body.appendChild(p1);
	body.appendChild(p2);
	body.appendChild(p3);
	body.appendChild(p4);
	body.appendChild(p5);

	var input = document.createElement('input');
	decorate_input(input);

	var button = document.createElement('input');
	button.type = 'button';
	button.value = 'Fortsätt';

	p4.appendChild(input);
	p5.appendChild(button);

	// Events
	
	button.onclick = function() {
		acc.get_token(
			input.value,
			function(token) {
				display_account(new account(acc.id, token));
			}
		);
	}
}

function display_startpage() {
	clear();
	var body = document.createElement('div');
	body.style.padding = '25px';
	document.getElementById('content').appendChild(body);

	var pInfo = document.createElement('p');
	pInfo.innerHTML = 'Kontonummer:';

	var pInput = document.createElement('p');

	var pButton = document.createElement('p');
	pButton.style.textAlign = 'center';

	body.appendChild(pInfo);
	body.appendChild(pInput);
	body.appendChild(pButton);

	var input = document.createElement('input');
	decorate_input(input);

	var button = document.createElement('input');
	button.type = 'button';
	button.value = 'Logga in';

	pInput.appendChild(input);
	pButton.appendChild(button);

	// Events
	
	button.onclick = function() {
		a = new account(input.value);
		a.get_challenge(function (res) {
			display_challenge(a, res.value);
		});
	}
}
