'use strict';


function displayRepos(repos) {
	console.log('displaying repos in DOM');
	$('#results-list').empty(); //empty the screen of old results
	for (let i=0; i<repos.length; i++) {
		$('#results-list').append(
			`<li> <h3>${repos[i].name}</h3> 
			 <p><a href="${repos[i].url}">${repos[i].url}</p>
			 </li>`)
	}
	$('#results').removeClass('hidden');
}

function getRepos(user) {
	console.log('getting respositories');
	fetch(`https://api.github.com/users/${user}/repos`)
		.then(response => {
			if (response.ok) {
				return response.json()
			}
			throw new Error(response.statusText);
		})
		.then(responseJson => displayRepos(responseJson))
		.catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
          });
}


function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const user = $('#js-search-handle').val();
      getRepos(user);
    });
  }


$(watchForm);