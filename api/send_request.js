$(document).ready(function() {
  $('#search-form').submit(function(event) {
    // Prevent the form from submitting via the browser
    event.preventDefault();

    // Get the search query from the form input
    var query = $('#query').val();

    // Send an AJAX request to the API endpoint
    $.ajax({
      url: '/api.py',
      type: 'POST',
      data: { query: query },
      dataType: 'text',
      success: function(response) {
        // Display the search results
        $('#search-results').html(response);
      },
      error: function(xhr) {
        // Display an error message
        $('#search-results').html('Error: ' + xhr.statusText);
      }
    });
  });
});
