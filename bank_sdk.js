function obj_to_qs (object) {
	var query_string = '';

	for (var key in object) {
		if (query_string == '')
			query_string += '?';
		else
			query_string += '&';
		query_string += key + '=' + encodeURIComponent(object[key])
	}

	return query_string;
}


function req(
	action,
	parameters = {},
	callback_success = function(){},
	callback_failure = null,
	authorization_header = null
){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4) {
			if (this.status == 200)
				callback_success(JSON.parse(xhttp.responseText));
			else {
				if (callback_failure)
					callback_failure(JSON.parse(xhttp.responseText));
				else
					error(JSON.parse(xhttp.responseText).info);
			}	
				
		}
	};
	var URI = 'http://' + window.location.hostname + ':5000/' + action + obj_to_qs(parameters);
	console.log('SENDING: ' + URI)
	xhttp.open('GET', URI, true);

	if (authorization_header)
		xhttp.setRequestHeader('Authorization', 'Bearer ' + authorization_header);

	xhttp.send();
}

function account (id, authorization_header = null) {
	this.id = id;
	this.get_challenge = function(callback)
	{
		req(
			'get_challenge',
			{
				account: id
			},
			callback
		);
	};

	this.get_token = function(challenge_response, callback)
	{
		req(
			'get_token',
			{
				account: id,
				challenge_response: challenge_response
			},
			function(res)
			{
				callback(res.value);
			}
		);
	};

	this.account_get_balance = function(callback) {
		req(
			'account_get_balance',
			{
				account: id,
			},
			callback,
			null,
			authorization_header
		);
	};

	this.account_get_history = function(callback) {
		req(
			'account_get_history',
			{
				account: id
			},
			callback,
			null,
			authorization_header
		);
	};

	this.account_make_transfer = function(receiver, amount, callback) {
		req(
			'account_make_transfer',
			{
				account: id,
				receiver: receiver,
				amount: amount
			},
			callback,
			null,
			authorization_header
		);
	};
}
